import React, { useState } from "react";
import useFirebase from "../hooks/useFirebase";
import { Icon } from "@iconify/react";

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
      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />
      {editing ? (
        <>
          <input
            className="text"
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <button className="submitBtn" onClick={handleUpdate}>
            <Icon icon="tabler:device-floppy" width="24" height="24" color="#0e9a04" />
          </button>
          <button className="cancelBtn" onClick={() => setEditing(false)}>
            <Icon icon="material-symbols:cancel" width="24" height="24" color="#ff0000" />
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
            <Icon icon="mdi:trash-can" width="24" height="24" color="#ff0909" />
          </button>
          <button className="updateBtn" onClick={() => setEditing(true)}>
            <Icon icon="tabler:edit" width="24" height="24" color="orange" />
          </button>
        </>
      )}
    </div>
  );
}

export default Item;
