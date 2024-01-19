const fs = require('fs');
const path = require('path');

class Service {
    constructor(tasksFilePath) {
        this.tasksFilePath = tasksFilePath;
    }

    readTasks() {
        return JSON.parse(fs.readFileSync(this.tasksFilePath, 'utf8'));
    }

    writeTasks(tasks) {
        fs.writeFileSync(this.tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    }

    getTasksByStatus(status) {
        const tasks = this.readTasks();
        return tasks.filter(task => task.status === status);
    }

    changeTaskStatus(id, newStatus) {
        const tasks = this.readTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return null;

        tasks[taskIndex].status = newStatus;
        this.writeTasks(tasks);

        return tasks[taskIndex];
    }
}

module.exports = Service;
