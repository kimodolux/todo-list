import React, { useState } from "react";

function Form(props: {addTask: (name: string) => void}) {

    let [name, setName] = useState("")

    let handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(name === ""){
            return
        }
        event.preventDefault();
        props.addTask(name);
        setName("");
    }

    let handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.currentTarget.value);
    }

    return (
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
  
  export default Form;
  