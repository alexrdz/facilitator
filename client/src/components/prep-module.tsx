import { useState, useEffect } from "react";
import { getAchievements, savePrepAgenda, getTodayDate } from "@/lib/storage";
import { Achievement, InsertPrepAgenda } from "@/types";

export function PrepModule() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);
  const [helpNeeded, setHelpNeeded] = useState("");
  const [growthGoals, setGrowthGoals] = useState("");
  const [managerQuestions, setManagerQuestions] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showAgenda, setShowAgenda] = useState(false);

  useEffect(() => {
    setAchievements(getAchievements());
  }, []);

  const handleAchievementToggle = (achievementId: string) => {
    setSelectedAchievements(prev => 
      prev.includes(achievementId)
        ? prev.filter(id => id !== achievementId)
        : [...prev, achievementId]
    );
  };

  const generateAgenda = () => {
    const agendaData: InsertPrepAgenda = {
      date: getTodayDate(),
      selectedAchievements,
      helpNeeded: helpNeeded || undefined,
      growthGoals: growthGoals || undefined,
      managerQuestions: managerQuestions || undefined,
      additionalNotes: additionalNotes || undefined,
    };

    savePrepAgenda(agendaData);
    setShowAgenda(true);
    
    // Scroll to agenda view
    setTimeout(() => {
      document.getElementById('agenda-preview')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const clearForm = () => {
    setSelectedAchievements([]);
    setHelpNeeded("");
    setGrowthGoals("");
    setManagerQuestions("");
    setAdditionalNotes("");
    setShowAgenda(false);
  };

  const getSelectedAchievementData = () => {
    return achievements.filter(achievement => selectedAchievements.includes(achievement.id));
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div>
      <div className="card">
        <h2>1:1 Meeting Preparation</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBlockEnd: 'var(--spacing-xl)' }}>
          Prepare for your upcoming 1:1 by selecting accomplishments and adding discussion points.
        </p>

        <div className="prep-section">
          <h3>Select Accomplishments to Discuss</h3>
          <div className="accomplishment-selector" data-testid="accomplishment-selector">
            {achievements.length === 0 ? (
              <div className="empty-state">
                <p>No accomplishments added yet. Go to Hype Docs to add some!</p>
              </div>
            ) : (
              achievements.map((achievement) => (
                <div key={achievement.id} className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id={`achievement-${achievement.id}`}
                    checked={selectedAchievements.includes(achievement.id)}
                    onChange={() => handleAchievementToggle(achievement.id)}
                    data-testid={`checkbox-achievement-${achievement.id}`}
                  />
                  <label htmlFor={`achievement-${achievement.id}`}>
                    <strong>{achievement.title}</strong><br />
                    <small style={{ color: 'var(--color-text-secondary)' }}>{achievement.date}</small>
                  </label>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="help-needed">What I Need Help With</label>
            <textarea 
              className="form-textarea" 
              id="help-needed" 
              placeholder="Areas where you need guidance or support..."
              value={helpNeeded}
              onChange={(e) => setHelpNeeded(e.target.value)}
              data-testid="textarea-help-needed"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="growth-goals">My Learning/Growth Goals</label>
            <textarea 
              className="form-textarea" 
              id="growth-goals" 
              placeholder="Skills you want to develop or goals you're working toward..."
              value={growthGoals}
              onChange={(e) => setGrowthGoals(e.target.value)}
              data-testid="textarea-growth-goals"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="manager-questions">Questions for My Manager</label>
            <textarea 
              className="form-textarea" 
              id="manager-questions" 
              placeholder="Specific questions you want to ask..."
              value={managerQuestions}
              onChange={(e) => setManagerQuestions(e.target.value)}
              data-testid="textarea-manager-questions"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="additional-notes">Additional Discussion Points</label>
            <textarea 
              className="form-textarea" 
              id="additional-notes" 
              placeholder="Other topics you want to discuss..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              data-testid="textarea-additional-notes"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBlockStart: 'var(--spacing-xl)' }}>
          <button 
            className="btn btn-primary" 
            onClick={generateAgenda}
            data-testid="button-generate-agenda"
          >
            Generate Agenda
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={clearForm}
            data-testid="button-clear-form"
          >
            Clear Form
          </button>
        </div>
      </div>

      {showAgenda && (
        <div id="agenda-preview" className="print-view" data-testid="agenda-preview">
          <h2>1:1 Meeting Agenda - {today}</h2>
          
          {getSelectedAchievementData().length > 0 && (
            <>
              <h3>Recent Accomplishments</h3>
              {getSelectedAchievementData().map(achievement => (
                <div 
                  key={achievement.id}
                  style={{ 
                    marginBlockEnd: 'var(--spacing-lg)', 
                    paddingBlockEnd: 'var(--spacing-lg)', 
                    borderBlockEnd: '1px solid var(--color-border)' 
                  }}
                >
                  <h4>{achievement.title}</h4>
                  <p><strong>What:</strong> {achievement.action}</p>
                  <p><strong>Why:</strong> {achievement.context}</p>
                  <p><strong>Impact:</strong> {achievement.impact}</p>
                </div>
              ))}
            </>
          )}
          
          {helpNeeded && (
            <>
              <h3>What I Need Help With</h3>
              <p>{helpNeeded}</p>
            </>
          )}
          
          {growthGoals && (
            <>
              <h3>My Learning/Growth Goals</h3>
              <p>{growthGoals}</p>
            </>
          )}
          
          {managerQuestions && (
            <>
              <h3>Questions for My Manager</h3>
              <p>{managerQuestions}</p>
            </>
          )}
          
          {additionalNotes && (
            <>
              <h3>Additional Discussion Points</h3>
              <p>{additionalNotes}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
