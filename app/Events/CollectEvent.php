<?php

namespace App\Events;

use App\Job;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CollectEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $job;
    public $business;
    public $user;
    public $user_id;
    public $job_id;

    public function __construct($user_id, $job_id)
    {
        // 要增加的参数有：1. 用户的收藏数量 2. 商家的被收藏数量 3. 收藏表 4. 兼职表的被收藏数量 5. 用户的评分表
        $this->job = Job::find($job_id);
        $this->business = $this->job->business;
        $this->user = User::find($user_id);
        $this->user_id = $user_id;
        $this->job_id = $job_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
