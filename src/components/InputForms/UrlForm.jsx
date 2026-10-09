import React from 'react';
import { Globe, X } from 'lucide-react';

export const UrlForm = ({ data, onChange, error, warning }) => {
  const url = data.url || '';

  const handleExample = (sampleUrl) => {
    onChange({ ...data, url: sampleUrl });
  };

  return (
    <div className="form-group-stack">
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="url-input" className="form-label">
            Target Website URL <span className="text-rose-500">*</span>
          </label>
          <span className="input-helper-text">Direct scanner to a webpage or portfolio</span>
        </div>

        <div className={`input-container ${error ? 'has-error' : ''}`}>
          <div className="input-icon-prefix">
            <Globe size={18} className="text-slate-400" />
          </div>
          <input
            id="url-input"
            type="text"
            className="text-input with-prefix"
            placeholder="https://example.com or gdg.community.dev"
            value={url}
            onChange={(e) => onChange({ ...data, url: e.target.value })}
            autoComplete="off"
            spellCheck="false"
          />
          {url && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => onChange({ ...data, url: '' })}
              title="Clear URL"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {error && <p className="field-error-message">{error}</p>}
        {warning && <p className="field-warning-message">{warning}</p>}
      </div>

      <div className="quick-suggestions-row">
        <span className="suggestion-label">Quick Suggestions:</span>
        <button
          type="button"
          className="chip-btn"
          onClick={() => handleExample('https://gdg.community.dev/srm-institute-of-science-and-technology/')}
        >
          GDG on Campus SRM
        </button>
        <button
          type="button"
          className="chip-btn"
          onClick={() => handleExample('https://github.com')}
        >
          GitHub
        </button>
        <button
          type="button"
          className="chip-btn"
          onClick={() => handleExample('https://linkedin.com')}
        >
          LinkedIn
        </button>
      </div>
    </div>
  );
};
