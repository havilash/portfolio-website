<?php

namespace Database\Seeders;

use App\Models\File;
use Illuminate\Database\Seeder;

class FileTableSeeder extends Seeder
{
    /**
     * The names of the files to seed.
     *
     * @var array
     */
    protected $fileNames = [
        'cv_classic.pdf',
        'cv_modern.pdf',
        'certificate_ims.pdf',
        'certificate_abacus.pdf',
        'report_card_ims_1.pdf',
        'report_card_ims_2.pdf',
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
