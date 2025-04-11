import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importer Link
import api from "../api/axios";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  // État pour stocker les erreurs potentielles de l'API
  const [errors, setErrors] = useState({}); // <-- Ajouter un état pour les erreurs
  // État pour le statut de chargement (optionnel mais bonne UX)
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Effacer l'erreur spécifique quand l'utilisateur recommence à taper
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Effacer les erreurs précédentes
    setIsLoading(true); // Activer l'état de chargement

    // Vérification basique côté client (optionnel)
    if (formData.password !== formData.password_confirmation) {
        setErrors({ password_confirmation: ["Les mots de passe ne correspondent pas."] });
        setIsLoading(false);
        return; // Arrêter la soumission
    }
     if (formData.password.length < 6) {
        setErrors({ password: ["Le mot de passe doit contenir au moins 6 caractères."] });
        setIsLoading(false);
        return; // Arrêter la soumission
    }

    try {
      // Envoyer l'objet formData complet
      const response = await api.post("/register", formData);

      console.log(response.data); // Succès !
      // Peut-être afficher un message de succès avant de naviguer
      alert("Inscription réussie ! Veuillez vous connecter.");
      navigate("/login");

    } catch (err) {
      console.error("Erreur d'inscription:", err.response); // Logguer toute la réponse pour le débogage
      if (err.response && err.response.status === 422 && err.response.data.errors) {
        // Définir les erreurs de validation venant du backend
        setErrors(err.response.data.errors);
        alert("L'inscription a échoué. Veuillez vérifier les erreurs sous les champs du formulaire."); // Informer l'utilisateur
      } else {
        // Gérer d'autres types d'erreurs (réseau, serveur, etc.)
        setErrors({ general: ["Une erreur inattendue s'est produite. Veuillez réessayer."] });
        alert("Une erreur inattendue s'est produite. Veuillez réessayer plus tard.");
      }
    } finally {
        setIsLoading(false); // Réinitialiser l'état de chargement quel que soit le résultat
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Inscription
        </h2>

        {/* Afficher les erreurs générales */}
        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general[0]}</p>}

        <div>
          <label className="block text-gray-600 mb-1">Nom complet</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            // Mettre en évidence le champ en erreur
            className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300 border-[1px] border-solid'}`}
          />
          {/* Afficher l'erreur spécifique du champ */}
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300 border-[1px] border-solid'}`}
          />
           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Mot de passe</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password} // <-- Ajouter l'attribut value
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300 border-[1px] border-solid'}`}
          />
           {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Confirmer Mot de passe</label>
          <input
            type="password"
            name="password_confirmation"
            required
            value={formData.password_confirmation}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300 border-[1px] border-solid'}`}
          />
           {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading} // Désactiver le bouton pendant le chargement
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>

        <p className="text-center text-sm text-gray-500">
          Déjà inscrit ?{' '}
          {/* Utiliser Link pour la navigation interne */}
          <Link to="/login" className="text-blue-600 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
