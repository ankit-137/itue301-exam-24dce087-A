const express = require('express');
const cors    = require('cors');
require('dotenv').config();

// Custom middleware
const requestLogger = require('./middleware/requestLogger');
const errorHandler  = require('./middleware/errorHandler');

// v1 route handlers
const appointmentsRouter = require('./routes/v1/appointments');
const doctorsRouter      = require('./routes/v1/doctors');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Built-in Middleware ─────────────────────────────────────────────────────
app.use(cors());          // Allow cross-origin requests from the React frontend
app.use(express.json()); // Parse incoming JSON request bodies

// ── Custom Middleware (applied globally before all routes) ──────────────────
// Logs [METHOD] [PATH] [TIMESTAMP] for every incoming request
app.use(requestLogger);

// ── API Routes (v1) ─────────────────────────────────────────────────────────
app.use('/api/v1/appointments', appointmentsRouter);
app.use('/api/v1/doctors',      doctorsRouter);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'MedCare Plus API v1 is running.' });
});

// ── 404 Handler (unknown routes) ────────────────────────────────────────────
app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// ── Global Error Handler (must be LAST middleware) ──────────────────────────
// Catches any error forwarded via next(err) from routes or other middleware
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Note: Using in-memory data (Task 3). MongoDB will be added in Task 5.');
});
