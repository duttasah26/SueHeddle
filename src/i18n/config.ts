export const LANGUAGES = [
  { code: 'en', name: 'English',  dir: 'ltr' },
  { code: 'ar', name: 'العربية',  dir: 'rtl' },
  { code: 'es', name: 'Español',  dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी',    dir: 'ltr' },
  { code: 'ko', name: '한국어',     dir: 'ltr' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ',    dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ru', name: 'Русский',  dir: 'ltr' },
  { code: 'tl', name: 'Tagalog',  dir: 'ltr' },
  { code: 'uk', name: 'Українська', dir: 'ltr' },
  { code: 'ur', name: 'اردو',     dir: 'rtl' },
  { code: 'zh', name: '中文',      dir: 'ltr' },
] as const;

export type LangCode = typeof LANGUAGES[number]['code'];
