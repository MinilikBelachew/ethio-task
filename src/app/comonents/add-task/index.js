import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

function AddTask({
  openTaskDialog,
  setopenTaskDialog,
  setTaskFormData,
  taskFormData,
  setLoading,
  loading,
  handleSaveTaskData,
  currentEditTaskId,
  setCurrentEditTaskId,
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <Dialog
      open={openTaskDialog}
      onOpenChange={() => {
        setopenTaskDialog(false);
        setTaskFormData({
          title: "",
          detail: "",
          priority: "medium",
          status: "pending",
          dueDate: "",
        });
        setCurrentEditTaskId(null);
      }}
    >
      <DialogContent className="sm:max-w-[450px] bg-white/30 backdrop-blur-lg border border-white/50 shadow-xl rounded-xl p-6 transition-all">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : null}

        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {currentEditTaskId ? "Edit Task" : "Add New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-black font-medium text-md">
              Title
            </Label>
            <Input
              name="title"
              placeholder="Enter Task Title"
              value={taskFormData.title}
              onChange={(event) =>
                setTaskFormData({
                  ...taskFormData,
                  title: event.target.value,
                })
              }
              className="col-span-3 bg-white/20 backdrop-blur-lg border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="detail" className="text-right text-black font-medium text-md">
              Details
            </Label>
            <Input
              name="detail"
              placeholder="Enter Task Details"
              value={taskFormData.detail}
              onChange={(event) =>
                setTaskFormData({
                  ...taskFormData,
                  detail: event.target.value,
                })
              }
              className="col-span-3 bg-white/20 backdrop-blur-lg border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Priority */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right text-black font-medium text-md">
              Priority
            </Label>
            <select
              name="priority"
              value={taskFormData.priority}
              onChange={(event) =>
                setTaskFormData({
                  ...taskFormData,
                  priority: event.target.value,
                })
              }
              className="col-span-3 bg-white/20 backdrop-blur-lg border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right text-black font-medium text-md">
              Status
            </Label>
            <select
              name="status"
              value={taskFormData.status}
              onChange={(event) =>
                setTaskFormData({
                  ...taskFormData,
                  status: event.target.value,
                })
              }
              className="col-span-3 bg-white/20 backdrop-blur-lg border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right text-black font-medium text-md">
              Due Date
            </Label>
            <div className="col-span-3 flex items-center gap-2 relative">
              <Input
                type="text"
                name="dueDate"
                placeholder="Select Due Date"
                value={taskFormData.dueDate}
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-white/20 backdrop-blur-lg border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                readOnly
              />
              <FaCalendarAlt
                onClick={() => setShowCalendar(!showCalendar)}
                className="text-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {showCalendar && (
            <div className="absolute mt-2 left-1/2 transform -translate-x-1/2">
              <Calendar
                mode="single"
                selected={taskFormData.dueDate ? new Date(taskFormData.dueDate) : undefined}
                onSelect={(date) => {
                  setTaskFormData({
                    ...taskFormData,
                    dueDate: date?.toISOString().split("T")[0],
                  });
                  setShowCalendar(false); // Hide calendar after date selection
                }}
                className="rounded-md border mt-2"
              />
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            onClick={handleSaveTaskData}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all"
          >
            {currentEditTaskId ? "Save Changes" : "Add Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
