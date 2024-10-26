"use client";

import { useEffect, useState } from "react";

export default function Home({ setopenTaskDialog }) {
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    pending: 0,
    completed: 0,
    inProgress: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/api/get-tasks");
        const data = await response.json();

        setTasks(data.data || []);
        console.log(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const pendingTasks = tasks.filter((task) => task.status === "pending").length;
      const completedTasks = tasks.filter((task) => task.status === "completed").length;
      const inProgressTasks = tasks.filter((task) => task.status === "inprogress").length;

      setTaskCounts({
        pending: pendingTasks,
        completed: completedTasks,
        inProgress: inProgressTasks,
      });
    }
  }, [tasks]);

  const filteredTasks =
    searchTerm.length > 0
      ? tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.detail.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 text-gray-100">
      <h1 className="text-4xl font-bold tracking-wide mb-4">Welcome Back!</h1>
      <p className="text-md mb-8 text-gray-200">Here’s a quick look at your tasks.</p>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 w-full max-w-lg shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold text-gray-200 text-center mb-4">Task Summary</h2>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-3xl font-semibold text-yellow-300">{taskCounts.pending}</p>
            <p className="text-gray-300">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold text-blue-300">{taskCounts.inProgress}</p>
            <p className="text-gray-300">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold text-green-300">{taskCounts.completed}</p>
            <p className="text-gray-300">Completed</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mt-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg shadow-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200"
        />
      </div>

      {searchTerm && (
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 w-full max-w-lg shadow-xl mt-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-200 text-center mb-4">Filtered Tasks</h2>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="p-4 rounded-lg bg-gray-900 bg-opacity-40 text-gray-100 shadow-md transition duration-300 hover:bg-opacity-60"
              >
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-gray-400">{task.detail}</p>
                <p className="text-sm text-gray-500 mt-2">Status: {task.status}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300">No tasks found.</p>
          )}
        </div>
      )}
    </div>
  );
}


// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export default function DialogDem() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue="Pedro Duarte"
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input
//               id="username"
//               defaultValue="@peduarte"
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
