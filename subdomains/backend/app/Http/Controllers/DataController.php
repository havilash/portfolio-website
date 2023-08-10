<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    
        // Map over the files and encode the binary data as a Base64 string
        $files = $files->map(function ($file) {
            $file->file = base64_encode($file->file);
            return $file;
        });
    
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
    
        // Encode the binary data as a Base64 string
        $file->file = base64_encode($file->file);
    
        return response()->json($file, 200);
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
        $validator = Validator::make($request->all(), [
            'file' => 'sometimes|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        // Find the file
        $file = File::where('name', $name)->first();
        
        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }
        
        // Decode the Base64-encoded string
        $content = base64_decode(preg_replace('#^data:application/[\w-]+;base64,#i', '', $request->input('file')));
        
        // Update the file's information and content
        $file->fill($request->except('file'));
        $file->file = $content;
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
    public function createFile(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100|unique:files',
            'file' => 'sometimes|string|nullable',
        ]);
    
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
    
        // Create the file
        $file = new File($validator->validated());
    
        // Decode the Base64-encoded string
        $content = base64_decode(preg_replace('#^data:application/[\w-]+;base64,#i', '', $request->input('file')));
    
        // Update the file's content
        $file->file = $content;
    
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
