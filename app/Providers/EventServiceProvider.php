<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\DeliverEvent' => [
            'App\Listeners\IncrementDeliverListener',
        ],
        // 自增model中的value
        'App\Events\IncrementEvent' => [
            'App\Listeners\IncrementListener',
        ],
        'App\Events\DecrementEvent' => [
            'App\Listeners\DecrementListener',
        ],
        // 自增Evaluate表中的grade
        'App\Events\ChangeEvaluateEvent' => [
            'App\Listeners\ChangeEvaluateListener',
        ],
        'App\Events\CollectEvent' => [
            'App\Listeners\UpdateCollectListener'
        ],
        'App\Events\CommentEvent' => [
            'App\Listeners\IncrementCommentEvent'
        ],
        'App\Events\LikeEvent' => [
            'App\Listeners\UpdateLikeListener',
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
