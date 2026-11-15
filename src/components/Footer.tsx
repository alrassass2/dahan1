import React from 'react';
import {
  Phone,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Tag,
  MessageCircle,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import officialLogoImg from '../assets/images/official_logo.webp';
import { SocialLinks } from './SocialLinks';
import { CONTACT_INFO, SERVICES_DATA, JEDDAH_DISTRICTS_SECTORS } from '../data/websiteContent';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenDeveloperPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDeveloperPortal }) => {
  const { t, isRtl, language } = useLanguage();

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: t.navHome, id: 'home' },
    { name: t.navServices, id: 'services' },
    { name: t.navPortfolio, id: 'portfolio' },
    { name: t.navQuality, id: 'quality' },
    { name: t.navAbout, id: 'about' },
    { name: t.navLocation, id: 'location' },
    { name: t.navContact, id: 'contact' },
  ];

  const seoKeywords = language === 'ar'
    ? [
        'معلم دهانات جدة',
        'معلم دهان جدة',
        'معلم بوية جدة',
        'أفضل معلم دهانات في جدة',
        'رقم معلم دهان جدة',
        'فني دهانات جدة',
        'مقاول دهانات جدة',
        'شركة دهانات جدة',
        'دهانات جدة',
        'بوية جدة',
        'دهانات وديكورات جدة',
        'دهانات داخلية جدة',
        'دهانات خارجية جدة',
        'دهان واجهات فلل جدة',
        'دهان بروفايل جدة',
        'رشة أمريكية جدة',
        'دهان كسر رخام جدة',
        'دهان جرافيت واجهات',
        'دهانات جوتن جدة',
        'دهانات الجزيرة جدة',
        'دهانات همبل جدة',
        'دهان مطفي وربع لمعة',
        'دهان حريري قابل للغسيل',
        'بوية بدون رائحة جدة',
        'دهان مجالس وصالات',
        'دهان غرف نوم وأطفال',
        'دهان أسقف وجبس بورد',
        'دهان أبواب خشب وحديد',
        'دهان مخملي وشامواه',
        'دهان إسمنتي وإستوكو',
        'ديكورات فوم وبانوهات جدة',
        'بديل الخشب جدة',
        'بديل الرخام جدة',
        'ورق جدران جدة',
        'خلفيات شاشات جدة',
        'دهان إيبوكسي جدة',
        'سعر متر الدهان في جدة',
        'أسعار الدهانات في جدة',
        'علاج رطوبة الجدران جدة',
        'معالجة التشققات والتمليح',
        'إزالة تقشر البوية والدهان',
        'معجون وصنفرة وتأسيس جدران',
        'تجديد دهانات جدة',
        'ترميم منازل جدة',
        'ترميم فلل جدة',
        'صيانة منازل جدة',
        'معلم ديكورات جدة',
        'معلم دهانات شمال وشرق جدة'
      ]
    : [
        'Jeddah Painter',
        'Jeddah Painting Master',
        'House Painter Jeddah',
        'Jotun Paints Jeddah',
        'Al-Jazeera Paints Jeddah',
        'Jeddah Paints & Decors',
        'Interior Painting Jeddah',
        'Exterior Facade Paint Jeddah',
        'Profile & Texture Jeddah',
        'Majlis & Living Hall Paint',
        'Bedroom Low-Odor Paint',
        'Decorative Velvet & Stucco',
        'Foam Boiserie Moldings',
        'Wood & Metal Door Painting',
        'Epoxy Floor Coating Jeddah',
        'WPC Wood Panels Jeddah',
        'PVC Marble Panels Jeddah',
        'Wallpaper Installation Jeddah',
        'Wall Crack Repair Jeddah',
        'Wall Dampness Repair Jeddah',
        'Home Renovation Jeddah',
        'Villa Renovation Jeddah',
        'Home Maintenance Jeddah',
        'North & South Jeddah Painter'
      ];

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <footer
      id="main-footer"
      className={`relative overflow-hidden bg-gradient-to-b from-[#0f2b5c] via-[#133979] to-[#0b2047] text-slate-100 pt-14 pb-8 border-t-2 border-amber-400/50 ${isRtl ? 'text-right' : 'text-left'} font-sans`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-sky-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-amber-400/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* FOOTER TOP ACTION STRIP */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-[#0b2149]/85 border border-amber-400/35 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold text-amber-300 mb-1">
              {t.brandName} • {t.officialAddress}
            </p>
            <h3 className="text-base sm:text-xl font-black text-white">
              {language === 'ar'
                ? 'نخدم جميع أحياء مدينة جدة في الدهانات والديكورات والترميم وصيانة المنازل'
                : 'Serving All Jeddah Districts for Painting, Wall Decor & Home Renovation'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
            >
              <span>{t.heroCtaRequest}</span>
            </button>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'ar' ? `واتساب: ${CONTACT_INFO.phone}` : `WhatsApp: ${CONTACT_INFO.phone}`}</span>
            </a>
            <a
              href={`tel:${CONTACT_INFO.internationalPhone}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* TOP SECTION: 4 COMPREHENSIVE COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-9 pb-10 border-b border-[#254d94]">
          {/* COLUMN 1: Brand Identity, Slogan & Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0 border border-amber-400/50">
                <img
                  src={officialLogoImg}
                  alt={t.brandName}
                  width={64}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  {t.brandName}
                </h3>
                <p className="text-xs text-amber-400 font-bold mt-0.5">
                  {t.brandTagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed pt-1">
              {t.footerAbout}
            </p>

            <p className="text-xs font-bold text-amber-300/90 italic">
              «{t.brandSubtagline}»
            </p>

            <div className="pt-2 space-y-2.5">
              <a
                href={`tel:${CONTACT_INFO.internationalPhone}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-amber-300 transition-colors group"
                dir="ltr"
              >
                <span className="font-mono text-[15px] text-slate-100 group-hover:text-amber-300 transition-colors">
                  {CONTACT_INFO.formattedPhone}
                </span>
                <Phone className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              </a>

              <div className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t.officialAddress}</span>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.footerWorkingHoursDetail}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Main Sections Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative pb-2 mb-1">
              <h4 className="text-white font-extrabold text-sm sm:text-base">
                {t.footerMainSectionsTitle}
              </h4>
              <div className="w-12 h-0.5 bg-amber-400/80 mt-1.5 rounded-full"></div>
            </div>

            <ul className="space-y-2 text-xs sm:text-[13px]">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-slate-300 hover:text-amber-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    <ChevronIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: All 10 Core Services */}
          <div className="lg:col-span-3 space-y-3">
            <div className="relative pb-2 mb-1">
              <h4 className="text-white font-extrabold text-sm sm:text-base">
                {language === 'ar' ? 'جميع الخدمات (9 خدمات)' : t.footerServicesTitle}
              </h4>
              <div className="w-12 h-0.5 bg-amber-400/80 mt-1.5 rounded-full"></div>
            </div>

            <ul className="space-y-1.5 text-xs">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleLinkClick(e, 'services')}
                    className="text-slate-300 hover:text-amber-300 transition-all flex items-center justify-between gap-2 group cursor-pointer py-0.5"
                  >
                    <span className="truncate group-hover:text-amber-300">
                      {language === 'ar' ? service.title : (service.titleEn || service.title)}
                    </span>
                    <ChevronIcon className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Jeddah Districts Coverage & Google Maps Card */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative pb-2 mb-1">
              <h4 className="text-white font-extrabold text-sm sm:text-base">
                {language === 'ar' ? 'أحياء جدة والموقع الرسمي' : t.footerCoverageTitle}
              </h4>
              <div className="w-12 h-0.5 bg-amber-400/80 mt-1.5 rounded-full"></div>
            </div>

            <div className="space-y-2">
              {JEDDAH_DISTRICTS_SECTORS.map((sec) => (
                <div key={sec.id} className="text-[11px] leading-relaxed">
                  <span className="font-bold text-amber-400 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{language === 'ar' ? sec.regionAr : sec.regionEn}:</span>
                  </span>{' '}
                  <span className="text-slate-300">
                    {(language === 'ar' ? sec.districtsAr : sec.districtsEn).slice(0, 5).join('، ')}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0a1d40]/80 border border-[#2b58a6] shadow-md space-y-2">
              <p className="text-xs font-bold text-amber-300">
                {language === 'ar' ? 'الاطلاع على موقعنا عبر خرائط Google:' : 'View Location on Google Maps:'}
              </p>
              <a
                href={CONTACT_INFO.googleMapsPrimaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                <span>{t.mapBtnGoogleMaps}</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
              <br />
              <a
                href={CONTACT_INFO.googleMapsSecondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-slate-200 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3 h-3 text-emerald-400" />
                <span>{language === 'ar' ? 'الرابط المباشر في تطبيق خرائط Google' : 'Direct Google Maps Link'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* SOCIAL PLATFORMS BAR (ONLY 6 Authorized Platforms) */}
        <div className="py-6 border-b border-[#254d94]">
          <SocialLinks variant="floating" darkSurface={true} />
        </div>

        {/* COMPREHENSIVE SEO KEYWORDS & TOPICS DIRECTORY (Zero-Gap Responsive Matrix with Distinct Accent Buttons) */}
        <div className="py-6 border-b border-[#254d94]">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#091c3e]/80 border border-sky-400/25 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-300 shrink-0" />
                <h5 className="text-xs sm:text-sm font-extrabold text-amber-300">
                  {t.footerSeoSearchLogTitle}
                </h5>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {seoKeywords.map((keyword, idx) => (
                <a
                  key={idx}
                  href="#services"
                  onClick={(e) => handleLinkClick(e, idx % 3 === 0 ? 'services' : idx % 3 === 1 ? 'portfolio' : 'contact')}
                  className="w-full text-[11px] sm:text-xs font-bold text-amber-100 hover:text-slate-950 px-2.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-amber-500/20 hover:from-amber-400 hover:to-amber-500 border border-amber-400/50 hover:border-amber-200 transition-all shadow-xs cursor-pointer flex items-center justify-center text-center leading-tight"
                  title={keyword}
                >
                  <span className="truncate">{keyword}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT & DEVELOPER BAR */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-200">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-3">
            <p
              onDoubleClick={onOpenDeveloperPortal}
              className="text-center md:text-right leading-relaxed select-none"
            >
              {t.footerCopyright}
            </p>

            <a
              href="https://wa.me/967774632249"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={language === 'ar' ? 'تواصل مع المطور ALRASSASS عبر واتساب' : 'Contact Developer ALRASSASS on WhatsApp'}
              className="alrassass-gold-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-slate-950 font-black text-xs border border-amber-200 transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>{language === 'ar' ? 'تطوير: ALRASSASS' : 'Dev: ALRASSASS'}</span>
              <ExternalLink className="w-3 h-3 text-slate-900 shrink-0" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-slate-200 font-semibold">
              {t.officialAddress}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
