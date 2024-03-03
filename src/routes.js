import { buildRoutePath } from './utils/build-route-path.js';
import { getTasks } from './controllers/getTasks.js';
import { createTask } from './controllers/createTask.js';
import { updateTask } from './controllers/updateTask.js';
import { deleteTask } from './controllers/deleteTask.js';
import { completeTask } from './controllers/completeTask.js';

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: getTasks
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: createTask
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: updateTask
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: deleteTask
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: completeTask
    },
]