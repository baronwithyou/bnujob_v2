<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Deliver;
use App\Evaluate;
use App\Events\DeliverEvent;
use App\Events\UserOperate;
use App\Like;
use App\User;
use Auth;
use App\Http\Helpers;
use App\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function jobDetail($id)
    {
        $delivered = 0;
        $job = Job::with('business', 'comments.poster')->find($id);

        $comments = Comment::where('job_id', $id)->orderBy('agree_count', 'desc')->orderBy('created_at', 'desc')->get();


        if (Auth::check() && $user = Auth::user()) {
            $resumes = $user->resume()->pluck('id');
            $record = Deliver::where('job_id', $id)->whereIn('resume_id', $resumes)->first();
            if (!is_null($record))
                $delivered = 1;
        }

        return view('job', compact('job', 'comments', 'delivered'));
    }

    public function commentStore(Request $request)
    {
        $data = $request->all();
        if (!Auth::check() || Helpers::checkCommented(Auth::user()->id, $data['job_id'])) {
            Helpers::ajaxFail();
            return;
        }
        $data['user_id'] = Auth::user()->id;
        Comment::create($data);
        Helpers::ajaxSuccess('发布成功');
        return;
    }

    // 点击同意某用户评论进行数据库修改
    public function commentLikeUpdate(Request $request)
    {
        // 需要的有user_id,comment_id,type
        $data = $request->all();
        $save = [
//            'liker_id' => $data['user_id'],
            'liking_id' => Auth::user()->id,
            'comment_id' => $data['comment_id'],
            'type' => $data['type'],
        ];
        $comment = Comment::find($data['comment_id']);
        $record = Like::where('liking_id', Auth::user()->id)->where('comment_id', $data['comment_id']);

        if (!is_null($record->first()) && $type = $record->first()->type) { // 如果存在这条记录
            if ($type == $data['type']) { // 一条记录不能点赞两次
                Helpers::ajaxFail();
                return;
            }
            event(new UserOperate($record->first(), new Like(), 'decrement'));
            $record->delete();
        } else {
            Like::create($save);
            if ($save['type'] == 'like')
                $comment->increment('agree_count');
            else
                $comment->decrement('agree_count');
        }
        Helpers::ajaxSuccess();
        return;
    }

    /**
     * @param Request $request
     */
    public function deliver(Request $request) {
        $user_id = Auth::user()->id;
        // 投递之前检查是否有简历
        $user = User::find($user_id);
        if (!$user->hasPrimaryResume()) {
            Helpers::ajaxFail('你还没有简历，请到个人中心完善简历');
            return;
        }
        $job_id = $request->input('job_id');
        $business = Job::find($job_id)->business;
        if ($user->id == $business->user_id) {
            Helpers::ajaxFail('无法投递自己的创建的商家');
            return;
        }
        $record = Deliver::where('resume_id', $user->primary_resume_id)->where('job_id', $job_id)->first();
        if (!is_null($record)) {
            Helpers::ajaxFail('你已经投递过该职位，请勿重新申请');
            return;
        } else {
            Deliver::create([
                'job_id' => $job_id,
                'resume_id' => $user->primary_resume_id,
            ]);
        }
        event(new DeliverEvent($user_id, $job_id));
        Helpers::ajaxSuccess();
        return;
    }
}
