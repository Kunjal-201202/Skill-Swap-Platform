import React from 'react';
import SkillForm from '../components/SkillForm';

const SkillMatchPage = () => {
  const userId = 1; // Replace with dynamic user ID from auth

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Skill Marketplace</h1>
        <p style={styles.subtitle}>Exchange skills and grow together with the community!</p>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Manage Your Skills</h2>
            <p style={styles.cardDescription}>
              Add the skills you can teach and the skills you want to learn. 
              This helps us match you with perfect learning partners!
            </p>
          </div>
          <SkillForm userId={userId} />
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  card: {
    background: '#fff',
    borderRadius: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '2rem 2rem 1rem',
    textAlign: 'center',
    borderBottom: '1px solid #e2e8f0',
  },
  cardTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto',
  },
};

export default SkillMatchPage;
