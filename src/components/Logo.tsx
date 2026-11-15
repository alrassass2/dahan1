import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import officialLogoImg from '../assets/images/official_logo.webp';

interface LogoProps {
  variant?: 'full' | 'mark' | 'compact' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isLight?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'compact',
  size = 'md',
  className = '',
  isLight = false,
}) => {
  const { language } = useLanguage();

  const sizeMap = {
    sm: { icon: 42, text: 'text-sm sm:text-base', sub: 'text-[10px]' },
    md: { icon: 50, text: 'text-base sm:text-lg', sub: 'text-[11px]' },
    lg: { icon: 72, text: 'text-xl sm:text-2xl', sub: 'text-xs' },
    xl: { icon: 96, text: 'text-2xl sm:text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  const responsiveBadgeClass =
    size === 'md'
      ? 'w-9 h-9 sm:w-[50px] sm:h-[50px]'
      : size === 'sm'
      ? 'w-9 h-9 sm:w-[42px] sm:h-[42px]'
      : '';

  const EmblemBadge = (
    <div
      className={`relative shrink-0 rounded-2xl overflow-hidden shadow-sm border border-amber-400/60 bg-white flex items-center justify-center transition-transform duration-300 hover:scale-105 p-0.5 ${responsiveBadgeClass}`}
      style={responsiveBadgeClass ? undefined : { width: currentSize.icon, height: currentSize.icon }}
    >
      <img
        src={officialLogoImg}
        alt={language === 'ar' ? 'شعار معلم دهانات وترميم جدة' : 'Jeddah Painter & Renovation Master Logo'}
        width={currentSize.icon}
        height={currentSize.icon}
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  );

  if (variant === 'badge' || variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {EmblemBadge}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 min-w-0 ${className}`}>
      {EmblemBadge}
      <div className={`flex flex-col select-none min-w-0 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <span
          className={`font-black tracking-tight leading-tight transition-colors duration-200 truncate max-w-[138px] xs:max-w-[165px] sm:max-w-none ${
            currentSize.text
          } ${isLight ? 'text-white' : 'text-[#0f2b5c] dark:text-white'}`}
          style={{ textShadow: isLight ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}
        >
          {language === 'ar' ? 'معلم دهانات وترميم جدة' : 'Jeddah Painter & Renovation'}
        </span>
        <span
          className={`hidden sm:block font-bold tracking-wide transition-colors duration-200 ${
            currentSize.sub
          } ${isLight ? 'text-amber-300' : 'text-amber-600 dark:text-amber-400'}`}
        >
          {language === 'ar' ? 'دهانات وديكورات وتشطيبات وترميم المنازل' : 'Paints, Decors & Home Renovation'}
        </span>
      </div>
    </div>
  );
};
