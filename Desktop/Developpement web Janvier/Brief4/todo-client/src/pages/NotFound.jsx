// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
    <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Non Trouvée</h2>
    <p className="text-gray-600 mb-6">Désolé, la page que vous cherchez n'existe pas ou a été déplacée.</p>
    <Link 
      to="/" 
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Retour à l'accueil
    </Link>
  </div>
);

export default NotFound;
