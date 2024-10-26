"use client"
import { useEffect, useState } from "react";
import TaskManagement from "../comonents/task-manager";

export default function PendingTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/api/get-tasks");
        const data = await response.json();
        setTasks(data.data || []); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  // Filter for pending tasks
  const pendingTasks = tasks.filter(task => task.status === "pending");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Pending Tasks</h1>
      <TaskManagement fetcheddata={pendingTasks}/>
 
    </div>
  );
}
