/**
 * Formats data input into valid standard QR code payload strings.
 */

// Helper to escape Wi-Fi special characters (; , : " \ )
const escapeWifi = (str = '') => {
  return str.replace(/([\\;,:"])/g, '\\$1');
};

export const normalizeUrl = (value = '') => {
  const url = value.trim();
  if (!url) return '';
  if (url.startsWith('//')) return `https:${url}`;
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

export const formatPayload = (type, data) => {
  if (!data) return '';

  switch (type) {
    case 'url': {
      return normalizeUrl(data.url || '');
    }

    case 'text': {
      return data.text || '';
    }

    case 'email': {
      const email = (data.email || '').trim();
      if (!email) return '';
      const subject = (data.subject || '').trim();
      const body = (data.body || '').trim();

      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);

      return `mailto:${email}${params.length > 0 ? `?${params.join('&')}` : ''}`;
    }

    case 'phone': {
      const phone = (data.phone || '').trim().replace(/\s+/g, '');
      if (!phone) return '';
      return `tel:${phone}`;
    }

    case 'wifi': {
      const ssid = (data.ssid || '').trim();
      if (!ssid) return '';
      const encryption = data.encryption || 'WPA';
      const password = data.password || '';
      const hidden = Boolean(data.hidden);

      // Standard MECARD format for Wi-Fi:
      // WIFI:S:MySSID;T:WPA;P:MyPassword;H:false;;
      const encType = encryption === 'nopass' ? 'nopass' : encryption;
      const passField = encType === 'nopass' ? '' : `P:${escapeWifi(password)};`;
      const hiddenField = hidden ? 'H:true;' : '';

      return `WIFI:S:${escapeWifi(ssid)};T:${encType};${passField}${hiddenField};`;
    }

    default:
      return '';
  }
};

/**
 * Returns a clean, human-readable summary for history items
 */
export const getDisplaySummary = (type, data) => {
  if (!data) return 'Untitled QR';

  switch (type) {
    case 'url':
      return data.url || 'Empty URL';
    case 'text':
      return data.text ? (data.text.length > 30 ? data.text.slice(0, 30) + '...' : data.text) : 'Empty Text';
    case 'email':
      return data.email ? `Email: ${data.email}` : 'Empty Email';
    case 'phone':
      return data.phone ? `Call: ${data.phone}` : 'Empty Phone';
    case 'wifi':
      return data.ssid ? `Wi-Fi: ${data.ssid} (${data.encryption || 'WPA'})` : 'Empty Wi-Fi';
    default:
      return 'Custom QR';
  }
};
