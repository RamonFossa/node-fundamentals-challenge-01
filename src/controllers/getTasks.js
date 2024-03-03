import { database } from '../database.js';

export function getTasks(req, res) {
    const tasks = database.select('tasks') ?? [];
    const isEmpty = tasks.length <= 0;
    res.writeHead(isEmpty ? 204 : 200).end(JSON.stringify(tasks));
}