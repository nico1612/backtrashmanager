// routes/routerTask.js
import express from 'express';
import { createTask, deleteTask, findAllTasks, updateTask } from '../controller/taskManager.js';

const routerTask = express.Router();

routerTask.post('/', createTask);
routerTask.get('/', findAllTasks);
routerTask.put('/:id', updateTask);
routerTask.delete('/:id', deleteTask)

export default routerTask;
