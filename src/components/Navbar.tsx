import React from 'react';
import { Sparkles, PlusCircle, User as UserIcon, MessageSquare, Compass } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  activeTab: 'explore' | 'my-profile' | 'connections';
  setActiveTab: (tab: 'explore' | 'my-profile' | 'connections') => void;
  currentUser: User;
  pendingRequestsCount: number;
  onOpenAddSkill: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  pendingRequestsCount,
  onOpenAddSkill
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">

        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-700 via-indigo-600 to-amber-600 bg-clip-text text-transparent">
              SkillBridge
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
              Swap Knowledge
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'explore'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            Explore Skills
          </button>

          <button
            onClick={() => setActiveTab('connections')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all relative ${
              activeTab === 'connections'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Requests
            {pendingRequestsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-xs font-bold bg-amber-500 text-white rounded-full animate-pulse">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('my-profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'my-profile'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            My Profile
          </button>
        </nav>

        {/* Right CTA / User Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddSkill}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white text-sm font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Skill</span>
          </button>

          {/* User Avatar Button */}
          <button
            onClick={() => setActiveTab('my-profile')}
            className="flex items-center gap-2 p-1 rounded-full border-2 border-indigo-200 hover:border-indigo-500 transition-colors cursor-pointer"
            title="Go to My Profile"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar at bottom or inline */}
      <div className="md:hidden flex border-t border-slate-200/80 bg-white px-2 py-2 justify-around">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 text-xs font-medium py-1 px-3 rounded-lg ${
            activeTab === 'explore' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          Explore
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`flex flex-col items-center gap-1 text-xs font-medium py-1 px-3 rounded-lg relative ${
            activeTab === 'connections' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          Requests
          {pendingRequestsCount > 0 && (
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('my-profile')}
          className={`flex flex-col items-center gap-1 text-xs font-medium py-1 px-3 rounded-lg ${
            activeTab === 'my-profile' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          Profile
        </button>
      </div>
    </header>
  );
};
