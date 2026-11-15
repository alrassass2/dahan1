import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  ExternalLink,
  Layers,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  LocateFixed,
  Plus,
  Minus
} from 'lucide-react';
import { CONTACT_INFO, JEDDAH_DISTRICTS_SECTORS } from '../data/websiteContent';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

let L: any = null;

export interface LocationMapProps {
  hideHeader?: boolean;
}

const JEDDAH_MAP_MARKERS = [
  // شمال جدة
  { lat: 21.775, lng: 39.102, ar: 'أبحر الشمالية', en: 'North Obhur' },
  { lat: 21.720, lng: 39.112, ar: 'أبحر الجنوبية', en: 'South Obhur' },
  { lat: 21.785, lng: 39.165, ar: 'طيبة والياقوت', en: 'Taibah & Al-Yaqoot' },
  { lat: 21.758, lng: 39.205, ar: 'الحمدانية', en: 'Al-Hamdaniyah' },
  { lat: 21.765, lng: 39.235, ar: 'الفلاح والصالحية', en: 'Al-Falah & Al-Salhiyah' },
  { lat: 21.678, lng: 39.110, ar: 'المرجان', en: 'Al-Murjan' },
  { lat: 21.662, lng: 39.142, ar: 'البساتين', en: 'Al-Basateen' },
  { lat: 21.648, lng: 39.120, ar: 'المحمدية', en: 'Al-Muhammadiyyah' },
  { lat: 21.615, lng: 39.112, ar: 'الشاطئ', en: 'Al-Shati' },
  { lat: 21.622, lng: 39.148, ar: 'النعيم', en: 'Al-Naeem' },
  { lat: 21.612, lng: 39.180, ar: 'النزهة', en: 'Al-Nuzhah' },
  { lat: 21.630, lng: 39.210, ar: 'المروة', en: 'Al-Marwah' },
  { lat: 21.592, lng: 39.132, ar: 'الزهراء', en: 'Al-Zahra' },
  { lat: 21.585, lng: 39.156, ar: 'السلامة', en: 'Al-Salamah' },
  { lat: 21.585, lng: 39.182, ar: 'البوادي', en: 'Al-Bawadi' },
  { lat: 21.576, lng: 39.208, ar: 'الصفا', en: 'Al-Safa' },
  { lat: 21.564, lng: 39.145, ar: 'الخالدية', en: 'Al-Khalidiyah' },
  { lat: 21.560, lng: 39.166, ar: 'الروضة', en: 'Al-Rawdah' },
  { lat: 21.565, lng: 39.190, ar: 'الفيصلية', en: 'Al-Faisaliyah' },
  // وسط وغرب جدة
  { lat: 21.530, lng: 39.160, ar: 'الحمراء', en: 'Al-Hamra' },
  { lat: 21.545, lng: 39.150, ar: 'الأندلس', en: 'Al-Andalus' },
  { lat: 21.548, lng: 39.185, ar: 'العزيزية', en: 'Al-Aziziyah' },
  { lat: 21.552, lng: 39.208, ar: 'الرحاب', en: 'Al-Rehab' },
  { lat: 21.536, lng: 39.196, ar: 'مشرفة', en: 'Mushrifah' },
  { lat: 21.520, lng: 39.215, ar: 'السليمانية', en: 'Al-Sulaymaniyah' },
  { lat: 21.515, lng: 39.235, ar: 'النسيم والفيحاء', en: 'Al-Naseem & Al-Fayha' },
  { lat: 21.490, lng: 39.192, ar: 'البلد والثغر', en: 'Al-Balad & Al-Thaghar' },
  // شرق جدة
  { lat: 21.595, lng: 39.235, ar: 'السامر', en: 'Al-Samer' },
  { lat: 21.608, lng: 39.250, ar: 'المنار والأجواد', en: 'Al-Manar & Al-Ajwad' },
  { lat: 21.622, lng: 39.225, ar: 'بريمان والتوفيق', en: 'Briman & Al-Tawfiq' },
  { lat: 21.540, lng: 39.265, ar: 'قويزة والمنتزهات', en: 'Quwayzah & Al-Muntazahat' },
  { lat: 21.485, lng: 39.320, ar: 'الحرازات', en: 'Al-Harazat' },
  // جنوب جدة
  { lat: 21.455, lng: 39.245, ar: 'الوزيرية ومدائن الفهد', en: 'Al-Waziriyah & Madain Al-Fahad' },
  { lat: 21.430, lng: 39.255, ar: 'الأمير فواز', en: 'Prince Fawaz' },
  { lat: 21.390, lng: 39.295, ar: 'الأجاويد والسنابل', en: 'Al-Ajawid & Al-Sanabel' },
  { lat: 21.350, lng: 39.225, ar: 'الخمرة والقرينية', en: 'Al-Khomrah & Al-Qurayniyah' }
];

export const LocationMap: React.FC<LocationMapProps> = ({ hideHeader = false }) => {
  const { language, isRtl, t } = useLanguage();
  const [mapMode, setMapMode] = useState<'google_live' | 'interactive' | 'blueprint' | 'satellite'>('google_live');
  const [mapLevel, setMapLevel] = useState<'ksa' | 'jeddah'>('jeddah');
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const coverageCircleRef = useRef<any>(null);

  const jeddahPinCenter: [number, number] = [
    CONTACT_INFO.coordinates.lat,
    CONTACT_INFO.coordinates.lng
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && !L) {
      import('leaflet').then((leafletModule) => {
        L = leafletModule.default || leafletModule;
        setLeafletLoaded(true);
      }).catch(() => {});
    } else if (L) {
      setLeafletLoaded(true);
    }
  }, []);

  useEffect(() => {
    if ((mapMode !== 'interactive' && mapMode !== 'satellite') || !leafletLoaded || !mapContainerRef.current || !L) {
      return;
    }

    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: jeddahPinCenter,
      zoom: mapLevel === 'ksa' ? 6 : 11,
      zoomControl: false,
      attributionControl: false
    });

    const tileUrl = mapMode === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

    L.tileLayer(tileUrl, {
      maxZoom: 19
    }).addTo(map);

    coverageCircleRef.current = L.circle(jeddahPinCenter, {
      color: '#f59e0b',
      fillColor: '#f59e0b',
      fillOpacity: 0.12,
      weight: 2,
      radius: 18000
    }).addTo(map);

    const mainPinIcon = L.divIcon({
      className: 'google-maps-pin-marker',
      html: `
        <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);">
          <div style="background:#0f2b5c;color:#fef08a;padding:6px 12px;border-radius:12px;font-weight:800;font-size:12px;border:2px solid #f59e0b;box-shadow:0 8px 20px rgba(0,0,0,0.35);white-space:nowrap;">
            ${language === 'ar' ? 'معلم دهانات وترميم جدة' : 'Jeddah Painter & Renovation'}
          </div>
          <div style="width:18px;height:18px;background:#EA4335;border:3px solid #fff;border-radius:9999px;margin-top:4px;box-shadow:0 4px 10px rgba(0,0,0,0.35);"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });

    L.marker(jeddahPinCenter, { icon: mainPinIcon })
      .addTo(map)
      .bindPopup(
        `<div style="padding:10px 12px;text-align:${isRtl ? 'right' : 'left'};font-family:Cairo,sans-serif;">
          <strong style="color:#0f2b5c;font-size:13px;">${t.brandName}</strong><br/>
          <span style="color:#475569;font-size:11px;">${t.officialAddress}</span><br/>
          <a href="${CONTACT_INFO.googleMapsPrimaryUrl}" target="_blank" rel="noopener noreferrer" style="color:#EA4335;font-weight:700;font-size:11px;">Google Maps</a>
        </div>`
      );

    JEDDAH_MAP_MARKERS.forEach((dm) => {
      const districtName = language === 'ar' ? dm.ar : dm.en;
      const districtIcon = L.divIcon({
        className: 'jeddah-district-pin',
        html: `
          <div style="display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.96);color:#0f2b5c;padding:2px 7px;border-radius:9999px;font-size:10px;font-weight:800;border:1px solid #94a3b8;box-shadow:0 3px 8px rgba(0,0,0,0.2);white-space:nowrap;transform:translate(-50%,-50%);cursor:pointer;">
            <span style="width:6px;height:6px;border-radius:9999px;background:#10b981;display:inline-block;"></span>
            <span>${districtName}</span>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      L.marker([dm.lat, dm.lng], { icon: districtIcon })
        .addTo(map)
        .bindPopup(
          `<div style="padding:8px 10px;text-align:${isRtl ? 'right' : 'left'};font-family:Cairo,sans-serif;">
            <strong style="color:#0f2b5c;font-size:12px;">${districtName}</strong><br/>
            <span style="color:#475569;font-size:10px;">${language === 'ar' ? 'دهانات وديكورات وترميم المنازل' : 'Painting, Decor & Renovation'}</span>
          </div>`
        );
    });

    leafletMapRef.current = map;

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [mapMode, mapLevel, leafletLoaded, language, isRtl, t.brandName, t.officialAddress]);

  const handleRecenter = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView(jeddahPinCenter, mapLevel === 'ksa' ? 6 : 11, { animate: true });
    }
  };

  const handleCopyLocationLink = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.googleMapsPrimaryUrl);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 3000);
    } catch {
      setCopiedCoords(false);
    }
  };

  return (
    <section
      id="location"
      className={`${hideHeader ? 'pt-6 pb-20' : 'pt-14 pb-20'} bg-white dark:bg-slate-950 relative overflow-hidden border-t border-slate-100 dark:border-slate-800`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-300 text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{t.mapHeaderBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] dark:text-white tracking-tight mb-4">
              {t.mapHeaderTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'نخدم جميع أحياء مدينة جدة – المملكة العربية السعودية، ويمكنكم الاطلاع على موقعنا مباشرة عبر خرائط Google الموضحة أدناه.'
                : t.mapHeaderDesc}
            </p>
          </div>
        )}

        {/* Map Card Wrapper */}
        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 border border-white/15">
                <Logo variant="mark" size="sm" isLight />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    {t.brandName}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    {language === 'ar' ? 'موقع موثق على خرائط Google' : t.mapVerifiedBadge}
                  </span>
                </div>
                <p className="text-xs text-amber-300 font-medium mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.officialAddress}</span>
                </p>
              </div>
            </div>

            {/* Map Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {mapMode !== 'google_live' && mapMode !== 'blueprint' && (
                <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setMapLevel('jeddah')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      mapLevel === 'jeddah' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {t.mapLevelJeddah}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapLevel('ksa')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      mapLevel === 'ksa' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {t.mapLevelKsa}
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMapMode('google_live')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'google_live'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t.mapModeGoogleLive}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('interactive')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'interactive'
                      ? 'bg-sky-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t.mapModeInteractive}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('satellite')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'satellite'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.mapModeSatellite}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('blueprint')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'blueprint'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.mapModeBlueprint}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Map Canvas */}
          <div className="relative h-[420px] sm:h-[480px] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            {mapMode === 'google_live' && (
              <iframe
                title={language === 'ar' ? 'خريطة معلم دهانات وترميم جدة على خرائط Google' : 'Jeddah Painter & Renovation Google Map'}
                src={CONTACT_INFO.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}

            {(mapMode === 'interactive' || mapMode === 'satellite') && (
              <>
                <div ref={mapContainerRef} className="w-full h-full z-10" />
                <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-20 flex flex-col gap-2`}>
                  <button
                    type="button"
                    onClick={() => leafletMapRef.current?.zoomIn()}
                    className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 shadow-lg border border-slate-200 cursor-pointer"
                    aria-label="Zoom In"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => leafletMapRef.current?.zoomOut()}
                    className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 shadow-lg border border-slate-200 cursor-pointer"
                    aria-label="Zoom Out"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRecenter}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg cursor-pointer"
                    title={t.mapRecenterTitle}
                    aria-label={t.mapRecenterTitle}
                  >
                    <LocateFixed className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {mapMode === 'blueprint' && (
              <div className="w-full h-full bg-gradient-to-br from-[#061830] via-[#0b2548] to-[#0f2b5c] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-y-auto">
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl w-full">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-lg">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg sm:text-2xl font-black text-amber-300 mb-1.5">
                    {t.officialAddress}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 mb-5 leading-relaxed max-w-2xl mx-auto">
                    {language === 'ar'
                      ? 'نخدم جميع أحياء مدينة جدة في المملكة العربية السعودية لأعمال الدهانات والديكورات والترميم وصيانة المنازل.'
                      : 'Complete coverage across North, Central, East, and South Jeddah neighborhoods.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-right">
                    {JEDDAH_DISTRICTS_SECTORS.map((sec) => (
                      <div key={sec.id} className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
                        <div className="text-xs font-extrabold text-amber-300 mb-1.5">
                          {language === 'ar' ? sec.regionAr : sec.regionEn}
                        </div>
                        <div className="text-[11px] text-slate-200 leading-relaxed">
                          {(language === 'ar' ? sec.districtsAr : sec.districtsEn).join('، ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Floating Google Maps Action Overlay */}
            <div className={`hidden sm:block absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-sm`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    {language === 'ar' ? 'الموقع الرسمي على خرائط Google' : 'Official Google Maps Pin'}
                  </span>
                  <h4 className="text-sm font-black text-[#0f2b5c] dark:text-white">
                    {t.brandName}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {t.officialAddress}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLocationLink}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shrink-0"
                  title={language === 'ar' ? 'نسخ رابط خرائط Google' : 'Copy Google Maps link'}
                >
                  {copiedCoords ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={CONTACT_INFO.googleMapsPrimaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EA4335] hover:bg-[#d33426] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.mapBtnGoogleMaps}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={CONTACT_INFO.googleMapsSecondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0f2b5c] hover:bg-[#173c7a] text-white text-xs font-bold shadow-sm transition-all"
                  title={t.mapBtnGoogleMapsApp}
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ar' ? 'فتح الخريطة' : 'Open Map'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Jeddah Coverage Zones & Authentic Districts Directory */}
          <div className="p-5 sm:p-7 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f2b5c] dark:text-white">{t.mapFeatureCoverageTitle}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{t.mapFeatureCoverageDesc}</p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f2b5c] dark:text-white">{t.mapFeatureHoursTitle}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{t.mapFeatureHoursDesc}</p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f2b5c] dark:text-white">{t.mapFeatureInspectionTitle}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{t.mapFeatureInspectionDesc}</p>
                </div>
              </div>
            </div>

            {/* Real Jeddah Districts Covered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {JEDDAH_DISTRICTS_SECTORS.map((sec) => (
                <div
                  key={sec.id}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  <h4 className="text-xs font-extrabold text-[#0f2b5c] dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{language === 'ar' ? sec.regionAr : sec.regionEn}</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {(language === 'ar' ? sec.districtsAr : sec.districtsEn).join('، ')}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Contact Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'ar' ? 'نخدم جميع أحياء جدة – السعودية' : 'Jeddah – Saudi Arabia'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2.5 w-full md:w-auto">
                <a
                  href={CONTACT_INFO.googleMapsPrimaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA4335] hover:bg-[#d33426] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t.mapBtnGoogleMaps}</span>
                </a>
                <a
                  href={CONTACT_INFO.googleMapsSecondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ar' ? 'فتح رابط الخريطة المباشر' : 'Direct Map Link'}</span>
                </a>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.mapBtnWhatsApp}</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.internationalPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#173c7a] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.mapBtnCall}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
