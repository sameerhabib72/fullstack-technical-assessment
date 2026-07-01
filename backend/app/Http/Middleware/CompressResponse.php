<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CompressResponse
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // PDF 6: Enable gzip/Brotli compression only in production
        if (app()->environment('production')) {
            // Check if client accepts gzip
            if (in_array('gzip', $request->getEncodings())) {
                $response->header('Content-Encoding', 'gzip');
            }
            
            // Check if client accepts brotli
            if (in_array('br', $request->getEncodings())) {
                $response->header('Content-Encoding', 'br');
            }
        }
        
        return $response;
    }
}