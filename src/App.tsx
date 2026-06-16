import React, { useState, useEffect } from 'react';
import { AnalysisReport, User, BlogPost } from './types';
import Home from './components/Pages/Home';
import Checker from './components/Pages/Checker';
import Blog from './components/Pages/Blog';
import FAQ from './components/Pages/FAQ';
import Pricing from './components/Pages/Pricing';
import Contact from './components/Pages/Contact';
import PolicyPages from './components/PolicyPages';
import Dashboard from './components/Pages/Dashboard';
import AdminPanel from './components/Pages/AdminPanel';
import MobileFrame from './components/MobileFrame';
import { 
  ShieldCheck, Globe, Library, HelpCircle, Sparkles, PhoneCall, 
  User as UserIcon, Settings, Layers, Lock, Landmark, FileCheck, CheckCircle
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'checker' | 'blog' | 'faq' | 'pricing' | 'contact' | 'policies' | 'dashboard' | 'admin'>('home');
  // Visual Mode Screen view state
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Stored Backend Data States
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: "usr_1",
    name: "Vite Publisher",
    email: "vmanjeet773@gmail.com",
    role: "admin", // Admin privilege lets them access the admin panel immediately!
    plan: "free",
    scansUsed: 2,
    maxScans: 5,
    createdAt: "2026-06-15"
  });

  const [savedReports, setSavedReports] = useState<AnalysisReport[]>([]);
  const [activeReport, setActiveReport] = useState<AnalysisReport | null>(null);
  const [checking, setChecking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (data.success) {
        setSavedReports(data.reports);
      }
    } catch (err) {
      console.error("Failed load evaluations:", err);
    }
  };

  const handleAnalyzeWebsite = async (targetUrl: string): Promise<AnalysisReport | null> => {
    try {
      setChecking(true);
      // Switch active tab on desktop view
      if (viewMode === 'desktop') {
        setCurrentTab('checker');
      }
      
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });
      const data = await res.json();
      if (data.success) {
        setActiveReport(data.report);
        // Refresh past listings
        fetchReports();
        
        // Update local quota scans used if active user is free
        if (currentUser && currentUser.plan === 'free') {
          setCurrentUser({
            ...currentUser,
            scansUsed: Math.min(currentUser.maxScans, currentUser.scansUsed + 1)
          });
        }
        return data.report;
      } else {
        alert(data.message || "An evaluation timeout occurred. Please retry.");
      }
    } catch (err) {
      console.error(err);
      alert("A server connection pipeline timeout occurred. Please try again.");
    } finally {
      setChecking(false);
    }
    return null;
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const res = await fetch('/api/reports/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setSavedReports(savedReports.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
        if (activeReport && activeReport.id === id) {
          setActiveReport({ ...activeReport, isFavorite: !activeReport.isFavorite });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReport = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this evaluation log?")) return;
    try {
      const res = await fetch(`/api/reports/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSavedReports(savedReports.filter(r => r.id !== id));
        if (activeReport && activeReport.id === id) {
          setActiveReport(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (email: string, name: string) => {
    // Dynamic simulated token validation
    const emailLower = email.toLowerCase();
    const isAdmin = emailLower.includes('admin') || emailLower === 'vmanjeet773@gmail.com';
    
    setCurrentUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      role: isAdmin ? "admin" : "user",
      plan: "free",
      scansUsed: 1,
      maxScans: 5,
      createdAt: new Date().toISOString()
    });
    alert(`Successfully signed in as ${name}! ${isAdmin ? 'Admin controls unlocked.' : ''}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    alert("Signed out successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between" id="app-viewport">
      
      {/* Switcher Indicator Hub (sticky top flag indicator) */}
      <div className="bg-slate-900 text-white py-2.5 px-4 text-center text-xs font-black tracking-wide flex justify-center items-center space-x-3 print:hidden z-40 relative" id="layout-toggle-bar">
        <span>Current Rendering Layout:</span>
        <div className="inline-flex bg-white/10 p-0.5 rounded-lg border border-white/15" id="layout-toggle-buttons">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded-md transition-all text-2xs cursor-pointer ${
              viewMode === 'desktop' ? 'bg-blue-600 text-white shadow-sm font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            🌐 Desktop SaaS Version
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-md transition-all text-2xs cursor-pointer ${
              viewMode === 'mobile' ? 'bg-blue-600 text-white shadow-sm font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            📱 Mobile App Emulation
          </button>
        </div>
      </div>

      {/* CORE DISPLAY LOGIC: MOBILE EMULATOR VS DESKTOP SAAS SYSTEM */}
      {viewMode === 'mobile' ? (
        <div className="flex-1 flex items-center justify-center py-6 bg-slate-100" id="mobile-emulation-layout">
          <MobileFrame
            currentUser={currentUser}
            savedReports={savedReports}
            onAnalyze={handleAnalyzeWebsite}
            onToggleFavorite={handleToggleFavorite}
            onDeleteReport={handleDeleteReport}
          />
        </div>
      ) : (
        /* Standard high-contrast Desktop SaaS styling */
        <>
          {/* Header */}
          <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-30 print:hidden" id="desktop-desktop-header">
            <div className="max-w-6xl mx-auto px-4 h-16 sm:h-18 flex justify-between items-center">
              
              {/* Brand Logo */}
              <button onClick={() => setCurrentTab('home')} className="flex items-center space-x-2.5 text-left focus:outline-none cursor-pointer" id="logo-trigger">
                <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-100">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h1 className="font-extrabold text-slate-900 leading-tight text-sm tracking-tight sm:text-base">AdSense Checker</h1>
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase mt-0.5">Eligibility platform</span>
                </div>
              </button>

              {/* Navigation Anchors on Desktop Desktop view */}
              <nav className="hidden md:flex items-center space-x-1" id="desktop-nav-menu">
                {[
                  { id: 'home', label: 'Home', icon: Globe },
                  { id: 'checker', label: 'Checker', icon: FileCheck },
                  { id: 'blog', label: 'Blog & Tips', icon: Library },
                  { id: 'faq', label: 'Compliance FAQ', icon: HelpCircle },
                  { id: 'pricing', label: 'Pricing Plan', icon: Sparkles },
                  { id: 'policies', label: 'Policies', icon: Landmark },
                  { id: 'contact', label: 'Contact Us', icon: PhoneCall },
                  ...(currentUser ? [
                    { id: 'dashboard', label: 'Dashboard', icon: UserIcon },
                    ...(currentUser.role === 'admin' ? [{ id: 'admin', label: 'Admin Panel', icon: Settings }] : [])
                  ] : [{ id: 'dashboard', label: 'Login', icon: UserIcon }])
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      currentTab === item.id
                        ? 'bg-blue-50 text-blue-650'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Hamburger drawer toggler for responsive layout width screens */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2 border rounded-xl md:hidden text-slate-600 text-xs shrink-0"
                id="hamburger-trigger"
              >
                ✕
              </button>
            </div>

            {/* Hamburger drawer expand list */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-2 flex flex-col text-xs font-semibold print:hidden" id="mobile-hamburger-drawer">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'checker', label: 'Eligibility Checker' },
                  { id: 'blog', label: 'Tips & Guides' },
                  { id: 'faq', label: 'FAQ Accordions' },
                  { id: 'pricing', label: 'Checkout Pricing' },
                  { id: 'policies', label: 'GDPR Policy kit' },
                  { id: 'contact', label: 'Help Desk tickets' },
                  ...(currentUser ? [
                    { id: 'dashboard', label: 'User Dashboard' },
                    ...(currentUser.role === 'admin' ? [{ id: 'admin', label: 'Admin Command Panel' }] : [])
                  ] : [{ id: 'dashboard', label: 'Publisher Login' }])
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full py-2.5 px-3.5 rounded-xl text-left ${
                      currentTab === item.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-605'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </header>

          {/* Core Body viewport pages switcher */}
          <main className="flex-grow py-6 sm:py-10" id="desktop-main-viewport">
            {currentTab === 'home' && (
              <Home 
                onAnalyze={handleAnalyzeWebsite} 
                isLoading={checking} 
              />
            )}

            {currentTab === 'checker' && (
              <Checker
                report={activeReport}
                onReset={() => setCurrentTab('home')}
                isLoading={checking}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {currentTab === 'blog' && (
              <Blog />
            )}

            {currentTab === 'faq' && (
              <FAQ />
            )}

            {currentTab === 'pricing' && currentUser && (
              <Pricing
                currentUser={currentUser}
                onUpdateUser={(updated) => setCurrentUser(updated)}
              />
            )}

            {currentTab === 'policies' && (
              <PolicyPages />
            )}

            {currentTab === 'contact' && (
              <Contact />
            )}

            {currentTab === 'dashboard' && (
              <Dashboard
                currentUser={currentUser}
                savedReports={savedReports}
                onSelectReport={(rep) => {
                  setActiveReport(rep);
                  setCurrentTab('checker');
                }}
                onToggleFavorite={handleToggleFavorite}
                onDeleteReport={handleDeleteReport}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            )}

            {currentTab === 'admin' && (
              <AdminPanel onBlogAdded={() => fetchReports()} />
            )}
          </main>

          {/* Footer view */}
          <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 print:hidden" id="desktop-desktop-footer">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8" id="footer-index-grid">
              
              <div className="space-y-4" id="footer-pitch">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <strong className="text-white text-sm font-black">AdSense Checker</strong>
                </div>
                <p className="text-3xs sm:text-2xs leading-relaxed max-w-xs text-slate-505">
                  The primary analytical publisher workspace configured dynamically against certified Google guidelines. Identify Low Value rejection flags, missing cookie policies, and index limits easily.
                </p>
              </div>

              <div className="space-y-3 font-semibold text-2xs" id="footer-resources">
                <span className="text-3xs uppercase font-black text-slate-500 tracking-widest block">SaaS Platform Pages</span>
                <div className="flex flex-col space-y-2 text-slate-400" id="saas-anchors">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-white transition-colors text-left">Home</button>
                  <button onClick={() => setCurrentTab('checker')} className="hover:text-white transition-colors text-left">AdSense Checker</button>
                  <button onClick={() => setCurrentTab('pricing')} className="hover:text-white transition-colors text-left">Pricing Page</button>
                </div>
              </div>

              <div className="space-y-3 font-semibold text-2xs" id="footer-blog">
                <span className="text-3xs uppercase font-black text-slate-500 tracking-widest block">Learn Hub</span>
                <div className="flex flex-col space-y-2 text-slate-400" id="learn-anchors">
                  <button onClick={() => setCurrentTab('blog')} className="hover:text-white transition-colors text-left">AdSense Tips</button>
                  <button onClick={() => setCurrentTab('faq')} className="hover:text-white transition-colors text-left">Compliance FAQ</button>
                  <button onClick={() => setCurrentTab('contact')} className="hover:text-white transition-colors text-left">Help Desk</button>
                </div>
              </div>

              <div className="space-y-3 font-semibold text-2xs" id="footer-policies">
                <span className="text-3xs uppercase font-black text-slate-500 tracking-widest block">Boilerplates compliance</span>
                <div className="flex flex-col space-y-2 text-slate-400" id="policy-anchors">
                  <button onClick={() => setCurrentTab('policies')} className="hover:text-white transition-colors text-left">Privacy Policy</button>
                  <button onClick={() => setCurrentTab('policies')} className="hover:text-white transition-colors text-left">Disclaimer</button>
                  <button onClick={() => setCurrentTab('policies')} className="hover:text-white transition-colors text-left">Terms & Conditions</button>
                  <button onClick={() => setCurrentTab('policies')} className="hover:text-white transition-colors text-left">Refund Policy</button>
                </div>
              </div>

            </div>

            <div className="max-w-6xl mx-auto px-4 pt-8 mt-8 border-t border-slate-800 text-center text-3xs text-slate-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" id="footer-copyright-banner">
              <span>© 2026 AdSense Approval Checker Platform. All rights reserved. Built with Google AI Studio.</span>
              <span>Model node: gemini-3.5-flash-live-preview</span>
            </div>
          </footer>
        </>
      )}

    </div>
  );
}
