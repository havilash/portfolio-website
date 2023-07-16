<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Mail\NewUsers;
use App\Models\User;
use Carbon\Carbon;
use Mail;

class SendNewUsersEmail extends Command
{
    protected $signature = 'email:new-users';

    protected $description = 'Send a daily email with all new users';

    public function handle()
    {
        // Get all new users registered in the past 24 hours
        $newUsers = User::where('created_at', '>=', Carbon::now()->subDay())->get();

        // Send the email if there are new users
        if ($newUsers->count() > 0) {
            $admins = User::where('access', User::ACCESS_ADMIN)->get();
            foreach ($admins as $admin) {
                Mail::to($admin->email)->send(new NewUsers($newUsers, $admin));
            }
        }
    }
}
