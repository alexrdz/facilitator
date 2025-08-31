import { useState, useEffect } from "react";
import { getReflections, saveReflection, deleteReflection, getTodayDate } from "@/lib/storage";
import { Reflection, InsertReflection } from "@/types";
import { StarRating } from "./star-rating";

export function ReflectionModule() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(0);
  const [takeaways, setTakeaways] = useState("");
  const [feedback, setFeedback] = useState("");
  const [actionItems, setActionItems] = useState("");

  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = () => {
    setReflections(getReflections());
  };

  const handleShowReflectionForm = () => {
    clearForm();
    setShowAddForm(true);
    setDate(getTodayDate());
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    clearForm();
  };

  const clearForm = () => {
    setDate("");
    setRating(0);
    setTakeaways("");
    setFeedback("");
    setActionItems("");
  };

  const handleSaveReflection = () => {
    if (!takeaways || rating === 0) {
      alert('Please provide a rating and key takeaways');
      return;
    }

    const reflectionData: InsertReflection = {
      date,
      rating,
      takeaways,
      feedback: feedback || undefined,
      actionItems: actionItems || undefined,
    };

    saveReflection(reflectionData);
    loadReflections();
    handleCancelForm();
  };

  const handleDeleteReflection = (id: string) => {
    if (confirm('Are you sure you want to delete this reflection?')) {
      deleteReflection(id);
      loadReflections();
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: 'var(--spacing-lg)' }}>
        <h2>Meeting Reflections</h2>
        <button 
          className="btn btn-primary" 
          onClick={handleShowReflectionForm}
          data-testid="button-add-reflection"
        >
          Add New Reflection
        </button>
      </div>

      {showAddForm && (
        <div style={{ marginBlockEnd: 'var(--spacing-xl)' }} data-testid="add-reflection-form">
          <h3>New Meeting Reflection</h3>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="reflection-date">Meeting Date</label>
              <input 
                type="date" 
                className="form-input" 
                id="reflection-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-testid="input-reflection-date"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Meeting Rating</label>
              <StarRating 
                rating={rating}
                onRatingChange={setRating}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="key-takeaways">Key Takeaways</label>
            <textarea 
              className="form-textarea" 
              id="key-takeaways" 
              placeholder="Main points and decisions from the meeting..."
              value={takeaways}
              onChange={(e) => setTakeaways(e.target.value)}
              data-testid="textarea-key-takeaways"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="manager-feedback">Manager Feedback</label>
            <textarea 
              className="form-textarea" 
              id="manager-feedback" 
              placeholder="Feedback received from your manager..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              data-testid="textarea-manager-feedback"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="action-items">Action Items</label>
            <textarea 
              className="form-textarea" 
              id="action-items" 
              placeholder="Follow-up tasks and commitments..."
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              data-testid="textarea-action-items"
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button 
              className="btn btn-primary" 
              onClick={handleSaveReflection}
              data-testid="button-save-reflection"
            >
              Save Reflection
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleCancelForm}
              data-testid="button-cancel-reflection"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div data-testid="reflections-list">
        {reflections.length === 0 ? (
          <div className="empty-state">
            <h3>No reflections yet</h3>
            <p>Start tracking your 1:1 meetings by adding your first reflection!</p>
          </div>
        ) : (
          reflections.map((reflection) => (
            <div key={reflection.id} className="achievement-item" data-testid={`reflection-item-${reflection.id}`}>
              <div className="achievement-header">
                <div>
                  <div className="achievement-date">{reflection.date}</div>
                  <div className="achievement-title">
                    Meeting Rating: {'★'.repeat(reflection.rating)}{'☆'.repeat(5 - reflection.rating)}
                  </div>
                </div>
                <div className="achievement-actions">
                  <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={() => handleDeleteReflection(reflection.id)}
                    style={{ color: 'var(--color-error)' }}
                    data-testid={`button-delete-reflection-${reflection.id}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div style={{ marginBlockEnd: 'var(--spacing-sm)' }}>
                <strong>Key Takeaways:</strong> {reflection.takeaways}
              </div>
              {reflection.feedback && (
                <div style={{ marginBlockEnd: 'var(--spacing-sm)' }}>
                  <strong>Manager Feedback:</strong> {reflection.feedback}
                </div>
              )}
              {reflection.actionItems && (
                <div>
                  <strong>Action Items:</strong> {reflection.actionItems}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
