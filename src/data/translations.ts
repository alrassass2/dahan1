export type Language = 'ar' | 'en';

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;
  brandSubtagline: string;
  officialAddress: string;
  cityLabel: string;

  // Navigation
  navHome: string;
  navServices: string;
  navPortfolio: string;
  navQuality: string;
  navLocation: string;
  navAbout: string;
  navContact: string;
  whatsappDirect: string;
  callDirect: string;
  toggleDarkMode: string;
  toggleLightMode: string;
  switchLang: string;
  copyLink: string;
  linkCopied: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroSlogan: string;
  heroCtaRequest: string;
  heroCtaPortfolio: string;
  heroCtaCall: string;
  heroProposition1: string;
  heroProposition2: string;
  heroProposition3: string;
  heroProposition4: string;

  // Pages
  pageServicesTitle: string;
  pageServicesSubtitle: string;
  pageServicesBadge: string;
  pagePortfolioTitle: string;
  pagePortfolioSubtitle: string;
  pagePortfolioBadge: string;
  pageQualityTitle: string;
  pageQualitySubtitle: string;
  pageQualityBadge: string;
  pageLocationTitle: string;
  pageLocationSubtitle: string;
  pageLocationBadge: string;
  pageAboutTitle: string;
  pageAboutSubtitle: string;
  pageAboutBadge: string;
  pageContactTitle: string;
  pageContactSubtitle: string;
  pageContactBadge: string;

  // Inner Page Navigator
  innerNavTitle: string;

  // Map Section
  mapHeaderBadge: string;
  mapHeaderTitle: string;
  mapHeaderDesc: string;
  mapLevelKsa: string;
  mapLevelJeddah: string;
  mapModeGoogleLive: string;
  mapModeInteractive: string;
  mapModeBlueprint: string;
  mapModeSatellite: string;
  mapBtnGoogleMaps: string;
  mapBtnGoogleMapsApp: string;
  mapBtnWhatsApp: string;
  mapBtnCall: string;
  mapRecenterTitle: string;
  mapVerifiedBadge: string;
  mapRegionsLabel: string;
  mapFeatureCoverageTitle: string;
  mapFeatureCoverageDesc: string;
  mapFeatureHoursTitle: string;
  mapFeatureHoursDesc: string;
  mapFeatureInspectionTitle: string;
  mapFeatureInspectionDesc: string;

  // Home Previews & Sections
  homeServicesBadge: string;
  homeServicesTitle: string;
  homeServicesDesc: string;
  homeServicesAllBtn: string;
  homeServiceDetailsBtn: string;
  homePortfolioBadge: string;
  homePortfolioTitle: string;
  homePortfolioDesc: string;
  homePortfolioAllBtn: string;
  homeAdvantagesBadge: string;
  homeAdvantagesTitle: string;
  homeAdvantagesDesc: string;
  homeStagesBadge: string;
  homeStagesTitle: string;
  homeStagesDesc: string;
  homeFaqBadge: string;
  homeFaqTitle: string;
  homeFaqDesc: string;
  homeLocationBadge: string;
  homeLocationTitle: string;
  homeLocationDesc: string;
  homeLocationOpenMapBtn: string;
  homeLocationWhatsAppBtn: string;

  // Common UI
  learnMore: string;
  requestInspection: string;
  viewAllWorks: string;
  allRightsReserved: string;

  // Footer
  footerAbout: string;
  footerMainSectionsTitle: string;
  footerServicesTitle: string;
  footerCoverageTitle: string;
  footerCoverageDesc: string;
  footerWorkingHoursTitle: string;
  footerWorkingHoursDetail: string;
  footerSeoSearchLogTitle: string;
  footerSeoDevIndex: string;
  footerDesignerDataBtn: string;
  designAndDevBy: string;
  devPortalBtn: string;
  footerCopyright: string;

  // Floating Actions & Assistant
  botTitle: string;
  botSubtitle: string;
  botBadge: string;
  botPlaceholder: string;
  botSend: string;
  botWhatsAppContinue: string;
  botFaqTitle: string;
  botClear: string;
  scrollTopTitle: string;
  callDirectTitle: string;
  whatsAppDirectTitle: string;

  // Contact Section
  contactBadge: string;
  contactTitle: string;
  contactTitleHighlight: string;
  contactDesc: string;
  contactFormTitle: string;
  contactFormName: string;
  contactFormPhone: string;
  contactFormDistrict: string;
  contactFormService: string;
  contactFormNotes: string;
  contactFormSubmit: string;

  // About Section
  aboutBadge: string;
  aboutTitle: string;
  aboutTitleHighlight: string;
  aboutWhyTitle: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    brandName: 'معلم دهانات وترميم جدة',
    brandTagline: 'دهانات وديكورات وتشطيبات وترميم وصيانة المنازل.',
    brandSubtagline: 'نمنح منزلك جمالاً جديداً بلمسات من الخبرة والاحترافية.',
    officialAddress: 'جدة – المملكة العربية السعودية',
    cityLabel: 'جدة – المملكة العربية السعودية',

    navHome: 'الرئيسية',
    navServices: 'خدماتنا',
    navPortfolio: 'معرض الأعمال',
    navQuality: 'الجودة والمراحل',
    navAbout: 'من نحن',
    navLocation: 'موقعنا',
    navContact: 'اتصل بنا',
    whatsappDirect: 'واتساب',
    callDirect: 'اتصل بنا',
    toggleDarkMode: 'الوضع المظلم (ليلي)',
    toggleLightMode: 'الوضع الفاتح (نهاري)',
    switchLang: 'EN',
    copyLink: 'نسخ الرابط',
    linkCopied: 'تم نسخ رابط الصفحة بنجاح!',

    heroBadge: 'جدة – المملكة العربية السعودية • 0507478126',
    heroTitle: 'معلم دهانات وترميم جدة',
    heroSubtitle: 'دهانات وديكورات وتشطيبات وترميم وصيانة المنازل.',
    heroSlogan: 'نمنح منزلك جمالاً جديداً بلمسات من الخبرة والاحترافية.',
    heroCtaRequest: 'طلب خدمة الآن',
    heroCtaPortfolio: 'معرض النماذج والصور',
    heroCtaCall: 'اتصال مباشر',
    heroProposition1: 'دهانات داخلية وخارجية للمنازل والفلل والشقق',
    heroProposition2: 'ديكورات جدارية وورق جدران وبديل الخشب والرخام',
    heroProposition3: 'معالجة التشققات وتقشر الدهانات ومشاكل الرطوبة',
    heroProposition4: 'تشطيبات وترميم وصيانة شاملة في مدينة جدة',

    pageServicesTitle: 'خدمات معلم دهانات وترميم جدة',
    pageServicesSubtitle: 'خدمات متكاملة في الدهانات الداخلية والخارجية، الديكورات الجدارية، ورق الجدران، بديل الخشب والرخام، ومعالجة الرطوبة والتشققات والترميم.',
    pageServicesBadge: '9 خدمات متكاملة في جدة',
    pagePortfolioTitle: 'معرض الصور ونماذج التشطيبات',
    pagePortfolioSubtitle: 'نماذج واستعراضات بصرية توضيحية لأساليب الدهانات الداخلية والخارجية والديكورات والترميم والتشطيبات.',
    pagePortfolioBadge: 'نماذج توضيحية للخدمات',
    pageQualityTitle: 'مميزات العمل ومراحل تنفيذ الخدمة والأسئلة الشائعة',
    pageQualitySubtitle: 'تعرّف على أسلوب عملنا من لحظة المعاينة والتجهيز حتى التسليم، ومعايير الجودة التي نلتزم بها في جدة.',
    pageQualityBadge: 'معايير الجودة والتنفيذ',
    pageLocationTitle: 'تغطية جدة وموقعنا على خرائط Google',
    pageLocationSubtitle: 'نقدم خدمات الدهانات والديكورات والترميم في كافة أحياء مدينة جدة – المملكة العربية السعودية.',
    pageLocationBadge: 'جدة – المملكة العربية السعودية',
    pageAboutTitle: 'من نحن | معلم دهانات وترميم جدة',
    pageAboutSubtitle: 'كادر مؤهل وخبرة كبيرة في تنفيذ أعمال الدهانات والطلاء والديكورات الحديثة وترميم وصيانة المنازل في جدة.',
    pageAboutBadge: 'عن معلم دهانات وترميم جدة',
    pageContactTitle: 'نموذج طلب الخدمة والتواصل المباشر',
    pageContactSubtitle: 'تواصل معنا عبر الهاتف أو واتساب أو عبّئ نموذج طلب الخدمة لإرسال تفاصيل طلبك مباشرة.',
    pageContactBadge: 'خدمة سريعة في مدينة جدة',

    innerNavTitle: 'تصفح أقسام معلم دهانات وترميم جدة:',

    mapHeaderBadge: 'خدمة تغطي مدينة جدة',
    mapHeaderTitle: 'نطاق الخدمة في جدة وخرائط Google',
    mapHeaderDesc: 'نقدم خدمات الدهانات والديكورات والترميم والصيانة في مختلف أحياء مدينة جدة – المملكة العربية السعودية، ويمكنك الوصول إلى موقعنا الرسمي عبر خرائط Google.',
    mapLevelKsa: 'المملكة العربية السعودية',
    mapLevelJeddah: 'مدينة جدة',
    mapModeGoogleLive: 'خريطة جدة على Google',
    mapModeInteractive: 'مناطق وأحياء جدة',
    mapModeBlueprint: 'دليل الأحياء والمناطق',
    mapModeSatellite: 'قمر صناعي',
    mapBtnGoogleMaps: 'موقعنا على خرائط Google',
    mapBtnGoogleMapsApp: 'فتح رابط خرائط Google المباشر',
    mapBtnWhatsApp: 'التواصل عبر واتساب',
    mapBtnCall: 'اتصال مباشر (0507478126)',
    mapRecenterTitle: 'إعادة التمركز على مدينة جدة',
    mapVerifiedBadge: 'رابط رسمي',
    mapRegionsLabel: 'مناطق وأحياء جدة:',
    mapFeatureCoverageTitle: 'أحياء ومناطق مدينة جدة بالاسم',
    mapFeatureCoverageDesc: 'نصل إلى جميع أحياء شمال ووسط وغرب وشرق وجنوب جدة الموضحة بالاسم لتنفيذ أعمال الدهانات والديكورات والترميم.',
    mapFeatureHoursTitle: 'ساعات التواصل والعمل',
    mapFeatureHoursDesc: 'نستقبل اتصالاتكم واستفساراتكم طوال أيام الأسبوع من 8:00 صباحاً حتى 10:00 مساءً وعبر واتساب في أي وقت.',
    mapFeatureInspectionTitle: 'معاينة وتحديد المتطلبات',
    mapFeatureInspectionDesc: 'فحص حالة الجدران ومعرفة مساحات العمل وتوضيح خطوات التنفيذ والخامات المناسبة لمسكنك.',

    homeServicesBadge: 'خدماتنا المتخصصة',
    homeServicesTitle: 'خدمات الدهانات والديكورات والترميم في جدة',
    homeServicesDesc: 'تسع خدمات متكاملة تشمل الطلاء الداخلي والخارجي والديكورات الحديثة وترميم وصيانة المنازل والفلل والشقق.',
    homeServicesAllBtn: 'استعراض كافة الخدمات (9 خدمات)',
    homeServiceDetailsBtn: 'تفاصيل الخدمة',
    homePortfolioBadge: 'معرض الأعمال والصور',
    homePortfolioTitle: 'نماذج توضيحية للدهانات والديكورات والترميم',
    homePortfolioDesc: 'استعراض بصري لأنماط الدهانات الداخلية والخارجية والديكورات الجدارية وأعمال الترميم والتشطيبات للاستلهام واختيار الطراز المناسب.',
    homePortfolioAllBtn: 'تصفح معرض النماذج الكامل',
    homeAdvantagesBadge: 'لماذا تختارنا',
    homeAdvantagesTitle: 'مميزات العمل معنا في جدة',
    homeAdvantagesDesc: 'نحرص على جودة التنفيذ واختيار الخامات المناسبة والاهتمام بأدق التفاصيل مع الالتزام بالمواعيد.',
    homeStagesBadge: 'منهجية العمل',
    homeStagesTitle: 'مراحل تنفيذ الخدمة خطوة بخطوة',
    homeStagesDesc: 'إجراءات منظمة من المعاينة والتجهيز ومعالجة العيوب وحتى التشطيب والتسليم النظيف.',
    homeFaqBadge: 'إجابات سريعة',
    homeFaqTitle: 'الأسئلة الشائعة',
    homeFaqDesc: 'أبرز الاستفسارات حول خدمات الدهانات والديكورات ومعالجة الرطوبة وترميم المنازل في جدة.',
    homeLocationBadge: 'نطاق الخدمة في جدة',
    homeLocationTitle: 'جدة – المملكة العربية السعودية',
    homeLocationDesc: 'تغطية لأعمال الدهانات والديكورات والترميم في أحياء جدة، مع إمكانية فتح موقعنا مباشرة على خرائط Google أو المراسلة عبر واتساب.',
    homeLocationOpenMapBtn: 'صفحة الموقع والخرائط',
    homeLocationWhatsAppBtn: 'واتساب فوري',

    learnMore: 'اكتشف المزيد',
    requestInspection: 'اطلب الخدمة الآن',
    viewAllWorks: 'عرض جميع النماذج',
    allRightsReserved: 'جميع الحقوق محفوظة',

    footerAbout: 'متخصصون في أعمال الدهانات والطلاء والديكورات الحديثة وترميم وصيانة المنازل والفلل والشقق في مدينة جدة، بكادر مؤهل واهتمام بأدق التفاصيل وجودة التنفيذ.',
    footerMainSectionsTitle: 'أقسام الموقع الرئيسية',
    footerServicesTitle: 'أهم الخدمات في جدة',
    footerCoverageTitle: 'منطقة الخدمة:',
    footerCoverageDesc: 'مدينة جدة – المملكة العربية السعودية',
    footerWorkingHoursTitle: 'أوقات العمل:',
    footerWorkingHoursDetail: 'يومياً: 8:00 صباحاً - 10:00 مساءً',
    footerSeoSearchLogTitle: 'الخدمات والكلمات البحثية المرتبطة في جدة:',
    footerSeoDevIndex: '</> فهرس السيو وإدارة النظام',
    footerDesignerDataBtn: 'بيانات المطور',
    designAndDevBy: 'إعداد وتطوير الواجهة',
    devPortalBtn: 'إدارة النظام',
    footerCopyright: 'جميع الحقوق محفوظة © 2026 معلم دهانات وترميم جدة • جدة – المملكة العربية السعودية.',

    botTitle: 'مساعد معلم دهانات وترميم جدة',
    botSubtitle: 'إجابات سريعة عن الخدمات والتواصل',
    botBadge: 'استعلام فوري',
    botPlaceholder: 'اكتب استفسارك هنا (مثال: ما هي خدماتكم؟ أو كيف أتواصل؟)...',
    botSend: 'إرسال',
    botWhatsAppContinue: 'المراسلة المباشرة عبر واتساب (0507478126)',
    botFaqTitle: 'الأسئلة الشائعة (اضغط للحصول على الإجابة):',
    botClear: 'مسح',
    scrollTopTitle: 'العودة للأعلى',
    callDirectTitle: 'اتصال مباشر: 0507478126',
    whatsAppDirectTitle: 'واتساب مباشر: 0507478126',

    contactBadge: 'تواصل معنا واطلب الخدمة',
    contactTitle: 'نموذج طلب الخدمة',
    contactTitleHighlight: 'والتواصل المباشر',
    contactDesc: 'أرسل تفاصيل طلبك عبر النموذج ليتم فتح محادثة واتساب منظمة بالبيانات، أو تواصل معنا بالاتصال المباشر على 0507478126.',
    contactFormTitle: 'طلب خدمة دهانات أو ديكور أو ترميم',
    contactFormName: 'اسم العميل',
    contactFormPhone: 'رقم الجوال',
    contactFormDistrict: 'الحي أو المنطقة',
    contactFormService: 'نوع الخدمة المطلوبة',
    contactFormNotes: 'تفاصيل الطلب',
    contactFormSubmit: 'إرسال طلب الخدمة عبر واتساب',

    aboutBadge: 'من نحن',
    aboutTitle: 'معلم دهانات وترميم جدة',
    aboutTitleHighlight: 'خبرة في الطلاء والديكور والترميم',
    aboutWhyTitle: 'ركائز العمل التي نحرص عليها في كل مشروع:'
  },
  en: {
    brandName: 'Jeddah Painter & Renovation Master',
    brandTagline: 'Paints, Decors, Architectural Finishing & Home Renovation.',
    brandSubtagline: 'Giving your home renewed beauty with touches of expertise and professionalism.',
    officialAddress: 'Jeddah – Saudi Arabia',
    cityLabel: 'Jeddah – Saudi Arabia',

    navHome: 'Home',
    navServices: 'Services',
    navPortfolio: 'Gallery',
    navQuality: 'Quality & Stages',
    navAbout: 'About Us',
    navLocation: 'Location',
    navContact: 'Contact Us',
    whatsappDirect: 'WhatsApp',
    callDirect: 'Call Us',
    toggleDarkMode: 'Dark Mode',
    toggleLightMode: 'Light Mode',
    switchLang: 'AR',
    copyLink: 'Copy Link',
    linkCopied: 'Section link copied!',

    heroBadge: 'Jeddah – Saudi Arabia • 0507478126',
    heroTitle: 'Jeddah Painter & Renovation Master',
    heroSubtitle: 'Paints, Decors, Finishing, Home Renovation & Maintenance.',
    heroSlogan: 'Giving your home renewed beauty with touches of expertise and professionalism.',
    heroCtaRequest: 'Request Service',
    heroCtaPortfolio: 'Browse Gallery',
    heroCtaCall: 'Call Now',
    heroProposition1: 'Interior & exterior painting for homes, villas & apartments',
    heroProposition2: 'Decorative paints, wallpaper, wood & marble alternatives',
    heroProposition3: 'Crack treatment, peeling repair & moisture solutions',
    heroProposition4: 'Comprehensive home renovation & maintenance across Jeddah',

    pageServicesTitle: 'Jeddah Painting & Renovation Services',
    pageServicesSubtitle: 'Complete solutions in interior/exterior painting, wall decor, wallpaper, wood/marble panels, moisture repair, and home renovation.',
    pageServicesBadge: '9 Integrated Services in Jeddah',
    pagePortfolioTitle: 'Styles & Visual Showcase Gallery',
    pagePortfolioSubtitle: 'Illustrative examples of interior/exterior painting, wall decor, home renovation, and finishing options.',
    pagePortfolioBadge: 'Illustrative Style Showcase',
    pageQualityTitle: 'Work Advantages, Execution Stages & FAQs',
    pageQualitySubtitle: 'Explore our step-by-step workflow from site inspection and surface prep to clean handover.',
    pageQualityBadge: 'Quality Standards & Process',
    pageLocationTitle: 'Jeddah Coverage & Google Maps',
    pageLocationSubtitle: 'Serving residential homes, villas, and apartments across Jeddah, Saudi Arabia.',
    pageLocationBadge: 'Jeddah – Saudi Arabia',
    pageAboutTitle: 'About Jeddah Painter & Renovation Master',
    pageAboutSubtitle: 'Qualified craftsmen specializing in painting, modern decor, and home renovation in Jeddah.',
    pageAboutBadge: 'About Us',
    pageContactTitle: 'Service Request Form & Direct Contact',
    pageContactSubtitle: 'Submit your details to send an organized request directly via WhatsApp, or call 0507478126.',
    pageContactBadge: 'Direct Service in Jeddah',

    innerNavTitle: 'Browse other sections:',

    mapHeaderBadge: 'Jeddah Service Coverage',
    mapHeaderTitle: 'Jeddah Coverage & Google Maps',
    mapHeaderDesc: 'Providing painting, decor, renovation, and wall maintenance services across Jeddah neighborhoods in Saudi Arabia.',
    mapLevelKsa: 'Saudi Arabia',
    mapLevelJeddah: 'Jeddah City',
    mapModeGoogleLive: 'Google Maps Jeddah',
    mapModeInteractive: 'Jeddah Districts & Areas',
    mapModeBlueprint: 'Districts Directory',
    mapModeSatellite: 'Satellite View',
    mapBtnGoogleMaps: 'Our Location on Google Maps',
    mapBtnGoogleMapsApp: 'Open Google Maps Link',
    mapBtnWhatsApp: 'Chat on WhatsApp',
    mapBtnCall: 'Call Now (0507478126)',
    mapRecenterTitle: 'Recenter on Jeddah',
    mapVerifiedBadge: 'Official Link',
    mapRegionsLabel: 'Jeddah Districts & Areas:',
    mapFeatureCoverageTitle: 'Named Jeddah Districts & Areas',
    mapFeatureCoverageDesc: 'Serving all named districts across North, Central, West, East, and South Jeddah for residential painting and renovation.',
    mapFeatureHoursTitle: 'Working Hours',
    mapFeatureHoursDesc: 'Available daily from 8:00 AM to 10:00 PM, with instant WhatsApp inquiries anytime.',
    mapFeatureInspectionTitle: 'On-Site Assessment',
    mapFeatureInspectionDesc: 'Checking wall condition, measuring areas, and recommending suitable materials before starting.',

    homeServicesBadge: 'Our Core Services',
    homeServicesTitle: 'Painting, Decor & Renovation Services in Jeddah',
    homeServicesDesc: 'Nine comprehensive services covering interior/exterior paints, wall decor, and residential renovation.',
    homeServicesAllBtn: 'View All 9 Services',
    homeServiceDetailsBtn: 'Service Details',
    homePortfolioBadge: 'Showcase Gallery',
    homePortfolioTitle: 'Illustrative Paint, Decor & Renovation Models',
    homePortfolioDesc: 'Visual inspiration across interior paints, exterior facades, wall decor, renovation, and modern finishing.',
    homePortfolioAllBtn: 'Open Full Gallery',
    homeAdvantagesBadge: 'Why Work With Us',
    homeAdvantagesTitle: 'Our Work Advantages in Jeddah',
    homeAdvantagesDesc: 'Dedicated craftsmanship, suitable materials, fine attention to detail, and reliable schedules.',
    homeStagesBadge: 'Workflow',
    homeStagesTitle: 'Service Execution Stages',
    homeStagesDesc: 'An organized process from inspection and preparation to finishing and spotless handover.',
    homeFaqBadge: 'Quick Answers',
    homeFaqTitle: 'Frequently Asked Questions',
    homeFaqDesc: 'Common questions about painting, moisture treatment, decor installation, and renovation in Jeddah.',
    homeLocationBadge: 'Service Area',
    homeLocationTitle: 'Jeddah – Saudi Arabia',
    homeLocationDesc: 'Serving Jeddah neighborhoods for paints, decor, and renovation. View our Google Maps link or message on WhatsApp.',
    homeLocationOpenMapBtn: 'Location & Maps Page',
    homeLocationWhatsAppBtn: 'WhatsApp Now',

    learnMore: 'Learn More',
    requestInspection: 'Request Service',
    viewAllWorks: 'View All Models',
    allRightsReserved: 'All rights reserved',

    footerAbout: 'Specialists in residential painting, modern wall decors, home renovation, and maintenance in Jeddah through a qualified team focused on quality and fine detail.',
    footerMainSectionsTitle: 'Main Sections',
    footerServicesTitle: 'Key Services in Jeddah',
    footerCoverageTitle: 'Service Area:',
    footerCoverageDesc: 'Jeddah – Saudi Arabia',
    footerWorkingHoursTitle: 'Working Hours:',
    footerWorkingHoursDetail: 'Daily: 8:00 AM - 10:00 PM',
    footerSeoSearchLogTitle: 'Related Services & Search Topics in Jeddah:',
    footerSeoDevIndex: '</> SEO & System Info',
    footerDesignerDataBtn: 'System Info',
    designAndDevBy: 'Interface Info',
    devPortalBtn: 'System Panel',
    footerCopyright: 'All rights reserved © 2026 Jeddah Painter & Renovation Master • Jeddah, Saudi Arabia.',

    botTitle: 'Service Inquiry Assistant',
    botSubtitle: 'Quick answers on services & contact',
    botBadge: 'Instant Help',
    botPlaceholder: 'Type your question (e.g. services, moisture repair, contact)...',
    botSend: 'Send',
    botWhatsAppContinue: 'Continue on WhatsApp (0507478126)',
    botFaqTitle: 'Common Questions (click to view):',
    botClear: 'Clear',
    scrollTopTitle: 'Back to top',
    callDirectTitle: 'Direct Call: 0507478126',
    whatsAppDirectTitle: 'WhatsApp: 0507478126',

    contactBadge: 'Request a Service',
    contactTitle: 'Service Request Form',
    contactTitleHighlight: '& Direct Contact',
    contactDesc: 'Fill out the service form to send your details directly via WhatsApp, or call 0507478126.',
    contactFormTitle: 'Request Painting, Decor or Renovation Service',
    contactFormName: 'Client Name',
    contactFormPhone: 'Mobile Number',
    contactFormDistrict: 'District / Area',
    contactFormService: 'Requested Service',
    contactFormNotes: 'Request Details',
    contactFormSubmit: 'Send Request via WhatsApp',

    aboutBadge: 'About Us',
    aboutTitle: 'Jeddah Painter & Renovation Master',
    aboutTitleHighlight: 'Painting, Decor & Home Restoration',
    aboutWhyTitle: 'Core Standards We Uphold in Every Project:'
  }
};
