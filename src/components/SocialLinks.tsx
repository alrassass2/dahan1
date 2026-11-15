import React from 'react';
import { SOCIAL_LINKS, SocialLinkItem } from '../data/websiteContent';
import { useLanguage } from '../context/LanguageContext';

interface SocialLinksProps {
  variant?: 'floating' | 'pills' | 'icons' | 'compact' | 'cards';
  showLabels?: boolean;
  darkSurface?: boolean;
  title?: string;
  className?: string;
}

const getLocalizedPlatformName = (id: string, defaultName: string, language: 'ar' | 'en'): string => {
  if (language === 'ar') return defaultName;
  switch (id) {
    case 'maps':
      return 'Google Maps';
    case 'tiktok':
      return 'TikTok';
    case 'instagram':
      return 'Instagram';
    case 'snapchat':
      return 'Snapchat';
    case 'whatsapp':
      return 'WhatsApp';
    case 'phone':
      return 'Call';
    default:
      return defaultName;
  }
};

const getLocalizedPlatformDesc = (id: string, defaultDesc: string, language: 'ar' | 'en'): string => {
  if (language === 'ar') return defaultDesc;
  switch (id) {
    case 'maps':
      return 'Our location on Google Maps';
    case 'tiktok':
      return 'Paints & decor showcase videos';
    case 'instagram':
      return 'Photo gallery & color coordination';
    case 'snapchat':
      return 'Daily work updates in Jeddah';
    case 'whatsapp':
      return 'Instant WhatsApp consultation';
    case 'phone':
      return 'Direct call: 0507478126';
    default:
      return defaultDesc;
  }
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'floating',
  showLabels = true,
  darkSurface = false,
  title,
  className = ''
}) => {
  const { language, isRtl } = useLanguage();

  const renderBrandSvg = (id: string, classNameStr = 'w-6 h-6') => {
    switch (id) {
      case 'maps':
        return (
          <svg viewBox="0 0 24 24" className={classNameStr} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-7.2 8-13a8 8 0 1 0-16 0c0 5.8 8 13 8 13z" fill="currentColor" fillOpacity="0.2" />
            <circle cx="12" cy="9" r="3" fill="currentColor" />
          </svg>
        );
      case 'tiktok':
        return (
          <svg viewBox="0 0 24 24" className={classNameStr} fill="currentColor">
            <path d="M19.6 7.2a6.8 6.8 0 0 1-4.1-1.4v9.1a6.2 6.2 0 1 1-6.2-6.2c.4 0 .8 0 1.2.1v3.4a3 3 0 1 0 1.6 2.7V2h3.4a6.8 6.8 0 0 0 4.1 3.2v2z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" className={classNameStr} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        );
      case 'snapchat':
        return (
          <svg viewBox="0 0 24 24" className={classNameStr} fill="currentColor">
            <path d="M12 2c-3 0-4.5 2.3-4.5 5.3 0 1 .1 2 .2 2.8-.6.4-1.5.1-2.1-.4-.5-.4-1-.2-1.1.4-.1.6.7 1.2 1.7 1.4.7.2 1.1.5.9 1.2-.5 1.7-2.4 2.6-4 3-.7.2-.7.9 0 1.1 1.2.3 2.1.6 2.7 1.5.5.7 1.1.8 1.9.6 1.2-.3 2.3-.1 3.3.7.7.5 1.5.5 2.2 0 1-.8 2.1-1 3.3-.7.8.2 1.4.1 1.9-.6.6-.9 1.5-1.2 2.7-1.5.7-.2.7-.9 0-1.1-1.6-.4-3.5-1.3-4-3-.2-.7.2-1 .9-1.2 1-.2 1.8-.8 1.7-1.4-.1-.6-.6-.8-1.1-.4-.6.5-1.5.8-2.1.4.1-.8.2-1.8.2-2.8C16.5 4.3 15 2 12 2z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg viewBox="0 0 24 24" className={classNameStr} fill="currentColor">
            <path d="M20 3.9A11 11 0 0 0 2.7 17.1L1 23l6-1.6A11 11 0 0 0 20 3.9zM12 20a9 9 0 0 1-4.6-1.3l-.3-.2-3.5.9.9-3.4-.2-.4A9 9 0 1 1 12 20zm5-6.7c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1a7.3 7.3 0 0 1-2.2-1.3 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.4 5.3 4.7 2.5 1.1 3.1.9 3.7.9.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.2-.6-.3z" />
          </svg>
        );
      case 'phone':
      default:
        return (
          <svg viewBox="0 0 24 24" className={classNameStr} fill="currentColor">
            <path d="M6.6 2h3l1.5 5-2 1.5a16 16 0 0 0 6.4 6.4l1.5-2 5 1.5v3c0 1.1-.9 2-2 2C10.6 21.4 2.6 13.4 2.6 4c0-1.1.9-2 2-2z" />
          </svg>
        );
    }
  };

  if (variant === 'floating') {
    const headingText = title || (language === 'ar' ? 'تواصل معنا عبر منصاتنا' : 'Connect With Us On Social Platforms');

    return (
      <div
        className={`w-full max-w-[740px] mx-auto py-5 px-3 text-center ${className}`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <h4
          className={`text-base sm:text-lg font-extrabold mb-6 ${
            darkSurface ? 'text-white' : 'text-[#0f2b5c] dark:text-white'
          }`}
        >
          {headingText}
        </h4>

        <div className="grid grid-cols-3 gap-x-4 gap-y-5 sm:flex sm:justify-center sm:items-center sm:flex-wrap sm:gap-6 max-w-[320px] sm:max-w-[740px] mx-auto justify-items-center">
          {SOCIAL_LINKS.map((link: SocialLinkItem) => {
            const label = getLocalizedPlatformName(link.id, link.name, language);
            const isExternal = !link.url.startsWith('tel:');
            const iconTextColor = link.id === 'snapchat' ? 'text-slate-900' : 'text-white';
            const circleClass = link.id === 'instagram' ? 'social-float-circle-instagram' : 'social-float-circle';

            return (
              <a
                key={link.id}
                href={link.url}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={label}
                title={`${label} - ${getLocalizedPlatformDesc(link.id, link.description, language)}`}
                style={{ '--brand': link.color } as React.CSSProperties}
                className="social-float-item w-[72px] min-h-[84px] sm:min-h-[90px] flex flex-col items-center justify-start gap-2.5 no-underline cursor-pointer"
              >
                <div
                  className={`${circleClass} w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] rounded-full flex items-center justify-center p-3.5 ${iconTextColor} border border-white/20`}
                >
                  {renderBrandSvg(link.id, 'w-full h-full')}
                </div>
                {showLabels && (
                  <span
                    className={`social-float-label text-xs font-bold whitespace-nowrap transition-colors ${
                      darkSurface ? 'text-slate-200' : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {label}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'icons') {
    return (
      <div className={`flex items-center gap-3 sm:gap-2.5 flex-wrap ${className}`}>
        {SOCIAL_LINKS.map((link) => {
          const isExternal = !link.url.startsWith('tel:');
          const label = getLocalizedPlatformName(link.id, link.name, language);
          const iconTextColor = link.id === 'snapchat' ? 'text-slate-900' : 'text-white';
          return (
            <a
              key={link.id}
              href={link.url}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              title={`${label} - ${getLocalizedPlatformDesc(link.id, link.description, language)}`}
              className={`p-2.5 rounded-xl ${iconTextColor} shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110 active:scale-95 ${link.bgColor} flex items-center justify-center`}
            >
              {renderBrandSvg(link.id, 'w-5 h-5')}
              <span className="sr-only">{label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
        {SOCIAL_LINKS.map((link) => {
          const isExternal = !link.url.startsWith('tel:');
          const label = getLocalizedPlatformName(link.id, link.name, language);
          return (
            <a
              key={link.id}
              href={link.url}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              title={`${label} (${link.username})`}
              className="px-2.5 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-sky-600/30 hover:border-sky-400 shadow-xs"
            >
              {renderBrandSvg(link.id, 'w-4 h-4')}
              <span>{label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 ${className}`}>
        {SOCIAL_LINKS.map((link) => {
          const isExternal = !link.url.startsWith('tel:');
          const label = getLocalizedPlatformName(link.id, link.name, language);
          const desc = getLocalizedPlatformDesc(link.id, link.description, language);
          const iconTextColor = link.id === 'snapchat' ? 'text-slate-900' : 'text-white';
          return (
            <a
              key={link.id}
              href={link.url}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl ${iconTextColor} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform ${link.bgColor}`}>
                {renderBrandSvg(link.id, 'w-6 h-6')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0f2b5c] dark:group-hover:text-amber-400 transition-colors">{label}</h4>
                  <span className="text-xs text-slate-400 font-mono truncate" dir="ltr">{link.username}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{desc}</p>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // 'pills'
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const isExternal = !link.url.startsWith('tel:');
        const label = getLocalizedPlatformName(link.id, link.name, language);
        const iconTextColor = link.id === 'snapchat' ? 'text-slate-900' : 'text-white';
        return (
          <a
            key={link.id}
            href={link.url}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold ${iconTextColor} shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${link.bgColor}`}
          >
            {renderBrandSvg(link.id, 'w-4 h-4')}
            {showLabels && <span>{label}</span>}
          </a>
        );
      })}
    </div>
  );
};
