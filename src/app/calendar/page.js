"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarTask() {
  const [date, setDate] = React.useState(new Date());
  const [tasks, setTasks] = React.useState([]); // Store tasks
  const [filteredTasks, setFilteredTasks] = React.useState([]); // Store tasks for the selected date

  // Example task data
  const exampleTasks = [
    { id: 1, date: new Date(2024, 10, 24), title: "Meeting with team" },
    { id: 2, date: new Date(2024, 10, 25), title: "Project deadline" },
    { id: 3, date: new Date(2024, 10, 24), title: "Doctor appointment" },
  ];

  // Update tasks based on the selected date
  React.useEffect(() => {
    const filtered = exampleTasks.filter(
      (task) =>
        task.date.toDateString() === date.toDateString()
    );
    setFilteredTasks(filtered);
  }, [date]);

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
              <li key={task.id} className="py-2 border-b">
                {task.title}
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
