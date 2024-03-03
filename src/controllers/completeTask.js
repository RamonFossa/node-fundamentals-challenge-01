import { database } from '../database.js';

export function completeTask(req, res) {
    const { id } = req.params;

    const completed_at = Date.now();

    const databaseRes = database.update('tasks', id, { completed_at });

    const { error, message } = databaseRes;

    const resMessage = error ? message : 'Task completed successfully!'

    return res.writeHead(error ? 404 : 200).end(resMessage);
}