import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import SwapsPage from './pages/SwapsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';

// Components
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="swaps" element={<SwapsPage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute><Layout /></AdminRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 