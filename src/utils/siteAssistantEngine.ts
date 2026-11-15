import {
  ABOUT_TEXT,
  ABOUT_TEXT_EN,
  ARTICLES_DATA,
  CONTACT_INFO,
  EXECUTION_STAGES,
  FAQS_LIST,
  JEDDAH_DISTRICTS_SECTORS,
  PAINT_FINISH_SPECS,
  SEO_EXPERT_TOPICS,
  SERVICES_DATA,
  SOCIAL_LINKS,
  WORK_ADVANTAGES,
  getLocalizedService
} from '../data/websiteContent';

export interface AssistantAction {
  type: 'call' | 'whatsapp' | 'maps';
  label: string;
  href: string;
}

export interface AssistantReply {
  text: string;
  actions: AssistantAction[];
}

export function normalizeTextForMatch(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىئ]/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripArabicDefiniteArticle(word: string): string {
  if (word.length > 4 && word.startsWith('ال')) {
    return word.slice(2);
  }
  if (word.length > 5 && (word.startsWith('وال') || word.startsWith('بال') || word.startsWith('كال') || word.startsWith('فال'))) {
    return word.slice(3);
  }
  if (word.length > 4 && word.startsWith('لل')) {
    return word.slice(2);
  }
  return word;
}

// Semantic synonym clusters so any query or similar search phrasing matches accurately
const SEMANTIC_SYNONYM_CLUSTERS: string[][] = [
  [
    'دهان', 'دهانات', 'دهن', 'بويه', 'بويا', 'بويات', 'صبغ', 'صبغه', 'اصباغ', 'صباغ',
    'طلاء', 'طلي', 'تلوين', 'تجهيز', 'paint', 'painter', 'painting', 'coating', 'color'
  ],
  [
    'معلم', 'فني', 'عامل', 'مقاول', 'مهندس', 'استاذ', 'شاطر', 'ممتاز', 'محترف', 'افضل',
    'master', 'contractor', 'technician', 'craftsman', 'specialist', 'expert'
  ],
  [
    'جوتن', 'فينوماستيك', 'الجزيره', 'همبل', 'عسيب', 'سايبس', 'اصلي', 'مطفي', 'ربع لمعه',
    'نصف لمعه', 'نص لمعه', 'لامع', 'حريري', 'بلاستيك', 'زيتي', 'مائي', 'بدون رائحه', 'بدون ريحه',
    'قابل للغسيل', 'جوتاشيلد', 'jotun', 'jazeera', 'matte', 'eggshell', 'silk', 'satin', 'washable'
  ],
  [
    'داخلي', 'داخليه', 'غرف', 'غرفه', 'نوم', 'اطفال', 'مجلس', 'مجالس', 'صاله', 'صالات',
    'شقه', 'شقق', 'فيلا', 'فلل', 'بيت', 'بيوت', 'منزل', 'منازل', 'قصر', 'قصور', 'مكتب', 'مكاتب',
    'محل', 'محلات', 'استراحه', 'ملحق', 'ملاحق', 'جدار', 'جدران', 'حائط', 'حوائط',
    'interior', 'bedroom', 'majlis', 'living', 'hall', 'villa', 'apartment', 'home', 'office'
  ],
  [
    'خارجي', 'خارجيه', 'واجهه', 'واجهات', 'بروفايل', 'رشه', 'امريكيه', 'جرافيت', 'كسر رخام',
    'عازل', 'شمس', 'مطر', 'حوش', 'اسوار', 'سور', 'exterior', 'facade', 'profile', 'texture'
  ],
  [
    'ديكور', 'ديكورات', 'فوم', 'نعلات', 'بانوهات', 'براويز', 'اطارات', 'استيل', 'ورق جدران',
    'ورق حائط', 'بديل الخشب', 'بديل خشب', 'شبيه الخشب', 'تكسيات', 'شرائح', 'بديل الرخام',
    'بديل رخام', 'شبيه الرخام', 'شاشه', 'شاشات', 'تلفزيون', 'جبس', 'جبسمبورد', 'جبس بورد',
    'مخملي', 'شامواه', 'استوكو', 'تعتيق', 'خيال', 'روشن', 'ابداع', 'decor', 'wallpaper',
    'wood', 'wpc', 'marble', 'pvc', 'foam', 'boiserie', 'gypsum', 'ceiling', 'tv'
  ],
  [
    'ترميم', 'ترميمات', 'صيانه', 'تصليح', 'اصلاح', 'تاهيل', 'تجديد', 'اعاده', 'تشطيب', 'تشطيبات',
    'تكسير', 'تعديل', 'تاسيس', 'renovation', 'remodeling', 'repair', 'maintenance', 'refurbish'
  ],
  [
    'رطوبه', 'نشع', 'تسريب', 'ملح', 'املاح', 'تمليح', 'عزل', 'تشقق', 'تشققات', 'شروخ', 'شرخ',
    'تصدع', 'تنميل', 'تقشر', 'تقشير', 'نفخ', 'انتفاخ', 'معجون', 'صنفره', 'تليس', 'لياسه', 'برايمر',
    'ايبوكسي', 'خزانات', 'ارضيات', 'moisture', 'damp', 'crack', 'peeling', 'primer', 'putty', 'epoxy'
  ],
  [
    'سعر', 'اسعار', 'كم', 'بكم', 'تكلفه', 'تكاليف', 'حساب', 'متر', 'عرض سعر', 'مقايسه',
    'تخفيض', 'خصم', 'رخيص', 'مجانا', 'معاينه', 'مصنعيه', 'مواد', 'price', 'cost', 'quote', 'rate'
  ],
  [
    'تواصل', 'اتصال', 'اتصل', 'رقم', 'جوال', 'هاتف', 'تلفون', 'واتس', 'واتساب', 'حجز', 'موعد',
    'انستقرام', 'تيك توك', 'سناب', 'منصات', 'contact', 'call', 'phone', 'whatsapp', 'book'
  ],
  [
    'جده', 'مكه', 'السعوديه', 'شمال جده', 'شرق جده', 'جنوب جده', 'وسط جده', 'حي', 'احياء',
    'مناطق', 'خريطه', 'موقع', 'عنوان', 'ابحر', 'المروه', 'الروضه', 'السلامه', 'الشاطئ', 'المرجان',
    'الحمراء', 'الاندلس', 'الحمدانيه', 'السامر', 'المنار', 'الاجاويد', 'السنابل', 'jeddah', 'map'
  ]
];

const SYNONYM_LOOKUP = new Map<string, string[]>();
for (const group of SEMANTIC_SYNONYM_CLUSTERS) {
  const normalizedGroup = group.map(g => normalizeTextForMatch(g));
  for (const rawTerm of normalizedGroup) {
    const clean = stripArabicDefiniteArticle(rawTerm);
    SYNONYM_LOOKUP.set(rawTerm, normalizedGroup);
    if (clean !== rawTerm) {
      SYNONYM_LOOKUP.set(clean, normalizedGroup);
    }
  }
}

export function expandSearchToken(token: string): string[] {
  const norm = normalizeTextForMatch(token);
  const clean = stripArabicDefiniteArticle(norm);
  const result = new Set<string>([norm, clean]);

  const direct = SYNONYM_LOOKUP.get(norm) || SYNONYM_LOOKUP.get(clean);
  if (direct) {
    for (const term of direct) {
      result.add(term);
      result.add(stripArabicDefiniteArticle(term));
    }
  }
  return Array.from(result).filter(w => w.length >= 2);
}

function isFuzzyClose(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  if (Math.abs(a.length - b.length) > 1) return false;
  // Share at least 3-char prefix for Arabic stems
  if (a.slice(0, 3) !== b.slice(0, 3)) return false;

  let mismatches = 0;
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) mismatches++;
  }
  mismatches += Math.abs(a.length - b.length);
  return mismatches <= 1 && maxLen >= 4;
}

export function smartTokenMatch(haystackRaw: string, tokens: string[]): boolean {
  const haystack = normalizeTextForMatch(haystackRaw);
  const haystackWords = haystack.split(' ').map(stripArabicDefiniteArticle);

  for (const token of tokens) {
    const expanded = expandSearchToken(token);
    for (const candidate of expanded) {
      if (haystack.includes(candidate)) {
        return true;
      }
      if (candidate.length >= 4 && haystackWords.some(w => isFuzzyClose(w, candidate))) {
        return true;
      }
    }
  }
  return false;
}

function buildContactActions(language: 'ar' | 'en', customWhatsAppContext?: string): AssistantAction[] {
  const waText = customWhatsAppContext
    ? language === 'ar'
      ? `السلام عليكم معلم دهانات وترميم جدة، أود الاستفسار عن: ${customWhatsAppContext}`
      : `Hello Jeddah Painter & Renovation Master, I would like details on: ${customWhatsAppContext}`
    : language === 'ar'
      ? 'السلام عليكم ورحمة الله، أود الاستفسار وطلب خدمة دهانات أو ديكورات أو ترميم في جدة.'
      : 'Hello, I would like to inquire about painting, decor, or renovation services in Jeddah.';

  return [
    {
      type: 'call',
      label: language === 'ar' ? `اتصال مباشر: ${CONTACT_INFO.phone}` : `Call Now: ${CONTACT_INFO.phone}`,
      href: `tel:${CONTACT_INFO.internationalPhone}`,
    },
    {
      type: 'whatsapp',
      label: language === 'ar' ? 'تواصل واتساب مباشر' : 'WhatsApp Direct',
      href: `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(waText)}`,
    },
  ];
}

export function buildLocalAssistantReply(
  rawQuery: string,
  language: 'ar' | 'en'
): AssistantReply {
  const q = normalizeTextForMatch(rawQuery);
  const actionsDefault = buildContactActions(language, rawQuery);
  const rawTokens = q.split(' ').filter((w) => w.length >= 2);
  const expandedTokens = Array.from(new Set(rawTokens.flatMap(expandSearchToken)));

  // 1. Direct Contact / Communication / Phone / WhatsApp Queries
  const contactTriggers = [
    'تواصل', 'اتصال', 'اتصل', 'رقم', 'جوال', 'هاتف', 'تلفون', 'واتس', 'واتساب',
    'حجز', 'معاينه', 'موعد', 'اطلب', 'طلب خدمه', 'منصات', 'انستقرام', 'تيك توك', 'سناب',
    'contact', 'call', 'phone', 'whatsapp', 'number', 'book', 'social'
  ];
  const wantsContact = contactTriggers.some((k) => q.includes(normalizeTextForMatch(k)));
  const wantsSocial = ['انستقرام', 'تيك توك', 'سناب', 'منصات', 'حساب', 'social', 'tiktok', 'instagram', 'snapchat'].some((k) =>
    q.includes(normalizeTextForMatch(k))
  );

  if (wantsSocial) {
    const socialSummary = SOCIAL_LINKS.map((s) => `• ${s.name}: ${s.description}`).join('\n');
    return {
      text:
        language === 'ar'
          ? `🌐 قنوات التواصل الرسمية لـ «${CONTACT_INFO.name}»:\n${socialSummary}\n\n📞 الاتصال المباشر: ${CONTACT_INFO.phone} (${CONTACT_INFO.formattedPhone})\n🕒 ${CONTACT_INFO.workingHours}`
          : `🌐 Official Channels for ${CONTACT_INFO.nameEn}:\n• Direct Phone: ${CONTACT_INFO.phone}\n• WhatsApp: ${CONTACT_INFO.whatsappNumber}\n• Google Maps, TikTok, Instagram & Snapchat are active in the Contact section.`,
      actions: [
        ...buildContactActions(language),
        {
          type: 'maps',
          label: language === 'ar' ? 'موقعنا على خرائط Google' : 'Open Google Maps',
          href: CONTACT_INFO.googleMapsPrimaryUrl,
        },
      ],
    };
  }

  // 2. Specific District / Location / Google Maps Queries (with definite-article & fuzzy match)
  for (const sector of JEDDAH_DISTRICTS_SECTORS) {
    const list = language === 'ar' ? sector.districtsAr : sector.districtsEn;
    const matchedDistrict = list.find((d) => {
      const dn = normalizeTextForMatch(d);
      const dStem = stripArabicDefiniteArticle(dn);
      return q.includes(dn) || (dStem.length >= 3 && rawTokens.some(t => isFuzzyClose(stripArabicDefiniteArticle(t), dStem)));
    });
    if (matchedDistrict) {
      const regionName = language === 'ar' ? sector.regionAr : sector.regionEn;
      return {
        text:
          language === 'ar'
            ? `📍 نعم، نخدم حي «${matchedDistrict}» (${regionName}) وكافة أحياء مدينة جدة يومياً!\n\n✅ ننفذ في ${matchedDistrict} جميع أعمال الدهانات الداخلية والخارجية والديكورات والترميم وصيانة المنازل مع المعاينة الميدانية.\n🗺️ أبرز الأحياء المجاورة في ${regionName}: ${sector.districtsAr.slice(0, 10).join('، ')}.\n\nتواصل معنا الآن لحجز معاينة في ${matchedDistrict}:`
            : `📍 Yes! We serve ${matchedDistrict} (${regionName}) and all districts across Jeddah daily.\n\nCall or message us directly on WhatsApp for an on-site visit in ${matchedDistrict}:`,
        actions: [
          ...buildContactActions(language, `استفسار عن خدمة في حي ${matchedDistrict} بجدة`),
          {
            type: 'maps',
            label: language === 'ar' ? 'خرائط Google' : 'Google Maps',
            href: CONTACT_INFO.googleMapsPrimaryUrl,
          },
        ],
      };
    }
  }

  const areaTriggers = ['موقع', 'مكان', 'وين', 'عنوان', 'خريطه', 'احياء', 'مناطق', 'تغطيه', 'شمال جده', 'شرق جده', 'جنوب جده', 'وسط جده', 'جده', 'location', 'map', 'address', 'district', 'area'];
  if (areaTriggers.some((k) => q.includes(normalizeTextForMatch(k))) && !q.includes('سعر') && !q.includes('دهان') && !q.includes('صبغ') && !q.includes('خدم')) {
    const sectorsText = JEDDAH_DISTRICTS_SECTORS.map(
      (s) =>
        `• ${language === 'ar' ? s.regionAr : s.regionEn}: ${(language === 'ar' ? s.districtsAr : s.districtsEn).slice(0, 8).join('، ')} وغيرها`
    ).join('\n');

    return {
      text:
        language === 'ar'
          ? `📍 نخدم جميع أحياء ومناطق مدينة جدة – المملكة العربية السعودية:\n${sectorsText}\n\n🕒 مواعيد العمل: ${CONTACT_INFO.workingHours}\nيمكنك الاطلاع على موقعنا مباشرة عبر خرائط Google أو التواصل الفوري:`
          : `📍 Serving all Jeddah districts (North, Central, East & South Jeddah):\n${sectorsText}\n\n🕒 Hours: ${CONTACT_INFO.workingHoursEn}`,
      actions: [
        ...buildContactActions(language),
        {
          type: 'maps',
          label: language === 'ar' ? 'فتح موقعنا على Google Maps' : 'Open Google Maps',
          href: CONTACT_INFO.googleMapsPrimaryUrl,
        },
      ],
    };
  }

  // 3. All 9 Services Summary Request
  const allServicesTriggers = ['كل الخدمات', 'الخدمات التسع', 'جميع الخدمات', 'وش خدماتكم', 'ما هي الخدمات', 'خدماتكم', 'قائمه الخدمات', 'all services', 'what services'];
  if (allServicesTriggers.some((k) => q.includes(normalizeTextForMatch(k)))) {
    const listText = SERVICES_DATA.map((s, idx) => {
      const loc = getLocalizedService(s, language);
      return `${idx + 1}. ${loc.title}`;
    }).join('\n');

    return {
      text:
        language === 'ar'
          ? `🎨 نقدم في «معلم دهانات وترميم جدة» 9 خدمات متكاملة بأعلى جودة:\n${listText}\n\n💡 اكتب اسم أي خدمة أو كلمة بحث مشابهة (مثل: صبغ، بوية، بروفايل، بديل الخشب، معالجة الرطوبة، ترميم) لعرض تفاصيلها الكاملة!`
          : `🎨 Jeddah Painter & Renovation Master offers 9 core services:\n${listText}\n\n💡 Type any service name to see its complete specifications!`,
      actions: actionsDefault,
    };
  }

  // 4. Match Any Specific Service from SERVICES_DATA with Semantic Synonym Expansion + Exact Boost
  let bestServiceScore = 0;
  let bestService = SERVICES_DATA[0];

  const stopWords = new Set(['جده', 'معلم', 'خدمه', 'بكم', 'كم', 'عن', 'في', 'من', 'الي', 'ابغي', 'اريد', 'هل', 'وش', 'ما', 'افضل', 'ارخص']);
  const meaningfulRaw = rawTokens.filter(t => !stopWords.has(stripArabicDefiniteArticle(t)));
  const searchPool = Array.from(new Set([
    ...meaningfulRaw,
    ...meaningfulRaw.flatMap(expandSearchToken)
  ])).filter(t => t.length >= 3 && !stopWords.has(t));

  for (const service of SERVICES_DATA) {
    const loc = getLocalizedService(service, language);
    const titleNorm = normalizeTextForMatch(loc.title);
    const keywordsNorm = (loc.searchKeywords || []).map(kw => normalizeTextForMatch(kw));
    const haystack = normalizeTextForMatch(
      [
        loc.title,
        loc.shortDesc,
        loc.fullDesc,
        loc.features.join(' '),
        (loc.searchKeywords || []).join(' '),
      ].join(' ')
    );

    let score = 0;
    for (const token of meaningfulRaw) {
      const cleanToken = stripArabicDefiniteArticle(token);
      if (titleNorm.includes(cleanToken)) score += 7;
      else if (keywordsNorm.some(kw => kw.includes(cleanToken))) score += 5;
      else if (haystack.includes(cleanToken)) score += 3;
    }

    for (const syn of searchPool) {
      if (meaningfulRaw.includes(syn)) continue;
      if (titleNorm.includes(syn)) score += 2;
      else if (haystack.includes(syn)) score += 1;
    }

    if (score > bestServiceScore) {
      bestServiceScore = score;
      bestService = service;
    }
  }

  if (bestServiceScore >= 3) {
    const loc = getLocalizedService(bestService, language);
    const featuresBullets = loc.features.map((f) => `✅ ${f}`).join('\n');
    const keywordsLine =
      loc.searchKeywords && loc.searchKeywords.length > 0
        ? `\n🔎 يشمل أيضاً: ${loc.searchKeywords.slice(0, 5).join(' • ')}`
        : '';

    return {
      text:
        language === 'ar'
          ? `🎨 ${loc.title}\n\n${loc.fullDesc}\n\n📌 أبرز تفاصيل التنفيذ:\n${featuresBullets}${keywordsLine}\n\n📞 لطلب الخدمة أو حجز معاينة مجانية في جدة:`
          : `🎨 ${loc.title}\n\n${loc.fullDesc}\n\n📌 Key Highlights:\n${featuresBullets}\n\n📞 Contact us directly to book this service in Jeddah:`,
      actions: buildContactActions(language, loc.title),
    };
  }

  // 5. Contact Request Explicitly Asked (without specific service match)
  if (wantsContact) {
    return {
      text:
        language === 'ar'
          ? `📞 يسعدنا تواصلكم المباشر مع «${CONTACT_INFO.name}»:\n• الاتصال الهاتفي المباشر: ${CONTACT_INFO.phone} (${CONTACT_INFO.formattedPhone})\n• واتساب: ${CONTACT_INFO.whatsappNumber}\n• التغطية: ${CONTACT_INFO.coverage}\n• ساعات العمل: ${CONTACT_INFO.workingHours}\n\nاختر طريقة التواصل المباشر بالأسفل:`
          : `📞 Reach ${CONTACT_INFO.nameEn} directly:\n• Phone: ${CONTACT_INFO.phone} (${CONTACT_INFO.internationalPhone})\n• WhatsApp: ${CONTACT_INFO.whatsappNumber}\n• Hours: ${CONTACT_INFO.workingHoursEn}`,
      actions: [
        ...buildContactActions(language),
        {
          type: 'maps',
          label: language === 'ar' ? 'موقعنا على Google Maps' : 'Google Maps',
          href: CONTACT_INFO.googleMapsPrimaryUrl,
        },
      ],
    };
  }

  // 6. Pricing & Cost / Meter Rate Queries
  const priceTriggers = ['سعر', 'اسعار', 'تكلفه', 'كم المتر', 'متر', 'بكم', 'رخيص', 'عرض سعر', 'تسعير', 'مقايسه', 'price', 'cost', 'rate', 'quote'];
  if (priceTriggers.some((k) => q.includes(normalizeTextForMatch(k)))) {
    const pricingFaq = FAQS_LIST.find((f) => f.id === 'faq-pricing');
    return {
      text:
        language === 'ar'
          ? `💰 تسعير الدهانات والترميم في جدة:\n${pricingFaq?.answer || ''}\n\n📌 نوفر خيارين: تنفيذ كامل شامل الدهانات الأصلية (جوتن / الجزيرة) أو مصنعية احترافية فقط، مع معاينة ورفع مقاسات دقيق في جميع أحياء جدة.`
          : `💰 Pricing & Quotes in Jeddah:\n${pricingFaq?.answerEn || ''}`,
      actions: buildContactActions(language, 'طلب معاينة ومعرفة سعر المتر وعرض السعر في جدة'),
    };
  }

  // 7. Paint Brands & Finishes (جوتن، الجزيرة، مطفي، ربع لمعة، نصف لمعة، حريري، بروفايل)
  const finishTriggers = ['جوتن', 'الجزيره', 'همبل', 'مطفي', 'ربع لمعه', 'نصف لمعه', 'حريري', 'انواع الدهان', 'افضل دهان', 'كتالوج', 'الوان', 'jotun', 'matte', 'silk', 'color'];
  if (finishTriggers.some((k) => q.includes(normalizeTextForMatch(k)))) {
    const specsList = PAINT_FINISH_SPECS.map(
      (sp) =>
        `• ${language === 'ar' ? sp.nameAr : sp.nameEn}: ${language === 'ar' ? `${sp.usageAr} — ${sp.benefitAr}` : `${sp.usageEn} — ${sp.benefitEn}`}`
    ).join('\n');

    return {
      text:
        language === 'ar'
          ? `🎨 أنواع الدهانات والتشطيبات المعتمدة لدينا (جوتن والجزيرة وغيرها):\n${specsList}\n\n💬 نساعدك في اختيار الدرجة اللونية المناسبة لإضاءة وأثاث منزلك أثناء المعاينة.`
          : `🎨 Approved Paint Systems & Finishes:\n${specsList}`,
      actions: buildContactActions(language, 'استشارة اختيار نوع ولون الدهانات في جدة'),
    };
  }

  // 8. Work Stages / Execution Workflow / Quality / Team / About
  const stagesTriggers = ['خطوات', 'مراحل', 'كيف تشتغل', 'طريقه العمل', 'كيف يتم', 'stages', 'steps', 'process'];
  if (stagesTriggers.some((k) => q.includes(normalizeTextForMatch(k)))) {
    const stagesText = EXECUTION_STAGES.map(
      (st) => `${st.step}. ${language === 'ar' ? st.title : st.titleEn}: ${language === 'ar' ? st.description : st.descriptionEn}`
    ).join('\n');

    return {
      text:
        language === 'ar'
          ? `📋 مراحل تنفيذ العمل لدينا لضمان أعلى جودة:\n${stagesText}`
          : `📋 Our 4-Stage Execution Workflow:\n${stagesText}`,
      actions: actionsDefault,
    };
  }

  const qualityTriggers = ['مميزات', 'ليش انتم', 'جوده', 'ضمان', 'نظافه', 'اثاث', 'ارضيات', 'من انتم', 'خبره', 'quality', 'about', 'clean', 'furniture'];
  if (qualityTriggers.some((k) => q.includes(normalizeTextForMatch(k)))) {
    const advText = WORK_ADVANTAGES.slice(0, 4)
      .map((a) => `✅ ${language === 'ar' ? a.title : a.titleEn}: ${language === 'ar' ? a.description : a.descriptionEn}`)
      .join('\n');

    return {
      text:
        language === 'ar'
          ? `⭐ ${ABOUT_TEXT.headline} — ${ABOUT_TEXT.subheadline}\n\n${advText}`
          : `⭐ ${ABOUT_TEXT_EN.headline} — ${ABOUT_TEXT_EN.subheadline}\n\n${advText}`,
      actions: actionsDefault,
    };
  }

  // 9. Match FAQS_LIST, Articles & SEO_EXPERT_TOPICS with expanded tokens
  let bestFaqScore = 0;
  let bestFaq = FAQS_LIST[0];
  for (const faq of FAQS_LIST) {
    const hay = normalizeTextForMatch(`${faq.question} ${faq.answer}`);
    let score = 0;
    for (const token of expandedTokens) {
      if (token.length >= 3 && hay.includes(token)) score += 2;
    }
    if (score > bestFaqScore) {
      bestFaqScore = score;
      bestFaq = faq;
    }
  }

  if (bestFaqScore >= 2) {
    return {
      text:
        language === 'ar'
          ? `💡 ${bestFaq.question}\n\n${bestFaq.answer}`
          : `💡 ${bestFaq.questionEn}\n\n${bestFaq.answerEn}`,
      actions: actionsDefault,
    };
  }

  for (const article of ARTICLES_DATA) {
    const hay = `${article.titleAr} ${article.excerptAr} ${article.keywordsAr.join(' ')} ${article.titleEn} ${article.keywordsEn.join(' ')}`;
    if (smartTokenMatch(hay, rawTokens)) {
      return {
        text:
          language === 'ar'
            ? `📰 ${article.titleAr}\n\n${article.excerptAr}\n\n${article.bulletPointsAr.map((p) => `✅ ${p}`).join('\n')}`
            : `📰 ${article.titleEn}\n\n${article.excerptEn}`,
        actions: actionsDefault,
      };
    }
  }

  for (const topic of SEO_EXPERT_TOPICS) {
    const hay = `${topic.titleAr} ${topic.summaryAr} ${topic.keywordsAr.join(' ')} ${topic.titleEn}`;
    if (smartTokenMatch(hay, rawTokens)) {
      return {
        text:
          language === 'ar'
            ? `📘 ${topic.titleAr}\n\n${topic.summaryAr}\n\n${topic.pointsAr.map((p) => `• ${p}`).join('\n')}`
            : `📘 ${topic.titleEn}\n\n${topic.summaryEn}`,
        actions: actionsDefault,
      };
    }
  }

  // 10. Helpful Default Reply Covering Complete Site Info + Direct Call & WhatsApp Buttons
  return {
    text:
      language === 'ar'
        ? `أهلاً بك في «${CONTACT_INFO.name}»! بخصوص استفسارك: "${rawQuery}"\n\nيتوفر لدينا 9 خدمات متكاملة في جدة:\n• الدهانات الداخلية والخارجية (جوتن والجزيرة وبروفايل)\n• الديكورات (فوم، بديل الخشب والرخام، ورق الجدران)\n• ترميم المنازل والفلل ومعالجة الرطوبة والتشققات وصيانة الأسقف والأبواب.\n\n📞 للتفاصيل الفورية أو المعاينة في أي حي بجدة، تواصل معنا مباشرة:`
        : `Welcome to ${CONTACT_INFO.nameEn}! Regarding "${rawQuery}":\n\nWe provide interior & exterior painting, modern wall decors (WPC wood, marble panels, foam trims, wallpaper), and full home/villa renovation across all Jeddah districts.\n\nReach us directly below:`,
    actions: [
      ...actionsDefault,
      {
        type: 'maps',
        label: language === 'ar' ? 'خرائط Google' : 'Google Maps',
        href: CONTACT_INFO.googleMapsPrimaryUrl,
      },
    ],
  };
}
