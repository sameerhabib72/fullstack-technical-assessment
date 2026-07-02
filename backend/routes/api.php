<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
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

// PUBLIC ROUTES - No Auth Required

// Hero - Public GET
Route::get('/hero', [HeroController::class, 'index']);

Route::get('/about', [AboutController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/features', [FeatureController::class, 'index']);
Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);
Route::get('/faqs', [FaqController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store']);

// AUTH ROUTES

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// PROTECTED ROUTES

Route::middleware(['auth:sanctum'])->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    Route::get('/hero/{id}', [HeroController::class, 'show']); 
    Route::post('/hero', [HeroController::class, 'store']);
    Route::put('/hero/{id}', [HeroController::class, 'update']);
    Route::delete('/hero/{id}', [HeroController::class, 'destroy']);
    Route::patch('/hero/{id}/toggle-status', [HeroController::class, 'toggleStatus']);
    
    // ABOUT
    Route::get('/about/{id}', [AboutController::class, 'show']);
    Route::post('/about', [AboutController::class, 'store']);
    Route::put('/about/{id}', [AboutController::class, 'update']);
    Route::delete('/about/{id}', [AboutController::class, 'destroy']);
    
    // SERVICES
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    Route::patch('/services/{id}/toggle-status', [ServiceController::class, 'toggleStatus']);
    
    // FEATURES
    Route::get('/features/{id}', [FeatureController::class, 'show']);
    Route::post('/features', [FeatureController::class, 'store']);
    Route::put('/features/{id}', [FeatureController::class, 'update']);
    Route::delete('/features/{id}', [FeatureController::class, 'destroy']);
    
    // PORTFOLIO
    Route::get('/portfolio/{id}', [PortfolioController::class, 'show']);
    Route::post('/portfolio', [PortfolioController::class, 'store']);
    Route::put('/portfolio/{id}', [PortfolioController::class, 'update']);
    Route::delete('/portfolio/{id}', [PortfolioController::class, 'destroy']);
    
    // TESTIMONIALS
    Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);
    
    // TEAM
    Route::get('/team/{id}', [TeamController::class, 'show']);
    Route::post('/team', [TeamController::class, 'store']);
    Route::put('/team/{id}', [TeamController::class, 'update']);
    Route::delete('/team/{id}', [TeamController::class, 'destroy']);
    
    // FAQS
    Route::get('/faqs/{id}', [FaqController::class, 'show']);
    Route::post('/faqs', [FaqController::class, 'store']);
    Route::put('/faqs/{id}', [FaqController::class, 'update']);
    Route::delete('/faqs/{id}', [FaqController::class, 'destroy']);
    Route::patch('/faqs/{id}/toggle-status', [FaqController::class, 'toggleStatus']);
    
    // CONTACT MESSAGES
    Route::prefix('contact')->group(function () {
        Route::get('/messages', [ContactController::class, 'index']);
        Route::get('/messages/{id}', [ContactController::class, 'show']);
        Route::put('/messages/{id}/read', [ContactController::class, 'markAsRead']);
        Route::delete('/messages/{id}', [ContactController::class, 'destroy']);
        Route::get('/unread-count', [ContactController::class, 'unreadCount']);
    });
});