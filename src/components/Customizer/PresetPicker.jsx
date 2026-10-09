import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { PRESETS } from '../../constants/presets';

export const PresetPicker = ({ currentStyles, onSelectPreset }) => {
  return (
    <div className="customizer-section">
      <div className="section-label-row">
        <label className="section-label flex-row items-center gap-1.5">
          <Sparkles size={16} className="text-amber-400" />
          <span>Design Presets</span>
        </label>
        <span className="section-hint">Instant high-aesthetic themes</span>
      </div>

      <div className="preset-grid">
        {PRESETS.map((preset) => {
          const isSelected =
            currentStyles.fgColor.toLowerCase() === preset.fgColor.toLowerCase() &&
            currentStyles.bgColor.toLowerCase() === preset.bgColor.toLowerCase() &&
            currentStyles.dotStyle === preset.dotStyle;

          return (
            <button
              key={preset.id}
              type="button"
              className={`preset-card ${isSelected ? 'active-preset' : ''}`}
              onClick={() => onSelectPreset(preset)}
              title={`${preset.name}: ${preset.description}`}
            >
              {/* Preset Visual Mini-Swatch */}
              <div
                className="preset-swatch-box"
                style={{ backgroundColor: preset.bgColor }}
              >
                <div
                  className="preset-swatch-core"
                  style={{ backgroundColor: preset.fgColor }}
                />
                {preset.tag && <span className="preset-tag-pill">{preset.tag}</span>}
              </div>

              <div className="preset-info">
                <div className="preset-name">{preset.name}</div>
                <div className="preset-desc">{preset.description}</div>
              </div>

              {isSelected && (
                <div className="preset-check-badge">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
