import { buildRoutePath } from './utils/build-route-path.js';
import { getTasks } from './controllers/getTasks.js';
import { createTask } from './controllers/createTask.js';

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
]