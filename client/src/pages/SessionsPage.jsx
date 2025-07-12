import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SessionCard from '../components/SessionCard';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get('/api/sessions');
      setSessions(res.data);
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    }
  };

  const handleBook = async (id) => {
    try {
      await axios.post(`/api/sessions/${id}/book`);
      alert('Session booked successfully!');
    } catch (error) {
      alert('Failed to book session');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📚 Available Learning Sessions</h1>
      <div style={styles.grid}>
        {sessions.map((session) => (
          <div key={session._id} style={styles.cardWrapper}>
            <SessionCard session={session} onBook={handleBook} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1100px',
    margin: '0 auto',
    backgroundColor: '#F0F4FF',  // light blue background
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#443850',  // dark purple text
    marginBottom: '2rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.8rem',
  },
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(68, 56, 80, 0.15)',  // subtle purple shadow
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default SessionsPage;
