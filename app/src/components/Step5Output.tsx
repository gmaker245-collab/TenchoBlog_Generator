import React, { useEffect, useState } from 'react';
import { AppState } from '../types';
import { generateHtml } from '../utils/generateHtml';

interface Props {
  state: AppState;
  onPrev: () => void;
  onReset: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const Step5Output: React.FC<Props> = ({ state, onPrev, onReset, onSuccess, onError }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const html = generateHtml(state);
    setHtmlContent(html);
  }, [state]);

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      onSuccess('HTMLをコピーしました！ブログに貼り付けてください 🎉');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      onError('コピーに失敗しました');
    }
  };

  return (
    <div className="step-panel active">
      <div className="card">
        <div className="success-banner">
          <div className="big-icon">🎉</div>
          <h2>HTMLが生成されました！</h2>
          <p>下のコードをコピーして、店長ブログのHTMLソースに貼り付けてください。</p>
        </div>
        <div className="output-wrap">
          <textarea
            className="output-textarea"
            id="outputCode"
            value={htmlContent}
            readOnly
          />
          <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyOutput}>
            {copied ? '✅ コピー済み' : 'コピー'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="html-preview-label">📱 プレビュー（ブログ上でのイメージ）</div>
        <div id="htmlPreviewArea" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      <div className="step-actions">
        <button className="btn-prev" onClick={onPrev}>← 戻る</button>
        <button className="btn-next" onClick={onReset} style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: '#fff' }}>
          最初からやり直す
        </button>
      </div>
    </div>
  );
};
