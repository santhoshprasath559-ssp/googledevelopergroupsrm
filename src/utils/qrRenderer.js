import QRCode from 'qrcode';

/**
 * Checks if a coordinate (r, c) falls within one of the 3 main 7x7 finder patterns
 */
export const isInFinderPattern = (r, c, size) => {
  // Top-left
  if (r < 7 && c < 7) return 'top-left';
  // Top-right
  if (r < 7 && c >= size - 7) return 'top-right';
  // Bottom-left
  if (r >= size - 7 && c < 7) return 'bottom-left';
  return null;
};

/**
 * Checks if a coordinate is inside the center logo exclusion zone
 */
export const isInLogoZone = (r, c, size, hasLogo) => {
  if (!hasLogo) return false;
  // Center 20-25% of the matrix
  const logoModules = Math.floor(size * 0.24);
  const start = Math.floor((size - logoModules) / 2);
  const end = start + logoModules;
  return r >= start && r < end && c >= start && c < end;
};

/**
 * Draws a customized finder pattern (eye) onto the canvas
 */
const drawFinderPattern = (ctx, startX, startY, moduleSize, style, fgColor, bgColor) => {
  const eyeSize = 7 * moduleSize;
  const cx = startX + eyeSize / 2;
  const cy = startY + eyeSize / 2;

  ctx.save();

  // Clear background of the entire 7x7 eye
  ctx.fillStyle = bgColor;
  ctx.fillRect(startX, startY, eyeSize, eyeSize);

  if (style === 'circle') {
    // Outer Circle (7 modules wide -> radius 3.5 * moduleSize)
    ctx.fillStyle = fgColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5 * moduleSize, 0, Math.PI * 2);
    ctx.fill();

    // Inner White Ring (5 modules wide -> radius 2.5 * moduleSize)
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5 * moduleSize, 0, Math.PI * 2);
    ctx.fill();

    // Center Solid Dot (3 modules wide -> radius 1.5 * moduleSize)
    ctx.fillStyle = fgColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 1.5 * moduleSize, 0, Math.PI * 2);
    ctx.fill();
  } else if (style === 'rounded') {
    const outerRadius = moduleSize * 1.8;
    const innerRadius = moduleSize * 1.2;
    const coreRadius = moduleSize * 0.8;

    // Outer Rounded Frame (7x7)
    ctx.fillStyle = fgColor;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(startX, startY, eyeSize, eyeSize, outerRadius);
    } else {
      ctx.rect(startX, startY, eyeSize, eyeSize);
    }
    ctx.fill();

    // Middle Cutout (5x5)
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(startX + moduleSize, startY + moduleSize, 5 * moduleSize, 5 * moduleSize, innerRadius);
    } else {
      ctx.rect(startX + moduleSize, startY + moduleSize, 5 * moduleSize, 5 * moduleSize);
    }
    ctx.fill();

    // Center Core (3x3)
    ctx.fillStyle = fgColor;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(startX + 2 * moduleSize, startY + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize, coreRadius);
    } else {
      ctx.rect(startX + 2 * moduleSize, startY + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
    }
    ctx.fill();
  } else {
    // Sharp Classic Square
    // Outer 7x7 Box
    ctx.fillStyle = fgColor;
    ctx.fillRect(startX, startY, eyeSize, eyeSize);

    // Inner 5x5 Cutout
    ctx.fillStyle = bgColor;
    ctx.fillRect(startX + moduleSize, startY + moduleSize, 5 * moduleSize, 5 * moduleSize);

    // Center 3x3 Box
    ctx.fillStyle = fgColor;
    ctx.fillRect(startX + 2 * moduleSize, startY + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
  }

  ctx.restore();
};

/**
 * Draws a single data module with chosen dot style
 */
const drawDataModule = (ctx, x, y, moduleSize, style, fgColor) => {
  ctx.fillStyle = fgColor;

  if (style === 'dots') {
    const radius = (moduleSize / 2) * 0.88;
    ctx.beginPath();
    ctx.arc(x + moduleSize / 2, y + moduleSize / 2, radius, 0, Math.PI * 2);
    ctx.fill();
  } else if (style === 'rounded') {
    const radius = moduleSize * 0.35;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x + 0.5, y + 0.5, moduleSize - 1, moduleSize - 1, radius);
    } else {
      ctx.rect(x, y, moduleSize, moduleSize);
    }
    ctx.fill();
  } else if (style === 'classy') {
    // Diamond / smooth jewel
    ctx.beginPath();
    const half = moduleSize / 2;
    ctx.moveTo(x + half, y + 1);
    ctx.lineTo(x + moduleSize - 1, y + half);
    ctx.lineTo(x + half, y + moduleSize - 1);
    ctx.lineTo(x + 1, y + half);
    ctx.closePath();
    ctx.fill();
  } else {
    // Standard Square
    ctx.fillRect(x, y, moduleSize, moduleSize);
  }
};

/**
 * Main function to render a styled QR code onto any HTML Canvas element
 */
export const renderQRCodeToCanvas = async (canvas, {
  payload,
  fgColor = '#000000',
  bgColor = '#ffffff',
  correctionLevel = 'M',
  margin = 2,
  size = 400,
  dotStyle = 'square',
  eyeStyle = 'square',
  logo = null // { type: 'icon' | 'image', value: string, bg: string }
}) => {
  if (!canvas || !payload) return;

  // 1. Generate QR matrix data
  const qr = QRCode.create(payload, {
    errorCorrectionLevel: correctionLevel
  });

  const matrixSize = qr.modules.size;
  const totalModules = matrixSize + margin * 2;
  const moduleSize = size / totalModules;

  // Setup canvas resolution
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 2. Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // 3. Draw Data Modules (excluding finder patterns)
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (isInFinderPattern(r, c, matrixSize)) {
        continue; // Handled separately for custom eye styling
      }

      if (isInLogoZone(r, c, matrixSize, Boolean(logo && logo.value))) {
        continue; // Space reserved for center logo
      }

      if (qr.modules.get(r, c)) {
        const x = (margin + c) * moduleSize;
        const y = (margin + r) * moduleSize;
        drawDataModule(ctx, x, y, moduleSize, dotStyle, fgColor);
      }
    }
  }

  // 4. Draw 3 Finder Patterns
  // Top-left
  drawFinderPattern(ctx, margin * moduleSize, margin * moduleSize, moduleSize, eyeStyle, fgColor, bgColor);
  // Top-right
  drawFinderPattern(ctx, (margin + matrixSize - 7) * moduleSize, margin * moduleSize, moduleSize, eyeStyle, fgColor, bgColor);
  // Bottom-left
  drawFinderPattern(ctx, margin * moduleSize, (margin + matrixSize - 7) * moduleSize, moduleSize, eyeStyle, fgColor, bgColor);

  // 5. Draw Center Logo / Badge if present
  if (logo && logo.value) {
    await drawCenterLogo(ctx, size, logo, bgColor, fgColor);
  }
};

/**
 * Draws center logo badge with white background padding and crisp icon
 */
const drawCenterLogo = (ctx, canvasSize, logo, bgColor, fgColor) => {
  return new Promise((resolve) => {
    const badgeSize = canvasSize * 0.22;
    const center = canvasSize / 2;
    const badgeX = center - badgeSize / 2;
    const badgeY = center - badgeSize / 2;
    const badgeRadius = badgeSize * 0.25;

    ctx.save();

    // Outer glow / shadow
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = badgeSize * 0.1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = badgeSize * 0.03;

    // Badge Background container
    ctx.fillStyle = logo.bg || bgColor || '#ffffff';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
    } else {
      ctx.rect(badgeX, badgeY, badgeSize, badgeSize);
    }
    ctx.fill();

    // Reset shadow for border
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = Math.max(1, badgeSize * 0.03);
    ctx.stroke();

    const innerPadding = badgeSize * 0.18;
    const innerSize = badgeSize - innerPadding * 2;
    const innerX = badgeX + innerPadding;
    const innerY = badgeY + innerPadding;

    if (logo.type === 'image' && logo.value) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, innerX, innerY, innerSize, innerSize);
        ctx.restore();
        resolve();
      };
      img.onerror = () => {
        ctx.restore();
        resolve();
      };
      img.src = logo.value;
    } else if (logo.type === 'gdg') {
      // Draw Crisp Google Developer Groups 4-color brackets/symbol
      drawGDGIcon(ctx, innerX, innerY, innerSize);
      ctx.restore();
      resolve();
    } else {
      ctx.restore();
      resolve();
    }
  });
};

/**
 * Draws the iconic Google Developer Group stylized brackets `< >`
 */
const drawGDGIcon = (ctx, x, y, size) => {
  const w = size;
  const h = size;

  // Google Colors
  const blue = '#4285F4';
  const red = '#EA4335';
  const yellow = '#FBBC05';
  const green = '#34A853';

  ctx.save();
  ctx.translate(x, y);

  // Left bracket <
  ctx.strokeStyle = blue;
  ctx.lineWidth = w * 0.16;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(w * 0.38, h * 0.2);
  ctx.lineTo(w * 0.15, h * 0.5);
  ctx.lineTo(w * 0.38, h * 0.8);
  ctx.stroke();

  // Right bracket >
  ctx.strokeStyle = red;
  ctx.beginPath();
  ctx.moveTo(w * 0.62, h * 0.2);
  ctx.lineTo(w * 0.85, h * 0.5);
  ctx.lineTo(w * 0.62, h * 0.8);
  ctx.stroke();

  // Center accent dots
  ctx.fillStyle = yellow;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.35, w * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = green;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.65, w * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

/**
 * Exports high-resolution PNG data URL or triggers direct download
 */
export const downloadCanvasAsPNG = async (options, filename = 'qrcode.png', exportScale = 2) => {
  const exportCanvas = document.createElement('canvas');
  const targetSize = (options.size || 400) * exportScale;

  await renderQRCodeToCanvas(exportCanvas, {
    ...options,
    size: targetSize
  });

  return new Promise((resolve) => {
    exportCanvas.toBlob((blob) => {
      if (!blob) return resolve(false);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      resolve(true);
    }, 'image/png');
  });
};

/**
 * Copies the generated QR canvas image directly to clipboard
 */
export const copyCanvasToClipboard = async (options) => {
  const exportCanvas = document.createElement('canvas');
  await renderQRCodeToCanvas(exportCanvas, {
    ...options,
    size: 600
  });

  return new Promise((resolve, reject) => {
    exportCanvas.toBlob(async (blob) => {
      if (!blob) return reject(new Error('Failed to generate image blob'));
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new window.ClipboardItem({ 'image/png': blob })
          ]);
          resolve(true);
        } else {
          reject(new Error('Clipboard API not supported in this browser'));
        }
      } catch (err) {
        reject(err);
      }
    }, 'image/png');
  });
};

/**
 * Generates an SVG string representation of the QR code
 */
export const generateQRCodeSVG = (options) => {
  const {
    payload,
    fgColor = '#000000',
    bgColor = '#ffffff',
    correctionLevel = 'M',
    margin = 2,
    size = 400,
    dotStyle = 'square'
  } = options;

  if (!payload) return '';

  const qr = QRCode.create(payload, { errorCorrectionLevel: correctionLevel });
  const matrixSize = qr.modules.size;
  const totalModules = matrixSize + margin * 2;
  const moduleSize = size / totalModules;

  let svgElements = `<rect width="${size}" height="${size}" fill="${bgColor}" />`;

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (qr.modules.get(r, c)) {
        const x = (margin + c) * moduleSize;
        const y = (margin + r) * moduleSize;

        if (dotStyle === 'dots') {
          const cx = x + moduleSize / 2;
          const cy = y + moduleSize / 2;
          const radius = (moduleSize / 2) * 0.88;
          svgElements += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${fgColor}" />`;
        } else if (dotStyle === 'rounded') {
          const rad = moduleSize * 0.35;
          svgElements += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(moduleSize - 0.5).toFixed(2)}" height="${(moduleSize - 0.5).toFixed(2)}" rx="${rad.toFixed(2)}" fill="${fgColor}" />`;
        } else {
          svgElements += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${moduleSize.toFixed(2)}" height="${moduleSize.toFixed(2)}" fill="${fgColor}" />`;
        }
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${svgElements}</svg>`;
};
