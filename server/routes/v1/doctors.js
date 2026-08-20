const express = require('express');
const router  = express.Router();

/**
 * In-memory doctors array (replaces MongoDB for Task 3).
 * Task 5 will swap this for a Mongoose model.
 */
const doctors = [
  {
    id:             'd1',
    name:           'Dr. Sarah Smith',
    email:          'sarah.smith@medcare.com',
    specialisation: 'Cardiology',
    available:      true,
  },
  {
    id:             'd2',
    name:           'Dr. Raj Patel',
    email:          'raj.patel@medcare.com',
    specialisation: 'Neurology',
    available:      true,
  },
  {
    id:             'd3',
    name:           'Dr. Priya Nair',
    email:          'priya.nair@medcare.com',
    specialisation: 'Dermatology',
    available:      false,
  },
];

/**
 * GET /api/v1/doctors
 * Returns all doctors.
 * HTTP 200 on success.
 */
router.get('/', (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count:   doctors.length,
      data:    doctors,
    });
  } catch (err) {
    next(err); // Forward to global error handler
  }
});

module.exports = router;
