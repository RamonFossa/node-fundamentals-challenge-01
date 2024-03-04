import fs from 'node:fs/promises';

const csvPath = new URL('./TasksData.csv', import.meta.url);

let csvData;

await fs.readFile(csvPath, "utf-8")
.then(data => {
    csvData = data;
})
.catch(console.error);

const splitedLines = csvData.split('\n');

splitedLines.forEach(async (line, index) => {
    if(index != 0) {
        const parsedLine = parseCSVLine(line);
        createTask(parsedLine);
    }
});

function parseCSVLine(line) {
    const parsedLine = line.replace('\r', '').split(',');
    return parsedLine.map(line => line.trim());
}

function createTask(task) {
    const body = {
        title: task[0],
        description: task[1]
    };

    fetch('http://localhost:3030/tasks', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(res => {
        console.log('Uploaded!')
    });
}