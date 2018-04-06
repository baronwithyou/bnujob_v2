<?php

namespace App\Listeners;

use App\Comment;
use App\Events\ChangeEvaluateEvent;
use App\Events\CommentEvent;
use App\Events\IncrementEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class IncrementCommentEvent
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CommentEvent  $event
     * @return void
     */
    public function handle(CommentEvent $event)
    {
        $job = $event->job;
        $user = $event->user;
        $user_id = $event->user_id;
        $job_id = $event->job_id;
        $grade = config('content.operate_grade.comment');

        event(new IncrementEvent($job, 'commented_count'));
        event(new IncrementEvent($user, 'comments_count'));
        event(new IncrementEvent($user, 'reputation', 5));

        // 增加Evaluate表的grade（如果不存在就创建一个）
        event(new ChangeEvaluateEvent($user_id, $job_id, $grade));
    }
}
