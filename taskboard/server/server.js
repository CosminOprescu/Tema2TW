const express = require('express');
const Service = require('./service');
const app = express();
const port = 8080;

// Instantiating the Service class
const service = new Service('./tasks.json');

app.use(express.json());

app.get('/tasks', (req, res) => {
    const status = req.query.status;
    const tasks = service.getTasksByStatus(status);

    if (tasks.length === 0) {
        res.status(204).send();
    } else {
        res.json(tasks);
    }
});

app.put('/tasks', (req, res) => {
    const { id, status } = req.query;

    const updatedTask = service.changeTaskStatus(id, status);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
