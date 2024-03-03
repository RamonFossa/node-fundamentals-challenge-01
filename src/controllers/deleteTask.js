import { database } from '../database.js';

export function deleteTask(req, res) {
    const { id } = req.params;

    const databaseRes = database.delete('tasks', id);

    const { message, error } = databaseRes;

    res.writeHead(error ? 404 : 200).end(message);
}