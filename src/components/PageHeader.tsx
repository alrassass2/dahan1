import React from 'react';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import officialLogoImg from '../assets/images/official_logo.webp';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
  onBackToHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  onBackToHome,
}) => {
  const { isRtl, language, t } = useLanguage();

  return (
    <div className="pt-28 pb-10 bg-gradient-to-b from-[#0f2b5c]/5 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button
              onClick={onBackToHome}
              className="hover:text-[#0f2b5c] dark:hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className="text-amber-700 dark:text-amber-400 font-bold">{title}</span>
          </div>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-300 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
          >
            <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
            {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Title Area + Official Identity Seal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className={`max-w-3xl ${isRtl ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-200/70 dark:border-amber-800/50">
              {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] dark:text-white tracking-tight mb-3">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-800/40 shadow-md shrink-0">
            <img
              src={officialLogoImg}
              alt={t.brandName}
              width={72}
              height={62}
              loading="eager"
              decoding="async"
              className="w-16 h-14 object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
