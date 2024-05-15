import { Router } from 'express';
import taskController from '../controllers/TaskController';

const taskRouter = Router();

// specifies the endpoint and the method to call
taskRouter.get('/', taskController.getAll);
taskRouter.post('/', taskController.addTask);
taskRouter.delete('/', taskController.deleteTask);
taskRouter.put('/', taskController.setTaskCompletion);

// export the router
export default taskRouter;