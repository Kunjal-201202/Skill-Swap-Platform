export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: Availability;
  isProfilePublic: boolean;
  rating: Rating;
  location?: Location;
  role: 'user' | 'admin' | 'moderator';
  isBanned: boolean;
  banReason?: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description?: string;
}

export interface Availability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
}

export interface Rating {
  average: number;
  count: number;
}

export interface Location {
  city?: string;
  state?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Swap {
  _id: string;
  requester: User;
  recipient: User;
  requestedSkill: Skill;
  offeredSkill: Skill;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message: string;
  proposedDate?: string;
  proposedLocation?: string;
  scheduledDate?: string;
  scheduledLocation?: string;
  duration: number;
  requesterRating?: SwapRating;
  recipientRating?: SwapRating;
  messages: SwapMessage[];
  isCompleted: boolean;
  completedAt?: string;
  cancellationReason?: string;
  cancelledBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SwapRating {
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface SwapMessage {
  _id: string;
  sender: User;
  message: string;
  createdAt: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role?: string;
  token: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SearchFilters {
  skill?: string;
  location?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  page?: number;
  limit?: number;
}

export interface SwapFilters {
  status?: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  type?: 'sent' | 'received';
  page?: number;
  limit?: number;
}

export interface AdminDashboard {
  users: {
    total: number;
    active: number;
    banned: number;
  };
  swaps: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  recentActivity: {
    users: User[];
    swaps: Swap[];
  };
  topSkills: Array<{
    _id: string;
    count: number;
    avgLevel: number;
  }>;
}

export interface AdminAnalytics {
  userGrowth: Array<{
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }>;
  swapStats: Array<{
    _id: string;
    count: number;
  }>;
  topLocations: Array<{
    _id: string;
    count: number;
  }>;
  avgRating: {
    avgRating: number;
    totalRatings: number;
  };
} 