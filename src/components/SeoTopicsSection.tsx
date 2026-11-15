import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Paintbrush,
  Building2,
  Sparkles,
  ShieldCheck,
  Layers,
  MessageCircle,
  Phone,
  Newspaper,
  ArrowLeft,
  ArrowRight,
  X
} from 'lucide-react';
import {
  SEO_EXPERT_TOPICS,
  PAINT_FINISH_SPECS,
  ARTICLES_DATA,
  ArticleItem,
  CONTACT_INFO
} from '../data/websiteContent';
import { useLanguage } from '../context/LanguageContext';

interface SeoTopicsSectionProps {
  onNavigate: (page: string) => void;
}

export const SeoTopicsSection: React.FC<SeoTopicsSectionProps> = ({ onNavigate }) => {
  const { language, isRtl } = useLanguage();
  const [activeTopicId, setActiveTopicId] = useState<string>(SEO_EXPERT_TOPICS[0]?.id || '');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  const activeTopic = SEO_EXPERT_TOPICS.find((t) => t.id === activeTopicId) || SEO_EXPERT_TOPICS[0];
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const topicIcons: Record<string, React.ReactNode> = {
    'interior-guide': <Paintbrush className="w-4 h-4" />,
    'exterior-facade-guide': <Building2 className="w-4 h-4" />,
    'decor-cladding-guide': <Sparkles className="w-4 h-4" />,
    'renovation-moisture-guide': <ShieldCheck className="w-4 h-4" />,
  };

  return (
    <div id="expert-guides" className="space-y-14" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 0. FEATURED ILLUSTRATED ARTICLES LIBRARY (SEO Articles + Images) */}
      <div id="articles" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-xs font-bold mb-2">
              <Newspaper className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {language === 'ar'
                  ? 'مقالات الدهانات والديكورات في جدة'
                  : 'Jeddah Painting & Decor Articles'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] dark:text-white">
              {language === 'ar'
                ? 'أحدث مقالات معلم دهانات وديكورات وترميم جدة'
                : 'Featured Guides & Articles on Jeddah Paints, Decor & Renovation'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
              {language === 'ar'
                ? 'مقالات متخصصة ومدعومة بالصور التوضيحية حول دهانات جدة الداخلية والخارجية، ديكورات بديل الخشب والرخام والفوم، وتجديد وترميم المنازل والفلل.'
                : 'Illustrated technical articles covering residential interior/exterior paints, contemporary wall decor, and turnkey home restoration in Jeddah.'}
            </p>
          </div>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'ar' ? `استشارة فورية (${CONTACT_INFO.phone})` : `Instant Advice (${CONTACT_INFO.phone})`}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              itemScope
              itemType="https://schema.org/Article"
              className={`bg-slate-50 dark:bg-slate-950/70 hover:bg-white dark:hover:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            >
              <div>
                <div
                  onClick={() => setActiveArticle(article)}
                  className="relative aspect-[16/10] bg-white dark:bg-slate-900 overflow-hidden cursor-pointer border-b border-slate-200/70 dark:border-slate-800"
                >
                  <img
                    src={article.imageUrl}
                    itemProp="image"
                    alt={language === 'ar' ? article.altTextAr : article.altTextEn}
                    width={900}
                    height={560}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="sr-only" itemProp="thumbnailUrl">{article.publicImagePath}</div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
                    <span className="text-amber-700 dark:text-amber-400">
                      {language === 'ar' ? article.categoryAr : article.categoryEn}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{language === 'ar' ? article.readTimeAr : article.readTimeEn}</span>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(article)}
                    itemProp="headline"
                    className="text-base sm:text-lg font-extrabold text-[#0f2b5c] dark:text-white leading-snug mb-2.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? article.titleAr : article.titleEn}
                  </h3>

                  <p itemProp="description" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {language === 'ar' ? article.excerptAr : article.excerptEn}
                  </p>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {(language === 'ar' ? article.keywordsAr : article.keywordsEn).join(' · ')}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#0f2b5c] dark:text-amber-400 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>{language === 'ar' ? 'قراءة المقال كاملاً' : 'Read Full Article'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    language === 'ar'
                      ? `السلام عليكم معلم دهانات وترميم جدة، استفسار بخصوص مقال: (${article.titleAr}).`
                      : `Hello, inquiry regarding article: (${article.titleEn}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all"
                  title={language === 'ar' ? 'استفسر عبر واتساب' : 'Ask on WhatsApp'}
                  aria-label={language === 'ar' ? 'استفسر عبر واتساب' : 'Ask on WhatsApp'}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 1. EXPERT TOPICS & ARCHITECTURAL ARTICLES */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {language === 'ar'
                  ? 'مقالات ودليل معلم دهانات وترميم جدة'
                  : 'Jeddah Painting, Decor & Renovation Guides'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] dark:text-white">
              {language === 'ar'
                ? 'دليلك المتكامل للدهانات والديكورات وترميم المنازل في جدة'
                : 'Complete Guide to Painting, Wall Decor & Home Renovation'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
              {language === 'ar'
                ? 'مواضيع إرشادية تفصيلية حول دهانات داخلية جدة ودهانات خارجية جدة، ديكورات بديل الخشب والرخام، وخطوات ترميم منازل جدة وصيانتها بما يلائم مناخ المدينة.'
                : 'Detailed insights on interior/exterior coatings, modern wall decors, and dampness/crack remediation engineered for Jeddah.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>{language === 'ar' ? 'اطلب معاينة أو عرض سعر' : 'Request Inspection'}</span>
          </button>
        </div>

        {/* Topic Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-7">
          {SEO_EXPERT_TOPICS.map((topic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopicId(topic.id)}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                  isRtl ? 'text-right' : 'text-left'
                } ${
                  isSelected
                    ? 'bg-[#0f2b5c] text-white border-[#0f2b5c] shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {topicIcons[topic.id] || <Layers className="w-4 h-4" />}
                </span>
                <span className="leading-snug">
                  {language === 'ar' ? topic.badgeAr : topic.badgeEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Topic Detail Card */}
        {activeTopic && (
          <div className={`bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f2b5c] dark:text-amber-300 leading-snug">
                  {language === 'ar' ? activeTopic.titleAr : activeTopic.titleEn}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {language === 'ar' ? activeTopic.summaryAr : activeTopic.summaryEn}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {(language === 'ar' ? activeTopic.pointsAr : activeTopic.pointsEn).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs">
                <h4 className="text-sm font-extrabold text-[#0f2b5c] dark:text-white">
                  {language === 'ar' ? 'الكلمات والمواضيع المرتبطة بهذا الدليل:' : 'Related Client Searches:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(language === 'ar' ? activeTopic.keywordsAr : activeTopic.keywordsEn).map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/50 text-xs font-bold"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {language === 'ar'
                      ? 'تحتاج استشارة أو معاينة في جدة لهذه الخدمة؟ تواصل معنا مباشرة:'
                      : 'Need an on-site visit or tailored advice in Jeddah?'}
                  </p>
                  <a
                    href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                      language === 'ar'
                        ? `السلام عليكم معلم دهانات وترميم جدة، أود الاستفسار عن (${activeTopic.titleAr}).`
                        : `Hello, I have an inquiry regarding (${activeTopic.titleEn}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ar' ? `تواصل واتساب: ${CONTACT_INFO.phone}` : `WhatsApp: ${CONTACT_INFO.phone}`}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. PAINT & DECOR FINISH SPECIFICATIONS */}
      <div>
        <div className={`mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-bold text-blue-700 dark:text-sky-300 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/50">
            {language === 'ar' ? 'خيارات الطلاء والتشطيب' : 'Finish Specifications'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] dark:text-white mt-2">
            {language === 'ar'
              ? 'أنواع التشطيبات والدهانات والديكورات المعتمدة لدينا'
              : 'Approved Paint Finishes & Decorative Wall Systems'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAINT_FINISH_SPECS.map((spec) => (
            <div
              key={spec.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-amber-400/70 shadow-xs hover:shadow-md transition-all ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-sm sm:text-base font-extrabold text-[#0f2b5c] dark:text-white">
                  {language === 'ar' ? spec.nameAr : spec.nameEn}
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              </div>
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1.5">
                {language === 'ar' ? `الاستخدام: ${spec.usageAr}` : `Ideal for: ${spec.usageEn}`}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'ar' ? spec.benefitAr : spec.benefitEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Article Full Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'ar' ? activeArticle.titleAr : activeArticle.titleEn}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveArticle(null)}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div
            className={`bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative my-8 ${isRtl ? 'text-right' : 'text-left'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-800">
              <img
                src={activeArticle.imageUrl}
                alt={language === 'ar' ? activeArticle.altTextAr : activeArticle.altTextEn}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white transition-colors cursor-pointer`}
                aria-label={language === 'ar' ? 'إغلاق المقال' : 'Close article'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-amber-700 dark:text-amber-400">
                  {language === 'ar' ? activeArticle.categoryAr : activeArticle.categoryEn}
                </span>
                <span aria-hidden="true">·</span>
                <span>{language === 'ar' ? activeArticle.dateAr : activeArticle.dateEn}</span>
                <span aria-hidden="true">·</span>
                <span>{language === 'ar' ? activeArticle.readTimeAr : activeArticle.readTimeEn}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0f2b5c] dark:text-white mb-4 leading-snug">
                {language === 'ar' ? activeArticle.titleAr : activeArticle.titleEn}
              </h3>

              <div className="space-y-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
                {(language === 'ar' ? activeArticle.paragraphsAr : activeArticle.paragraphsEn).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-6">
                <h4 className="text-xs font-extrabold text-[#0f2b5c] dark:text-amber-300 mb-3">
                  {language === 'ar' ? 'أبرز النقاط والمزايا:' : 'Key Highlights:'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(language === 'ar' ? activeArticle.bulletPointsAr : activeArticle.bulletPointsEn).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                <strong className="text-[#0f2b5c] dark:text-amber-400">
                  {language === 'ar' ? 'كلمات بحث المقال: ' : 'Keywords: '}
                </strong>
                {(language === 'ar' ? activeArticle.keywordsAr : activeArticle.keywordsEn).join(' · ')}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    language === 'ar'
                      ? `السلام عليكم معلم دهانات وترميم جدة، استفسار بخصوص مقال: (${activeArticle.titleAr}).`
                      : `Hello, inquiry regarding article: (${activeArticle.titleEn}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
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
    </div>
  );
};
