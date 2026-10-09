import React from 'react';
import { History, Trash2, RotateCcw, Clock } from 'lucide-react';
import { QR_TYPES } from '../../constants/presets';

export const RecentList = ({
  history,
  onRestoreItem,
  onDeleteItem,
  onClearHistory
}) => {
  if (!history || history.length === 0) {
    return (
      <div className="history-empty-card">
        <Clock size={24} className="text-slate-500 mb-2" />
        <h4 className="empty-title">No Recent QR Codes</h4>
        <p className="empty-subtitle">
          Valid QR codes you create are automatically saved locally for easy retrieval.
        </p>
      </div>
    );
  }

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  return (
    <div className="history-panel">
      <div className="history-header">
        <div className="history-title-row">
          <History size={16} className="text-slate-400" />
          <span className="history-title">Recent QR Codes ({history.length})</span>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-xs text-rose-400 hover:text-rose-300"
          onClick={onClearHistory}
          title="Clear all stored items"
        >
          <Trash2 size={13} />
          <span>Clear All</span>
        </button>
      </div>

      <div className="history-grid">
        {history.map((item) => {
          const typeObj = QR_TYPES.find((t) => t.id === item.type);

          return (
            <div key={item.id} className="history-card">
              {/* Type Badge & Time */}
              <div className="history-meta-row">
                <span className="history-type-pill">{typeObj?.label || item.type}</span>
                <span className="history-time-tag">{formatTime(item.timestamp)}</span>
              </div>

              {/* Payload Summary */}
              <div className="history-content-row">
                <div
                  className="history-mini-swatch"
                  style={{
                    backgroundColor: item.styles?.bgColor || '#ffffff',
                    borderColor: item.styles?.fgColor || '#000000'
                  }}
                >
                  <div
                    className="history-swatch-dot"
                    style={{ backgroundColor: item.styles?.fgColor || '#000000' }}
                  />
                </div>
                <div className="history-summary-text" title={item.summary}>
                  {item.summary}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="history-card-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-xs flex-1"
                  onClick={() => onRestoreItem(item)}
                  title="Load configuration into editor"
                >
                  <RotateCcw size={12} />
                  <span>Restore</span>
                </button>

                <button
                  type="button"
                  className="btn btn-ghost btn-xs text-slate-500 hover:text-rose-400"
                  onClick={() => onDeleteItem(item.id)}
                  title="Remove from history"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
