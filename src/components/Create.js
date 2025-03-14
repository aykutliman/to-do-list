import React, { useState } from "react";
import useFirebase from "../hooks/useFirebase";

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
      } catch (error) {
        console.error("Task created with error:", error.message);
        alert("Task created with error: " + error.message);
      }
    } else {
      alert("Please enter a task!");
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
    </div>
  );
}

export default Create;
