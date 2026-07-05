import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CareerGoals from './pages/CareerGoals';
import Roadmap from './pages/Roadmap';
import SkillGap from './pages/SkillGap';
import InterviewPrep from './pages/InterviewPrep';
import Resources from './pages/Resources';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import VerifyEmail from './pages/VerifyEmail';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import { useAuthStore } from './store/authStore';

import LandingPage from './pages/LandingPage.tsx';
import ApiKeys from './pages/ApiKeys.tsx';

function App() {
  const { user } = useAuthStore();
  
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/careers" element={<CareerGoals />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/interview" element={<InterviewPrep />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/api-keys" element={<ApiKeys />} />
            {user?.role === 'admin' && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
              </>
            )}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
