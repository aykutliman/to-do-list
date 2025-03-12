import React, { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

function Create({ user }) {
  const [newTask, setNewTask] = useState("");

  const handleCreate = async () => {
    if (newTask.trim() !== "" && user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { email: user.email }, { merge: true });

        const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
        await addDoc(tasksCollectionRef, {
          userId: user.uid,
          task: newTask,
          completed: false,
          createAt: new Date(),
        });

        setNewTask("");
      } catch (error) {
        console.error("Görev eklenirken hata oluştu:", error.message);
        alert("Görev eklenirken bir hata oluştu: " + error.message);
      }
    } else if (newTask.trim() === "") {
      alert("Lütfen görev giriniz!");
    }
  };

  return (
    <div className="Create">
      <label>Yeni Görev Oluştur</label>
      <input
        type="text"
        placeholder="Yeni görevinizi yazınız."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleCreate}>Oluştur</button>
    </div>
  );
}

export default Create;
