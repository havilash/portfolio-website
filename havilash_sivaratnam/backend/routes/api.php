<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function ($router) {
    Route::get('/users', [AuthController::class, 'getUsers'])->middleware('access:ACCESS_ADMIN');
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::patch('/user/{id}', [AuthController::class, 'updateUser'])->middleware('access:ACCESS_ADMIN');
    Route::delete('/user/{id}', [AuthController::class, 'deleteUser'])->middleware('access:ACCESS_ADMIN');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::post('/key', [AuthController::class, 'createKey'])->middleware('access:ACCESS_ADMIN');  
    Route::get('/keys', [AuthController::class, 'getKeys'])->middleware('access:ACCESS_ADMIN');  
    Route::patch('/key/{id}', [AuthController::class, 'updateKey'])->middleware('access:ACCESS_ADMIN');  
    Route::delete('/key/{id}', [AuthController::class, 'deleteKey'])->middleware('access:ACCESS_ADMIN');  
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'data',
], 
function ($router) {
    Route::get('/files', [DataController::class, 'getFiles'])->middleware('access:ACCESS_VERIFIED');
    Route::get('/file/{name}', [DataController::class, 'getFile'])->middleware('access:ACCESS_VERIFIED');
    Route::patch('/file/{name}', [DataController::class, 'updateFile'])->middleware('access:ACCESS_ADMIN');
    Route::delete('/file/{name}', [DataController::class, 'deleteFile'])->middleware('access:ACCESS_ADMIN');
});

