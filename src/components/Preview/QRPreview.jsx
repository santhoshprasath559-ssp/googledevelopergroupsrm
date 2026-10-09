import React, { useRef, useEffect, useState } from 'react';
import { renderQRCodeToCanvas } from '../../utils/qrRenderer';
import { ReliabilityBadge } from './ReliabilityBadge';
import { Maximize2, Minimize2, AlertCircle } from 'lucide-react';

export const QRPreview = ({
  payload,
  isValid,
  errors,
  styles,
  reliability
}) => {
  const canvasRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isValid || !payload || !canvasRef.current) return;

    renderQRCodeToCanvas(canvasRef.current, {
      payload,
      fgColor: styles.fgColor,
      bgColor: styles.bgColor,
      correctionLevel: styles.correctionLevel,
      margin: styles.margin,
      size: styles.size,
      dotStyle: styles.dotStyle,
      eyeStyle: styles.eyeStyle,
      logo: styles.logo
    });
  }, [payload, isValid, styles]);

  return (
    <div className={`preview-panel ${isFullscreen ? 'fullscreen-preview-mode' : ''}`}>
      <div className="preview-card">
        <div className="preview-header-bar">
          <div className="preview-title-row">
            <span className="live-dot" />
            <h2 className="preview-heading">Live QR Preview</h2>
          </div>

          <div className="preview-actions-bar">
            <button
              type="button"
              className="icon-action-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit full screen' : 'Expand preview'}
              aria-label={isFullscreen ? 'Exit full screen' : 'Expand preview'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* Canvas Display Viewport */}
        <div className="preview-viewport-wrapper">
          <div
            className="canvas-container-box"
            style={{
              backgroundColor: styles.bgColor,
              boxShadow: `0 20px 45px -15px ${styles.fgColor}22, 0 0 1px 1px rgba(255,255,255,0.1)`
            }}
          >
            <canvas
              ref={canvasRef}
              className="qr-canvas-element"
              style={{
                width: '100%',
                maxWidth: `${Math.min(styles.size, 380)}px`,
                aspectRatio: '1 / 1'
              }}
            />

            {!isValid && (
              <div className="preview-overlay-fallback">
                <AlertCircle size={36} className="text-amber-400 mb-2" />
                <p className="fallback-title">Valid Input Required</p>
                <p className="fallback-subtitle">
                  {Object.values(errors || {})[0] || 'Complete the input fields above to render your live QR code.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scan Reliability Diagnostics */}
        <div className="preview-footer-section">
          <ReliabilityBadge reliability={reliability} />
        </div>
      </div>
    </div>
  );
};
