import React, { useRef } from 'react';
import { ImagePlus, Trash2, ShieldAlert } from 'lucide-react';

export const LogoControls = ({ logo, onChangeLogo, correctionLevel, onBoostCorrection }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChangeLogo({
        type: 'image',
        value: event.target.result,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    onChangeLogo(null);
  };

  const isLowCorrection = logo && (correctionLevel === 'L' || correctionLevel === 'M');

  return (
    <div className="customizer-section">
      <div className="section-label-row">
        <label className="section-label flex-row items-center gap-1.5">
          <ImagePlus size={16} className="text-pink-400" />
          <span>Center Logo / Badge</span>
        </label>
        <span className="section-hint">Embed GDG brand or custom icon</span>
      </div>

      <div className="logo-options-grid">
        {/* None Option */}
        <button
          type="button"
          className={`logo-option-card ${!logo ? 'active' : ''}`}
          onClick={handleClear}
        >
          <span className="logo-card-title">None</span>
          <span className="logo-card-desc">Standard clean QR</span>
        </button>

        {/* GDG SRM Option */}
        <button
          type="button"
          className={`logo-option-card ${logo?.type === 'gdg' ? 'active' : ''}`}
          onClick={() => onChangeLogo({ type: 'gdg', value: 'gdg', name: 'GDG Emblem' })}
        >
          <div className="gdg-mini-icon-row">
            <span className="google-dot dot-blue"></span>
            <span className="google-dot dot-red"></span>
            <span className="google-dot dot-yellow"></span>
            <span className="google-dot dot-green"></span>
          </div>
          <span className="logo-card-title">GDG Brand</span>
          <span className="logo-card-desc">Official emblem</span>
        </button>

        {/* Custom Upload Option */}
        <div className={`logo-upload-box ${logo?.type === 'image' ? 'active' : ''}`}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
            className="hidden-file-input"
            id="custom-logo-upload"
            onChange={handleFileUpload}
          />
          <label htmlFor="custom-logo-upload" className="upload-label">
            <ImagePlus size={18} className="text-slate-400" />
            <span className="upload-label-text">
              {logo?.type === 'image' ? 'Replace Logo' : 'Upload Image'}
            </span>
          </label>
          {logo?.type === 'image' && (
            <button
              type="button"
              className="remove-logo-btn"
              onClick={handleClear}
              title="Remove uploaded logo"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Warning banner if error correction is low while logo is active */}
      {isLowCorrection && (
        <div className="warning-banner-box">
          <ShieldAlert size={16} className="text-amber-400 flex-shrink-0" />
          <div className="warning-text-content">
            <p>
              Logos obstruct center QR modules. Recommended Error Correction is <strong>Quartile (Q)</strong> or <strong>High (H)</strong>.
            </p>
            <button
              type="button"
              className="btn btn-xs btn-amber"
              onClick={onBoostCorrection}
            >
              Auto-Boost to High (H)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
