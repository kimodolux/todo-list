import axios from "axios";
import { Task } from "../types/Task";

export const getTasksAsync = async () => {
    let response = await axios('http://localhost:8000/api/tasks', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
    return response.data.result
}


export const addTaskAsync = async (task: Task) => {
    let response =  await axios('http://localhost:8000/api/tasks', {
      method: 'POST',
      data: task,
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
    return response.data.result
  }
  
  export const deleteTaskAsync = async (task_id: string) => {
    let response =  await axios('http://localhost:8000/api/tasks', {
      method: 'DELETE',
      data: {id: task_id},
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
    return response.data.result
  }
  
  export const editTaskAsync = async (task?: Task) => {
    if(!task){
      return
    }
    let response =  await axios('http://localhost:8000/api/tasks', {
      method: 'PUT',
      data: task,
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
    return response.data.result
  }