/**
 * Color utility and QR Scan Reliability Checker
 */

// Helper to convert hex (3, 6 or 8 digits) to RGB
export const hexToRgb = (hex = '#000000') => {
  let clean = hex.replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean.slice(0, 6), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

// Calculate WCAG relative luminance
export const getLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio between two hex colors: (L1 + 0.05) / (L2 + 0.05)
export const getContrastRatio = (hex1, hex2) => {
  try {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const brighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (brighter + 0.05) / (darker + 0.05);
  } catch {
    return 1;
  }
};

/**
 * Evaluates scan reliability given foreground color, background color,
 * error correction level, logo presence, and quiet zone margin.
 */
export const checkScanReliability = ({
  fgColor = '#000000',
  bgColor = '#ffffff',
  correctionLevel = 'M',
  hasLogo = false,
  margin = 2
}) => {
  const ratio = getContrastRatio(fgColor, bgColor);
  const rgbFg = hexToRgb(fgColor);
  const rgbBg = hexToRgb(bgColor);
  const lumFg = getLuminance(rgbFg.r, rgbFg.g, rgbFg.b);
  const lumBg = getLuminance(rgbBg.r, rgbBg.g, rgbBg.b);

  const isInverted = lumFg > lumBg; // Light foreground on dark background
  const issues = [];
  const tips = [];

  let score = 100;
  let status = 'excellent'; // 'excellent' | 'good' | 'warning' | 'critical'

  // Contrast check
  if (ratio < 2.5) {
    score -= 60;
    status = 'critical';
    issues.push({
      type: 'contrast-critical',
      title: 'Very Low Contrast',
      message: `Contrast ratio is only ${ratio.toFixed(1)}:1 (Min recommended: 4.5:1). Most standard cameras cannot read this QR code.`
    });
  } else if (ratio < 4.0) {
    score -= 30;
    if (status !== 'critical') status = 'warning';
    issues.push({
      type: 'contrast-warning',
      title: 'Suboptimal Contrast',
      message: `Contrast ratio is ${ratio.toFixed(1)}:1. May be difficult to scan in low-light environments.`
    });
  }

  // Inverted check (Dark on light vs Light on dark)
  if (isInverted) {
    score -= 10;
    tips.push('Inverted QR code (light modules on dark background) is supported by modern smartphones, but older laser scanners require dark modules on a light background.');
  }

  // Logo + Error Correction Level check
  if (hasLogo && (correctionLevel === 'L' || correctionLevel === 'M')) {
    score -= 20;
    if (status === 'excellent') status = 'warning';
    issues.push({
      type: 'logo-correction',
      title: 'Logo Redundancy Warning',
      message: `Error Correction is currently set to '${correctionLevel}'. For best readability when an icon/logo is placed in the center, switch Error Correction to 'Q' (25%) or 'H' (30%).`
    });
  }

  // Margin check
  if (margin === 0) {
    score -= 10;
    tips.push('Zero quiet zone (padding) may make it harder for scanners to detect the QR boundary against dark or noisy backgrounds.');
  }

  score = Math.max(10, Math.min(100, score));

  let gradeLabel = 'Excellent Readability';
  let badgeColor = 'emerald';

  if (score < 40) {
    gradeLabel = 'Critical Scanning Risk';
    badgeColor = 'rose';
  } else if (score < 70) {
    gradeLabel = 'Moderate Readability';
    badgeColor = 'amber';
  } else if (score < 90) {
    gradeLabel = 'Good Readability';
    badgeColor = 'sky';
  }

  return {
    score,
    ratio: Number(ratio.toFixed(2)),
    status,
    gradeLabel,
    badgeColor,
    isInverted,
    issues,
    tips
  };
};
