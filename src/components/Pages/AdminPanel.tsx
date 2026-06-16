import React, { useState, useEffect } from 'react';
import { Settings, Users, FileText, Landmark, ShieldCheck, Mail, Send, Activity, Trash2, Plus, HelpCircle } from 'lucide-react';
import { BlogPost, ContactSubmission } from '../../types';

interface AdminPanelProps {
  onBlogAdded?: () => void;
}

export default function AdminPanel({ onBlogAdded }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'blogs' | 'contacts' | 'settings'>('overview');
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // New Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogCategory, setBlogCategory] = useState('AdSense Approval Tips');
  const [blogContent, setBlogContent] = useState('');
  const [blogTags, setBlogTags] = useState('Google AdSense, Monetization, Advice');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800');
  const [blogAuthor, setBlogAuthor] = useState('Platform Admin');
  const [postingBlog, setPostingBlog] = useState(false);

  useEffect(() => {
    fetchStats();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to retrieve admin parameters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) {
      alert("Title and content content are required.");
      return;
    }

    try {
      setPostingBlog(true);
      const formattedTags = blogTags.split(',').map(t => t.trim());
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: blogTitle,
          excerpt: blogExcerpt,
          content: blogContent,
          category: blogCategory,
          tags: formattedTags,
          image: blogImage,
          author: blogAuthor
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Blog Post Created and Published instantly to the platform!");
        setBlogTitle('');
        setBlogExcerpt('');
        setBlogContent('');
        setBlogTags('Google AdSense, Monetization, Advice');
        if (onBlogAdded) onBlogAdded();
      }
    } catch (err) {
      console.error('Failed blog dispatch:', err);
    } finally {
      setPostingBlog(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in" id="admin-workspace-root">
      
      {/* Upper pitch */}
      <div id="admin-header">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <Settings className="w-8 h-8 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>System Admin Command Desk</span>
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">Platform monitor, blog writing editor, subscription analysis ledger, and contact ticketing logs.</p>
      </div>

      {/* Grid structure tabs navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3" id="admin-tabs">
        {(['overview', 'blogs', 'contacts', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            id={`admin-btn-${tab}`}
            className={`px-4 py-2 text-xs font-black capitalize rounded-xl transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {tab === 'overview' ? 'Network Telemetry' : tab === 'blogs' ? 'Compose News/Blog' : tab === 'contacts' ? 'Support Inbox' : 'App Configuration'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center" id="admin-spinner">
          <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-slate-400">Loading admin operations...</p>
        </div>
      ) : (
        /* Render active sub panels layout */
        <div id="admin-interactive-deck">
          {activeTab === 'overview' && stats && (
            <div className="space-y-6" id="telemetry-dashboard">
              
              {/* Cards grid block */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" id="telemetry-cards">
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Scanned Sites</span>
                  <span className="text-3xl font-extrabold text-slate-800">{stats.totalReports}</span>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Average Score</span>
                  <span className="text-3xl font-extrabold text-slate-800">{stats.averageScore}%</span>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Readiness Rate</span>
                  <span className="text-3xl font-extrabold text-slate-800">{stats.passRatePercent}%</span>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">News Subscribers</span>
                  <span className="text-3xl font-extrabold text-slate-800">{stats.newsletterUsersCount}</span>
                </div>
              </div>

              {/* Server health indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="telemetry-grid-details">
                <div className="p-5 bg-white rounded-2xl border border-slate-100 space-y-4" id="live-servers">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Real-time Host Health Metrics</span>
                  </h4>

                  <div className="space-y-3.5 text-xs font-semibold" id="sys-metrics-rows">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Node API Host Status</span>
                      <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">Operational</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gemini Parsing Queue</span>
                      <span className="text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">Healthy</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-400">SSL Ledger Cryptography</span>
                      <span className="text-slate-804">256-bit TLS (Vercel Core Routing)</span>
                    </div>
                  </div>
                </div>

                {/* Newsletter subscribers panel */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 space-y-4" id="subscribers-ledger">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center space-x-1.5">
                    <Mail className="w-4 h-4 text-blue-605 shrink-0" />
                    <span>Compliance Subscribers list ({stats.newsletterUsersCount})</span>
                  </h4>
                  <div className="max-h-36 overflow-y-auto pr-2 space-y-2 text-2xs font-bold text-slate-650" id="subscribers-timeline">
                    {stats.newsletterUsers.map((em: string, idx: number) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-lg select-all">
                        {em}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6" id="blog-form-wrapper">
              <div id="blog-form-subheader">
                <h3 className="text-base font-bold text-slate-800">Compose New Article Post</h3>
                <p className="text-xs text-slate-500 mt-1">Submit beautiful AdSense approval tutorials, which will immediately render on the platform's public blogs list.</p>
              </div>

              <form onSubmit={handleCreateBlog} className="space-y-4" id="compose-blog-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" id="blog-meta-fields">
                  <div className="space-y-1.5" id="field-blog-title">
                    <label className="font-bold text-slate-650">Article Title</label>
                    <input
                      type="text"
                      placeholder="e.g. escaping the Googlebot rejection trap"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5" id="field-blog-category">
                    <label className="font-bold text-slate-650">Category Type</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none"
                    >
                      <option value="AdSense Approval Tips">AdSense Approval Tips</option>
                      <option value="SEO Guides">SEO Guides</option>
                      <option value="Website Optimization">Website Optimization</option>
                      <option value="Google Updates">Google Updates</option>
                      <option value="Content Marketing">Content Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs" id="blog-submeta-fields">
                  <div className="space-y-1.5" id="field-blog-author">
                    <label className="font-bold text-slate-650">Author Name</label>
                    <input
                      type="text"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2" id="field-blog-tags">
                    <label className="font-bold text-slate-650">Comma-separated tags</label>
                    <input
                      type="text"
                      placeholder="AdSense, compliance, SEO tips"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs" id="field-blog-excerpt">
                  <label className="font-bold text-slate-650">Featured Sub-header snippet</label>
                  <input
                    type="text"
                    placeholder="Short summary displayed in card indices grids..."
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1.5 text-xs" id="field-blog-image">
                  <label className="font-bold text-slate-650">Featured Image URL</label>
                  <input
                    type="text"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none scrollbar-none"
                  />
                </div>

                <div className="space-y-1.5 text-xs" id="field-blog-body">
                  <label className="font-bold text-slate-650">Complete Article Body (Markdown supported)</label>
                  <textarea
                    placeholder="Use standard markdown such as ## Subheadings and bullet lines..."
                    value={blogContent}
                    rows={8}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none resize-none leading-relaxed"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={postingBlog}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 ml-auto cursor-pointer"
                  id="publish-blog-button animate-pulse"
                >
                  <Plus className="w-5 h-5" />
                  <span>{postingBlog ? 'Publishing Post...' : 'Publish Article Now'}</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'contacts' && stats && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6" id="admin-contacts-pane">
              <div id="logs-header">
                <h3 className="text-base font-bold text-slate-800">Support Mailbox Submissions ({stats.contactSubmissions})</h3>
                <p className="text-xs text-slate-400 mt-1">Review active support queries or pending compliance questions filed on the platform.</p>
              </div>

              <div className="space-y-4" id="contacts-index-timeline">
                {stats.contactSubmissions === 0 ? (
                  <p className="text-xs text-slate-400 italic py-6 text-center">No passive help-desk inquiries filed during this lifecycle yet.</p>
                ) : (
                  stats.contactItems.map((item: ContactSubmission) => (
                    <div key={item.id} className="p-4 bg-slate-50/75 rounded-xl text-xs space-y-2 border" id={`contact-node-${item.id}`}>
                      <div className="flex justify-between items-center" id="comment-head">
                        <strong className="text-slate-850 text-sm font-bold">{item.name} ({item.email})</strong>
                        <span className="text-[10px] text-slate-400">{new Date(item.date).toLocaleString()}</span>
                      </div>
                      <p className="font-extrabold text-blue-600">Subject: {item.subject}</p>
                      <p className="text-slate-500 leading-normal bg-white p-3.5 rounded-lg border">{item.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5" id="settings-pane-form">
              <div>
                <h3 className="text-base font-bold text-slate-800">Platform Deployment Variables</h3>
                <p className="text-xs text-slate-405 mt-1">Operational variables governing client response timers, caching patterns, and scanning API modules.</p>
              </div>

              <div className="space-y-4 text-xs font-semibold text-slate-650" id="settings-layout-cards">
                <div className="p-4 border rounded-xl flex justify-between items-center bg-slate-50/40">
                  <div>
                    <h4 className="text-slate-800 font-bold">API Crawler Simulation</h4>
                    <p className="text-[10px] text-slate-450 mt-0.5">Mock and dynamic client responses thresholds.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-105 rounded-full text-[10px] font-bold">Active</span>
                </div>

                <div className="p-4 border rounded-xl flex justify-between items-center bg-slate-50/40">
                  <div>
                    <h4 className="text-slate-800 font-bold">Gemini-3.5-flash Grounding AI</h4>
                    <p className="text-[10px] text-slate-455 mt-0.5">Governing engine parameters.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-105 rounded-full text-[10px] font-bold">Lazy Initialized</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
