import { useEffect, useState } from "react";
import './App.css';
import Todo from "./components/Todo";
import Form from './components/Form';
import FilterButton from './components/FilterButton';

import { nanoid } from "nanoid";
import { Task } from "./types/Task";
import { addTaskAsync, deleteTaskAsync, editTaskAsync, getTasksAsync } from "./axios/taskApi";

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
      let tasks = await getTasksAsync()
      setTasks(tasks as Task[])
    }
    getTasks().catch(console.error);
  }, [])

  async function addTask (name: string) {
    const newTask: Task = { id: `todo-${nanoid()}`, name, completed: false };
    const res = await addTaskAsync(newTask)
    if(!res){
      console.log("Error adding task")
      return
    }
    setTasks([...tasks, newTask]);
  }

  async function editTask(id: string, newName: string) {
    let task = tasks.find((t: Task) => t.id === id)
    let newTask = {...task, name: newName} as Task
    const res = await editTaskAsync(newTask)
    if(!res){
      console.log("Error editing task")
      return
    }
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  

  async function deleteTask(id: string) {
    const res = await deleteTaskAsync(id)
    if(!res){
      console.log("Error deleting task")
      return
    }
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  async function toggleTaskCompleted(id: string) {
    let task = tasks.find((t: Task) => t.id === id)
    let newTask = {...task, completed: !task?.completed} as Task
    const res = await editTaskAsync(newTask)
    if(!res){
      console.log("Error toggling task")
      return
    }
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
