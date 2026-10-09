import React from 'react';
import { Palette, ArrowLeftRight } from 'lucide-react';

const QUICK_SWATCHES = [
  '#000000', '#ffffff', '#1a73e8', '#ea4335',
  '#34a853', '#fbbc05', '#6366f1', '#0f172a',
  '#0284c7', '#ec4899', '#14b8a6', '#f97316'
];

export const ColorPicker = ({ fgColor, bgColor, onChangeFg, onChangeBg, onSwapColors }) => {
  return (
    <div className="customizer-section">
      <div className="section-label-row">
        <label className="section-label flex-row items-center gap-1.5">
          <Palette size={16} className="text-sky-400" />
          <span>Colors &amp; Contrast</span>
        </label>
        <span className="section-hint">Real-time palette tuning</span>
      </div>

      <div className="colors-grid">
        {/* Foreground Color Card */}
        <div className="color-control-card">
          <div className="color-header">
            <span className="color-title">Foreground (Pattern)</span>
            <span className="color-hex-tag">{fgColor.toUpperCase()}</span>
          </div>

          <div className="color-input-row">
            <div className="color-swatch-wrapper">
              <input
                type="color"
                className="native-color-picker"
                value={fgColor}
                onChange={(e) => onChangeFg(e.target.value)}
                aria-label="Foreground color"
              />
              <div className="swatch-preview" style={{ backgroundColor: fgColor }} />
            </div>

            <input
              type="text"
              className="text-input hex-input"
              value={fgColor}
              onChange={(e) => onChangeFg(e.target.value)}
              placeholder="#000000"
              maxLength={7}
            />
          </div>

          <div className="quick-palette">
            {QUICK_SWATCHES.slice(0, 6).map((color) => (
              <button
                key={`fg-${color}`}
                type="button"
                className="mini-swatch"
                style={{ backgroundColor: color }}
                onClick={() => onChangeFg(color)}
                title={`Set foreground to ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Swap Colors Action */}
        <div className="swap-button-container">
          <button
            type="button"
            className="swap-btn"
            onClick={onSwapColors}
            title="Invert / Swap Foreground and Background colors"
            aria-label="Swap colors"
          >
            <ArrowLeftRight size={16} />
          </button>
        </div>

        {/* Background Color Card */}
        <div className="color-control-card">
          <div className="color-header">
            <span className="color-title">Background (Base)</span>
            <span className="color-hex-tag">{bgColor.toUpperCase()}</span>
          </div>

          <div className="color-input-row">
            <div className="color-swatch-wrapper">
              <input
                type="color"
                className="native-color-picker"
                value={bgColor}
                onChange={(e) => onChangeBg(e.target.value)}
                aria-label="Background color"
              />
              <div className="swatch-preview" style={{ backgroundColor: bgColor }} />
            </div>

            <input
              type="text"
              className="text-input hex-input"
              value={bgColor}
              onChange={(e) => onChangeBg(e.target.value)}
              placeholder="#ffffff"
              maxLength={7}
            />
          </div>

          <div className="quick-palette">
            {QUICK_SWATCHES.slice(6, 12).map((color) => (
              <button
                key={`bg-${color}`}
                type="button"
                className="mini-swatch"
                style={{ backgroundColor: color }}
                onClick={() => onChangeBg(color)}
                title={`Set background to ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
