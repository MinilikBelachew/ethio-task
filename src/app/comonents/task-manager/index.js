"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddTask from "../add-task";
import Navbar from "../navbar/page";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Home from "@/app/page";

const initialTaskData = {
  title: "",
  detail: "",
  priority: "medium",
  status: "pending",
  dueDate: "",
};

function TaskManagement({ fetcheddata }) {
  const [openTaskDialog, setopenTaskDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskFormData, setTaskFormData] = useState(initialTaskData);
  const [currentEditTaskId, setCurrentEditTaskId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveTaskData() {
    setLoading(true);
    try {
      const response =
        currentEditTaskId !== null
          ? await fetch(`/api/update-task?id=${currentEditTaskId}`, {
              method: "PUT",
              body: JSON.stringify(taskFormData),
            })
          : await fetch("/api/add-task", {
              method: "POST",
              body: JSON.stringify(taskFormData),
            });
      const result = await response.json();
      if (result.success) {
        setTaskFormData(initialTaskData);
        setopenTaskDialog(false);
        setCurrentEditTaskId(null);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTask(taskid) {
    try {
      await fetch(`/api/delete-task?id=${taskid}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate(taskdata) {
    setCurrentEditTaskId(taskdata?._id);
    setTaskFormData({
      title: taskdata?.title,
      detail: taskdata?.detail,
      priority: taskdata?.priority,
      status: taskdata?.status,
      dueDate: taskdata?.dueDate,
    });
    setopenTaskDialog(true);
  }

  return (
    <div className="min-h-screen flex flex-col gap-10  p-6">
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
      <Navbar setopenTaskDialog={setopenTaskDialog} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {fetcheddata && fetcheddata.length > 0 ? (
          fetcheddata.map((task) => (
            <div
              key={task.id}
              className="bg-white/30 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300 border border-white/40 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {task?.title}
                </h3>
                <p className="text-gray-600 mb-4 overflow-hidden line-clamp-2">
                  {task?.detail}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Priority:</strong> {task?.priority}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> {task?.status}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Due Date:</strong> {task?.dueDate || "No due date"}
                </p>

                <div className="flex flex-col sm:flex-row justify-start gap-4 items-center mt-4">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
                  >
                    <span className="flex items-center justify-center">
                      <FaEdit size={20} className="px-1" />
                      Update
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all"
                  >
                    <span className="flex items-center justify-center">
                      <FaTrash size={20} className="px-1" />
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-xl">No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default TaskManagement;
