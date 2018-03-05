<?php

namespace App\Listeners;

use App\Events\IncrementEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class IncrementListener
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
     * @param  IncrementEvent  $event
     * @return void
     */
    public function handle(IncrementEvent $event)
    {
        $model = $event->getModel();
        $param = $event->getParam();
        $value = $event->getValue();
        $model->increment($param, $value);
    }
}
