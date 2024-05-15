import { useState } from "react";
import './App.css';
import Todo from "./components/Todo";
import Form from './components/Form';
import FilterButton from './components/FilterButton';

import { nanoid } from "nanoid";

const todo_list: Task[] = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

type Task = {
  name: string,
  completed: boolean,
  id: string
}

const filter_list = [
  "All",
  "Active",
  "Completed"
]

const filter_todos = (task: Task, filter: string) => {
  switch(filter){
    case "All":
      return true
    case "Active":
      return !task.completed
    case "Completed":
      return task.completed
    default:
      return true
  }
}

function App() {
  const [tasks, setTasks] = useState(todo_list);
  const [filter, setFilter] = useState("All");

  function addTask(name: string) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function editTask(id: string, newName: string) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  

  function deleteTask(id: string) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const filterList = filter_list.map((name) => (
    <FilterButton 
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter} />
  ));

  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{`${headingText} remaining`}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {
        tasks.filter(t => filter_todos(t, filter)).map(todo => (
          <Todo 
            name={todo.name} 
            id={todo.id} 
            completed={todo.completed} 
            key={todo.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))
        }
      </ul>
    </div>
  );
}

export default App;
