import React from 'react';
import { SiteType } from '../types';
import { SITES } from '../utils/constants';

interface Props {
  site: SiteType;
  onSiteChange: (site: SiteType) => void;
  onNext: () => void;
}

export const Step1Site: React.FC<Props> = ({ site, onSiteChange, onNext }) => {
  return (
    <div className="step-panel active">
      <div className="card">
        <div className="card-title">
          <span className="icon">🌐</span>サイトを選んでください
        </div>
        <div className="card-desc">ブログを投稿するサイトを選択してください。サイトによってキープボタンの仕組みが異なります。</div>
        <div className="site-grid">
          <div
            className={`site-card vanilla ${site === 'vanilla' ? 'selected' : ''}`}
            onClick={() => onSiteChange('vanilla')}
          >
            <span className="check-badge">✓</span>
            <div className="site-logo">🍦</div>
            <div className="site-name">Vanilla</div>
            <div className="site-sub">バニラ求人</div>
          </div>
          <div
            className={`site-card cocoa ${site === 'cocoa' ? 'selected' : ''}`}
            onClick={() => onSiteChange('cocoa')}
          >
            <span className="check-badge">✓</span>
            <div className="site-logo">🍫</div>
            <div className="site-name">cocoa</div>
            <div className="site-sub">ここあJOB</div>
          </div>
        </div>
      </div>
      <div className="step-actions">
        <span></span>
        <button className="btn-next" onClick={onNext} disabled={!site}>
          次へ　→
        </button>
      </div>
    </div>
  );
};
