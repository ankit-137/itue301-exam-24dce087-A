import { useState } from 'react';

/**
 * BookingPage — Form for booking a new appointment.
 * In a full implementation this would POST to the Express API.
 */
function BookingPage() {
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    timeSlot: '',
    reason: '',
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Will be wired to the backend API in a later task
    alert(`Appointment booked for ${form.patientName} with ${form.doctorName}`);
  }

  return (
    <div style={{ padding: '24px', maxWidth: '480px' }}>
      <h1>Book an Appointment</h1>
      <p style={{ marginTop: '8px', color: '#6b7280' }}>
        Fill in the details below to book a new appointment.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
            Patient Name <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
            Doctor Name <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            placeholder="e.g. Dr. Sarah Smith"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
            Date <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
            Time Slot <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <select
            name="timeSlot"
            value={form.timeSlot}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select a time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
            Reason for Visit
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Brief description..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '14px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

export default BookingPage;
