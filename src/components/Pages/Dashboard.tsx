import React, { useState } from 'react';
import { User, AnalysisReport } from '../../types';
import { Star, Trash2, Calendar, FileText, LayoutDashboard, Compass, Lock, LogIn, Key, Compass as CompassIcon, Compass as RegisterIcon } from 'lucide-react';

interface DashboardProps {
  currentUser: User | null;
  savedReports: AnalysisReport[];
  onSelectReport: (report: AnalysisReport) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteReport: (id: string) => void;
  onLogin: (email: string, name: string) => void;
  onLogout: () => void;
}

export default function Dashboard({
  currentUser,
  savedReports,
  onSelectReport,
  onToggleFavorite,
  onDeleteReport,
  onLogin,
  onLogout
}: DashboardProps) {
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authTab === 'login') {
      if (emailInput.trim()) {
        const fallbackName = emailInput.split('@')[0];
        onLogin(emailInput.trim(), fallbackName);
      }
    } else {
      if (emailInput.trim() && nameInput.trim()) {
        onLogin(emailInput.trim(), nameInput.trim());
      }
    }
  };

  // Auth screen if not logged in
  if (!currentUser) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-12 space-y-6" id="auth-root">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6" id="auth-panel">
          <div className="text-center" id="auth-header">
            <h3 className="text-xl font-extrabold text-slate-850">Publisher Core Account</h3>
            <p className="text-xs text-slate-400 mt-1">Access saved reports history and subscribe to premium deep sweeps.</p>
          </div>

          {/* Toggle Tab */}
          <div className="flex bg-slate-100 p-1 rounded-xl" id="auth-tabs-toggle">
            <button
              onClick={() => setAuthTab('login')}
              className={`flex-1 py-2 text-2xs font-extrabold rounded-lg transition-all ${
                authTab === 'login' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthTab('signup')}
              className={`flex-1 py-2 text-2xs font-extrabold rounded-lg transition-all ${
                authTab === 'signup' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4" id="auth-fields-form">
            {authTab === 'signup' && (
              <div className="space-y-1.5 text-xs" id="field-parent-register-name">
                <label className="font-bold text-slate-600">Full publisher name</label>
                <input
                  type="text"
                  placeholder="e.g. Richard Hendricks"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border focus:ring-1 focus:ring-blue-500 rounded-xl outline-none"
                  required
                />
              </div>
            )}

            <div className="space-y-1.5 text-xs" id="field-parent-login-email">
              <label className="font-bold text-slate-600">Secure email address</label>
              <input
                type="email"
                placeholder="e.g. richard@piedpiper.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border focus:ring-1 focus:ring-blue-500 rounded-xl outline-none"
                required
              />
            </div>

            <div className="space-y-1.5 text-xs" id="field-parent-login-password">
              <label className="font-bold text-slate-650">Account passcode</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border focus:ring-1 focus:ring-blue-500 rounded-xl outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              id="auth-submit-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>{authTab === 'login' ? 'Authorized Access' : 'Create Publisher Account'}</span>
            </button>
          </form>

          {/* Dummy quick bypass */}
          <div className="text-center pt-3 border-t border-slate-50" id="bypass-panel">
            <span className="text-[10px] text-slate-400">Want quick access? Enter any email & pass.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fade-in" id="dashboard-logged-root">
      
      {/* Upper greetings */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-slate-100 gap-4" id="dashboard-header-card">
        <div id="greeting-box">
          <h3 className="text-xl font-bold text-slate-850">Welcome Back, {currentUser.name}!</h3>
          <p className="text-xs text-slate-400 mt-1">Publisher Role: <strong className="text-slate-755 capitalize">{currentUser.role}</strong> | Analytics Tier: <strong className="text-blue-600 capitalize">{currentUser.plan}</strong></p>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 border hover:bg-slate-50 text-slate-500 text-2xs font-extrabold rounded-xl transition-colors shrink-0 self-start sm:self-center"
          id="logout-btn"
        >
          Sign Out Account
        </button>
      </div>

      {/* Quota consumption block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="dashboard-meta-grid">
        <div className="bg-gradient-to-br from-blue-50/20 to-indigo-50/10 p-5 rounded-2xl border border-blue-50 space-y-3" id="meta-scans-usage">
          <div className="flex justify-between text-xs font-bold text-slate-650">
            <span>Daily Scan Credits Utilization</span>
            <span>{currentUser.plan === 'premium' ? 'Unrestricted / Unlimited' : `${currentUser.scansUsed} / ${currentUser.maxScans} Scans Used`}</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden" id="usage-bar-parent">
            <div
              className={`h-full rounded-full transition-all duration-700 ${currentUser.plan === 'premium' ? 'bg-gradient-to-r from-emerald-505 to-emerald-600' : 'bg-blue-600'}`}
              style={{ width: currentUser.plan === 'premium' ? '100%' : `${(currentUser.scansUsed / currentUser.maxScans) * 100}%` }}
            ></div>
          </div>

          <p className="text-[10px] text-slate-500 leading-normal">
            {currentUser.plan === 'premium' 
              ? 'Premium Auditor Pro active. Enjoy infinite website checks, full pdf downloads, and deep crawler sweeps.' 
              : 'Utilizing Free Starter account. Upgrade to Pro subscription to get unlimited daily checks.'}
          </p>
        </div>

        {/* Saved analytics counters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-around gap-4 text-center" id="meta-rates-view">
          <div>
            <span className="text-3xl font-extrabold text-slate-850 block">{savedReports.length}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 block">Stored Audits</span>
          </div>
          <div className="h-10 w-px bg-slate-100" />
          <div>
            <span className="text-3xl font-extrabold text-slate-850 block">{savedReports.filter(r => r.isFavorite).length}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 block">Starred Audits</span>
          </div>
        </div>
      </div>

      {/* Stored report indices list */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6" id="saved-reports-container">
        <div id="saved-header">
          <h4 className="text-base font-bold text-slate-800">Your Evaluation History</h4>
          <p className="text-xs text-slate-400 mt-1">Review former criteria audit results or select dynamic download triggers.</p>
        </div>

        <div className="divide-y divide-slate-100" id="saved-reports-grid">
          {savedReports.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-6">No previous websites crawled or audited yet. Head to the AdSense Checker tab to start.</p>
          ) : (
            savedReports.map((rep) => (
              <div key={rep.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-semibold" id={`row-saved-${rep.id}`}>
                
                {/* Meta text info */}
                <div className="flex items-start space-x-3" id={`saved-left-info-${rep.id}`}>
                  <button
                    onClick={() => onToggleFavorite(rep.id)}
                    className="mt-0.5"
                    id={`fav-btn-saved-${rep.id}`}
                  >
                    <Star className={`w-4.5 h-4.5 ${rep.isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-350 hover:text-slate-450'}`} />
                  </button>

                  <div className="space-y-1">
                    <button
                      onClick={() => onSelectReport(rep)}
                      className="text-slate-850 hover:text-blue-600 transition-colors font-bold text-sm text-left block"
                    >
                      {rep.domain}
                    </button>
                    <p className="text-[10px] text-slate-400 flex items-center space-x-2">
                      <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> <span>{new Date(rep.analyzedAt).toLocaleDateString()}</span></span>
                      <span>• Chance: <strong className="text-slate-550 capitalize">{rep.approvalChance}</strong></span>
                    </p>
                  </div>
                </div>

                {/* Score badge & quick commands */}
                <div className="flex items-center space-x-4 self-end sm:self-center" id={`saved-actions-${rep.id}`}>
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold font-mono ${
                    rep.score >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    rep.score >= 60 ? 'bg-blue-50 text-blue-700 border-blue-105' :
                    'bg-rose-50 text-rose-700 border-rose-100'
                  }`}>
                    Score: {rep.score}/100
                  </span>

                  <button
                    onClick={() => onDeleteReport(rep.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    id={`del-btn-${rep.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
