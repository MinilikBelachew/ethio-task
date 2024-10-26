"use client"

import { useEffect, useState } from "react";
import TaskManagement from "../comonents/task-manager";

export default function InProgressTasks() {
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

  const inProgressTasks = tasks.filter(task => task.status === "inprogress");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">In Progress Tasks</h1>
      <TaskManagement fetcheddata={inProgressTasks} />
    </div>
  );
}
