// routes/routerTask.js
import express from 'express';
import { createTask, findAllTasks, updateTask } from '../controller/taskManager.js';

const routerTask = express.Router();

routerTask.post('/', createTask);
routerTask.get('/', findAllTasks);
routerTask.put('/:id', updateTask);

export default routerTask;
