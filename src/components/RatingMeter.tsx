import React from 'react';
import { ApprovalChance } from '../types';

interface RatingMeterProps {
  score: number;
  chance: ApprovalChance;
  className?: string;
}

export default function RatingMeter({ score, chance, className = '' }: RatingMeterProps) {
  // Determine color matching for the score
  let strokeColor = 'stroke-rose-500';
  let bgColor = 'bg-rose-50/80 text-rose-700 border-rose-200';
  let description = 'Extremely low probability of getting approved. Critical policy or content changes are required.';

  if (score >= 85) {
    strokeColor = 'stroke-emerald-500';
    bgColor = 'bg-emerald-50/80 text-emerald-700 border-emerald-200';
    description = 'Excellent readiness! The website satisfies all Google AdSense publisher rules. Submit with confidence.';
  } else if (score >= 70) {
    strokeColor = 'stroke-blue-500';
    bgColor = 'bg-blue-50/80 text-blue-700 border-blue-200';
    description = 'High readiness indicators. Only minor SEO or technical optimizations remain.';
  } else if (score >= 50) {
    strokeColor = 'stroke-amber-500';
    bgColor = 'bg-amber-50/80 text-amber-700 border-amber-200';
    description = 'Average status. High risk of low value content flags. Needs structural policy changes and more words.';
  }

  // Circular calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm ${className}`} id="rating-meter-container">
      <div className="relative w-40 h-40 flex items-center justify-center" id="radial-gauge-wrapper">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="stroke-slate-100 fill-none"
            strokeWidth="10"
          />
          {/* Active indicator ring */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            className={`fill-none transition-all duration-1000 ease-out ${strokeColor}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Absolute nested text indicators */}
        <div className="absolute flex flex-col items-center justify-center text-center" id="gauge-numbers-nest">
          <span className="text-4xl font-extrabold text-slate-800 tracking-tight" id="active-score-value">
            {score}
          </span>
          <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            Score
          </span>
        </div>
      </div>

      {/* Probability Badge */}
      <div className="mt-4 text-center w-full" id="probability-badge-panel">
        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${bgColor}`} id="gauge-badge-box">
          <span className="w-2 h-2 rounded-full mr-2 bg-current animate-pulse"></span>
          Approval Chance: {chance}
        </div>
        <p className="text-xs text-slate-500 mt-3 max-w-xs leading-relaxed mx-auto italic">
          "{description}"
        </p>
      </div>
    </div>
  );
}
