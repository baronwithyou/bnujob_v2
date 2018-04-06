<?php

namespace App\Listeners;

use App\Comment;
use App\Events\ChangeEvaluateEvent;
use App\Events\DecrementEvent;
use App\Events\IncrementEvent;
use App\Events\LikeEvent;
use App\Like;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateLikeListener
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
     * @param  LikeEvent  $event
     * @return void
     */
    public function handle(LikeEvent $event)
    {
        $user = $event->user;
        $user_id = $event->user_id;
        $job_id = $event->job_id;
        $comment_id = $event->comment_id;
        $grade = config('content.operate_grade.like');

        $record = Like::where('liking_id', $user_id)->where('comment_id', $comment_id)->first();
        if (empty($record)) {
            event(new IncrementEvent($user, 'likes_count'));
            event(new IncrementEvent($user, 'reputation', 5));

            // 增加Evaluate表的grade（如果不存在就创建一个）
            event(new ChangeEvaluateEvent($user_id, $job_id, $grade));
        } else {
            event(new DecrementEvent($user, 'likes_count'));
            event(new DecrementEvent($user, 'reputation', 5));

            // 增加Evaluate表的grade（如果不存在就创建一个）
            event(new ChangeEvaluateEvent($user_id, $job_id, 0 -$grade));
        }
    }
}
