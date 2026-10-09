import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

export const ReliabilityBadge = ({ reliability }) => {
  const { score, ratio, status, gradeLabel, issues, tips } = reliability;

  const getStatusIcon = () => {
    if (status === 'critical') return <AlertOctagon size={16} className="text-rose-400" />;
    if (status === 'warning') return <AlertTriangle size={16} className="text-amber-400" />;
    return <ShieldCheck size={16} className="text-emerald-400" />;
  };

  const getBadgeClass = () => {
    if (status === 'critical') return 'badge-critical';
    if (status === 'warning') return 'badge-warning';
    return 'badge-excellent';
  };

  return (
    <div className={`reliability-card ${getBadgeClass()}`}>
      <div className="reliability-header">
        <div className="reliability-title-row">
          {getStatusIcon()}
          <span className="reliability-label">{gradeLabel}</span>
        </div>
        <div className="contrast-meter-pill">
          <span className="contrast-key">Contrast:</span>
          <span className="contrast-val">{ratio}:1</span>
        </div>
      </div>

      {/* Progress / Score Bar */}
      <div className="reliability-bar-track">
        <div
          className="reliability-bar-fill"
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Issues or Advisories */}
      {issues.length > 0 && (
        <div className="reliability-issues-list">
          {issues.map((issue, idx) => (
            <div key={idx} className="issue-item">
              <span className="issue-bullet">•</span>
              <span className="issue-text">{issue.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Inverted / Margin Tips */}
      {tips.length > 0 && (
        <div className="reliability-tips-list">
          {tips.map((tip, idx) => (
            <div key={idx} className="tip-item">
              <Info size={13} className="tip-icon flex-shrink-0" />
              <span className="tip-text">{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
