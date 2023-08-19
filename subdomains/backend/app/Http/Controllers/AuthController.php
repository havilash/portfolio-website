<?php
namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Key;
use App\Mail\UserAccessChanged;
use App\Mail\NewUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Update a user's information.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUser(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|between:2,100',
            'comment' => 'sometimes|nullable|string|max:500',
            'access' => 'sometimes|integer|in:0,1,2',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Find the user
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        // Send an email to the user if their access rights have changed
        $data = $validator->validated();
        $user->fill($data);
        if (isset($data['access']) && $data['access'] != User::find($id)->access) {
            try {
                Mail::to($user->email)->send(new UserAccessChanged($user));
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to send email',
                    'message' => $e->getMessage()
                ], 500);
            }
        }
        
        // Update the user's information
        $user->save();

        // Return the response
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ], 200);
    }

    /**
     * Delete a user.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteUser($id)
    {
        // Find the user
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        // Return the response
        return response()->json([
            'message' => 'User deleted successfully',
        ], 200);
    }

    /**
     * Get all users.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsers()
    {
        $users = User::all();

        return response()->json($users, 200);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'comment' => 'nullable|string|max:500',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        
        // Check if a valid key was provided
        Key::where('expires_at', '<', Carbon::now())->delete();
        $accessValue = User::ACCESS_NORMAL;
        if ($request->has('key')) {
            $key = Key::where('key', $request->key)->first();
            if ($key) {
                $accessValue = User::ACCESS_VERIFIED;
                $key->delete();
            } else {
                return response()->json(['error' => 'Invalid key provided'], 400);
            }
        }
        
        // Create a new user instance without saving it
        $user = new User(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'access' => $accessValue,
            ]
        ));

        // Save the user to the database
        $user->save();

        try {
            // Send the email to admins with details of the user that was just saved
            $admins = User::where('access', User::ACCESS_ADMIN)->get();
            foreach ($admins as $admin) {
                Mail::to($admin->email)->send(new NewUser($user, $admin));
            }
        } catch (\Exception $e) {}

        // Return the response
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);

        
        // Return the response
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }
    

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser() {
        return response()->json(auth()->user());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }


    /**
     * Create a new key.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createKey(Request $request)
    {
        $key = new Key;
        $key->key = Str::random(Key::KEY_LENGTH);
        $expiresAt = $request->input('expires_at');
        $key->expires_at = $expiresAt ? Carbon::parse($expiresAt) : now()->addMonth();
        $key->save();
    
        return response()->json([
            'message' => 'Key created successfully',
            'key' => $key
        ], 201);
    }

    /**
     * Delete a key.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteKey($id)
    {
        // Find the key
        $key = Key::find($id);
        if (!$key) {
            return response()->json(['error' => 'Key not found'], 404);
        }

        // Delete the key
        $key->delete();

        // Return the response
        return response()->json([
            'message' => 'Key deleted successfully',
        ], 200);
    }

    /**
     * Update a key.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateKey(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'expires_at' => 'sometimes|date',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Find the key
        $key = Key::find($id);
        if (!$key) {
            return response()->json(['error' => 'Key not found'], 404);
        }

        // Update the key's information
        $data = $validator->validated();
        if (isset($data['expires_at'])) {
            $data['expires_at'] = Carbon::parse($data['expires_at']);
        }
        $key->fill($data);
        $key->save();

        // Return the response
        return response()->json([
            'message' => 'Key updated successfully',
            'key' => $key,
        ], 200);
    }


    /**
     * Get all keys.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getKeys()
    {
        // Get all keys
        $keys = Key::all();

        // Return the response
        return response()->json($keys, 200);
    }
}