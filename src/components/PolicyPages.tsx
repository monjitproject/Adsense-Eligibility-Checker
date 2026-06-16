import React, { useState } from 'react';
import { Shield, BookOpen, AlertTriangle, FileText, Landmark } from 'lucide-react';

export default function PolicyPages() {
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'cookies' | 'terms' | 'disclaimer' | 'refund'>('privacy');

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      updated: 'June 15, 2026',
      content: `### Privacy Policy for AdSense Approval Checker Platform

We prioritize the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our eligibility checking platform and how we use it.

If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.

#### 1. General Data Protection Regulation (GDPR)
We are a Data Controller of your information. Our legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:
- We need to perform a contract with you
- You have given us permission to do so
- Processing your personal information is in our legitimate interests
- We need to comply with the law

#### 2. Log Files
We follow a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.

#### 3. Google DoubleClick DART Cookie
Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our platform and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – [https://policies.google.com/technologies/ads](https://policies.google.com/technologies/ads)

#### 4. Our Advertising Partners
Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data.`
    },
    cookies: {
      title: 'Cookie Consent Policy',
      icon: BookOpen,
      updated: 'June 15, 2026',
      content: `### Cookie Consent Policy

This Cookie Policy explains how our Platform uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.

#### What are cookies?
Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.

#### Why do we use cookies?
We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Platform to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Platform for advertising, analytics, and other purposes. This includes:
- **Google AdSense Cookies**: Served to tailor commercial advertising campaigns to your age, general geographic location, and organic search patterns.
- **Session Authentication Cookies**: Retained to ensure secure subscription operations and save dashboard state data securely.`
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      updated: 'June 12, 2026',
      content: `### Terms of Service & Conditions

Welcome to AdSense Approval Checker! These terms and conditions outline the rules and regulations for the use of our Platform.

By accessing this website we assume you accept these terms and conditions. Do not continue to use our platform if you do not agree to take all of the terms and conditions stated on this page.

#### 1. Intellectual Property Rights
Other than the content you own, under these Terms, we and/or our licensors own all the intellectual property rights and materials contained in this Platform. You are granted a limited license only for purposes of viewing and running structural analysis scans of URLs you possess.

#### 2. Restrictions
You are specifically restricted from all of the following:
- Publishing any Platform materials in any other commercial media;
- Selling, sublicensing, and/or otherwise commercializing any Platform reports;
- Using this Platform in any way that is or may be damaging to this Platform;
- Using this Platform to scrape proprietary analysis data or conduct DDoS operations.

#### 3. No Warranties
This Platform is provided "as is," with all faults, and we express no representations or warranties, of any kind related to this Platform or the materials contained on this website. Also, nothing contained on this Website shall be interpreted as advising you or guaranteeing Google AdSense acceptance.`
    },
    disclaimer: {
      title: 'General Disclaimer',
      icon: AlertTriangle,
      updated: 'June 16, 2026',
      content: `### Legal Disclaimer for Publishers

The information provided by AdSense Approval Checker ("we," "us," or "our") on our platform is for general informational and educational purposes only.

**DOES NOT GUARANTEE APPROVAL**: Using our eligibility analyzer tools provides a structural, machine-learning-assisted guideline matching standard Google publisher guidelines. Google retains sole, non-negotiable discretion over which websites are admitted into the AdSense program. Using this platform **DOES NOT** guarantee automated or manual approval by Google representatives.

#### Limitation of Liabilities
Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of our site tools or reliance on any recommendations provided herein. Your application of our optimization tips, page injections, and content modifications is done solely at your own risk.`
    },
    refund: {
      title: 'Refund Policy & Guarantees',
      icon: Landmark,
      updated: 'June 10, 2026',
      content: `### Refund Policy

Thank you for choosing our Premium analytical subscriptions! We want to ensure you have a stellar onboarding experience with our digital workspace tools.

#### 14-Day Refund Grace Period
Since we generate immediate AI computation credits via our premium scan protocols, we offer a flexible **14-day money-back guarantee** on premium analytical accounts under the following conditions:
- You have initialized under 15 deep scanner analyses during the active month.
- The request is submitted within 14 calendar days of your payment activation date.

#### Exclusions
No refunds are authorized on renewal invoices if standard notification cancellations were not filed inside the client billing hub prior to the new billing cycle.`
    }
  };

  const activeData = policies[activePolicy];
  const IconComponent = activeData.icon;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6" id="policy-center-root">
      <div className="text-center mb-8" id="policy-header">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Publisher Policy Center</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-lg mx-auto">
          AdSense requires these pages to be present on your blog. Learn what they denote, or copy standard boilerplates for your site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="policy-workspace-grid">
        {/* Navigation Sidebar */}
        <div className="flex flex-col space-y-2 bg-white/70 p-3 rounded-2xl border border-slate-100" id="policy-tabs-nav">
          <p className="text-xs font-semibold text-slate-400 px-3 uppercase tracking-wider mb-2">Available Documents</p>
          {(Object.keys(policies) as Array<keyof typeof policies>).map((key) => {
            const item = policies[key];
            const btnIcon = item.icon;
            const IsActive = activePolicy === key;
            return (
              <button
                key={key}
                id={`policy-btn-${key}`}
                onClick={() => setActivePolicy(key)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                  IsActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {React.createElement(btnIcon, { className: "w-4 h-4 shrink-0" })}
                <span className="truncate">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Panel */}
        <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm" id="policy-content-panel">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-150 pb-5 mb-5 space-y-3 sm:space-y-0 text-slate-800" id="policy-headline-sub">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">{activeData.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Last Updated: {activeData.updated}</p>
              </div>
            </div>

            <button 
              onClick={() => {
                const textarea = document.createElement('textarea');
                textarea.value = activeData.content;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert(`${activeData.title} markdown template copied to clipboard! You can paste this on your blog.`);
              }}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full font-semibold text-xs transition-colors self-start sm:self-center"
              id="copy-policy-template-btn"
            >
              Copy Policy Template
            </button>
          </div>

          <div className="prose prose-sm prose-slate max-w-none text-slate-600 space-y-4" id="policy-markdown-body">
            {activeData.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={index} className="text-lg font-bold text-slate-850 pt-3">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              } else if (paragraph.startsWith('#### ')) {
                return (
                  <h5 key={index} className="text-sm font-semibold text-slate-800 uppercase tracking-wider pt-2">
                    {paragraph.replace('#### ', '')}
                  </h5>
                );
              } else if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1.5 leading-relaxed text-xs">
                    {paragraph.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>{li.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-500">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
