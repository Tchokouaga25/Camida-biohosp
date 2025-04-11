import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/tasks", {
        title,
        description,
      });

      // Réinitialiser le formulaire après soumission
      setTitle("");
      setDescription("");

      alert("Tâche ajoutée avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la tâche", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Ajouter une tâche</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Titre
        </label>
        <input
          type="text"
          id="title"
          className="w-full px-4 py-2 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-4 py-2 border rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter
      </button>
    </form>
  );
};

export default TaskForm;
