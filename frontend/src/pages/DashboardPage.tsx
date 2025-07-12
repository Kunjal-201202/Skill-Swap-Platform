import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Users, 
  MessageSquare, 
  Star, 
  Plus, 
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Swaps',
      value: '12',
      icon: MessageSquare,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Completed',
      value: '8',
      icon: Award,
      color: 'bg-green-500',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Pending',
      value: '3',
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Rating',
      value: '4.8',
      icon: Star,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100'
    }
  ];

  const quickActions = [
    {
      title: 'Find Skills',
      description: 'Search for people with skills you want to learn',
      icon: Search,
      color: 'bg-blue-500',
      link: '/search'
    },
    {
      title: 'Add Skills',
      description: 'Update your offered and wanted skills',
      icon: Plus,
      color: 'bg-green-500',
      link: '/profile'
    },
    {
      title: 'View Swaps',
      description: 'Check your active and completed swaps',
      icon: MessageSquare,
      color: 'bg-purple-500',
      link: '/swaps'
    },
    {
      title: 'Update Profile',
      description: 'Edit your profile and availability',
      icon: Users,
      color: 'bg-orange-500',
      link: '/profile'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Ready to exchange some skills today?
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600">Get started with these common tasks</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${action.color} text-white`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 