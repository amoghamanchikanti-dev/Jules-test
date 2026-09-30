import React, { useState } from 'react';
import { X, Send, ArrowRightLeft } from 'lucide-react';
import { SkillItem, User } from '../types';

interface ConnectionModalProps {
  targetSkill: SkillItem | null;
  currentUser: User;
  onClose: () => void;
  onSubmitRequest: (targetSkill: SkillItem, offeredSkillTitle: string, message: string) => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  targetSkill,
  currentUser,
  onClose,
  onSubmitRequest
}) => {
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState<string>(
    currentUser.teachSkills[0]?.title || 'General Skill Swap'
  );
  const [message, setMessage] = useState('');

  if (!targetSkill) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRequest(targetSkill, selectedOfferedSkill, message.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">

      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden my-8">

        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Send Connection Request</h3>
              <p className="text-xs text-indigo-200">Offer a skill swap with {targetSkill.teacherName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Target Skill Summary Box */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-3">
            <img
              src={targetSkill.teacherAvatar}
              alt={targetSkill.teacherName}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-200"
            />
            <div>
              <span className="text-[11px] font-extrabold uppercase text-indigo-600 tracking-wider">
                Skill You Want to Learn
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm">{targetSkill.title}</h4>
              <p className="text-xs text-slate-500">Taught by {targetSkill.teacherName}</p>
            </div>
          </div>

          {/* Skill You Offer in Return */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Select What You Offer in Return *
            </label>
            {currentUser.teachSkills.length > 0 ? (
              <select
                value={selectedOfferedSkill}
                onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold bg-white cursor-pointer"
              >
                {currentUser.teachSkills.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title} ({s.category})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                You haven't listed any teaching skills yet. We will send a general swap invitation!
              </div>
            )}
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Introductory Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder={`Hi ${targetSkill.teacherName.split(' ')[0]}! I saw your skill on "${targetSkill.title}" and would love to exchange knowledge. Let me know when you are available!`}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Request</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
