import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Star,
  Calendar,
  MapPin
} from 'lucide-react';

const AdminAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const analyticsData = {
    userGrowth: [
      { month: 'Jan', users: 120 },
      { month: 'Feb', users: 180 },
      { month: 'Mar', users: 250 },
      { month: 'Apr', users: 320 },
      { month: 'May', users: 400 },
      { month: 'Jun', users: 480 }
    ],
    topSkills: [
      { skill: 'JavaScript', count: 156 },
      { skill: 'Python', count: 134 },
      { skill: 'Cooking', count: 98 },
      { skill: 'Guitar', count: 87 },
      { skill: 'Spanish', count: 76 }
    ]
  };

  const metrics = [
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
      title: 'Avg Rating',
      value: '4.7',
      change: '+0.2',
      icon: Star,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Success Rate',
      value: '87%',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100'
    }
  ];

  const renderBarChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(d => d.count || d.users));
    
    return (
      <div className="flex items-end justify-between h-48 space-x-2">
        {data.map((item, index) => {
          const value = item.count || item.users;
          const percentage = (value / maxValue) * 100;
          const label = item.month || item.skill;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t" style={{ height: '200px' }}>
                <div 
                  className="bg-blue-500 rounded-t transition-all duration-300"
                  style={{ height: `${percentage}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600 text-center">
                <div className="font-medium">{label}</div>
                <div>{value}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="mt-2 text-gray-600">
                Platform performance and user insights
              </p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className={`p-2 ${metric.bgColor} rounded-lg`}>
                  <metric.icon className={`w-6 h-6 ${metric.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
                    {metric.change} this period
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
              <p className="text-sm text-gray-600">Monthly user registration trends</p>
            </div>
            <div className="p-6">
              {renderBarChart(analyticsData.userGrowth)}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Most Popular Skills</h2>
              <p className="text-sm text-gray-600">Skills with highest demand</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analyticsData.topSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {skill.skill.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(skill.count / Math.max(...analyticsData.topSkills.map(s => s.count))) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">{skill.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage; 