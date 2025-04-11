<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
 
    // use HasApiTokens, HasFactory, Notifiable;
    public function register(Request $request)
    {
        // Validation des données d'entrée

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
    
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
    
        $token = $user->createToken('auth-token')->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

   
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'Identifiants incorrects',
                    'errors' => ['email' => ['Les identifiants sont incorrects.']]
                ], 422);
            }

            $user = Auth::user(); // Récupère l'utilisateur authentifié
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la connexion : ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur interne du serveur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

}

