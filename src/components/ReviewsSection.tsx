import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Wrench,
  Sparkles,
  Clock,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Phone
} from 'lucide-react';
import {
  WORK_ADVANTAGES,
  EXECUTION_STAGES,
  FAQS_LIST,
  CONTACT_INFO
} from '../data/websiteContent';
import { SeoTopicsSection } from './SeoTopicsSection';
import { useLanguage } from '../context/LanguageContext';

export interface ReviewsSectionProps {
  hideHeader?: boolean;
  onNavigate?: (page: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ hideHeader = false, onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string>(FAQS_LIST[0]?.id || '');

  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6" />,
  };

  return (
    <section
      id="quality"
      className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Work Advantages (مميزات العمل) */}
        <div>
          {!hideHeader && (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.homeAdvantagesBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] dark:text-white tracking-tight mb-4">
                {t.homeAdvantagesTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.homeAdvantagesDesc}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORK_ADVANTAGES.map((adv) => (
              <div
                key={adv.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 ${isRtl ? 'text-right' : 'text-left'} group`}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {iconMap[adv.iconName] || <CheckCircle2 className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-extrabold text-[#0f2b5c] dark:text-white mb-2">
                  {language === 'ar' ? adv.title : adv.titleEn}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'ar' ? adv.description : adv.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Execution Stages (مراحل تنفيذ الخدمة) */}
        <div className="bg-gradient-to-br from-[#0f2b5c] to-[#0a1f44] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-amber-400/20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs sm:text-sm font-bold mb-3">
              <ClipboardCheck className="w-4 h-4 text-amber-400" />
              <span>{t.homeStagesBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              {t.homeStagesTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              {t.homeStagesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXECUTION_STAGES.map((stage) => (
              <div
                key={stage.step}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-400/50 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500 text-slate-950 font-black text-base mb-4 shadow">
                  {stage.step}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-amber-300 mb-2">
                  {language === 'ar' ? stage.title : stage.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {language === 'ar' ? stage.description : stage.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Technical Guides & Finish Matrix */}
        <SeoTopicsSection onNavigate={onNavigate || ((page) => { window.location.hash = page; })} />

        {/* Frequently Asked Questions (الأسئلة الشائعة) */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-sky-300 text-sm font-semibold mb-3">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>{t.homeFaqBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f2b5c] dark:text-white mb-2">
              {t.homeFaqTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {t.homeFaqDesc}
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS_LIST.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className={`w-full flex items-center justify-between gap-4 p-5 ${isRtl ? 'text-right' : 'text-left'} cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors`}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0f2b5c] dark:text-white">
                      {language === 'ar' ? faq.question : faq.questionEn}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className={`px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? faq.answer : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'ar' ? `استشارة سريعة عبر واتساب (${CONTACT_INFO.phone})` : `WhatsApp Consultation (${CONTACT_INFO.phone})`}</span>
            </a>
            <a
              href={`tel:${CONTACT_INFO.internationalPhone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0f2b5c] hover:bg-[#173a7a] text-white text-sm font-bold shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? `اتصل بنا الآن: ${CONTACT_INFO.phone}` : `Call Now: ${CONTACT_INFO.phone}`}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
