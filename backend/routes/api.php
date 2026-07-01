<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    HeroController,
    AboutController,
    ServiceController,
    FeatureController,
    PortfolioController,
    TestimonialController,
    TeamController,
    FaqController,
    ContactController
};

// --- PUBLIC ROUTES (Frontend access karega) ---

Route::get('/hero', [HeroController::class, 'index']);
Route::get('/about', [AboutController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/features', [FeatureController::class, 'index']);
Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);
Route::get('/faqs', [FaqController::class, 'index']);

// // Contact Form (Rate limit: 5 messages per minute)
Route::middleware('throttle:5,1')->post('/contact', [ContactController::class, 'store']);

// --- PROTECTED ROUTES (Admin ke liye - Step 10 mein detail se karenge) ---
// Route::middleware('auth:sanctum')->group(function () {
//    Route::apiResource('services', ServiceController::class)->except('index');
//    ... baqi CRUD operations
// });