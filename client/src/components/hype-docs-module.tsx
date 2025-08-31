import { useState, useEffect } from "react";
import { getAchievements, saveAchievement, updateAchievement, deleteAchievement, getTodayDate } from "@/lib/storage";
import { Achievement, InsertAchievement } from "@/types";

export function HypeDocsModule() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [action, setAction] = useState("");
  const [context, setContext] = useState("");
  const [impact, setImpact] = useState("");

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    setAchievements(getAchievements());
  };

  const handleShowAddForm = () => {
    clearForm();
    setShowAddForm(true);
    setEditingId(null);
    setDate(getTodayDate());
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDate("");
    setAction("");
    setContext("");
    setImpact("");
  };

  const handleSaveAchievement = () => {
    if (!title || !action || !context || !impact) {
      alert('Please fill in all fields');
      return;
    }

    const achievementData: InsertAchievement = {
      title,
      date,
      action,
      context,
      impact,
    };

    if (editingId) {
      updateAchievement(editingId, achievementData);
    } else {
      saveAchievement(achievementData);
    }

    loadAchievements();
    handleCancelForm();
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setTitle(achievement.title);
    setDate(achievement.date);
    setAction(achievement.action);
    setContext(achievement.context);
    setImpact(achievement.impact);
    setEditingId(achievement.id);
    setShowAddForm(true);
  };

  const handleDeleteAchievement = (id: string) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      deleteAchievement(id);
      loadAchievements();
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: 'var(--spacing-lg)' }}>
        <h2>Hype Docs - Career Accomplishments</h2>
        <button 
          className="btn btn-primary" 
          onClick={handleShowAddForm}
          data-testid="button-add-achievement"
        >
          Add New Achievement
        </button>
      </div>

      {showAddForm && (
        <div style={{ marginBlockEnd: 'var(--spacing-xl)' }} data-testid="add-achievement-form">
          <h3>{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h3>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="achievement-title">Title</label>
              <input 
                type="text" 
                className="form-input" 
                id="achievement-title" 
                placeholder="Brief, descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-testid="input-achievement-title"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="achievement-date">Date</label>
              <input 
                type="date" 
                className="form-input" 
                id="achievement-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-testid="input-achievement-date"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="achievement-action">The What (Action)</label>
              <textarea 
                className="form-textarea" 
                id="achievement-action" 
                placeholder="Detailed description of the work performed..."
                value={action}
                onChange={(e) => setAction(e.target.value)}
                data-testid="textarea-achievement-action"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="achievement-context">The Why (Context)</label>
              <textarea 
                className="form-textarea" 
                id="achievement-context" 
                placeholder="Problem solved or business need addressed..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                data-testid="textarea-achievement-context"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="achievement-impact">The Result (Impact)</label>
            <textarea 
              className="form-textarea" 
              id="achievement-impact" 
              placeholder="Quantifiable outcomes, metrics, or results..."
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              data-testid="textarea-achievement-impact"
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button 
              className="btn btn-primary" 
              onClick={handleSaveAchievement}
              data-testid="button-save-achievement"
            >
              {editingId ? 'Update Achievement' : 'Save Achievement'}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleCancelForm}
              data-testid="button-cancel-achievement"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div data-testid="achievements-list">
        {achievements.length === 0 ? (
          <div className="empty-state">
            <h3>No achievements yet</h3>
            <p>Start building your career narrative by adding your first accomplishment!</p>
          </div>
        ) : (
          achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-item" data-testid={`achievement-item-${achievement.id}`}>
              <div className="achievement-header">
                <div>
                  <div className="achievement-date">{achievement.date}</div>
                  <div className="achievement-title">{achievement.title}</div>
                </div>
                <div className="achievement-actions">
                  <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={() => handleEditAchievement(achievement)}
                    data-testid={`button-edit-achievement-${achievement.id}`}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={() => handleDeleteAchievement(achievement.id)}
                    style={{ color: 'var(--color-error)' }}
                    data-testid={`button-delete-achievement-${achievement.id}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div style={{ marginBlockEnd: 'var(--spacing-sm)' }}>
                <strong>What:</strong> {achievement.action}
              </div>
              <div style={{ marginBlockEnd: 'var(--spacing-sm)' }}>
                <strong>Why:</strong> {achievement.context}
              </div>
              <div>
                <strong>Impact:</strong> {achievement.impact}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
