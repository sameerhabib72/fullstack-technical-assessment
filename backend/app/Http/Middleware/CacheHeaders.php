<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CacheHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // PDF 6: API caching headers
        $response->header('Cache-Control', 'public, max-age=3600');
        $response->header('Expires', gmdate('D, d M Y H:i:s', time() + 3600) . ' GMT');
        
        return $response;
    }
}