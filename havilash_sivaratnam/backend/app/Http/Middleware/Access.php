<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class Access
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $accessRight
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $accessRight)
    {
        // Check if the user is authenticated
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // Check if the user has the required access-right value
        $requiredAccessRight = constant(User::class . '::' . $accessRight);
        if (auth()->user()->access < $requiredAccessRight) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}