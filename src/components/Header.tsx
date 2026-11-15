import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Sun,
  Moon,
  Globe,
  Check
} from 'lucide-react';
import { Logo } from './Logo';
import { MaterialIcon } from './MaterialIcon';
import { CONTACT_INFO } from '../data/websiteContent';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, id: 'home', hash: '#home', icon: 'home' },
    { name: t.navAbout, id: 'about', hash: '#about', icon: 'info' },
    { name: t.navServices, id: 'services', hash: '#services', icon: 'format_paint' },
    { name: t.navPortfolio, id: 'portfolio', hash: '#portfolio', icon: 'gallery_thumbnail' },
    { name: t.navQuality, id: 'quality', hash: '#quality', icon: 'verified' },
    { name: t.navLocation, id: 'location', hash: '#location', icon: 'location_on' },
    { name: t.navContact, id: 'contact', hash: '#contact', icon: 'support_agent' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const getShareUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const hash = currentPage === 'home' ? '' : `#${currentPage}`;
    return `${origin}/${hash}`;
  };

  const handleCopyCurrentLink = async () => {
    const fullLink = getShareUrl();

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullLink);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      setCopiedLink(false);
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800 py-2 sm:py-2.5'
            : 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/80 py-2.5 sm:py-3'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-[1440px] mx-auto px-2.5 sm:px-5 lg:px-7">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center group focus:outline-none cursor-pointer min-w-0 shrink"
              aria-label={t.brandName}
            >
              <Logo variant="compact" size="md" />
            </a>

            <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  currentPage === link.id ||
                  (link.id === 'quality' && currentPage === 'reviews');

                return (
                  <a
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    href={link.hash}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`px-3 py-2 rounded-xl text-[13px] font-bold transition-all relative cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#0f2b5c] dark:text-amber-400 bg-amber-50/90 dark:bg-amber-950/40 font-extrabold shadow-2xs'
                        : 'text-slate-700 dark:text-slate-200 hover:text-[#0f2b5c] dark:hover:text-amber-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0.5 right-3 left-3 h-0.5 bg-amber-500 rounded-full"></span>
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                id="language-toggle-btn"
                type="button"
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-[#0f2b5c] dark:text-amber-300 border border-amber-300/80 dark:border-amber-700/70 transition-all cursor-pointer shadow-2xs group font-bold text-xs"
                aria-label={t.switchLang}
                title={`تبديل اللغة / Switch to ${language === 'ar' ? 'English' : 'العربية'}`}
              >
                <span className="font-sans font-bold">{t.switchLang}</span>
                <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
              </button>

              <button
                id="copy-section-link-btn"
                type="button"
                onClick={handleCopyCurrentLink}
                className="hidden md:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-100/60 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs group"
                aria-label={t.copyLink}
                title={t.copyLink}
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <MaterialIcon name="content_copy" className="text-base text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform" />
                )}
              </button>

              <button
                id="theme-toggle-btn"
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-100/60 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs group"
                aria-label={theme === 'dark' ? t.toggleLightMode : t.toggleDarkMode}
                title={theme === 'dark' ? t.toggleLightMode : t.toggleDarkMode}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </button>

              <a
                id="header-whatsapp-btn"
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center relative shadow-md shadow-emerald-700/20 transition-all group"
                title="واتساب مباشر: 0507478126"
                aria-label="WhatsApp 0507478126"
              >
                <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 border-2 border-white dark:border-slate-900 rounded-full shadow-2xs"></span>
              </a>

              <a
                id="header-call-btn"
                href={`tel:${CONTACT_INFO.internationalPhone}`}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#0b1d3a] hover:bg-[#122b54] active:scale-95 text-amber-300 border border-slate-700/50 flex items-center justify-center shadow-md transition-all group"
                title="اتصال مباشر: 0507478126"
                aria-label="Call 0507478126"
              >
                <Phone className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              </a>

              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-100/60 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer flex items-center gap-1.5 transition-all shadow-2xs shrink-0"
                aria-label={language === 'ar' ? 'فتح القائمة الرئيسية' : 'Open Navigation Menu'}
                title={language === 'ar' ? 'القائمة الرئيسية' : 'Navigation Menu'}
              >
                <Menu className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold hidden sm:inline">
                  {language === 'ar' ? 'القائمة' : 'Menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className={`fixed top-0 bottom-0 ${
              isRtl ? 'right-0 shadow-[-10px_0_30px_rgba(0,0,0,0.25)]' : 'left-0 shadow-[10px_0_30px_rgba(0,0,0,0.25)]'
            } w-[300px] sm:w-[340px] max-w-[85vw] bg-white dark:bg-slate-900 z-50 flex flex-col justify-between p-5 overflow-y-auto animate-in slide-in-from-${
              isRtl ? 'right' : 'left'
            } duration-300`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <MaterialIcon name="menu" className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#0f2b5c] dark:text-amber-400">
                      {language === 'ar' ? 'القائمة الرئيسية' : 'Main Menu'}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {t.brandName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    if (language !== 'ar') toggleLanguage();
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    language === 'ar'
                      ? 'bg-white dark:bg-slate-700 text-[#0f2b5c] dark:text-amber-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <span>العربية</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (language !== 'en') toggleLanguage();
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-white dark:bg-slate-700 text-[#0f2b5c] dark:text-amber-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <span>English</span>
                </button>
              </div>

              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={handleCopyCurrentLink}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1 border border-amber-300/40 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <MaterialIcon name="content_copy" className="text-sm" />}
                  <span>{copiedLink ? t.linkCopied : t.copyLink}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-amber-400 flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'dark' ? t.toggleLightMode : t.toggleDarkMode}</span>
                </button>
              </div>

              <div className="flex flex-col gap-1.5 mb-6">
                {navLinks.map((link) => {
                  const isActive =
                    currentPage === link.id ||
                    (link.id === 'quality' && currentPage === 'reviews');

                  return (
                    <a
                      key={link.id}
                      href={link.hash}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-[#0f2b5c] dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 font-extrabold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.whatsappDirect}: {CONTACT_INFO.phone}</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.internationalPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0f2b5c] dark:bg-amber-600 hover:bg-[#153a7a] text-white text-sm font-bold shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callDirect}: {CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {copiedLink && (
        <div className="fixed bottom-24 right-1/2 translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <div className="px-5 py-3 rounded-2xl bg-[#0f2b5c] text-white text-xs sm:text-sm font-bold shadow-2xl border border-amber-400 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <span>{t.linkCopied}</span>
          </div>
        </div>
      )}
    </>
  );
};
