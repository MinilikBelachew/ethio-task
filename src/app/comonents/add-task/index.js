import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set } from "mongoose";

function AddTask({
  openTaskDialog,
  setopenTaskDialog,
  setTaskFormData,
  taskFormData,
  setLoading,
  loading,
  handleSaveTaskData,
  currentEditTaskId,
  setCurrentEditTaskId
}) {
  return (
    <>
      <Button
  onClick={() => setopenTaskDialog(true)}
  className="w-28 sticky bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
>
  Add New Task
</Button>

<Dialog
  open={openTaskDialog}
  onOpenChange={() => {
    setopenTaskDialog(false);
    setTaskFormData({
      title: "",
      detail: "",
    });
    setCurrentEditTaskId(null);
  }}
>
  <DialogContent className="sm:max-w-[450px] bg-white/30 backdrop-blur-lg border border-white/50 shadow-xl rounded-xl p-6 transition-all">
    {/* Loading Spinner */}
    {loading ? (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    ) : null}
    
    {/* Dialog Header */}
    <DialogHeader className="text-center mb-4">
      <DialogTitle className="text-2xl font-bold text-gray-800">
        {currentEditTaskId ? "Edit Task" : "Add New Task"}
      </DialogTitle>
    </DialogHeader>
    
    {/* Task Form */}
    <div className="grid gap-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right text-gray-700 font-medium">
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
        <Label htmlFor="detail" className="text-right text-gray-700 font-medium">
          Task Details
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
    </div>
    
    {/* Dialog Footer */}
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

    </>
  );
}
export default AddTask;
