import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const email = "test@example.com";

  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    contact: email,
    skillsOffered: [],
    skillsWanted: [],
    availability: '',
    portfolioLink: '',
    skillVerificationStatus: 'Pending',
    profilePic: ''
  });

  const [preview, setPreview] = useState(null);
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/userprofile/${email}`);
      setProfile(res.data);
      setPreview(res.data.profilePic);
    } catch (err) {
      console.log("No existing profile");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(prev => ({ ...prev, profilePic: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/profile', {
        ...profile,
        email
      });
      setMessage('✅ Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("❌ Error submitting:", err.response || err.message);
      setMessage('❌ Failed to save profile. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = (type) => {
    if (type === 'offered' && offeredSkill.trim()) {
      setProfile(prev => ({ 
        ...prev, 
        skillsOffered: [...prev.skillsOffered, offeredSkill.trim()] 
      }));
      setOfferedSkill('');
    } else if (type === 'wanted' && wantedSkill.trim()) {
      setProfile(prev => ({ 
        ...prev, 
        skillsWanted: [...prev.skillsWanted, wantedSkill.trim()] 
      }));
      setWantedSkill('');
    }
  };

  const removeSkill = (type, index) => {
    if (type === 'offered') {
      setProfile(prev => ({
        ...prev,
        skillsOffered: prev.skillsOffered.filter((_, i) => i !== index)
      }));
    } else if (type === 'wanted') {
      setProfile(prev => ({
        ...prev,
        skillsWanted: prev.skillsWanted.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>👤 Profile Settings</h1>
        <p style={styles.subtitle}>Complete your profile to connect with other learners</p>
      </div>

      {message && (
        <div style={{
          ...styles.message,
          backgroundColor: message.includes('✅') ? '#dcfce7' : '#fef2f2',
          color: message.includes('✅') ? '#166534' : '#dc2626',
          border: `1px solid ${message.includes('✅') ? '#bbf7d0' : '#fecaca'}`
        }}>
          {message}
        </div>
      )}

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Basic Information</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={e => setProfile({ ...profile, name: e.target.value })} 
                  required 
                  style={styles.input}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input 
                  type="email" 
                  value={profile.contact} 
                  readOnly 
                  style={{...styles.input, backgroundColor: '#f1f5f9'}}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Bio</label>
              <textarea 
                value={profile.bio} 
                onChange={e => setProfile({ ...profile, bio: e.target.value })} 
                style={styles.textarea}
                placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                rows={4}
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Profile Picture</h3>
            <div style={styles.uploadSection}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={styles.fileInput}
                id="profile-pic"
              />
              <label htmlFor="profile-pic" style={styles.fileLabel}>
                📷 Choose Profile Picture
              </label>
              {preview && (
                <div style={styles.previewContainer}>
                  <img src={preview} alt="preview" style={styles.preview} />
                </div>
              )}
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Skills</h3>
            
            <div style={styles.skillsContainer}>
              <div style={styles.skillSection}>
                <h4 style={styles.skillTitle}>🎯 Skills I Can Teach</h4>
                <div style={styles.skillInput}>
                  <input 
                    type="text" 
                    value={offeredSkill} 
                    onChange={e => setOfferedSkill(e.target.value)}
                    style={styles.input}
                    placeholder="e.g., JavaScript, Photography, Cooking"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('offered'))}
                  />
                  <button 
                    type="button" 
                    onClick={() => addSkill('offered')}
                    style={styles.addButton}
                  >
                    Add
                  </button>
                </div>
                <div style={styles.skillList}>
                  {profile.skillsOffered.map((skill, i) => (
                    <span key={i} style={styles.skillTag}>
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => removeSkill('offered', i)}
                        style={styles.removeButton}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.skillSection}>
                <h4 style={styles.skillTitle}>📚 Skills I Want to Learn</h4>
                <div style={styles.skillInput}>
                  <input 
                    type="text" 
                    value={wantedSkill} 
                    onChange={e => setWantedSkill(e.target.value)}
                    style={styles.input}
                    placeholder="e.g., Python, Guitar, Spanish"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('wanted'))}
                  />
                  <button 
                    type="button" 
                    onClick={() => addSkill('wanted')}
                    style={styles.addButton}
                  >
                    Add
                  </button>
                </div>
                <div style={styles.skillList}>
                  {profile.skillsWanted.map((skill, i) => (
                    <span key={i} style={styles.skillTag}>
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => removeSkill('wanted', i)}
                        style={styles.removeButton}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Additional Information</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Availability</label>
                <textarea 
                  value={profile.availability} 
                  onChange={e => setProfile({ ...profile, availability: e.target.value })} 
                  style={styles.textarea}
                  placeholder="When are you available for learning sessions?"
                  rows={3}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Portfolio Link</label>
                <input 
                  type="url" 
                  value={profile.portfolioLink} 
                  onChange={e => setProfile({ ...profile, portfolioLink: e.target.value })} 
                  style={styles.input}
                  placeholder="https://your-portfolio.com"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Verification Status</label>
              <select 
                value={profile.skillVerificationStatus} 
                onChange={e => setProfile({ ...profile, skillVerificationStatus: e.target.value })}
                style={styles.select}
              >
                <option value="Pending">Pending Verification</option>
                <option value="Verified">Verified</option>
                <option value="Not Verified">Not Verified</option>
              </select>
            </div>
          </div>

          <div style={styles.submitSection}>
            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? '💾 Saving...' : '💾 Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#64748b',
    fontWeight: '400',
  },
  message: {
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    fontWeight: '500',
  },
  formContainer: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  },
  form: {
    padding: '2rem',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
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
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '100px',
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
  uploadSection: {
    textAlign: 'center',
  },
  fileInput: {
    display: 'none',
  },
  fileLabel: {
    display: 'inline-block',
    padding: '1rem 2rem',
    backgroundColor: '#f8fafc',
    border: '2px dashed #cbd5e1',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  previewContainer: {
    marginTop: '1rem',
  },
  preview: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #e2e8f0',
  },
  skillsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  skillSection: {
    background: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '16px',
  },
  skillTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  skillInput: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  skillList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  skillTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#667eea',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitSection: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  submitButton: {
    padding: '1rem 3rem',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }
    
    .file-label:hover {
      border-color: #667eea !important;
      background-color: #f1f5f9 !important;
    }
    
    .add-button:hover {
      background-color: #5a67d8 !important;
      transform: translateY(-1px);
    }
    
    .submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4) !important;
    }
    
    .remove-button:hover {
      background-color: rgba(255, 255, 255, 0.2) !important;
      border-radius: 50% !important;
    }
  `;
  document.head.appendChild(style);
};

if (typeof window !== 'undefined') {
  addHoverEffects();
}

export default Profile;
