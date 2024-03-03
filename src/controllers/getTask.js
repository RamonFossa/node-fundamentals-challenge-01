import { database } from '../database.js';

export function getTask(req, res) {
    const { id } = req.params;

    const databaseRes = database.select('tasks', id);

    const { error, message } = databaseRes;

    res.writeHead(error ? 404 : 200).end(JSON.stringify(message));
}