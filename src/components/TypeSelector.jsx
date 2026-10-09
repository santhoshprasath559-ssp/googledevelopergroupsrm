import React from 'react';
import { Globe, FileText, Mail, Phone, Wifi } from 'lucide-react';

const TYPE_ICONS = {
  url: Globe,
  text: FileText,
  email: Mail,
  phone: Phone,
  wifi: Wifi
};

export const TypeSelector = ({ selectedType, onSelectType, types }) => {
  return (
    <div className="type-selector-wrapper">
      <div className="section-label-row">
        <label className="section-label">1. Select QR Code Type</label>
        <span className="section-hint">Choose payload format</span>
      </div>

      <div className="type-grid" role="tablist" aria-label="QR Code Type Selection">
        {types.map((t) => {
          const Icon = TYPE_ICONS[t.id] || Globe;
          const isSelected = selectedType === t.id;

          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isSelected}
              type="button"
              className={`type-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectType(t.id)}
            >
              <div className="type-btn-icon-wrapper">
                <Icon size={18} className="type-icon" />
              </div>
              <span className="type-btn-label">{t.label}</span>
              {isSelected && <span className="active-glow-indicator" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
