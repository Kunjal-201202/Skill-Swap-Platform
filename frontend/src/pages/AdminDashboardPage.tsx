import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Swaps',
      value: '856',
      change: '+8%',
      icon: MessageSquare,
      color: 'bg-green-500',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active Swaps',
      value: '234',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Flagged Items',
      value: '12',
      change: '-5%',
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-100'
    }
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'View and manage user accounts',
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/users'
    },
    {
      title: 'Content Moderation',
      description: 'Review flagged content and reports',
      icon: Shield,
      color: 'bg-red-500',
      link: '/admin/moderation'
    },
    {
      title: 'Analytics',
      description: 'View detailed platform analytics',
      icon: BarChart3,
      color: 'bg-green-500',
      link: '/admin/analytics'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: Settings,
      color: 'bg-purple-500',
      link: '/admin/settings'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user',
      description: 'New user registered: John Doe',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'swap',
      description: 'Swap completed: JavaScript ↔ Cooking',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'moderation',
      description: 'Content flagged for review',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'user',
      description: 'User suspended: spam@example.com',
      time: '2 hours ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'swap':
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'moderation':
        return <Shield className="w-4 h-4 text-red-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100';
      case 'swap':
        return 'bg-green-100';
      case 'moderation':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Monitor and manage the SkillSwap platform
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
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
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
                    {stat.change} this period
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-600">Common administrative tasks</p>
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

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-600">Latest platform activities</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className={`p-2 ${getActivityColor(activity.type)} rounded-lg`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-100 text-blue-800' :
                        activity.type === 'swap' ? 'bg-green-100 text-green-800' :
                        activity.type === 'moderation' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    to="/admin/activity"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all activity →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Health */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Status</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-medium text-gray-900">245ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-gray-900">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="text-sm font-medium text-gray-900">156</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verified Users</span>
                  <span className="text-sm font-medium text-gray-900">1,089</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Suspended Users</span>
                  <span className="text-sm font-medium text-gray-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Rating</span>
                  <span className="text-sm font-medium text-gray-900">4.7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-medium text-gray-900">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 