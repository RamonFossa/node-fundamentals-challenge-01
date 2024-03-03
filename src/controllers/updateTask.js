import { database } from '../database.js';

export function updateTask(req, res) {
    const id = req.params.id;
    const description = req.body.description;
    const title = req.body.title;

    if(description === undefined && title === undefined) return res.writeHead(406).end('Title or description is required to update a task!');
    
    const updated_at = Date.now();

    const updateBody = {updated_at};

    if(description) updateBody['description'] = description;
    if(title) updateBody['title'] = title;
    
    const databaseRes = database.update('tasks', id, updateBody);

    const { error, message } = databaseRes;

    return res.writeHead(error ? 404 : 200).end(message);
}