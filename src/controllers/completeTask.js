import { database } from '../database.js';

export function completeTask(req, res) {
    const { id } = req.params;

    const databaseRes = database.select('tasks', id);

    const { error, message } = databaseRes;
    
    if(error) return res.writeHead(404).end(message);

    if(message.completed_at !== null) return res.writeHead(403).end('Can`t complete a completed task!')

    const completed_at = Date.now();

    database.update('tasks', id, { completed_at });

    return res.writeHead(200).end('Task completed successfully!');
}