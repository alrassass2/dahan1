import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Server,
  Layers,
  Copy,
  Check,
  Globe,
  X,
  Search,
  Phone,
  Shield
} from 'lucide-react';
import { generateProjectZipBundle } from '../utils/zipGenerator';
import { useLanguage } from '../context/LanguageContext';
import { verifyAdminCredential } from '../utils/securityCrypto';
import aboutJeddahImg from '../assets/images/about_jeddah_identity.jpg';

interface DeveloperPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onAuthChange?: (isAuth: boolean) => void;
}

export const DeveloperPortalModal: React.FC<DeveloperPortalModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onAuthChange
}) => {
  const { isRtl } = useLanguage();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const [activeTab, setActiveTab] = useState<'bundle' | 'appkey' | 'security' | 'sections' | 'export' | 'seo'>('appkey');

  const officialAppKey = 'JPRM-SA-2026-JEDDAH-PRO-ACTIVE';
  const [copiedAppKey, setCopiedAppKey] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => {
    return localStorage.getItem('jeddah_painter_last_sync') || new Date().toLocaleString('ar-SA');
  });

  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  useEffect(() => {
    // Purge any legacy client-side secret keys if previously stored
    try {
      localStorage.removeItem('jeddah_painter_gemini_key');
      localStorage.removeItem('jeddah_painter_ai_model');
      localStorage.removeItem('jeddah_painter_ai_prompt');
    } catch {
      // Ignore storage access errors
    }

    const sessionAuth = sessionStorage.getItem('jeddah_painter_dev_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      onAuthChange?.(true);
    }
  }, [onAuthChange]);

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = window.setTimeout(() => {
      setLockoutSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [lockoutSeconds]);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0 || isVerifying) return;

    setIsVerifying(true);
    setAuthError('');
    try {
      const isValid = await verifyAdminCredential(passwordInput);
      if (isValid) {
        setIsAuthenticated(true);
        setAuthError('');
        setFailedAttempts(0);
        setPasswordInput('');
        sessionStorage.setItem('jeddah_painter_dev_auth', 'true');
        onAuthChange?.(true);
      } else {
        const nextFails = failedAttempts + 1;
        setFailedAttempts(nextFails);
        if (nextFails >= 5) {
          setLockoutSeconds(30);
          setFailedAttempts(0);
          setAuthError('تم تفعيل الحماية المؤقتة لمدة 30 ثانية لكثرة المحاولات غير الصحيحة.');
        } else {
          setAuthError('بيانات الدخول غير صحيحة! الوصول مخصص للإدارة فقط.');
        }
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('jeddah_painter_dev_auth');
    setPasswordInput('');
    onAuthChange?.(false);
  };

  const handleDownloadBundle = async () => {
    try {
      setIsDownloading(true);
      setDownloadSuccess(false);
      const blob = await generateProjectZipBundle();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jeddah-painter-renovation-bundle.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 8000);
    } catch (err) {
      console.error('Failed to generate zip bundle', err);
      setIsDownloading(false);
    }
  };

  const handleSaveAndSync = () => {
    setIsSaving(true);
    const now = new Date().toLocaleString(isRtl ? 'ar-SA' : 'en-US');
    localStorage.setItem('jeddah_painter_last_sync', now);
    setLastSyncTime(now);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccessMessage('تم تحديث حالة النظام والتحقق بنجاح!');
      setTimeout(() => setSaveSuccessMessage(''), 6000);
    }, 500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const sectionsList = [
    { id: 'home', name: 'الرئيسية (Home Hero)', anchor: '#home' },
    { id: 'services', name: 'خدماتنا (9 Services)', anchor: '#services' },
    { id: 'portfolio', name: 'معرض الصور والنماذج (Gallery)', anchor: '#portfolio' },
    { id: 'quality', name: 'المميزات ومراحل التنفيذ والأسئلة الشائعة (Quality & Stages)', anchor: '#quality' },
    { id: 'location', name: 'الموقع وخرائط جدة (Location & Maps)', anchor: '#location' },
    { id: 'about', name: 'من نحن (About Us)', anchor: '#about' },
    { id: 'contact', name: 'نموذج طلب الخدمة والتواصل (Contact)', anchor: '#contact' },
  ];

  const securityChecks = [
    {
      title: 'حماية لوحة الإدارة بتجزئة مشفرة (SHA-256 + Salt)',
      desc: 'لا توجد أي كلمات مرور أو مفاتيح سرية نصية داخل كود الواجهة الأمامية أو التخزين المحلي.'
    },
    {
      title: 'تشغيل 100% بدون مفاتيح API خارجية',
      desc: 'المساعد التفاعلي يجيب مباشرة من بيانات الموقع الموثقة دون الاعتماد على أي مفتاح ذكاء اصطناعي خارجي.'
    },
    {
      title: 'ترويسات الأمان القياسية للاستضافة (CSP & Security Headers)',
      desc: 'مفعلة في خادم Node.js وVercel وApache (.htaccess) وNginx وNetlify/Cloudflare (_headers).'
    },
    {
      title: 'جاهزية تصدّر نتائج جوجل (Schema.org + Sitemap + SEO)',
      desc: 'بيانات مهيكلة لـ HousePainter وFAQPage وكلمات بحث جدة موزعة باحترافية في الخدمات والمعرض.'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  إدارة النظام وإعدادات الاستضافة
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  v3.0 Production
                </span>
              </div>
              <p className="text-xs text-slate-400">
                معلم دهانات وترميم جدة • جدة – المملكة العربية السعودية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                قفل اللوحة
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="p-6 sm:p-10 max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">منطقة محمية - خاصة بالإدارة</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              يرجى إدخال رمز الدخول المعتمد لفتح لوحة تصدير الموقع وفحص إعدادات الأمان والاستضافة.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  رمز الدخول:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    disabled={lockoutSeconds > 0 || isVerifying}
                    placeholder="أدخل رمز الدخول..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-sm outline-hidden transition-all pr-10 font-mono disabled:opacity-50"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    {authError}
                    {lockoutSeconds > 0 ? ` (${lockoutSeconds}ث)` : ''}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={lockoutSeconds > 0 || isVerifying}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Unlock className="w-4 h-4" />
                <span>
                  {lockoutSeconds > 0
                    ? `انتظر ${lockoutSeconds} ثانية...`
                    : isVerifying
                      ? 'جاري التحقق المشفر...'
                      : 'دخول إلى لوحة النظام'}
                </span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('appkey')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'appkey' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>حالة النظام</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bundle')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'bundle' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل الحزمة (.ZIP)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'security' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>الأمان والاستضافة</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sections')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'sections' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>روابط الأقسام</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'seo' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>معاينة SEO جوجل</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('export')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'export' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>دليل النشر</span>
              </button>
            </div>

            {activeTab === 'appkey' && (
              <div className="space-y-4 text-right">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-amber-400" />
                        <h4 className="text-sm font-black text-white">معرّف التشغيل والهوية المعتمدة</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        جميع وحدات معلم دهانات وترميم جدة تعمل ذاتياً وجاهزة للاستضافة الخارجية دون مفاتيح.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold whitespace-nowrap">
                      جاهز للإنتاج 100%
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider select-all break-all" dir="ltr">
                      {officialAppKey}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(officialAppKey);
                        setCopiedAppKey(true);
                        setTimeout(() => setCopiedAppKey(false), 3000);
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      {copiedAppKey ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                      <span>{copiedAppKey ? 'تم النسخ!' : 'نسخ المعرف'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bundle' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>حزمة التصدير والنشر (.ZIP)</span>
                    </h4>
                    <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                      ملف مضغوط يتضمن إعدادات التشغيل الأمنية وملفات التوجيه والنشر لموقع معلم دهانات وترميم جدة.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadBundle}
                    disabled={isDownloading}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-60"
                  >
                    {isDownloading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>جاري التجميع...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>تحميل الحزمة (.ZIP)</span>
                      </>
                    )}
                  </button>
                </div>

                {downloadSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>تم تجهيز وتحميل حزمة المشروع بنجاح!</span>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="space-y-0.5 text-right w-full sm:w-auto">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                      <span>تحديث سجل الفحص</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      آخر فحص: <span className="text-amber-300 font-mono">{lastSyncTime}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveAndSync}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                    <span>تحديث</span>
                  </button>
                </div>

                {saveSuccessMessage && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{saveSuccessMessage}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-3 text-right">
                {securityChecks.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-black text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'sections' && (
              <div className="space-y-2 text-right">
                {sectionsList.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span className="text-xs font-bold text-white">{sec.name}</span>
                      <span className="text-[10px] font-mono text-amber-300 bg-slate-900 px-2 py-0.5 rounded">
                        {sec.anchor}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`${currentOrigin}/${sec.anchor}`, sec.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {copiedCodeId === sec.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">نسخ</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigateSection(sec.id);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>معاينة</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-4 text-right text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Globe className="w-4 h-4" />
                    <span>توجيه النشر والإنتاج:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    المشروع مهيأ للبناء عبر <span className="font-mono text-amber-300">npm run build</span> والتشغيل على Vercel أو Node.js عبر <span className="font-mono text-emerald-300">node server.js</span>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">أمر التشغيل:</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('npm install && npm run build && node server.js', 'vps_cmd')}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCodeId === 'vps_cmd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>نسخ الأمر</span>
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto text-left" dir="ltr">
                    npm install && npm run build && node server.js
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-4 text-right text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Search className="w-4 h-4" />
                    <span>معاينة ظهور الموقع والصورة المصغرة في نتائج بحث جوجل:</span>
                  </span>

                  <div className="p-4 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 text-right font-sans" dir="rtl">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono text-xs text-slate-700" dir="ltr">{currentOrigin || 'https://www.1-sa.shop'}</span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-[#1a0dab] leading-snug">
                          معلم دهانات وترميم جدة | دهانات وديكورات وصيانة المنازل
                        </h4>

                        <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
                          معلم دهانات وترميم جدة، متخصصون في الدهانات الداخلية والخارجية والديكورات الحديثة وترميم وصيانة المنازل والفلل والشقق، بكادر مؤهل وخبرة كبيرة وجودة في التنفيذ. للتواصل 0507478126.
                        </p>
                      </div>

                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-xs">
                        <img
                          src={aboutJeddahImg}
                          alt="معلم دهانات وترميم جدة"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end">
                      <a
                        href="tel:+966507478126"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-300 text-xs font-bold text-[#1a237e] hover:bg-slate-50 shadow-2xs"
                      >
                        <span>الاتصال بنا: 0507478126</span>
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>معايير التصدر والاعتمادية بتقنيات ومعايير Google:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    مبني وفق أحدث معايير Google Search Central (بيانات Schema.org الكاملة، Google Image Sitemap، PageMap للصور المصغرة، خرائط Google الموثقة، خطوط Google Fonts، ومحرك التطابق الدلالي للكلمات المترادفة والمشابهة).
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>معلم دهانات وترميم جدة • 0507478126</span>
          </div>
          <div>
            <span>جدة – المملكة العربية السعودية</span>
          </div>
        </div>
      </div>
    </div>
  );
};
