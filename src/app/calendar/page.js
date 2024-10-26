"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarTask() {
  const [date, setDate] = React.useState(new Date());
  const [tasks, setTasks] = React.useState([]);
  const [filteredTasks, setFilteredTasks] = React.useState([]);

  // Fetch tasks from API on component mount
  React.useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/get-task"); // Update the endpoint if needed
        const data = await response.json();
        setTasks(data.tasks); // Assuming response contains tasks in an array
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  // Filter tasks for the selected date
  React.useEffect(() => {
    const filtered = tasks.filter(
      (task) => new Date(task.date).toDateString() === date.toDateString()
    );
    setFilteredTasks(filtered);
  }, [date, tasks]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Tasks for {date.toDateString()}
      </h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border mb-4"
      />

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Tasks:</h3>
        {filteredTasks.length > 0 ? (
          <ul className="mt-2">
            {filteredTasks.map((task) => (
              <li key={task._id} className="py-2 border-b">
                <h4 className="font-bold">{task.title}</h4>
                <p>{task.detail}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for this date.</p>
        )}
      </div>
    </div>
  );
}
