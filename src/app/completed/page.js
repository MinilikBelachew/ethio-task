"use client"
import { useEffect, useState } from "react";
import TaskManagement from "../comonents/task-manager";

export default function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/api/get-tasks");
        const data = await response.json();
        setTasks(data.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  // Filter for completed tasks
  const completedTasks = tasks.filter(task => task.status === "completed");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Completed Tasks</h1>
      <TaskManagement fetcheddata={completedTasks} />
    </div>
  );
}
