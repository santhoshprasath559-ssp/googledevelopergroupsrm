export const PRESETS = [
  {
    id: 'classic',
    name: 'Classic Black',
    description: 'Universal high contrast black & white',
    fgColor: '#000000',
    bgColor: '#ffffff',
    dotStyle: 'square',
    eyeStyle: 'square',
    correctionLevel: 'M',
    tag: 'Standard'
  },
  {
    id: 'gdg-srm',
    name: 'GDG SRM Blue',
    description: 'Google Developer Group brand signature',
    fgColor: '#1a73e8',
    bgColor: '#ffffff',
    dotStyle: 'rounded',
    eyeStyle: 'rounded',
    correctionLevel: 'Q',
    tag: 'Popular'
  },
  {
    id: 'midnight',
    name: 'Midnight Slate',
    description: 'Deep sleek dark mode styling',
    fgColor: '#38bdf8',
    bgColor: '#0f172a',
    dotStyle: 'dots',
    eyeStyle: 'circle',
    correctionLevel: 'H',
    tag: 'Dark'
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Fresh marine cyan & crisp background',
    fgColor: '#0284c7',
    bgColor: '#f0f9ff',
    dotStyle: 'rounded',
    eyeStyle: 'rounded',
    correctionLevel: 'M',
    tag: 'Fresh'
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    description: 'Warm coral amber on sun-kissed base',
    fgColor: '#ea580c',
    bgColor: '#fff7ed',
    dotStyle: 'rounded',
    eyeStyle: 'square',
    correctionLevel: 'M',
    tag: 'Vibrant'
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    description: 'Lush organic green tones',
    fgColor: '#059669',
    bgColor: '#f0fdf4',
    dotStyle: 'dots',
    eyeStyle: 'circle',
    correctionLevel: 'Q',
    tag: 'Eco'
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Futuristic purple on dark onyx',
    fgColor: '#c084fc',
    bgColor: '#18181b',
    dotStyle: 'classy',
    eyeStyle: 'circle',
    correctionLevel: 'H',
    tag: 'Cyber'
  },
  {
    id: 'minimal-slate',
    name: 'Minimal Titanium',
    description: 'Clean dark graphite on titanium white',
    fgColor: '#1e293b',
    bgColor: '#f8fafc',
    dotStyle: 'classy',
    eyeStyle: 'rounded',
    correctionLevel: 'M',
    tag: 'Clean'
  }
];

export const CORRECTION_LEVELS = [
  { value: 'L', label: 'Low (7%)', desc: 'Best for standard text & clean surfaces' },
  { value: 'M', label: 'Medium (15%)', desc: 'Recommended default for general scanning' },
  { value: 'Q', label: 'Quartile (25%)', desc: 'Ideal when adding small logos or badging' },
  { value: 'H', label: 'High (30%)', desc: 'Maximum redundancy for logos & outdoor prints' }
];

export const DOT_STYLES = [
  { value: 'square', label: 'Standard Square' },
  { value: 'rounded', label: 'Smooth Rounded' },
  { value: 'dots', label: 'Circular Dots' },
  { value: 'classy', label: 'Classy Diamond' }
];

export const EYE_STYLES = [
  { value: 'square', label: 'Sharp Square' },
  { value: 'rounded', label: 'Soft Rounded' },
  { value: 'circle', label: 'Circular Ring' }
];

export const QR_TYPES = [
  { id: 'url', label: 'Website URL', icon: 'Globe', placeholder: 'https://example.com' },
  { id: 'text', label: 'Plain Text', icon: 'FileText', placeholder: 'Enter your message or notes...' },
  { id: 'email', label: 'Email', icon: 'Mail', placeholder: 'user@example.com' },
  { id: 'phone', label: 'Phone Call', icon: 'Phone', placeholder: '+1 234 567 8900' },
  { id: 'wifi', label: 'Wi-Fi Network', icon: 'Wifi', placeholder: 'Campus_Guest_5G' }
];
