<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('access:ACCESS_VERIFIED');
        $this->middleware('auth:api');
    }

    public function file($file){
        $path = storage_path('app/files/' . $file);

        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }
    
        return response()->file($path, [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
