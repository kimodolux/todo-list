import { useEffect, useState } from "react";
import './App.css';
import Todo from "./components/Todo";
import Form from './components/Form';
import FilterButton from './components/FilterButton';

import axios from "axios";
import { nanoid } from "nanoid";

const sendTaskToDB = async (task: Task) => {
  let response =  await axios('http://localhost:8000/api/tasks', {
    method: 'POST',
    data: {
      id: task.id,
      name: task.name,
      completed: task.completed,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }) 
  console.log(response.status)
}

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
  const [tasks, setTasks] = useState([] as Task[]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const getTasks = async() => {
      let response = await axios('http://localhost:8000/api/tasks', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      setTasks(response.data.result as Task[])
    }
    getTasks().catch(console.error);
  }, [])

  function addTask(name: string) {
    const newTask: Task = { id: `todo-${nanoid()}`, name, completed: false };
    sendTaskToDB(newTask)
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
