import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = ({ children }) => (
  <div>
    <nav>
      <Link to='/'> Show All Appointments</Link>|
      <Link to='/newresevation'> New Patient Appointment </Link>|
    </nav>
    { children }
  </div>
);

export default Navigation;
