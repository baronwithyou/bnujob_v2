<?php

namespace App\Listeners;

use App\Evaluate;
use App\Events\ChangeEvaluateEvent;
use App\Events\IncrementEvaluateEvent;
use App\Events\IncrementEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ChangeEvaluateListener
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
     * @param  ChangeEvaluateEvent  $event
     * @return void
     */
    public function handle(ChangeEvaluateEvent $event)
    {
        $user_id = $event->getUserId();
        $job_id = $event->getJobId();
        $value = $event->getValue();

        $evaluate = Evaluate::where('user_id', $user_id)->where('job_id', $job_id)->first();
        if (!is_null($evaluate)) {
            event(new IncrementEvent($evaluate, 'grade', $value));
        } else {
            Evaluate::create([
                'user_id' => $user_id,
                'job_id' => $job_id,
                'grade' => $value
            ]);
        }
    }
}
