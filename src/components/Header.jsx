import React from 'react';
import { QrCode, RefreshCw, ShieldCheck } from 'lucide-react';

export const Header = ({ onReset, hasChanges }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-badge-row">
          <div className="gdg-pill">
            <span className="google-dot dot-blue"></span>
            <span className="google-dot dot-red"></span>
            <span className="google-dot dot-yellow"></span>
            <span className="google-dot dot-green"></span>
            <span className="gdg-text">GDG on Campus SRM • Task 1</span>
          </div>

          <div className="privacy-badge">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>100% Client-Side • Privacy First</span>
          </div>
        </div>

        <div className="header-main">
          <div className="title-group">
            <div className="logo-icon-box">
              <QrCode className="logo-icon" size={28} />
            </div>
            <div>
              <h1 className="app-title">
                QR Code Studio <span className="title-accent">&amp; Designer</span>
              </h1>
              <p className="app-subtitle">
                Craft professional, high-reliability, and visually stunning QR codes in real time.
              </p>
            </div>
          </div>

          <div className="header-actions">
            {hasChanges && (
              <button
                type="button"
                onClick={onReset}
                className="btn btn-ghost btn-sm text-slate-400 hover:text-white"
                title="Reset all fields and styles to default"
              >
                <RefreshCw size={15} />
                <span>Reset Defaults</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
