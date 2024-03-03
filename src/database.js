import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    #response(message, error) {
        return {
            message,
            error,
        }
    }

    select(table) {
        return this.#database[table] ?? [];
    }

    insert(table, data) {
        let databaseData = this.#database[table];
        
        if (Array.isArray(databaseData)) {
            const lastId = this.#database['ids'][table];
            data.id = lastId + 1;
            databaseData.push(data);
        } else {
            data.id = 1;
            this.#database['ids'] = {};
            databaseData = [data];
        }

        this.#database[table] = databaseData;
        this.#database['ids'][table] = data.id;
        this.#persist();

        return databaseData;
    }

    update(table, id, body) {
        const index = this.select(table).findIndex(data => String(data.id) === String(id));
        
        if (index > -1) {
            for (const key in body) this.#database[table][index][key] = body[key];
            this.#persist();
            return this.#response('Successfully updated!', false);
        }

        return this.#response('Id Not found!', true);
    }

    delete(table, id) {
        const index = this.select(table).findIndex(data => String(data.id) === String(id));
        
        if (index > -1) {
            this.#database[table].splice(index, 1);
            this.#persist();
            return this.#response('Successfully deleted!', false);
        }
        return this.#response('Id Not found!', true);
    }
}

export const database = new Database();