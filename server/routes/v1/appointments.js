const express = require('express');
const router  = express.Router();

/**
 * In-memory appointments array (replaces MongoDB for Task 3).
 * Starts empty; grows as POST requests are made.
 * Task 5 will swap this for a Mongoose model.
 */
let appointments = [];

// Simple auto-increment ID counter for in-memory records
let nextId = 1;

/**
 * GET /api/v1/appointments
 * Returns all appointments.
 * HTTP 200 on success.
 */
router.get('/', (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count:   appointments.length,
      data:    appointments,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/appointments
 * Creates a new appointment and adds it to the in-memory array.
 * HTTP 201 on success.
 * HTTP 400 if required fields are missing.
 *
 * Required body fields: patientName, doctorName, date, timeSlot
 * Optional body fields: status (defaults to "pending"), reason
 */
router.post('/', (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, status, reason } = req.body;

    // Validate required fields
    if (!patientName || !doctorName || !date || !timeSlot) {
      const err = new Error('patientName, doctorName, date, and timeSlot are required.');
      err.statusCode = 400;
      return next(err);
    }

    // Validate status enum
    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    const appointmentStatus = status || 'pending';
    if (!validStatuses.includes(appointmentStatus)) {
      const err = new Error(`status must be one of: ${validStatuses.join(', ')}`);
      err.statusCode = 400;
      return next(err);
    }

    // Build the new appointment object
    const newAppointment = {
      id:          nextId++,
      patientName,
      doctorName,
      date,
      timeSlot,
      status:      appointmentStatus,
      reason:      reason || '',
      createdAt:   new Date().toISOString(),
    };

    // Push into in-memory array
    appointments.push(newAppointment);

    // HTTP 201 Created
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully.',
      data:    newAppointment,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
