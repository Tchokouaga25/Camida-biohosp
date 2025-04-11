<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;



// 🛂 Routes publiques (avant authentification)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🔒 Routes protégées par Sanctum (token requis)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Exemple de routes protégées
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

   

    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
    Route::patch('/tasks/{task}/toggle', [TaskController::class, 'toggle']);
    
});
