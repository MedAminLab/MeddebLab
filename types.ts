
export enum Language {
  FR = 'fr',
  AR = 'ar'
}

export interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
  isCurrent?: boolean;
}

export interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio?: string;
}

export interface Reciter {
  id: string;
  name: string;
  identifier: string;
}

export interface Dua {
  id: number;
  category_fr: string;
  category_ar: string;
  title_fr: string;
  title_ar: string;
  text_ar: string;
  text_fr: string;
}
