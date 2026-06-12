import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks.js";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import StudentDashboard from "../pages/dashboard/StudentDashboard.jsx";
import CompanyDashboard from "../pages/dashboard/CompanyDashboard.jsx";
import Profile from "../pages/profile/Profile.jsx";

// ProtectedRoute: redirects to /login if no token
function ProtectedRoute({ children }) {
  const { token } = useAppSelector((s) => s.auth);
  return token ? children : <Navigate to="/login" replace />;
}

// DashboardRoute: picks student or company dashboard based on role
function DashboardRoute() {
  const { user } = useAppSelector((s) => s.auth);
  if (!user) return null;
  return user.role === "company" ? <CompanyDashboard /> : <StudentDashboard />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRoute /></ProtectedRoute>} />
      <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}