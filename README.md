# MedCare Plus - Hospital Appointment System

Practical CIE repository for AWDF

## 1. Project Name
**MedCare Plus** - A full-stack Hospital Appointment System for managing patients, doctors, and appointments.

## 2. Frontend Setup and Run Command
The frontend is built with React 19 and Vite.

### Setup
Navigate to the frontend directory and install dependencies:

- cd client/my-react-app

- npm install

### Run Command
Start the development server:


- npm run dev

The application will typically be available at `http://localhost:5174/`.

## 3. Backend Setup and Run Command

The backend is a Node.js and Express REST API.

### Setup
Navigate to the server directory and install dependencies:

- cd server
- npm install

### Run Command
Start the server:
```bash
node index.js
# or if using the package.json script:
# npm start
```
The API will be available at `http://localhost:5000/`.

## 4. MongoDB Setup

1. Ensure the MongoDB service is running locally on the default port `27017`.
2. The backend will automatically attempt to connect to the database specified in the `MONGO_URI`.

## 5. Required Environment Variables

Create a `.env` file in the `server/` directory. You can use the provided `.env.example` as a template.

Required variables:
```env
PORT=5000
```
