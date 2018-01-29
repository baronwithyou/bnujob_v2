<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Like;
use Auth;
use App\Http\Helpers;
use App\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function jobDetail($id)
    {
        $job = Job::with('business', 'comments.poster')->find($id);

        $comments = Comment::where('job_id', $id)->orderBy('agree_count', 'desc')->orderBy('created_at', 'desc')->get();

        return view('job', compact('job', 'comments'));
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
            'liker_id' => $data['user_id'],
            'liking_id' => Auth::user()->id,
            'comment_id' => $data['comment_id'],
            'type' => $data['type'],
        ];
        $comment = Comment::find($data['comment_id']);
        $record = Like::where('liking_id', Auth::user()->id)->where('liker_id', $data['user_id'])->where('comment_id', $data['comment_id']);
        if ($data['type'] == 'like') {
            if ($record->where('type', 'dislike')->first())
                $record->where('type', 'dislike')->delete();
            else
                Like::create($save);
            $comment->increment('agree_count');
        } else {
            if ($record->where('type', 'like')->first())
                $record->where('type', 'like')->delete();
            else
                Like::create($save);
            $comment->decrement('agree_count');
        }
        Helpers::ajaxSuccess();
        return;
    }
}
