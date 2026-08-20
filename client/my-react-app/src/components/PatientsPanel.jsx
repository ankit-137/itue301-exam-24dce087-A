import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Users, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import { getPatients, createPatient, updatePatient, deletePatient } from '../api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const emptyForm = { name: '', email: '', phone: '', bloodGroup: '', age: '' };

export default function PatientsPanel() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // patient object or null
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
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

  function openEdit(patient) {
    setEditing(patient);
    setForm({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      bloodGroup: patient.bloodGroup,
      age: patient.age,
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
    if (!form.name || !form.email || !form.phone || !form.bloodGroup || !form.age) {
      setFormError('All fields are required.');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await updatePatient(editing._id, { ...form, age: Number(form.age) });
        setPatients((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      } else {
        const created = await createPatient({ ...form, age: Number(form.age) });
        setPatients((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (e) {
      setFormError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Patients</h1>
          <p className="panel-count">{patients.length} record{patients.length !== 1 ? 's' : ''}</p>
        </div>
        <button id="add-patient-btn" className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Patient
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="loading">Loading patients...</div>
        ) : patients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Users size={36} /></div>
            <p>No patients found</p>
            <span>Add your first patient to get started.</span>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Blood Group</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p._id}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>
                      <span className="badge badge-blood">{p.bloodGroup}</span>
                    </td>
                    <td>{p.age} yrs</td>
                    <td>
                      <div className="td-actions">
                        <button
                          className="btn-icon"
                          title="Edit"
                          onClick={() => openEdit(p)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="btn-icon danger"
                          title="Delete"
                          onClick={() => handleDelete(p._id)}
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
          title={editing ? 'Edit Patient' : 'Add Patient'}
          onClose={closeModal}
          footer={
            <>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button
                id="save-patient-btn"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? 'Saving...' : editing ? 'Update' : 'Add Patient'}
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
                placeholder="e.g. John Doe"
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
                placeholder="e.g. john@example.com"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone <span>*</span></label>
                <input
                  className="form-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Age <span>*</span></label>
                <input
                  className="form-input"
                  name="age"
                  type="number"
                  min="0"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="e.g. 35"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Blood Group <span>*</span></label>
              <select
                className="form-select"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
