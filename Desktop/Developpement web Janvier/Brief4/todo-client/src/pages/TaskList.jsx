import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Récupérer les tâches depuis l'API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks");
        setTasks(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des tâches", err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Liste des tâches</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
