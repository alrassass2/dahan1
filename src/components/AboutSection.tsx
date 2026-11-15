import React from 'react';
import {
  CheckCircle2,
  Award,
  Phone,
  MessageCircle,
  MapPin
} from 'lucide-react';
import { ABOUT_TEXT, ABOUT_TEXT_EN, CONTACT_INFO } from '../data/websiteContent';
import officialLogoImg from '../assets/images/official_logo.webp';
import aboutJeddahImg from '../assets/images/about_jeddah_identity.jpg';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const currentAbout = language === 'ar' ? ABOUT_TEXT : ABOUT_TEXT_EN;

  return (
    <section
      id="about"
      className="py-16 sm:py-20 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-slate-100 dark:border-slate-800/80"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Column: Text & Core Pillars */}
          <div className={`lg:col-span-7 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 border border-amber-300/80 shadow-md shrink-0 flex items-center justify-center">
                <img
                  src={officialLogoImg}
                  alt={language === 'ar' ? 'هوية وشعار معلم دهانات وترميم جدة' : 'Jeddah Painter & Renovation Brand Identity'}
                  width={80}
                  height={70}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-sm font-semibold mb-2">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t.aboutBadge}</span>
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {t.brandName} • {t.officialAddress}
                </p>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] dark:text-white tracking-tight mb-4">
              {t.aboutTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 via-amber-500 to-amber-700 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
                {t.aboutTitleHighlight}
              </span>
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8">
              {currentAbout.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Why Choose Us Points */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-lg font-bold text-[#0f2b5c] dark:text-amber-300 mb-4">
                {t.aboutWhyTitle}
              </h3>
              <ul className="space-y-3">
                {currentAbout.whyChooseUs.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ar' ? `تواصل عبر واتساب (${CONTACT_INFO.phone})` : `WhatsApp (${CONTACT_INFO.phone})`}</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.internationalPhone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0f2b5c] hover:bg-[#13356e] text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>{language === 'ar' ? `اتصال مباشر (${CONTACT_INFO.phone})` : `Call Us (${CONTACT_INFO.phone})`}</span>
              </a>
            </div>
          </div>

          {/* Side Column: Brand Identity Showcase Card & Highlights */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="bg-gradient-to-b from-[#0f2b5c] to-[#0a1f44] rounded-3xl p-5 sm:p-7 text-white shadow-2xl border border-amber-400/20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="w-full mx-auto mb-5 rounded-2xl overflow-hidden bg-slate-900 shadow-xl border-2 border-amber-400/75 aspect-[16/10] relative group">
                  <img
                    src={aboutJeddahImg}
                    alt={
                      language === 'ar'
                        ? 'معلم دهانات وترميم جدة - حي المروة - دهانات وديكورات وترميم وصيانة 0507478126'
                        : 'Jeddah Painter & Renovation Master - Al-Marwah Jeddah - Painting, Decor & Maintenance 0507478126'
                    }
                    width={960}
                    height={540}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <h3 className="text-2xl font-black text-amber-300 mb-1">
                  {t.brandName}
                </h3>
                <p className="text-xs text-slate-300 mb-6 flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.officialAddress}</span>
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {currentAbout.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center"
                    >
                      <div className="text-xl sm:text-2xl font-black text-amber-400 mb-1" dir="ltr">
                        {item.value}
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coverage Banner */}
                <div className={`mt-6 pt-6 border-t border-white/10 ${isRtl ? 'text-right' : 'text-left'} text-xs text-slate-300 flex items-center justify-between gap-2`}>
                  <span className="text-amber-300 font-bold shrink-0">{language === 'ar' ? 'نطاق الخدمة:' : 'Service Area:'}</span>
                  <span>{language === 'ar' ? CONTACT_INFO.coverage : CONTACT_INFO.coverageEn}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
