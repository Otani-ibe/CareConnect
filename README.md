
# CareConnect Backend

**CareConnect** is a Node.js backend API that connects seniors with caregivers based on preferences like availability and needs. Built with Express and MongoDB, it includes user authentication, session booking, caregiver management, and a review system.

## API Documentation

 View the full Postman API Documentation:  
**[https://documenter.getpostman.com/view/46690851/2sB34oDJCp](https://documenter.getpostman.com/view/46690851/2sB34oDJCp)**

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Render Deployment

---

## ✅ Features

- ✅ User & Admin authentication (JWT)
- ✅ Book, confirm, reschedule, or cancel sessions
- ✅ Rate & review caregivers
- ✅ Availability & profile management
- ✅ MongoDB for data persistence

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB URI (e.g., from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Postman or cURL for testing

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Otani-ibe/CareConnect.git
cd CareConnect
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI="mongodb+srv://CareConnect:K0UixKWqDoXdjUMs@cluster0.dkrgw0s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="yourStrongSecretKeyHeredfghjkhjjgddnn"
PORT="5000"
```

### 4. Start the Server

```bash
npm run dev
```
