import React from 'react';
import { Phone, X } from 'lucide-react';

export const PhoneForm = ({ data, onChange, error, warning }) => {
  const phone = data.phone || '';

  const countryCodes = [
    { code: '+91', name: 'IN' },
    { code: '+1', name: 'US/CA' },
    { code: '+44', name: 'UK' },
    { code: '+49', name: 'DE' },
    { code: '+81', name: 'JP' },
    { code: '+61', name: 'AU' }
  ];

  const handlePrefixClick = (code) => {
    if (!phone.startsWith('+')) {
      onChange({ ...data, phone: `${code} ${phone}` });
    }
  };

  return (
    <div className="form-group-stack">
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="phone-input" className="form-label">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <span className="input-helper-text">Triggers dialer when scanned</span>
        </div>

        <div className={`input-container ${error ? 'has-error' : ''}`}>
          <div className="input-icon-prefix">
            <Phone size={18} className="text-slate-400" />
          </div>
          <input
            id="phone-input"
            type="tel"
            className="text-input with-prefix"
            placeholder="+91 98765 43210 or +1 (555) 019-2834"
            value={phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            autoComplete="tel"
          />
          {phone && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => onChange({ ...data, phone: '' })}
              title="Clear phone number"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {error && <p className="field-error-message">{error}</p>}
        {warning && <p className="field-warning-message">{warning}</p>}
      </div>

      <div className="quick-suggestions-row">
        <span className="suggestion-label">Country Code Helpers:</span>
        {countryCodes.map((item) => (
          <button
            key={item.code}
            type="button"
            className="chip-btn"
            onClick={() => handlePrefixClick(item.code)}
          >
            {item.code} ({item.name})
          </button>
        ))}
      </div>
    </div>
  );
};
