<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class DataController extends Controller
{
    /**
     * Create a new DataController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Get all files.
     *
     * @return \Illuminate\Http\Response
     */
    public function getFiles()
    {
        $files = File::all();

        return response()->json($files, 200);
    }

    /**
     * Get a file by its name.
     *
     * @param string $name
     * @return \Illuminate\Http\Response
     */
    public function getFile($name)
    {
        $file = File::where('name', $name)->first();

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        } 
        if (!$file->file) {
            return response()->json(['error' => 'File not set'], 422);
        }

        return response($file->content)->header('Content-Type', 'application/pdf');
    }

    /**
     * Update a file by its name.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $name
     * @return \Illuminate\Http\Response
     */
    public function updateFile(Request $request, $name)
    {
        // Find the file
        $file = File::where('name', $name)->first();

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        // Update the file's information
        $data = $request->all();
        $file->fill($data);
        $file->save();

        // Return the response
        return response()->json(['success' => 'File updated successfully'], 200);
    }

    /**
     * Create a file by its name.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $name
     * @return \Illuminate\Http\Response
     */
    public function createFile(Request $request)
    {
        // Create the file
        $file = new File;
        $data = $request->all();
        $file->fill($data);
        $file->save();

        // Return the response
        return response()->json(['success' => 'File created successfully'], 201);
    }


    /**
     * Delete a file by its name.
     *
     * @param string $name
     * @return \Illuminate\Http\Response
     */
    public function deleteFile($name)
    {
        $file = File::where('name', $name)->first();

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $file->delete();

        return response()->json(['success' => 'File deleted successfully'], 200);
    }


}
