import React, { useState } from 'react';
import { QR_TYPES } from './constants/presets';
import { useQRCode } from './hooks/useQRCode';
import { Header } from './components/Header';
import { TypeSelector } from './components/TypeSelector';
import { DynamicInputForm } from './components/InputForms';
import { PresetPicker } from './components/Customizer/PresetPicker';
import { ColorPicker } from './components/Customizer/ColorPicker';
import { StyleControls } from './components/Customizer/StyleControls';
import { LogoControls } from './components/Customizer/LogoControls';
import { QRPreview } from './components/Preview/QRPreview';
import { ActionButtons } from './components/Preview/ActionButtons';
import { RecentList } from './components/History/RecentList';
import { Toast } from './components/UI/Toast';
import './App.css';

export function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const {
    selectedType,
    setSelectedType,
    activeData,
    updateFormData,
    styles,
    setStyles,
    payload,
    validation,
    reliability,
    history,
    applyPreset,
    swapColors,
    resetToDefaults,
    restoreHistoryItem,
    deleteHistoryItem,
    clearHistory,
    boostCorrectionToHigh
  } = useQRCode(showToast);

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header onReset={resetToDefaults} hasChanges={true} />

      {/* Main Studio 2-Column Responsive Workspace */}
      <main className="studio-grid">
        {/* Left Column: Input Forms & Customization Controls */}
        <div className="controls-column">
          {/* 1. Type Selector */}
          <TypeSelector
            selectedType={selectedType}
            onSelectType={setSelectedType}
            types={QR_TYPES}
          />

          {/* 2. Dynamic Input Fields */}
          <DynamicInputForm
            type={selectedType}
            data={activeData}
            onChange={updateFormData}
            errors={validation.errors}
            warnings={validation.warnings}
          />

          {/* 3. Customization Panel */}
          <div className="customization-master-card">
            <div className="section-label-row">
              <label className="section-label">3. Customize &amp; Style</label>
              <span className="section-hint">Instant live updates</span>
            </div>

            {/* Presets */}
            <PresetPicker
              currentStyles={styles}
              onSelectPreset={applyPreset}
            />

            {/* Foreground & Background Colors */}
            <ColorPicker
              fgColor={styles.fgColor}
              bgColor={styles.bgColor}
              onChangeFg={(fg) => setStyles((prev) => ({ ...prev, fgColor: fg }))}
              onChangeBg={(bg) => setStyles((prev) => ({ ...prev, bgColor: bg }))}
              onSwapColors={swapColors}
            />

            {/* Geometry, Module Shapes & Error Correction */}
            <StyleControls
              size={styles.size}
              margin={styles.margin}
              correctionLevel={styles.correctionLevel}
              dotStyle={styles.dotStyle}
              eyeStyle={styles.eyeStyle}
              onChangeSize={(size) => setStyles((prev) => ({ ...prev, size }))}
              onChangeMargin={(margin) => setStyles((prev) => ({ ...prev, margin }))}
              onChangeCorrectionLevel={(correctionLevel) =>
                setStyles((prev) => ({ ...prev, correctionLevel }))
              }
              onChangeDotStyle={(dotStyle) => setStyles((prev) => ({ ...prev, dotStyle }))}
              onChangeEyeStyle={(eyeStyle) => setStyles((prev) => ({ ...prev, eyeStyle }))}
            />

            {/* Logo / Badge Embedding */}
            <LogoControls
              logo={styles.logo}
              onChangeLogo={(logo) => setStyles((prev) => ({ ...prev, logo }))}
              correctionLevel={styles.correctionLevel}
              onBoostCorrection={boostCorrectionToHigh}
            />
          </div>
        </div>

        {/* Right Column: Live Sticky Preview & Export Actions */}
        <div className="preview-column">
          <QRPreview
            payload={payload}
            isValid={validation.isValid}
            errors={validation.errors}
            styles={styles}
            reliability={reliability}
          />

          <div style={{ marginTop: '1.25rem' }}>
            <ActionButtons
              payload={payload}
              isValid={validation.isValid}
              styles={styles}
              onNotify={showToast}
            />
          </div>
        </div>
      </main>

      {/* Recent QR Codes Section (localStorage persistence) */}
      <footer className="history-section-wrapper">
        <RecentList
          history={history}
          onRestoreItem={restoreHistoryItem}
          onDeleteItem={deleteHistoryItem}
          onClearHistory={clearHistory}
        />
      </footer>

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
