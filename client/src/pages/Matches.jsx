// src/pages/Matches.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockMatches = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    skillsOffered: ["React", "Node.js", "JavaScript"],
    skillsWanted: ["UI/UX", "Python", "Machine Learning"],
    matchScore: 92,
    bio: "Full-stack developer passionate about creating amazing web experiences.",
    profilePic: ""
  },
  {
    id: 2,
    name: "Meera Iyer",
    email: "meera@example.com",
    skillsOffered: ["Photoshop", "Illustrator", "UI/UX Design"],
    skillsWanted: ["React", "Firebase", "Web Development"],
    matchScore: 87,
    bio: "Creative designer with 5+ years of experience in digital design.",
    profilePic: ""
  },
  {
    id: 3,
    name: "Rohit Verma",
    email: "rohit@example.com",
    skillsOffered: ["Python", "Data Science", "Machine Learning"],
    skillsWanted: ["Marketing", "Public Speaking", "Business Strategy"],
    matchScore: 79,
    bio: "Data scientist and ML enthusiast looking to expand business skills.",
    profilePic: ""
  },
];

const Matches = () => {
  const navigate = useNavigate();

  const handleConnect = (user) => {
    // In a real app, this would send a connection request
    alert(`Connection request sent to ${user.name}!`);
  };

  const handleRequestSwap = (user) => {
    // In a real app, this would initiate a skill swap request
    alert(`Skill swap request sent to ${user.name}!`);
  };

  const handleViewProfile = (user) => {
    // Navigate to a profile view page (you can create this later)
    // For now, we'll show an alert with user info
    alert(`Viewing ${user.name}'s profile\nEmail: ${user.email}\nBio: ${user.bio}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💡 Smart Matches</h1>
        <p style={styles.subtitle}>Discover perfect learning partners based on your skills</p>
      </div>

      <div style={styles.content}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>{mockMatches.length}</span>
            <span style={styles.statLabel}>Available Matches</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>85%</span>
            <span style={styles.statLabel}>Average Match Score</span>
          </div>
        </div>

        <div style={styles.matchesGrid}>
          {mockMatches.map(user => (
            <div key={user.id} style={styles.matchCard}>
              <div style={styles.cardHeader}>
                <div style={styles.userInfo}>
                  <div style={styles.avatar}>
                    {user.profilePic ? (
                      <img src={user.profilePic} alt={user.name} style={styles.avatarImg} />
                    ) : (
                      <span style={styles.avatarText}>{user.name.charAt(0)}</span>
                    )}
                  </div>
                  <div style={styles.userDetails}>
                    <h3 style={styles.userName}>{user.name}</h3>
                    <p style={styles.userBio}>{user.bio}</p>
                  </div>
                </div>
                <div style={styles.matchScore}>
                  <span style={styles.scoreNumber}>{user.matchScore}%</span>
                  <span style={styles.scoreLabel}>Match</span>
                </div>
              </div>

              <div style={styles.skillsSection}>
                <div style={styles.skillGroup}>
                  <h4 style={styles.skillTitle}>🎯 Can Teach</h4>
                  <div style={styles.skillTags}>
                    {user.skillsOffered.map((skill, index) => (
                      <span key={index} style={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.skillGroup}>
                  <h4 style={styles.skillTitle}>📚 Wants to Learn</h4>
                  <div style={styles.skillTags}>
                    {user.skillsWanted.map((skill, index) => (
                      <span key={index} style={styles.skillTagWanted}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.actionButtons}>
                <button 
                  onClick={() => handleViewProfile(user)}
                  style={styles.viewProfileBtn}
                >
                  👤 View Profile
                </button>
                <button 
                  onClick={() => handleConnect(user)}
                  style={styles.connectBtn}
                >
                  🔗 Connect
                </button>
                <button 
                  onClick={() => handleRequestSwap(user)}
                  style={styles.swapBtn}
                >
                  🔄 Request Swap
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    textAlign: 'center',
    padding: '3rem 2rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    fontWeight: '400',
    maxWidth: '600px',
    margin: '0 auto',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '3rem',
  },
  statCard: {
    background: '#fff',
    padding: '1.5rem 2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    minWidth: '150px',
  },
  statNumber: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500',
  },
  matchesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },
  matchCard: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #e2e8f0',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem',
  },
  userBio: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.4',
  },
  matchScore: {
    textAlign: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '12px',
    border: '1px solid #e0f2fe',
  },
  scoreNumber: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0369a1',
  },
  scoreLabel: {
    fontSize: '0.8rem',
    color: '#64748b',
    fontWeight: '500',
  },
  skillsSection: {
    padding: '1.5rem',
  },
  skillGroup: {
    marginBottom: '1.5rem',
  },
  skillTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.75rem',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  skillTag: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#667eea',
    color: '#fff',
    borderRadius: '16px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  skillTagWanted: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#10b981',
    color: '#fff',
    borderRadius: '16px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  actionButtons: {
    padding: '1.5rem',
    display: 'flex',
    gap: '0.75rem',
    borderTop: '1px solid #e2e8f0',
  },
  viewProfileBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    color: '#374151',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  connectBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  swapBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    .match-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
    }
    
    .view-profile-btn:hover {
      background-color: #f1f5f9 !important;
      border-color: #cbd5e1 !important;
    }
    
    .connect-btn:hover {
      background-color: #5a67d8 !important;
      transform: translateY(-1px);
    }
    
    .swap-btn:hover {
      background-color: #059669 !important;
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);
};

if (typeof window !== 'undefined') {
  addHoverEffects();
}

export default Matches;
