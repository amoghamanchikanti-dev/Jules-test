import React from 'react';
import { Star, User, MessageSquarePlus, Sparkles, BookOpen, Utensils, Sprout, Code, Music, Palette, Languages, CheckCircle2 } from 'lucide-react';
import { SkillItem, Category } from '../types';

interface SkillCardProps {
  skill: SkillItem;
  onViewTeacherProfile: (teacherId: string) => void;
  onRequestConnection: (skill: SkillItem) => void;
  isOwner?: boolean;
}

const CATEGORY_CONFIG: Record<Category, { bg: string; text: string; icon: React.FC<{ className?: string }> }> = {
  Cooking: { bg: 'bg-amber-100/80 border-amber-200', text: 'text-amber-800', icon: Utensils },
  Gardening: { bg: 'bg-emerald-100/80 border-emerald-200', text: 'text-emerald-800', icon: Sprout },
  Coding: { bg: 'bg-indigo-100/80 border-indigo-200', text: 'text-indigo-800', icon: Code },
  Music: { bg: 'bg-purple-100/80 border-purple-200', text: 'text-purple-800', icon: Music },
  Art: { bg: 'bg-rose-100/80 border-rose-200', text: 'text-rose-800', icon: Palette },
  Languages: { bg: 'bg-teal-100/80 border-teal-200', text: 'text-teal-800', icon: Languages },
};

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onViewTeacherProfile,
  onRequestConnection,
  isOwner = false
}) => {
  const categoryMeta = CATEGORY_CONFIG[skill.category] || {
    bg: 'bg-slate-100 border-slate-200',
    text: 'text-slate-800',
    icon: Sparkles
  };

  const IconComponent = categoryMeta.icon;
  const isTeaching = skill.type === 'TEACH';

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">

      {/* Top Accent Strip */}
      <div className={`h-1.5 w-full ${isTeaching ? 'bg-gradient-to-r from-indigo-500 to-amber-500' : 'bg-gradient-to-r from-teal-400 to-emerald-500'}`} />

      <div className="p-6 flex-1 flex flex-col justify-between">

        {/* Card Header: Type Badge & Category */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isTeaching
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isTeaching ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  I Can Teach
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  I Want to Learn
                </>
              )}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${categoryMeta.bg} ${categoryMeta.text}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              {skill.category}
            </span>
          </div>

          {/* Skill Title */}
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {skill.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {skill.description}
          </p>

          {/* Tags */}
          {skill.tags && skill.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {skill.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Format & Level Badges */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mb-5 text-xs text-slate-500">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700">
            {skill.format}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700">
            {skill.level}
          </span>
        </div>

        {/* Footer: Teacher Info & Connection CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => onViewTeacherProfile(skill.teacherId)}
            className="flex items-center gap-3 text-left group/teacher hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="relative">
              <img
                src={skill.teacherAvatar}
                alt={skill.teacherName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 group-hover/teacher:ring-indigo-500 transition-all"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover/teacher:text-indigo-600 transition-colors line-clamp-1">
                {skill.teacherName}
              </p>
              {skill.teacherRating ? (
                <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{skill.teacherRating}</span>
                  <span className="text-slate-400">({skill.teacherReviewCount || 0})</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">New Member</span>
              )}
            </div>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewTeacherProfile(skill.teacherId)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="View Profile"
            >
              <User className="w-4 h-4" />
            </button>

            {!isOwner && (
              <button
                onClick={() => onRequestConnection(skill)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
