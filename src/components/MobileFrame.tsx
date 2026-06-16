import React, { useState, useEffect } from 'react';
import { User as UserType, AnalysisReport } from '../types';
import RatingMeter from './RatingMeter';
import { 
  Smartphone, Wifi, Battery, Home, LayoutDashboard, Search, Sparkles, 
  User, CreditCard, Bell, Shield, Moon, Sun, Globe,
  Menu, Info, Check, RotateCcw, AlertTriangle, FileDown, Star, Trash
} from 'lucide-react';

interface MobileFrameProps {
  currentUser: UserType | null;
  savedReports: AnalysisReport[];
  onAnalyze: (url: string) => Promise<AnalysisReport | null>;
  onToggleFavorite: (id: string) => void;
  onDeleteReport: (id: string) => void;
}

export default function MobileFrame({
  currentUser,
  savedReports,
  onAnalyze,
  onToggleFavorite,
  onDeleteReport
}: MobileFrameProps) {
  // Mobile app independent state
  const [mobileTab, setMobileTab] = useState<'home' | 'saved' | 'premium' | 'profile'>('home');
  const [mobileDarkMode, setMobileDarkMode] = useState(false);
  const [mobileUrl, setMobileUrl] = useState('');
  const [activeReport, setActiveReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Notification states
  const [notification, setNotification] = useState<string | null>(null);

  const triggerPushNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileUrl.trim()) return;

    try {
      setIsLoading(true);
      setActiveReport(null);
      const rep = await onAnalyze(mobileUrl.trim());
      if (rep) {
        setActiveReport(rep);
        triggerPushNotification(`🔔 Scan complete: ${rep.domain} scored ${rep.score}/100!`);
      }
    } catch (err) {
      console.error(err);
      triggerPushNotification(`❌ Analysis failed. Check URL.`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
      case 'Good':
      case 'Pass':
      case 'Optimal':
        return <Check className="w-4 h-4 text-emerald-500" />;
      case 'Needs Improvement':
      case 'Warning':
      case 'Optimize':
      case 'Suboptimal':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4" id="mobile-frame-container-root">
      
      {/* Device wrapper mockup */}
      <div className="relative w-80 h-[640px] bg-slate-900 rounded-[42px] p-3.5 shadow-2xl border-4 border-slate-800 flex flex-col justify-between" id="physical-device-frame">
        
        {/* Notch Camera hole spacer */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-full z-40 flex items-center justify-center space-x-1.5" id="notch">
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div>
          <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {/* Dynamic inner screen */}
        <div className={`relative flex-1 w-full h-full rounded-[30px] overflow-hidden flex flex-col justify-between transition-colors duration-300 select-none ${
          mobileDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`} id="inner-phone-screen">
          
          {/* Dynamic Floating Notification popdown */}
          {notification && (
            <div className="absolute top-12 left-2 right-2 bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl z-50 flex items-center space-x-3 border border-slate-700 animate-bounce duration-500" id="notification-banner">
              <Bell className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
              <div className="text-2xs font-semibold leading-tight flex-1">{notification}</div>
            </div>
          )}

          {/* Status Bar */}
          <div className={`pt-8 px-4 pb-2 flex justify-between items-center text-[10px] font-black tracking-wider ${
            mobileDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`} id="status-bar">
            <span>08:00 UTC</span>
            <div className="flex items-center space-x-2">
              <Wifi className="w-3 h-3" />
              <span className="text-[9px]">LTE</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Core Body Container - content scroll */}
          <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-none" id="phone-main-scroll-pane">
            
            {/* Header branding row */}
            <div className="flex justify-between items-center mb-4" id="phone-heading">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-black tracking-wide">AdSense App</span>
              </div>

              {/* Moon / Sun toggle */}
              <button 
                onClick={() => setMobileDarkMode(!mobileDarkMode)} 
                className={`p-2 rounded-xl border ${
                  mobileDarkMode ? 'border-slate-800 bg-slate-900 text-amber-400' : 'border-slate-200 bg-white text-slate-500'
                }`}
              >
                {mobileDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* TAB CONTENT: HOME */}
            {mobileTab === 'home' && (
              <div className="space-y-4 animate-fade-in" id="phone-tab-home">
                {activeReport ? (
                  /* Mobile Checker report active */
                  <div className="space-y-4" id="phone-scanned-results">
                    <button
                      onClick={() => setActiveReport(null)}
                      className="inline-flex items-center text-[10px] font-bold text-blue-600 mb-1 uppercase"
                    >
                      ← Back to Scanner
                    </button>

                    <div className={`p-4 rounded-2xl border ${mobileDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} text-center`} id="phone-rating-meter-min">
                      <h4 className="text-2xs uppercase tracking-wide font-black text-slate-405">Overall score</h4>
                      <div className="text-4xl font-extrabold text-blue-600 my-2">{activeReport.score}/100</div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full border">{activeReport.approvalChance}</span>
                    </div>

                    {/* Quick Pages compliance checklist */}
                    <div className={`p-4 rounded-2xl ${mobileDarkMode ? 'bg-slate-900' : 'bg-white'} border`} id="phone-compliance-kit">
                      <h5 className="text-[10px] uppercase font-black tracking-wide text-slate-400 mb-2">Policy Trust pages</h5>
                      <div className="space-y-2">
                        {activeReport.pagesCheck.slice(0, 4).map((p) => (
                          <div key={p.id} className="flex justify-between items-center text-3xs font-bold" id={`pcheck-phone-${p.id}`}>
                            <span className={mobileDarkMode ? 'text-slate-300' : 'text-slate-600'}>{p.name}</span>
                            <div className="flex items-center space-x-1">
                              {renderStatusIcon(p.status)}
                              <span>{p.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Prioritized Suggestion box code */}
                    <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20" id="phone-ai-checklist">
                      <h5 className="text-[10px] uppercase font-black tracking-wide text-blue-500 mb-2">AI High Priority suggestion</h5>
                      <p className="text-3xs leading-relaxed text-slate-400">
                        {activeReport.recommendations[0]?.suggestion || "Everything perfect. Simply submit."}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Mobile Search engine input */
                  <div className="space-y-4" id="phone-scan-run">
                    <div className="text-center py-4" id="phone-elevator-pitch">
                      <h3 className="text-sm font-black tracking-tight">Evaluate Site Eligibility</h3>
                      <p className={`text-[10px] mt-1 pr-1 ${mobileDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Find low value penalties and check policy page disclaimers automatically.
                      </p>
                    </div>

                    {/* Scanner form */}
                    <form onSubmit={handleMobileSubmit} className="space-y-3" id="phone-form">
                      <div className="relative" id="phone-input">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                        <input
                          type="text"
                          placeholder="Type target URL (e.g. blog.com)"
                          value={mobileUrl}
                          onChange={(e) => setMobileUrl(e.target.value)}
                          className={`w-full pl-9 pr-3 py-2.5 text-2xs focus:ring-1 focus:ring-blue-500 rounded-xl outline-none border ${
                            mobileDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                          }`}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70 shadow-md shadow-blue-500/20"
                        id="phone-fire"
                      >
                        {isLoading ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            <span>Crawling URL...</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-3.5 h-3.5" />
                            <span>Analyze Website</span>
                          </>
                        )}
                      </button>
                    </form>

                    {/* Pre-installed mini recommendations */}
                    <div className="space-y-2.5 pt-2" id="phone-demo-recommendations">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Quick Guidelines</span>
                      <div className="space-y-2" id="tips">
                        <div className={`p-3 rounded-xl text-3xs flex items-start space-x-2.5 border ${
                          mobileDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-150'
                        }`}>
                          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">✓</div>
                          <div>
                            <strong className="block mb-0.5">Publish standard docs</strong>
                            Ensure terms, cookie, sitemap configurations are searchable.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SAVED REPORTS */}
            {mobileTab === 'saved' && (
              <div className="space-y-4 animate-fade-in" id="phone-tab-saved">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Stored Audits ({savedReports.length})</h3>
                <div className="space-y-2" id="phone-saved-history">
                  {savedReports.length === 0 ? (
                    <p className="text-3xs text-slate-400 italic text-center py-6">No reports stored found. Head to checker to run a scan.</p>
                  ) : (
                    savedReports.map((rep) => (
                      <div key={rep.id} className={`p-3.5 rounded-xl border flex justify-between items-center text-3xs font-bold ${
                        mobileDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-100'
                      }`} id={`saved-phone-row-${rep.id}`}>
                        <div>
                          <span className="text-2xs font-extrabold block truncate max-w-32">{rep.domain}</span>
                          <span className="text-slate-400 text-3xs font-semibold block mt-0.5">Rating Score: {rep.score}/100</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onToggleFavorite(rep.id)}
                            className="p-1 text-amber-500 hover:text-amber-600"
                          >
                            <Star className={`w-3.5 h-3.5 ${rep.isFavorite ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => onDeleteReport(rep.id)}
                            className="p-1 text-rose-500 hover:text-rose-600"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PREMIUM */}
            {mobileTab === 'premium' && (
              <div className="space-y-4 animate-fade-in text-center py-4" id="phone-tab-premium">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full w-fit mx-auto mb-2">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-xs font-black">Upgrade to Pro Auditor</h3>
                <p className={`text-3xs max-w-xs mx-auto ${mobileDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Unlock unrestricted mobile evaluations list, download complete PDF indexes, and enjoy 24h technical support.
                </p>

                <div className={`p-4 rounded-2xl border text-left space-y-1.5 ${
                  mobileDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-100'
                }`} id="plan-invoice-mobile">
                  <span className="text-3xs text-blue-600 uppercase font-black block">Price Breakdown</span>
                  <div className="flex justify-between font-bold text-2xs">
                    <span>Premium Monthly Pass</span>
                    <span>$19.00</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Subscription completed on website dynamically synchronizes to the mobile client.")}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Join Premium Pro
                </button>
              </div>
            )}

            {/* TAB CONTENT: USER PROFILE */}
            {mobileTab === 'profile' && (
              <div className="space-y-4 animate-fade-in" id="phone-tab-profile">
                <div className="text-center py-2" id="user-header">
                  <div className="w-12 h-12 bg-blue-100 text-blue-605 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-black">
                    {currentUser ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <h4 className="text-xs font-black">{currentUser ? currentUser.name : 'Vite Publisher'}</h4>
                  <p className="text-3xs text-slate-400">{currentUser ? currentUser.email : 'guest@example.com'}</p>
                </div>

                {/* Profile settings list rows */}
                <div className="space-y-2" id="settings-deck-phone">
                  <div className={`p-3.5 rounded-xl border flex justify-between items-center text-3xs font-semibold ${
                    mobileDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-100'
                  }`}>
                    <span>Analytical Plan Tier</span>
                    <span className="text-blue-600 font-bold capitalize">{currentUser ? currentUser.plan : 'free'}</span>
                  </div>
                  <div className={`p-3.5 rounded-xl border flex justify-between items-center text-3xs font-semibold ${
                    mobileDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-100'
                  }`}>
                    <span>Device Notification Alert</span>
                    <span className="text-emerald-600 font-bold">Enabled</span>
                  </div>
                  <div className={`p-3.5 rounded-xl border flex justify-between items-center text-3xs font-semibold ${
                    mobileDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-105'
                  }`}>
                    <span>Core SDK engine version</span>
                    <span className="font-mono">v4.1.14</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Device Nav Tab Bar */}
          <div className={`pt-2 px-3 pb-6 flex justify-around border-t ${
            mobileDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-150'
          }`} id="bottom-tab-bar">
            {[
              { id: 'home', icon: Home, label: 'Search' },
              { id: 'saved', icon: LayoutDashboard, label: 'Audits' },
              { id: 'premium', icon: Sparkles, label: 'Pro' },
              { id: 'profile', icon: User, label: 'User' }
            ].map((btn) => {
              const IsActive = mobileTab === btn.id;
              const IconComponent = btn.icon;

              return (
                <button
                  key={btn.id}
                  onClick={() => setMobileTab(btn.id as any)}
                  className={`flex flex-col items-center justify-center p-1.5 focus:outline-none flex-1 transition-colors ${
                    IsActive 
                      ? 'text-blue-600' 
                      : (mobileDarkMode ? 'text-slate-450 hover:text-slate-100' : 'text-slate-500 hover:text-slate-900')
                  }`}
                  id={`m-tab-btn-${btn.id}`}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span className="text-[8px] font-bold mt-1 tracking-wide">{btn.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Devices home Indicator line block */}
        <div className="w-32 h-1 bg-slate-850 rounded-full mx-auto mt-2" id="home-indicator"></div>
      </div>
    </div>
  );
}
