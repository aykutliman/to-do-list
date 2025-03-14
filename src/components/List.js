import React, { useCallback, useEffect, useState } from "react";
import useFirebase from "../hooks/useFirebase";
import Item from "./Item";

function List() {
  const { getAll } = useFirebase();

  const [tasks, setTasks] = useState([]);

  const getAllTasks = useCallback(async () => {
    const tasks = await getAll("tasks");
    setTasks(tasks);
  }, [getAll]);

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="tasksList">
      <label className="tasksLabel">Tasks</label>
      {tasks.length > 0 ? (
        tasks.map((task) => <Item key={task.id} task={task} />)
      ) : (
        <p>No tasks yet.</p>
      )}
    </div>
  );
}

export default List;
