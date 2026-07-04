import React, { useState } from 'react';
import { AppButton, SiteType, ShopType } from '../types';
import { PRESETS } from '../utils/constants';

interface Props {
  buttons: AppButton[];
  setButtons: React.Dispatch<React.SetStateAction<AppButton[]>>;
  site: SiteType;
  shop: ShopType;
  onNext: () => void;
  onPrev: () => void;
}

export const Step4Button: React.FC<Props> = ({ buttons, setButtons, site, shop, onNext, onPrev }) => {
  const [collapsedItems, setCollapsedItems] = useState<Record<number, boolean>>({});

  const toggleCollapse = (index: number) => {
    setCollapsedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const updateButton = (index: number, field: keyof AppButton, value: any) => {
    setButtons(btns => {
      const newBtns = [...btns];
      newBtns[index] = { ...newBtns[index], [field]: value };
      return newBtns;
    });
  };

  const applyPreset = (index: number, bg: string, text: string) => {
    updateButton(index, 'bgColor', bg);
    updateButton(index, 'textColor', text);
  };

  const renderLivePreview = () => {
    return buttons.map((btn, i) => {
      if (!btn.enabled || !btn.text) return null;
      return (
        <div
          key={i}
          className="preview-btn-item"
          style={{
            backgroundColor: btn.bgColor,
            color: btn.textColor,
            borderRadius: `${btn.radius}px`,
          }}
        >
          {btn.text}
        </div>
      );
    });
  };

  return (
    <div className="step-panel active">
      <div className="card">
        <div className="card-title"><span className="icon">🎨</span>ボタンをカスタマイズ</div>
        <div className="card-desc">各ボタンの色・形・テキスト・リンク先をリアルタイムで編集できます。右側でボタンの見た目を確認しながら設定してください。</div>

        <div className="button-editor-layout">
          {/* 左：ボタン設定リスト */}
          <div className="btn-list">
            {buttons.map((btn, i) => {
              const isKeep = btn.action === 'keep';
              const isCollapsed = collapsedItems[i];

              return (
                <div key={btn.id} className={`btn-editor-item ${!btn.enabled ? 'disabled' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                  
                  {/* ヘッダー部分 */}
                  <div className="btn-editor-header" onClick={() => toggleCollapse(i)}>
                    <div className="btn-color-swatch" style={{ background: btn.bgColor }}></div>
                    <div className="btn-editor-label">{btn.label}</div>
                    
                    <div 
                      className={`btn-toggle ${btn.enabled ? 'on' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateButton(i, 'enabled', !btn.enabled);
                      }}
                    ></div>
                    
                    <span className="collapse-arrow">▼</span>
                  </div>

                  {/* ボディ部分 (アコーディオン中身) */}
                  <div className="btn-editor-body">
                    <div className="form-group">
                      <label className="form-label">ボタンのテキスト</label>
                      <input
                        type="text"
                        className="form-input"
                        value={btn.text}
                        placeholder="ボタンに表示する文字"
                        onChange={(e) => updateButton(i, 'text', e.target.value)}
                      />
                    </div>

                    {!isKeep && (
                      <div className="form-group">
                        <label className="form-label">遷移先URL</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ fontFamily: 'monospace', fontSize: '12px' }}
                          value={btn.url}
                          placeholder="https://..."
                          onChange={(e) => updateButton(i, 'url', e.target.value)}
                        />
                      </div>
                    )}

                    <div className="color-row">
                      <div className="color-field">
                        <label>背景色</label>
                        <div className="color-picker-wrap">
                          <input
                            type="color"
                            value={btn.bgColor}
                            onChange={(e) => updateButton(i, 'bgColor', e.target.value)}
                          />
                          <input
                            type="text"
                            className="color-hex"
                            value={btn.bgColor}
                            maxLength={7}
                            onChange={(e) => updateButton(i, 'bgColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="color-field">
                        <label>文字色</label>
                        <div className="color-picker-wrap">
                          <input
                            type="color"
                            value={btn.textColor}
                            onChange={(e) => updateButton(i, 'textColor', e.target.value)}
                          />
                          <input
                            type="text"
                            className="color-hex"
                            value={btn.textColor}
                            maxLength={7}
                            onChange={(e) => updateButton(i, 'textColor', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="radius-row">
                      <div className="radius-label-row">
                        <label>角丸（形）</label>
                        <span className="radius-value">{btn.radius}px</span>
                      </div>
                      <input
                        type="range"
                        className="radius-slider"
                        min="0"
                        max="99"
                        value={btn.radius}
                        onChange={(e) => updateButton(i, 'radius', parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="form-label" style={{ marginBottom: '8px' }}>カラープリセット</label>
                      <div className="preset-row">
                        {PRESETS.map((p, pIdx) => (
                          <div
                            key={pIdx}
                            className="preset-chip"
                            style={{ background: p.bg, color: p.text }}
                            onClick={() => applyPreset(i, p.bg, p.text)}
                          >
                            {p.name}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* 右：ライブプレビュー */}
          <div className="preview-panel">
            <div className="preview-panel-title">リアルタイムプレビュー</div>
            <div className="live-preview-box">
              {renderLivePreview()}
            </div>
          </div>

        </div>
      </div>

      <div className="step-actions">
        <button className="btn-prev" onClick={onPrev}>← 戻る</button>
        <button className="btn-generate" onClick={onNext}>
          ✨ HTMLを生成する
        </button>
      </div>
    </div>
  );
};
