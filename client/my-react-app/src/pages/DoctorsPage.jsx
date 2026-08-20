/**
 * DoctorsPage — Displays a list of available doctors.
 * In a full implementation this data would be fetched from the Express API.
 */

// Sample doctor data (will come from the backend API in later tasks)
const sampleDoctors = [
  { id: 1, name: 'Dr. Sarah Smith', specialisation: 'Cardiology', available: true },
  { id: 2, name: 'Dr. Raj Patel', specialisation: 'Neurology', available: true },
  { id: 3, name: 'Dr. Priya Nair', specialisation: 'Dermatology', available: false },
];

function DoctorsPage() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Doctors</h1>
      <p style={{ marginTop: '8px', color: '#6b7280' }}>
        Browse our team of specialist doctors.
      </p>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sampleDoctors.map((doctor) => (
          <div
            key={doctor.id}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>{doctor.name}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                {doctor.specialisation}
              </div>
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '500',
                padding: '3px 10px',
                borderRadius: '999px',
                backgroundColor: doctor.available ? '#dcfce7' : '#f1f5f9',
                color: doctor.available ? '#16a34a' : '#64748b',
                border: `1px solid ${doctor.available ? '#bbf7d0' : '#e2e8f0'}`,
              }}
            >
              {doctor.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsPage;
