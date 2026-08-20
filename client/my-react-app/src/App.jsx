import { useState } from 'react';
import { Users, UserCog, CalendarDays } from 'lucide-react';
import './App.css';
import Navbar from './components/Navbar';
import PatientsPanel from './components/PatientsPanel';
import DoctorsPanel from './components/DoctorsPanel';
import AppointmentsPanel from './components/AppointmentsPanel';

const TABS = [
  { id: 'patients', label: 'Patients', Icon: Users },
  { id: 'doctors', label: 'Doctors', Icon: UserCog },
  { id: 'appointments', label: 'Appointments', Icon: CalendarDays },
];

function App() {
  const [activeTab, setActiveTab] = useState('patients');

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <div className="tabs">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              id={`tab-${id}`}
              className={`tab-btn ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'patients' && <PatientsPanel />}
        {activeTab === 'doctors' && <DoctorsPanel />}
        {activeTab === 'appointments' && <AppointmentsPanel />}
      </main>
    </div>
  );
}

export default App;
