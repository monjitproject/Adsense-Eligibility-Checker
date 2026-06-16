import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setSuccessMsg(''), 6000);
      }
    } catch (err) {
      console.error('Failed contact request dispatch:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12" id="contact-workspace">
      
      {/* Header section */}
      <div className="text-center max-w-lg mx-auto space-y-3" id="contact-header">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Publisher Help Desk</h2>
        <p className="text-slate-500 text-xs sm:text-sm">
          Having trouble with structural page checking, or need priority premium auditing advice? Drop our developers a ticket.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start" id="contact-panel-grid">
        
        {/* Info panel */}
        <div className="space-y-6 md:col-span-1" id="support-info-deck">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4" id="card-email">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Direct Support Email</h4>
              <p className="text-2xs text-slate-400 mt-0.5">Average response: 4 hours</p>
              <a href="mailto:support@adsensechecker.com" className="text-xs font-semibold text-blue-600 hover:underline mt-2 inline-block">
                support@adsensechecker.com
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4" id="card-live-hours">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Operating Hours</h4>
              <p className="text-2xs text-slate-400 mt-0.5">Standard monitoring timeline</p>
              <p className="text-xs text-slate-600 font-medium mt-2">Monday – Friday: 9 AM to 6 PM UTC</p>
            </div>
          </div>
        </div>

        {/* Core Submission Form panel */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm md:col-span-2" id="contact-form-pane">
          <h3 className="text-lg font-bold text-slate-850 mb-6">Open Support Ticket</h3>

          {successMsg ? (
            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold animate-fade-in mb-4" id="success-banner">
              ✓ {successMsg}
            </div>
          ) : null}

          <form onSubmit={handleSendMessage} className="space-y-4" id="support-ticket-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" id="ticket-meta-fields">
              <div className="space-y-1.5" id="field-parent-name">
                <label className="font-bold text-slate-650">Your name</label>
                <input
                  type="text"
                  placeholder="e.g. Richard Hendricks"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 focus:ring-1 focus:ring-blue-500 rounded-xl border text-slate-800 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5" id="field-parent-email">
                <label className="font-bold text-slate-650">Email address</label>
                <input
                  type="email"
                  placeholder="e.g. richard@piedpiper.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 focus:ring-1 focus:ring-blue-500 rounded-xl border text-slate-800 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs" id="field-parent-subject">
              <label className="font-bold text-slate-650">Ticket Subject (Optional)</label>
              <input
                type="text"
                placeholder="e.g. My site returns 404 in GDPR checker"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 focus:ring-1 focus:ring-blue-500 rounded-xl border text-slate-800 outline-none"
              />
            </div>

            <div className="space-y-1.5 text-xs" id="field-parent-message">
              <label className="font-bold text-slate-650">Detailed Message Description</label>
              <textarea
                placeholder="Describe your query, including specific URLs or rejection codes..."
                value={message}
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 focus:ring-1 focus:ring-blue-500 rounded-xl border text-slate-800 outline-none resize-none leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-200 transition-all flex items-center space-x-2 disabled:opacity-75 cursor-pointer ml-auto"
              id="send-ticket-btn"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Dispatching Ticket...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Ticket</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
