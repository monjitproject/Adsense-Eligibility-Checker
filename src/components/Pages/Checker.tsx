import React, { useState } from 'react';
import { AnalysisReport, PageRequirement, ContentMetric, SeoMetric, TechnicalMetric } from '../../types';
import RatingMeter from '../RatingMeter';
import { ShieldAlert, CheckCircle2, AlertTriangle, XCircle, FileDown, ArrowLeft, RefreshCw, Send, Check } from 'lucide-react';

interface CheckerProps {
  report: AnalysisReport | null;
  onReset: () => void;
  isLoading: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function Checker({ report, onReset, isLoading, onToggleFavorite }: CheckerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'content' | 'seo' | 'technical'>('overview');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-lg mx-auto" id="checker-loading-root">
        <div className="relative w-16 h-16 mb-6" id="pulse-spinner-box">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Crawler Engine Initialized</h3>
        <p className="text-slate-500 text-xs mt-2 max-w-sm leading-relaxed animate-pulse">
          Simulating Googlebot and AdSense crawlers... evaluating safety protocols, validating legal documents, scanning textual uniqueness and analyzing visual speed thresholds...
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-16 px-4" id="checker-empty-root">
        <XCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-700">No active report loaded</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Please return to the homepage and specify any URL block to initialize analyses.</p>
        <button onClick={onReset} className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-xs rounded-full">Return Home</button>
      </div>
    );
  }

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
      case 'Good':
      case 'Pass':
      case 'Optimal':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'Needs Improvement':
      case 'Warning':
      case 'Optimize':
      case 'Suboptimal':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'Missing':
      case 'Critical':
      case 'Fail':
      case 'Slow':
        return <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />;
    }
  };

  const renderBadgeColor = (status: string) => {
    switch (status) {
      case 'Available':
      case 'Good':
      case 'Pass':
      case 'Optimal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Needs Improvement':
      case 'Warning':
      case 'Optimize':
      case 'Suboptimal':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Missing':
      case 'Critical':
      case 'Fail':
      case 'Slow':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const handlePrint = () => {
    // Elegant system-native printable layout fallback
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6" id="checker-report-root">
      {/* Printable Report Header Block (Only active during print) */}
      <div className="hidden print:block border-b-2 border-blue-650 pb-6 mb-8 text-slate-900" id="print-header-overlay">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black uppercase text-blue-600">AdSense Approval Eligibility Report</h1>
            <p className="text-sm text-slate-500">Domain evaluated: {report.domain}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Overall Score: {report.score}/100</p>
            <p className="text-xs text-slate-400">Date: {new Date(report.analyzedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Action Controls section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 print:hidden" id="report-controls">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors bg-white px-3 py-2 rounded-xl border border-slate-150 shadow-sm w-fit"
          id="back-home-control"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze another URL</span>
        </button>

        <div className="flex items-center space-x-2" id="action-buttons-group">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(report.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                report.isFavorite
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
            >
              ★
            </button>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-blue-200 hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer"
            id="print-download-trigger"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Main Core Checker Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="auditor-grid-body">
        
        {/* Left Column (Score Meter & Priority Checklist) */}
        <div className="space-y-6" id="auditor-gauge-aside">
          <RatingMeter score={report.score} chance={report.approvalChance} />

          {/* Quick Metrics list */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 font-medium" id="quick-domain-card">
            <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">Crawl Meta Specifications</h4>
            <div className="flex justify-between text-xs" id="meta-row-domain">
              <span className="text-slate-400">Target Address</span>
              <span className="text-slate-700 font-mono select-all truncate max-w-44 font-semibold">{report.domain}</span>
            </div>
            <div className="flex justify-between text-xs" id="meta-row-checks">
              <span className="text-slate-400">Analysis Method</span>
              <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">ViteBot v4.1 AI</span>
            </div>
            <div className="flex justify-between text-xs" id="meta-row-date">
              <span className="text-slate-400">Audited Timestamp</span>
              <span className="text-slate-700 font-semibold">{new Date(report.analyzedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column (Advanced Tabular checks structure) */}
        <div className="lg:col-span-2 space-y-6" id="auditor-details-block">
          
          {/* Tab Selection Row */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3 print:hidden" id="report-view-navigation">
            {(['overview', 'pages', 'content', 'seo', 'technical'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                id={`tab-btn-${tab}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab === 'overview' ? 'AI Audit Hub' : `${tab}`}
              </button>
            ))}
          </div>

          {/* Dynamic Render Tab Contents */}
          {activeTab === 'overview' && (
            <div className="space-y-6" id="pane-ai-overview">
              
              {/* Prioritized AI Recommendations */}
              <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/20 p-6 rounded-2xl border border-blue-100/30" id="ai-recommends-box">
                <h3 className="text-base font-bold text-slate-800 mb-1 flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-blue-600" />
                  <span>Prioritized AI Recommendation Checklist</span>
                </h3>
                <p className="text-xs text-slate-500 mb-4">Actionable resolutions suggested by our publisher rules parsing network.</p>

                <div className="space-y-3" id="ai-recommend-list">
                  {report.recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-start bg-white p-4 rounded-xl border border-slate-100/80 shadow-xs" id={`rec-${rec.id}`}>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mr-3 ${
                        rec.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                        rec.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {rec.priority}
                      </span>
                      <div className="flex-1" id={`rec-details-${rec.id}`}>
                        <h4 className="text-xs font-bold text-slate-800">{rec.suggestion}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed"><strong className="text-blue-600">Action:</strong> {rec.actionStep}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Issues Section */}
              <div className="space-y-4" id="issues-board">
                <h3 className="text-base font-bold text-slate-800">Identified Rejection Risk Risks ({report.issues.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="issues-grid">
                  {report.issues.map((issue) => (
                    <div key={issue.id} className="p-5 bg-white rounded-2xl border border-slate-100 space-y-3" id={`issue-${issue.id}`}>
                      <div className="flex justify-between items-start" id="issue-header-row">
                        <span className="text-[10px] font-semibold tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase border">
                          Category: {issue.category}
                        </span>
                        <span className={`text-[10px] font-black tracking-wide uppercase px-2 py-0.5 rounded ${
                          issue.severity === 'High' ? 'text-rose-600 bg-rose-50' :
                          issue.severity === 'Medium' ? 'text-amber-600 bg-amber-50' :
                          'text-blue-600 bg-blue-50'
                        }`}>
                          {issue.severity} severity
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">{issue.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed"><strong className="text-slate-600">Crawler Impact:</strong> {issue.impact}</p>
                      <div className="pt-2 border-t border-slate-50 text-xs text-slate-650" id={`issue-action-${issue.id}`}>
                        <span className="font-semibold text-blue-600">Solution: </span>
                        {issue.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5" id="pane-compliance-pages">
              <div>
                <h3 className="text-base font-bold text-slate-800">Essential Policy Page Requirements</h3>
                <p className="text-xs text-slate-500 mt-1">
                  AdSense automated scrapers checks the root directory and main links to verify standard transparency disclosures. Let's inspect yours.
                </p>
              </div>

              <div className="divide-y divide-slate-100" id="compliance-checklist">
                {report.pagesCheck.map((p) => (
                  <div key={p.id} className="py-4 flex items-start space-x-4 justify-between" id={`page-check-${p.id}`}>
                    <div className="flex items-start space-x-3.5" id={`page-meta-${p.id}`}>
                      <div className="mt-0.5">{renderStatusIcon(p.status)}</div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">{p.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-md">{p.details}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${renderBadgeColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5" id="pane-content-checks">
              <div>
                <h3 className="text-base font-bold text-slate-800">Content Quality & Volume Evaluation</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Evaluates text uniqueness, thin text thresholds, keyword density, and indicators that identify auto-spun low-reputation templates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="content-metrics-grid">
                {report.contentQuality.map((c) => (
                  <div key={c.id} className="p-4 border border-slate-100 rounded-xl space-y-2.5 bg-slate-50/40" id={`metric-${c.id}`}>
                    <div className="flex justify-between items-center" id={`metric-header-${c.id}`}>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{c.metric}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border ${renderBadgeColor(c.status)}`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-2" id={`metric-score-row-${c.id}`}>
                      <span className="text-lg font-black text-slate-800">{c.value}</span>
                      <span className="text-2xs text-slate-400 font-medium">(AI Rating: {c.score}/100)</span>
                    </div>

                    <p className="text-2xs text-slate-500 leading-normal">{c.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5" id="pane-seo-checks">
              <div>
                <h3 className="text-base font-bold text-slate-800">SEO Structuring Parameters</h3>
                <p className="text-xs text-slate-500 mt-0.5">Scrapes heading indices, robots, search snippets alignment, and metadata patterns.</p>
              </div>

              <div className="space-y-4" id="seo-scorecard">
                {report.seoCheck.map((s) => (
                  <div key={s.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-55 rounded-xl gap-3 text-xs" id={`seo-${s.id}`}>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{s.name}</h4>
                      <p className="text-slate-500 mt-1">{s.details}</p>
                    </div>

                    <div className="flex items-center space-x-4 self-end sm:self-center" id={`seo-score-badge-${s.id}`}>
                      <span className="font-medium text-slate-500 font-mono">Value: <strong className="text-slate-850">{s.value}</strong></span>
                      <span className={`px-2.5 py-1 rounded-full text-2xs font-bold border ${renderBadgeColor(s.status)}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5" id="pane-technical-checks">
              <div>
                <h3 className="text-base font-bold text-slate-800">Technical Website Performance</h3>
                <p className="text-xs text-slate-500 mt-0.5">Measures loading response speed, HTTPS SSL parameters and dynamic smartphone layouts capability.</p>
              </div>

              <div className="space-y-4" id="technical-metrics-deck">
                {report.technicalCheck.map((t) => (
                  <div key={t.id} className="p-4 border border-slate-100 rounded-xl space-y-3" id={`tech-${t.id}`}>
                    <div className="flex justify-between items-center" id="tech-headline-row">
                      <h4 className="font-bold text-slate-800 text-xs tracking-wider uppercase">{t.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${renderBadgeColor(t.status)}`}>
                        {t.status}
                      </span>
                    </div>

                    {/* Simple progress metric simulation */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden" id={`tech-bar-${t.id}`}>
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${t.score}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400" id="tech-footer-row">
                      <span>{t.details}</span>
                      <span className="font-mono font-bold text-slate-700">{t.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
