import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Phone,
  ArrowUp,
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  MapPin
} from 'lucide-react';
import { CONTACT_INFO } from '../data/websiteContent';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { buildLocalAssistantReply, AssistantAction } from '../utils/siteAssistantEngine';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: AssistantAction[];
}

interface QuickPromptItem {
  id: string;
  labelAr: string;
  labelEn: string;
  queryAr: string;
  queryEn: string;
}

const QUICK_PROMPTS: QuickPromptItem[] = [
  {
    id: 'contact',
    labelAr: 'طرق التواصل المباشر',
    labelEn: 'Direct Contact & Phone',
    queryAr: 'كيف أتواصل معكم وما هو رقم الجوال والواتساب؟',
    queryEn: 'How can I contact you via phone or WhatsApp?'
  },
  {
    id: 'all-services',
    labelAr: 'الخدمات التسع بالتفصيل',
    labelEn: 'All 9 Services',
    queryAr: 'ما هي جميع الخدمات التي تقدمونها؟',
    queryEn: 'What are all services you provide?'
  },
  {
    id: 'pricing',
    labelAr: 'سعر متر الدهان والتكلفة',
    labelEn: 'Pricing & Meter Rates',
    queryAr: 'كم سعر متر الدهان والتكلفة في جدة؟',
    queryEn: 'What are your painting prices and meter rates in Jeddah?'
  },
  {
    id: 'districts',
    labelAr: 'أحياء جدة المخدومة',
    labelEn: 'Jeddah Districts',
    queryAr: 'ما هي أحياء ومناطق جدة التي تخدمونها؟',
    queryEn: 'Which Jeddah districts and areas do you cover?'
  },
  {
    id: 'finishes',
    labelAr: 'دهانات جوتن والجزيرة',
    labelEn: 'Jotun & Al-Jazeera',
    queryAr: 'ما هي أفضل أنواع الدهانات من جوتن والجزيرة؟',
    queryEn: 'What Jotun and Al-Jazeera paint finishes do you use?'
  },
  {
    id: 'decor',
    labelAr: 'بديل الخشب والفوم والورق',
    labelEn: 'Wood, Foam & Wallpaper',
    queryAr: 'أخبرني بالتفصيل عن بديل الخشب والرخام والفوم وورق الجدران',
    queryEn: 'Tell me about wood panels, marble panels, foam trims and wallpaper'
  },
  {
    id: 'exterior',
    labelAr: 'دهانات خارجية وبروفايل',
    labelEn: 'Exterior & Profile',
    queryAr: 'تفاصيل الدهانات الخارجية ودهان بروفايل وكسر رخام للواجهات',
    queryEn: 'Details on exterior facade painting and textured profile'
  },
  {
    id: 'moisture',
    labelAr: 'علاج الرطوبة والتشققات',
    labelEn: 'Moisture & Crack Repair',
    queryAr: 'كيف تعالجون الرطوبة والتشققات وتقشر البوية؟',
    queryEn: 'How do you treat wall moisture, dampness, and cracks?'
  },
  {
    id: 'stages',
    labelAr: 'مراحل التنفيذ وحماية الأثاث',
    labelEn: 'Stages & Care',
    queryAr: 'ما هي خطوات التنفيذ وهل تحمون الأثاث والأرضيات؟',
    queryEn: 'What are the execution stages and furniture protection steps?'
  }
];

interface FloatingActionsProps {
  isDeveloperMode?: boolean;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ isDeveloperMode = false }) => {
  const { language, isRtl, t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputQuestion, setInputQuestion] = useState('');

  const initialBotText = language === 'ar'
    ? `مرحباً بك في «${CONTACT_INFO.name}»! 👋\nأسأل عن أي خدمة من خدماتنا الـ 9، أسعار الدهانات في جدة، أحياء جدة، بديل الخشب والفوم، علاج الرطوبة، أو تواصل معنا مباشرة:`
    : `Welcome to ${CONTACT_INFO.nameEn}! 👋\nAsk about our 9 services, Jotun & Al-Jazeera paints, Jeddah districts, renovation details, or contact us directly below:`;

  const initialActions: AssistantAction[] = [
    {
      type: 'call',
      label: language === 'ar' ? `اتصال مباشر: ${CONTACT_INFO.phone}` : `Call Now: ${CONTACT_INFO.phone}`,
      href: `tel:${CONTACT_INFO.internationalPhone}`
    },
    {
      type: 'whatsapp',
      label: language === 'ar' ? 'واتساب مباشر' : 'WhatsApp Direct',
      href: CONTACT_INFO.whatsappUrl
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: initialBotText,
      timestamp: language === 'ar' ? 'الآن' : 'Now',
      actions: initialActions
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [
          {
            id: 'welcome',
            sender: 'bot',
            text: initialBotText,
            timestamp: language === 'ar' ? 'الآن' : 'Now',
            actions: initialActions
          }
        ];
      }
      return prev;
    });
  }, [language, initialBotText]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pushConversationTurn = (userDisplayText: string, queryForEngine: string) => {
    const timeStr = new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const reply = buildLocalAssistantReply(queryForEngine, language);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userDisplayText,
      timestamp: timeStr
    };

    const botMsg: ChatMessage = {
      id: `b-${Date.now() + 1}`,
      sender: 'bot',
      text: reply.text,
      timestamp: timeStr,
      actions: reply.actions
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSelectQuickPrompt = (promptItem: QuickPromptItem) => {
    const query = language === 'ar' ? promptItem.queryAr : promptItem.queryEn;
    pushConversationTurn(query, query);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputQuestion.trim();
    if (!query) return;
    pushConversationTurn(query, query);
    setInputQuestion('');
  };

  const getWhatsAppFromBotHref = (lastText?: string) => {
    const textToSend = language === 'ar'
      ? (lastText
        ? `السلام عليكم معلم دهانات وترميم جدة، أود الاستفسار بخصوص: ${lastText}`
        : 'السلام عليكم ورحمة الله، أود الاستفسار وطلب خدمة دهانات أو ديكور أو ترميم في جدة.')
      : (lastText
        ? `Hello Jeddah Painter & Renovation Master, inquiry regarding: ${lastText}`
        : 'Hello, I would like to request a painting or renovation service in Jeddah.');
    return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(textToSend)}`;
  };

  const renderActionIcon = (type: AssistantAction['type']) => {
    if (type === 'call') return <Phone className="w-3.5 h-3.5 text-amber-300" />;
    if (type === 'maps') return <MapPin className="w-3.5 h-3.5" />;
    return <MessageCircle className="w-3.5 h-3.5" />;
  };

  const getActionClasses = (type: AssistantAction['type']) => {
    if (type === 'call') {
      return 'bg-[#0f2b5c] hover:bg-[#173f82] text-white border border-amber-400/50';
    }
    if (type === 'maps') {
      return 'bg-[#EA4335] hover:bg-[#d33426] text-white border border-red-300/40';
    }
    return 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40';
  };

  return (
    <>
      <div className={`fixed bottom-4 ${isRtl ? 'left-3.5 sm:left-5' : 'right-3.5 sm:right-5'} z-40 flex flex-col items-center gap-3.5 sm:gap-3.5 select-none`}>
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/95 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 hover:text-[#0f2b5c] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center group cursor-pointer"
            aria-label={t.scrollTopTitle}
            title={t.scrollTopTitle}
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

        {/* Quick Inquiry Drawer Toggle — Strictly Visible to Authenticated Developer Only */}
        {isDeveloperMode && (
          <div className="relative group">
            <div className={`absolute ${isRtl ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center whitespace-nowrap bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-xl border border-slate-700 pointer-events-none transition-all z-50`}>
              <span>{t.botTitle}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
                isChatOpen
                  ? 'bg-amber-500 text-slate-950 rotate-90'
                  : 'bg-gradient-to-br from-[#0f2b5c] to-sky-700 hover:from-[#153a7a] hover:to-sky-600 border-2 border-sky-400'
              }`}
              title={t.botTitle}
              aria-label={t.botTitle}
            >
              {isChatOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MessageSquare className="w-5 h-5 text-amber-300" />
              )}
            </button>
          </div>
        )}

        {/* Direct Call Floating Button */}
        <div className="relative group">
          <div className="hidden sm:block absolute inset-0 rounded-2xl bg-amber-400/30 animate-ping pointer-events-none opacity-60"></div>

          <div className={`absolute ${isRtl ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center whitespace-nowrap bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-xl border border-slate-700 pointer-events-none transition-all z-50`}>
            <span>{t.callDirectTitle}</span>
          </div>

          <a
            href={`tel:${CONTACT_INFO.internationalPhone}`}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0f2b5c] text-white shadow-lg hover:bg-[#1a448c] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-amber-400/90 group"
            title={t.callDirectTitle}
            aria-label={t.callDirectTitle}
          >
            <Phone className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        {/* Direct WhatsApp Floating Button */}
        <div className="relative group">
          <div className="hidden sm:block absolute -inset-1.5 rounded-3xl bg-emerald-500/25 animate-ping pointer-events-none opacity-75"></div>

          <div className={`absolute ${isRtl ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center whitespace-nowrap bg-emerald-950 text-white text-xs font-bold py-1.5 px-3.5 rounded-xl shadow-2xl border border-emerald-500/50 pointer-events-none transition-all z-50`}>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.whatsAppDirectTitle}</span>
            </span>
          </div>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-500 text-white shadow-xl hover:from-emerald-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center group border-2 border-white/50"
            title={t.whatsAppDirectTitle}
            aria-label={t.whatsAppDirectTitle}
          >
            <span className="hidden sm:flex absolute -top-1 -right-1 h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border border-white shadow-xs"></span>
            </span>

            <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Site-Knowledge Assistant Drawer (Developer Only) */}
      {isDeveloperMode && isChatOpen && (
        <div
          role="dialog"
          aria-label={t.botTitle}
          className={`fixed bottom-20 sm:bottom-24 ${isRtl ? 'left-3 right-3 sm:right-auto sm:left-5' : 'right-3 left-3 sm:left-auto sm:right-5'} z-50 sm:w-[440px] max-w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-sky-400 overflow-hidden ${isRtl ? 'text-right' : 'text-left'} animate-fadeIn flex flex-col h-[540px] max-h-[82vh]`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="bg-gradient-to-l from-[#06182c] via-[#09355c] to-sky-700 p-4 text-white relative shrink-0">
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer`}
              title={language === 'ar' ? 'إغلاق' : 'Close'}
              aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white p-1 shrink-0 flex items-center justify-center shadow-md">
                <Logo variant="mark" size="sm" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-amber-300">{t.botTitle}</h4>
                  <span className="bg-emerald-400/25 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300/40">
                    {t.botBadge}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t.botSubtitle}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-gradient-to-b from-slate-50 to-sky-50/30 dark:from-slate-900 dark:to-slate-950">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-600 to-[#0f2b5c] text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 border border-sky-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {msg.sender === 'bot' && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700 flex flex-wrap gap-2">
                      {msg.actions.map((act, idx) => (
                        <a
                          key={`${msg.id}-act-${idx}`}
                          href={act.href}
                          target={act.type === 'call' ? undefined : '_blank'}
                          rel={act.type === 'call' ? undefined : 'noopener noreferrer'}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-xs transition-all active:scale-95 ${getActionClasses(act.type)}`}
                        >
                          {renderActionIcon(act.type)}
                          <span>{act.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-sky-100 dark:border-slate-800 shrink-0">
            <div className="text-[11px] font-bold text-sky-900 dark:text-amber-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{t.botFaqTitle}</span>
              </span>
              <button
                type="button"
                onClick={() => setMessages(messages.slice(0, 1))}
                className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5 cursor-pointer"
                title={t.botClear}
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>{t.botClear}</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {QUICK_PROMPTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectQuickPrompt(item)}
                  className="px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 text-[#0f2b5c] dark:text-slate-200 border border-sky-200 dark:border-slate-700 text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {language === 'ar' ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder={t.botPlaceholder}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#0f2b5c] hover:bg-sky-900 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.botSend}</span>
              </button>
            </form>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${CONTACT_INFO.internationalPhone}`}
                className="py-2 px-3 rounded-xl bg-[#0f2b5c] hover:bg-[#173f82] text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a
                href={getWhatsAppFromBotHref(inputQuestion || messages[messages.length - 1]?.text)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
