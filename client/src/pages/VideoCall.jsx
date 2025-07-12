import React from 'react';
import { useParams } from 'react-router-dom';

const VideoCall = () => {
  const { channelName } = useParams();
  const url = `https://skillswap-hq.daily.co/${channelName}`;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎥 Joining Room: <span style={styles.channel}>{channelName}</span></h2>
      <div style={styles.card}>
        <iframe
          title="Daily.co Video Call"
          src={url}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          style={styles.iframe}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#FDF6EC',
    height: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '1.8rem',
    color: '#3E54AC',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  channel: {
    fontWeight: '600',
    color: '#555',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    maxWidth: '100%',
    height: '85vh',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '12px',
  },
};

export default VideoCall;
