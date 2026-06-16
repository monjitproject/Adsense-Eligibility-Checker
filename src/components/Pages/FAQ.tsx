import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Info } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>('faq_1');

  const faqItems: FaqItem[] = [
    {
      id: 'faq_1',
      question: 'What is Google AdSense and how are website eligibility scores calculated?',
      answer: 'Google AdSense is a publisher monetization network that serves contextual ads inside blogs and tools. Eligibility scores are calculated by checking core technical metrics required by Google: SSL configurations, mobile viewport stability, presence of standard policy pages (Privacy, About Us, Cookies), and high content-to-code ratios that prove authentic, human-made text authority.'
    },
    {
      id: 'faq_2',
      question: "How do I fix the 'Low Value Content' rejection flag on my website?",
      answer: "The 'Low Value Content' error is triggered when the automated crawler determines your site offers minimal unique perspective. To fix this: (1) Expand existing articles to exceed 800 words of original text. (2) Delete unedited AI articles or paraphrased/spun posts. (3) Remove empty or under-developed category and tag sections. (4) Create detailed author cards to establish Subject Matter Expert authority."
    },
    {
      id: 'faq_3',
      question: 'Are Privacy Policy, Cookie Policy, and Terms of Service pages mandatory?',
      answer: 'Yes. Google AdSense strict publisher compliance rules mandate that your platform provides clear documentation of third-party cookie usage, ad-tracking networks, and analytical systems. European and US cookie consent rules (GDPR, CCPA) strictly prohibit serving personalized banners unless explicit disclaimer paths are discoverable by crawlers.'
    },
    {
      id: 'faq_4',
      question: 'What is a good AdSense Eligibility Score to aim for prior to applying?',
      answer: 'We recommend aiming for a score of at least 80/100. Lower scores (below 70) represent a high risk of automatic rejection due to technical latency, broken navigation indexes, or thin text sections. Achieving an 80+ score indicates optimal trust page coverage and robust SEO indexing setups.'
    },
    {
      id: 'faq_5',
      question: 'Does your Eligibility Platform guarantee that Google will approve my blog?',
      answer: 'No. While our platform is modeled directly after Google AdSense publisher requirements, actual approvals are subject to final manual evaluation by Google representatives. Our score offers an accurate machine-learning-assisted blueprint indicating compliance risks before you apply.'
    }
  ];

  const filteredFaqs = faqItems.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8" id="faq-page-root">
      {/* Intro header */}
      <div className="text-center max-w-lg mx-auto space-y-3" id="faq-intro">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Publisher Frequently Asked Questions</h2>
        <p className="text-slate-500 text-xs sm:text-sm">
          Struggling with a specific AdSense rejection message? Read through our curated guides or search the archive.
        </p>
      </div>

      {/* Accordion Search wrapper */}
      <div className="relative max-w-md mx-auto" id="faq-search-wrapper">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search question keywords (e.g., low value)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs rounded-xl focus:ring-1 focus:ring-blue-500 outline-none border border-slate-150 text-slate-800 font-medium"
        />
      </div>

      {/* Accordions loop */}
      <div className="space-y-3" id="faq-accordion-list">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center" id="faq-empty">
            <p className="text-xs text-slate-400 font-semibold">No questions matching your search. Please reach out via our contact page.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const IsOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs"
                id={`faq-row-${faq.id}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(IsOpen ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="font-bold text-slate-800 text-xs sm:text-sm pr-4 flex items-center space-x-2">
                    <HelpCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {IsOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-450 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-450 shrink-0" />
                  )}
                </button>

                {IsOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-505 border-t border-slate-50 leading-relaxed bg-slate-50/20" id={`faq-body-${faq.id}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Warning advisory notice */}
      <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start space-x-3 text-xs" id="faq-warning">
        <Info className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-slate-600 leading-normal">
          <strong className="text-slate-800">Compliance Advisory:</strong> In accordance with Google AdSense terms updated in 2026, websites operating in certain sectors (e.g. YMYL - Your Money Your Life) face deeper manual evaluations. Ensure all medical, financial, or licensing recommendations display explicit credential links.
        </div>
      </div>
    </div>
  );
}
