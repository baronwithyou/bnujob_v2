<?php

namespace App\Listeners;

use App\Events\ChangeEvaluateEvent;
use App\Events\CreateIfNotExistsEvent;
use App\Events\DeliverEvent;
use App\Events\IncrementEvaluateEvent;
use App\Events\IncrementEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class IncrementDeliverListener
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
     * @param  DeliverEvent  $event
     * @return void
     */
    public function handle(DeliverEvent $event)
    {
        $business = $event->getBusiness();
        $job = $event->getJob();
        $user = $event->getUser();
        $user_id = $event->getUserId();
        $job_id = $event->getJobId();
        $grade = config('content.operate_grade.deliver');

        // 增加各个数据库的delivered_count（肯定存在）
        event(new IncrementEvent($business, 'delivered_count'));
        event(new IncrementEvent($job, 'delivered_count'));
        event(new IncrementEvent($user, 'delivers_count'));
        event(new IncrementEvent($user, 'reputation', 5));

        // 增加Evaluate表的grade（如果不存在就创建一个）
        event(new ChangeEvaluateEvent($user_id, $job_id, $grade));
    }
}
