"use client";

import { useEffect, useState } from "react";

import AddTask from "../add-task";
import GetTask from "../get-task/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const initialTaskData = {
  title: "",
  detail: "",
};

function TaskManagement({ fetcheddata }) {
  const [openTaskDialog, setopenTaskDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskFormData, setTaskFormData] = useState(initialTaskData);
  const [currentEditTaskId, setCurrentEditTaskId] = useState(null);
  console.log(taskFormData);

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveTaskData() {
    try {
      setLoading(true);
      const apiResponse =
        currentEditTaskId !== null
          ? await fetch(`/api/update-task?id=${currentEditTaskId}`, {
              method: "PUT",
              body: JSON.stringify(taskFormData),
            })
          : await fetch("/api/add-task", {
              method: "POST",
              body: JSON.stringify(taskFormData),
            });
      const result = await apiResponse.json();
      if (result?.success) {
        setTaskFormData(initialTaskData);
        setopenTaskDialog(false);
        setLoading(false);
        setCurrentEditTaskId(null);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);

      setTaskFormData(initialTaskData);
    }
  }
  async function handleDeleteTask(taskid) {
    try {
      const apiResponse = await fetch(`/api/delete-task?id=${taskid}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) router.refresh();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdate(taskdata) {
    setCurrentEditTaskId(taskdata?._id);
    setTaskFormData({
      title: taskdata?.title,
      detail: taskdata?.detail,
    });
    setopenTaskDialog(true);
    console.log(taskdata._id);
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-gray-300 to-indigo-400 p-6">
      <AddTask
        openTaskDialog={openTaskDialog}
        setopenTaskDialog={setopenTaskDialog}
        loading={loading}
        setLoading={setLoading}
        taskFormData={taskFormData}
        setTaskFormData={setTaskFormData}
        handleSaveTaskData={handleSaveTaskData}
        currentEditTaskId={currentEditTaskId}
        setCurrentEditTaskId={setCurrentEditTaskId}
      />
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
  {fetcheddata && fetcheddata.length > 0 ? (
    fetcheddata.map((task) => (
      <div
        key={task.id}
        className="bg-white/30 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300 border border-white/40 overflow-hidden"
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {task?.title}
          </h3>

          {/* Display two lines of text with ellipsis if it exceeds */}
          <p className="text-gray-600 mb-4 overflow-hidden line-clamp-2">
            {task?.detail}
          </p>

          {/* Responsive Button Layout */}
          <div className="flex flex-col sm:flex-row justify-start gap-4 items-center mt-4">
            <button
              onClick={() => handleUpdate(task)}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12h3m0 0v3m0-3v-3m0 0h-3m6-6h-6a2 2 0 00-2 2v6m8 8h-8a2 2 0 01-2-2v-6a2 2 0 012-2h6"
                  />
                </svg>
                Update
              </span>
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12h3m0 0v3m0-3v-3m0 0h-3m6-6h-6a2 2 0 00-2 2v6m8 8h-8a2 2 0 01-2-2v-6a2 2 0 012-2h6"
                  />
                </svg>
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center text-xl">
      No tasks available
    </p>
  )}
</div>


    </div>
  );
}
export default TaskManagement;