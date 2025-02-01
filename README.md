# 📚 FAQ Management System Backend

Welcome to the **FAQ Management System**! 🚀 This is a backend application built with **Node.js, Express, MongoDB**, and **Redis** to manage frequently asked questions with multilingual support. 🌍

## ✨ Features

- 📝 **CRUD Operations** for FAQs
- 🌎 **Multilingual Support** (English, Hindi, Bengali)
- 🔑 **Role-Based Access Control (RBAC)** (Admin & User)
- ⚡ **Redis Caching** for faster responses
- 🔐 **JWT Authentication** for secure access

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
$ git clone https://github.com/AbhisekhNayek/FAQ-Management.git

$ cd Backend
```

### 2️⃣ Install Dependencies
```sh
$ npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file and configure the following:
```env
PORT=
MONGODB_URI=
REDIS_PORT=
REDIS_URL=
REDIS_USERNAME=
REDIS_PASSWORD=
JWT_SECRET=
```

### 4️⃣ Start the Server
```sh
$ npm start
```
The server will be running at: **http://localhost:4000** 🎉

---

## 🚀 API Endpoints

### 🔹 Authentication

#### 🆕 Sign Up
```http
POST /api/auth/signup
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpassword",
  "role": "admin"
}
```

#### 🔑 Sign In
```http
POST /api/auth/signin
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```
**Response:**
```json
{
  "token": "your_jwt_token",
  "role": "admin"
}
```

### 🔹 FAQ Management

#### 📖 Get All FAQs (Accessible to All Users)
```http
GET /api/faqs
```
**Optional Query Parameter:**
```http
/api/faqs?lang=bn  # Fetch FAQs in Bengali
```

#### ➕ Create a FAQ (Admin Only)
```http
POST /api/faqs
```
**Headers:**
```http
Authorization: Bearer <your_token>
```
**Request Body:**
```json
{
  "question": "What is the capital of Spain?",
  "answer": "The capital of Spain is Madrid."
}
```

#### ✏️ Update a FAQ (Admin Only)
```http
PUT /api/faqs/:id
```
**Headers:**
```http
Authorization: Bearer <your_token>
```

#### ❌ Delete a FAQ (Admin Only)
```http
DELETE /api/faqs/:id
```
**Headers:**
```http
Authorization: Bearer <your_token>
```

---

## 🔐 Role-Based Access Control (RBAC)
- **User** ➝ Can only view FAQs
- **Admin** ➝ Can create, edit, and delete FAQs

---

## 🏗️ Technologies Used
- **Node.js** & **Express.js** 🏗️
- **MongoDB & Mongoose** 🍃
- **Redis** ⚡ (For caching)
- **JWT Authentication** 🔑
- **Google Translate API** 🌎 (For translations)

---

## 🛠️ Future Enhancements
- ✅ Improve error handling & validation
- ✅ Add more language support
- ✅ Implement pagination for FAQs

---

## 🤝 Contributing
Want to contribute? Fork the repo and submit a PR! 🚀

---

## 📄 License
This project is **MIT Licensed**. 📝

---

### Made with ❤️ by Abhisekh Nayek
