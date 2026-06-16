import React, { useState } from 'react';
import { Search, ShieldCheck, Zap, HelpCircle, Trophy, BarChart3, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function Home({ onAnalyze, isLoading }: HomeProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const sampleUrLs = [
    { label: 'High Score Tech Blog [Demo]', url: 'mytechblog.com' },
    { label: 'Low Score Plagiarized Crypto [Demo]', url: 'cryptoflashtips.xyz' }
  ];

  return (
    <div className="w-full" id="homepage-root">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24" id="home-hero-section">
        {/* Ambient Gradient Ball backgrounds */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center px-4" id="hero-text-align">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50/80 text-blue-650 border border-blue-100 mb-6" 
            id="hero-mini-tag"
          >
            <ShieldCheck className="w-4.5 h-4.5 mr-1.5 text-blue-600" />
            Verified Google AdSense Guidelines (2026 Policy updates)
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-6 font-sans" 
            id="hero-title"
          >
            Check Your Website's <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-650 bg-clip-text text-transparent">AdSense Approval</span> Eligibility
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-sans" 
            id="hero-subtitle"
          >
            Analyze your domain metrics instantly. Discover low value penalties, missing compliance policies, and receive tailored AI recipes to secure Google approval.
          </motion.p>

          {/* Form container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-2xl mx-auto bg-white p-2.5 sm:p-3 rounded-3xl border border-slate-150 shadow-xl focus-within:shadow-2xl focus-within:border-blue-200 transition-all duration-300" 
            id="search-container"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2.5 sm:space-y-0 sm:space-x-2" id="search-form">
              <div className="relative flex-1" id="input-field-parent">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter website URL (e.g., myblog.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-slate-50/50 text-slate-850 rounded-2xl border-none outline-none focus:bg-slate-50 font-semibold text-xs sm:text-sm tracking-tight transition-all"
                  id="target-url-input"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 text-xs sm:text-sm flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer shrink-0"
                id="analyze-run-btn"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Analyzing Site...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Check Eligibility</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Sample Examples */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:space-x-4 space-y-2 sm:space-y-0 text-xs text-slate-500" 
            id="presets-demo-box"
          >
            <span className="font-semibold text-slate-400">Try Sample Audits:</span>
            <div className="flex flex-wrap gap-2 justify-center" id="presets-links-flex">
              {sampleUrLs.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUrl(sample.url);
                    onAnalyze(sample.url);
                  }}
                  className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full border border-slate-200 hover:bg-blue-50/80 hover:text-blue-600 hover:border-blue-100 transition-all font-bold text-2xs cursor-pointer shadow-xs"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions / Trust Metric block */}
      <section className="py-16 bg-slate-50/50 border-y border-slate-100" id="prop-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center" id="value-blocks-wrapper">
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm" 
              id="prop-card-1"
            >
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mx-auto mb-4">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 tracking-tight font-sans">98% Match Framework</h4>
              <p className="text-xs text-slate-455 mt-2 max-w-xs mx-auto leading-relaxed">
                Audited against official AdSense criteria and European Consent directives.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm" 
              id="prop-card-2"
            >
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mx-auto mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 tracking-tight font-sans">Instant AI Audit</h4>
              <p className="text-xs text-slate-455 mt-2 max-w-xs mx-auto leading-relaxed">
                No complex sitemap parsing. Input the home URL, get prioritized repairs within seconds.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm" 
              id="prop-card-3"
            >
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mx-auto mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 tracking-tight font-sans">Pre-Check Checklist</h4>
              <p className="text-xs text-slate-455 mt-2 max-w-xs mx-auto leading-relaxed">
                Checks content word lengths, legal policies, SSL status, and missing paths automatically.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
