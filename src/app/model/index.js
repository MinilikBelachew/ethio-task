import mongoose from "mongoose";

const TaskSchema= new mongoose.Schema({
    title: String,
    detail: String,

});


const Task =mongoose.models.Task || mongoose.model("Task",TaskSchema);

export default Task;