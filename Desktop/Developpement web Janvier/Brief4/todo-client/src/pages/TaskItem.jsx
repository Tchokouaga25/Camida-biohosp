import React from "react";
import axios from "axios";

const TaskItem = ({ task }) => {
  const handleToggle = async () => {
    try {
      await axios.patch(`http://localhost:8000/api/tasks/${task.id}/toggle`);
      // Rafraîchir la page pour voir les changements (toggle completed)
      window.location.reload();
    } catch (err) {
      console.error("Erreur lors du changement de statut de la tâche", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${task.id}`);
      // Rafraîchir la page après la suppression
      window.location.reload();
    } catch (err) {
      console.error("Erreur lors de la suppression de la tâche", err);
    }
  };

  return (
    <li className="flex justify-between items-center mb-2">
      <span
        className={`${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.title}
      </span>
      <div>
        <button onClick={handleToggle} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
          {task.completed ? "Réactiver" : "Terminer"}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">
          Supprimer
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
