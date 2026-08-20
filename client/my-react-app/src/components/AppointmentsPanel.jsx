import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, CalendarDays, AlertCircle, Clock } from 'lucide-react';
import Modal from './Modal';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getPatients,
  getDoctors,
} from '../api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled'];

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

const emptyForm = {
  patientId: '',
  doctorId: '',
  date: '',
  timeSlot: '',
  status: 'pending',
  reason: '',
};

function StatusBadge({ status }) {
  return (
    <span className={`badge badge-${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AppointmentsPanel() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      setLoading(true);
      const [appts, pts, docs] = await Promise.all([
        getAppointments(),
        getPatients(),
        getDoctors(),
      ]);
      setAppointments(appts);
      setPatients(pts);
      setDoctors(docs);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setFormError('');
    setShowModal(true);
  }

  function openEdit(appt) {
    setEditing(appt);
    setForm({
      patientId: appt.patientId?._id || appt.patientId,
      doctorId: appt.doctorId?._id || appt.doctorId,
      date: appt.date,
      timeSlot: appt.timeSlot,
      status: appt.status,
      reason: appt.reason || '',
    });
    setFormError('');
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
    setFormError('');
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.patientId || !form.doctorId || !form.date || !form.timeSlot) {
      setFormError('Patient, doctor, date, and time slot are required.');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateAppointment(editing._id, form);
        setAppointments((prev) =>
          prev.map((a) => (a._id === updated._id ? updated : a))
        );
      } else {
        const created = await createAppointment(form);
        setAppointments((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (e) {
      setFormError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (e) {
      alert(e.message);
    }
  }

  const filtered =
    filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Appointments</h1>
          <p className="panel-count">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <button id="add-appointment-btn" className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Book Appointment
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="filter-bar">
        {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
          <button
            key={f}
            id={`filter-${f}`}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        {loading ? (
          <div className="loading">Loading appointments...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><CalendarDays size={36} /></div>
            <p>No appointments found</p>
            <span>
              {filter === 'all'
                ? 'Book the first appointment to get started.'
                : `No ${filter} appointments.`}
            </span>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a._id}>
                    <td><strong>{a.patientId?.name || '-'}</strong></td>
                    <td>
                      <div>{a.doctorId?.name || '-'}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {a.doctorId?.specialisation}
                      </div>
                    </td>
                    <td>{a.date}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={13} style={{ color: 'var(--text-muted)' }} />
                        {a.timeSlot}
                      </span>
                    </td>
                    <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.reason || <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>
                      <div className="td-actions">
                        <button
                          className="btn-icon"
                          title="Edit"
                          onClick={() => openEdit(a)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="btn-icon danger"
                          title="Delete"
                          onClick={() => handleDelete(a._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <Modal
          title={editing ? 'Edit Appointment' : 'Book Appointment'}
          onClose={closeModal}
          footer={
            <>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button
                id="save-appointment-btn"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? 'Saving...' : editing ? 'Update' : 'Book'}
              </button>
            </>
          }
        >
          <form onSubmit={handleSubmit}>
            {formError && (
              <div className="alert alert-error">
                <AlertCircle size={15} /> {formError}
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Patient <span>*</span></label>
              <select
                className="form-select"
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
              >
                <option value="">Select patient</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Doctor <span>*</span></label>
              <select
                className="form-select"
                name="doctorId"
                value={form.doctorId}
                onChange={handleChange}
              >
                <option value="">Select doctor</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} — {d.specialisation}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date <span>*</span></label>
                <input
                  className="form-input"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time Slot <span>*</span></label>
                <select
                  className="form-select"
                  name="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Reason for Visit</label>
              <textarea
                className="form-textarea"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Brief description of the visit reason..."
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
