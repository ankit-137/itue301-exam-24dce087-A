const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments (populated with patient and doctor names)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email')
      .populate('doctorId', 'name specialisation')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single appointment
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name specialisation');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const saved = await appointment.save();
    const populated = await saved.populate([
      { path: 'patientId', select: 'name email' },
      { path: 'doctorId', select: 'name specialisation' },
    ]);
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update appointment (status, date, timeSlot, reason)
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('patientId', 'name email')
      .populate('doctorId', 'name specialisation');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
