# Chatflow - Real-time Chat Platform

Chatflow is a real-time chat platform where users can register, chat, find other users, send voice messages, stickers, and even customize their chat experience. The platform allows users to set background images, block/unblock users, and communicate in an intuitive and interactive way.

## Features

- **User Registration & Authentication**  
  Secure user registration and login with JWT-based authentication.

- **Real-time Messaging**  
  Send text messages, voice messages, and stickers in real-time.

- **User Discovery**  
  Search for users and connect with others in the chat platform.

- **Customizable Chat Experience**  
  Choose background images for your chat interface for a personalized experience.

- **User Blocking**  
  Block users to avoid unwanted interactions and ensure a safe space.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: State management with Redux made easy.
- **Redux-Saga**: Side-effect management for handling asynchronous actions.
- **Tailwind CSS**: Utility-first CSS framework for fast UI design.
- **Socket.io Client**: Real-time communication using WebSockets.
- **React Router**: Declarative routing for React applications.
- **Emoji Mart**: Emoji picker for an interactive messaging experience.

### Backend
- **Express.js**: Fast and minimalist web framework for Node.js.
- **Socket.io**: Real-time bidirectional event-based communication.
- **JWT (JSON Web Tokens)**: Secure user authentication with token-based authentication.
- **MongoDB/Mongoose**: NoSQL database with Mongoose for data modeling.
- **Bcryptjs**: Password hashing for secure user authentication.
- **Multer**: Middleware for handling file uploads (for profile pictures, etc.).
- **CORS**: Middleware for enabling Cross-Origin Requests.

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/chatflow.git
cd chatflow
