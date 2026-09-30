import React from 'react';
import { X, Star, MapPin, Award, CheckCircle2, Sparkles, BookOpen, MessageSquarePlus, Clock } from 'lucide-react';
import { User, SkillItem } from '../types';

interface TeacherProfileModalProps {
  user: User | null;
  onClose: () => void;
  onRequestConnection: (skill: SkillItem) => void;
  isCurrentUser?: boolean;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  user,
  onClose,
  onRequestConnection,
  isCurrentUser = false
}) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8">

        {/* Header Cover Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 relative p-6 flex justify-end items-start">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-8 -mt-16">

          {/* Avatar and Primary Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-white"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 sm:mt-0">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
                  <span>{user.name}</span>
                </h2>
                <p className="text-sm font-semibold text-indigo-600 mb-1">{user.role}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 justify-center sm:justify-start">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {user.location} • Member since {user.joinedDate}
                </p>
              </div>
            </div>

            {!isCurrentUser && user.teachSkills.length > 0 && (
              <button
                onClick={() => {
                  onRequestConnection(user.teachSkills[0]);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Request Connection
              </button>
            )}
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-8 text-center sm:text-left">
            <div className="p-2">
              <span className="text-xs font-semibold text-slate-500 block">Rating</span>
              <div className="flex items-center justify-center sm:justify-start gap-1 font-black text-slate-900 text-lg">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{user.rating}</span>
                <span className="text-xs text-slate-400 font-normal">({user.reviewCount})</span>
              </div>
            </div>

            <div className="p-2 border-l border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Completed Swaps</span>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-slate-900 text-lg">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>{user.completedSwaps}</span>
              </div>
            </div>

            <div className="p-2 border-l border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Response Rate</span>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-slate-900 text-lg">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{user.responseRate}</span>
              </div>
            </div>

            <div className="p-2 border-l border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Status</span>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-emerald-600 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Swapper</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">About Teacher</h3>
            <p className="text-slate-700 leading-relaxed text-sm bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              {user.bio}
            </p>
          </div>

          {/* Section: I Can Teach */}
          <div className="mb-8">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Skills {user.name.split(' ')[0]} Can Teach ({user.teachSkills.length})</span>
            </h3>

            {user.teachSkills.length > 0 ? (
              <div className="space-y-3">
                {user.teachSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-2xl border border-indigo-100 bg-indigo-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold">
                          {skill.category}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{skill.level} • {skill.format}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{skill.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{skill.description}</p>
                    </div>

                    {!isCurrentUser && (
                      <button
                        onClick={() => {
                          onRequestConnection(skill);
                          onClose();
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer shrink-0 self-end sm:self-center"
                      >
                        Swap for this
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No skills listed to teach yet.</p>
            )}
          </div>

          {/* Section: I Want to Learn */}
          <div className="mb-8">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Skills {user.name.split(' ')[0]} Wants to Learn ({user.learnSkills.length})</span>
            </h3>

            {user.learnSkills.length > 0 ? (
              <div className="space-y-3">
                {user.learnSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                          {skill.category}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{skill.level} • {skill.format}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{skill.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No wishlist skills listed yet.</p>
            )}
          </div>

          {/* Section: Reviews */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Community Reviews ({user.reviews.length})</span>
            </h3>

            {user.reviews.length > 0 ? (
              <div className="space-y-3">
                {user.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-900">{rev.authorName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">"{rev.comment}"</p>
                    <span className="text-[10px] text-slate-400 mt-2 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 text-center border border-slate-200/60">
                <p className="text-xs text-slate-500">No reviews yet. Be the first to swap skills and leave feedback!</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
