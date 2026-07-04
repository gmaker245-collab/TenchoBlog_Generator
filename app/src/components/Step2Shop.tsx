import React from 'react';
import { SiteType, ShopType } from '../types';
import { SITES } from '../utils/constants';

interface Props {
  site: SiteType;
  shop: ShopType;
  onShopChange: (shop: ShopType) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Shop: React.FC<Props> = ({ site, shop, onShopChange, onNext, onPrev }) => {
  const siteData = site ? SITES[site] : null;

  return (
    <div className="step-panel active">
      <div className="card">
        <div className="card-title">
          <span className="icon">🏪</span>店舗を選んでください
        </div>
        <div className="card-desc">HTMLを生成したい店舗を選択してください。</div>
        <div className="shop-grid">
          <div
            className={`shop-card ${shop === 'chanko' ? 'selected' : ''}`}
            onClick={() => onShopChange('chanko')}
          >
            <span className="check-badge">✓</span>
            <div className="shop-icon">🍲</div>
            <div className="shop-name">静岡駅前ちゃんこ</div>
            <div className="shop-id-label">
              {site === 'vanilla' ? `shop_id: ${siteData?.shops.chanko.id}` : `autonum: ${siteData?.shops.chanko.autonum}`}
            </div>
          </div>
          <div
            className={`shop-card ${shop === 'kakuteru' ? 'selected' : ''}`}
            onClick={() => onShopChange('kakuteru')}
          >
            <span className="check-badge">✓</span>
            <div className="shop-icon">🍹</div>
            <div className="shop-name">カクテル静岡駅前店</div>
            <div className="shop-id-label">
              {site === 'vanilla' ? `shop_id: ${siteData?.shops.kakuteru.id}` : `autonum: ${siteData?.shops.kakuteru.autonum}`}
            </div>
          </div>
        </div>
      </div>
      <div className="step-actions">
        <button className="btn-prev" onClick={onPrev}>← 戻る</button>
        <button className="btn-next" onClick={onNext} disabled={!shop}>
          次へ　→
        </button>
      </div>
    </div>
  );
};
