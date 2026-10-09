import React from 'react';
import { UrlForm } from './UrlForm';
import { TextForm } from './TextForm';
import { EmailForm } from './EmailForm';
import { PhoneForm } from './PhoneForm';
import { WifiForm } from './WifiForm';

export const DynamicInputForm = ({ type, data, onChange, errors, warnings }) => {
  const commonProps = {
    data,
    onChange,
    error: errors?.[type] || errors,
    warning: warnings?.[0]
  };

  return (
    <div className="dynamic-form-panel">
      <div className="section-label-row">
        <label className="section-label">2. Enter Content</label>
        <span className="section-hint">Updates preview in real-time</span>
      </div>

      <div className="form-card">
        {type === 'url' && <UrlForm {...commonProps} error={errors?.url} />}
        {type === 'text' && <TextForm {...commonProps} error={errors?.text} />}
        {type === 'email' && <EmailForm {...commonProps} error={errors} />}
        {type === 'phone' && <PhoneForm {...commonProps} error={errors?.phone} />}
        {type === 'wifi' && <WifiForm {...commonProps} error={errors} />}
      </div>
    </div>
  );
};
