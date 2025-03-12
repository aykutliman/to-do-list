import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

function Item({ task, user }) {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);

  const handleDelete = async () => {
    if (!user) return;
    try {
      const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error("Görev silinirken hata oluştu:", error.message);
    }
  };

  const handleUpdate = async () => {
    if (!user || updatedTask.trim() === "") return;
    try {
      const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
      await updateDoc(taskDocRef, { task: updatedTask });
      setEditing(false);
    } catch (error) {
      console.error("Görev güncellenirken hata oluştu:", error.message);
    }
  };

  const toggleComplete = async () => {
    if (!user) return;
    try {
      const taskDocRef = doc(db, "users", user.uid, "tasks", task.id);
      await updateDoc(taskDocRef, { completed: !task.completed });
    } catch (error) {
      console.error("Tamamlama hatası:", error.message);
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
        {task.completed ? "Tamamlandı" : ""}
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
            Kaydet
          </button>
          <button className="cancelBtn" onClick={() => setEditing(false)}>
            İptal
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
            Sil
          </button>
          <button className="updateBtn" onClick={() => setEditing(true)}>
            Güncelle
          </button>
        </>
      )}
    </div>
  );
}

export default Item;
