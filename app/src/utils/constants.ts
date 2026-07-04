import { SiteData, AppButton } from '../types';

export const CLOUD_NAME = 'dgcpnleyv';
export const UPLOAD_PRESET = 'tenchoblog_upload';

export const SITES: Record<'vanilla' | 'cocoa', SiteData> = {
  vanilla: {
    label: 'Vanilla（バニラ）',
    keepType: 'ajax',
    keepUrl: 'https://tokai.qzin.jp/user/ajax/keeplist_add',
    shops: {
      chanko: {
        id: 'chankosz',
        reviewUrl: 'https://tokai.qzin.jp/chankosz/reviews/',
        vanillaUrl: 'https://tokai.qzin.jp/chankosz/#vanilladebut',
        goldUrl: 'https://tokai.qzin.jp/chankosz/#oubomail',
      },
      kakuteru: {
        id: 'kktrszok',
        reviewUrl: 'https://tokai.qzin.jp/kktrszok/reviews/',
        vanillaUrl: 'https://tokai.qzin.jp/kktrszok/#vanilladebut',
        goldUrl: 'https://tokai.qzin.jp/kktrszok/#oubomail',
      },
    },
  },
  cocoa: {
    label: 'cocoa（ここあJOB）',
    keepType: 'job_keep',
    shops: {
      chanko: { autonum: '11328', shopUrl: 'https://cocoa-job.jp/17/shop/11328/' },
      kakuteru: { autonum: '29785', shopUrl: 'https://cocoa-job.jp/17/shop/29785/' },
    },
  },
};

export const DEFAULT_BUTTONS_VANILLA: AppButton[] = [
  { id: 'keep', label: 'キープ', text: 'このお店をキープする', bgColor: '#ff3366', textColor: '#ffffff', radius: 99, url: '', action: 'keep', enabled: true },
  { id: 'review', label: '口コミ', text: '口コミを見る', bgColor: '#4f46e5', textColor: '#ffffff', radius: 99, url: '', action: 'link', enabled: true },
  { id: 'debut', label: 'デビュー', text: 'バニラdeデビューを見る', bgColor: '#7c3aed', textColor: '#ffffff', radius: 99, url: '', action: 'link', enabled: true },
  { id: 'gold', label: '入店祝金', text: '入店祝金を受け取る', bgColor: '#f59e0b', textColor: '#000000', radius: 99, url: '', action: 'link', enabled: true },
];

export const DEFAULT_BUTTONS_COCOA: AppButton[] = [
  { id: 'keep', label: 'キープ', text: 'キープする', bgColor: '#c9814a', textColor: '#ffffff', radius: 99, url: '', action: 'keep', enabled: true },
  { id: 'detail', label: 'お店詳細', text: 'お店の詳細を見る', bgColor: '#5c4033', textColor: '#ffffff', radius: 99, url: '', action: 'link', enabled: true },
  { id: 'custom1', label: 'カスタム1', text: '', bgColor: '#2563eb', textColor: '#ffffff', radius: 99, url: '', action: 'link', enabled: false },
  { id: 'custom2', label: 'カスタム2', text: '', bgColor: '#059669', textColor: '#ffffff', radius: 99, url: '', action: 'link', enabled: false },
];

export const PRESETS = [
  { name: 'ピンク', bg: '#ff3366', text: '#ffffff' },
  { name: 'インディゴ', bg: '#4f46e5', text: '#ffffff' },
  { name: 'パープル', bg: '#7c3aed', text: '#ffffff' },
  { name: 'ゴールド', bg: '#f59e0b', text: '#000000' },
  { name: 'グリーン', bg: '#059669', text: '#ffffff' },
  { name: 'スカイ', bg: '#0ea5e9', text: '#ffffff' },
  { name: 'チョコ', bg: '#c9814a', text: '#ffffff' },
  { name: 'ブラック', bg: '#111111', text: '#ffffff' },
];
