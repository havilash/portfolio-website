<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class BackupDatabase extends Command
{
    protected $signature = 'backup:database';

    protected $description = 'Create a backup of the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Delete old backups
        $files = Storage::disk('local')->files('backups');
        $threshold = Carbon::now()->subWeeks(3);
        foreach ($files as $file) {
            if (Carbon::createFromTimestamp(Storage::disk('local')->lastModified($file))->lt($threshold)) {
                Storage::disk('local')->delete($file);
            }
        }

        // Set the backup file name
        $date = Carbon::now()->format('Y-m-d\TH-i');
        $filename = "database-backup-{$date}.sql";

        // Create the backup directory if it doesn't exist
        Storage::disk('local')->makeDirectory('backups');

        // Set the path to the backup file
        $path = storage_path('app/backups/' . $filename);

        // Create the backup
        exec('mysqldump --user=' . env('DB_USERNAME') . ' --password=' . env('DB_PASSWORD') . ' --host=' . env('DB_HOST') . ' ' . env('DB_DATABASE') . ' > ' . $path);

        $this->info('Backup created: ' . $filename);

    }
}
