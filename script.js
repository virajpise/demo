// Task Manager Frontend JavaScript - GitHub Pages Demo Mode

class TaskManager {
    constructor() {
        // Demo mode - no backend server required
        this.demoMode = true;
        this.apiUrl = window.location.origin;
        this.tasks = [
            { id: 1, title: 'Learn Node.js', completed: false, createdAt: new Date('2025-09-20T10:00:00.000Z').toISOString() },
            { id: 2, title: 'Build a REST API', completed: true, createdAt: new Date('2025-09-20T10:30:00.000Z').toISOString() },
            { id: 3, title: 'Connect frontend to backend', completed: false, createdAt: new Date('2025-09-20T11:00:00.000Z').toISOString() },
            { id: 4, title: 'Deploy to GitHub Pages', completed: true, createdAt: new Date('2025-09-20T11:30:00.000Z').toISOString() }
        ];
        this.nextId = 5;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkApiConnection();
        this.loadTasks();
    }

    bindEvents() {
        // Add task form
        const addTaskBtn = document.getElementById('add-task-btn');
        const newTaskInput = document.getElementById('new-task-input');
        
        addTaskBtn.addEventListener('click', () => this.addTask());
        newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Retry button
        const retryBtn = document.getElementById('retry-btn');
        retryBtn.addEventListener('click', () => this.loadTasks());
    }

    async checkApiConnection() {
        if (this.demoMode) {
            // Demo mode - simulate API connection
            this.updateConnectionStatus(true, 'Demo Mode (No Backend)');
            return;
        }
        
        try {
            const response = await fetch(`${this.apiUrl}/api/status`);
            const data = await response.json();
            
            if (data.success) {
                this.updateConnectionStatus(true, 'API Connected');
            } else {
                this.updateConnectionStatus(false, 'API Error');
            }
        } catch (error) {
            console.error('API connection failed:', error);
            this.updateConnectionStatus(false, 'Connection Failed');
        }
    }

    updateConnectionStatus(isOnline, message) {
        const statusDot = document.getElementById('connection-status');
        const statusText = document.getElementById('status-text');
        
        statusDot.className = `status-dot ${isOnline ? 'online' : 'offline'}`;
        statusText.textContent = message;
    }

    async loadTasks() {
        this.showLoading();
        this.hideError();
        
        if (this.demoMode) {
            // Demo mode - simulate loading delay and use local data
            setTimeout(() => {
                this.hideLoading();
                this.renderTasks();
                this.updateStats();
            }, 500);
            return;
        }
        
        try {
            const response = await fetch(`${this.apiUrl}/api/tasks`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                this.tasks = data.data;
                this.renderTasks();
                this.updateStats();
            } else {
                throw new Error(data.message || 'Failed to load tasks');
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showError(`Failed to load tasks: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    async addTask() {
        const input = document.getElementById('new-task-input');
        const title = input.value.trim();
        
        if (!title) {
            input.focus();
            return;
        }

        if (this.demoMode) {
            // Demo mode - simulate task creation
            const newTask = {
                id: this.nextId++,
                title: title,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            input.value = '';
            this.tasks.push(newTask);
            this.renderTasks();
            this.updateStats();
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });
            
            const data = await response.json();
            
            if (data.success) {
                input.value = '';
                this.tasks.push(data.data);
                this.renderTasks();
                this.updateStats();
            } else {
                throw new Error(data.message || 'Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
            alert(`Failed to add task: ${error.message}`);
        }
    }

    async updateTask(taskId, updates) {
        if (this.demoMode) {
            // Demo mode - simulate task update
            const taskIndex = this.tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                Object.assign(this.tasks[taskIndex], updates);
                this.renderTasks();
                this.updateStats();
            }
            return;
        }
        
        try {
            const response = await fetch(`${this.apiUrl}/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });
            
            const data = await response.json();
            
            if (data.success) {
                const taskIndex = this.tasks.findIndex(t => t.id === taskId);
                if (taskIndex !== -1) {
                    this.tasks[taskIndex] = data.data;
                    this.renderTasks();
                    this.updateStats();
                }
            } else {
                throw new Error(data.message || 'Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert(`Failed to update task: ${error.message}`);
        }
    }

    async deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        if (this.demoMode) {
            // Demo mode - simulate task deletion
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.renderTasks();
            this.updateStats();
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/api/tasks/${taskId}`, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.tasks = this.tasks.filter(t => t.id !== taskId);
                this.renderTasks();
                this.updateStats();
            } else {
                throw new Error(data.message || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert(`Failed to delete task: ${error.message}`);
        }
    }

    renderTasks() {
        const tasksList = document.getElementById('tasks-list');
        const noTasks = document.getElementById('no-tasks');
        
        if (this.tasks.length === 0) {
            tasksList.innerHTML = '';
            noTasks.style.display = 'block';
            return;
        }
        
        noTasks.style.display = 'none';
        
        tasksList.innerHTML = this.tasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="taskManager.updateTask(${task.id}, { completed: this.checked })"
                >
                <div class="task-content">
                    <div class="task-title ${task.completed ? 'completed' : ''}">
                        ${this.escapeHtml(task.title)}
                    </div>
                    <div class="task-meta">
                        ID: ${task.id} | Created: ${this.formatDate(task.createdAt)}
                    </div>
                </div>
                <div class="task-actions">
                    <button 
                        class="btn btn-small btn-danger"
                        onclick="taskManager.deleteTask(${task.id})"
                        title="Delete task"
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        
        document.getElementById('total-tasks').textContent = totalTasks;
        document.getElementById('completed-tasks').textContent = completedTasks;
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        
        errorText.textContent = message;
        errorDiv.style.display = 'block';
    }

    hideError() {
        document.getElementById('error-message').style.display = 'none';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
}

// API Testing Functions
async function testAPI(endpoint) {
    const apiResponse = document.getElementById('api-response');
    apiResponse.textContent = 'Loading...';
    
    // Demo mode - simulate API responses
    setTimeout(() => {
        let mockResponse;
        
        if (endpoint === '/api/status') {
            mockResponse = {
                success: true,
                message: 'Demo Task Manager API is running (Demo Mode)',
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };
        } else if (endpoint === '/api/tasks') {
            mockResponse = {
                success: true,
                data: taskManager.tasks,
                count: taskManager.tasks.length
            };
        }
        
        const responseText = `HTTP 200 OK (Demo Mode)\n\n${JSON.stringify(mockResponse, null, 2)}`;
        apiResponse.textContent = responseText;
    }, 800);
}

// Initialize the application
let taskManager;

document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
    
    // Set up periodic connection check
    setInterval(() => {
        taskManager.checkApiConnection();
    }, 30000); // Check every 30 seconds
});

// Add some helpful console messages
console.log('🚀 Demo Task Manager loaded!');
console.log('📝 This is a full-stack demo application running in DEMO MODE');
console.log('🌐 Deployed on GitHub Pages - frontend only with mock data');
console.log('💾 Data is stored locally in browser memory');
console.log('🔧 For full backend functionality, run locally with Node.js');
console.log('📋 GitHub: https://github.com/virajpise/demo');
