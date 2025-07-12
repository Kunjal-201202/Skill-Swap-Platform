import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardProfile from './DashBoardProfile';

const Dashboard = () => {
  const email = 'test@example.com';

  const handleNotificationClick = () => {
    alert('🔔 You have no new notifications at the moment!');
  };

  return (
    <div style={styles.wrapper}>
      {/* Modern Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>🎯</div>
          <h2 style={styles.sidebarTitle}>SkillHub</h2>
        </div>
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.navLink}>
            <span style={styles.navIcon}>🏠</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/profile" style={styles.navLink}>
            <span style={styles.navIcon}>👤</span>
            <span>My Profile</span>
          </Link>
          <Link to="/marketplace" style={styles.navLink}>
            <span style={styles.navIcon}>🛒</span>
            <span>Marketplace</span>
          </Link>
          <Link to="/peer-learning" style={styles.navLink}>
            <span style={styles.navIcon}>🔗</span>
            <span>Peer Learning</span>
          </Link>
          <Link to="/skills" style={styles.navLink}>
            <span style={styles.navIcon}>🧠</span>
            <span>Manage Skills</span>
          </Link>
          <Link to="/matches" style={styles.navLink}>
            <span style={styles.navIcon}>💡</span>
            <span>Match Suggestions</span>
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.notificationContainer}>
            <span onClick={handleNotificationClick} style={styles.notifications}>
              🔔 Notifications
            </span>
          </div>
          <DashboardProfile email={email} />
        </div>

        <div style={styles.content}>
          <div style={styles.heroSection}>
            <h1 style={styles.title}>Welcome to SkillHub</h1>
            <p style={styles.subtitle}>Connect, Learn, and Grow with Peers Worldwide</p>
            <div style={styles.statsContainer}>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>150+</span>
                <span style={styles.statLabel}>Active Learners</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>50+</span>
                <span style={styles.statLabel}>Skills Available</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>200+</span>
                <span style={styles.statLabel}>Sessions Completed</span>
              </div>
            </div>
          </div>

          <div style={styles.cardGrid}>
            <Link to="/profile" style={styles.card}>
              <div style={styles.cardIcon}>👤</div>
              <h3 style={styles.cardTitle}>My Profile</h3>
              <p style={styles.cardDescription}>Update your skills and preferences</p>
            </Link>
            
            <Link to="/marketplace" style={styles.card}>
              <div style={styles.cardIcon}>🛒</div>
              <h3 style={styles.cardTitle}>Skill Marketplace</h3>
              <p style={styles.cardDescription}>Discover amazing skills to learn</p>
            </Link>
            
            <Link to="/peer-learning" style={styles.card}>
              <div style={styles.cardIcon}>🔗</div>
              <h3 style={styles.cardTitle}>Peer Learning</h3>
              <p style={styles.cardDescription}>Connect with learning partners</p>
            </Link>
            
            <Link to="/skills" style={styles.card}>
              <div style={styles.cardIcon}>🧠</div>
              <h3 style={styles.cardTitle}>Manage Skills</h3>
              <p style={styles.cardDescription}>Organize your skill portfolio</p>
            </Link>
            
            <Link to="/matches" style={styles.card}>
              <div style={styles.cardIcon}>💡</div>
              <h3 style={styles.cardTitle}>Smart Matches</h3>
              <p style={styles.cardDescription}>Find perfect learning partners</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#f8fafc',
  },
  sidebar: {
    width: '280px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '3rem',
  },
  logo: {
    fontSize: '2.5rem',
  },
  sidebarTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    margin: 0,
    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  navIcon: {
    fontSize: '1.2rem',
  },
  main: {
    flex: 1,
    padding: '2rem 3rem',
    position: 'relative',
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '3rem',
    alignItems: 'center',
    padding: '1rem 0',
  },
  notificationContainer: {
    position: 'relative',
  },
  notifications: {
    cursor: 'pointer',
    fontSize: '1.1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#fff',
    borderRadius: '25px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    fontWeight: '500',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '1.3rem',
    color: '#64748b',
    marginBottom: '3rem',
    fontWeight: '400',
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
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '20px',
    textDecoration: 'none',
    color: '#1e293b',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1e293b',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.5',
  },
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      transform: translateX(5px);
    }
    
    .card:hover {
      transform: translateY(-8px) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
    }
    
    .notifications:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
  `;
  document.head.appendChild(style);
};

// Apply hover effects when component mounts
if (typeof window !== 'undefined') {
  addHoverEffects();
}

export default Dashboard;
