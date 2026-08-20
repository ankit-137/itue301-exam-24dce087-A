import { useState, useEffect } from 'react';

/**
 * DoctorsPage — Fetches and displays doctor data from the Express API.
 *
 * Demonstrates:
 *  - useEffect() to trigger the API call on component mount
 *  - Three states: data, loading, error
 *  - Async fetch pattern with error handling
 *  - Conditional rendering based on state
 *
 * API consumed: GET /api/v1/doctors  (Task 3 Express endpoint)
 * MongoDB is NOT involved in this flow.
 */
function DoctorsPage() {
  // State 1 — holds the doctors array returned by the API
  const [data, setData] = useState([]);

  // State 2 — true while the fetch request is in flight
  const [loading, setLoading] = useState(true);

  // State 3 — holds an error message if the request fails
  const [error, setError] = useState(null);

  // useEffect runs once when the component mounts (empty dependency array [])
  useEffect(() => {
    // Async function defined inside useEffect — fetch cannot be used directly as async
    async function fetchDoctors() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('http://localhost:5000/api/v1/doctors');

        // If the server returned a non-2xx status, treat it as an error
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();

        // The API wraps the array inside { success, count, data }
        setData(json.data);
      } catch (err) {
        // Network failure or server error — store the message in error state
        setError(err.message);
      } finally {
        // Always stop the loading indicator, whether the request succeeded or failed
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []); // <- empty array means "run only on mount"

  // ── Conditional Rendering ─────────────────────────────────────────────────

  // 1. Show loading indicator while request is in progress
  if (loading) {
    return (
      <div style={pageStyle}>
        <h1>Doctors</h1>
        <p style={mutedStyle}>Loading doctors...</p>
      </div>
    );
  }

  // 2. Show error message if the request failed
  if (error) {
    return (
      <div style={pageStyle}>
        <h1>Doctors</h1>
        <div style={errorBoxStyle}>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  // 3. Show doctor data after a successful request
  return (
    <div style={pageStyle}>
      <h1>Doctors</h1>
      <p style={mutedStyle}>
        {data.length} doctor{data.length !== 1 ? 's' : ''} found.
      </p>

      {/* 4. Render each doctor from the API response — not hardcoded */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map((doctor) => (
          <div key={doctor.id} style={cardStyle}>
            {/* Doctor name */}
            <div style={{ fontWeight: '600', fontSize: '15px', color: '#111827' }}>
              {doctor.name}
            </div>

            {/* Specialisation */}
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
              {doctor.specialisation}
            </div>

            {/* Availability — displayed as a status badge */}
            <div style={{ marginTop: '10px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  backgroundColor: doctor.available ? '#dcfce7' : '#f1f5f9',
                  color:           doctor.available ? '#16a34a' : '#64748b',
                  border:          `1px solid ${doctor.available ? '#bbf7d0' : '#e2e8f0'}`,
                }}
              >
                {doctor.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const pageStyle = {
  padding: '24px',
};

const mutedStyle = {
  marginTop: '8px',
  color: '#6b7280',
  fontSize: '14px',
};

const errorBoxStyle = {
  marginTop: '16px',
  padding: '12px 16px',
  backgroundColor: '#fee2e2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  color: '#dc2626',
  fontSize: '14px',
};

const cardStyle = {
  padding: '16px',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
};

export default DoctorsPage;
