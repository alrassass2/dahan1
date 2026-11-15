import React, { useState } from 'react';
import {
  Paintbrush,
  Sparkles,
  Home,
  Building2,
  ShieldCheck,
  Palette,
  Wrench,
  Droplets,
  Layers,
  CheckCircle2,
  MessageCircle,
  Eye,
  X,
  Phone,
  Search
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem, CONTACT_INFO, getLocalizedService } from '../data/websiteContent';
import { useLanguage } from '../context/LanguageContext';
import { smartTokenMatch } from '../utils/siteAssistantEngine';

interface ServiceKeywordFilter {
  id: string;
  labelAr: string;
  labelEn: string;
  serviceIds?: string[];
  tokens: string[];
}

const SERVICE_KEYWORD_FILTERS: ServiceKeywordFilter[] = [
  {
    id: 'all',
    labelAr: 'جميع الخدمات (9)',
    labelEn: 'All Services (9)',
    tokens: []
  },
  {
    id: 'painter-jeddah',
    labelAr: 'معلم دهانات وبوية جدة',
    labelEn: 'Jeddah Painter',
    serviceIds: ['interior-paints', 'majlis-halls-bedrooms', 'walls-ceilings-maintenance'],
    tokens: ['دهانات', 'معلم دهان', 'معلم بوية']
  },
  {
    id: 'interior-jotun',
    labelAr: 'دهانات داخلية وجوتن',
    labelEn: 'Interior & Jotun',
    serviceIds: ['interior-paints', 'majlis-halls-bedrooms', 'wall-decorative-paints'],
    tokens: ['الدهانات الداخلية', 'جوتن', 'الجزيرة']
  },
  {
    id: 'exterior-profile',
    labelAr: 'دهانات خارجية وبروفايل',
    labelEn: 'Exterior & Profile',
    serviceIds: ['exterior-facades', 'home-renovation'],
    tokens: ['خارجية', 'واجهات', 'بروفايل', 'كسر رخام']
  },
  {
    id: 'majlis-bedrooms',
    labelAr: 'دهانات مجالس وغرف نوم',
    labelEn: 'Majlis & Bedrooms',
    serviceIds: ['majlis-halls-bedrooms', 'interior-paints', 'wall-decorative-paints'],
    tokens: ['المجالس', 'غرف النوم', 'الصالات']
  },
  {
    id: 'decor-foam',
    labelAr: 'ديكورات فوم ودهان ديكوري',
    labelEn: 'Decorative & Foam',
    serviceIds: ['wall-decorative-paints', 'wallpaper-wood-marble', 'home-renovation'],
    tokens: ['فوم', 'شامواه', 'مخملي', 'ديكورية']
  },
  {
    id: 'wood-wallpaper',
    labelAr: 'بديل الخشب والورق',
    labelEn: 'Wood & Wallpaper',
    serviceIds: ['wallpaper-wood-marble', 'wall-decorative-paints'],
    tokens: ['بديل الخشب', 'بديل الرخام', 'ورق الجدران']
  },
  {
    id: 'renovation-villas',
    labelAr: 'ترميم منازل وفلل جدة',
    labelEn: 'Home Renovation',
    serviceIds: ['home-renovation', 'crack-peeling-repair', 'moisture-surface-prep'],
    tokens: ['ترميم منازل', 'ترميم فلل', 'إيبوكسي']
  },
  {
    id: 'cracks-peeling',
    labelAr: 'علاج التشققات والتقشر',
    labelEn: 'Crack Repair',
    serviceIds: ['crack-peeling-repair', 'moisture-surface-prep', 'walls-ceilings-maintenance'],
    tokens: ['التشققات', 'تقشر', 'شروخ', 'معجون']
  },
  {
    id: 'moisture-prep',
    labelAr: 'علاج رطوبة الجدران',
    labelEn: 'Moisture Repair',
    serviceIds: ['moisture-surface-prep', 'crack-peeling-repair'],
    tokens: ['الرطوبة', 'تمليح', 'برايمر']
  },
  {
    id: 'ceilings-doors',
    labelAr: 'أسقف جبس وأبواب',
    labelEn: 'Ceilings & Doors',
    serviceIds: ['walls-ceilings-maintenance', 'interior-paints', 'home-renovation'],
    tokens: ['الأسقف', 'جبس بورد', 'أبواب خشب']
  },
  {
    id: 'pricing-jeddah',
    labelAr: 'أسعار وتجديد الدهانات',
    labelEn: 'Repaint & Pricing',
    serviceIds: ['interior-paints', 'majlis-halls-bedrooms', 'home-renovation'],
    tokens: ['سعر متر الدهان', 'أسعار الدهانات', 'تجديد دهانات']
  }
];

export interface ServicesSectionProps {
  hideHeader?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ hideHeader = false }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>('all');

  const iconMap: Record<string, React.ReactNode> = {
    Paintbrush: <Paintbrush className="w-6 h-6" />,
    Building2: <Building2 className="w-6 h-6" />,
    Home: <Home className="w-6 h-6" />,
    Palette: <Palette className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Droplets: <Droplets className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6" />,
  };

  const localizedServices = SERVICES_DATA.map(s => getLocalizedService(s, language));
  const activeKeywordFilter = SERVICE_KEYWORD_FILTERS.find(f => f.id === selectedKeywordId);

  const visibleServices =
    !activeKeywordFilter || activeKeywordFilter.id === 'all'
      ? localizedServices
      : localizedServices.filter(service => {
          if (activeKeywordFilter.serviceIds && activeKeywordFilter.serviceIds.includes(service.id)) {
            return true;
          }
          const orig = SERVICES_DATA.find(s => s.id === service.id);
          const searchableRaw = [
            service.title,
            service.shortDesc,
            service.fullDesc,
            service.features.join(' '),
            (service.searchKeywords || []).join(' '),
            orig?.title || '',
            (orig?.searchKeywords || []).join(' ')
          ].join(' ');
          return smartTokenMatch(searchableRaw, activeKeywordFilter.tokens);
        });

  const gridColsClass =
    visibleServices.length === 1
      ? 'grid-cols-1 max-w-lg mx-auto'
      : visibleServices.length === 2 || visibleServices.length === 4
        ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  const getServiceWhatsAppUrl = (title: string) => {
    const text = language === 'ar'
      ? `السلام عليكم معلم دهانات وترميم جدة، أود الاستفسار وطلب خدمة: (${title}).`
      : `Hello Jeddah Painter & Renovation Master, I would like to inquire and request a quote for: (${title}).`;
    return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="services"
      className={`bg-white dark:bg-slate-950 relative overflow-hidden ${hideHeader ? 'py-10' : 'py-20'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-sm font-semibold mb-4">
              <Paintbrush className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{t.homeServicesBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] dark:text-white tracking-tight mb-4">
              {language === 'ar' ? (
                <>خدمات <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 via-amber-500 to-amber-700">الدهانات والديكورات والترميم</span></>
              ) : (
                <><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">Painting, Decor & Renovation</span> Services</>
              )}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.homeServicesDesc}
            </p>
          </div>
        )}

        {/* Balanced 12-Cell Jeddah Services & Search Keywords Filter Grid */}
        <div className="mb-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0f2b5c] dark:text-amber-400">
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {language === 'ar'
                  ? 'الخدمات والكلمات البحثية المرتبطة في جدة:'
                  : 'Jeddah Painting & Renovation Services Filter:'}
              </span>
            </span>

            {selectedKeywordId !== 'all' ? (
              <button
                type="button"
                onClick={() => setSelectedKeywordId('all')}
                className="text-[11px] font-bold text-[#0f2b5c] dark:text-amber-400 hover:underline cursor-pointer"
              >
                {language === 'ar' ? 'عرض جميع الخدمات (9)' : 'Show All 9 Services'}
              </button>
            ) : (
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {language === 'ar' ? `عرض ${visibleServices.length} خدمات` : `Showing ${visibleServices.length} services`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {SERVICE_KEYWORD_FILTERS.map((kw) => {
              const isActive = selectedKeywordId === kw.id;
              return (
                <button
                  key={kw.id}
                  type="button"
                  onClick={() => setSelectedKeywordId(kw.id)}
                  className={`w-full px-2.5 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center leading-tight ${
                    isActive
                      ? 'bg-[#0f2b5c] text-white shadow-md border border-amber-400/50'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {language === 'ar' ? kw.labelAr : kw.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Cards Grid (Symmetrical, Zero Gaps) */}
        <div className={`grid ${gridColsClass} gap-6 sm:gap-8`}>
          {visibleServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800/90 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div
                  onClick={() => setSelectedService(service)}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-slate-200 dark:bg-slate-800 cursor-pointer"
                >
                  <img
                    src={service.imageUrl}
                    alt={service.altText || service.title}
                    width={960}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[#0f2b5c] dark:text-amber-400 shadow-md`}>
                    {iconMap[service.iconName] || <Paintbrush className="w-5 h-5" />}
                  </div>
                </div>

                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h3
                    onClick={() => setSelectedService(service)}
                    className="text-xl font-bold text-[#0f2b5c] dark:text-white mb-2.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {service.searchKeywords && service.searchKeywords.length > 0 && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {service.searchKeywords.slice(0, 5).join(' · ')}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={getServiceWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'ar' ? 'طلب الخدمة واتساب' : 'Request on WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'عرض تفاصيل الخدمة' : 'View Service Details'}
                  aria-label={language === 'ar' ? 'عرض تفاصيل الخدمة' : 'View Service Details'}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Service Details Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedService.title}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedService(null)}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div
            className={`bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative my-8 ${isRtl ? 'text-right' : 'text-left'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-800">
              <img
                src={selectedService.imageUrl}
                alt={selectedService.altText || selectedService.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2.5 rounded-full bg-slate-900/75 hover:bg-red-600 text-white transition-colors cursor-pointer`}
                aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
              <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-[#0f2b5c] dark:text-amber-400 text-xs font-bold shadow flex items-center gap-2`}>
                {iconMap[selectedService.iconName] || <Paintbrush className="w-4 h-4" />}
                <span>{t.brandName}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black text-[#0f2b5c] dark:text-white mb-3">
                {selectedService.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {selectedService.fullDesc}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-6">
                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-3">
                  {language === 'ar' ? 'أبرز تفاصيل التنفيذ في هذه الخدمة:' : 'Key Service Highlights:'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedService.searchKeywords && selectedService.searchKeywords.length > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  <strong className="text-[#0f2b5c] dark:text-amber-400">
                    {language === 'ar' ? 'كلمات بحث الخدمة: ' : 'Related Searches: '}
                  </strong>
                  {selectedService.searchKeywords.join(' · ')}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <a
                  href={getServiceWhatsAppUrl(selectedService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'ar' ? 'طلب هذه الخدمة عبر واتساب' : 'Request Service via WhatsApp'}</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.internationalPhone}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0f2b5c] hover:bg-[#173d7c] text-white text-sm font-bold shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
