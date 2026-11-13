import React from 'react';
import { navigateTo } from '../utils/navigation';
import { Compass, ShieldCheck, Code2, ArrowRight } from 'lucide-react';
import { BRAND_ASSETS } from '../utils/brand';

export const AboutHridayamPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      <div className="border-b border-[#F0D6E3] pb-8 space-y-4">
        <div className="inline-block p-4 bg-gradient-to-br from-white to-[#FFF5F9] rounded-2xl border border-[#F0D6E3] shadow-xs">
          <img
            src={BRAND_ASSETS.logoFull}
            alt="Hridayam by Belvo Logo"
            className="h-24 sm:h-28 w-auto object-contain"
          />
        </div>
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#C2185B] font-bold block mb-1">
            Platform Origins
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#21131B] tracking-tight">
            About Hridayam
          </h1>
        </div>
        <p className="text-base text-[#756572] leading-relaxed">
          Hridayam (from the Sanskrit for "core" or "heart") was founded by Belvo to redefine professional technical and creative training around authentic agency practice.
        </p>
      </div>

      <div className="space-y-6 text-sm text-[#21131B] leading-relaxed">
        <p>
          Too many online platforms sell outdated tutorial videos that produce students capable of following recipe steps, but unprepared for the messy complexity of production engineering, client ad budgets, or scalable design systems.
        </p>
        <p>
          Hridayam operates on an uncompromising mandate: <strong>every curriculum must reflect current production realities</strong>. Our modules are written and audited directly by practitioners executing commercial client work at Belvo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-5 bg-white border border-[#F0D6E3] rounded-2xl space-y-2 shadow-xs hover:border-[#C2185B]/40 transition-colors">
            <Code2 className="w-5 h-5 text-[#C2185B]" />
            <h4 className="font-bold text-[#21131B] text-sm">Practical Code</h4>
            <p className="text-xs text-[#756572]">Real git repositories, REST architectures, and error-handling paradigms.</p>
          </div>
          <div className="p-5 bg-white border border-[#F0D6E3] rounded-2xl space-y-2 shadow-xs hover:border-[#C2185B]/40 transition-colors">
            <Compass className="w-5 h-5 text-[#760D3B]" />
            <h4 className="font-bold text-[#21131B] text-sm">Rigorous Standards</h4>
            <p className="text-xs text-[#756572]">Quizzes, capstone project reviews, and verified passing criteria.</p>
          </div>
          <div className="p-5 bg-white border border-[#F0D6E3] rounded-2xl space-y-2 shadow-xs hover:border-[#C2185B]/40 transition-colors">
            <ShieldCheck className="w-5 h-5 text-[#E83E8C]" />
            <h4 className="font-bold text-[#21131B] text-sm">Verifiable Proof</h4>
            <p className="text-xs text-[#756572]">Cryptographically verifiable certificates hosted on Belvo registry.</p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[#F0D6E3] flex items-center justify-between">
        <span className="text-xs text-[#756572]">Ready to develop real capabilities?</span>
        <button
          onClick={() => navigateTo('/courses')}
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Explore All Curriculums</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const AboutBelvoPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      <div className="border-b border-[#F0D6E3] pb-8 space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[#C2185B] font-bold">
          Parent Organization
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#21131B] tracking-tight">
          About Belvo
        </h1>
        <p className="text-base text-[#756572] leading-relaxed">
          Belvo is a digital engineering, design, and growth consultancy partnering with startups and established enterprises across India, Southeast Asia, and North America.
        </p>
      </div>

      <div className="space-y-6 text-sm text-[#21131B] leading-relaxed">
        <p>
          Belvo builds modern digital products, scalable cloud infrastructures, high-converting performance media engines, and generative AI workflow automations.
        </p>
        <p>
          Hridayam is Belvo’s educational arm: an intentional investment in training the next generation of full-stack software engineers, growth marketers, UX architects, and AI automation practitioners who can enter real project teams from day one.
        </p>

        <div className="bg-[#21131B] text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-[#760D3B]/40 shadow-xl">
          <h3 className="text-lg font-bold text-[#E83E8C]">Belvo Core Competency Pillars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#FCE7F3]/80">
            <div>
              <p className="font-bold text-white mb-1">· Digital Engineering</p>
              <p className="text-[#FCE7F3]/70">Web applications, cloud architecture, APIs, and scalable microservices.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">· Performance Marketing</p>
              <p className="text-[#FCE7F3]/70">Paid customer acquisition, retention funnels, and conversion rate optimization.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">· Design Systems</p>
              <p className="text-[#FCE7F3]/70">Enterprise Figma token architecture and responsive product design.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">· AI & Process Automation</p>
              <p className="text-[#FCE7F3]/70">Workflow automation, agentic pipelines, and LLM integrations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
