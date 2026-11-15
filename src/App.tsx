/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeSectionsPreview } from './components/HomeSectionsPreview';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationMap } from './components/LocationMap';
import { ShowcasePresentation } from './components/ShowcasePresentation';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { PageHeader } from './components/PageHeader';
import { DeveloperPortalModal } from './components/DeveloperPortalModal';
import { useLanguage } from './context/LanguageContext';
import { smartTokenMatch } from './utils/siteAssistantEngine';

export default function App() {
  const { isRtl, t, language } = useLanguage();
  const [isDevPortalOpen, setIsDevPortalOpen] = useState(false);
  const [isDeveloperAuthenticated, setIsDeveloperAuthenticated] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem('jeddah_painter_dev_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('q') || params.get('search') || '';
    const hash = window.location.hash.replace('#', '').trim();

    if (params.get('dev') === '1' || hash === 'dev-portal') {
      setIsDevPortalOpen(true);
    }

    if (searchQuery && (!hash || hash === 'home')) {
      const qTokens = searchQuery.split(/\s+/).filter(Boolean);
      if (smartTokenMatch('خريطة موقع احياء أبحر المروة الحمدانية الشاطئ جدة', qTokens)) {
        setCurrentPage('location');
        return;
      }
      if (smartTokenMatch('مقالات دليل مواضيع جوتن الجزيرة اسئلة شائعة جودة', qTokens)) {
        setCurrentPage('quality');
        return;
      }
      if (smartTokenMatch('اعمال معرض صور نماذج تصاميم', qTokens)) {
        setCurrentPage('portfolio');
        return;
      }
      setCurrentPage('services');
    } else if (!hash) {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && (e.key === 'D' || e.key === 'd' || e.key === 'ي')) {
        e.preventDefault();
        setIsDevPortalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const pageTitleMap: Record<string, string> = language === 'ar'
      ? {
          home: 'معلم دهانات وترميم جدة | دهانات وديكورات وتشطيبات وصيانة المنازل',
          about: 'من نحن | معلم دهانات وترميم جدة - حي المروة',
          services: 'خدمات معلم دهانات وترميم جدة | دهانات وديكورات وترميم',
          portfolio: 'معرض أعمال الدهانات والديكورات في جدة | معلم دهانات وترميم جدة',
          quality: 'المقالات والدليل الفني والأسئلة الشائعة | معلم دهانات وترميم جدة',
          location: 'موقعنا وأحياء جدة على خرائط Google | معلم دهانات وترميم جدة',
          contact: 'تواصل معنا واطلب معاينة في جدة | 0507478126'
        }
      : {
          home: 'Jeddah Painter & Renovation Master | Painting & Wall Decor',
          about: 'About Us | Jeddah Painter & Renovation Master',
          services: '9 Core Services | Jeddah Painter & Renovation Master',
          portfolio: 'Project Showcase | Jeddah Painter & Renovation Master',
          quality: 'Quality, Articles & Guides | Jeddah Painter & Renovation Master',
          location: 'Jeddah Districts & Google Maps | Jeddah Painter',
          contact: 'Contact & Request Quote | 0507478126'
        };
    const nextTitle = pageTitleMap[currentPage] || pageTitleMap.home;
    document.title = nextTitle;
  }, [currentPage, language]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash === 'dev-portal') {
        setIsDevPortalOpen(true);
        return;
      }
      const validPages = [
        'home',
        'services',
        'portfolio',
        'quality',
        'reviews',
        'location',
        'about',
        'contact'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash === 'reviews' ? 'quality' : hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId: string) => {
    const normalized = pageId === 'reviews' ? 'quality' : pageId;
    setCurrentPage(normalized);
    window.location.hash = normalized === 'home' ? '' : normalized;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-white transition-colors duration-200 overflow-x-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      <main>
        {/* ==================== 1. HOME PAGE (Focused & Executive) ==================== */}
        {currentPage === 'home' && (
          <div>
            {/* 1. Hero Banner */}
            <Hero onNavigate={navigateTo} />

            {/* 2. Curated Services Pillars, Showcase, Quality Overview & Quick Location Callout */}
            <HomeSectionsPreview onNavigate={navigateTo} />
          </div>
        )}

        {/* ==================== 2. SERVICES PAGE ==================== */}
        {currentPage === 'services' && (
          <div>
            <PageHeader
              title={t.pageServicesTitle}
              subtitle={t.pageServicesSubtitle}
              badge={t.pageServicesBadge}
              onBackToHome={() => navigateTo('home')}
            />
            <ServicesSection hideHeader={true} />
            <InnerPageNavigator currentPage="services" onNavigate={navigateTo} />
          </div>
        )}

        {/* ==================== 3. PORTFOLIO PAGE ==================== */}
        {currentPage === 'portfolio' && (
          <div>
            <PageHeader
              title={t.pagePortfolioTitle}
              subtitle={t.pagePortfolioSubtitle}
              badge={t.pagePortfolioBadge}
              onBackToHome={() => navigateTo('home')}
            />
            <PortfolioSection hideHeader={true} />
            <InnerPageNavigator currentPage="portfolio" onNavigate={navigateTo} />
          </div>
        )}

        {/* ==================== 4. QUALITY, STAGES, EXPERT GUIDES & FAQS PAGE ==================== */}
        {currentPage === 'quality' && (
          <div>
            <PageHeader
              title={t.pageQualityTitle}
              subtitle={t.pageQualitySubtitle}
              badge={t.pageQualityBadge}
              onBackToHome={() => navigateTo('home')}
            />
            <ReviewsSection hideHeader={true} onNavigate={navigateTo} />
            <InnerPageNavigator currentPage="quality" onNavigate={navigateTo} />
          </div>
        )}

        {/* ==================== 5. LOCATION & REAL JEDDAH MAP PAGE ==================== */}
        {currentPage === 'location' && (
          <div>
            <PageHeader
              title={t.pageLocationTitle}
              subtitle={t.pageLocationSubtitle}
              badge={t.pageLocationBadge}
              onBackToHome={() => navigateTo('home')}
            />
            <LocationMap hideHeader={true} />
            <InnerPageNavigator currentPage="location" onNavigate={navigateTo} />
          </div>
        )}

        {/* ==================== 6. ABOUT PAGE ==================== */}
        {currentPage === 'about' && (
          <div>
            <PageHeader
              title={t.pageAboutTitle}
              subtitle={t.pageAboutSubtitle}
              badge={t.pageAboutBadge}
              onBackToHome={() => navigateTo('home')}
            />
            <AboutSection />
            <ShowcasePresentation onNavigate={navigateTo} />
            <InnerPageNavigator currentPage="about" onNavigate={navigateTo} />
          </div>
        )}

        {/* ==================== 7. CONTACT & REQUEST SERVICE PAGE ==================== */}
        {currentPage === 'contact' && (
          <div>
            <PageHeader
              title={t.pageContactTitle}
              subtitle={t.pageContactSubtitle}
              badge={t.pageContactBadge}
              onBackToHome={() => navigateTo('home')}
            />
            <ContactSection />
            <InnerPageNavigator currentPage="contact" onNavigate={navigateTo} />
          </div>
        )}
      </main>

      <Footer onNavigate={navigateTo} onOpenDeveloperPortal={() => setIsDevPortalOpen(true)} />

      <DeveloperPortalModal
        isOpen={isDevPortalOpen}
        onClose={() => setIsDevPortalOpen(false)}
        onNavigateSection={navigateTo}
        onAuthChange={setIsDeveloperAuthenticated}
      />

      <FloatingActions isDeveloperMode={isDeveloperAuthenticated} />
    </div>
  );
}

const InnerPageNavigator: React.FC<{ currentPage: string; onNavigate: (page: string) => void }> = ({
  currentPage,
  onNavigate,
}) => {
  const { t } = useLanguage();
  const pages = [
    { id: 'home', label: t.navHome },
    { id: 'services', label: t.navServices },
    { id: 'portfolio', label: t.navPortfolio },
    { id: 'quality', label: t.navQuality },
    { id: 'location', label: t.navLocation },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 text-center">
      <div className="container mx-auto px-4">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
          {t.innerNavTitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {pages.map((p) => {
            if (p.id === currentPage) return null;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onNavigate(p.id)}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-900 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
