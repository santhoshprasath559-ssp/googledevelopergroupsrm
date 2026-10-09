import React from 'react';

export const TextForm = ({ data, onChange, error, warning }) => {
  const text = data.text || '';
  const charCount = text.length;

  return (
    <div className="form-group-stack">
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="text-input" className="form-label">
            Plain Text / Message <span className="text-rose-500">*</span>
          </label>
          <span className="input-counter-text">
            {charCount} character{charCount !== 1 ? 's' : ''}
          </span>
        </div>

        <div className={`textarea-container ${error ? 'has-error' : ''}`}>
          <textarea
            id="text-input"
            rows={4}
            className="textarea-input"
            placeholder="Type or paste plain text, event notes, access tokens, instructions, or quotes..."
            value={text}
            onChange={(e) => onChange({ ...data, text: e.target.value })}
            spellCheck="true"
          />
        </div>

        {error && <p className="field-error-message">{error}</p>}
        {warning && <p className="field-warning-message">{warning}</p>}
      </div>

      <div className="quick-suggestions-row">
        <span className="suggestion-label">Templates:</span>
        <button
          type="button"
          className="chip-btn"
          onClick={() => onChange({ text: 'Welcome to GDG on Campus SRM Tech Recruitment 2026!' })}
        >
          GDG Greeting
        </button>
        <button
          type="button"
          className="chip-btn"
          onClick={() => onChange({ text: 'WiFi Key: SRM-Guest-9921 | Location: Hall 4' })}
        >
          Event Note
        </button>
      </div>
    </div>
  );
};
