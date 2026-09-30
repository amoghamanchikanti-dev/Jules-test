import React, { useState } from 'react';
import { X, Sparkles, BookOpen, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Category, SkillLevel, TeachingFormat, SkillType, SkillItem } from '../types';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkill: (newSkill: Omit<SkillItem, 'id' | 'createdAt'>) => void;
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar: string;
  currentUserRating?: number;
}

const CATEGORIES: Category[] = ['Cooking', 'Gardening', 'Coding', 'Music', 'Art', 'Languages'];
const LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
const FORMATS: TeachingFormat[] = ['Online', 'In-Person', 'Hybrid'];

export const AddSkillModal: React.FC<AddSkillModalProps> = ({
  isOpen,
  onClose,
  onAddSkill,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  currentUserRating = 5.0
}) => {
  const [skillType, setSkillType] = useState<SkillType>('TEACH');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Cooking');
  const [level, setLevel] = useState<SkillLevel>('All Levels');
  const [format, setFormat] = useState<TeachingFormat>('Online');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a descriptive skill title.');
      return;
    }
    if (!description.trim() || description.length < 15) {
      setError('Please provide a description with at least 15 characters.');
      return;
    }

    const tagsArray = tagInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    onAddSkill({
      title: title.trim(),
      category,
      type: skillType,
      level,
      format,
      description: description.trim(),
      teacherId: currentUserId,
      teacherName: currentUserName,
      teacherAvatar: currentUserAvatar,
      teacherRating: currentUserRating,
      teacherReviewCount: 1,
      tags: tagsArray.length > 0 ? tagsArray : [category.toLowerCase()]
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setTagInput('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">

      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl my-8 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Add a Skill to SkillBridge</h3>
              <p className="text-xs text-indigo-200">Share your talents or ask for knowledge you want</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Skill Type Switch (I Can Teach vs I Want to Learn) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              What kind of skill are you adding?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSkillType('TEACH')}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                  skillType === 'TEACH'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>I Can Teach This</span>
              </button>

              <button
                type="button"
                onClick={() => setSkillType('LEARN')}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                  skillType === 'LEARN'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>I Want to Learn This</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Skill Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                skillType === 'TEACH'
                  ? 'e.g., Artisan Sourdough Bread, Italian Pasta, React Development'
                  : 'e.g., Conversational Spanish, Piano Chords, Organic Gardening'
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
              required
            />
          </div>

          {/* Category & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold bg-white cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Format *
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as TeachingFormat)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold bg-white cursor-pointer"
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Experience Level *
            </label>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    level === lvl
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Description & What to Expect *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder={
                skillType === 'TEACH'
                  ? 'Describe what you will cover, requirements, or materials needed...'
                  : 'Describe what goals you have and what level you are starting from...'
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. baking, bread, fermentation, dough"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white text-sm font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Skill</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
