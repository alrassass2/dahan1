import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  MessageCircle,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Eye,
  Share2,
  Copy,
  Check,
  Twitter,
  Send,
  Search
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
import { smartTokenMatch } from '../utils/siteAssistantEngine';

interface KeywordFilterChip {
  id: string;
  labelAr: string;
  labelEn: string;
  tokens: string[];
}

const PORTFOLIO_KEYWORD_FILTERS: KeywordFilterChip[] = [
  { id: 'all', labelAr: 'كل الكلمات البحثية', labelEn: 'All Keywords', tokens: [] },
  { id: 'painter-jeddah', labelAr: 'معلم دهانات جدة', labelEn: 'Jeddah Painter', tokens: ['دهانات', 'تنسيق', 'جدران', 'جودة التنفيذ', 'interior', 'exterior'] },
  { id: 'jotun-jazeera', labelAr: 'دهانات جوتن والجزيرة', labelEn: 'Jotun & Al-Jazeera', tokens: ['الداخلية', 'الوان', 'مجالس', 'التنفيذ', 'interior', 'color'] },
  { id: 'profile-facades', labelAr: 'بروفايل وواجهات فلل', labelEn: 'Profile & Facades', tokens: ['خارجية', 'واجهات', 'مكاتب', 'exterior', 'facade', 'office'] },
  { id: 'wood-marble', labelAr: 'بديل الخشب والرخام', labelEn: 'Wood & Marble', tokens: ['بديل الخشب', 'بديل الرخام', 'شاشات', 'غرف النوم', 'wood', 'marble', 'tv'] },
  { id: 'foam-boiserie', labelAr: 'فوم وبانوهات جدارية', labelEn: 'Foam & Boiserie', tokens: ['فوم', 'بانوهات', 'ديكورات', 'foam', 'boiserie'] },
  { id: 'wallpaper', labelAr: 'ورق جدران جدة', labelEn: 'Wallpaper Jeddah', tokens: ['ورق الجدران', 'شاشات', 'غرف النوم', 'wallpaper', 'tv'] },
  { id: 'majlis-halls', labelAr: 'دهانات مجالس وصالات', labelEn: 'Majlis & Halls', tokens: ['مجالس', 'صالات', 'الفلل', 'majlis', 'halls', 'living'] },
  { id: 'bedrooms-decor', labelAr: 'ديكورات غرف النوم', labelEn: 'Bedroom Decor', tokens: ['غرف النوم', 'بديل الخشب', 'مريحة', 'bedroom', 'wood'] },
  { id: 'moisture-cracks', labelAr: 'علاج الرطوبة والتشققات', labelEn: 'Moisture & Cracks', tokens: ['الرطوبة', 'التشققات', 'صنفرة', 'معجون', 'moisture', 'crack', 'skimming'] },
  { id: 'ceilings-gypsum', labelAr: 'الأسقف والجبس بورد', labelEn: 'Gypsum Ceilings', tokens: ['الأسقف', 'جبس بورد', 'صيانة', 'ceiling', 'gypsum'] },
  { id: 'renovation', labelAr: 'ترميم وتجديد منازل جدة', labelEn: 'Home Renovation', tokens: ['ترميم', 'تجديد', 'تشطيب', 'اسقف', 'renovation', 'repainting', 'ceiling'] }
];

export interface PortfolioSectionProps {
  hideHeader?: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ hideHeader = false }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedFilterId, setSelectedFilterId] = useState('all');
  const [selectedKeywordId, setSelectedKeywordId] = useState('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [shareItem, setShareItem] = useState<PortfolioItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentMatch = PORTFOLIO_CATEGORIES.find(c => c.id === selectedFilterId)?.match || 'all';
  const currentKeywordFilter = PORTFOLIO_KEYWORD_FILTERS.find(k => k.id === selectedKeywordId);
  const localizedAllItems = PORTFOLIO_DATA.map(item => getLocalizedPortfolioItem(item, language));

  const categoryFiltered = currentMatch === 'all'
    ? localizedAllItems
    : localizedAllItems.filter(item => {
        const orig = PORTFOLIO_DATA.find(p => p.id === item.id);
        return orig ? orig.category === currentMatch : true;
      });

  const matchItemByTokens = (item: PortfolioItem, tokens: string[]) => {
    const orig = PORTFOLIO_DATA.find(p => p.id === item.id);
    const searchableRaw = [
      item.title,
      item.subtitle,
      item.category,
      item.description,
      item.tags.join(' '),
      orig?.title || '',
      orig?.tags.join(' ') || ''
    ].join(' ');
    return smartTokenMatch(searchableRaw, tokens);
  };

  const keywordMatched =
    !currentKeywordFilter || currentKeywordFilter.id === 'all'
      ? categoryFiltered
      : categoryFiltered.filter(item => matchItemByTokens(item, currentKeywordFilter.tokens));

  const filteredItems =
    keywordMatched.length > 0
      ? keywordMatched
      : !currentKeywordFilter || currentKeywordFilter.id === 'all'
        ? localizedAllItems
        : localizedAllItems.filter(item => matchItemByTokens(item, currentKeywordFilter.tokens));

  const galleryGridClass =
    filteredItems.length === 1
      ? 'grid-cols-1 max-w-lg mx-auto'
      : filteredItems.length === 2 || filteredItems.length === 4
        ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  const activeItem: PortfolioItem | null = activeItemIndex !== null ? filteredItems[activeItemIndex] || null : null;

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setActiveItemIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  }, [filteredItems.length]);

  const closeLightbox = useCallback(() => {
    setActiveItemIndex(null);
    setIsZoomed(false);
  }, []);

  useEffect(() => {
    if (activeItemIndex === null && !shareItem) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (shareItem) {
          setShareItem(null);
        } else {
          closeLightbox();
        }
      } else if (e.key === 'ArrowLeft') {
        handleNext();
      } else if (e.key === 'ArrowRight') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItemIndex, shareItem, closeLightbox, handleNext, handlePrev]);

  const handleOpenShare = (item: PortfolioItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (navigator.share) {
      navigator.share({
        title: `${item.title} - ${t.brandName}`,
        text: `${item.title} - ${t.brandName}`,
        url: window.location.href.split('#')[0] + `#portfolio`,
      }).catch(() => {
        setShareItem(item);
      });
    } else {
      setShareItem(item);
    }
  };

  const handleCopyShareLink = (item: PortfolioItem) => {
    const url = window.location.href.split('#')[0] + `#portfolio-${item.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setToastMessage(language === 'ar' ? 'تم نسخ رابط النموذج بنجاح!' : 'Link copied!');
      setTimeout(() => {
        setCopiedLink(false);
        setToastMessage(null);
      }, 3000);
    });
  };

  const getWhatsAppShareUrl = (item: PortfolioItem) => {
    const pageUrl = window.location.href.split('#')[0] + `#portfolio-${item.id}`;
    const text = `${t.brandName}\n📌 ${item.title}\n✨ ${item.subtitle}\n🔗 ${pageUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const getTwitterShareUrl = (item: PortfolioItem) => {
    const pageUrl = window.location.href.split('#')[0] + `#portfolio-${item.id}`;
    const text = `${t.brandName}: ${item.title}`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`;
  };

  return (
    <section
      id="portfolio"
      className={`bg-slate-50 dark:bg-slate-950 relative overflow-hidden ${hideHeader ? 'py-10' : 'py-20'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-sky-300 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.homePortfolioBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] dark:text-white tracking-tight mb-4">
              {language === 'ar' ? (
                <>معرض <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 via-amber-500 to-amber-700">النماذج والصور</span></>
              ) : (
                <>Illustrative <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">Styles & Gallery</span></>
              )}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.homePortfolioDesc}
            </p>
          </div>
        )}

        {/* Primary Category Filter Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-5">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedFilterId(cat.id);
                setSelectedKeywordId('all');
                setActiveItemIndex(null);
              }}
              className={`w-full px-3 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer text-center flex items-center justify-center ${
                selectedFilterId === cat.id
                  ? 'bg-gradient-to-r from-sky-500 via-sky-600 to-[#0f2b5c] text-white shadow-lg shadow-sky-500/30 border border-sky-300/50'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs hover:border-sky-300/60'
              }`}
            >
              {language === 'ar' ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Distributed Jeddah Search Keywords Filter Grid (Zero Gaps) */}
        <div className="mb-10 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0f2b5c] dark:text-amber-400">
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {language === 'ar'
                  ? 'تصفية سريعة حسب الكلمات البحثية في جدة:'
                  : 'Quick Filter by Jeddah Search Keywords:'}
              </span>
            </span>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {language === 'ar'
                ? `عرض ${filteredItems.length} نموذج`
                : `Showing ${filteredItems.length} models`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {PORTFOLIO_KEYWORD_FILTERS.map((kw) => {
              const isActive = selectedKeywordId === kw.id;
              return (
                <button
                  key={kw.id}
                  type="button"
                  onClick={() => {
                    setSelectedKeywordId(kw.id);
                    if (kw.id !== 'all' && keywordMatched.length === 0) {
                      setSelectedFilterId('all');
                    }
                    setActiveItemIndex(null);
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center leading-tight ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm border border-amber-400'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {language === 'ar' ? kw.labelAr : kw.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className={`grid ${galleryGridClass} gap-6 sm:gap-8`}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`portfolio-${item.id}`}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setActiveItemIndex(index)}
                  className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.altText || item.title}
                    width={640}
                    height={480}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      if (e.currentTarget.src !== HERO_VISUAL_IMAGE) {
                        e.currentTarget.src = HERO_VISUAL_IMAGE;
                      }
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تصفح بكامل الحجم' : 'View Full Size'}</span>
                    </span>

                    <span className="text-[11px] text-slate-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      {language === 'ar' ? 'نموذج استرشادي' : 'Illustrative Model'}
                    </span>
                  </div>

                  <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'}`}>
                    <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-amber-300 text-xs font-bold shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleOpenShare(item, e)}
                    className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} p-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-amber-600 shadow-xs transition-transform active:scale-95 cursor-pointer`}
                    title={language === 'ar' ? 'مشاركة هذا النموذج' : 'Share this style'}
                    aria-label={language === 'ar' ? 'مشاركة هذا النموذج' : 'Share this style'}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className={`p-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <h3
                    onClick={() => setActiveItemIndex(index)}
                    className="text-lg font-bold text-[#0f2b5c] dark:text-white mb-1.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.map((tg, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-2.5 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    language === 'ar'
                      ? `السلام عليكم معلم دهانات وترميم جدة، أود الاستفسار عن تنفيذ نموذج (${item.title}) في جدة.`
                      : `Hello Jeddah Painter & Renovation Master, I would like to inquire about (${item.title}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'اطلب مثل هذا التصميم' : 'Request on WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={(e) => handleOpenShare(item, e)}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 text-slate-600 dark:text-slate-300 hover:text-amber-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'مشاركة' : 'Share'}
                  aria-label={language === 'ar' ? 'مشاركة' : 'Share'}
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveItemIndex(index)}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 text-slate-600 dark:text-slate-300 hover:text-[#0f2b5c] border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'عرض مكبر' : 'Open Lightbox'}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Lightbox Modal */}
      {activeItem && activeItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 transition-all duration-300 animate-fadeIn"
          onClick={closeLightbox}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between gap-3 text-white z-20 pb-3 border-b border-white/10"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold"
                title={language === 'ar' ? 'إغلاق (Esc)' : 'Close (Esc)'}
              >
                <X className="w-5 h-5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'إغلاق' : 'Close'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-2.5 rounded-2xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                  isZoomed ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {isZoomed ? (language === 'ar' ? 'تصغير (100%)' : 'Zoom Out') : (language === 'ar' ? 'تكبير (150%)' : 'Zoom In')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenShare(activeItem)}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'مشاركة' : 'Share'}</span>
              </button>
            </div>

            <div className="text-center hidden md:block">
              <h3 className="text-sm font-bold text-white max-w-md truncate">
                {activeItem.title}
              </h3>
              <p className="text-xs text-amber-400">
                {language === 'ar'
                  ? `نموذج ${activeItemIndex + 1} من ${filteredItems.length}`
                  : `Style ${activeItemIndex + 1} of ${filteredItems.length}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  language === 'ar'
                    ? `السلام عليكم معلم دهانات وترميم جدة، أود الاستفسار عن نموذج (${activeItem.title}).`
                    : `Hello Jeddah Painter & Renovation Master, inquiry about (${activeItem.title}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ar' ? `واتساب: ${CONTACT_INFO.phone}` : `WhatsApp: ${CONTACT_INFO.phone}`}</span>
                <span className="sm:hidden">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={isRtl ? handlePrev : handleNext}
              className={`absolute ${isRtl ? 'right-2 sm:right-6' : 'left-2 sm:left-6'} top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-2xl bg-black/60 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md transition-all cursor-pointer transform hover:scale-110 active:scale-95 shadow-2xl`}
              title={language === 'ar' ? 'السابق' : 'Previous'}
            >
              {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>

            <button
              type="button"
              onClick={isRtl ? handleNext : handlePrev}
              className={`absolute ${isRtl ? 'left-2 sm:left-6' : 'right-2 sm:right-6'} top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-2xl bg-black/60 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md transition-all cursor-pointer transform hover:scale-110 active:scale-95 shadow-2xl`}
              title={language === 'ar' ? 'التالي' : 'Next'}
            >
              {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>

            <div
              className={`relative max-h-full max-w-full flex items-center justify-center transition-all duration-300 select-none ${
                isZoomed ? 'cursor-zoom-out overflow-auto scale-150' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={activeItem.imageUrl}
                alt={activeItem.altText || activeItem.title}
                className="max-h-[68vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300"
              />
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 ${isRtl ? 'text-right' : 'text-left'} border border-white/10 z-20 max-w-4xl mx-auto w-full`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                    {activeItem.category}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {activeItem.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  {activeItem.subtitle} - {activeItem.description}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleCopyShareLink(activeItem)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (language === 'ar' ? 'تم نسخ الرابط' : 'Copied') : (language === 'ar' ? 'نسخ الرابط' : 'Copy Link')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShareItem(null)}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div
            className={`bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 ${isRtl ? 'text-right' : 'text-left'} relative`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShareItem(null)}
              className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-bold">{language === 'ar' ? 'مشاركة من المعرض' : 'Share Model'}</span>
            </div>

            <h3 className="text-lg font-extrabold text-[#0f2b5c] dark:text-white mb-1">
              {shareItem.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              {language === 'ar'
                ? 'شارك هذا النموذج الاسترشادي عبر القنوات التالية:'
                : 'Share this style concept through the following channels:'}
            </p>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-5 border border-slate-200 dark:border-slate-700">
              <img
                src={shareItem.imageUrl}
                alt={shareItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2.5">
              <a
                href={getWhatsAppShareUrl(shareItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ar' ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}</span>
                </span>
                <Send className="w-3.5 h-3.5" />
              </a>

              <a
                href={getTwitterShareUrl(shareItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-slate-900" />
                  <span>{language === 'ar' ? 'مشاركة على منصة إكس (X)' : 'Share on X'}</span>
                </span>
                <Send className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => handleCopyShareLink(shareItem)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-600" />}
                  <span>{copiedLink ? (language === 'ar' ? 'تم النسخ' : 'Copied') : (language === 'ar' ? 'نسخ الرابط المباشر' : 'Copy Direct Link')}</span>
                </span>
                <span className="text-[11px] text-amber-700">{language === 'ar' ? 'نسخ' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-400/60 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
