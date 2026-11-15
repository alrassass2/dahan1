import React from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Images,
  Layers,
  Send
} from 'lucide-react';
import { CONTACT_INFO } from '../data/websiteContent';
import officialLogoImg from '../assets/images/official_logo.webp';
import aboutJeddahImg from '../assets/images/about_jeddah_identity.jpg';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, isRtl, language } = useLanguage();

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mt-20"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Column */}
          <div className={`lg:col-span-7 ${isRtl ? 'text-right' : 'text-left'}`}>
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/50 text-amber-900 dark:text-amber-300 text-xs sm:text-sm font-bold mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t.officialAddress}</span>
            </div>

            {/* Clear H1 Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f2b5c] dark:text-white tracking-tight leading-[1.2] mb-5">
              <span className="animate-navy-shimmer inline-block">{t.heroTitle}</span>{' '}
              <br className="hidden sm:inline" />
              <span className="animate-title-shimmer inline-block mt-1 text-2xl sm:text-3xl lg:text-4xl">
                {language === 'ar'
                  ? 'دهانات وديكورات وتشطيبات وترميم المنازل'
                  : 'Paints, Decors & Home Renovation'}
              </span>
            </h1>

            {/* Marketing Slogan & Description */}
            <p className="text-base sm:text-xl text-amber-700 dark:text-amber-400 font-extrabold leading-relaxed max-w-2xl mb-3">
              {t.heroSlogan}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mb-7">
              {language === 'ar'
                ? 'نقدم خدمات متكاملة في مدينة جدة تشمل الدهانات الداخلية والخارجية، الديكورات الجدارية، ورق الجدران، بديل الخشب والرخام، معالجة التشققات والرطوبة، وترميم وصيانة المنازل والفلل والشقق.'
                : 'Integrated residential painting, wall decor, wallpaper, fluted wood & marble panels, crack/moisture repair, and home renovation across Jeddah.'}
            </p>

            {/* Key Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.heroProposition1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.heroProposition2}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.heroProposition3}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.heroProposition4}</span>
              </div>
            </div>

            {/* Action Buttons: Call, Request Service (WhatsApp/Form), Portfolio, Services */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                id="hero-call-cta"
                href={`tel:${CONTACT_INFO.internationalPhone}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#0f2b5c] hover:bg-[#173a7a] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-950/20 transition-all group"
                title={`اتصال مباشر: ${CONTACT_INFO.phone}`}
              >
                <Phone className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>{language === 'ar' ? `اتصل الآن (${CONTACT_INFO.phone})` : `Call Now (${CONTACT_INFO.phone})`}</span>
              </a>

              <a
                id="hero-whatsapp-cta"
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/25 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{language === 'ar' ? 'اطلب الخدمة عبر واتساب' : 'Request via WhatsApp'}</span>
              </a>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.heroCtaRequest}</span>
              </button>

              <div className="grid grid-cols-2 sm:flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 hover:text-amber-800 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
                >
                  <Images className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t.heroCtaPortfolio}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  <span>{t.navServices}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Left/End Column: Official Storefront Identity Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/90 dark:border-slate-800 relative overflow-hidden text-center">
                {/* Official Storefront Photo */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5 border border-slate-200 dark:border-slate-700 shadow-md group bg-slate-900">
                  <img
                    src={aboutJeddahImg}
                    alt={
                      language === 'ar'
                        ? 'معلم دهانات وترميم جدة - حي المروة - دهانات وديكورات وترميم وصيانة 0507478126'
                        : 'Jeddah Painter & Renovation Master - Al-Marwah Jeddah - Painting, Decor & Maintenance 0507478126'
                    }
                    width={1164}
                    height={636}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2 text-white">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black shadow">
                      {language === 'ar' ? 'جدة – السعودية' : 'Jeddah, KSA'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold border border-white/20" dir="ltr">
                      {CONTACT_INFO.phone}
                    </span>
                  </div>
                </div>

                {/* Clean Official Brand Identity Lockup */}
                <div className="flex items-center justify-center gap-3.5 mb-4">
                  <div className="w-16 h-14 sm:w-20 sm:h-16 rounded-2xl bg-white p-1 border border-amber-300/90 shadow-sm shrink-0 flex items-center justify-center">
                    <img
                      src={officialLogoImg}
                      alt={t.brandName}
                      width={80}
                      height={64}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h2 className="text-base sm:text-lg font-black text-[#0f2b5c] dark:text-white leading-tight">
                      {t.brandName}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {t.officialAddress}
                    </p>
                  </div>
                </div>

                {/* Capability Highlights (Zero Fake Counts) */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/70 text-center mb-4">
                  <div>
                    <span className="block text-sm font-black text-[#0f2b5c] dark:text-amber-400">9</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                      {language === 'ar' ? 'خدمات متكاملة' : 'Core Services'}
                    </span>
                  </div>
                  <div className="border-x border-slate-200 dark:border-slate-700">
                    <span className="block text-sm font-black text-amber-600 dark:text-amber-400">
                      {language === 'ar' ? 'ترميم' : 'Repair'}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                      {language === 'ar' ? 'تشققات ورطوبة' : 'Cracks & Damp'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {language === 'ar' ? 'جدة' : 'Jeddah'}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                      {language === 'ar' ? 'تغطية الأحياء' : 'All Districts'}
                    </span>
                  </div>
                </div>

                {/* Quick Nav Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('quality')}
                    className="py-2.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/50 transition-colors cursor-pointer"
                  >
                    {t.navQuality}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('location')}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {t.navLocation}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
