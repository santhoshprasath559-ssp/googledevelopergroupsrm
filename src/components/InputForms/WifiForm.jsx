import React, { useState } from 'react';
import { Wifi, KeyRound, Eye, EyeOff } from 'lucide-react';

export const WifiForm = ({ data, onChange, error, warning }) => {
  const ssid = data.ssid || '';
  const password = data.password || '';
  const encryption = data.encryption || 'WPA';
  const hidden = Boolean(data.hidden);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group-stack">
      {/* SSID Network Name */}
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="wifi-ssid" className="form-label">
            Network Name (SSID) <span className="text-rose-500">*</span>
          </label>
        </div>

        <div className={`input-container ${error?.ssid ? 'has-error' : ''}`}>
          <div className="input-icon-prefix">
            <Wifi size={18} className="text-slate-400" />
          </div>
          <input
            id="wifi-ssid"
            type="text"
            className="text-input with-prefix"
            placeholder="e.g., Campus_Guest_WiFi or Home_5GHz"
            value={ssid}
            onChange={(e) => onChange({ ...data, ssid: e.target.value })}
            autoComplete="off"
          />
        </div>
        {error?.ssid && <p className="field-error-message">{error.ssid}</p>}
      </div>

      {/* Encryption Selector */}
      <div className="input-field-wrapper">
        <div className="input-label-row">
          <label htmlFor="wifi-encryption" className="form-label">
            Network Security / Encryption
          </label>
        </div>

        <div className="grid-3-cols">
          {[
            { id: 'WPA', label: 'WPA / WPA2 / WPA3', sub: 'Standard' },
            { id: 'WEP', label: 'WEP', sub: 'Legacy' },
            { id: 'nopass', label: 'Open (No Password)', sub: 'Unsecured' }
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              className={`option-card-btn ${encryption === type.id ? 'active' : ''}`}
              onClick={() => onChange({ ...data, encryption: type.id })}
            >
              <div className="option-title">{type.label}</div>
              <div className="option-subtitle">{type.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Password Field (Only if not nopass) */}
      {encryption !== 'nopass' && (
        <div className="input-field-wrapper">
          <div className="input-label-row">
            <label htmlFor="wifi-password" className="form-label">
              Wi-Fi Password <span className="text-rose-500">*</span>
            </label>
            <span className="input-helper-text">
              {encryption === 'WPA' ? 'Min 8 characters' : 'WEP Key'}
            </span>
          </div>

          <div className={`input-container ${error?.password ? 'has-error' : ''}`}>
            <div className="input-icon-prefix">
              <KeyRound size={18} className="text-slate-400" />
            </div>
            <input
              id="wifi-password"
              type={showPassword ? 'text' : 'password'}
              className="text-input with-prefix with-suffix"
              placeholder="Enter Wi-Fi password"
              value={password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              autoComplete="off"
            />
            <button
              type="button"
              className="suffix-icon-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error?.password && <p className="field-error-message">{error.password}</p>}
        </div>
      )}

      {/* Hidden SSID Checkbox */}
      <div className="checkbox-field-wrapper">
        <label className="custom-checkbox-label">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={hidden}
            onChange={(e) => onChange({ ...data, hidden: e.target.checked })}
          />
          <span className="checkbox-custom-box"></span>
          <span className="checkbox-text">
            Hidden Network (SSID is not broadcasted publicly)
          </span>
        </label>
      </div>

      {warning && <p className="field-warning-message">{warning}</p>}
    </div>
  );
};
