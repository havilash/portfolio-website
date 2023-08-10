<?php

namespace Database\Seeders;

use App\Models\File;
use Illuminate\Database\Seeder;

class DataTableSeeder extends Seeder
{
    /**
     * The names of the files to seed.
     *
     * @var array
     */
    protected $fileNames = [
        'all.zip',
        'cv.pdf',
        'certificate.pdf',
        'report_card.pdf',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->fileNames as $fileName) {
            File::create([
                'name' => $fileName,
                'file' => null,
            ]);
        }
    }
}
