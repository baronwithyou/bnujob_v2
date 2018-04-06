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

class CommentEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $job;
    public $user;
    public $user_id;
    public $job_id;
    public function __construct($user_id, $job_id)
    {
        // 需要修改的参数有：用户评论数、兼职被评论数、评论表
        $this->job = Job::find($job_id);
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
