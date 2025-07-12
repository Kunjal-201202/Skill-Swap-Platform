import React, { useState } from 'react';
import { User, Mail, MapPin, Edit, Plus, X, Save, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    city: user?.location?.city || '',
    state: user?.location?.state || '',
    country: user?.location?.country || '',
    isProfilePublic: user?.isProfilePublic ?? true
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="mt-2 text-gray-600">
                Manage your profile, skills, and preferences
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        disabled
                      />
                      <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell others about yourself..."
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8 (12)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Skills Offered</span>
                  <span className="text-sm font-medium">{user?.skillsOffered?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Skills Wanted</span>
                  <span className="text-sm font-medium">{user?.skillsWanted?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 