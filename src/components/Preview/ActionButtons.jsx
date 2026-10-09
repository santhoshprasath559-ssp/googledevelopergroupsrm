import React, { useState } from 'react';
import { Download, Copy, Check, FileCode, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadCanvasAsPNG, copyCanvasToClipboard, generateQRCodeSVG } from '../../utils/qrRenderer';

export const ActionButtons = ({
  payload,
  isValid,
  styles,
  onNotify
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isCopyingImage, setIsCopyingImage] = useState(false);
  const [copyImageSuccess, setCopyImageSuccess] = useState(false);
  const [copyPayloadSuccess, setCopyPayloadSuccess] = useState(false);
  const [exportScale, setExportScale] = useState(2); // 2x = 800px or high-res

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#38bdf8']
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleDownloadPNG = async () => {
    if (!isValid || !payload) {
      onNotify('Please resolve input errors before downloading.', 'error');
      return;
    }

    setIsDownloading(true);
    try {
      const filename = `qrcode-${Date.now()}.png`;
      const exported = await downloadCanvasAsPNG(
        {
          payload,
          fgColor: styles.fgColor,
          bgColor: styles.bgColor,
          correctionLevel: styles.correctionLevel,
          margin: styles.margin,
          size: styles.size,
          dotStyle: styles.dotStyle,
          eyeStyle: styles.eyeStyle,
          logo: styles.logo
        },
        filename,
        exportScale
      );

      if (!exported) {
        onNotify('Could not generate the PNG. Please try again.', 'error');
        return;
      }

      triggerConfetti();
      setDownloadSuccess(true);
      onNotify('QR Code downloaded successfully as PNG!', 'success');
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Download error:', err);
      onNotify('Failed to download image. Please try again.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSVG = () => {
    if (!isValid || !payload) {
      onNotify('Please resolve input errors before exporting.', 'error');
      return;
    }

    try {
      const svgString = generateQRCodeSVG({
        payload,
        fgColor: styles.fgColor,
        bgColor: styles.bgColor,
        correctionLevel: styles.correctionLevel,
        margin: styles.margin,
        size: styles.size,
        dotStyle: styles.dotStyle
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      triggerConfetti();
      onNotify('Vector SVG exported successfully!', 'success');
    } catch (err) {
      console.error('SVG export error:', err);
      onNotify('Failed to export SVG.', 'error');
    }
  };

  const handleCopyImage = async () => {
    if (!isValid || !payload) {
      onNotify('Please enter valid QR data first.', 'error');
      return;
    }

    setIsCopyingImage(true);
    try {
      await copyCanvasToClipboard({
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

      setCopyImageSuccess(true);
      onNotify('QR Code image copied directly to clipboard!', 'success');
      setTimeout(() => setCopyImageSuccess(false), 2500);
    } catch (err) {
      console.error('Clipboard copy error:', err);
      onNotify('Clipboard copy not supported by your browser.', 'warning');
    } finally {
      setIsCopyingImage(false);
    }
  };

  const handleCopyPayload = async () => {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopyPayloadSuccess(true);
      onNotify('Raw QR payload string copied!', 'success');
      setTimeout(() => setCopyPayloadSuccess(false), 2000);
    } catch {
      onNotify('Failed to copy text.', 'error');
    }
  };

  return (
    <div className="action-buttons-container">
      {/* Primary Download PNG Button */}
      <div className="download-primary-row">
        <button
          type="button"
          className={`btn btn-primary btn-lg flex-1 ${downloadSuccess ? 'btn-success' : ''}`}
          onClick={handleDownloadPNG}
          disabled={!isValid || isDownloading}
          aria-label="Download QR Code as PNG"
        >
          {isDownloading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Generating High-Res PNG...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check size={18} className="text-emerald-300" />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download PNG</span>
            </>
          )}
        </button>

        {/* Resolution Scale Selector */}
        <div className="scale-selector-box" title="Export Resolution Multiplier">
          <select
            value={exportScale}
            onChange={(e) => setExportScale(Number(e.target.value))}
            className="scale-select"
            aria-label="Export Resolution"
          >
            <option value={1}>1x (Standard)</option>
            <option value={2}>2x (High-Res)</option>
            <option value={4}>4x (Print Ready)</option>
          </select>
        </div>
      </div>

      {/* Secondary Actions (SVG & Clipboard) */}
      <div className="action-secondary-grid">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleDownloadSVG}
          disabled={!isValid}
          title="Download vector SVG format"
        >
          <FileCode size={15} />
          <span>Vector SVG</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleCopyImage}
          disabled={!isValid || isCopyingImage}
          title="Copy PNG image directly to clipboard"
        >
          {copyImageSuccess ? (
            <>
              <Check size={15} className="text-emerald-400" />
              <span>Copied Image</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>Copy Image</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleCopyPayload}
          disabled={!payload}
          title="Copy formatted QR payload string"
        >
          {copyPayloadSuccess ? (
            <>
              <Check size={15} className="text-emerald-400" />
              <span>Copied Text</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>Copy Raw</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
