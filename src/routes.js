import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';
import { getTasks } from './controllers/getTasks.js';

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: getTasks
    },
]