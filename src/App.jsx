import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import './index.css'; // Ensure you have this file for global styles

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;