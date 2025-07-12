import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PeerLearning = () => {
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    duration: '60',
    topic: '',
    notes: ''
  });

  // Mock data for available peers
  const availablePeers = [
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav@example.com",
      skillsOffered: ["React", "Node.js", "JavaScript"],
      skillsWanted: ["UI/UX", "Python"],
      rating: 4.8,
      sessionsCompleted: 15,
      availability: "Weekdays 6-9 PM, Weekends 10 AM-2 PM",
      bio: "Full-stack developer with 3+ years of experience. Love teaching and learning new technologies!",
      profilePic: ""
    },
    {
      id: 2,
      name: "Meera Iyer",
      email: "meera@example.com",
      skillsOffered: ["Photoshop", "Illustrator", "UI/UX Design"],
      skillsWanted: ["React", "Firebase"],
      rating: 4.9,
      sessionsCompleted: 23,
      availability: "Weekdays 7-10 PM, Weekends anytime",
      bio: "Creative designer passionate about helping others learn design principles and tools.",
      profilePic: ""
    },
    {
      id: 3,
      name: "Rohit Verma",
      email: "rohit@example.com",
      skillsOffered: ["Python", "Data Science", "Machine Learning"],
      skillsWanted: ["Marketing", "Public Speaking"],
      rating: 4.7,
      sessionsCompleted: 12,
      availability: "Weekdays 5-8 PM, Weekends 9 AM-6 PM",
      bio: "Data scientist and ML enthusiast. Always excited to share knowledge and learn from others!",
      profilePic: ""
    }
  ];

  const handleScheduleMeeting = (peer) => {
    setSelectedPeer(peer);
    setShowScheduleModal(true);
  };

  const handleSubmitMeeting = (e) => {
    e.preventDefault();
    
    alert(`Meeting scheduled with ${selectedPeer.name}!\nDate: ${meetingDetails.date}\nTime: ${meetingDetails.time}\nDuration: ${meetingDetails.duration} minutes\nTopic: ${meetingDetails.topic}`);
    setShowScheduleModal(false);
    setMeetingDetails({
      date: '',
      time: '',
      duration: '60',
      topic: '',
      notes: ''
    });
  };

  const handleInputChange = (e) => {
    setMeetingDetails({
      ...meetingDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔗 Peer Learning</h1>
        <p style={styles.subtitle}>Connect with learning partners and schedule sessions</p>
      </div>

      <div style={styles.content}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>{availablePeers.length}</span>
            <span style={styles.statLabel}>Available Peers</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>50+</span>
            <span style={styles.statLabel}>Sessions Completed</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>4.8</span>
            <span style={styles.statLabel}>Average Rating</span>
          </div>
        </div>

        <div style={styles.peersGrid}>
          {availablePeers.map(peer => (
            <div key={peer.id} style={styles.peerCard}>
              <div style={styles.cardHeader}>
                <div style={styles.userInfo}>
                  <div style={styles.avatar}>
                    {peer.profilePic ? (
                      <img src={peer.profilePic} alt={peer.name} style={styles.avatarImg} />
                    ) : (
                      <span style={styles.avatarText}>{peer.name.charAt(0)}</span>
                    )}
                  </div>
                  <div style={styles.userDetails}>
                    <h3 style={styles.userName}>{peer.name}</h3>
                    <div style={styles.ratingContainer}>
                      <span style={styles.rating}>⭐ {peer.rating}</span>
                      <span style={styles.sessions}>({peer.sessionsCompleted} sessions)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.bioSection}>
                <p style={styles.bio}>{peer.bio}</p>
              </div>

              <div style={styles.skillsSection}>
                <div style={styles.skillGroup}>
                  <h4 style={styles.skillTitle}>🎯 Can Teach</h4>
                  <div style={styles.skillTags}>
                    {peer.skillsOffered.map((skill, index) => (
                      <span key={index} style={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.skillGroup}>
                  <h4 style={styles.skillTitle}>📚 Wants to Learn</h4>
                  <div style={styles.skillTags}>
                    {peer.skillsWanted.map((skill, index) => (
                      <span key={index} style={styles.skillTagWanted}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.availabilitySection}>
                <h4 style={styles.availabilityTitle}>📅 Availability</h4>
                <p style={styles.availabilityText}>{peer.availability}</p>
              </div>

              <div style={styles.actionButtons}>
                <button 
                  onClick={() => handleScheduleMeeting(peer)}
                  style={styles.scheduleBtn}
                >
                  📅 Schedule Meeting
                </button>
                <button 
                  onClick={() => alert(`Message sent to ${peer.name}!`)}
                  style={styles.messageBtn}
                >
                  💬 Send Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Schedule Modal */}
      {showScheduleModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Schedule Meeting with {selectedPeer.name}</h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitMeeting} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={meetingDetails.date}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Time *</label>
                <input
                  type="time"
                  name="time"
                  value={meetingDetails.time}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Duration (minutes) *</label>
                <select
                  name="duration"
                  value={meetingDetails.duration}
                  onChange={handleInputChange}
                  style={styles.select}
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Topic/Skill to Focus On *</label>
                <input
                  type="text"
                  name="topic"
                  value={meetingDetails.topic}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="e.g., React Hooks, UI Design Principles"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Additional Notes</label>
                <textarea
                  name="notes"
                  value={meetingDetails.notes}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Any specific topics or questions you'd like to cover..."
                  rows={3}
                />
              </div>

              <div style={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => setShowScheduleModal(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={styles.confirmButton}
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    minWidth: '120px',
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
  peersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '2rem',
  },
  peerCard: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
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
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  rating: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#f59e0b',
  },
  sessions: {
    fontSize: '0.8rem',
    color: '#64748b',
  },
  bioSection: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  bio: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.5',
    margin: 0,
  },
  skillsSection: {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  skillGroup: {
    marginBottom: '1rem',
  },
  skillTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  skillTag: {
    padding: '0.3rem 0.7rem',
    backgroundColor: '#667eea',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  skillTagWanted: {
    padding: '0.3rem 0.7rem',
    backgroundColor: '#10b981',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  availabilitySection: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  availabilityTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  availabilityText: {
    fontSize: '0.8rem',
    color: '#64748b',
    lineHeight: '1.4',
    margin: 0,
  },
  actionButtons: {
    padding: '1.5rem',
    display: 'flex',
    gap: '0.75rem',
  },
  scheduleBtn: {
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
  messageBtn: {
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
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    background: '#fff',
    borderRadius: '20px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    padding: '1.5rem 1.5rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#64748b',
    cursor: 'pointer',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalForm: {
    padding: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '80px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  cancelButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    color: '#374151',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  confirmButton: {
    flex: 1,
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    .peer-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
    }
    
    .schedule-btn:hover {
      background-color: #5a67d8 !important;
      transform: translateY(-1px);
    }
    
    .message-btn:hover {
      background-color: #f1f5f9 !important;
      border-color: #cbd5e1 !important;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }
    
    .confirm-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3) !important;
    }
    
    .cancel-button:hover {
      background-color: #f1f5f9 !important;
      border-color: #cbd5e1 !important;
    }
  `;
  document.head.appendChild(style);
};

if (typeof window !== 'undefined') {
  addHoverEffects();
}

export default PeerLearning;
