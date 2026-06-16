import React, { useState } from 'react';
import { Check, ShieldCheck, CreditCard, Lock, Award, HeartHandshake } from 'lucide-react';
import { SubscriptionPlan, User } from '../../types';

interface PricingProps {
  currentUser: User;
  onUpdateUser: (updated: User) => void;
}

export default function Pricing({ currentUser, onUpdateUser }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutPlan, setCheckoutPlan] = useState<SubscriptionPlan | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  
  // Simulated Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('339');
  const [processing, setProcessing] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free Starter Pack',
      price: '$0',
      period: 'lifetime',
      scansLimit: '5 Scans Daily',
      features: [
        '5 automated scans daily',
        'Basic AdSense Score rating',
        'Legal disclosure requirements checklist',
        'Standard layout responsive check',
        'Community blog content access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Auditor Pro',
      price: billingPeriod === 'monthly' ? '$19' : '$12',
      period: billingPeriod === 'monthly' ? 'month' : 'month, billed annually',
      scansLimit: 'Unlimited scans',
      features: [
        'Unlimited full website scanning checks',
        'Deep machine learning compliance audit',
        'Prioritized AI recommendations checklist',
        'Authentic content length & uniqueness analysis',
        'Prioritized critical issues debug tips',
        'Print-ready PDF report downloads',
        'Priority technical developer support (24h)'
      ]
    }
  ];

  const handleOpenCheckout = (plan: SubscriptionPlan) => {
    if (plan.id === 'free') {
      alert("You are already utilizing our standard Free starter tier plan.");
      return;
    }
    setCheckoutPlan(plan);
    setShowCheckoutModal(true);
  };

  const handleProcessupgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowCheckoutModal(false);
      // Upgrade user
      const upgraded: User = {
        ...currentUser,
        plan: 'premium',
        maxScans: 99999
      };
      onUpdateUser(upgraded);
      alert("Subscription Activated successfully! You are now upgraded to Premium Auditor Pro.");
    }, 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12" id="pricing-page-root">
      {/* Top pitch */}
      <div className="text-center max-w-xl mx-auto space-y-4" id="pricing-intro">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Simple, Growth-Focused Pricing</h2>
        <p className="text-slate-500 text-xs sm:text-sm">
          Select standard entry level scanning checks or unlock unrestricted, deep analysis logs to quickly solve low value rejection flags.
        </p>

        {/* Period selection */}
        <div className="inline-flex bg-slate-100 p-1 rounded-xl" id="period-tabs">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-1.5 rounded-lg text-2xs font-bold transition-all ${
              billingPeriod === 'monthly' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-505'
            }`}
          >
            Billed Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-1.5 rounded-lg text-2xs font-bold transition-all ${
              billingPeriod === 'yearly' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-505'
            }`}
          >
            Billed Annually <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-bold ml-1">Save 35%</span>
          </button>
        </div>
      </div>

      {/* Main cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch" id="pricing-cards-wrapper">
        {plans.map((p) => {
          const IsPremium = p.id === 'premium';
          const IsActivePlan = currentUser.plan === p.id;

          return (
            <div
              key={p.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative border ${
                IsPremium
                  ? 'border-blue-350 shadow-lg shadow-blue-50/50'
                  : 'border-slate-150'
              }`}
              id={`pricing-card-${p.id}`}
            >
              {IsPremium && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full font-bold shadow-md">
                  Most Popular
                </span>
              )}

              <div className="space-y-6" id={`pricing-meta-${p.id}`}>
                <div id="plan-headline">
                  <h3 className="text-lg font-bold text-slate-800">{p.name}</h3>
                  <p className="text-2xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{p.scansLimit}</p>
                </div>

                <div className="flex items-baseline space-x-1.5" id="plan-pricing-rows">
                  <span className="text-4xl font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-xs text-slate-400">/ {p.period}</span>
                </div>

                {/* Features loop */}
                <ul className="space-y-3 pt-4 border-t border-slate-50" id="plan-features-list">
                  {p.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start text-xs text-slate-605" id={`feat-line-${fidx}`}>
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mr-2.5 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action upgrade block */}
              <div className="pt-8" id="plan-checkout-button-parent">
                <button
                  type="button"
                  onClick={() => handleOpenCheckout(p)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-extrabold tracking-wide transition-all ${
                    IsActivePlan
                      ? 'bg-slate-100 text-slate-500 cursor-default font-semibold'
                      : IsPremium
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-105'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border'
                  }`}
                >
                  {IsActivePlan ? 'Active Plan' : IsPremium ? 'Upgrade to Pro' : 'Utilize Starter'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust symbols list */}
      <div className="bg-slate-50/50 rounded-2xl p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-6 text-center text-slate-500 text-2xs" id="pricing-trust-panel">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-slate-700">14-Day Money Back Guarantee</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <Lock className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-700">256-Bit SSL Encrypted Ledger</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <HeartHandshake className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-slate-700">Priority Developer Support</span>
        </div>
      </div>

      {/* Dynamic Checkout Form Modal Simulation */}
      {showCheckoutModal && checkoutPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 print:hidden animate-fade-in" id="checkout-modal">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border shadow-2xl relative space-y-6" id="checkout-form-card">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 text-base font-bold"
              id="close-checkout"
            >
              ✕
            </button>

            <div className="text-center" id="checkout-modal-header">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full w-fit mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Secure Payment Processing</h3>
              <p className="text-xs text-slate-400 mt-0.5">Checkout model powered by Stripe / Razorpay API Integration</p>
            </div>

            {/* Plan breakdown invoice row */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs" id="checkout-invoice">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Subscription Setup</span>
                <span className="text-slate-800 font-bold">{checkoutPlan.name}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Billing frequency</span>
                <span className="text-slate-800 uppercase font-bold">{billingPeriod === 'monthly' ? 'monthly' : 'annual'}</span>
              </div>
              <div className="border-t border-slate-200/80 pt-2 flex justify-between font-black text-slate-900">
                <span>Total amount</span>
                <span>{billingPeriod === 'monthly' ? '$19.00' : '$144.00'}</span>
              </div>
            </div>

            {/* Simulated interactive Card inputs form */}
            <form onSubmit={handleProcessupgrade} className="space-y-4" id="checkout-inputs-form">
              <div className="space-y-1.5 text-xs" id="field-parent-card">
                <label className="font-bold text-slate-650 flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Interactive Test Credit Card Number</span>
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 focus:ring-1 focus:ring-blue-500 text-slate-800 outline-none rounded-xl border text-xs font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs" id="fields-subgrid-card">
                <div className="space-y-1.5" id="field-parent-expiry">
                  <label className="font-bold text-slate-600">Expiration date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 text-slate-850 outline-none rounded-xl border text-xs font-mono"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-1.5" id="field-parent-cvc">
                  <label className="font-bold text-slate-600">CVC Code</label>
                  <input
                    type="password"
                    maxLength={3}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 text-slate-850 outline-none rounded-xl border text-xs font-mono"
                    placeholder="CVC"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 bg-blue-605 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-1.5 disabled:opacity-75 cursor-pointer"
                id="submit-payment-charge"
              >
                {processing ? (
                  <>
                    <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Processing Payment Charge...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize Secure Payment</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                By authorising, you execute payment processing protocols. Transaction is secure & PCI-DSS compliant.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
