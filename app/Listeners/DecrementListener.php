<?php

namespace App\Listeners;

use App\Events\DecrementEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class DecrementListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */

    /**
     * Handle the event.
     *
     * @param  DecrementEvent  $event
     * @return void
     */
    public function handle(DecrementEvent $event)
    {
        $model = $event->getModel();
        $param = $event->getParam();
        $value = $event->getValue();
        $model->decrement($param, $value);
    }
}
