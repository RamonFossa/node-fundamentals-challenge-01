import { database } from "../database.js";

export function createTask(req, res) {
        const title = req.body.title;
        const description = req.body.description;

        if(!title) return res.writeHead(406).end('Title is required to create a Task!');
        if(!description) return res.writeHead(406).end('Description is required to create a Task!');

        const task = {
            title,
            description,
            completed_at: null,
            created_at: Date.now(),
        };

        const tasks = database.insert('tasks', task);
        return res.writeHead(201).end(JSON.stringify(tasks));
}