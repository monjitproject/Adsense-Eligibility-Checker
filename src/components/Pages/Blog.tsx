import React, { useState, useEffect } from 'react';
import { BlogPost, Comment } from '../../types';
import { Search, Calendar, User, Clock, MessageSquare, Send, Tag, BookOpen, ThumbsUp } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Comments state
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commenting, setCommenting] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = ['All', 'AdSense Approval Tips', 'SEO Guides', 'Website Optimization', 'Google Updates', 'Content Marketing'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Failed to load blog parameters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBlog || !commentAuthor.trim() || !commentContent.trim()) return;

    try {
      setCommenting(true);
      const res = await fetch(`/api/blogs/${selectedBlog.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentAuthor, content: commentContent })
      });
      const data = await res.json();
      if (data.success) {
        // Update selected blog comments
        const updatedBlog = { ...selectedBlog, comments: [...selectedBlog.comments, data.comment] };
        setSelectedBlog(updatedBlog);
        // Update main blogs list in-memory too
        setBlogs(blogs.map(b => b.id === selectedBlog.id ? updatedBlog : b));
        setCommentAuthor('');
        setCommentContent('');
      }
    } catch (err) {
      console.error('Failed post comment:', err);
    } finally {
      setCommenting(false);
    }
  };

  const handleSubscribeNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (data.success) {
        setNewsletterSubscribed(true);
        setNewsletterEmail('');
        setTimeout(() => setNewsletterSubscribed(false), 5000);
      }
      alert(data.message);
    } catch (err) {
      console.error('Newsletter error:', err);
    }
  };

  // Filter posts
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8" id="blog-workspace-root">
      {selectedBlog ? (
        /* Full Single Blog Article View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="single-blog-grid">
          <div className="lg:col-span-2 space-y-6" id="single-blog-article-pane">
            <button
              onClick={() => setSelectedBlog(null)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors uppercase"
              id="back-to-archives-control"
            >
              ← Back to Article Archive
            </button>

            <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6" id="selected-article-body">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                {selectedBlog.category}
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {selectedBlog.title}
              </h1>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400" id="article-owner-row">
                <div className="flex items-center space-x-1.5">
                  <User className="w-4 h-4" />
                  <span>{selectedBlog.author}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedBlog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{selectedBlog.readTime}</span>
                </div>
              </div>

              {/* Featured illustrative image */}
              <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden relative" id="article-hero-cover">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Render article body */}
              <div className="prose prose-slate max-w-none text-slate-650 space-y-4" id="article-rich-text">
                {selectedBlog.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={idx} className="text-xl font-bold text-slate-850 pt-3">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={idx} className="text-2xl font-bold text-slate-900 pt-4">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
                        {paragraph.split('\n').map((line, lidx) => (
                          <li key={lidx}>{line.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-500">{paragraph}</p>;
                })}
              </div>

              {/* Tags panel */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100" id="article-tags-tray">
                {selectedBlog.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-2xs font-semibold">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </article>

            {/* Comments block */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6" id="article-comments-block">
              <h3 className="text-lg font-bold text-slate-850 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Article Discussions ({selectedBlog.comments.length})</span>
              </h3>

              {/* Message loop */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2" id="comments-timeline">
                {selectedBlog.comments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No comments filed on this publication yet. Be the first to start the discussion!</p>
                ) : (
                  selectedBlog.comments.map((comm) => (
                    <div key={comm.id} className="p-4 bg-slate-50/70 rounded-xl space-y-1.5" id={`comment-node-${comm.id}`}>
                      <div className="flex justify-between items-center" id="comment-signer">
                        <strong className="text-xs font-bold text-slate-800">{comm.author}</strong>
                        <span className="text-[10px] text-slate-400">{comm.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-normal">{comm.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Comment submission form */}
              <form onSubmit={handleAddComment} className="pt-4 border-t border-slate-100 space-y-3" id="add-comment-form">
                <h4 className="text-xs font-bold text-slate-700">Add Public Comment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="comment-layout-fields">
                  <div className="sm:col-span-1" id="author-label-cell">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 border"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2" id="comment-label-cell">
                    <input
                      type="text"
                      placeholder="Share your thoughts on AdSense approval rules..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 border"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={commenting}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5 self-end ml-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{commenting ? 'Filing Post...' : 'Submit Comment'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Single Blog Sidebar */}
          <div className="space-y-6" id="single-blog-sidebar">
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/20 p-5 rounded-2xl border border-blue-100/30 space-y-4" id="sidebar-author-bio">
              <h4 className="text-sm font-bold text-slate-850">Regulatory Panel Specialism</h4>
              <p className="text-2xs sm:text-xs text-slate-500 leading-relaxed">
                This analysis guide has been compiled by our lead publisher optimization engineer, verifying technical compliance audits under the 2026 AdSense criteria.
              </p>
            </div>

            {/* Related publications */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4" id="sidebar-related-publications">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Other guides</h4>
              <div className="space-y-3.5" id="related-loop">
                {blogs
                  .filter(b => b.id !== selectedBlog.id)
                  .slice(0, 3)
                  .map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => setSelectedBlog(rel)}
                      className="w-full text-left group space-y-1 block"
                    >
                      <span className="text-[10px] text-blue-600 font-bold uppercase block">{rel.category}</span>
                      <h5 className="text-xs font-bold text-slate-850 group-hover:text-blue-600 transition-colors line-clamp-1">{rel.title}</h5>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Blog Index/Search Archive layout */
        <div className="space-y-8 animate-fade-in" id="blog-index-layout">
          {/* Top category tabs */}
          <div className="text-center max-w-xl mx-auto space-y-3" id="blog-intro-header">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Publisher Optimization Hub</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Guides, rules checklist, and standard tutorials directly synchronized with real-world Google AdSense requirements.</p>
          </div>

          {/* Filtering bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 pb-5 items-center" id="blog-filters-row">
            <div className="relative md:col-span-1" id="blog-search-field">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tutorials, keys, and keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs focus:ring-1 focus:ring-blue-500 rounded-xl outline-none border border-slate-150 text-slate-850 font-medium"
              />
            </div>

            {/* Categories filter layout */}
            <div className="flex flex-wrap gap-1.5 md:col-span-2 justify-start md:justify-end" id="blog-categories-scroller">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-2xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'All Guides' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Loop check */}
          {loading ? (
            <div className="py-20 text-center" id="blog-spinner">
              <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xs text-slate-400">Loading blog publications...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16" id="blog-empty-result">
              <p className="text-xs text-slate-400 font-semibold mb-2">No matching reports available</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="px-3 py-1 bg-slate-100 hover:bg-slate-250 text-slate-700 text-2xs font-bold rounded-lg transition-all border">Reset Filter</button>
            </div>
          ) : (
            /* Main Blogs Post Cards grid layout */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="blog-cards-grid">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between h-full"
                  id={`panel-blog-card-${blog.id}`}
                >
                  <div className="space-y-4" id={`blog-card-meta-${blog.id}`}>
                    <div className="h-44 w-full relative overflow-hidden" id={`card-art-${blog.id}`}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-full"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 text-slate-800 rounded-md text-[10px] uppercase font-bold border border-slate-100 shadow-sm">
                        {blog.category}
                      </span>
                    </div>

                    <div className="px-5 space-y-2.5" id={`card-content-${blog.id}`}>
                      <div className="flex items-center space-x-2.5 text-2xs text-slate-400" id={`card-meta-inline-${blog.id}`}>
                        <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> <span>{blog.date}</span></span>
                        <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /> <span>{blog.readTime}</span></span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedBlog(blog)}>
                        {blog.title}
                      </h3>

                      <p className="text-2xs sm:text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-slate-50 flex items-center justify-between" id={`id-footer-${blog.id}`}>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="text-2xs sm:text-xs text-blue-600 hover:text-blue-800 font-semibold tracking-wide uppercase transition-colors"
                    >
                      Read Tutorial & Reviews →
                    </button>
                    <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> {blog.comments.length}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Compliance Newsletter segment */}
          <div className="bg-gradient-to-tr from-blue-650 to-indigo-700 rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6" id="news-footer-banner">
            <div className="space-y-2 max-w-md text-center md:text-left" id="news-banner-pitch">
              <h3 className="text-lg sm:text-2xl font-black">AdSense Policy Compliance Dispatch</h3>
              <p className="text-2xs sm:text-xs text-blue-100 leading-normal">
                Receive instant emails about recent core algorithm updates, critical policy alterations, and high-conversion ad layouts strategy directly in your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribeNewsletter} className="flex bg-white/10 p-1.5 rounded-xl border border-white/20 w-full max-w-md shrink-0 items-center justify-between" id="news-form-footer">
              <input
                type="email"
                placeholder="Enter workspace email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-transparent pl-3 pr-2 py-2 text-xs text-white placeholder-blue-200 outline-none flex-1 border-none font-medium"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-indigo-700 hover:bg-slate-50 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
              >
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
