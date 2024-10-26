import mongoose from "mongoose";

const TaskSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      detail: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
      },
      priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
      dueDate: {
        type: Date,
      },
    // title: String,
    // detail: String,

});


const Task =mongoose.models.Task || mongoose.model("Task",TaskSchema);

export default Task;