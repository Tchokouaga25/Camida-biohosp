<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
      // 📝 Enregistrement

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Utilisateur créé avec succès'], 201);
    }
  
    // 🔑 Connexion
    public function login(Request $request)
    {
        // Log::info($request->all());
        Log::info('Requête reçue : ', $request->all());
        Log::info('Mot de passe reçu : ' . $request->password);
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
        $user = User::where('email', $request->email)->first();
        Log::info('Hash enregistré : ' . ($user ? $user->password : 'Utilisateur non trouvé'));
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    // 🔓 Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

      // 👤 Récupérer l'utilisateur connecté
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
  
}
