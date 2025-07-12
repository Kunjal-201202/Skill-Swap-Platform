import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  Star
} from 'lucide-react';

const SwapsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const mockSwaps = [
    {
      id: 1,
      partner: 'John Doe',
      requestedSkill: 'JavaScript',
      offeredSkill: 'Cooking',
      status: 'pending',
      date: '2024-01-15',
      rating: 4.8
    },
    {
      id: 2,
      partner: 'Jane Smith',
      requestedSkill: 'Python',
      offeredSkill: 'Guitar',
      status: 'completed',
      date: '2024-01-10',
      rating: 5.0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSwaps = filter === 'all' 
    ? mockSwaps 
    : mockSwaps.filter(swap => swap.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Swaps</h1>
            <p className="mt-2 text-gray-600">
              Manage your skill exchange requests and activities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredSwaps.length > 0 ? (
            filteredSwaps.map((swap) => (
              <div key={swap.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        {getStatusIcon(swap.status)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Swap with {swap.partner}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(swap.status)}`}>
                              {swap.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Created {new Date(swap.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">You'll Learn</h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {swap.requestedSkill}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">You'll Teach</h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {swap.offeredSkill}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {swap.rating && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>Rating: {swap.rating}/5</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      {swap.status === 'pending' && (
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                          Respond
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No swaps found</h3>
              <p className="text-gray-600 mb-6">
                Start by searching for people with skills you want to learn.
              </p>
              <Link
                to="/search"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Find Skills
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapsPage; 