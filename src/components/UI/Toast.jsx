import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const { message, type = 'info' } = toast;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className="text-emerald-400" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-amber-400" />;
      case 'error':
        return <AlertCircle size={18} className="text-rose-400" />;
      default:
        return <Info size={18} className="text-sky-400" />;
    }
  };

  return (
    <div className={`toast-notification toast-${type}`} role="status" aria-live="polite">
      <div className="toast-icon-box">{getIcon()}</div>
      <div className="toast-message-box">{message}</div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};
