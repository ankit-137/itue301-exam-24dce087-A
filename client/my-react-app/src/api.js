// Centralized API helper — calls the Express backend at localhost:5000

const BASE_URL = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ===== Patients =====
export const getPatients = () => request('/patients');
export const createPatient = (body) =>
  request('/patients', { method: 'POST', body: JSON.stringify(body) });
export const updatePatient = (id, body) =>
  request(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deletePatient = (id) =>
  request(`/patients/${id}`, { method: 'DELETE' });

// ===== Doctors =====
export const getDoctors = () => request('/doctors');
export const createDoctor = (body) =>
  request('/doctors', { method: 'POST', body: JSON.stringify(body) });
export const updateDoctor = (id, body) =>
  request(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deleteDoctor = (id) =>
  request(`/doctors/${id}`, { method: 'DELETE' });

// ===== Appointments =====
export const getAppointments = () => request('/appointments');
export const createAppointment = (body) =>
  request('/appointments', { method: 'POST', body: JSON.stringify(body) });
export const updateAppointment = (id, body) =>
  request(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deleteAppointment = (id) =>
  request(`/appointments/${id}`, { method: 'DELETE' });
