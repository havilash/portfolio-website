<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Key;
use Carbon\Carbon;
use Validator;
use Illuminate\Support\Str;

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

        // Update the user's information
        $data = $validator->validated();
        $user->fill($data);
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
    
        // Create the user
        $user = User::create(array_merge(
                    $validator->validated(),
                    [
                        'password' => bcrypt($request->password),
                        'access' => $accessValue,
                    ]
                ));
    
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

    public function createKey(Request $request)
    {
        $key = new Key;
        $key->key = Str::random(Key::KEY_LENGTH);
        $expiresAt = $request->input('expires_at');
        $key->expires_at = $expiresAt ? Carbon::parse($expiresAt) : now()->addMonth();
        $key->save();
    
        return response()->json(['key' => $key->key], 201);
    }
}