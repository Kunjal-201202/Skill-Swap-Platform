import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.backgroundGradient}></div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.logoSection}>
          <div style={styles.logo}>🎯</div>
          <h1 style={styles.brandTitle}>SkillHub</h1>
          <p style={styles.brandSubtitle}>Connect, Learn, and Grow Together</p>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <h2 style={styles.title}>Welcome Back</h2>
              <p style={styles.subtitle}>Sign in to continue your learning journey</p>
            </div>

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>📧</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>🔒</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.forgotPassword}>
                <Link to="/forgot-password" style={styles.forgotLink}>
                  Forgot your password?
                </Link>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                style={{
                  ...styles.button,
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? (
                  <span style={styles.loadingText}>
                    <span style={styles.spinner}>⏳</span> Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              <div style={styles.divider}>
                <span style={styles.dividerText}>or</span>
              </div>

              <button type="button" style={styles.googleButton}>
                <span style={styles.googleIcon}>🔍</span>
                Continue with Google
              </button>
            </form>

            <div style={styles.signupSection}>
              <p style={styles.signupText}>
                Don't have an account?{' '}
                <Link to="/register" style={styles.signupLink}>
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
    maxWidth: '1200px',
    width: '100%',
    padding: '2rem',
    zIndex: 1,
    position: 'relative',
  },
  logoSection: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  logo: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  brandTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  brandSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    fontWeight: '400',
  },
  formContainer: {
    flex: 1,
    maxWidth: '450px',
  },
  formCard: {
    background: '#fff',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  formHeader: {
    padding: '2.5rem 2.5rem 1rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '400',
  },
  form: {
    padding: '0 2.5rem 2.5rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    fontSize: '1.1rem',
    color: '#9ca3af',
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '1.5rem',
  },
  forgotLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '1.5rem',
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  dividerText: {
    background: '#fff',
    padding: '0 1rem',
    color: '#9ca3af',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  googleButton: {
    width: '100%',
    padding: '1rem',
    background: '#fff',
    color: '#374151',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  googleIcon: {
    fontSize: '1.1rem',
  },
  signupSection: {
    padding: '1.5rem 2.5rem',
    background: '#f8fafc',
    textAlign: 'center',
  },
  signupText: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#64748b',
  },
  signupLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

// Add CSS animations
const addAnimations = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    input:focus {
      outline: none;
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3) !important;
    }
    
    .google-button:hover {
      background-color: #f8fafc !important;
      border-color: #cbd5e1 !important;
    }
    
    .forgot-link:hover {
      text-decoration: underline !important;
    }
    
    .signup-link:hover {
      text-decoration: underline !important;
    }
  `;
  document.head.appendChild(style);
};

if (typeof window !== 'undefined') {
  addAnimations();
}

export default LoginPage;
