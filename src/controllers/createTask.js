import { database } from "../database.js";

export function createTask(req, res) {
    try {
        const { title, description } = req.body;

        const task = {
            title,
            description,
            completed_at: null,
            created_at: Date.now(),
        };

        const tasks = database.insert('tasks', task);
        return res.writeHead(201).end(JSON.stringify(tasks));

    } catch (error) {
        console.error(error);
        return res.writeHead(406).end('Title and Description are required to create a Task!');
    }
}