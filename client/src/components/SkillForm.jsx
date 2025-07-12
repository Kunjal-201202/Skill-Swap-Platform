import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillForm = ({ userId }) => {
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/skills/${userId}`);
        setSkillsOffered(res.data.skillsOffered || []);
        setSkillsWanted(res.data.skillsWanted || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setMessage('❌ Failed to load skills');
        setTimeout(() => setMessage(''), 3000);
      }
    };
    fetchSkills();
  }, [userId]);

  const addTeachSkill = () => {
    const skill = newTeachSkill.trim();
    if (skill && !skillsOffered.includes(skill)) {
      setSkillsOffered([...skillsOffered, skill]);
      setNewTeachSkill('');
    }
  };

  const addLearnSkill = () => {
    const skill = newLearnSkill.trim();
    if (skill && !skillsWanted.includes(skill)) {
      setSkillsWanted([...skillsWanted, skill]);
      setNewLearnSkill('');
    }
  };

  const removeTeachSkill = (skill) => {
    setSkillsOffered(skillsOffered.filter(s => s !== skill));
  };

  const removeLearnSkill = (skill) => {
    setSkillsWanted(skillsWanted.filter(s => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await axios.put(`http://localhost:5000/api/skills/${userId}`, {
        skillsOffered,
        skillsWanted,
      });
      setMessage('✅ Skills updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update skills. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
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

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Update Your Skills</h2>

        {/* Teach Skills */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🎯 Skills You Can Teach</h3>
          <div style={styles.skillList}>
            {skillsOffered.map(skill => (
              <div key={skill} style={styles.skillTag}>
                {skill}
                <button 
                  type="button" 
                  onClick={() => removeTeachSkill(skill)} 
                  style={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newTeachSkill}
              onChange={e => setNewTeachSkill(e.target.value)}
              style={styles.input}
              placeholder="Add a skill you can teach"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeachSkill())}
            />
            <button
              type="button"
              onClick={addTeachSkill}
              style={styles.addButton}
            >
              Add
            </button>
          </div>
        </div>

        <div style={styles.divider}></div>

        {/* Learn Skills */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📚 Skills You Want to Learn</h3>
          <div style={styles.skillList}>
            {skillsWanted.map(skill => (
              <div key={skill} style={styles.skillTag}>
                {skill}
                <button 
                  type="button" 
                  onClick={() => removeLearnSkill(skill)} 
                  style={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newLearnSkill}
              onChange={e => setNewLearnSkill(e.target.value)}
              style={styles.input}
              placeholder="Add a skill you want to learn"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLearnSkill())}
            />
            <button
              type="button"
              onClick={addLearnSkill}
              style={styles.addButton}
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            ...styles.submitButton,
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? '💾 Saving...' : '💾 Save Skills'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  message: {
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '2rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem',
  },
  skillList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
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
  inputGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
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
  divider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '2rem 0',
  },
  submitButton: {
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
    marginTop: '1rem',
  },
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    input:focus {
      outline: none;
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
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

export default SkillForm;
