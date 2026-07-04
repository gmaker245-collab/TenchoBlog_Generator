import React from 'react';

interface Props {
  currentStep: number;
  maxReached: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { num: 1, label: 'サイト選択' },
  { num: 2, label: '店舗選択' },
  { num: 3, label: '画像追加' },
  { num: 4, label: 'ボタン設定' },
  { num: 5, label: 'HTML生成' },
];

export const StepIndicator: React.FC<Props> = ({ currentStep, maxReached, onStepClick }) => {
  return (
    <nav className="step-nav">
      {steps.map((step, index) => {
        const isActive = step.num === currentStep;
        const isDone = step.num < currentStep;
        const canClick = step.num <= maxReached || step.num === currentStep + 1;

        return (
          <React.Fragment key={step.num}>
            <div
              className={`step-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              onClick={() => canClick && onStepClick(step.num)}
              style={{ cursor: canClick ? 'pointer' : 'default' }}
            >
              <div className="step-circle">
                <span>{step.num}</span>
              </div>
              <div className="step-label">{step.label}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${step.num < currentStep ? 'done' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
