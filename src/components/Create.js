import React, { useState } from "react";
import useFirebase from "../hooks/useFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [newTask, setNewTask] = useState("");

  const { add } = useFirebase();

  const handleCreate = async () => {
    if (newTask.trim() !== "") {
      try {
        await add("tasks", {
          task: newTask,
          completed: false,
          createdAt: new Date(),
        });

        setNewTask("");
        toast.success("Task created successfully!");
      } catch (error) {
        console.error("Task created with error:", error.message);
        toast.error("Task created with error: " + error.message);
      }
    } else {
      toast.warning("Please enter a task!");
    }
  };

  return (
    <div className="Create">
      <label>Create New Task</label>
      <input
        type="text"
        placeholder="Enter your task."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      <ToastContainer />
    </div>
  );
}

export default Create;