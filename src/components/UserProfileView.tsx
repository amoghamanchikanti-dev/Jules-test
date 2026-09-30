import React, { useState } from 'react';
import { User } from '../types';
import { Sparkles, BookOpen, PlusCircle, Edit3, Check, MapPin, Award, Star, Trash2 } from 'lucide-react';
import { SkillCard } from './SkillCard';

interface UserProfileViewProps {
  currentUser: User;
  onUpdateUserBio: (role: string, location: string, bio: string) => void;
  onOpenAddSkill: () => void;
  onDeleteSkill: (skillId: string) => void;
  onViewTeacherProfile: (teacherId: string) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  currentUser,
  onUpdateUserBio,
  onOpenAddSkill,
  onDeleteSkill,
  onViewTeacherProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [roleInput, setRoleInput] = useState(currentUser.role);
  const [locationInput, setLocationInput] = useState(currentUser.location);
  const [bioInput, setBioInput] = useState(currentUser.bio);

  const handleSaveBio = () => {
    onUpdateUserBio(roleInput, locationInput, bioInput);
    setIsEditing(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Profile Header Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-10">

        {/* Cover Graphic */}
        <div className="h-36 bg-gradient-to-r from-indigo-700 via-purple-700 to-amber-500 relative p-6" />

        {/* User Card Content */}
        <div className="px-6 sm:px-8 pb-8 -mt-16 relative">

          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white"
              />
              <div>
                <h1 className="text-3xl font-black text-slate-900">{currentUser.name}</h1>
                <p className="text-sm font-semibold text-indigo-600 mt-0.5">{currentUser.role}</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.location} • Member since {currentUser.joinedDate}
                </p>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              <button
                onClick={onOpenAddSkill}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>

          {/* Edit Profile Form OR Display Bio */}
          {isEditing ? (
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4 mb-8">
              <h3 className="text-sm font-black text-indigo-900 uppercase tracking-wider">Edit Profile Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role / Headline</label>
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio Summary</label>
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveBio}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">About Me</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{currentUser.bio}</p>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-center">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Rating</span>
              <div className="flex items-center justify-center gap-1 font-black text-slate-900 text-lg">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{currentUser.rating}</span>
                <span className="text-xs text-slate-400 font-normal">({currentUser.reviewCount})</span>
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Swaps Completed</span>
              <div className="flex items-center justify-center gap-1 font-black text-slate-900 text-lg">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>{currentUser.completedSwaps}</span>
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Teaching Skills</span>
              <span className="font-black text-indigo-600 text-lg block">{currentUser.teachSkills.length} Listed</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Learning Wishlist</span>
              <span className="font-black text-emerald-600 text-lg block">{currentUser.learnSkills.length} Listed</span>
            </div>
          </div>

        </div>
      </div>

      {/* Section 1: "I Can Teach" Skills */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <span>Skills "I Can Teach" ({currentUser.teachSkills.length})</span>
          </h2>

          <button
            onClick={onOpenAddSkill}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Add Teaching Skill
          </button>
        </div>

        {currentUser.teachSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUser.teachSkills.map((skill) => (
              <div key={skill.id} className="relative group/mycard">
                <SkillCard
                  skill={skill}
                  onViewTeacherProfile={onViewTeacherProfile}
                  onRequestConnection={() => {}}
                  isOwner={true}
                />
                <button
                  onClick={() => onDeleteSkill(skill.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-rose-600 shadow-md transition-all cursor-pointer opacity-80 group-hover/mycard:opacity-100"
                  title="Remove Skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-white border border-dashed border-slate-300 text-center">
            <p className="text-sm font-bold text-slate-700 mb-2">You haven't added any skills to teach yet.</p>
            <button
              onClick={onOpenAddSkill}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
            >
              Add Your First Teaching Skill
            </button>
          </div>
        )}
      </div>

      {/* Section 2: "I Want to Learn" Wishlist */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span>Skills "I Want to Learn" ({currentUser.learnSkills.length})</span>
          </h2>

          <button
            onClick={onOpenAddSkill}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Add Wishlist Skill
          </button>
        </div>

        {currentUser.learnSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUser.learnSkills.map((skill) => (
              <div key={skill.id} className="relative group/mycard">
                <SkillCard
                  skill={skill}
                  onViewTeacherProfile={onViewTeacherProfile}
                  onRequestConnection={() => {}}
                  isOwner={true}
                />
                <button
                  onClick={() => onDeleteSkill(skill.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-rose-600 shadow-md transition-all cursor-pointer opacity-80 group-hover/mycard:opacity-100"
                  title="Remove Skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-white border border-dashed border-slate-300 text-center">
            <p className="text-sm font-bold text-slate-700 mb-2">Your wishlist is empty.</p>
            <button
              onClick={onOpenAddSkill}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
            >
              Add a Skill You Want to Learn
            </button>
          </div>
        )}
      </div>

    </section>
  );
};
