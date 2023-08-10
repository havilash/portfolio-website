<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class NewUsers extends Mailable
{
    use Queueable, SerializesModels;

    public $users;
    public $admin;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($users, User $admin)
    {
        $this->users = $users;
        $this->admin = $admin;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $portfolioUrl = env('PORTFOLIO_URL');

        return $this->view('emails.new_users')
            ->with([
                'users' => $this->users,
                'admin' => $this->admin,
                'portfolioUrl' => $portfolioUrl,
            ]);
    }
}
