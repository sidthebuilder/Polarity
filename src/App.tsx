/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

type ViewState = 'input' | 'loading' | 'result';

interface CardData {
  title: string;
  content: string;
  icon: string;
}

const CARDS: CardData[] = [
  {
    title: "The Synthesis",
    content: "True resolution lies not in choosing one path, but in finding the third way where both values coexist. What if the conflict is the solution?",
    icon: "✧"
  },
  {
    title: "The Reframe",
    content: "Look at the dilemma from a decade in the future. Does the choice still carry the same weight, or is the tension itself a sign of growth?",
    icon: "◈"
  },
  {
    title: "The Wildcard",
    content: "Abandon the logic of the mind for the intuition of the body. If you could not fail, which path feels lighter in your chest?",
    icon: "✦"
  }
];

export default function App() {
  const [input, setInput] = useState('');
  const [view, setView] = useState<ViewState>('input');
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);

  const handleResolve = () => {
    if (!input.trim()) return;
    setView('loading');
    setTimeout(() => {
      setView('result');
    }, 3000);
  };

  const toggleCard = (index: number) => {
    const newFlipped = [...flippedCards];
    newFlipped[index] = !newFlipped[index];
    setFlippedCards(newFlipped);
  };

  const reset = () => {
    setView('input');
    setInput('');
    setFlippedCards([false, false, false]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'input' && (
          <motion.div
            key="input-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl text-center z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/50"
            >
              <Sparkles size={12} /> Resolve your dilemma
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-light tracking-tight text-white mb-12">
              Polarity
            </h1>

            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What two things are you torn between?"
                className="w-full bg-transparent border-b border-white/20 py-6 text-xl md:text-2xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors text-center"
                onKeyDown={(e) => e.key === 'Enter' && handleResolve()}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent group-focus-within:w-full transition-all duration-700" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResolve}
              className="mt-12 px-10 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide hover:bg-white/90 transition-all flex items-center gap-2 mx-auto"
            >
              Resolve <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}

        {view === 'loading' && (
          <motion.div
            key="loading-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center z-10"
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-white rounded-full animate-pulse-glow" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
              <div className="absolute inset-4 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-white/40 font-light tracking-[0.3em] uppercase text-[10px]"
            >
              Synthesizing paths...
            </motion.p>
          </motion.div>
        )}

        {view === 'result' && (
          <motion.div
            key="result-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-6xl z-10"
          >
            <div className="text-center mb-16">
              <p className="text-white/40 text-sm font-light mb-2">Your dilemma</p>
              <h2 className="text-2xl font-display text-white/90 italic">"{input}"</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {CARDS.map((card, idx) => (
                <div key={idx} className="perspective-1000 h-[450px] w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      rotateY: flippedCards[idx] ? 180 : 0 
                    }}
                    transition={{ 
                      opacity: { delay: idx * 0.15 },
                      y: { delay: idx * 0.15 },
                      rotateY: { duration: 0.7, ease: "easeInOut" }
                    }}
                    className="relative w-full h-full preserve-3d cursor-pointer"
                    onClick={() => toggleCard(idx)}
                  >
                    {/* Front of Card (Face Down) */}
                    <div className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center p-8 backface-hidden hover:border-white/30 hover:-translate-y-1 transition-all duration-500 group">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors">
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                      </div>
                      <p className="text-white/20 font-light tracking-[0.4em] uppercase text-[9px]">Polarity</p>
                      <div className="absolute inset-4 border border-white/5 rounded-xl pointer-events-none" />
                    </div>

                    {/* Back of Card (Face Up) */}
                    <div className="absolute inset-0 glass rounded-2xl p-8 backface-hidden rotate-y-180 flex flex-col border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                      <div className="text-3xl mb-6 text-white/80">{card.icon}</div>
                      <h3 className="text-xl font-display font-medium text-white mb-4 tracking-tight">
                        {card.title}
                      </h3>
                      <div className="w-8 h-[1px] bg-white/20 mb-6" />
                      <p className="text-white/60 font-light leading-relaxed text-sm">
                        {card.content}
                      </p>
                      <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Insight {idx + 1}</span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-20 flex justify-center"
            >
              <button
                onClick={reset}
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs tracking-widest uppercase"
              >
                <RotateCcw size={14} /> Start Over
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-8 text-white/10 text-[10px] tracking-[0.5em] uppercase pointer-events-none">
        Polarity © 2026
      </footer>
    </div>
  );
}
