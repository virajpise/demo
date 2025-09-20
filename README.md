# Demo Task Manager

A full-stack demo application showcasing frontend-backend connectivity using modern web technologies.

![Demo Task Manager](https://img.shields.io/badge/Demo-Task%20Manager-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v4.18+-blue)
![HTML5](https://img.shields.io/badge/HTML5-Modern-orange)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## 🚀 Features

- **Full-Stack Architecture**: Complete frontend-backend separation with REST API
- **Modern UI**: Beautiful glassmorphism design with responsive layout
- **Real-time Updates**: Dynamic task management with instant UI updates
- **API Testing**: Built-in API testing interface
- **Connection Status**: Live backend connection monitoring
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing
- **Body Parser**: JSON request parsing

### Frontend
- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with glassmorphism effects
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **Font Awesome**: Icon library

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/status` | Check API health status |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get specific task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update existing task |
| DELETE | `/api/tasks/:id` | Delete task |

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/virajpise/demo.git
   cd demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to: `http://localhost:3000`

## 📱 Usage

### Task Management
- **Add Tasks**: Enter task description and click "Add Task" or press Enter
- **Complete Tasks**: Click the checkbox to mark tasks as completed
- **Delete Tasks**: Click the trash icon to delete tasks
- **View Stats**: See total and completed task counts

### API Testing
- Expand the "API Demo & Testing" section
- Click "Test API Status" to check backend health
- Click "Get All Tasks" to see the raw API response
- View formatted JSON responses

## 🏗️ Project Structure

```
demo-task-manager/
├── package.json          # Project dependencies and scripts
├── server.js             # Express.js backend server
├── README.md            # Project documentation
├── .gitignore           # Git ignore rules
└── public/              # Frontend static files
    ├── index.html       # Main HTML file
    ├── styles.css       # CSS styling
    └── script.js        # Frontend JavaScript
```

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect
- **Gradient Backgrounds**: Beautiful color gradients
- **Smooth Animations**: Hover effects and transitions
- **Status Indicators**: Visual connection status
- **Responsive Layout**: Mobile-first design
- **Accessibility**: Focus states and semantic markup

## 🔧 Development

### Scripts
- `npm start`: Start the production server
- `npm run dev`: Start development server with nodemon

### Data Storage
- Tasks are stored in memory for demo purposes
- Data will reset when the server restarts
- Perfect for demonstration and testing

## 📊 Features Showcase

1. **Frontend-Backend Communication**
   - RESTful API calls
   - Error handling
   - Loading states

2. **Modern JavaScript**
   - ES6 classes
   - Async/await
   - Fetch API

3. **User Experience**
   - Real-time updates
   - Form validation
   - Confirmation dialogs

4. **Development Best Practices**
   - Separation of concerns
   - Error handling
   - Clean code structure

## 🌐 Live Demo

Once deployed, you can access the live demo at your deployment URL.

## 🤝 Contributing

This is a demo project, but feel free to fork it and experiment with additional features!

## 📄 License

MIT License - feel free to use this code for learning and demonstration purposes.

## 👤 Author

**Viraj Pise**
- GitHub: [@virajpise](https://github.com/virajpise)

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Modern web technologies for making full-stack development enjoyable

---

*This is a demonstration project showcasing full-stack web development with Node.js and modern frontend technologies.*
