'use client';

import React, { useState, useEffect } from 'react';
import { StepIndicator } from '../components/StepIndicator';
import { Step1Site } from '../components/Step1Site';
import { Step2Shop } from '../components/Step2Shop';
import { Step3Image } from '../components/Step3Image';
import { Step4Button } from '../components/Step4Button';
import { Step5Output } from '../components/Step5Output';
import { Toast } from '../components/Toast';
import { AppState, SiteType, ShopType, AppButton } from '../types';
import { DEFAULT_BUTTONS_VANILLA, DEFAULT_BUTTONS_COCOA } from '../utils/constants';

export default function Home() {
  const [state, setState] = useState<AppState>({
    site: null,
    shop: null,
    images: [],
    buttons: [],
    currentStep: 1,
    maxReached: 1,
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const handleSiteChange = (site: SiteType) => {
    const defaultButtons = site === 'vanilla' ? DEFAULT_BUTTONS_VANILLA : DEFAULT_BUTTONS_COCOA;
    setState(prev => ({ ...prev, site, buttons: JSON.parse(JSON.stringify(defaultButtons)) }));
  };

  const handleShopChange = (shop: ShopType) => {
    setState(prev => ({ ...prev, shop }));
  };

  const setImages = (action: React.SetStateAction<any[]>) => {
    setState(prev => ({
      ...prev,
      images: typeof action === 'function' ? action(prev.images) : action
    }));
  };

  const setButtons = (action: React.SetStateAction<AppButton[]>) => {
    setState(prev => ({
      ...prev,
      buttons: typeof action === 'function' ? action(prev.buttons) : action
    }));
  };

  const goToStep = (step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
      maxReached: Math.max(prev.maxReached, step)
    }));
  };

  const resetAll = () => {
    setState({
      site: null,
      shop: null,
      images: [],
      buttons: [],
      currentStep: 1,
      maxReached: 1,
    });
  };

  return (
    <>
      <div className="bg-orbs"></div>

      <header className="header">
        <div className="header-badge">
          <span className="dot"></span>
          店長ブログ HTML ジェネレーター
        </div>
        <h1>キープボタン HTMLジェネレーター</h1>
        <p>バニラ・cocoa対応 ／ 画像アップロード ／ ボタンカスタマイズ</p>
      </header>

      <main className="main-container">
        <StepIndicator 
          currentStep={state.currentStep} 
          maxReached={state.maxReached} 
          onStepClick={goToStep} 
        />

        <div className="step-container">
        {state.currentStep === 1 && (
          <Step1Site 
            site={state.site} 
            onSiteChange={handleSiteChange} 
            onNext={() => goToStep(2)} 
          />
        )}
        {state.currentStep === 2 && (
          <Step2Shop 
            site={state.site} 
            shop={state.shop} 
            onShopChange={handleShopChange} 
            onNext={() => goToStep(3)} 
            onPrev={() => goToStep(1)} 
          />
        )}
        {state.currentStep === 3 && (
          <Step3Image 
            images={state.images} 
            setImages={setImages} 
            shop={state.shop} 
            onNext={() => {
              if (state.images.length === 0 || !state.images.some(i => i.url.trim())) {
                showToast('画像を最低1枚追加してください', 'error');
                return;
              }
              goToStep(4);
            }} 
            onPrev={() => goToStep(2)} 
            onError={(msg) => showToast(msg, 'error')}
          />
        )}
        {state.currentStep === 4 && (
          <Step4Button 
            buttons={state.buttons} 
            setButtons={setButtons} 
            site={state.site} 
            shop={state.shop} 
            onNext={() => goToStep(5)} 
            onPrev={() => goToStep(3)} 
          />
        )}
        {state.currentStep === 5 && (
          <Step5Output 
            state={state} 
            onPrev={() => goToStep(4)} 
            onReset={resetAll} 
            onSuccess={(msg) => showToast(msg, 'success')}
            onError={(msg) => showToast(msg, 'error')}
          />
        )}
      </div>

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: null })} />
    </main>
    </>
  );
}
