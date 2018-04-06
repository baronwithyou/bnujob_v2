<?php

namespace App\Listeners;

use App\Collect;
use App\Events\ChangeEvaluateEvent;
use App\Events\CollectEvent;
use App\Events\DecrementEvent;
use App\Events\IncrementEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateCollectListener
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
     *ee
     * @param  CollectEvent  $event
     * @return void
     */
    public function handle(CollectEvent $event)
    {
        $business = $event->business;
        $job = $event->job;
        $user = $event->user;
        $user_id = $event->user_id;
        $job_id = $event->job_id;
        $grade = config('content.operate_grade.collect');

        // 增加各个数据库的delivered_count（肯定存在）
        $record = Collect::where('user_id', $user_id)->where('job_id', $job_id)->first();
        if (!empty($record)) {
            event(new IncrementEvent($business, 'collected_count'));
            event(new IncrementEvent($job, 'collected_count'));
            event(new IncrementEvent($user, 'collects_count'));
            event(new IncrementEvent($user, 'reputation', 5));

            // 增加Evaluate表的grade（如果不存在就创建一个）
            event(new ChangeEvaluateEvent($user_id, $job_id, $grade));
        } else {
            event(new DecrementEvent($business, 'collected_count'));
            event(new DecrementEvent($job, 'collected_count'));
            event(new DecrementEvent($user, 'collects_count'));
            event(new DecrementEvent($user, 'reputation', 5));

            event(new ChangeEvaluateEvent($user_id, $job_id, 0 -$grade));
        }
    }
}
