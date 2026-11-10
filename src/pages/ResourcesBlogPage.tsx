import React, { useState } from 'react';
import { BookOpen, Download, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const ResourcesBlogPage: React.FC = () => {
  const [downloadModalItem, setDownloadModalItem] = useState<string | null>(null);

  const articles = [
    {
      id: 'art-1',
      title: 'The Anti-Slop Design Constitution: Typography, Zero-Pill Discipline & Visual Hierarchy',
      category: 'Design Systems',
      readTime: '6 min read',
      date: 'March 2026',
      summary: 'Why generic AI interfaces all look identical, and how strict zero-pill metadata, single-elevation depth, and intentional type scales restore human taste.',
      downloadTitle: 'Belvo Visual Design Constitution (PDF)'
    },
    {
      id: 'art-2',
      title: 'Structuring Meta CBO Campaigns for Predictable Contribution Margin',
      category: 'Growth & Ads',
      readTime: '8 min read',
      date: 'February 2026',
      summary: 'Moving beyond vanity ROAS metrics to calculate CAC-to-LTV ratios, Creative Sandbox naming taxonomy, and server-side Conversions API integration.',
      downloadTitle: 'Ad Spend Unit Economics Spreadsheet (XLSX)'
    },
    {
      id: 'art-3',
      title: 'Production AI Pipelines: Enforcing Structured JSON Output Without Runtime Exceptions',
      category: 'AI & Automation',
      readTime: '7 min read',
      date: 'February 2026',
      summary: 'How to combine webhooks, n8n, and Gemini SDK schema enforcement so AI responses never corrupt database rows or downstream CRM syncs.',
      downloadTitle: 'n8n Production Workflow Blueprints (.json)'
    },
    {
      id: 'art-4',
      title: 'The 5 SQL Window Functions Every Product Analyst Must Master',
      category: 'Data Analytics',
      readTime: '5 min read',
      date: 'January 2026',
      summary: 'Practical queries utilizing ROW_NUMBER, LAG, LEAD, and NTILE to measure 30-day user cohort retention and churn acceleration.',
      downloadTitle: 'SQL Cohort Retention Query Pack (.sql)'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#760D3B]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Resources & Technical Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Open-source blueprints, agency engineering standards, and practical frameworks authored by Belvo directors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#C2185B]">{art.category}</span>
                <span>·</span>
                <span>{art.date}</span>
                <span>·</span>
                <span>{art.readTime}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {art.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setDownloadModalItem(art.downloadTitle)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C2185B] hover:text-[#760D3B] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Asset</span>
              </button>

              <button
                onClick={() => navigateTo('/courses')}
                className="text-xs font-semibold text-slate-900 hover:text-[#C2185B] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Related Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Download Confirmation Toast/Modal */}
      {downloadModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center space-y-3 shadow-xl border border-[#F0D6E3]">
            <CheckCircle2 className="w-10 h-10 text-[#C2185B] mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">Resource Download Initiated</h3>
            <p className="text-xs text-slate-500 font-mono">{downloadModalItem}</p>
            <p className="text-[11px] text-slate-400">
              The framework file has been packed for your learning workflow.
            </p>
            <button
              onClick={() => setDownloadModalItem(null)}
              className="mt-2 w-full py-2 bg-[#C2185B] hover:bg-[#760D3B] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md shadow-[#C2185B]/20"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
