import React, { useState } from "react";
import useFirebase from "../hooks/useFirebase";

function Item({ task }) {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);

  const { remove, update } = useFirebase();

  const handleDelete = async () => {
    try {
      await remove("tasks", task.id);
    } catch (error) {
      console.error("Task deleted with error:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await update("tasks", task.id, { task: updatedTask });
      setEditing(false);
    } catch (error) {
      console.error("Task updated with error:", error.message);
    }
  };

  const toggleComplete = async () => {
    try {
      await update("tasks", task.id, { completed: !task.completed });
    } catch (error) {
      console.error("Completion error:", error.message);
    }
  };

  return (
    <div className="taskItem">
      <label>
        <input
          className="checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
        />
        {task.completed ? "Completed" : ""}
      </label>
      {editing ? (
        <>
          <input
            className="text"
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <button className="submitBtn" onClick={handleUpdate}>
            Save
          </button>
          <button className="cancelBtn" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <label
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.task}
          </label>
          <button className="deleteBtn" onClick={handleDelete}>
            Delete
          </button>
          <button className="updateBtn" onClick={() => setEditing(true)}>
            Update
          </button>
        </>
      )}
    </div>
  );
}

export default Item;
