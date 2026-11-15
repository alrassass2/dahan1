/**
 * Application Master Configuration
 * إعدادات النظام والهوية التجارية المعتمدة: معلم دهانات وترميم جدة
 */

export const APP_CONFIG = {
  // بيانات الهوية التجارية
  brandName: "معلم دهانات وترميم جدة",
  brandNameEn: "Jeddah Painter & Renovation Master",
  businessDescription: "دهانات وديكورات وتشطيبات وترميم وصيانة المنازل.",
  slogan: "نمنح منزلك جمالاً جديداً بلمسات من الخبرة والاحترافية.",
  releaseVersion: "3.0.0-production",

  // معلومات التواصل المباشر
  contact: {
    phone: "0507478126",
    formattedPhone: "050 747 8126",
    whatsappPhone: "+966507478126",
    whatsappUrl: "https://wa.me/966507478126",
    city: "جدة – المملكة العربية السعودية",
    cityEn: "Jeddah, Saudi Arabia",
    googleMapsPrimaryUrl: "https://share.google/gJLFPX7o9xhbCC77O",
    googleMapsSecondaryUrl: "https://maps.app.goo.gl/qhaHFhorm24MGTT27?g_st=awb",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.9931233543125!2d39.210401499999996!3d21.5471242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d4de0923a1e7eef%3A0x7e01f53694294502!2z2YXYudmE2YUg2K_Zh9in2YbYp9iqINmI2KrYsdmF2YrZhSDYrNiv2Yc!5e0!3m2!1sar!2s!4v1794662394610!5m2!1sar!2s",
    coordinates: {
      lat: 21.5471242,
      lng: 39.2104015,
    }
  },

  // روابط وسائل التواصل الاجتماعي الرسمية المعتمدة (6 منصات فقط)
  socialMedia: {
    googleMaps: {
      name: "الموقع",
      handle: "موقعنا على خرائط Google",
      url: "https://share.google/gJLFPX7o9xhbCC77O"
    },
    tiktok: {
      name: "تيك توك",
      handle: "تيك توك",
      url: "https://vm.tiktok.com/ZS9f9aFUgf7kn-eUwoh/"
    },
    instagram: {
      name: "انستقرام",
      handle: "@lbydny8351",
      url: "https://www.instagram.com/lbydny8351?utm_source=qr&psln=MTFoN2ZiaHprZzk4N"
    },
    snapchat: {
      name: "سناب شات",
      handle: "mlmdhntwdyk7586",
      url: "https://www.snapchat.com/add/mlmdhntwdyk7586?share_id=UTrzpMoPHNk&locale=ar-SA"
    },
    whatsapp: {
      name: "واتساب",
      handle: "0507478126",
      url: "https://wa.me/966507478126"
    },
    phone: {
      name: "اتصال",
      handle: "0507478126",
      url: "tel:+966507478126"
    }
  },

  // إعدادات الأمان واستضافة الإنتاج
  security: {
    sslEnabled: true,
    hstsMaxAge: 31536000,
    canonicalRedirect: true,
    serverMode: "Production Standalone / SPA / Node.js Express",
    recommendedHostings: ["Vercel", "cPanel / Apache", "Nginx VPS", "Docker / Cloud Run"]
  }
} as const;

export default APP_CONFIG;
