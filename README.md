# QR Code Studio & Designer 🎨
### GDG on Campus SRM — Technical Recruitment Task 1

A modern, developer-grade **QR Code Generator and Designer** built with React, Vite, and HTML5 Canvas. Runs 100% client-side with zero backend dependencies, complete real-time customization, live scan reliability metrics, and local storage persistence.

---

## ✨ Features

### 1. Real-Time Multi-Type QR Generation
- **Website URL**: Auto protocol prefixing, structure validation, quick domain suggestions.
- **Plain Text**: Character counters, length warnings, and sample templates.
- **Email**: Mailto payload generation with recipient, subject line, and body message.
- **Phone**: Tel protocol trigger for phone dialers with international country code chips.
- **Wi-Fi Network**: Standard MECARD Wi-Fi format supporting WPA/WPA2/WPA3, WEP, and Open networks, with password visibility toggles and hidden SSID support.

### 2. Deep Customization & Geometry
- **Real-Time Canvas Engine**: Live re-rendering without flickering or full DOM reloads.
- **Module Shapes**: Standard Square, Smooth Rounded, Circular Dots, Diamond Classy.
- **Finder Eye Shapes**: Sharp Classic Square, Soft Rounded, Circular Concentric Rings.
- **Color Tuning**: Foreground and Background color pickers, quick swatches, hex inputs, and 1-click Invert/Swap.
- **Dimension & Margin Controls**: Dynamic pixel dimensions (240px–600px) and quiet zone margin sliders.
- **Error Correction Levels**: Low (7%), Medium (15%), Quartile (25%), High (30%) with redundancy explanations.
- **Center Badge / Logo**: Embed official GDG branding or upload custom images with automated redundancy safety checks.

### 3. Predefined Visual Presets
- **Classic Black**: High contrast universal standard.
- **GDG SRM Blue**: Official Google Developer Group blue on clean white.
- **Midnight Slate**: Dark mode styling with electric cyan accents.
- **Ocean Breeze**: Marine blue on ice cyan base.
- **Sunset Glow**: Warm amber and coral tones.
- **Emerald Forest**: Organic deep green and mint tints.
- **Cyber Neon**: Futuristic neon purple on dark onyx.
- **Minimal Titanium**: Graphite on subtle titanium white.

### 4. Scan Reliability & Contrast Engine
- Calculates relative luminance and **WCAG contrast ratios** ($L1/L2$) in real time.
- **Safety Indicators**:
  - Warns on poor contrast ratios (< 2.5:1 critical risk, < 4.0:1 suboptimal).
  - Flags inverted QR codes (light-on-dark) with compatibility tips.
  - Detects center logos and prompts 1-click **Auto-Boost to High (H)** error correction.
  - Warns on zero-margin quiet zones.

### 5. Export & Sharing
- **High-Resolution PNG**: 1x, 2x (High-Res), and 4x (Print Ready) multipliers.
- **Vector SVG**: Download scalable vector format for design workflows (Figma, Illustrator, print).
- **Copy Image to Clipboard**: Direct PNG blob clipboard copy.
- **Copy Raw Payload**: Easy clipboard access to generated MECARD / URL / Mailto strings.
- **Celebration Feedback**: Confetti animation and toast notifications on successful actions.

### 6. Local Storage History
- Automatically saves recently created QR configurations.
- Survives browser refresh without leaking sensitive passwords.
- **1-Click Restore**: Restores type, input data, colors, and styling into the editor.
- Item deletion and clear history controls (capped at 10 items).

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **QR Engine**: `qrcode` library + Custom HTML5 Canvas Renderer
- **Icons**: `lucide-react`
- **Effects**: `canvas-confetti`
- **Storage**: Browser `localStorage`
- **Styling**: Modern CSS3 with responsive grid, glassmorphism, and developer-tool aesthetic

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
