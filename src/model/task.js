import mongoose from "mongoose";

const Taskschema = new mongoose.Schema({
task_name:{
    type: String,
    required: true,
},
});

export default mongoose.models.Task || mongoose.model("Task", Taskschema)