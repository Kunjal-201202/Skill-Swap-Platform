import React, { useState } from 'react';
import './SkillManager.css'; // External CSS file for styling

const SkillManager = () => {
  const [skillsOffered, setSkillsOffered] = useState(["React"]);
  const [skillsWanted, setSkillsWanted] = useState(["UI/UX"]);
  const [newOffered, setNewOffered] = useState("");
  const [newWanted, setNewWanted] = useState("");

  const addSkill = (type) => {
    if (type === 'offered' && newOffered.trim()) {
      setSkillsOffered([...skillsOffered, newOffered.trim()]);
      setNewOffered("");
    } else if (type === 'wanted' && newWanted.trim()) {
      setSkillsWanted([...skillsWanted, newWanted.trim()]);
      setNewWanted("");
    }
  };

  const deleteSkill = (type, index) => {
    if (type === 'offered') {
      setSkillsOffered(skillsOffered.filter((_, i) => i !== index));
    } else {
      setSkillsWanted(skillsWanted.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="skill-manager-container">
      <h2 className="skill-manager-title">🛠️ Skill Management</h2>

      <div className="skill-card">
        <h3>Skills I Can Teach</h3>
        <ul>
          {skillsOffered.map((skill, idx) => (
            <li key={idx}>
              {skill}
              <button onClick={() => deleteSkill('offered', idx)} className="del-btn">❌</button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <input
            value={newOffered}
            onChange={e => setNewOffered(e.target.value)}
            placeholder="Add skill you offer"
          />
          <button onClick={() => addSkill('offered')} className="add-btn">Add</button>
        </div>
      </div>

      <div className="skill-card">
        <h3>Skills I Want to Learn</h3>
        <ul>
          {skillsWanted.map((skill, idx) => (
            <li key={idx}>
              {skill}
              <button onClick={() => deleteSkill('wanted', idx)} className="del-btn">❌</button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <input
            value={newWanted}
            onChange={e => setNewWanted(e.target.value)}
            placeholder="Add skill you want"
          />
          <button onClick={() => addSkill('wanted')} className="add-btn">Add</button>
        </div>
      </div>
    </div>
  );
};

export default SkillManager;
