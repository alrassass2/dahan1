import modernDecorTvImg from "../assets/images/modern_decor_tv_1789838366883.webp";
import surfacePrepImg from "../assets/images/surface_preparation_1789838453046.webp";
import luxuryMajlisImg from "../assets/images/luxury_majlis_wall_1789838393035.webp";
import lamasatShowcaseImg from "../assets/images/lamasat_showcase_1789838404264.webp";
import interiorPaintImg from "../assets/images/interior_paint_1789838317923.webp";
import classicFoamImg from "../assets/images/classic_foam_moldings_1789838377780.webp";
import villaStairsImg from "../assets/images/villa_staircase_1789838416528.webp";
import commercialFinishImg from "../assets/images/commercial_finish_1789838441177.webp";
import tvWallDecorImg from "../assets/images/tv_wall_decor_1789838364623.webp";
import gypsumCeilingImg from "../assets/images/gypsum_ceiling_led_1789838390013.webp";
import craftsmanPaintingImg from "../assets/images/craftsman_painting_1789838401882.webp";
import bedroomWoodPanelImg from "../assets/images/bedroom_wood_panel_1789838428269.webp";
import modernTvMarbleImg from "../assets/images/modern_tv_marble_1789838465230.webp";
import saudiHomeRenovationImg from "../assets/images/saudi_home_paint_renovation_1789839780100.webp";
import wallLevelingImg from "../assets/images/surface_prep_wall_1789838382638.webp";
import article1Img from "../assets/images/articles/article-1.png";
import article2Img from "../assets/images/articles/article-2.jpg";
import article3Img from "../assets/images/articles/article-3.jpg";
import article4Img from "../assets/images/articles/article-4.png";
import article5Img from "../assets/images/articles/article-5.jpg";
import article6Img from "../assets/images/articles/article-6.png";

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  category: string;
  categoryEn?: string;
  imageUrl: string;
  altText: string;
  description: string;
  descriptionEn?: string;
  tags: string[];
  tagsEn?: string[];
}

export interface SocialLinkItem {
  id: string;
  name: string;
  username: string;
  url: string;
  icon: string;
  color: string;
  bgColor: string;
  gradient?: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleEn?: string;
  shortDesc: string;
  shortDescEn?: string;
  fullDesc: string;
  fullDescEn?: string;
  imageUrl: string;
  altText: string;
  features: string[];
  featuresEn?: string[];
  searchKeywords?: string[];
  searchKeywordsEn?: string[];
  iconName: string;
}

export interface WorkAdvantageItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
}

export interface ExecutionStageItem {
  step: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export const HERO_VISUAL_IMAGE = lamasatShowcaseImg;

export const CONTACT_INFO = {
  name: "معلم دهانات وترميم جدة",
  nameEn: "Jeddah Painter & Renovation Master",
  businessDescription: "دهانات وديكورات وتشطيبات وترميم وصيانة المنازل.",
  businessDescriptionEn: "Paints, Decors, Architectural Finishing, Home Renovation & Maintenance.",
  slogan: "نمنح منزلك جمالاً جديداً بلمسات من الخبرة والاحترافية.",
  sloganEn: "Giving your home renewed beauty with touches of expertise and professionalism.",
  phone: "0507478126",
  formattedPhone: "050 747 8126",
  internationalPhone: "+966507478126",
  whatsappUrl: "https://wa.me/966507478126",
  whatsappNumber: "+966 50 747 8126",
  city: "جدة – المملكة العربية السعودية",
  cityEn: "Jeddah, Saudi Arabia",
  googleMapsPrimaryUrl: "https://share.google/gJLFPX7o9xhbCC77O",
  googleMapsSecondaryUrl: "https://maps.app.goo.gl/qhaHFhorm24MGTT27?g_st=awb",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.9931233543125!2d39.210401499999996!3d21.5471242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d4de0923a1e7eef%3A0x7e01f53694294502!2z2YXYudmE2YUg2K_Zh9in2YbYp9iqINmI2KrYsdmF2YrZhSDYrNiv2Yc!5e0!3m2!1sar!2s!4v1794662394610!5m2!1sar!2s",
  coordinates: {
    lat: 21.5471242,
    lng: 39.2104015,
  },
  workingHours: "طوال أيام الأسبوع: 8:00 صباحاً - 10:00 مساءً",
  workingHoursEn: "Daily: 8:00 AM - 10:00 PM (Consultation & Quotes 24/7)",
  coverage: "نخدم جميع أحياء مدينة جدة – المملكة العربية السعودية",
  coverageEn: "Serving all Jeddah districts – Saudi Arabia",
};

export function getLocalizedService(service: ServiceItem, lang: 'ar' | 'en'): ServiceItem {
  if (lang === 'en') {
    return {
      ...service,
      title: service.titleEn || service.title,
      shortDesc: service.shortDescEn || service.shortDesc,
      fullDesc: service.fullDescEn || service.fullDesc,
      features: service.featuresEn || service.features,
      searchKeywords: service.searchKeywordsEn || service.searchKeywords,
    };
  }
  return service;
}

export function getLocalizedPortfolioItem(item: PortfolioItem, lang: 'ar' | 'en'): PortfolioItem {
  if (lang === 'en') {
    return {
      ...item,
      title: item.titleEn || item.title,
      subtitle: item.subtitleEn || item.subtitle,
      category: item.categoryEn || item.category,
      description: item.descriptionEn || item.description,
      tags: item.tagsEn || item.tags,
    };
  }
  return item;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "interior-paints",
    title: "الدهانات الداخلية للمنازل والفلل والشقق",
    titleEn: "Interior Painting for Homes, Villas & Apartments",
    shortDesc: "تنفيذ دهانات داخلية جدة بأيدي أفضل معلم دهانات جدة ومعلم بوية جدة باستخدام دهانات جوتن والجزيرة مطفي وربع لمعة وحريري قابلة للغسيل.",
    shortDescEn: "Precision interior wall and ceiling painting for homes, villas, and apartments across Jeddah using Jotun & Al-Jazeera washable finishes.",
    fullDesc: "نقدم خدمات دهانات جدة المتكاملة مع معلم دهان جدة ومعلم بوية جدة متخصص في تنفيذ الدهانات الداخلية للمنازل والفلل والشقق الجديدة والمستعملة، بدءاً من فحص الجدران وصنفرتها وتأسيسها بالمعجون وحتى تطبيق دهانات جوتن والجزيرة المطفي والنصف لمعة والربع لمعة والدهانات البلاستيكية والزيتية للأبواب، مع توضيح سعر متر الدهان في جدة بكل شفافية.",
    fullDescEn: "We provide full interior painting for homes, villas, and apartments in Jeddah—covering wall inspection, sanding, putty leveling, and certified Jotun/Al-Jazeera topcoats in matte, eggshell, and silk finishes.",
    imageUrl: interiorPaintImg,
    altText: "دهانات داخلية جدة للمنازل والفلل والشقق - معلم دهانات جدة ومعلم بوية جدة",
    features: [
      "تجهيز وصنفرة الجدران وتنعيم الأسطح بالمعجون التأسيسي",
      "تطبيق دهانات جوتن والجزيرة الأصلية القابلة للغسيل",
      "دهانات مطفية وربع لمعة وحريرية بألوان حديثة متناسقة",
      "دهان الأبواب الخشبية والحديدية مع تغليف وحماية الأرضيات"
    ],
    featuresEn: [
      "Wall sanding, putty leveling, and surface preparation",
      "Authentic durable Jotun & Al-Jazeera washable paint coats",
      "Matte, eggshell, and silk color coordination",
      "Wood/metal door painting with full floor protection"
    ],
    searchKeywords: [
      "معلم دهانات جدة",
      "معلم دهان جدة",
      "معلم بوية جدة",
      "دهانات داخلية جدة",
      "دهانات جوتن جدة",
      "دهانات الجزيرة جدة",
      "دهان ربع لمعة ومطفي",
      "سعر متر الدهان في جدة"
    ],
    searchKeywordsEn: [
      "Jeddah Interior Painter",
      "Jotun Paints Jeddah",
      "Al-Jazeera Paints Jeddah",
      "Washable Matte & Eggshell Paint"
    ],
    iconName: "Paintbrush"
  },
  {
    id: "exterior-facades",
    title: "الدهانات الخارجية ودهانات الواجهات",
    titleEn: "Exterior & Facade Painting",
    shortDesc: "تنفيذ دهانات خارجية جدة ودهان بروفايل وكسر رخام ورشات خارجية للواجهات والفلل والمباني مقاومة لحرارة الشمس ورطوبة جدة الساحلية.",
    shortDescEn: "Weather-resistant exterior facade, textured profile, and stone-chip painting engineered to withstand Jeddah heat and coastal humidity.",
    fullDesc: "تتطلب واجهات المباني في مدينة جدة دهانات خارجية جدة تتحمل الأجواء الساحلية وأشعة الشمس والرطوبة. نقوم بتنظيف وتأسيس الواجهات وتنفيذ دهان بروفايل جدة، الرشة الأمريكية، كسر الرخام، والجرافيت والدهانات العازلة للحفاظ على واجهة الفيلا أو العمارة لسنوات طويلة.",
    fullDescEn: "Jeddah facades require resilient exterior coatings. We clean, prime, and apply textured profile, American spray texture, and smooth weather-shield paints against salt, humidity, and sun exposure.",
    imageUrl: lamasatShowcaseImg,
    altText: "دهانات خارجية جدة وبروفايل وكسر رخام للواجهات والفلل",
    features: [
      "دهانات خارجية جدة مقاومة للشمس والأملاح والرطوبة الساحلية",
      "تنفيذ دهان بروفايل واجهات ورشة أمريكية وكسر رخام",
      "تأسيس برايمر خارجي عازل يمنع تقشر الطلاء أو تبهيته",
      "طلاء واجهات الفلل والعمائر والأسوار والملاحق بجدة"
    ],
    featuresEn: [
      "Exterior coatings resistant to sun and coastal humidity",
      "Textured profile, American spray & smooth facade finishes",
      "Alkali-resistant priming to prevent peeling or fading",
      "Coverage for villas, buildings, boundary walls & annexes"
    ],
    searchKeywords: [
      "دهانات خارجية جدة",
      "دهان واجهات جدة",
      "دهان بروفايل جدة",
      "رشة أمريكية جدة",
      "دهان كسر رخام جدة",
      "دهان جرافيت واجهات",
      "مقاول دهانات خارجية جدة"
    ],
    searchKeywordsEn: [
      "Exterior Facade Painting Jeddah",
      "Profile Coating Jeddah",
      "Weather Shield Paint"
    ],
    iconName: "Building2"
  },
  {
    id: "majlis-halls-bedrooms",
    title: "دهانات المجالس والصالات وغرف النوم",
    titleEn: "Majlis, Living Hall & Bedroom Painting",
    shortDesc: "تشطيب وتجديد دهانات جدة للمجالس والصالات وغرف النوم والأطفال بألوان جوتن الحديثة (أوف وايت، جريج، بيج) بدون رائحة وبسرعة إنجاز.",
    shortDescEn: "Refined color finishes for guest majlises, living halls, and bedrooms using low-odor off-white, greige, and warm modern shades.",
    fullDesc: "لكل غرفة في المنزل طابعها الخاص؛ ننفذ عبر أفضل معلم دهانات في جدة وأمهر فني بوية جدة دهانات المجالس والصالات الفخمة وغرف النوم وغرف الأطفال بألوان عصرية هادئة من كتالوجات جوتن والجزيرة مثل الأوف وايت والجريج والرمادي الدافئ بتشطيبات ناعمة خالية من الرائحة.",
    fullDescEn: "Each room has its own mood—majlises call for welcoming sophistication while bedrooms benefit from low-odor soothing palettes. We coordinate shades and execute crisp, clean paint lines across all spaces.",
    imageUrl: luxuryMajlisImg,
    altText: "دهانات المجالس والصالات وغرف النوم في جدة - دهانات جوتن والجزيرة",
    features: [
      "تنسيقات لونية خاصة بالمجالس وصالات الضيافة بالفلل والشقق",
      "دهانات غرف نوم وغرف أطفال منخفضة الرائحة وقابلة للغسيل",
      "دقة متناهية في قص الزوايا وتقاطع الأسقف مع الجدران",
      "تنفيذ ألوان كتالوج جوتن والجزيرة (جريج، أوف وايت، كشمير)"
    ],
    featuresEn: [
      "Custom color styling for majlises and reception halls",
      "Low-odor washable tones ideal for bedrooms & kids rooms",
      "Crisp corner cut-ins between ceilings and walls",
      "Modern catalog shades (Off-White, Greige, Warm Neutral)"
    ],
    searchKeywords: [
      "دهانات مجالس جدة",
      "دهان صالات وغرف نوم",
      "ألوان دهانات جوتن الحديثة",
      "تجديد دهانات شقق جدة",
      "معلم دهانات شقق وفلل جدة",
      "بويه بدون رائحة جدة"
    ],
    searchKeywordsEn: [
      "Majlis & Bedroom Paint Jeddah",
      "Modern Interior Color Palettes",
      "Low Odor Apartment Repainting"
    ],
    iconName: "Home"
  },
  {
    id: "wall-decorative-paints",
    title: "الديكورات الجدارية والدهانات الديكورية",
    titleEn: "Wall Decors & Decorative Paints",
    shortDesc: "تنفيذ دهانات وديكورات جدة الحديثة والدهانات الديكورية (مخملي، شامواه، إستوكو، إسمنتي، تعتيق) وبراويز الفوم والبانوهات بإشراف معلم ديكورات جدة.",
    shortDescEn: "Modern decorative paint textures (velvet, suede, stucco, concrete-look), foam moldings, and geometric wall boiserie.",
    fullDesc: "ننفذ عبر معلم ديكورات جدة أحدث الدهانات الديكورية الفاخرة مثل دهان الشامواه والمخملي وورود وروشن وإستوكو وأسمنتي والترخيم والتعتيق، مع تركيب ودهان براويز الفوم والبانوهات الجدارية لإبراز جمال الجدران الرئيسية في المجالس والصالات.",
    fullDescEn: "We apply modern decorative finishes including velvet, suede, concrete-look, stucco, and textured metallic paints alongside mitered foam moldings and classic boiserie trims.",
    imageUrl: classicFoamImg,
    altText: "دهانات وديكورات جدة وبراويز فوم ودهان شامواه ومخملي - معلم ديكورات جدة",
    features: [
      "تركيب ودهان براويز الفوم والبانوهات المودرن والكلاسيك",
      "تنفيذ دهانات ديكورية: مخملي، شامواه، روشن، وإسمنتي",
      "تأثيرات تعتيق وترخيم وإستوكو لمداخل الفلل والمجالس",
      "تشطيب نظيف للزوايا والفواصل متناسق مع الإضاءة"
    ],
    featuresEn: [
      "Foam molding & wall paneling installation and painting",
      "Velvet, suede, stucco, and concrete-look decorative paints",
      "Feature accents for foyers and reception spaces",
      "Seamless corner joints and crisp edges"
    ],
    searchKeywords: [
      "دهانات وديكورات جدة",
      "معلم ديكورات جدة",
      "دهان مخملي وشامواه جدة",
      "ديكورات فوم وبانوهات جدة",
      "دهان إسمنتي وإستوكو",
      "دهان ديكوري جدة"
    ],
    searchKeywordsEn: [
      "Decorative Wall Paints Jeddah",
      "Foam Boiserie Moldings",
      "Velvet & Concrete Effect Paint"
    ],
    iconName: "Palette"
  },
  {
    id: "wallpaper-wood-marble",
    title: "ورق الجدران وبديل الخشب والرخام",
    titleEn: "Wallpaper, Wood & Marble Alternatives",
    shortDesc: "معلم تركيب ورق جدران جدة وألواح بديل الخشب وبديل الرخام وبديل الحجر لخلفيات الشاشات والصالات ومداخل الفلل.",
    shortDescEn: "Installing modern 3D wallpaper, fluted wood (WPC), stone-look, and marble-look (PVC) panels for TV walls and entrances.",
    fullDesc: "نوفر خدمات معلم ديكورات جدة لتركيب ورق الجدران ثلاثي الأبعاد والكلاسيكي والمودرن، مع تركيب ألواح بديل الخشب (WPC) وبديل الرخام (PVC) وبديل الشيبورد لخلفيات شاشات التلفزيون والمداخل وغرف النوم بدقة متناهية.",
    fullDescEn: "We install contemporary 3D wallpapers alongside WPC fluted wood and PVC marble-look panels for TV consoles, foyers, and living spaces with clean light strip integration.",
    imageUrl: modernDecorTvImg,
    altText: "تركيب ورق جدران جدة وبديل الخشب والرخام لخلفيات الشاشات",
    features: [
      "تركيب ورق جدران جدة ثلاثي الأبعاد وخالٍ من الفقاعات",
      "تصميم وتنفيذ خلفيات شاشات ببديل الخشب وبديل الرخام",
      "قص وتثبيت احترافي للزوايا والأفياش ومخارج الكهرباء",
      "دمج متناسق مع الإضاءة المخفية ودهان الجدران المجاورة"
    ],
    featuresEn: [
      "Bubble-free 3D & modern wallpaper installation",
      "TV wall backdrops combining wood & marble panels",
      "Clean cutouts around outlets and corners",
      "Integrated ambient LED light strips"
    ],
    searchKeywords: [
      "ورق جدران جدة",
      "معلم ورق جدران جدة",
      "بديل الخشب جدة",
      "بديل الرخام جدة",
      "ديكور خلفيات شاشات جدة",
      "تركيب فوم وبديل خشب"
    ],
    searchKeywordsEn: [
      "Wallpaper Installation Jeddah",
      "WPC Fluted Wood Panels",
      "PVC Marble TV Wall Backdrop"
    ],
    iconName: "Sparkles"
  },
  {
    id: "home-renovation",
    title: "ترميم وتجديد المنازل والتشطيبات الداخلية",
    titleEn: "Home Renovation & Interior Finishing",
    shortDesc: "مقاول ترميم منازل جدة وترميم فلل جدة والشقق القديمة، وتجديد دهانات جدة والتشطيبات الداخلية ودهان الإيبوكسي للأرضيات.",
    shortDescEn: "Comprehensive renovation, interior finishing, full home repainting, and epoxy flooring solutions for villas and apartments in Jeddah.",
    fullDesc: "نساعدك في إعادة الحياة لمسكنك عبر خطة متكاملة في ترميم منازل جدة وترميم فلل جدة والشقق القديمة والتشطيب الداخلي للمباني الجديدة، تشمل إزالة البوية المتهالكة، إصلاح اللياسة والتشققات، تنفيذ تجديد دهانات جدة، وتشطيب الدهانات الداخلية والديكورات والأبواب ودهان الإيبوكسي للمواقف والملاحق.",
    fullDescEn: "We revitalize villas and apartments from bare plaster to final touches—stripping deteriorated paint, repairing plaster defects, repainting doors, and finishing foyers, staircases, and halls cleanly.",
    imageUrl: villaStairsImg,
    altText: "ترميم منازل جدة وترميم فلل جدة وتجديد الدهانات والتشطيبات الداخلية",
    features: [
      "معاينة وتخطيط أعمال ترميم فلل جدة والشقق والمنازل القديمة",
      "تشطيب دهانات داخلي متكامل للمباني والمداخل والسلالم",
      "تجديد دهانات جدة وتغيير ألوان المنازل المسكونة والفارغة",
      "تنفيذ دهان إيبوكسي للأرضيات والمواقف بأسعار مناسبة"
    ],
    featuresEn: [
      "Thorough building inspection and structured scope planning",
      "Turnkey interior painting & finishing for villas and stairs",
      "Full home color refresh for occupied or vacant units",
      "Durable epoxy floor coatings for garages and annexes"
    ],
    searchKeywords: [
      "ترميم منازل جدة",
      "ترميم فلل جدة",
      "تجديد دهانات جدة",
      "تشطيب شقق وفلل جدة",
      "مقاول دهانات وترميم جدة",
      "دهان إيبوكسي جدة",
      "أسعار الدهانات في جدة"
    ],
    searchKeywordsEn: [
      "Home & Villa Renovation Jeddah",
      "Turnkey Interior Finishing",
      "Epoxy Coating Jeddah"
    ],
    iconName: "Wrench"
  },
  {
    id: "crack-peeling-repair",
    title: "معالجة التشققات وتقشر الدهانات",
    titleEn: "Crack Treatment & Peeling Paint Repair",
    shortDesc: "علاج الشروخ والتشققات الجدارية وإزالة تقشر البوية القديمة ومعالجة الحفر وتأسيس الجدران بالمعجون والصنفرة قبل الدهان.",
    shortDescEn: "Root-cause repair of wall fissures, holes, and peeling paint with flexible crack filler, mesh tape, and smooth putty skimming.",
    fullDesc: "طلاء الجدران فوق التشققات أو الطبقات المقشرة يؤدي لعودة العيب سريعاً. لذلك نبدأ بتفتيح الشروخ ومعالجتها بمواد مرنة وشاش فيبر جلاس، وكشط الدهان التالف والمنتفخ وتأسيس الجدار بوجهين أو ثلاثة أوجه معجون وصنفرة ناعمة ضمن خدمات صيانة منازل جدة.",
    fullDescEn: "Painting over cracks or flaking paint only hides issues temporarily. We open fissures, apply flexible fillers and fiberglass mesh tape, scrape loose paint, and skim coat smoothly.",
    imageUrl: wallLevelingImg,
    altText: "معالجة التشققات وتقشر البوية وتأسيس المعجون والصنفرة بجدة",
    features: [
      "معالجة الشروخ الشعرية والتصدعات السطحية بمواد مرنة",
      "كشط وإزالة البوية القديمة المتقشرة والمنتفخة بالكامل",
      "تأسيس احترافي بالمعجون والصنفرة الميكانيكية الدقيقة",
      "تغطية وتنعيم آثار الصيانة والمسامير لضمان جدار أملس"
    ],
    featuresEn: [
      "Flexible crack-bridging compounds and mesh tape",
      "Complete scraping of flaking and blistered layers",
      "Multi-stage putty skimming and precision sanding",
      "Smooth uniform finish that resists future peeling"
    ],
    searchKeywords: [
      "معالجة تشققات الجدران جدة",
      "إزالة تقشر البوية والدهان",
      "معجون وصنفرة الجدران",
      "إصلاح شروخ الجدران والأسقف",
      "صيانة منازل جدة"
    ],
    searchKeywordsEn: [
      "Wall Crack Repair Jeddah",
      "Peeling Paint Removal",
      "Wall Putty & Sanding"
    ],
    iconName: "ShieldCheck"
  },
  {
    id: "moisture-surface-prep",
    title: "معالجة مشاكل الرطوبة وتجهيز الأسطح",
    titleEn: "Moisture Treatment & Surface Preparation",
    shortDesc: "معالجة رطوبة الجدران والتمليح في جدة باستخدام أساس مقاوم للقلويات وبرايمر عازل للرطوبة لحماية البوية من الانتفاخ والتلف.",
    shortDescEn: "Treating wall dampness and salt efflorescence in coastal Jeddah using moisture-blocking sealer primers before painting.",
    fullDesc: "تؤثر رطوبة جدة الساحلية والتسربات القديمة على ثبات الدهانات وتسبب تمليح وتطبل الجدران. نقوم بقشط الأجزاء المتضررة ومعالجتها بمواد عازلة وبرايمر أساس مقاوم للرطوبة والأملاح يهيئ الجدار لاستقبال دهانات داخلية جدة وخارجية بثبات يدوم طويلاً.",
    fullDescEn: "Coastal humidity and old leaks cause paint blistering and salt deposits. We strip affected plaster, sanitize and seal the substrate with alkali- and moisture-resistant primers before finishing.",
    imageUrl: surfacePrepImg,
    altText: "معالجة رطوبة الجدران والأملاح وبرايمر التأسيس قبل الدهان بجدة",
    features: [
      "علاج رطوبة الجدران وإزالة آثار التمليح والنشع",
      "تطبيق برايمر أساس مقاوم للقلويات والرطوبة والملوحة",
      "إعادة تلبيس وتسوية المناطق المعالجة بالمعجون المقاوم",
      "حماية الدهانات النهائية في الحمامات والمطابخ والأحواش"
    ],
    featuresEn: [
      "Treatment of damp patches and salt efflorescence",
      "Application of moisture-blocking sealer primers",
      "Re-leveling and smoothing treated wall zones",
      "Long-term protection for wet areas and coastal villas"
    ],
    searchKeywords: [
      "معالجة رطوبة الجدران جدة",
      "علاج تمليح الجدران قبل الدهان",
      "أساس مقاوم للرطوبة جدة",
      "برايمر عازل للدهان",
      "دهان مقاوم للرطوبة جدة"
    ],
    searchKeywordsEn: [
      "Wall Dampness Treatment Jeddah",
      "Anti-Moisture Primer",
      "Salt Efflorescence Repair"
    ],
    iconName: "Droplets"
  },
  {
    id: "walls-ceilings-maintenance",
    title: "صيانة الجدران والأسقف",
    titleEn: "Wall & Ceiling Maintenance",
    shortDesc: "خدمات صيانة منازل جدة للجدران والأسقف والجبس بورد، دهان أسقف، دهان أبواب خشب وحديد، ومعالجة آثار التمديدات والتسريبات.",
    shortDescEn: "Complete maintenance for walls, gypsum ceilings, and wooden/metal doors, plus seamless restoration after plumbing or AC repairs.",
    fullDesc: "نوفر خدمات صيانة منازل جدة للجدران والأسقف الجبسية للمنازل والشقق والفنادق، بما في ذلك معالجة فواصل الجبس بورد، طلاء الأسقف المطفي المقاوم للاصفرار، دهان الأبواب الخشبية والحديدية والدرابزين، وإصلاح الجدران بعد أعمال التكييف والسباكة والكهرباء بأيدي معلم دهان جدة.",
    fullDescEn: "We handle residential wall and gypsum ceiling maintenance, seam taping, fresh anti-yellowing ceiling coats, wood/metal door painting, and patching cutouts after AC or MEP work.",
    imageUrl: gypsumCeilingImg,
    altText: "صيانة منازل جدة للأسقف والجبس بورد ودهان الأبواب بجدة",
    features: [
      "إصلاح فواصل وشقوق الأسقف الجبسية والجبس بورد",
      "معالجة وترميم الجدران بعد تمديدات التكييف والسباكة",
      "دهان الأسقف بالبلاستيك المطفي ودهان الأبواب الخشبية والحديدية",
      "إنجاز سريع ونظيف مناسب للشقق المفروشة والمسكونة"
    ],
    featuresEn: [
      "Repairing gypsum ceiling joints and seams",
      "Restoring walls after MEP or AC repairs",
      "Anti-glare ceiling paint & wood/metal door refinishing",
      "Clean, fast turnaround for occupied homes"
    ],
    searchKeywords: [
      "صيانة منازل جدة",
      "دهان أسقف وجبس بورد جدة",
      "دهان أبواب خشب وحديد جدة",
      "معلم دهانات سريع ونظيف جدة",
      "ترميم أسقف جدة"
    ],
    searchKeywordsEn: [
      "Home & Ceiling Maintenance Jeddah",
      "Gypsum Ceiling Painting",
      "Wood & Metal Door Painter"
    ],
    iconName: "Layers"
  }
];

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', labelAr: 'الكل', labelEn: 'All', match: 'all' },
  { id: 'interior', labelAr: 'الدهانات الداخلية', labelEn: 'Interior Paints', match: 'الدهانات الداخلية' },
  { id: 'exterior', labelAr: 'الدهانات الخارجية', labelEn: 'Exterior Paints', match: 'الدهانات الخارجية' },
  { id: 'decor', labelAr: 'الديكورات', labelEn: 'Decors', match: 'الديكورات' },
  { id: 'renovation', labelAr: 'ترميم المنازل', labelEn: 'Home Renovation', match: 'ترميم المنازل' },
  { id: 'finishing', labelAr: 'التشطيبات والتجديد', labelEn: 'Finishing & Renewal', match: 'التشطيبات والتجديد' }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "model-interior-halls",
    title: "الدهانات الداخلية للصالات والمجالس",
    titleEn: "Interior Painting for Living Halls & Majlises",
    subtitle: "نموذج استرشادي لتنسيق الألوان الهادئة وتشطيب الجدران",
    subtitleEn: "Illustrative style for serene color palettes and wall finishing",
    category: "الدهانات الداخلية",
    categoryEn: "Interior Paints",
    imageUrl: interiorPaintImg,
    altText: "نموذج دهانات داخلية متناسقة للصالات والمجالس - معلم دهانات وترميم جدة",
    description: "استعراض لتنفيذ الدهانات الداخلية بألوان دافئة ومريحة تتناغم مع الإضاءة الطبيعية والأثاث العصري في المنازل والشقق.",
    descriptionEn: "Showcasing warm, harmonious interior wall coatings paired with modern furniture and natural lighting.",
    tags: ["الدهانات الداخلية", "تنسيق ألوان", "جدران وأسقف"],
    tagsEn: ["Interior Paints", "Color Coordination", "Walls & Ceilings"]
  },
  {
    id: "model-exterior-facade",
    title: "الدهانات الخارجية وواجهات الفلل",
    titleEn: "Exterior Facade & Villa Painting",
    subtitle: "نموذج تشطيب واجهات ومساحات مفتوحة مقاومة للعوامل الجوية",
    subtitleEn: "Weather-resistant facade and architectural finishes",
    category: "الدهانات الخارجية",
    categoryEn: "Exterior Paints",
    imageUrl: lamasatShowcaseImg,
    altText: "نموذج دهانات خارجية وتشطيبات حديثة للفلل في جدة - معلم دهانات وترميم جدة",
    description: "أسلوب تشطيب متناسق للواجهات والمساحات المطلة باستخدام خامات تتحمل الحرارة والرطوبة وتحافظ على رونق المبنى.",
    descriptionEn: "Balanced finishing aesthetic designed with heat- and humidity-resistant coatings suited for coastal architecture.",
    tags: ["الدهانات الخارجية", "دهانات واجهات", "مقاومة الرطوبة"],
    tagsEn: ["Exterior Paints", "Facade Finishes", "Weather Resistant"]
  },
  {
    id: "model-decor-tv-wood",
    title: "بديل الخشب وبديل الرخام لخلفيات الشاشات",
    titleEn: "Wood & Marble Alternatives for TV Backdrops",
    subtitle: "نموذج ديكور جداري حديث يدمج بين الخشب المضلع والرخام",
    subtitleEn: "Modern wall design blending fluted wood with marble panels",
    category: "الديكورات",
    categoryEn: "Decors",
    imageUrl: modernDecorTvImg,
    altText: "نموذج ديكور جداري وبديل الخشب والرخام للشاشات - معلم دهانات وترميم جدة",
    description: "تصميم جداري عصري يجمع بين شرائح بديل الخشب وألواح بديل الرخام مع إضاءة محيطية تضفي فخامة على الصالة.",
    descriptionEn: "Contemporary media wall pairing fluted wood panels, marble-look sheets, and subtle LED accent lighting.",
    tags: ["الديكورات", "بديل الخشب", "بديل الرخام"],
    tagsEn: ["Decors", "Wood Alternative", "Marble Alternative"]
  },
  {
    id: "model-decor-foam-boiserie",
    title: "ديكورات الفوم والبانوهات الكلاسيكية",
    titleEn: "Foam Moldings & Classic Wall Boiserie",
    subtitle: "نموذج تشكيلات جدارية هندسية مدهونة بلون الجدار",
    subtitleEn: "Geometric wall trims painted seamlessly to match wall shades",
    category: "الديكورات",
    categoryEn: "Decors",
    imageUrl: classicFoamImg,
    altText: "نموذج براويز فوم وبانوهات جدارية كلاسيكية - معلم دهانات وترميم جدة",
    description: "إطارات وبراويز فوم متناسقة تبرز أناقة الجدران في المجالس والممرات بتشطيب نظيف خالٍ من الفواصل.",
    descriptionEn: "Symmetrical decorative foam frames adding architectural depth to living rooms and corridors.",
    tags: ["الديكورات", "ديكورات جدارية", "براويز فوم"],
    tagsEn: ["Decors", "Wall Frames", "Classic Style"]
  },
  {
    id: "model-renovation-home",
    title: "ترميم وتجديد دهانات الشقق والمنازل",
    titleEn: "Apartment & Home Repainting Renovation",
    subtitle: "نموذج إعادة تأهيل الجدران وتحديث الألوان للمساكن",
    subtitleEn: "Restoring home walls with bright, modern finishes",
    category: "ترميم المنازل",
    categoryEn: "Home Renovation",
    imageUrl: saudiHomeRenovationImg,
    altText: "نموذج ترميم وتجديد دهانات المنازل والشقق - معلم دهانات وترميم جدة",
    description: "مثال لتجديد المنازل والشقق السكنية عبر معالجة عيوب الجدران وتطبيق درجات عصرية تزيد من إشراق المكان.",
    descriptionEn: "Illustrative residential refresh demonstrating smooth wall repairs and bright neutral color selection.",
    tags: ["ترميم المنازل", "تجديد دهانات", "صيانة منازل"],
    tagsEn: ["Home Renovation", "Repainting", "Maintenance"]
  },
  {
    id: "model-renovation-moisture",
    title: "معالجة الرطوبة والتشققات وتأسيس الأسطح",
    titleEn: "Moisture Treatment, Crack Sealing & Surface Prep",
    subtitle: "نموذج خطوات تجهيز الجدران قبل تطبيق الدهانات النهائية",
    subtitleEn: "Essential preparation stages before topcoat application",
    category: "ترميم المنازل",
    categoryEn: "Home Renovation",
    imageUrl: surfacePrepImg,
    altText: "نموذج معالجة الرطوبة والتشققات وتجهيز الأسطح - معلم دهانات وترميم جدة",
    description: "توضيح لمرحلة تنظيف الأسطح ومعالجة التشققات ومشاكل الرطوبة وتأسيس المعجون لضمان ثبات الدهان.",
    descriptionEn: "Highlighting proper substrate preparation, moisture sealing, and putty leveling before final painting.",
    tags: ["ترميم المنازل", "معالجة الرطوبة", "تجهيز الأسطح"],
    tagsEn: ["Home Renovation", "Moisture Seal", "Surface Prep"]
  },
  {
    id: "model-finishing-villa",
    title: "تشطيبات داخلية للفلل والسلالم والمداخل",
    titleEn: "Interior Finishing for Villas, Staircases & Foyers",
    subtitle: "نموذج تشطيب متكامل للمساحات الواسعة والدرج الداخلي",
    subtitleEn: "Integrated villa entrance and staircase finishing",
    category: "التشطيبات والتجديد",
    categoryEn: "Finishing & Renewal",
    imageUrl: villaStairsImg,
    altText: "نموذج تشطيبات داخلية للفلل والمداخل والسلالم - معلم دهانات وترميم جدة",
    description: "تنسيق بصري متكامل بين دهانات الجدران والأسقف وتكسيات الدرج يمنح الفيلا طابعاً معمارياً أنيقاً.",
    descriptionEn: "Cohesive finishing across multi-level walls, ceilings, and staircases.",
    tags: ["التشطيبات والتجديد", "تشطيب فلل", "مداخل"],
    tagsEn: ["Finishing & Renewal", "Villa Finish", "Foyers"]
  },
  {
    id: "model-finishing-ceilings",
    title: "صيانة وتشطيب الأسقف الجبسية والإضاءة",
    titleEn: "Gypsum Ceiling Finishing & Lighting Integration",
    subtitle: "نموذج أسقف جبس بورد ناعمة مع خطوط إضاءة مخفية",
    subtitleEn: "Smooth gypsum ceilings with recessed LED channels",
    category: "التشطيبات والتجديد",
    categoryEn: "Finishing & Renewal",
    imageUrl: gypsumCeilingImg,
    altText: "نموذج صيانة وتشطيب الأسقف الجبسية والجبس بورد - معلم دهانات وترميم جدة",
    description: "تشطيب وصيانة الأسقف الجبسية ومعالجة الفواصل بدهان متجانس ينسجم مع الإضاءة الحديثة.",
    descriptionEn: "Clean ceiling paint coats and joint detailing paired with modern recessed lighting.",
    tags: ["التشطيبات والتجديد", "صيانة الأسقف", "جبس بورد"],
    tagsEn: ["Finishing & Renewal", "Ceiling Maintenance", "Gypsum"]
  },
  {
    id: "model-interior-majlis",
    title: "دهانات وديكورات المجالس الفاخرة",
    titleEn: "Luxury Majlis Paints & Wall Finishes",
    subtitle: "نموذج تنسيق المجالس بألوان ديكورية وتكسيات أنيقة",
    subtitleEn: "Sophisticated majlis finishes combining texture and warmth",
    category: "الدهانات الداخلية",
    categoryEn: "Interior Paints",
    imageUrl: luxuryMajlisImg,
    altText: "نموذج دهانات وديكورات المجالس وصالات الضيافة - معلم دهانات وترميم جدة",
    description: "تصميم استرشادي للمجالس يجمع بين الدهانات الديكورية الهادئة ولمسات الإضاءة والخشب.",
    descriptionEn: "Guest hall design uniting refined wall textures with balanced interior lighting.",
    tags: ["الدهانات الداخلية", "دهانات المجالس", "ديكورات"],
    tagsEn: ["Interior Paints", "Majlis", "Wall Finish"]
  },
  {
    id: "model-decor-bedroom-wood",
    title: "ديكورات غرف النوم وتكسيات الجدران",
    titleEn: "Bedroom Accent Walls & Wood Paneling",
    subtitle: "نموذج تغليف جدار السرير ببديل الخشب والإضاءة الدافئة",
    subtitleEn: "Warm headboard wall paneling with ambient lighting",
    category: "الديكورات",
    categoryEn: "Decors",
    imageUrl: bedroomWoodPanelImg,
    altText: "نموذج ديكورات غرف النوم وبديل الخشب - معلم دهانات وترميم جدة",
    description: "فكرة ديكورية هادئة لغرف النوم تعتمد على تدرجات لونية مريحة مع شرائح خشبية أنيقة.",
    descriptionEn: "Restful bedroom feature wall concept combining wood slats and soft matte paint.",
    tags: ["الديكورات", "غرف النوم", "بديل الخشب"],
    tagsEn: ["Decors", "Bedrooms", "Wood Panels"]
  },
  {
    id: "model-decor-marble-wall",
    title: "ديكورات بديل الرخام والخشب للصالات",
    titleEn: "Marble & Wood Alternative Accent Walls",
    subtitle: "نموذج دمج عروق الرخام العصري مع الشرائح الخشبية",
    subtitleEn: "Contemporary marble slab accents paired with wood strips",
    category: "الديكورات",
    categoryEn: "Decors",
    imageUrl: modernTvMarbleImg,
    altText: "نموذج ديكورات بديل الرخام وبديل الخشب للصالات - معلم دهانات وترميم جدة",
    description: "تصميم جداري أنيق يبرز جمال الصالات عبر ألواح بديل الرخام المقاومة وسهلة التنظيف.",
    descriptionEn: "Clean modern feature wall using high-clarity marble-look panels.",
    tags: ["الديكورات", "بديل الرخام", "صالات"],
    tagsEn: ["Decors", "Marble Alternative", "Living Rooms"]
  },
  {
    id: "model-finishing-craftsman",
    title: "تنفيذ احترافي للدهانات والتشطيب الدقيق",
    titleEn: "Precision Paint Application & Detailing",
    subtitle: "نموذج العناية بالتفاصيل والالتزام بجودة الطلاء",
    subtitleEn: "Careful craftsmanship and consistent coat thickness",
    category: "التشطيبات والتجديد",
    categoryEn: "Finishing & Renewal",
    imageUrl: craftsmanPaintingImg,
    altText: "نموذج تنفيذ الدهانات والتشطيب الدقيق - معلم دهانات وترميم جدة",
    description: "استعراض لأسلوب التنفيذ المتقن في أعمال الطلاء وتوزيع الطبقات بشكل متساوٍ ونظيف.",
    descriptionEn: "Focus on clean cutting edges, even rolling, and surface protection.",
    tags: ["التشطيبات والتجديد", "جودة التنفيذ", "دهانات"],
    tagsEn: ["Finishing & Renewal", "Craftsmanship", "Painting"]
  },
  {
    id: "model-renovation-leveling",
    title: "صنفرة وتسوية الجدران وتجديد التأسيس",
    titleEn: "Wall Sanding, Skimming & Primer Renewal",
    subtitle: "نموذج معالجة الجدران المتضررة وإعادة تنعيمها",
    subtitleEn: "Smoothing uneven plaster surfaces prior to painting",
    category: "ترميم المنازل",
    categoryEn: "Home Renovation",
    imageUrl: wallLevelingImg,
    altText: "نموذج صنفرة وتسوية الجدران قبل الدهان - معلم دهانات وترميم جدة",
    description: "مراحل التأسيس بالمعجون والصنفرة الميكانيكية لإزالة الخشونة والتقشرات وتجهيز سطح مثالي للطلاء.",
    descriptionEn: "Thorough skimming and sanding workflow to prepare smooth walls.",
    tags: ["ترميم المنازل", "معالجة التشققات", "معجون"],
    tagsEn: ["Home Renovation", "Crack Repair", "Putty"]
  },
  {
    id: "model-decor-tv-console",
    title: "تصاميم خلفيات التلفزيون وورق الجدران",
    titleEn: "TV Wall Concepts & Modern Cladding",
    subtitle: "نموذج جدار شاشة متكامل بأرفف وإضاءة متوازنة",
    subtitleEn: "Balanced entertainment wall with recessed glow",
    category: "الديكورات",
    categoryEn: "Decors",
    imageUrl: tvWallDecorImg,
    altText: "نموذج خلفيات شاشات وورق الجدران والديكورات - معلم دهانات وترميم جدة",
    description: "توظيف التكسيات الجدارية وورق الجدران لتحديد منطقة الجلوس وإبرازها بشكل عصري مرتب.",
    descriptionEn: "Structured wall paneling and accent lighting framing the media center.",
    tags: ["الديكورات", "ورق الجدران", "خلفيات شاشات"],
    tagsEn: ["Decors", "Wallpaper", "TV Walls"]
  },
  {
    id: "model-exterior-commercial",
    title: "تشطيب ودهان المكاتب والواجهات التجارية",
    titleEn: "Office & Commercial Interior/Exterior Finishing",
    subtitle: "نموذج تشطيبات عملية بألوان رسمية وعصرية",
    subtitleEn: "Clean architectural tones for workplaces & storefronts",
    category: "الدهانات الخارجية",
    categoryEn: "Exterior Paints",
    imageUrl: commercialFinishImg,
    altText: "نموذج دهانات وتشطيب المكاتب والواجهات - معلم دهانات وترميم جدة",
    description: "أفكار طلاء وتشطيب تلائم المكاتب والمداخل والواجهات بتناغم واضح مع الإضاءة والزجاج.",
    descriptionEn: "Practical, crisp finishes tailored for contemporary offices and commercial interiors.",
    tags: ["الدهانات الخارجية", "التشطيبات والتجديد", "مكاتب"],
    tagsEn: ["Exterior Paints", "Finishing", "Offices"]
  }
];

// Work Advantages (مميزات العمل)
export const WORK_ADVANTAGES: WorkAdvantageItem[] = [
  {
    id: "adv-team",
    title: "كادر فني مؤهل وخبرة ميدانية",
    titleEn: "Qualified Craftsmen & Field Experience",
    description: "نعمل من خلال كادر متخصص يمتلك خبرة كبيرة في تنفيذ الدهانات والديكورات الحديثة وأعمال الترميم بدقة متناهية.",
    descriptionEn: "Executed by experienced specialists skilled in modern paints, wall decor, and residential renovation.",
    iconName: "Award"
  },
  {
    id: "adv-materials",
    title: "اختيار الخامات والمواد المناسبة",
    titleEn: "Authentic, Climate-Suitable Materials",
    description: "نحرص على اختيار خامات دهان وعزل وتأسيس مناسبة لطبيعة مناخ مدينة جدة لضمان ثبات اللون ومتانة التشطيب.",
    descriptionEn: "Careful selection of durable paints, primers, and sealants suited for Jeddah's coastal climate.",
    iconName: "ShieldCheck"
  },
  {
    id: "adv-prep",
    title: "معالجة جذرية للأسطح والتشققات",
    titleEn: "Thorough Surface & Crack Preparation",
    description: "لا نكتفي بالدهان الظاهري، بل نهتم بصنفرة الجدران ومعالجة الرطوبة والتشققات وتقشر الطلاء قبل التنفيذ.",
    descriptionEn: "Full sanding, dampness treatment, and fissure repair prior to painting for lasting adhesion.",
    iconName: "Wrench"
  },
  {
    id: "adv-clean",
    title: "النظافة وحماية الأثاث والأرضيات",
    titleEn: "Site Cleanliness & Furniture Protection",
    description: "تغليف وحماية الأرضيات والأبواب والمفروشات طوال فترة العمل، وتسليم المكان نظيفاً ومرتباً بعد الانتهاء.",
    descriptionEn: "Floors, doors, and furniture are carefully masked during work with thorough post-job cleanup.",
    iconName: "Sparkles"
  },
  {
    id: "adv-time",
    title: "الالتزام بالمواعيد وأدق التفاصيل",
    titleEn: "Punctuality & Attention to Detail",
    description: "خطة عمل منظمة تحترم جدولك الزمني مع الاهتمام بزوايا القص وتجانس الطلاء وجودة التسليم النهائي.",
    descriptionEn: "Structured execution timelines with careful edge alignment and uniform paint finishes.",
    iconName: "Clock"
  },
  {
    id: "adv-pricing",
    title: "وضوح التكلفة وتنوع الحلول",
    titleEn: "Transparent Quoting & Tailored Options",
    description: "نقدم حلولاً عملية تناسب احتياج كل منزل أو مشروع مع توضيح مراحل العمل والتفاصيل المطلوبة قبل البدء.",
    descriptionEn: "Practical options tailored to each home's condition with clear scope explanation upfront.",
    iconName: "CheckCircle2"
  }
];

// Service Execution Stages (مراحل تنفيذ الخدمة)
export const EXECUTION_STAGES: ExecutionStageItem[] = [
  {
    step: "01",
    title: "التواصل والمعاينة الميدانية",
    titleEn: "Consultation & On-Site Inspection",
    description: "استقبال طلبك عبر الهاتف أو واتساب، وزيارة الموقع في جدة لفحص الجدران ورفع المقاسات ومعرفة المطلوب.",
    descriptionEn: "Receiving your inquiry by phone or WhatsApp and visiting your Jeddah property to assess surfaces and measurements."
  },
  {
    step: "02",
    title: "تحديد الخامات والألوان والتسعير",
    titleEn: "Color Selection & Clear Scope",
    description: "اختيار نوع الدهانات أو الديكورات ودرجات الألوان المناسبة، والاتفاق على خطة التنفيذ والتكلفة والمدة.",
    descriptionEn: "Finalizing paint brands, wall decor styles, and color shades with an agreed schedule and estimate."
  },
  {
    step: "03",
    title: "التجهيز ومعالجة العيوب",
    titleEn: "Surface Prep & Defect Repair",
    description: "حماية الأرضيات والأثاث، ثم معالجة التشققات والرطوبة وصنفرة الأسطح وتطبيق طبقات الأساس والمعجون.",
    descriptionEn: "Masking surfaces, repairing cracks or damp spots, sanding smooth, and applying primers and putty coats."
  },
  {
    step: "04",
    title: "التنفيذ النهائي والمراجعة والتسليم",
    titleEn: "Final Application, Review & Handover",
    description: "تطبيق الدهانات أو تركيب الديكورات بدقة، ومراجعة كافة التفاصيل في الموقع ثم تنظيف وتسليم العمل.",
    descriptionEn: "Applying topcoats or installing wall decor cleanly, conducting a detailed final walkthrough, and handing over spotless."
  }
];

// Frequently Asked Questions (الأسئلة الشائعة)
export const FAQS_LIST: FaqEntry[] = [
  {
    id: "faq-coverage",
    question: "ما هي المناطق والأحياء التي تغطونها في جدة؟",
    questionEn: "Which Jeddah districts do you cover for painting and renovation?",
    answer: "نخدم جميع أحياء مدينة جدة – المملكة العربية السعودية، بما يشمل شمال جدة (أبحر الشمالية والجنوبية، الشاطئ، المرجان، البساتين، المحمدية، النعيم، السلامة، الروضة، الزهراء)، وسط جدة (الحمراء، الأندلس، العزيزية، الرحاب، الفيصلية)، شرق جدة (الحمدانية، السامر، المنار، الأجواد، التوفيق، الحرازات)، وجنوب جدة (الأجاويد، السنابل، الوزيرية، الأمير فواز، مدائن الفهد).",
    answerEn: "We serve all districts across Jeddah, Saudi Arabia, including North Jeddah (Obhur, Al-Shati, Al-Murjan, Al-Muhammadiyyah, Al-Salamah, Al-Rawdah), Central Jeddah (Al-Hamra, Al-Aziziyah, Al-Rehab), East Jeddah (Al-Hamdaniyah, Al-Samer, Al-Manar), and South Jeddah (Al-Ajawid, Al-Sanabel, Al-Waziriyah)."
  },
  {
    id: "faq-services",
    question: "هل تنفذون معالجة الرطوبة والأملاح والتشققات قبل الدهان؟",
    questionEn: "Do you treat moisture, salt efflorescence, and cracks before painting?",
    answer: "نعم، فحص ومعالجة التشققات وتقشر الدهانات ومشاكل الرطوبة والأملاح خطوة أساسية لدينا قبل تطبيق أي طلاء نهائي. نقوم بتفتيح الشروخ ومعالجتها بمواد مرنة وشاش حماية وتطبيق برايمر عازل مقاوم للرطوبة لمنع عودة العيوب.",
    answerEn: "Yes, inspecting and treating cracks, peeling layers, salt deposits, and dampness is mandatory before applying finish coats. We open fissures, apply flexible filler and mesh, and coat with moisture-resistant sealer primer."
  },
  {
    id: "faq-brands",
    question: "ما هي أفضل أنواع الدهانات المناسبة لمناخ جدة؟",
    questionEn: "Which paint types are best suited for Jeddah's coastal climate?",
    answer: "نوصي دائماً باستخدام دهانات أصلية عالية الثبات مثل دهانات جوتن ودهانات الجزيرة؛ ففي المساحات الداخلية نستخدم الدهانات المطفية والربع لمعة القابلة للغسيل، وفي الواجهات الخارجية نعتمد على دهانات البروفايل والتركيبات المقاومة للحرارة وأشعة الشمس والرطوبة الساحلية.",
    answerEn: "We recommend authentic climate-grade coatings such as Jotun and Al-Jazeera paints: washable matte or eggshell finishes for interiors, and UV- and humidity-resistant textured profile coatings for Jeddah exteriors."
  },
  {
    id: "faq-materials",
    question: "هل يشمل العمل توفير الدهانات والخامات أم المصنعية فقط؟",
    questionEn: "Do you provide materials and paint or labor only?",
    answer: "نوفر الخيارين بكل مرونة حسب رغبة العميل: تنفيذ كامل متكامل شامل المعجون والأساس والدهانات والخامات المناسبة، أو مصنعية وتنفيذ احترافي بأيدي الكادر مع توفير المواد من قبل العميل.",
    answerEn: "We offer both options flexibly: full turnkey execution including putty, primers, and certified paints, or skilled labor execution with client-supplied materials."
  },
  {
    id: "faq-decor",
    question: "هل تتوفر لديكم خدمات ورق الجدران وبديل الخشب والرخام والفوم؟",
    questionEn: "Do you install wallpaper, fluted wood panels, marble sheets, and foam trims?",
    answer: "نعم، ننفذ تركيب ورق الجدران العصري، وألواح بديل الخشب (WPC) وبديل الرخام (PVC) لخلفيات الشاشات والمداخل، بالإضافة إلى الديكورات الجدارية وبراويز الفوم والبانوهات بتناسق تام مع ألوان الغرف والإضاءة.",
    answerEn: "Yes, we install modern wallpaper, WPC fluted wood, PVC marble-look panels for TV walls and foyers, plus classic/modern foam boiserie moldings matched to room colors and lighting."
  },
  {
    id: "faq-pricing",
    question: "كيف يتم تحديد أسعار الدهانات والترميم في جدة؟",
    questionEn: "How is painting and renovation pricing determined in Jeddah?",
    answer: "تتحدد التكلفة الدقيقة بناءً على مساحة الجدران والأسقف بالمتر المربع، حالة السطح (هل يحتاج تأسيس ومعالجة رطوبة وتشققات أم تجديد مباشر)، نوع الدهان أو الديكور المطلوب، وما إذا كان العرض شاملاً للمواد أو مصنعية فقط. ويمكنك طلب معاينة أو عرض سعر فوري عبر نموذج التواصل أو واتساب 0507478126.",
    answerEn: "Exact pricing depends on wall/ceiling square footage, surface condition (crack/moisture repair vs. direct recoating), chosen finish or decor system, and labor-only vs. full-material package. Contact us directly on 0507478126 or via our Service Request Form for a transparent quote."
  },
  {
    id: "faq-cleanliness",
    question: "كيف تحافظون على نظافة الأثاث والأرضيات أثناء تجديد الشقق المسكونة؟",
    questionEn: "How do you protect furniture and floors in occupied homes?",
    answer: "قبل البدء بأي عمل دهان أو صنفرة، نحرص على تغليف الأثاث والأرضيات والباركيه والرخام والأبواب ومفاتيح الكهرباء بأغطية الحماية واللاصق المخصص، مع تنظيف الموقع بالكامل وتسليمه مرتباً بعد الانتهاء.",
    answerEn: "Before sanding or painting, we thoroughly mask floors, doors, outlets, and furniture with protective sheeting and painter's tape, followed by complete post-job cleanup."
  },
  {
    id: "faq-booking",
    question: "كيف يمكنني طلب معاينة أو عرض سعر والاطلاع على موقعكم على الخريطة؟",
    questionEn: "How can I request a site inspection or view your location on Google Maps?",
    answer: "يمكنك تعبئة نموذج طلب الخدمة في الموقع لإرسال التفاصيل مباشرة عبر واتساب، أو الاتصال المباشر على الرقم 0507478126، كما يمكنك الاطلاع على موقعنا مباشرة عبر خرائط Google المدمجة في صفحة الموقع والخرائط.",
    answerEn: "Submit the Service Request Form on this page to send details directly via WhatsApp, call 0507478126, or view our verified location pin directly on the embedded Google Map."
  }
];

export interface DistrictSector {
  id: string;
  regionAr: string;
  regionEn: string;
  districtsAr: string[];
  districtsEn: string[];
}

export const JEDDAH_DISTRICTS_SECTORS: DistrictSector[] = [
  {
    id: "north",
    regionAr: "أحياء شمال جدة",
    regionEn: "North Jeddah Districts",
    districtsAr: [
      "أبحر الشمالية", "أبحر الجنوبية", "الشاطئ", "المرجان", "البساتين",
      "المحمدية", "النعيم", "النهضة", "الزهراء", "الخالدية",
      "الروضة", "السلامة", "المروة", "الصفا", "الربوة",
      "النزهة", "البوادي", "الفيصلية", "الشراع", "الأمواج",
      "اللؤلؤ", "الزمرد", "الرياض", "طيبة", "الياقوت", "الصواري", "خليج سلمان"
    ],
    districtsEn: [
      "North Obhur", "South Obhur", "Al-Shati", "Al-Murjan", "Al-Basateen",
      "Al-Muhammadiyyah", "Al-Naeem", "Al-Nahdah", "Al-Zahra", "Al-Khalidiyah",
      "Al-Rawdah", "Al-Salamah", "Al-Marwah", "Al-Safa", "Al-Rabwah",
      "Al-Nuzhah", "Al-Bawadi", "Al-Shiraa", "Al-Amwaj", "Al-Lulu",
      "Al-Zomorod", "Taibah", "Al-Yaqoot", "Al-Sawari", "Salman Bay"
    ]
  },
  {
    id: "central",
    regionAr: "أحياء وسط وغرب جدة",
    regionEn: "Central & West Jeddah Districts",
    districtsAr: [
      "الحمراء", "الأندلس", "الرويس", "العزيزية", "الرحاب",
      "مشرفة", "الشرفية", "بني مالك", "السليمانية", "النسيم",
      "الفيحاء", "الورود", "الجامعة", "الثغر", "البلد",
      "البغدادية الغربية", "البغدادية الشرقية", "الكندرة", "الصحيفة", "العمارية", "الشاطئ الجنوبي"
    ],
    districtsEn: [
      "Al-Hamra", "Al-Andalus", "Al-Ruwais", "Al-Aziziyah", "Al-Rehab",
      "Mushrifah", "Al-Sharafiyah", "Bani Malik", "Al-Sulaymaniyah", "Al-Naseem",
      "Al-Fayha", "Al-Wurud", "Al-Jamiah", "Al-Thaghar", "Al-Balad",
      "Al-Baghdadiyah", "Al-Kandarah", "Al-Sahifah", "Al-Ammariyah"
    ]
  },
  {
    id: "east",
    regionAr: "أحياء شرق جدة",
    regionEn: "East Jeddah Districts",
    districtsAr: [
      "الحمدانية", "الفلاح", "الصالحية", "الرحمانية", "الكوثر",
      "الأصالة", "السامر", "المنار", "الأجواد", "التوفيق",
      "الربيع", "الهدى", "بريمان", "قويزة", "الحرازات",
      "المنتزهات", "مريخ", "العدل", "الصواعد", "أم السلم", "كيلو 14"
    ],
    districtsEn: [
      "Al-Hamdaniyah", "Al-Falah", "Al-Salhiyah", "Al-Rahmaniyah", "Al-Kawthar",
      "Al-Asalah", "Al-Samer", "Al-Manar", "Al-Ajwad", "Al-Tawfiq",
      "Al-Rabee", "Briman", "Quwayzah", "Al-Harazat", "Al-Muntazahat",
      "Muraikh", "Al-Adl", "Al-Sawaed", "Umm Al-Salam"
    ]
  },
  {
    id: "south",
    regionAr: "أحياء جنوب جدة",
    regionEn: "South Jeddah Districts",
    districtsAr: [
      "الأجاويد", "السنابل", "الوزيرية", "الأمير فواز الشمالي", "الأمير فواز الجنوبي",
      "مدائن الفهد", "الخمرة", "القرينية", "الفضيلة", "الوادي",
      "غليل", "الثعالبة", "بترومين", "الهنداوية", "السبيل",
      "النزلة اليمانية", "النزلة الشرقية", "المحجر", "القريات", "المستودعات"
    ],
    districtsEn: [
      "Al-Ajawid", "Al-Sanabel", "Al-Waziriyah", "Prince Fawaz North", "Prince Fawaz South",
      "Madain Al-Fahad", "Al-Khomrah", "Al-Qurayniyah", "Al-Fadilah", "Al-Wadi",
      "Ghalil", "Al-Thaalibah", "Petromin", "Al-Hindawiyah", "Al-Sabeel",
      "Al-Nazlah Al-Yamaniyah", "Al-Nazlah Al-Sharqiyah", "Al-Mahjar", "Al-Qiriyat"
    ]
  }
];

export interface SeoExpertTopic {
  id: string;
  badgeAr: string;
  badgeEn: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  pointsAr: string[];
  pointsEn: string[];
  keywordsAr: string[];
  keywordsEn: string[];
}

export const SEO_EXPERT_TOPICS: SeoExpertTopic[] = [
  {
    id: "interior-guide",
    badgeAr: "دليل دهانات داخلية جدة",
    badgeEn: "Interior Paint Guide",
    titleAr: "معلم دهانات جدة ومعلم بوية جدة: دليل اختيار دهانات جوتن والجزيرة الداخلية",
    titleEn: "Best Interior Wall & Ceiling Paints for Jeddah Homes",
    summaryAr: "اختيار درجة الطلاء المناسبة لكل غرفة مع أفضل معلم دهان جدة ومعلم بوية جدة يحدث فرقاً كبيراً في اتساع المساحة وسهولة التنظيف. ننفذ أعمال دهانات جدة ودهانات داخلية جدة بأحدث تشكيلات دهانات جوتن والجزيرة وهمبل بدرجات المطفي والربع لمعة والنصف لمعة والحريري المقاوم للغسيل مع دهان الأبواب الخشبية والحديدية.",
    summaryEn: "Choosing the right sheen and shade transforms spatial warmth and washability. Across Jeddah, we apply premium Jotun and Al-Jazeera interior coats in luxury matte, eggshell, and semi-gloss finishes.",
    pointsAr: [
      "تنفيذ دهانات داخلية جدة مطفية (Matte) لغرف النوم والأسقف لتقليل انعكاس الإضاءة وإخفاء تموجات الجدار.",
      "طلاءات ربع لمعة وحريرية (جوتن فينوماستيك والجزيرة) للصالات والممرات لقوة تحملها وسهولة غسلها.",
      "تنسيق ألوان دهانات جدة العصرية (أوف وايت، جريج، بيج دافئ، فانيلا لاتيه) ودهان أبواب خشب وحديد.",
      "تطبيق طبقتي معجون أساس وصنفرة ناعمة قبل الوجهين النهائيين مع توضيح سعر متر الدهان في جدة مسبقاً."
    ],
    pointsEn: [
      "Smooth matte finishes for ceilings and bedrooms to minimize glare.",
      "Washable eggshell and silk finishes for high-traffic halls and corridors.",
      "Curated modern neutral palettes (Off-White, Greige, Warm Beige) matching lighting.",
      "Two skim coats, fine sanding, primer, and two uniform topcoats."
    ],
    keywordsAr: [
      "معلم دهانات جدة",
      "معلم دهان جدة",
      "معلم بوية جدة",
      "دهانات جدة",
      "دهانات داخلية جدة",
      "دهانات جوتن جدة",
      "دهانات الجزيرة جدة",
      "سعر متر الدهان في جدة"
    ],
    keywordsEn: ["Jeddah Interior Painting", "Jotun & Al-Jazeera", "Washable Wall Paint"]
  },
  {
    id: "exterior-facade-guide",
    badgeAr: "دهانات خارجية جدة",
    badgeEn: "Exterior & Facades",
    titleAr: "دهانات خارجية جدة وبروفايل وكسر رخام للواجهات مقاومة لحرارة ورطوبة الساحل",
    titleEn: "Weather-Shield Exterior & Profile Coatings for Coastal Jeddah",
    summaryAr: "تتعرض واجهات الفلل والعمائر لعوامل مناخية قاسية تشمل ارتفاع الحرارة ونسبة الرطوبة العالية والأملاح البحرية؛ لذا نعتمد في دهانات خارجية جدة على منظومة دهان بروفايل واجهات ورشة أمريكية وكسر رخام وجرافيت عازل يحفظ المبنى من التبهيت والتقشر في شمال وشرق وجنوب جدة.",
    summaryEn: "Jeddah building facades face intense UV heat, coastal humidity, and salt exposure. We execute weather-shield smooth and textured profile coatings engineered against fading and blistering.",
    pointsAr: [
      "غسيل وتنظيف الواجهات وإزالة الأتربة والأملاح العالقة قبل بدء أعمال دهانات خارجية جدة.",
      "استخدام أساس خارجي مقاوم للقلويات والرطوبة يمنع تفكك طبقات البروفايل أو الرشة.",
      "تنفيذ دهان بروفايل جدة وكسر رخام ورشة أمريكية بألوان ثابتة لا تتأثر بأشعة الشمس.",
      "طلاء الأسوار والملاحق والواجهات التجارية والفلل بإشراف مقاول دهانات جدة محترف."
    ],
    pointsEn: [
      "High-pressure facade washing and salt/dust removal before priming.",
      "Alkali-resistant exterior primers preventing coating delamination.",
      "Textured profile and smooth UV-stable coatings suited for Red Sea humidity.",
      "Boundary walls, villas, residential buildings, and commercial storefronts."
    ],
    keywordsAr: [
      "دهانات خارجية جدة",
      "دهان بروفايل جدة",
      "دهان واجهات فلل جدة",
      "رشة أمريكية وكسر رخام",
      "مقاول دهانات جدة",
      "معلم دهانات شمال جدة"
    ],
    keywordsEn: ["Exterior Facade Paint Jeddah", "Textured Profile Paint", "Villa Exterior"]
  },
  {
    id: "decor-cladding-guide",
    badgeAr: "دهانات وديكورات جدة",
    badgeEn: "Modern Wall Decors",
    titleAr: "معلم ديكورات جدة: دهان مخملي وشامواه وبديل الخشب والرخام والفوم وورق الجدران",
    titleEn: "WPC Wood Panels, PVC Marble, Foam Moldings & Wallpaper",
    summaryAr: "نحوّل الجدران الصامتة في الصالات والمجالس إلى لوحات معمارية أنيقة ضمن باقة دهانات وديكورات جدة، مع أمهر معلم ديكورات جدة لتنفيذ الدهان المخملي والشامواه والإستوكو والإسمنتي وبديل الخشب المضلع وبديل الرخام اللامع وبراويز الفوم وورق الجدران ثلاثي الأبعاد.",
    summaryEn: "We turn plain walls in living rooms, majlises, and bedrooms into architectural focal points combining decorative paint textures, WPC wood slats, marble-look sheets, foam frames, and wallpaper.",
    pointsAr: [
      "تصميم وتنفيذ خلفيات شاشات التلفزيون ببديل الخشب وبديل الرخام مع إضاءة LED مخفية.",
      "تركيب ودهان براويز الفوم والبانوهات الكلاسيكية والمودرن عبر معلم ديكورات جدة متخصص.",
      "تركيب ورق جدران جدة ثلاثي الأبعاد ونقوش عصرية بدون فواصل أو فقاعات هوائية.",
      "تنفيذ دهان مخملي وشامواه وإسمنتي وتعتيق وإستوكو بتناسق احترافي مع الأثاث."
    ],
    pointsEn: [
      "TV console feature walls combining WPC wood and marble panels with LED strips.",
      "Precision mitered foam boiserie trims painted seamlessly into the wall shade.",
      "Bubble-free modern wallpaper installation across bedrooms and reception halls.",
      "Velvet, stucco, and concrete-look accent walls."
    ],
    keywordsAr: [
      "دهانات وديكورات جدة",
      "معلم ديكورات جدة",
      "بديل الخشب والرخام جدة",
      "ورق جدران جدة",
      "ديكورات فوم وبانوهات جدة",
      "دهان مخملي وشامواه وإسمنتي"
    ],
    keywordsEn: ["Jeddah Wall Decor", "Wood & Marble Panels", "Foam Moldings", "Wallpaper"]
  },
  {
    id: "renovation-moisture-guide",
    badgeAr: "ترميم منازل وفلل جدة",
    badgeEn: "Renovation & Maintenance",
    titleAr: "ترميم منازل جدة وترميم فلل جدة وتجديد دهانات جدة وعلاج الرطوبة والتشققات",
    titleEn: "Home & Villa Renovation, Crack Repair & Paint Renewal",
    summaryAr: "تتطلب أعمال ترميم منازل جدة وترميم فلل جدة معالجة جذرية للرطوبة والتمليح والتشققات وتقشر البوية قبل تنفيذ تجديد دهانات جدة، كما نقدم خدمات صيانة منازل جدة المتكاملة للجدران والأسقف الجبسية ودهان الإيبوكسي بأسعار مناسبة في كافة أحياء جدة.",
    summaryEn: "Home and villa renovation requires root-cause sealing of dampness and fissures prior to repainting, alongside complete wall and ceiling maintenance across Jeddah.",
    pointsAr: [
      "تنفيذ خطط ترميم منازل جدة وترميم فلل جدة عبر إزالة البوية المتقشرة ومعالجة اللياسة التالفة.",
      "علاج رطوبة الجدران والتمليح بمواد كيميائية وبرايمر أساس عازل مانع للنشع.",
      "تفتيح الشروخ والتشققات وحشوها بمواد مرنة وشاش فيبر جلاس ضمن أعمال صيانة منازل جدة.",
      "تنفيذ تجديد دهانات جدة للشقق والفلل المفروشة والفارغة مع حماية كاملة للأرضيات والأثاث."
    ],
    pointsEn: [
      "Full scraping of blistered and flaking paint down to sound plaster.",
      "Sanitizing salt efflorescence and applying moisture-blocking sealer primers.",
      "Routing fissures and reinforcing with fiberglass mesh and flexible fillers.",
      "Gypsum ceiling seam repair and complete apartment/villa restoration."
    ],
    keywordsAr: [
      "ترميم منازل جدة",
      "ترميم فلل جدة",
      "صيانة منازل جدة",
      "تجديد دهانات جدة",
      "معالجة رطوبة وتشققات الجدران",
      "أسعار الدهانات في جدة",
      "دهان إيبوكسي جدة"
    ],
    keywordsEn: ["Home Renovation Jeddah", "Villa Renovation", "Home Maintenance", "Paint Renewal"]
  }
];

export interface PaintFinishSpec {
  id: string;
  nameAr: string;
  nameEn: string;
  usageAr: string;
  usageEn: string;
  benefitAr: string;
  benefitEn: string;
}

export const PAINT_FINISH_SPECS: PaintFinishSpec[] = [
  {
    id: "matte",
    nameAr: "دهان مطفي (Matte)",
    nameEn: "Luxury Matte",
    usageAr: "الأسقف وغرف النوم والمجالس",
    usageEn: "Ceilings, Bedrooms & Majlis",
    benefitAr: "يخفي عيوب الجدران ويمنح هدوءاً بصرياً راقياً",
    benefitEn: "Hides minor surface waves with serene, non-glare elegance"
  },
  {
    id: "eggshell",
    nameAr: "ربع لمعة / حريري (Silk)",
    nameEn: "Eggshell / Washable Silk",
    usageAr: "الصالات والممرات وغرف المعيشة",
    usageEn: "Living Halls & Corridors",
    benefitAr: "مقاوم للبقع وقابل للغسيل والتنظيف المتكرر",
    benefitEn: "Stain-resistant and easy to wipe clean"
  },
  {
    id: "profile",
    nameAr: "بروفايل خارجي (Profile)",
    nameEn: "Exterior Profile",
    usageAr: "واجهات الفلل والعمائر والأسوار",
    usageEn: "Villa Facades & Exterior Walls",
    benefitAr: "مقاوم للشمس والأمطار والرطوبة الساحلية في جدة",
    benefitEn: "Engineered for UV heat and coastal humidity"
  },
  {
    id: "wpc-pvc",
    nameAr: "بديل الخشب والرخام",
    nameEn: "WPC Wood & PVC Marble",
    usageAr: "خلفيات الشاشات والمداخل",
    usageEn: "TV Consoles & Foyers",
    benefitAr: "مظهر فخم مقاوم للرطوبة وسريع التركيب",
    benefitEn: "Moisture-proof architectural focal feature"
  },
  {
    id: "foam-boiserie",
    nameAr: "فوم وبانوهات جدارية",
    nameEn: "Foam Boiserie Trims",
    usageAr: "المجالس والصالات وغرف الضيوف",
    usageEn: "Majlises & Guest Rooms",
    benefitAr: "تقسيمات هندسية كلاسيكية ومودرن بتكلفة عملية",
    benefitEn: "Refined geometric wall depth at practical cost"
  },
  {
    id: "sealer-primer",
    nameAr: "برايمر عازل للرطوبة",
    nameEn: "Anti-Moisture Primer",
    usageAr: "تأسيس الجدران المتأثرة بالرطوبة",
    usageEn: "Damp & Renovated Substrates",
    benefitAr: "يمنع تقشر الطلاء وظهور الأملاح مستقبلاً",
    benefitEn: "Prevents future peeling and salt efflorescence"
  }
];


// 6 Social Platforms ONLY (exact links & Instagram gradient)
export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "maps",
    name: "الموقع",
    username: "خرائط Google",
    url: "https://share.google/gJLFPX7o9xhbCC77O",
    icon: "MapPin",
    color: "#EA4335",
    bgColor: "bg-[#EA4335] hover:bg-[#d93025]",
    description: "موقعنا على خرائط Google"
  },
  {
    id: "tiktok",
    name: "تيك توك",
    username: "تيك توك",
    url: "https://vm.tiktok.com/ZS9f9aFUgf7kn-eUwoh/",
    icon: "TikTok",
    color: "#111111",
    bgColor: "bg-[#111111] hover:bg-[#222222]",
    description: "تيك توك - أعمال الدهانات والديكورات"
  },
  {
    id: "instagram",
    name: "انستقرام",
    username: "@lbydny8351",
    url: "https://www.instagram.com/lbydny8351?utm_source=qr&psln=MTFoN2ZiaHprZzk4N",
    icon: "Instagram",
    color: "#dc2743",
    bgColor: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:brightness-110",
    gradient: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    description: "انستقرام - صور وتنسيقات الألوان الحديثة"
  },
  {
    id: "snapchat",
    name: "سناب شات",
    username: "mlmdhntwdyk7586",
    url: "https://www.snapchat.com/add/mlmdhntwdyk7586?share_id=UTrzpMoPHNk&locale=ar-SA",
    icon: "Ghost",
    color: "#E9D500",
    bgColor: "bg-[#E9D500] hover:bg-[#d6c300]",
    description: "سناب شات - متابعة الأعمال في جدة"
  },
  {
    id: "whatsapp",
    name: "واتساب",
    username: "0507478126",
    url: "https://wa.me/966507478126",
    icon: "MessageCircle",
    color: "#25D366",
    bgColor: "bg-[#25D366] hover:bg-[#1fb958]",
    description: "واتساب - تواصل واستفسارات مباشرة"
  },
  {
    id: "phone",
    name: "اتصال",
    username: "050 747 8126",
    url: "tel:+966507478126",
    icon: "Phone",
    color: "#1976D2",
    bgColor: "bg-[#1976D2] hover:bg-[#1565c0]",
    description: "اتصال هاتفي مباشر"
  }
];

export const ABOUT_TEXT = {
  headline: "معلم دهانات وترميم جدة",
  subheadline: "نمنح منزلك جمالاً جديداً بلمسات من الخبرة والاحترافية.",
  paragraphs: [
    "نحن متخصصون في أعمال الدهانات والطلاء والديكورات الحديثة وترميم وصيانة المنازل في مدينة جدة، ونعمل كفريق متكامل يضم أفضل معلم دهانات جدة ومعلم ديكورات جدة يمتلكون خبرة ميدانية كبيرة في مجال الطلاء والتشطيبات.",
    "نقدم خدمات متكاملة تشمل دهانات داخلية جدة ودهانات خارجية جدة للواجهات، وتنفيذ دهانات وديكورات جدة العصرية، وتجديد دهانات جدة للمنازل والفلل والشقق، بالإضافة إلى أعمال ترميم منازل جدة وترميم فلل جدة وصيانة منازل جدة ومعالجة التشققات والرطوبة.",
    "نحرص على جودة التنفيذ واختيار الخامات المناسبة والاهتمام بأدق التفاصيل، مع الالتزام بالمواعيد وتقديم أعمال تحقق تطلعات العملاء في كافة أحياء جدة.",
    "هدفنا تقديم حلول متكاملة تمنح منزلك مظهراً جميلاً ومتجدداً."
  ],
  highlights: [
    { label: "نطاق التغطية", value: "جدة" },
    { label: "الخدمات المتكاملة", value: "9" },
    { label: "جودة الخامات", value: "عالية" },
    { label: "التواصل المباشر", value: "0507478126" }
  ],
  whyChooseUs: [
    "كادر فني مؤهل يضم معلم دهان جدة ومعلم ديكورات جدة بخبرة كبيرة في الطلاء والتشطيبات الحديثة.",
    "تنفيذ متكامل يشمل دهانات داخلية وخارجية وأعمال ترميم منازل جدة وترميم فلل جدة.",
    "اهتمام حقيقي بمعالجة التشققات ومشاكل الرطوبة وتجهيز الأسطح ضمن خدمات صيانة منازل جدة.",
    "اختيار الخامات المناسبة والاهتمام بأدق التفاصيل ونظافة موقع العمل أثناء تجديد دهانات جدة.",
    "الالتزام بالمواعيد وتقديم حلول متكاملة تمنح منزلك مظهراً جميلاً ومتجدداً."
  ]
};

export const ABOUT_TEXT_EN = {
  headline: "Jeddah Painter & Renovation Master",
  subheadline: "Giving your home renewed beauty with touches of expertise and professionalism.",
  paragraphs: [
    "We specialize in painting, modern wall decors, home renovation, and residential maintenance in Jeddah, operating through a qualified team with extensive experience in painting, finishing, and interior decor.",
    "We provide comprehensive services covering interior and exterior paints, contemporary wall designs, villa and apartment renewal, crack repair, and restoration works.",
    "We prioritize execution quality, selecting suitable materials, and caring for the finest details while honoring schedules to meet client expectations.",
    "Our goal is to deliver integrated solutions that give your home a fresh and attractive appearance."
  ],
  highlights: [
    { label: "Coverage", value: "Jeddah" },
    { label: "Core Services", value: "9" },
    { label: "Material Quality", value: "Premium" },
    { label: "Direct Contact", value: "0507478126" }
  ],
  whyChooseUs: [
    "Qualified craftsmen with extensive field experience in paints, finishing, and modern decor.",
    "Comprehensive solutions for interior/exterior painting, renovation, and home maintenance.",
    "Dedicated treatment of cracks, dampness, and surface preparation prior to painting.",
    "Careful material selection, fine detailing, and site cleanliness throughout work.",
    "Commitment to timelines to deliver a renewed, refined look for your home."
  ]
};

export interface ArticleItem {
  id: string;
  categoryAr: string;
  categoryEn: string;
  dateAr: string;
  dateEn: string;
  readTimeAr: string;
  readTimeEn: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  paragraphsAr: string[];
  paragraphsEn: string[];
  bulletPointsAr: string[];
  bulletPointsEn: string[];
  keywordsAr: string[];
  keywordsEn: string[];
  imageUrl: string;
  publicImagePath: string;
  altTextAr: string;
  altTextEn: string;
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "art-jeddah-painter-decor",
    categoryAr: "دهانات وديكورات جدة",
    categoryEn: "Jeddah Paints & Decor",
    dateAr: "تحديث جدة 2026",
    dateEn: "Jeddah Guide 2026",
    readTimeAr: "قراءة 3 دقائق",
    readTimeEn: "3 min read",
    titleAr: "معلم دهانات وديكورات بجدة: تنفيذ داخلي وخارجي وتشطيبات متكاملة",
    titleEn: "Jeddah Painting & Decor Specialist: Interior, Exterior & Turnkey Finishes",
    excerptAr: "خدمات معلم دهانات وترميم جدة المتخصصة في الدهانات الداخلية والخارجية للمنازل والفلل والشقق والمكاتب والمحلات بأعلى دقة في التأسيس والتشطيب.",
    excerptEn: "Specialized interior and exterior painting, villa finishing, and residential renovation across all Jeddah districts.",
    paragraphsAr: [
      "اختيار معلم دهانات وديكورات بجدة يمتلك الخبرة الميدانية والأدوات الحديثة يضمن لك مظهراً متناسقاً يدوم طويلاً، فالدهان لا يقتصر على تطبيق اللون فقط، بل يبدأ بفحص الجدران ومعالجة العيوب وتجهيز الأسطح.",
      "ننفذ كافة أعمال دهانات المنازل والفلل والشقق والمكاتب والمحلات التجارية في جميع أحياء جدة، سواء في المشاريع الجديدة التي تحتاج تشطيباً كاملاً أو المساكن القائمة التي تحتاج إلى تجديد وإعادة دهان.",
      "نحرص في كل مشروع على تنسيق الألوان الهادئة مع الإضاءة والأرضيات واختيار خامات جوتن والجزيرة الأصلية المقاومة للغسيل والرطوبة الساحلية مع تقديم معاينة ميدانية واضحة قبل التنفيذ."
    ],
    paragraphsEn: [
      "Choosing an experienced Jeddah painter ensures smooth, long-lasting results built on thorough crack treatment, putty skimming, and surface priming.",
      "We execute interior and exterior coatings for homes, villas, apartments, offices, and commercial storefronts across North, Central, East, and South Jeddah.",
      "Every space receives tailored color guidance matched with room lighting and authentic washable Jotun and Al-Jazeera formulations."
    ],
    bulletPointsAr: [
      "دهانات داخلية وخارجية للفلل والمنازل والشقق والمكاتب",
      "معالجة التشققات والتمليح والرطوبة قبل الطلاء النهائي",
      "تنسيق الألوان الحديثة وخامات جوتن والجزيرة الأصلية",
      "معاينة ميدانية وتسعير شفاف عبر 0507478126"
    ],
    bulletPointsEn: [
      "Interior & exterior finishes for villas, apartments, and offices",
      "Root-cause crack and dampness remediation prior to painting",
      "Authentic Jotun & Al-Jazeera washable paints",
      "Direct inspection & transparent quotes via 0507478126"
    ],
    keywordsAr: ["معلم دهانات جدة", "معلم دهانات وديكورات بجدة", "دهانات جدة", "معلم بوية جدة"],
    keywordsEn: ["Jeddah Painter", "Jeddah Painting & Decor", "Interior Exterior Paint"],
    imageUrl: article1Img,
    publicImagePath: "/images/articles/article-1.png",
    altTextAr: "شعار وهوية معلم دهانات وديكورات جدة 0507478126",
    altTextEn: "Jeddah Painter & Decor Master Identity 0507478126"
  },
  {
    id: "art-quality-finishes-villas",
    categoryAr: "دهانات وتشطيبات جدة",
    categoryEn: "Villas & Homes Finishing",
    dateAr: "تحديث جدة 2026",
    dateEn: "Jeddah Guide 2026",
    readTimeAr: "قراءة 4 دقائق",
    readTimeEn: "4 min read",
    titleAr: "دهانات وتشطيبات بجودة عالية للمنازل والفلل والمكاتب في جدة",
    titleEn: "High-Quality Painting & Architectural Finishing for Jeddah Villas & Offices",
    excerptAr: "تغطية شاملة لأعمال دهانات داخلية جدة ودهانات خارجية للواجهات وتأسيس المعجون والجبس بورد وتركيب الديكورات الجدارية الحديثة.",
    excerptEn: "Comprehensive interior/exterior wall painting, facade durability, and modern wall paneling tailored for Jeddah homes.",
    paragraphsAr: [
      "تحتاج المنازل والفلل في جدة إلى عناية فائقة عند تنفيذ أعمال الدهانات والتشطيبات، حيث يؤثر تناسق الألوان ونوع الطلاء بشكل مباشر على اتساع الغرف وإبراز جمال الأثاث والإضاءة.",
      "نقدم منظومة متكاملة تشمل دهانات الغرف والمجالس والصالات، دهان الواجهات الخارجية المقاوم للشمس والرطوبة، دهان الأبواب والأسقف الجبسية، وتركيب الفوم وبديل الخشب والرخام.",
      "قبل تطبيق أي وجه دهان نهائي يتم فحص اللياسة والدهان القديم وإزالة الأجزاء المتقشرة ومعالجة الشروخ بالمعجون المقاوم والصنفرة الدقيقة للوصول إلى سطح ناعم متجانس."
    ],
    paragraphsEn: [
      "Jeddah homes and villas benefit from careful planning of color shades, sheens, and wall accent zones that harmonize with flooring and lighting.",
      "Our turnkey workflow covers bedrooms, majlises, reception halls, exterior facades, gypsum ceilings, and decorative wood/foam cladding.",
      "Before topcoats are rolled, loose layers are scraped, cracks are reinforced, and substrates are finely sanded for seamless uniformity."
    ],
    bulletPointsAr: [
      "دهانات داخلية للغرف والصالات والمجالس والأسقف",
      "دهانات خارجية للواجهات والأسوار مقاومة للحرارة والرطوبة",
      "دهانات المكاتب والشركات والمحلات التجارية في جدة",
      "تشطيب دقيق وتنسيق كامل مع الديكور الداخلي"
    ],
    bulletPointsEn: [
      "Washable matte and eggshell interior paints",
      "Coastal weather-resistant exterior & profile facades",
      "Commercial storefronts and corporate office finishes",
      "Clean protection of floors, doors, and furniture"
    ],
    keywordsAr: ["دهانات داخلية جدة", "دهانات خارجية جدة", "دهانات فلل جدة", "تشطيبات جدة"],
    keywordsEn: ["Interior Paints Jeddah", "Villa Painting", "Commercial Finishing"],
    imageUrl: article2Img,
    publicImagePath: "/images/articles/article-2.jpg",
    altTextAr: "تشطيب دهانات صالات وخلفيات شاشات مع فوم جداري في جدة",
    altTextEn: "Living hall paint and fluted TV wall trim finish in Jeddah"
  },
  {
    id: "art-interior-walls-ceilings",
    categoryAr: "دهان جدران وأسقف",
    categoryEn: "Walls & Ceilings",
    dateAr: "تحديث جدة 2026",
    dateEn: "Jeddah Guide 2026",
    readTimeAr: "قراءة 3 دقائق",
    readTimeEn: "3 min read",
    titleAr: "دهان جدران وأسقف وتشطيبات داخلية للغرف والمجالس والصالات",
    titleEn: "Interior Wall & Gypsum Ceiling Painting for Bedrooms, Majlises & Halls",
    excerptAr: "كيف تجهز الجدران والأسقف باحترافية للحصول على طلاء متجانس بدون عيوب مع أحدث درجات الألوان المحايدة والهادئة في جدة.",
    excerptEn: "Step-by-step interior preparation, neutral palette guidance, and ceiling joint painting for uniform luxury results.",
    paragraphsAr: [
      "تعتبر الدهانات الداخلية من أكثر الخدمات طلباً في جدة، سواء عند تشطيب مسكن جديد أو عند الرغبة في تجديد ألوان الغرف والمجالس لإضفاء إشراقة متجددة على المكان.",
      "نبدأ العمل بتقييم حالة الجدران والأسقف والجبس بورد، ثم معالجة التموجات والفواصل بالمعجون والصنفرة الميكانيكية، يليها تطبيق طبقة أساس (برايمر) تثبت اللون وتمنع امتصاص الطلاء غير المتساوي.",
      "نحافظ طوال فترة العمل على نظافة الأرضيات والمفروشات وتغليف الأبواب والنوافذ، مع تنفيذ خطوط قص نظيفة بين الأسقف والجدران."
    ],
    paragraphsEn: [
      "Interior wall and ceiling painting remains one of the highest-impact upgrades for both new builds and occupied Jeddah apartments.",
      "We evaluate drywall and plaster joints first, apply multi-layer putty and fine sanding, and seal surfaces with a stabilizing primer coat.",
      "Crisp cut-in lines along cornices and recessed ceilings keep spaces looking fresh, architectural, and effortless to clean."
    ],
    bulletPointsAr: [
      "معالجة فواصل الجبس بورد وطلاء الأسقف بالمطفي المريح للعين",
      "استخدام بويات بدون رائحة وقابلة للغسيل للمجالس وغرف النوم",
      "خطوط قص احترافية وتناسق تام في زوايا الجدران والأسقف",
      "إنجاز سريع ومنظم يناسب الشقق المسكونة والمفروشة"
    ],
    bulletPointsEn: [
      "Gypsum ceiling seam repair & non-glare matte topcoats",
      "Low-odor washable paints ideal for occupied homes",
      "Precision cutting edges at ceilings and moldings",
      "Fast, spotless project handover"
    ],
    keywordsAr: ["دهان جدران جدة", "دهانات أسقف جدة", "دهانات مجالس جدة", "دهانات صالات جدة"],
    keywordsEn: ["Wall Painting Jeddah", "Ceiling Paint", "Majlis Paints"],
    imageUrl: article3Img,
    publicImagePath: "/images/articles/article-3.jpg",
    altTextAr: "دهان جدران وأسقف وتشطيبات ديكور مودرن في صالة بجدة",
    altTextEn: "Modern interior living hall wall and ceiling paint finish in Jeddah"
  },
  {
    id: "art-choosing-jeddah-painter",
    categoryAr: "دليل العملاء",
    categoryEn: "Client Guide",
    dateAr: "تحديث جدة 2026",
    dateEn: "Jeddah Guide 2026",
    readTimeAr: "قراءة 4 دقائق",
    readTimeEn: "4 min read",
    titleAr: "دليل اختيار معلم دهانات وديكورات بجدة: تجهيز الأسطح وتنسيق الألوان",
    titleEn: "Choosing Your Jeddah Painter: Surface Prep, Materials & Color Planning",
    excerptAr: "تعرف على المعايير العملية لاختيار أفضل معلم دهان جدة، وما الذي يميز التأسيس السليم للجدران وتكسيات الشاشات وورق الجدران.",
    excerptEn: "Practical checklist for hiring a reliable painter in Jeddah—from substrate moisture checks to final material selection.",
    paragraphsAr: [
      "عند البحث عن رقم معلم دهان جدة، فإن الجودة الحقيقية تظهر في مراحل التحضير غير المرئية: تنظيف السطح، معالجة آثار الرطوبة والتمليح، واختيار المعجون والبرايمر المناسب قبل الوجه النهائي.",
      "نساعد عملاءنا في مقارنة درجات اللمعان (مطفي، ربع لمعة، نصف لمعة) وتجربة عينات الألوان تحت إضاءة الغرفة الفعلية قبل الاعتماد النهائي لتفادي اختلاف اللون عن الصور.",
      "نغطي كافة أحياء شمال ووسط وشرق وجنوب جدة بفريق متخصص يلتزم بالمواعيد وجودة التسليم."
    ],
    paragraphsEn: [
      "The difference between an average paint job and an enduring luxury finish lies in surface preparation, alkali primers, and crack reinforcement.",
      "We help homeowners sample neutral shades under actual room lighting before rolling full walls so expectations match reality.",
      "Dedicated mobile teams serve North, Central, East, and South Jeddah neighborhoods promptly."
    ],
    bulletPointsAr: [
      "فحص الرطوبة والتشققات ومعالجتها بمواد عازلة متخصصة",
      "تجربة عينات الألوان على الجدار تحت إضاءة المكان الفعلية",
      "المرونة الكاملة بين تنفيذ مصنعية فقط أو شغل كامل بالمواد",
      "تغطية كافة أحياء جدة: أبحر، الروضة، السلامة، الحمدانية، السامر والأجاويد"
    ],
    bulletPointsEn: [
      "Moisture & crack testing prior to primer coats",
      "In-room color sampling before full application",
      "Flexible turnkey material+labor or labor-only options",
      "Prompt coverage across all Jeddah neighborhoods"
    ],
    keywordsAr: ["أفضل معلم دهانات في جدة", "رقم معلم دهان جدة", "تجهيز الأسطح", "معلم دهانات شمال جدة"],
    keywordsEn: ["Best Painter Jeddah", "Surface Preparation", "All Jeddah Districts"],
    imageUrl: article4Img,
    publicImagePath: "/images/articles/article-4.png",
    altTextAr: "نماذج أعمال ديكورات ودهانات معلم دهانات وترميم جدة",
    altTextEn: "Showcase collage of painting and decor projects in Jeddah"
  },
  {
    id: "art-home-renovation-repainting",
    categoryAr: "ترميم وتجديد المنازل",
    categoryEn: "Renovation & Renewal",
    dateAr: "تحديث جدة 2026",
    dateEn: "Jeddah Guide 2026",
    readTimeAr: "قراءة 4 دقائق",
    readTimeEn: "4 min read",
    titleAr: "تجديد وتشطيب دهانات المنازل والفلل وإعادة طلاء الجدران في جدة",
    titleEn: "Home & Villa Paint Renewal, Crack Repair & Full Interior Refurbishment",
    excerptAr: "حلول متكاملة لإعادة إحياء الشقق والفلل القديمة في جدة عبر ترميم الشروخ وإزالة البوية المتقشرة وتطبيق أحدث دهانات جوتن والجزيرة.",
    excerptEn: "Complete restoration for lived-in apartments and villas in Jeddah, resolving peeling coats and damp patches permanently.",
    paragraphsAr: [
      "تغيير لون الجدران وتجديد الدهانات مع أعمال الترميم البسيطة هو أسرع طريقة لإعادة الحيوية والنظافة إلى الشقق والفلل في جدة دون الحاجة إلى تكاليف تكسير باهظة.",
      "نبدأ أعمال تجديد دهانات جدة بإزالة الطبقات المتقشرة أو المتأثرة بالرطوبة حتى الوصول إلى السطح الصلب، ثم معالجة الشروخ بالمعجون المرن والشاش وتأسيس البرايمر المقاوم.",
      "كما تشمل خدمات الترميم لدينا إصلاح الجدران بعد صيانة التكييف والسباكة، دهان الأبواب الخشبية، وتجديد واجهات المنازل بالبروفايل المقاوم للشمس."
    ],
    paragraphsEn: [
      "Refreshing worn walls with thorough renovation prep restores brightness and hygiene to residential homes at high value.",
      "Our crews strip flaking layers back to solid plaster, reinforce cracks with mesh and flexible compound, and seal with damp-block primer.",
      "Services extend to post-plumbing wall patching, wooden door enamels, and UV-resistant exterior facade repainting."
    ],
    bulletPointsAr: [
      "إزالة البوية المتقشرة ومعالجة الأملاح والرطوبة من الجذور",
      "ترميم الشروخ والتشققات بشاش الحماية والمعجون المرن",
      "تجديد دهانات الشقق والمنازل والفلل بألوان عصرية مريحة",
      "إصلاح الجدران والأسقف بعد تمديدات التكييف والسباكة"
    ],
    bulletPointsEn: [
      "Full stripping of blistered paint and salt efflorescence",
      "Reinforced crack repair with fiberglass mesh",
      "Modern color updates for bedrooms, halls, and facades",
      "Seamless patching after AC or plumbing repairs"
    ],
    keywordsAr: ["ترميم منازل جدة", "ترميم فلل جدة", "تجديد دهانات جدة", "صيانة منازل جدة"],
    keywordsEn: ["Home Renovation Jeddah", "Villa Renovation", "Repainting Jeddah"],
    imageUrl: article5Img,
    publicImagePath: "/images/articles/article-5.jpg",
    altTextAr: "تجديد دهانات الصالات والديكورات الحديثة في جدة",
    altTextEn: "Modern living room paint renewal and TV console decor in Jeddah"
  },
  {
    id: "art-modern-decor-ideas-jeddah",
    categoryAr: "ديكورات حديثة جدة",
    categoryEn: "Modern Decor Ideas",
    dateAr: "تحديث جدة 2026",
    dateEn: "Jeddah Guide 2026",
    readTimeAr: "قراءة 5 دقائق",
    readTimeEn: "5 min read",
    titleAr: "أحدث أفكار الديكور الداخلي للمنازل والفلل في جدة وتنسيق الألوان",
    titleEn: "Latest Interior Wall Decor Trends for Jeddah Homes: Wood, Marble & Foam",
    excerptAr: "دليل عملي لتنسيق جدران الشاشات والمجالس والمداخل باستخدام بديل الخشب وبديل الرخام وبراويز الفوم وورق الجدران والإضاءة المخفية.",
    excerptEn: "Smart design principles pairing fluted wood panels, marble sheets, foam boiserie, LED lighting, and balanced color palettes.",
    paragraphsAr: [
      "أصبح الاتجاه الحديث في ديكورات المنازل والفلل بجدة يعتمد على البساطة الأنيقة وتوظيف الجدار المحوري (Focal Wall) عبر الدمج المدروس بين الدهان السادة وتكسيات بديل الخشب وبديل الرخام.",
      "لا ينفصل لون الدهان عن باقي عناصر الغرفة؛ لذا يراعى تنسيق الدرجات المحايدة الدافئة (الجريج، البيج الفاتح، الأوف وايت) مع ألوان الأرضيات والستائر والإضاءة المخفية في الأسقف وخلفيات الشاشات.",
      "في المساحات الواسعة والمجالس تبرز براويز الفوم الكلاسيكية والبانوهات المدهونة بلون الجدار، بينما تمنح شرائح بديل الخشب WPC وألواح بديل الرخام PVC فخامة عملية سهلة التنظيف في الصالات والمداخل."
    ],
    paragraphsEn: [
      "Contemporary Jeddah interiors favor clean architectural simplicity anchored by a balanced focal wall.",
      "Wall shades are matched carefully with porcelain floors, doors, curtains, and recessed warm LED strips.",
      "Classic foam boiserie shines in formal majlises, while fluted WPC wood slats and PVC marble panels elevate TV consoles and foyers."
    ],
    bulletPointsAr: [
      "تصميم وتنفيذ خلفيات شاشات التلفزيون ببديل الخشب وبديل الرخام",
      "تركيب براويز الفوم والبانوهات وتوحيد لونها مع الجدار",
      "تركيب ورق جدران عصري ومقاوم للرطوبة بدون فواصل ظاهرة",
      "توزيع الإضاءة المخفية لتعزيز جمال الدهانات المخملية والهادئة"
    ],
    bulletPointsEn: [
      "Bespoke TV feature walls using WPC wood and PVC marble",
      "Mitered foam boiserie moldings painted seamlessly with wall shades",
      "Smooth bubble-free modern wallpaper installations",
      "Ambient warm lighting highlighting accent wall textures"
    ],
    keywordsAr: ["ديكورات حديثة جدة", "بديل الخشب والرخام جدة", "ديكورات فوم جدة", "ورق جدران جدة"],
    keywordsEn: ["Modern Decor Jeddah", "WPC & PVC Panels", "Foam Moldings"],
    imageUrl: article6Img,
    publicImagePath: "/images/articles/article-6.png",
    altTextAr: "تصاميم ديكورات جدارية وبديل الخشب وخلفيات شاشات في جدة",
    altTextEn: "Contemporary interior TV wall decor concepts executed in Jeddah"
  }
];
