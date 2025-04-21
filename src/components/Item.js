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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#0e9a04"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.828a2 2 0 0 0-.586-1.414l-1.828-1.828A2 2 0 0 0 16.172 4H15M8 4v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4M8 4h7M7 17v-3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"
              ></path>
            </svg>
          </button>
          <button className="cancelBtn" onClick={() => setEditing(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4b4b4b"
                d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              ></path>
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ff0909"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
              ></path>
            </svg>
          </button>
          <button className="updateBtn" onClick={() => setEditing(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="orange"
                d="M12 21q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 12t.713-3.512t1.924-2.85t2.85-1.925T12 3q2.05 0 3.888.875T19 6.35V4h2v6h-6V8h2.75q-1.025-1.4-2.525-2.2T12 5Q9.075 5 7.038 7.038T5 12t2.038 4.963T12 19q2.625 0 4.588-1.7T18.9 13h2.05q-.375 3.425-2.937 5.713T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z"
              ></path>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default Item;
