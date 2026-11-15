import React from 'react';
import {
  Paintbrush,
  Building2,
  Sparkles,
  Wrench,
  ArrowLeft,
  ArrowRight,
  MapPin,
  MessageCircle,
  Phone,
  Award,
  ShieldCheck,
  Clock,
  ClipboardCheck,
  BookOpen,
  Images
} from 'lucide-react';
import { CONTACT_INFO, WORK_ADVANTAGES, EXECUTION_STAGES } from '../data/websiteContent';
import { ShowcasePresentation } from './ShowcasePresentation';
import officialLogoImg from '../assets/images/official_logo.webp';
import { useLanguage } from '../context/LanguageContext';

interface HomeSectionsPreviewProps {
  onNavigate: (page: string) => void;
}

export const HomeSectionsPreview: React.FC<HomeSectionsPreviewProps> = ({ onNavigate }) => {
  const { t, isRtl, language } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const servicePillars = language === 'ar'
    ? [
        {
          id: 'interior',
          icon: <Paintbrush className="w-6 h-6" />,
          title: 'الدهانات الداخلية وتجديد الدهانات',
          desc: 'تنفيذ دهانات داخلية جدة بأحدث درجات الألوان الهادئة والمقاومة للغسيل مع تجديد دهانات جدة للشقق والفلل.',
          target: 'services'
        },
        {
          id: 'exterior',
          icon: <Building2 className="w-6 h-6" />,
          title: 'الدهانات الخارجية والواجهات',
          desc: 'طلاء وتأسيس الواجهات بخامات دهانات خارجية جدة وبروفايل عازل يتحمل الحرارة والرطوبة الساحلية.',
          target: 'services'
        },
        {
          id: 'decor',
          icon: <Sparkles className="w-6 h-6" />,
          title: 'الديكورات الحديثة وورق الجدران',
          desc: 'تركيب بديل الخشب وبديل الرخام وبراويز الفوم وورق الجدران ضمن أعمال دهانات وديكورات جدة.',
          target: 'services'
        },
        {
          id: 'renovation',
          icon: <Wrench className="w-6 h-6" />,
          title: 'ترميم وصيانة المنازل والفلل',
          desc: 'خدمات ترميم منازل جدة وترميم فلل جدة وصيانة منازل جدة ومعالجة التشققات والرطوبة جذرياً.',
          target: 'services'
        }
      ]
    : [
        {
          id: 'interior',
          icon: <Paintbrush className="w-6 h-6" />,
          title: 'Interior Paints & Renewal',
          desc: 'Washable luxury matte and silk interior finishes for apartments, homes, and villas in Jeddah.',
          target: 'services'
        },
        {
          id: 'exterior',
          icon: <Building2 className="w-6 h-6" />,
          title: 'Exterior & Facade Painting',
          desc: 'Weather-shield exterior and textured profile coatings built for Jeddah coastal heat and humidity.',
          target: 'services'
        },
        {
          id: 'decor',
          icon: <Sparkles className="w-6 h-6" />,
          title: 'Wall Decors & Wallpaper',
          desc: 'WPC fluted wood, PVC marble panels, foam moldings, and modern wallpaper styling.',
          target: 'services'
        },
        {
          id: 'renovation',
          icon: <Wrench className="w-6 h-6" />,
          title: 'Home & Villa Renovation',
          desc: 'Structural crack repair, moisture sealing, ceiling maintenance, and full home refurbishment.',
          target: 'services'
        }
      ];

  const featuredAdvantages = WORK_ADVANTAGES.slice(0, 3);
  const advantageIcons: Record<string, React.ReactNode> = {
    Award: <Award className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    Wrench: <Wrench className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Clock: <Clock className="w-5 h-5" />,
  };

  return (
    <div className="space-y-16 py-12" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. CONCISE CORE SPECIALTIES (4 Pillars -> Routes cleanly to Full Services Page) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800/50">
              {t.homeServicesBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] dark:text-white mt-2">
              {language === 'ar'
                ? 'تخصصاتنا في الدهانات والديكورات وترميم المنازل بجدة'
                : t.homeServicesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              {language === 'ar'
                ? 'نظرة سريعة على مجالات العمل الأساسية، ويمكنك استعراض تفاصيل جميع الخدمات التسع من قائمة خدماتنا.'
                : 'A quick overview of our core fields—explore all 9 specialized services on the Services page.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#163b7a] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.homeServicesAllBtn}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicePillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onNavigate(pillar.target)}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-100 dark:border-amber-800/50 group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0f2b5c] dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                <span>{t.homeServiceDetailsBtn}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SIGNATURE VISUAL PRESENTATION SHOWCASE */}
      <ShowcasePresentation onNavigate={onNavigate} />

      {/* 3. CONCISE QUALITY HIGHLIGHTS & 4-STEP PROCESS (Links to Quality & Expert Guides Page) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Quality Pillars Summary */}
          <div className={`lg:col-span-7 bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 px-3 py-1 rounded-full">
                    {t.homeAdvantagesBadge}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2b5c] dark:text-white mt-2">
                    {t.homeAdvantagesTitle}
                  </h2>
                </div>
              </div>

              <div className="space-y-3.5 mb-6">
                {featuredAdvantages.map((adv) => (
                  <div
                    key={adv.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      {advantageIcons[adv.iconName] || <Award className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0f2b5c] dark:text-white">
                        {language === 'ar' ? adv.title : adv.titleEn}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {language === 'ar' ? adv.description : adv.descriptionEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('quality')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#173c7a] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'الدليل الفني والمواضيع والأسئلة الشائعة' : 'Quality, Guides & FAQs'}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <Images className="w-4 h-4 text-amber-600" />
                <span>{t.navPortfolio}</span>
              </button>
            </div>
          </div>

          {/* 4-Step Workflow Summary */}
          <div className={`lg:col-span-5 bg-gradient-to-br from-[#0f2b5c] to-[#0a1f44] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-400/20 flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-2">
                <ClipboardCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.homeStagesBadge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-5">
                {t.homeStagesTitle}
              </h2>

              <div className="space-y-3.5">
                {EXECUTION_STAGES.map((stage) => (
                  <div
                    key={stage.step}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                      {stage.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-amber-300">
                        {language === 'ar' ? stage.title : stage.titleEn}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed line-clamp-2">
                        {language === 'ar' ? stage.description : stage.descriptionEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="mt-6 w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 text-xs sm:text-sm font-bold border border-white/15 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{language === 'ar' ? 'تعرّف أكثر على فريقنا ومنهجية العمل' : 'Learn More About Us'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CONCISE JEDDAH LOCATION & DIRECT CONTACT CALLOUT */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-[#0f2b5c] text-white rounded-3xl p-6 sm:p-9 relative overflow-hidden shadow-xl border border-amber-400/20 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="hidden sm:flex w-20 h-16 rounded-2xl bg-white p-1.5 border border-amber-300/70 shadow-lg shrink-0 items-center justify-center">
                <img
                  src={officialLogoImg}
                  alt={t.brandName}
                  width={80}
                  height={68}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.officialAddress}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold mb-1.5">
                  {language === 'ar'
                    ? 'نخدم جميع أحياء مدينة جدة – المملكة العربية السعودية'
                    : t.homeLocationTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {language === 'ar'
                    ? 'اطلع على موقعنا الحقيقي على خرائط Google وأحياء جدة المخدومة، أو انتقل إلى صفحة التواصل لتعبئة نموذج طلب الخدمة.'
                    : t.homeLocationDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('location')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4" />
                <span>{t.homeLocationOpenMapBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{t.navContact}</span>
              </button>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.homeLocationWhatsAppBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
