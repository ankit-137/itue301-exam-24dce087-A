import './AppointmentCard.css';

/**
 * AppointmentCard — Reusable component
 *
 * Props:
 *   patientName  {string}  Name of the patient
 *   doctorName   {string}  Name of the doctor
 *   date         {string}  Appointment date
 *   timeSlot     {string}  Time slot (e.g. "10:00 AM")
 *   status       {string}  "pending" | "confirmed" | "cancelled"
 */
function AppointmentCard({ patientName, doctorName, date, timeSlot, status }) {
  return (
    <div className="appointment-card">
      <div className="appointment-card__header">
        <span className="appointment-card__patient">{patientName}</span>
        <span className={`appointment-card__status appointment-card__status--${status}`}>
          {status}
        </span>
      </div>

      <div className="appointment-card__body">
        <div className="appointment-card__row">
          <span className="appointment-card__label">Doctor</span>
          <span className="appointment-card__value">{doctorName}</span>
        </div>
        <div className="appointment-card__row">
          <span className="appointment-card__label">Date</span>
          <span className="appointment-card__value">{date}</span>
        </div>
        <div className="appointment-card__row">
          <span className="appointment-card__label">Time</span>
          <span className="appointment-card__value">{timeSlot}</span>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
