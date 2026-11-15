import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CONTACT_INFO, SERVICES_DATA, getLocalizedService } from '../data/websiteContent';
import officialLogoImg from '../assets/images/official_logo.webp';
import { SocialLinks } from './SocialLinks';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const localizedServices = SERVICES_DATA.map((s) => getLocalizedService(s, language));

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientDistrict, setClientDistrict] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0].title);
  const [notes, setNotes] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel =
      localizedServices.find((s) => s.title === selectedService || s.id === selectedService)?.title ||
      selectedService;

    const text = language === 'ar'
      ? `السلام عليكم ورحمة الله وبركاته،\nطلب خدمة جديد لموقع: معلم دهانات وترميم جدة\n• اسم العميل: ${clientName || 'غير محدد'}\n• رقم الجوال: ${clientPhone || 'غير محدد'}\n• الحي أو المنطقة: ${clientDistrict || 'جدة'}\n• نوع الخدمة المطلوبة: ${serviceLabel}\n• تفاصيل الطلب: ${notes || 'أرغب في التواصل لتنسيق المعاينة ومعرفة التفاصيل.'}`
      : `Hello Jeddah Painter & Renovation Master,\nNew Service Request:\n• Client Name: ${clientName || 'Not specified'}\n• Mobile Number: ${clientPhone || 'Not specified'}\n• District / Area: ${clientDistrict || 'Jeddah'}\n• Requested Service: ${serviceLabel}\n• Details: ${notes || 'Requesting consultation and estimate.'}`;

    const url = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-sm font-semibold mb-4">
            <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{t.contactBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] dark:text-white tracking-tight mb-4">
            {t.contactTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 via-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-200">
              {t.contactTitleHighlight}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.contactDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* 5-Field Direct Service Request Form -> WhatsApp */}
          <div className={`lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-xl font-bold text-[#0f2b5c] dark:text-white">
                {t.contactFormTitle}
              </h3>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              {/* Field 1 & Field 2: Client Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.contactFormName}: *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full name'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.contactFormPhone}: *
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Field 3 & Field 4: District & Service Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.contactFormDistrict}:
                  </label>
                  <input
                    type="text"
                    value={clientDistrict}
                    onChange={(e) => setClientDistrict(e.target.value)}
                    placeholder={language === 'ar' ? 'اسم الحي في جدة' : 'District in Jeddah'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.contactFormService}:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-800 dark:text-white font-medium"
                  >
                    {localizedServices.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value={language === 'ar' ? 'خدمة أو استشارة أخرى' : 'Other consultation'}>
                      {language === 'ar' ? 'خدمة أو استشارة أخرى' : 'Other consultation'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Field 5: Request Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.contactFormNotes}:
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'اكتب تفاصيل العمل المطلوب (نوع المكان، المساحة التقريبية، دهانات أو ديكورات أو ترميم)...'
                      : 'Describe the requested work (space type, approximate area, paints, decor, or renovation)...'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-800 dark:text-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                id="btn-submit-whatsapp-form"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-emerald-700/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.contactFormSubmit} ({CONTACT_INFO.phone})</span>
              </button>
            </form>
          </div>

          {/* Direct Contact Info Cards */}
          <div className={`lg:col-span-5 flex flex-col justify-between space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
            {/* Official Identity Card */}
            <div className="bg-gradient-to-r from-[#0f2b5c] to-[#143978] p-5 rounded-3xl border border-amber-400/30 shadow-md flex items-center gap-4 text-white">
              <div className="w-20 h-16 rounded-2xl bg-white p-1.5 shrink-0 flex items-center justify-center shadow">
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
              <div className="min-w-0">
                <h4 className="text-base font-black text-amber-300 truncate">{t.brandName}</h4>
                <p className="text-xs text-slate-200 mt-0.5">{t.brandTagline}</p>
                <p className="text-[11px] text-amber-200 font-bold mt-1">{t.officialAddress}</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-800/40">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  {language === 'ar' ? 'الاتصال الهاتفي المباشر' : 'Direct Phone Call'}
                </h4>
                <a
                  href={`tel:${CONTACT_INFO.internationalPhone}`}
                  className="text-2xl font-black text-[#0f2b5c] dark:text-white font-mono hover:text-amber-600 transition-colors block"
                  dir="ltr"
                >
                  {CONTACT_INFO.phone}
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'ar' ? `الرقم الدولي: ${CONTACT_INFO.internationalPhone}` : `International: ${CONTACT_INFO.internationalPhone}`}
                </p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800/40">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  {language === 'ar' ? 'المراسلة المباشرة عبر واتساب' : 'Instant WhatsApp Chat'}
                </h4>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono hover:text-emerald-600 transition-colors block"
                  dir="ltr"
                >
                  {CONTACT_INFO.whatsappNumber}
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'ar' ? 'إرسال الصور والتفاصيل وحجز مواعيد المعاينة' : 'Share photos, details & book a site visit'}
                </p>
              </div>
            </div>

            {/* City & Google Maps Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/40">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  {language === 'ar' ? 'المدينة ونطاق العمل' : 'City & Service Area'}
                </h4>
                <p className="text-sm font-bold text-[#0f2b5c] dark:text-white">
                  {t.officialAddress}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {language === 'ar' ? CONTACT_INFO.workingHours : CONTACT_INFO.workingHoursEn}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <a
                    href={CONTACT_INFO.googleMapsPrimaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA4335] hover:underline"
                  >
                    <span>{t.mapBtnGoogleMaps}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={CONTACT_INFO.googleMapsSecondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <span>{t.mapBtnGoogleMapsApp}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Platforms Cards (ONLY 6 Official Platforms) */}
        <div className="max-w-6xl mx-auto mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f2b5c] dark:text-white">
              {language === 'ar' ? 'تواصل معنا عبر منصاتنا' : 'Connect With Us On Social Platforms'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {language === 'ar'
                ? 'خرائط Google، تيك توك، انستقرام، سناب شات، واتساب، والاتصال المباشر'
                : 'Google Maps, TikTok, Instagram, Snapchat, WhatsApp, and Direct Call'}
            </p>
          </div>
          <SocialLinks variant="cards" />
        </div>
      </div>
    </section>
  );
};
