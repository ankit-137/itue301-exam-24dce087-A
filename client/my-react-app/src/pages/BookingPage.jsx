import { useState } from 'react';

/**
 * BookingPage — Appointment booking form.
 *
 * State values (2 used meaningfully):
 *   1. formData   — tracks all form field values (patient name, date, timeSlot, reason)
 *   2. selectedDoctor — tracks the doctor chosen from the list
 *
 * The live preview section updates in real time as state changes,
 * displaying the entered patient name and selected doctor on the page.
 */

// Available doctors list (will come from backend API in a later task)
const DOCTORS = [
  { id: 'doc1', name: 'Dr. Sarah Smith',  specialisation: 'Cardiology' },
  { id: 'doc2', name: 'Dr. Raj Patel',    specialisation: 'Neurology' },
  { id: 'doc3', name: 'Dr. Priya Nair',   specialisation: 'Dermatology' },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

function BookingPage() {
  // State value 1 — form field data
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    timeSlot: '',
    reason: '',
  });

  // State value 2 — the doctor selected from the list
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Update formData state when any input changes
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Update selectedDoctor state when a doctor card is clicked
  function handleSelectDoctor(doctor) {
    setSelectedDoctor(doctor);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedDoctor) {
      alert('Please select a doctor.');
      return;
    }
    // Will be wired to the backend API in a later task
    alert(`Appointment booked!\nPatient: ${formData.patientName}\nDoctor: ${selectedDoctor.name}`);
  }

  return (
    <div style={{ padding: '24px', maxWidth: '560px' }}>
      <h1>Book an Appointment</h1>
      <p style={{ marginTop: '8px', color: '#6b7280' }}>
        Fill in your details and select a doctor.
      </p>

      {/* ── Live Preview (updates as state changes) ── */}
      <div style={previewBoxStyle}>
        <strong>Appointment Preview</strong>
        <p style={{ marginTop: '8px', fontSize: '13px', color: '#374151' }}>
          <span style={{ color: '#6b7280' }}>Patient: </span>
          {/* Displays patient name live from formData state */}
          {formData.patientName ? formData.patientName : <em style={{ color: '#9ca3af' }}>not entered yet</em>}
        </p>
        <p style={{ fontSize: '13px', color: '#374151' }}>
          <span style={{ color: '#6b7280' }}>Doctor: </span>
          {/* Displays selected doctor live from selectedDoctor state */}
          {selectedDoctor ? selectedDoctor.name : <em style={{ color: '#9ca3af' }}>not selected yet</em>}
        </p>
        {selectedDoctor && (
          <p style={{ fontSize: '13px', color: '#6b7280' }}>
            <span>Specialisation: </span>{selectedDoctor.specialisation}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>

        {/* Patient Name — updates formData state (State 1) */}
        <div>
          <label style={labelStyle}>Patient Name <span style={{ color: '#dc2626' }}>*</span></label>
          <input
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
            style={inputStyle}
          />
        </div>

        {/* Doctor Selection — updates selectedDoctor state (State 2) */}
        <div>
          <label style={labelStyle}>Select Doctor <span style={{ color: '#dc2626' }}>*</span></label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelectDoctor(doc)}
                style={{
                  ...doctorCardStyle,
                  borderColor: selectedDoctor?.id === doc.id ? '#2563eb' : '#d1d5db',
                  backgroundColor: selectedDoctor?.id === doc.id ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{doc.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{doc.specialisation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Date — updates formData state (State 1) */}
        <div>
          <label style={labelStyle}>Date <span style={{ color: '#dc2626' }}>*</span></label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Time Slot — updates formData state (State 1) */}
        <div>
          <label style={labelStyle}>Time Slot <span style={{ color: '#dc2626' }}>*</span></label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Reason — updates formData state (State 1) */}
        <div>
          <label style={labelStyle}>Reason for Visit</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Brief description..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <button type="submit" style={submitStyle}>
          Book Appointment
        </button>
      </form>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────

const previewBoxStyle = {
  marginTop: '20px',
  padding: '14px 16px',
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '8px',
  fontSize: '14px',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '500',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '14px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const doctorCardStyle = {
  padding: '10px 14px',
  border: '2px solid',
  borderRadius: '6px',
  transition: 'border-color 0.15s, background-color 0.15s',
};

const submitStyle = {
  padding: '10px 20px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
};

export default BookingPage;
