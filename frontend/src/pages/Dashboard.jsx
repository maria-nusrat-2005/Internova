import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StudentDashboard from './StudentDashboard';
import CompanyDashboard from './CompanyDashboard';
import ProfileSettings from './ProfileSettings';
import CompanyProfile from './CompanyProfile';

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would come from a JWT or auth state
    const storedRole = localStorage.getItem('userRole');
    
    if (!storedRole) {
      navigate('/login');
      return;
    }
    
    setRole(storedRole);
  }, [navigate]);

  if (!role) {
    return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <DashboardLayout role={role}>
      <Routes>
        <Route path="/" element={role === 'student' ? <StudentDashboard /> : <CompanyDashboard />} />
        <Route path="/profile" element={role === 'company' ? <CompanyProfile /> : <ProfileSettings role={role} />} />
        {/* Placeholder for Discovery route */}
        <Route path="/discovery" element={<div className="text-white">Discovery content coming soon...</div>} />
        <Route path="/insights" element={<div className="text-white">Insights & Analytics coming soon...</div>} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
