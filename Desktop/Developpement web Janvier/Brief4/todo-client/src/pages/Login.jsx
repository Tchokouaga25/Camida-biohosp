import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

        const navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    
  
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log({ email, password });
            
            try {
                const response = await api.post("/login", { email, password });
                
                console.log(response.data);
        
                // Stocker le token
                localStorage.setItem("token", response.data.token);
        
                // Rediriger vers le dashboard ou autre
                navigate("/dashboard");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                      // Afficher les erreurs de validation
                      alert("Erreur de validation : " + JSON.stringify(error.response.data.errors));
                    } else {
                      alert("Erreur : " + error.response.data.message);
                    }
                  } else {
                    console.error(error);
                    alert("Une erreur inattendue s'est produite.");
                }
            }
        };
    

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-8">
                    {/* En-tête */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-800">Connexion</h1>
                        <p className="text-gray-500 text-sm">Accédez à votre espace sécurisé</p>
                    </div>
                    

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Champ Email */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-200 border-solid rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    
                                    onChange={(e) => setEmail(e.target.value)}
                                
                                    placeholder="exemple@email.com"
                                />
                            </div>
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 border-solid rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Se connecter
                        </button>
                    </form>

                    {/* Liens supplémentaires */}
                    <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-100 border-solid">
                        <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                            Mot de passe oublié ?
                        </a>
                        <p className="text-sm text-gray-500">
                            Pas de compte ?{' '}
                            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                            S'inscrire
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
}