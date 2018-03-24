<?php

namespace App\Http\Controllers;

use App\Deliver;
use App\Evaluate;
use App\Http\Helpers;
    use App\Http\Repositories\UserRepository;
use App\Like;
use App\Resume;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    private $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $resume = $user->resume;
        return view('user', compact('user', 'resume'));
    }

    public function activateEmail($token)
    {
        $user = User::where('confirmation_token', $token)->first();
        if (!$user) {
            return false;
        }
        $user->is_active = 1;
        $user->save();
        return $user;
    }

    public function updateConfirmationToken($token)
    {
        User::where('confirmation_token', $token)->update([
            'confirmation_token' => str_random(40)
        ]);
        return;
    }

    // 用户邮箱验证
    public function activate($token)
    {
        $user = $this->activateEmail($token);
        if (!$user) {
            return redirect('/')->withErrors('链接错误或者已经失效');
        }
        $this->updateConfirmationToken($token);
        Auth::login($user);
        return redirect('/')->with('login_success', ['title' => 'Welcome Back! :)', 'msg' => '邮箱激活成功，欢迎回来', 'avatar' => $user->avatar]);
    }

//    更改resume表 json数据
    public function jsonResumeUpdate(Request $request, $type) {
        $input = $request->all();
        $detail = json_encode([
            'start_at' => $input['start_at'],
            'end_at' => $input['end_at'],
            'description' => htmlentities($input['description']),
        ]);
        $resume = $this->userRepository->resumeStoreUpdate($type, $detail);
        Auth::user()->update([
            'primary_resume_id' => $resume->id
        ]);
        if ($resume) {
            Helpers::ajaxSuccess('修改成功');
            return;
        }
        Helpers::ajaxFail('修改失败');
        return;
    }

    public function normalResumeUpdate(Request $request, $type) {
        $data = $request->input('content');
        $resume = $this->userRepository->resumeStoreUpdate($type, $data);
        if ($resume) {
            Helpers::ajaxSuccess('修改成功');
            return;
        }
        Helpers::ajaxFail('修改失败');
        return;
    }

    public function batchResumeUpdate(Request $request) {

    }

    // 更改user表
    public function infoUpdate(Request $request) {
        $result = $this->userRepository->update($request->all());
        if ($result) {
            Helpers::ajaxSuccess();
            return;
        }
        Helpers::ajaxFail();
        return;
    }

    private function getAverageGrade($job_id) {
        return Evaluate::where('job_id', $job_id)->avg('grade');
    }

    public function emailToVerify()
    {
        $this->userRepository->emailToVerify();
    }

    public function deliverStatus()
    {
        $user = Auth::user();
        return view('deliver_status', compact('user'));
    }

    public function resumeUpload(Request $request) {
        $user = Auth::user();
        $file = $request->file('file');
        if (!$this->checkFileSize($file, 5 * 1024 * 1024)) {
            Helpers::ajaxFail('文件太大，请上传5MB以内的文件');
            return;
        }
        $originName = $file->getClientOriginalName();
        $path = Storage::putFile('public/resumes', $file);
        if (!empty($user->resume)) {
            $resume = $user->resume;
            $resume->update([
                'resume_name' => $originName,
                'upload_location' => substr($path, 6)
            ]);
        } else {
            Resume::create([
                'user_id' => $user->id,
                'resume_name' => $originName,
                'upload_location' => substr($path, 6)
            ]);
        }
        Helpers::ajaxSuccess('', ['path' => $path, 'name' => $originName]);
        return;
    }

    private function checkFileSize($file, $size)
    {
        if ($file->getSize() < $size) {
            return true;
        } else {
            return false;
        }
    }

    // api
    public function userLikeComment($comment_id)
    {
        $record = Like::where('comment_id', $comment_id)->where('liking_id', Auth::guard('api')->user()->id)->first();
        if ($record)
            return $record->type;
        return 'nothing';
    }

    public function receiveUpdate($deliver_id) {
        Deliver::find($deliver_id)->update(['receive' => 1]);
        Helpers::ajaxSuccess();
        return;
    }

    public function resumeGet($type)
    {
        return optional(Auth::guard('api')->user()->resume)->$type;
    }

    public function resumeDownload() {
        $resume = Resume::where('user_id', Auth::user()->id)->first();
        $location = $resume->upload_location;
        return response()->download(public_path().'/storage'.$location, $resume->resume_name);
    }
}
