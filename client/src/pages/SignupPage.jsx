import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPwd) {
      alert("Passwords don't match!");
      return;
    }

    // TODO: Replace with real signup logic (e.g. API call)
    alert(`Signed up successfully!\nName: ${name}\nEmail: ${email}`);

    // Redirect to dashboard after successful signup
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your full name"
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Create a password"
          style={styles.input}
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          required
          placeholder="Confirm your password"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        <p style={styles.text}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '2rem',
    color: '#3E54AC',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3E54AC',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  text: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  link: {
    color: '#3E54AC',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default SignupPage;
