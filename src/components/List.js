import React from "react";
import useFirebase from "../hooks/useFirebase";
import Item from "./Item";

function List() {
  const { tasks } = useFirebase();

  return (
    <>
      <label className="tasksLabel">Tasks</label>
      {tasks.length > 0 ? (
        tasks.map((task) => <Item key={task.id} task={task} />)
      ) : (
        <p>No tasks yet.</p>
      )}
    </>
  );
}

export default List;
