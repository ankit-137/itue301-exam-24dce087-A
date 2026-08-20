import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, UserCog, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../api';

const emptyForm = { name: '', email: '', specialisation: '', available: true };

export default function DoctorsPanel() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      setLoading(true);
      const data = await getDoctors();
      setDoctors(data);
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

  function openEdit(doctor) {
    setEditing(doctor);
    setForm({
      name: doctor.name,
      email: doctor.email,
      specialisation: doctor.specialisation,
      available: doctor.available,
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
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.specialisation) {
      setFormError('Name, email, and specialisation are required.');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateDoctor(editing._id, form);
        setDoctors((prev) => prev.map((d) => (d._id === updated._id ? updated : d)));
      } else {
        const created = await createDoctor(form);
        setDoctors((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (e) {
      setFormError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await deleteDoctor(id);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Doctors</h1>
          <p className="panel-count">{doctors.length} record{doctors.length !== 1 ? 's' : ''}</p>
        </div>
        <button id="add-doctor-btn" className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="loading">Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><UserCog size={36} /></div>
            <p>No doctors found</p>
            <span>Add your first doctor to get started.</span>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Specialisation</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => (
                  <tr key={d._id}>
                    <td><strong>{d.name}</strong></td>
                    <td>{d.email}</td>
                    <td>{d.specialisation}</td>
                    <td>
                      <span className={`badge ${d.available ? 'badge-available' : 'badge-unavailable'}`}>
                        {d.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td>
                      <div className="td-actions">
                        <button
                          className="btn-icon"
                          title="Edit"
                          onClick={() => openEdit(d)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="btn-icon danger"
                          title="Delete"
                          onClick={() => handleDelete(d._id)}
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
          title={editing ? 'Edit Doctor' : 'Add Doctor'}
          onClose={closeModal}
          footer={
            <>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button
                id="save-doctor-btn"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? 'Saving...' : editing ? 'Update' : 'Add Doctor'}
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
              <label className="form-label">Full Name <span>*</span></label>
              <input
                className="form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Sarah Smith"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email <span>*</span></label>
              <input
                className="form-input"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. dr.sarah@medcare.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Specialisation <span>*</span></label>
              <input
                className="form-input"
                name="specialisation"
                value={form.specialisation}
                onChange={handleChange}
                placeholder="e.g. Cardiology"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Availability</label>
              <div className="toggle-wrap">
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="available"
                    checked={form.available}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider" />
                </label>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {form.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
