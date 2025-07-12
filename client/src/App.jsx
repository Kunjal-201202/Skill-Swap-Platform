
// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages at the top
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PeerLearning from './pages/PeerLearning';
import SkillManager from './pages/SkillManager';
import Matches from './pages/Matches';
import SkillMatchPage from './pages/SkillMatchPage';

// Your App component starts here
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/peer-learning" element={<PeerLearning />} />
      <Route path="/skills" element={<SkillManager />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/marketplace" element={<SkillMatchPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
