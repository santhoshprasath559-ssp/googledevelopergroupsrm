import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { formatPayload, getDisplaySummary } from '../utils/qrFormatter';
import { validateQRData } from '../utils/validator';
import { checkScanReliability } from '../utils/contrast';

const INITIAL_FORM_DATA = {
  url: { url: 'https://gdg.community.dev' },
  text: { text: 'Welcome to GDG on Campus SRM!' },
  email: { email: 'team@gdgsrm.org', subject: 'Technical Recruitment Inquiry', body: 'Hi GDG SRM Team,\n\n' },
  phone: { phone: '+91 98765 43210' },
  wifi: { ssid: 'SRM_Campus_5G', password: 'developer_pass', encryption: 'WPA', hidden: false }
};

const DEFAULT_STYLES = {
  fgColor: '#1a73e8', // GDG Google Blue default
  bgColor: '#ffffff',
  size: 380,
  margin: 2,
  correctionLevel: 'M',
  dotStyle: 'rounded',
  eyeStyle: 'rounded',
  logo: null
};

const MAX_HISTORY_ITEMS = 10;

export const useQRCode = (onNotify) => {
  const [selectedType, setSelectedType] = useState('url');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [styles, setStyles] = useState(DEFAULT_STYLES);
  const [history, setHistory] = useLocalStorage('gdg_qr_studio_history', []);
  const saveTimeoutRef = useRef(null);

  // Older history entries may contain Wi-Fi credentials in both data and payload.
  // Remove those entire entries when loading history; keeping either field is unsafe.
  useEffect(() => {
    if (!Array.isArray(history)) {
      setHistory([]);
      return;
    }

    const safeHistory = history.filter((item) => item?.type !== 'wifi');
    if (safeHistory.length !== history.length) setHistory(safeHistory);
  }, [history, setHistory]);

  // Active form data for selected type
  const activeData = formData[selectedType] || {};

  // Formatted string payload
  const payload = useMemo(() => {
    return formatPayload(selectedType, activeData);
  }, [selectedType, activeData]);

  // Validation output
  const validation = useMemo(() => {
    return validateQRData(selectedType, activeData);
  }, [selectedType, activeData]);

  // Scan reliability metrics
  const reliability = useMemo(() => {
    return checkScanReliability({
      fgColor: styles.fgColor,
      bgColor: styles.bgColor,
      correctionLevel: styles.correctionLevel,
      hasLogo: Boolean(styles.logo?.value),
      margin: styles.margin
    });
  }, [styles]);

  // Auto-save valid QR configurations into localStorage (debounced)
  useEffect(() => {
    if (!validation.isValid || !payload || selectedType === 'wifi') return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      const summary = getDisplaySummary(selectedType, activeData);
      const newItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type: selectedType,
        summary,
        payload,
        data: { ...activeData },
        styles: { ...styles, logo: styles.logo?.type === 'gdg' ? { type: 'gdg', value: 'gdg' } : null }, // don't persist huge base64 in history to preserve storage
        timestamp: Date.now()
      };

      setHistory((prevHistory) => {
        // Prevent duplicate consecutive entries with identical payload
        const filtered = (prevHistory || []).filter((h) => h.payload !== payload);
        return [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      });
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [payload, validation.isValid, selectedType, activeData, styles, setHistory]);

  // Updates form state for current type
  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      [selectedType]: newData
    }));
  };

  // Applies predefined design preset
  const applyPreset = (preset) => {
    setStyles((prev) => ({
      ...prev,
      fgColor: preset.fgColor,
      bgColor: preset.bgColor,
      dotStyle: preset.dotStyle,
      eyeStyle: preset.eyeStyle,
      correctionLevel: preset.correctionLevel
    }));
    if (onNotify) onNotify(`Applied preset: ${preset.name}`, 'info');
  };

  // Swap foreground & background colors
  const swapColors = () => {
    setStyles((prev) => ({
      ...prev,
      fgColor: prev.bgColor,
      bgColor: prev.fgColor
    }));
    if (onNotify) onNotify('Swapped Foreground and Background colors', 'info');
  };

  // Reset to clean defaults
  const resetToDefaults = () => {
    setSelectedType('url');
    setFormData(INITIAL_FORM_DATA);
    setStyles(DEFAULT_STYLES);
    if (onNotify) onNotify('Reset all settings to default', 'info');
  };

  // Restore previous item from history
  const restoreHistoryItem = (item) => {
    if (!item) return;
    setSelectedType(item.type);
    if (item.data) {
      setFormData((prev) => ({
        ...prev,
        [item.type]: item.data
      }));
    }
    if (item.styles) {
      setStyles((prev) => ({
        ...prev,
        ...item.styles
      }));
    }
    if (onNotify) onNotify(`Restored "${item.summary}" from history`, 'success');
  };

  // Delete single history item
  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (onNotify) onNotify('Removed item from history', 'info');
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    if (onNotify) onNotify('Cleared recent history', 'info');
  };

  // Boost error correction level
  const boostCorrectionToHigh = () => {
    setStyles((prev) => ({ ...prev, correctionLevel: 'H' }));
    if (onNotify) onNotify('Set Error Correction to High (30%) for maximum redundancy', 'success');
  };

  return {
    selectedType,
    setSelectedType,
    formData,
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
  };
};
