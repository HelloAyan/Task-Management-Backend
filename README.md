# Task Management Backend API

A scalable and secure **Task Management Backend API** built using **Node.js, Express.js, and MongoDB**.  
This backend provides authentication, task management, and password recovery features through RESTful APIs.

The system allows users to manage their daily tasks efficiently by creating, updating, retrieving, and deleting tasks with proper authentication and security.

---

## Live API

Base URL:

https://task-management-backend-yv68.onrender.com/api/v1

---

## Features

- User Registration
- User Login Authentication
- JWT Based Authorization
- Password Hashing with bcrypt
- Forgot Password System
- Reset Password via Email
- Create Task
- Get All Tasks
- Update Task
- Delete Task
- Secure API Routes
- Environment Configuration
- Proper Error Handling

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcryptjs
- crypto

### Email Service
- Nodemailer
- SMTP

### Other Packages
- dotenv
- cors

---

## API List
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/users/forgot-password
POST   /api/v1/users/reset-password/:token

GET    /api/v1/tasks
POST   /api/v1/tasks
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id

