import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import { AppView } from '../types';
import { FIXED_DEMO_ACCOUNTS } from '../context/AuthContext';

interface FrontPageChatbotProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onNavigate: (view: AppView) => void;
  onRequestCallback: (courseInterest?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const QUICK_PROMPTS = [
  'Courses & INR Fees',
  'Placement Record & CTC',
  'Indian Campuses',
  'Fixed Demo Logins',
  '0% EMI & Scholarships',
];

export const FrontPageChatbot: React.FC<FrontPageChatbotProps> = ({
  isOpen,
  onToggle,
  onNavigate,
  onRequestCallback,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'bot',
      text: 'Namaste! Welcome to Hridayam by Belvo. Ask me about our NSDC-aligned career programs, INR fee structure, Indian campus hubs, placement outcomes, or fixed demo portal logins.',
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateReply = (rawQuery: string): Omit<ChatMessage, 'id' | 'sender'> => {
    const q = rawQuery.toLowerCase();

    if (q.includes('login') || q.includes('demo') || q.includes('password') || q.includes('portal') || q.includes('account')) {
      const credLines = FIXED_DEMO_ACCOUNTS.map(
        (acc) => `• ${acc.roleLabel}: ${acc.email} / ${acc.password}`
      ).join('\n');
      return {
        text: `Here are the authorized fixed demo logins for every Hridayam portal:\n${credLines}`,
        action: {
          label: 'Open Portal Login',
          onClick: () => {
            onNavigate('portal-login');
            onToggle(false);
          },
        },
      };
    }

    if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('emi') || q.includes('scholarship') || q.includes('inr')) {
      return {
        text: 'Program fees range from ₹36,000 to ₹58,000 (inclusive of live labs, capstone projects, NSDC certification & placement support). 0% interest EMI starts from ₹3,200/month with merit scholarships up to 20% for Indian graduates.',
        action: {
          label: 'Explore All Programs & Fees',
          onClick: () => {
            onNavigate('catalogue');
            onToggle(false);
          },
        },
      };
    }

    if (q.includes('placement') || q.includes('package') || q.includes('ctc') || q.includes('job') || q.includes('salary') || q.includes('hire')) {
      return {
        text: 'Over 40,000+ alumni have been placed across 2,000+ Indian & global recruiters including TCS, Infosys, Zoho, Flipkart, Razorpay, Wipro, and Accenture India. Highest CTC reached ₹30 LPA with a 98.4% verified placement record.',
        action: {
          label: 'View Verified Placements',
          onClick: () => {
            onNavigate('placements');
            onToggle(false);
          },
        },
      };
    }

    if (q.includes('campus') || q.includes('center') || q.includes('location') || q.includes('mumbai') || q.includes('pune') || q.includes('thane') || q.includes('bengaluru') || q.includes('india')) {
      return {
        text: 'We operate physical classroom campuses in Thane West (HQ), Andheri West Mumbai, Vashi Navi Mumbai, FC Road Pune, Nagpur, Bengaluru & Hyderabad — plus interactive Live Online cohorts across India.',
        action: {
          label: 'Explore Indian Campuses',
          onClick: () => {
            onNavigate('centers');
            onToggle(false);
          },
        },
      };
    }

    if (q.includes('course') || q.includes('program') || q.includes('data') || q.includes('full stack') || q.includes('ai') || q.includes('cloud') || q.includes('marketing')) {
      return {
        text: 'Our flagship tracks include Master in Data Science & Analytics with AI (6 Months), Full Stack Engineering (MERN/Java/Python), AWS Cloud & DevOps, Digital Marketing with AI, UI/UX Branding, and Cyber Security. All programs welcome both IT and non-IT Indian graduates.',
        action: {
          label: 'Browse Course Catalogue',
          onClick: () => {
            onNavigate('catalogue');
            onToggle(false);
          },
        },
      };
    }

    if (q.includes('call') || q.includes('counsel') || q.includes('talk') || q.includes('contact') || q.includes('phone')) {
      return {
        text: 'Our academic counselors are available Monday–Sunday, 9:30 AM to 8:30 PM IST at +91 89284 66820. You can also book a free 1-on-1 career counseling call right now.',
        action: {
          label: 'Book Free Counseling Call',
          onClick: () => {
            onRequestCallback('Chatbot Career Counseling');
          },
        },
      };
    }

    return {
      text: 'Thank you for asking! I can help you compare Hridayam by Belvo programs, check INR fees & 0% EMI plans, explore our Indian campuses, review placement records, or share the fixed demo logins for Student, Mentor, Recruiter & Admin portals.',
      action: {
        label: 'Speak with an Academic Counselor',
        onClick: () => {
          onRequestCallback('General Admissions Inquiry');
        },
      },
    };
  };

  const sendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    const reply = generateReply(trimmed);
    const botMsg: ChatMessage = {
      id: `b_${Date.now() + 1}`,
      sender: 'bot',
      text: reply.text,
      action: reply.action,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Hridayam Career Advisor Chatbot"
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 crystal-overlay-panel rounded-3xl overflow-hidden flex flex-col max-h-[540px] text-white"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/14 border border-white/28 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-sky-300" />
              </div>
              <div>
                <h3 className="font-display text-sm font-extrabold text-white leading-tight">
                  Hridayam Career Advisor
                </h3>
                <p className="text-[11px] text-sky-200/85">
                  Admissions · Fees · Placements · Demo Portals
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onToggle(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-white text-[#071433] font-bold shadow-xs'
                      : 'bg-white/12 text-[#EAF3FF] border border-white/20 font-medium'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.action && (
                  <button
                    type="button"
                    onClick={msg.action.onClick}
                    className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-400/18 hover:bg-sky-400/30 text-sky-100 border border-sky-300/35 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <span>{msg.action.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompt Bar */}
          <div className="px-4 py-2.5 border-t border-white/12 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/22 text-sky-100 border border-white/20 text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-white/15 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fees, campuses, or demo logins..."
              className="flex-1 px-3.5 py-2.5 rounded-xl landing-input-clear text-xs font-medium"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-white text-[#071433] hover:bg-[#E8F2FF] cursor-pointer shrink-0 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct Counselor Footer */}
          <div className="px-4 py-2.5 bg-[#050E26]/60 border-t border-white/12 flex items-center justify-between text-[11px]">
            <span className="text-sky-200/80 font-medium">Prefer speaking directly?</span>
            <button
              type="button"
              onClick={() => onRequestCallback('Direct Callback from Chatbot')}
              className="text-white font-bold hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Request Callback</span>
            </button>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="crystal-overlay-panel hover:border-white/55 px-4 py-3 rounded-2xl text-white flex items-center gap-2.5 cursor-pointer transition-all"
        aria-label={isOpen ? 'Minimize Career Advisor Chat' : 'Open Career Advisor Chat'}
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 text-sky-300" />
            <span className="text-xs font-bold">Close Advisor</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4 text-sky-300" />
            <span className="text-xs font-bold">Career Advisor</span>
          </>
        )}
      </button>
    </div>
  );
};
