import React from 'react';
import { Mail, FileText } from 'lucide-react';

export const EmailForm = ({ data, onChange, error }) => {
  const email = data.email || '';
  const subject = data.subject || '';
  const body = data.body || '';

  return (
    <div className="form-group-stack">
      {/* Recipient Field */}
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="email-recipient" className="form-label">
            Recipient Email Address <span className="text-rose-500">*</span>
          </label>
        </div>

        <div className={`input-container ${error?.email ? 'has-error' : ''}`}>
          <div className="input-icon-prefix">
            <Mail size={18} className="text-slate-400" />
          </div>
          <input
            id="email-recipient"
            type="email"
            className="text-input with-prefix"
            placeholder="contact@gdgsrm.org or recruiter@tech.com"
            value={email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            autoComplete="email"
          />
        </div>
        {error?.email && <p className="field-error-message">{error.email}</p>}
      </div>

      {/* Subject Field */}
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="email-subject" className="form-label">
            Email Subject <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
        </div>

        <div className="input-container">
          <div className="input-icon-prefix">
            <FileText size={18} className="text-slate-400" />
          </div>
          <input
            id="email-subject"
            type="text"
            className="text-input with-prefix"
            placeholder="e.g., Application for GDG Technical Team"
            value={subject}
            onChange={(e) => onChange({ ...data, subject: e.target.value })}
          />
        </div>
      </div>

      {/* Body Field */}
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="email-body" className="form-label">
            Email Body Message <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
        </div>

        <div className="textarea-container">
          <textarea
            id="email-body"
            rows={3}
            className="textarea-input"
            placeholder="Pre-fill standard message or instructions for the sender..."
            value={body}
            onChange={(e) => onChange({ ...data, body: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
