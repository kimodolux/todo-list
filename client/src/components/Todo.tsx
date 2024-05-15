import React, { useState } from "react";

function Todo(
    props: {
         name: string,
         completed?: boolean,
         id: string, 
         toggleTaskCompleted: (id: string) => void, 
         deleteTask: (id: string) => void
         editTask: (id: string, newName: string) => void
        }
) {
    
  let { name, completed, id, toggleTaskCompleted, deleteTask, editTask } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setNewName(event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }
  

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
            id={id}
            className="todo-text"
            type="text"
            value={newName}
            onChange={handleChange}
        />

      </div>
      <div className="btn-group">
        <button
            type="button"
            className="btn todo-cancel"
            onClick={() => setEditing(false)}>
            Cancel
            <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit"> 
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}>
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );
  
  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
