import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Skill Swap</h1>
            <nav className="flex space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="/search" className="text-gray-600 hover:text-gray-900">Search</a>
              <a href="/swaps" className="text-gray-600 hover:text-gray-900">Swaps</a>
              <a href="/profile" className="text-gray-600 hover:text-gray-900">Profile</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 