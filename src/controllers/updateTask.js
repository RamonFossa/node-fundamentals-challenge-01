import { database } from '../database.js';

export function updateTask(req, res) {
    const id = req.params.id;
    const description = req.body.description;
    const title = req.body.title;

    if(description === undefined && title === undefined) return res.writeHead(406).end('Title or description is required to update a task!');
    
    const databaseRes = database.select('tasks', id);

    const { error, message } = databaseRes;

    if (error) return res.writeHead(404).end(message);

    if(message.completed_at !== null) return res.writeHead(403).end('Can`t update a completed task!');

    const updated_at = Date.now();

    const updateBody = {updated_at};

    if(description) updateBody['description'] = description;
    if(title) updateBody['title'] = title;
    
    const dbResponse = database.update('tasks', id, updateBody).message;

    return res.writeHead(200).end(dbResponse);
}