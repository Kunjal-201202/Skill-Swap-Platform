import React, { useState } from 'react';
import { Search, MapPin, Star, MessageSquare, User } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      location: 'New York',
      rating: 4.8,
      reviewCount: 12,
      skillsOffered: ['JavaScript', 'React', 'Node.js'],
      skillsWanted: ['Python', 'Design']
    },
    {
      id: 2,
      name: 'Jane Smith',
      location: 'Los Angeles',
      rating: 4.9,
      reviewCount: 8,
      skillsOffered: ['Cooking', 'Photography'],
      skillsWanted: ['JavaScript', 'Guitar']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Skills</h1>
            <p className="mt-2 text-gray-600">
              Discover people with skills you want to learn
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by skill..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{user.rating} ({user.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Offers</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsOffered.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Wants</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsWanted.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request Swap
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 