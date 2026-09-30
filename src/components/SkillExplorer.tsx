import React, { useState, useMemo } from 'react';
import { Sparkles, BookOpen, Layers, X, Search, RefreshCw } from 'lucide-react';
import { SkillItem, Category, SkillLevel, TeachingFormat } from '../types';
import { SkillCard } from './SkillCard';

interface SkillExplorerProps {
  skills: SkillItem[];
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onViewTeacherProfile: (teacherId: string) => void;
  onRequestConnection: (skill: SkillItem) => void;
  currentUserId: string;
}

export const SkillExplorer: React.FC<SkillExplorerProps> = ({
  skills,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  onViewTeacherProfile,
  onRequestConnection,
  currentUserId
}) => {
  const [skillTypeFilter, setSkillTypeFilter] = useState<'ALL' | 'TEACH' | 'LEARN'>('ALL');
  const [levelFilter, setLevelFilter] = useState<SkillLevel | 'ALL'>('ALL');
  const [formatFilter, setFormatFilter] = useState<TeachingFormat | 'ALL'>('ALL');

  // Filter skills logic
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      // Category match
      if (selectedCategory !== 'All' && skill.category !== selectedCategory) {
        return false;
      }
      // Skill Type match
      if (skillTypeFilter !== 'ALL' && skill.type !== skillTypeFilter) {
        return false;
      }
      // Level match
      if (levelFilter !== 'ALL' && skill.level !== levelFilter) {
        return false;
      }
      // Format match
      if (formatFilter !== 'ALL' && skill.format !== formatFilter) {
        return false;
      }
      // Free text search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = skill.title.toLowerCase().includes(query);
        const matchesDesc = skill.description.toLowerCase().includes(query);
        const matchesTeacher = skill.teacherName.toLowerCase().includes(query);
        const matchesCategory = skill.category.toLowerCase().includes(query);
        const matchesTags = skill.tags?.some((tag: string) => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesTeacher && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [skills, selectedCategory, skillTypeFilter, levelFilter, formatFilter, searchTerm]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    skillTypeFilter !== 'ALL' ||
    levelFilter !== 'ALL' ||
    formatFilter !== 'ALL' ||
    searchTerm.trim().length > 0;

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSkillTypeFilter('ALL');
    setLevelFilter('ALL');
    setFormatFilter('ALL');
    setSearchTerm('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

          {/* Skill Type Tabs (All / I Can Teach / I Want to Learn) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSkillTypeFilter('ALL')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                skillTypeFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-500" />
              All Skills ({skills.length})
            </button>

            <button
              onClick={() => setSkillTypeFilter('TEACH')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                skillTypeFilter === 'TEACH'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              I Can Teach
            </button>

            <button
              onClick={() => setSkillTypeFilter('LEARN')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                skillTypeFilter === 'LEARN'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              I Want to Learn
            </button>
          </div>

          {/* Secondary Filters: Level, Format & Reset */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Format Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Format:</span>
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value as TeachingFormat | 'ALL')}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="ALL">Any Format</option>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Level:</span>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as SkillLevel | 'ALL')}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>
              {selectedCategory === 'All' ? 'All Community Skills' : `${selectedCategory} Skills`}
            </span>
            <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              {filteredSkills.length} available
            </span>
          </h2>
          {searchTerm && (
            <p className="text-sm text-slate-500 mt-1">
              Showing search results for "<span className="font-semibold text-slate-800">{searchTerm}</span>"
            </p>
          )}
        </div>
      </div>

      {/* Grid of Skill Cards */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onViewTeacherProfile={onViewTeacherProfile}
              onRequestConnection={onRequestConnection}
              isOwner={skill.teacherId === currentUserId}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">No matching skills found</h3>
          <p className="text-slate-600 text-sm mb-6">
            We couldn't find any skills matching your search and filter options. Try clearing some filters or searching for different keywords!
          </p>
          <button
            onClick={resetAllFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
