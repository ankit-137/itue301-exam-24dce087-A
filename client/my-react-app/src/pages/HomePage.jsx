import AppointmentCard from '../components/AppointmentCard';

/**
 * HomePage — Landing page of the Hospital Appointment System.
 * Demonstrates AppointmentCard with sample appointment data passed via props.
 */

// Sample appointment data passed as props to AppointmentCard
const sampleAppointments = [
  {
    id: 1,
    patientName: 'ramanbhai Kataria',
    doctorName: 'Dr. Sunil Batra',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: 2,
    patientName: 'Prem Shah',
    doctorName: 'Dr. Raj Patel',
    date: '2026-08-26',
    timeSlot: '02:30 PM',
    status: 'cancelled',
  },
  {
    id: 3,
    patientName: 'Nayan Shrimali',
    doctorName: 'Dr. Shrimali Joshi',
    date: '2026-08-22',
    timeSlot: '11:00 AM',
    status: 'pending',
  },
];

function HomePage() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Welcome to MedCare Plus</h1>
      <p style={{ marginTop: '8px', color: '#6b7280' }}>
        Manage patients, doctors, and appointments all in one place.
      </p>

      <h2 style={{ marginTop: '32px', marginBottom: '16px' }}>Recent Appointments</h2>

      {/* Passing appointment data from parent (HomePage) to AppointmentCard via props */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sampleAppointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            patientName={appt.patientName}
            doctorName={appt.doctorName}
            date={appt.date}
            timeSlot={appt.timeSlot}
            status={appt.status}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
