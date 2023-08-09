<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::count() === 0) {
            $this->call(UsersTableSeeder::class);
        }

        if (File::count() === 0) {
            $this->call(DataTableSeeder::class);
        }
    }
}
