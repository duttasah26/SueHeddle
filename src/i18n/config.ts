export const LANGUAGES = [
  { code: 'en', name: 'English',  dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'zh', name: '中文',      dir: 'ltr' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ',    dir: 'ltr' },
  { code: 'la', name: 'Latina',   dir: 'ltr' },
  { code: 'fa', name: 'فارسی',    dir: 'rtl' },
  { code: 'ar', name: 'العربية',  dir: 'rtl' },
] as const;

export type LangCode = typeof LANGUAGES[number]['code'];
