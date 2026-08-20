// Centralized API helper — calls the Express backend at localhost:5000
// BASE_URL updated to /api/v1 to match Task 3 route definitions

const BASE_URL = 'http://localhost:5000/api/v1';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ===== Doctors =====
export const getDoctors = () => request('/doctors');

// ===== Appointments =====
export const getAppointments  = ()       => request('/appointments');
export const createAppointment = (body)  => request('/appointments', { method: 'POST', body: JSON.stringify(body) });
