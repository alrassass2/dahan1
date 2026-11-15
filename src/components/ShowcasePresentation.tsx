import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Phone,
  Maximize2,
  X,
  Sparkles,
  Play,
  Pause,
  CheckCircle,
  Tag
} from 'lucide-react';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_DATA,
  PortfolioItem,
  CONTACT_INFO,
  HERO_VISUAL_IMAGE,
  getLocalizedPortfolioItem
} from '../data/websiteContent';
import { useLanguage } from '../context/LanguageContext';

export interface ShowcasePresentationProps {
  onNavigate?: (page: string) => void;
}

export const ShowcasePresentation: React.FC<ShowcasePresentationProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [selectedFilterId, setSelectedFilterId] = useState<string>('all');

  const localizedItems = PORTFOLIO_DATA.map(item => getLocalizedPortfolioItem(item, language));
  const currentMatch = PORTFOLIO_CATEGORIES.find(f => f.id === selectedFilterId)?.match || 'all';

  const filteredItems = currentMatch === 'all'
    ? localizedItems
    : localizedItems.filter(item => {
        const orig = PORTFOLIO_DATA.find(p => p.id === item.id);
        return orig ? orig.category === currentMatch : true;
      });

  const currentItem = filteredItems[currentIndex % filteredItems.length] || filteredItems[0] || localizedItems[0];

  useEffect(() => {
    if (!isAutoPlay || activeModalItem) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredItems.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay, filteredItems.length, activeModalItem]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const getWhatsAppServiceUrl = (title: string) => {
    const text = language === 'ar'
      ? `السلام عليكم معلم دهانات وترميم جدة، أود الاستفسار عن نموذج: (${title}).`
      : `Hello Jeddah Painter & Renovation Master, I would like to inquire about: (${title}).`;
    return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  const ChevronPrev = isRtl ? ChevronRight : ChevronLeft;
  const ChevronNext = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section id="presentation" className="py-20 bg-slate-900 text-white relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{language === 'ar' ? 'عرض تفاعلي للنماذج والأنماط' : 'Interactive Styles Showcase'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'ar' ? (
              <>شرائح توضيحية لأعمال <span className="animate-title-shimmer inline-block">{t.brandName}</span></>
            ) : (
              <>Illustrative Slides <span className="animate-title-shimmer inline-block">{t.brandName}</span></>
            )}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {language === 'ar'
              ? 'استعراض مرئي لخيارات الدهانات الداخلية والخارجية والديكورات الحديثة وأساليب الترميم والتشطيبات المتاحة في جدة.'
              : 'Visual inspiration across interior/exterior paints, wall decor, home renovation, and finishing solutions in Jeddah.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 max-w-4xl mx-auto">
          {PORTFOLIO_CATEGORIES.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setSelectedFilterId(opt.id);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilterId === opt.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {language === 'ar' ? opt.labelAr : opt.labelEn}
            </button>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            <div className="lg:col-span-7 relative bg-black/40 overflow-hidden flex items-center justify-center group min-h-[320px] sm:min-h-[400px]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full h-full absolute inset-0 flex items-center justify-center p-3 sm:p-5"
                >
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.altText || currentItem.title}
                    width={960}
                    height={720}
                    className="w-full h-full object-cover sm:object-contain rounded-2xl drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      if (e.currentTarget.src !== HERO_VISUAL_IMAGE) {
                        e.currentTarget.src = HERO_VISUAL_IMAGE;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setActiveModalItem(currentItem)}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all backdrop-blur-md border border-white/10 z-20 cursor-pointer`}
                title={language === 'ar' ? 'عرض الصورة بالحجم الكامل' : 'View full size'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-500/30">
                  <Tag className="w-3 h-3 text-amber-400" />
                  {currentItem.category}
                </span>
              </div>
            </div>

            <div className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'} bg-gradient-to-b from-slate-800 to-slate-850`}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-700/60">
                  <span className="text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {language === 'ar' ? 'نموذج توضيحي استرشادي' : 'Illustrative Style Preview'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t.officialAddress}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                      {currentItem.title}
                    </h3>
                    <h4 className="text-sm font-semibold text-amber-400 mb-3">
                      {currentItem.subtitle}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {currentItem.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {currentItem.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-300 border border-slate-600/40"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-700/60">
                <a
                  href={getWhatsAppServiceUrl(currentItem.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'ar' ? 'طلب هذه الخدمة عبر واتساب' : 'Request Service on WhatsApp'}</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.internationalPhone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 transition-all text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'ar' ? `اتصال (${CONTACT_INFO.phone})` : `Call (${CONTACT_INFO.phone})`}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveModalItem(currentItem)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-600 transition-all cursor-pointer"
                    title={language === 'ar' ? 'عرض مكبر' : 'Full Size'}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white transition-all border border-slate-700 cursor-pointer"
                aria-label={language === 'ar' ? 'الشريحة السابقة' : 'Previous slide'}
              >
                <ChevronPrev className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white transition-all border border-slate-700 cursor-pointer"
                aria-label={language === 'ar' ? 'الشريحة التالية' : 'Next slide'}
              >
                <ChevronNext className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1 cursor-pointer ${
                  isAutoPlay
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === (currentIndex % filteredItems.length)
                      ? 'w-6 bg-amber-400'
                      : 'w-2 bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-xs text-slate-400 font-mono">
              <span className="text-amber-400 font-bold">{(currentIndex % filteredItems.length) + 1}</span>
              <span className="mx-1">/</span>
              <span>{filteredItems.length}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>{language === 'ar' ? 'تصفح كافة النماذج والأنماط التوضيحية' : 'Browse All Style Previews'}</span>
            </h4>
            {onNavigate && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="text-xs font-bold text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  {t.homeServicesAllBtn}
                </button>
                <span className="text-slate-600">|</span>
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
                >
                  {t.homePortfolioAllBtn}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {localizedItems.map((item, index) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setSelectedFilterId('all');
                  setCurrentIndex(index);
                  document.getElementById('presentation')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`cursor-pointer rounded-2xl overflow-hidden border p-2.5 transition-all ${isRtl ? 'text-right' : 'text-left'} ${
                  item.id === currentItem.id
                    ? 'bg-amber-500/10 border-amber-500/80 shadow-lg shadow-amber-500/15'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-2.5">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      if (e.currentTarget.src !== HERO_VISUAL_IMAGE) {
                        e.currentTarget.src = HERO_VISUAL_IMAGE;
                      }
                    }}
                  />
                  {item.id === currentItem.id && (
                    <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-400 rounded-xl"></div>
                  )}
                </div>
                <h5 className="text-xs font-bold text-white truncate mb-1">
                  {item.title}
                </h5>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl p-4 sm:p-6 ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2 rounded-full bg-slate-800 hover:bg-red-500 text-white transition-all cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] overflow-hidden rounded-2xl mb-4 bg-black/50 flex items-center justify-center">
                <img
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title}
                  className="max-h-[60vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeModalItem.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">{activeModalItem.subtitle}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={getWhatsAppServiceUrl(activeModalItem.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ar' ? 'طلب الخدمة' : 'Request Service'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
