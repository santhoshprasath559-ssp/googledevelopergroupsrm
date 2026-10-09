import { normalizeUrl } from './qrFormatter.js';

/**
 * Validates input for different QR code types.
 * Returns { isValid, errors, warnings }
 */

export const validateQRData = (type, data) => {
  const errors = {};
  const warnings = [];

  if (!data) {
    return {
      isValid: false,
      errors: { general: 'No data provided' },
      warnings: []
    };
  }

  switch (type) {
    case 'url': {
      const raw = (data.url || '').trim();
      if (!raw) {
        errors.url = 'Website URL is required.';
      } else {
        const hasHttpProtocol = /^https?:\/\//i.test(raw);
        const hasUnsupportedProtocol = /^[a-z][a-z\d+.-]*:/i.test(raw)
          && !hasHttpProtocol
          && !/^[a-z0-9.-]+:\d+(?:[/?#]|$)/i.test(raw);
        const normalized = normalizeUrl(raw);

        try {
          const parsed = new URL(normalized);
          if (hasUnsupportedProtocol || !['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname) {
            throw new Error('Unsupported or missing hostname');
          }
        } catch {
          errors.url = 'Please enter a valid URL (e.g., https://example.com or gdg.community.dev).';
        }

        if (!errors.url && !hasHttpProtocol) {
          warnings.push('URL has no protocol (http/https). We will auto-prefix https:// for you.');
        }
      }
      break;
    }

    case 'text': {
      const text = (data.text || '').trim();
      if (!text) {
        errors.text = 'Plain text content cannot be empty.';
      } else if (text.length > 1200) {
        warnings.push('Large text size may produce very dense QR codes that are harder to scan on older cameras.');
      }
      break;
    }

    case 'email': {
      const email = (data.email || '').trim();
      if (!email) {
        errors.email = 'Recipient email address is required.';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = 'Please provide a valid email format (e.g., user@domain.com).';
        }
      }
      break;
    }

    case 'phone': {
      const phone = (data.phone || '').trim();
      if (!phone) {
        errors.phone = 'Phone number is required.';
      } else {
        // Valid characters: digits, spaces, +, -, (, ), .
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{4,15}$/;
        const digitsOnly = phone.replace(/\D/g, '');
        if (!phoneRegex.test(phone) || digitsOnly.length < 3) {
          errors.phone = 'Please enter a valid phone number with digits and optional country code.';
        }
      }
      break;
    }

    case 'wifi': {
      const ssid = (data.ssid || '').trim();
      const encryption = data.encryption || 'WPA';
      const password = data.password || '';

      if (!ssid) {
        errors.ssid = 'Network Name (SSID) is required.';
      }

      if (encryption !== 'nopass') {
        if (!password) {
          errors.password = 'Password is required for encrypted Wi-Fi networks.';
        } else if (encryption === 'WPA' && password.length < 8) {
          errors.password = 'WPA/WPA2 passwords must be at least 8 characters long.';
        } else if (encryption === 'WEP' && password.length !== 5 && password.length !== 13 && password.length !== 10 && password.length !== 26) {
          warnings.push('WEP keys are typically 5 or 13 ASCII chars (or 10/26 hex digits).');
        }
      }
      break;
    }

    default:
      errors.general = 'Unknown QR type.';
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors, warnings };
};
