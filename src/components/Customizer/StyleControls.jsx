import React from 'react';
import { Sliders, Shield, LayoutGrid, Eye } from 'lucide-react';
import { CORRECTION_LEVELS, DOT_STYLES, EYE_STYLES } from '../../constants/presets';

export const StyleControls = ({
  size,
  margin,
  correctionLevel,
  dotStyle,
  eyeStyle,
  onChangeSize,
  onChangeMargin,
  onChangeCorrectionLevel,
  onChangeDotStyle,
  onChangeEyeStyle
}) => {
  return (
    <div className="customizer-section">
      <div className="section-label-row">
        <label className="section-label flex-row items-center gap-1.5">
          <Sliders size={16} className="text-purple-400" />
          <span>Geometry &amp; Redundancy</span>
        </label>
        <span className="section-hint">Shapes, size, and error resilience</span>
      </div>

      <div className="controls-stack">
        {/* Error Correction Level */}
        <div className="control-group">
          <div className="control-header-row">
            <div className="control-title-with-icon">
              <Shield size={15} className="text-indigo-400" />
              <span className="control-title">Error Correction Level</span>
            </div>
            <span className="control-badge-value">
              {CORRECTION_LEVELS.find((l) => l.value === correctionLevel)?.label}
            </span>
          </div>

          <div className="grid-4-cols">
            {CORRECTION_LEVELS.map((lvl) => (
              <button
                key={lvl.value}
                type="button"
                className={`choice-card-btn ${correctionLevel === lvl.value ? 'active' : ''}`}
                onClick={() => onChangeCorrectionLevel(lvl.value)}
                title={lvl.desc}
              >
                <span className="choice-letter">{lvl.value}</span>
                <span className="choice-label">{lvl.label.split(' ')[0]}</span>
                <span className="choice-sub">{lvl.label.match(/\((.*?)\)/)?.[1] || ''}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dot Style & Eye Style */}
        <div className="grid-2-cols">
          {/* Module Pattern Shape */}
          <div className="control-group">
            <div className="control-header-row">
              <div className="control-title-with-icon">
                <LayoutGrid size={15} className="text-cyan-400" />
                <span className="control-title">Module Style</span>
              </div>
            </div>

            <div className="select-pill-group">
              {DOT_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  className={`pill-btn ${dotStyle === style.value ? 'active' : ''}`}
                  onClick={() => onChangeDotStyle(style.value)}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eye Corner Shape */}
          <div className="control-group">
            <div className="control-header-row">
              <div className="control-title-with-icon">
                <Eye size={15} className="text-emerald-400" />
                <span className="control-title">Corner Eyes</span>
              </div>
            </div>

            <div className="select-pill-group">
              {EYE_STYLES.map((eye) => (
                <button
                  key={eye.value}
                  type="button"
                  className={`pill-btn ${eyeStyle === eye.value ? 'active' : ''}`}
                  onClick={() => onChangeEyeStyle(eye.value)}
                >
                  {eye.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Controls (Size & Margin) */}
        <div className="grid-2-cols">
          {/* Size Slider */}
          <div className="slider-card">
            <div className="slider-header">
              <span className="slider-label">Canvas Dimension</span>
              <span className="slider-value-pill">{size} × {size} px</span>
            </div>
            <input
              type="range"
              min="240"
              max="600"
              step="20"
              value={size}
              onChange={(e) => onChangeSize(Number(e.target.value))}
              className="range-slider"
            />
            <div className="slider-ticks">
              <span>240px</span>
              <span>400px</span>
              <span>600px</span>
            </div>
          </div>

          {/* Margin Slider */}
          <div className="slider-card">
            <div className="slider-header">
              <span className="slider-label">Margin (Quiet Zone)</span>
              <span className="slider-value-pill">{margin} {margin === 1 ? 'block' : 'blocks'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={margin}
              onChange={(e) => onChangeMargin(Number(e.target.value))}
              className="range-slider"
            />
            <div className="slider-ticks">
              <span>0 (None)</span>
              <span>2 (Standard)</span>
              <span>4 (Wide)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
