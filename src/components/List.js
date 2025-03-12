import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import Item from "./Item";

function List({ user }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="tasksList">
      <label className="tasksLabel">Görevlerim</label>
      {tasks.length > 0 ? (
        tasks.map((task) => <Item key={task.id} task={task} user={user} />)
      ) : (
        <p>Henüz bir görev eklenmedi.</p>
      )}
    </div>
  );
}

export default List;
