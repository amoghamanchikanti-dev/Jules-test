import React from 'react';
import { Search, Sparkles, Utensils, Sprout, Code, Music, Palette, Languages, ArrowRight, ShieldCheck, Users, RefreshCw } from 'lucide-react';
import { Category } from '../types';

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  onOpenAddSkill: () => void;
}

const CATEGORY_BUTTONS: { name: Category; icon: React.FC<{ className?: string }> }[] = [
  { name: 'Cooking', icon: Utensils },
  { name: 'Gardening', icon: Sprout },
  { name: 'Coding', icon: Code },
  { name: 'Music', icon: Music },
  { name: 'Art', icon: Palette },
  { name: 'Languages', icon: Languages },
];

export const Hero: React.FC<HeroProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenAddSkill
}) => {
  return (
    <div className="relative bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/50">

      {/* Decorative Gradient Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">

        {/* Community Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>The Peer-to-Peer Skill Exchange Network</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-6">
          Teach What You Love, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-indigo-300 bg-clip-text text-transparent">
            Learn What You Wish.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-indigo-100/90 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Connect with passion-driven neighbors and mentors. Exchange cooking, gardening, coding, music, art, languages, and more—no currency required.
        </p>

        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-2 shadow-2xl focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/50 transition-all">
            <Search className="w-6 h-6 text-indigo-200 ml-3 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills (e.g., Sourdough, Italian, React, Guitar, Spanish)..."
              className="w-full py-3 px-4 bg-transparent text-white placeholder-indigo-200/70 focus:outline-none text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-800/60 text-indigo-200 hover:text-white mr-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={onOpenAddSkill}
              className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>Offer Skill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-3xl mx-auto mb-12">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10'
            }`}
          >
            All Skills
          </button>

          {CATEGORY_BUTTONS.map(({ name, icon: Icon }) => {
            const isSelected = selectedCategory === name;
            return (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            );
          })}
        </div>

        {/* Platform Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-indigo-800/40 pt-8 text-left max-w-3xl mx-auto text-xs sm:text-sm">
          <div className="flex items-center gap-3 bg-indigo-900/40 p-3 rounded-xl border border-indigo-800/30">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Direct Skill Swaps</p>
              <p className="text-indigo-200/80 text-xs">Equal time exchange based on mutual passion</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-indigo-900/40 p-3 rounded-xl border border-indigo-800/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Verified Profiles</p>
              <p className="text-indigo-200/80 text-xs">Community reviews & teacher credentials</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-indigo-900/40 p-3 rounded-xl border border-indigo-800/30">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Online or In-Person</p>
              <p className="text-indigo-200/80 text-xs">Learn locally or connect globally</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
