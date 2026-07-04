export type SiteType = 'vanilla' | 'cocoa' | null;
export type ShopType = 'chanko' | 'kakuteru' | null;

export interface ShopData {
  id?: string;
  autonum?: string;
  reviewUrl?: string;
  vanillaUrl?: string;
  goldUrl?: string;
  shopUrl?: string;
}

export interface SiteData {
  label: string;
  keepType: string;
  keepUrl?: string;
  shops: {
    chanko: ShopData;
    kakuteru: ShopData;
  };
}

export interface AppButton {
  id: string;
  label: string;
  text: string;
  bgColor: string;
  textColor: string;
  radius: number;
  url: string;
  action: 'keep' | 'link';
  enabled: boolean;
}

export interface AppState {
  site: SiteType;
  shop: ShopType;
  images: { id: string; url: string }[];
  buttons: AppButton[];
  currentStep: number;
  maxReached: number;
}
