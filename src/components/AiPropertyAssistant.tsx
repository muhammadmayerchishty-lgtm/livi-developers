import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  Maximize2,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { PROPERTIES, Property } from '../data/properties';
import { formatPkr } from '../data/images';
import { SafeImage } from './SafeImage';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  matches?: Property[];
  timestamp: string;
}

export const AiPropertyAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Welcome to LIVI DEVELOPERS. I am your AI Property Concierge. Ask me about luxury villas, penthouses, or plots in Lahore (e.g., "3 bedroom in DHA under 25 crore" or "Villa in Defence Raya").',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Local rule-based parser logic
  const parseQuery = (query: string): { matches: Property[]; explanation: string } => {
    const q = query.toLowerCase();

    // 1. Parse Bedrooms
    let bedrooms: number | null = null;
    const bedMatch = q.match(/(\d+)\s*(?:bed|bedroom|br|bhk)/);
    if (bedMatch) {
      bedrooms = parseInt(bedMatch[1], 10);
    } else if (q.includes('three bed') || q.includes('3 bed')) {
      bedrooms = 3;
    } else if (q.includes('four bed') || q.includes('4 bed')) {
      bedrooms = 4;
    } else if (q.includes('five bed') || q.includes('5 bed')) {
      bedrooms = 5;
    } else if (q.includes('six bed') || q.includes('6 bed')) {
      bedrooms = 6;
    }

    // 2. Parse Budget
    let maxBudget: number | null = null;
    const croreMatch = q.match(/(?:under|below|max|upto|up to|within|budget|around)?\s*(\d+(?:\.\d+)?)\s*(?:crore|cr)/);
    const lakhMatch = q.match(/(?:under|below|max|upto|up to|within|budget)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac)/);

    if (croreMatch) {
      maxBudget = parseFloat(croreMatch[1]) * 10000000;
    } else if (lakhMatch) {
      maxBudget = parseFloat(lakhMatch[1]) * 100000;
    }

    // 3. Parse Area
    let areaKeyword: string | null = null;
    if (q.includes('phase 6') || q.includes('dha 6')) {
      areaKeyword = 'phase 6';
    } else if (q.includes('phase 8') || q.includes('dha 8')) {
      areaKeyword = 'phase 8';
    } else if (q.includes('phase 9') || q.includes('prism')) {
      areaKeyword = 'phase 9';
    } else if (q.includes('raya') || q.includes('golf')) {
      areaKeyword = 'raya';
    } else if (q.includes('gulberg')) {
      areaKeyword = 'gulberg';
    } else if (q.includes('bahria')) {
      areaKeyword = 'bahria';
    } else if (q.includes('johar')) {
      areaKeyword = 'johar';
    } else if (q.includes('dha')) {
      areaKeyword = 'dha';
    }

    // 4. Parse Property Type
    let typeKeyword: string | null = null;
    if (q.includes('villa')) {
      typeKeyword = 'villa';
    } else if (q.includes('penthouse') || q.includes('apartment') || q.includes('flat')) {
      typeKeyword = 'apartment';
    } else if (q.includes('plot') || q.includes('land')) {
      typeKeyword = 'plot';
    } else if (q.includes('house') || q.includes('home')) {
      typeKeyword = 'house';
    }

    // 5. Parse Purpose
    let purposeKeyword: 'buy' | 'rent' | null = null;
    if (q.includes('rent') || q.includes('lease')) {
      purposeKeyword = 'rent';
    } else if (q.includes('buy') || q.includes('purchase')) {
      purposeKeyword = 'buy';
    }

    // Score and filter properties
    const scored = PROPERTIES.map((prop) => {
      let score = 0;

      // Area match
      if (areaKeyword) {
        if (prop.area.toLowerCase().includes(areaKeyword)) score += 3;
      }

      // Type match
      if (typeKeyword) {
        if (prop.type === typeKeyword || (typeKeyword === 'house' && prop.type === 'villa')) {
          score += 3;
        }
      }

      // Bedroom match
      if (bedrooms !== null) {
        if (prop.bedrooms === bedrooms) score += 4;
        else if (Math.abs(prop.bedrooms - bedrooms) === 1) score += 2;
      }

      // Budget match
      if (maxBudget !== null) {
        if (prop.pricePkr <= maxBudget) score += 4;
        else if (prop.pricePkr <= maxBudget * 1.25) score += 1;
      }

      // Purpose match
      if (purposeKeyword) {
        if (prop.purpose === purposeKeyword) score += 2;
      }

      // Keyword mentions (e.g. pool, tennis, view, marble)
      if (q.includes('pool') && prop.features.some((f) => f.toLowerCase().includes('pool'))) score += 2;
      if (q.includes('marble') && prop.features.some((f) => f.toLowerCase().includes('marble'))) score += 1;

      return { prop, score };
    });

    // Filter to positive scores, sort descending
    let matched = scored.filter((item) => item.score > 2).sort((a, b) => b.score - a.score).map((i) => i.prop);

    // If no strong match, return top 2 featured as fallback
    let explanation = '';
    if (matched.length > 0) {
      explanation = `I found ${matched.length} signature listing${matched.length > 1 ? 's' : ''} matching your criteria:`;
    } else {
      matched = PROPERTIES.slice(0, 3);
      explanation = `I couldn't find an exact match for "${query}", but here are the closest curated residences in Lahore:`;
    }

    return { matches: matched, explanation };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const { matches, explanation } = parseQuery(query);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: explanation,
        matches,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 400);
  };

  const samplePrompts = [
    '5 bedroom villa in DHA Phase 6',
    'Penthouse in Gulberg for rent',
    'Villa under 25 crore with pool',
    'Plot in DHA Phase 9 Prism',
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#161C1F] hover:bg-[#1E2529] border border-[#C9A66B]/60 text-[#F2EFE9] rounded-full shadow-2xl transition-all cursor-pointer group"
          aria-label="Open AI Property Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-[#C9A66B]/20 flex items-center justify-center text-[#C9A66B] group-hover:bg-[#C9A66B] group-hover:text-[#0E1214] transition-colors">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="font-syne font-bold text-xs uppercase tracking-wider block">
              AI ASSISTANT
            </span>
            <span className="text-[9px] font-mono text-[#9AA3A8] block">
              Demo assistant · Local match
            </span>
          </div>
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-50 w-[92vw] sm:w-[420px] max-h-[580px] bg-[#161C1F] border border-[#C9A66B]/40 rounded-sm shadow-2xl flex flex-col text-[#F2EFE9] overflow-hidden"
            role="dialog"
            aria-label="AI Property Assistant Chat"
          >
            {/* Header */}
            <div className="p-4 bg-[#12171A] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#C9A66B] text-[#0E1214] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-[#F2EFE9]">
                    LIVI PROPERTY ASSISTANT
                  </h4>
                  <span className="text-[10px] text-[#C9A66B] font-mono block">
                    Demo assistant · Natural query parser
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-[#9AA3A8] hover:text-[#F2EFE9] transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-sm text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#C9A66B] text-[#0E1214] font-medium'
                        : 'bg-[#0E1214] border border-white/10 text-[#F2EFE9]'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>

                  {/* Render Clickable Property Cards if matches exist */}
                  {msg.matches && msg.matches.length > 0 && (
                    <div className="mt-2.5 space-y-2 w-full">
                      {msg.matches.slice(0, 3).map((prop) => (
                        <Link
                          key={prop.id}
                          to={`/properties/${prop.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="p-2.5 bg-[#0E1214] border border-white/10 hover:border-[#C9A66B] rounded-xs flex items-center gap-3 group transition-colors block text-left"
                        >
                          <div className="w-14 h-12 rounded-xs overflow-hidden bg-[#161C1F] shrink-0">
                            <SafeImage
                              src={prop.images[0]}
                              alt={prop.title}
                              width={70}
                              height={60}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-syne font-bold text-xs text-[#F2EFE9] group-hover:text-[#C9A66B] truncate">
                                {prop.title}
                              </span>
                              <span className="text-[10px] font-mono text-[#C9A66B] font-bold shrink-0 ml-1">
                                {formatPkr(prop.pricePkr)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-[#9AA3A8] truncate mt-0.5">
                              <MapPin className="w-2.5 h-2.5 text-[#C9A66B] shrink-0" />
                              <span className="truncate">{prop.area} · {prop.sizeLabel}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#9AA3A8] group-hover:text-[#C9A66B] shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Sample Query Pills */}
            <div className="px-4 py-2 bg-[#12171A] border-t border-white/[0.06] overflow-x-auto flex gap-1.5 no-scrollbar">
              {samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 text-[10px] font-syne uppercase tracking-wider bg-white/5 hover:bg-[#C9A66B]/20 text-[#9AA3A8] hover:text-[#C9A66B] border border-white/10 rounded-xs whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#0E1214] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ask about bedrooms, budget, or area..."
                className="flex-1 bg-transparent text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none px-2 py-1"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2 bg-[#C9A66B] text-[#0E1214] disabled:opacity-40 rounded-xs transition-colors cursor-pointer hover:bg-[#D8B57B]"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
