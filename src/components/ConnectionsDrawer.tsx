import React, { useState } from 'react';
import { Check, X, MessageSquare, Send, Clock, UserCheck } from 'lucide-react';
import { ConnectionRequest } from '../types';

interface ConnectionsDrawerProps {
  requests: ConnectionRequest[];
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onViewTeacherProfile: (teacherId: string) => void;
}

export const ConnectionsDrawer: React.FC<ConnectionsDrawerProps> = ({
  requests,
  onAcceptRequest,
  onDeclineRequest,
  onViewTeacherProfile
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted'>('pending');
  const [activeChatRequest, setActiveChatRequest] = useState<ConnectionRequest | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, { sender: string; text: string; time: string }[]>>({
    req_1: [
      { sender: 'Chef Marco Rossi', text: 'Ciao Alex! Ready to swap pasta making for React mentoring?', time: 'Yesterday 3:45 PM' }
    ]
  });
  const [newMessageText, setNewMessageText] = useState('');

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const acceptedRequests = requests.filter((r) => r.status === 'accepted');

  const handleSendMessage = (requestId: string) => {
    if (!newMessageText.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => ({
      ...prev,
      [requestId]: [
        ...(prev[requestId] || []),
        { sender: 'You', text: newMessageText.trim(), time: now }
      ]
    }));

    setNewMessageText('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
            <span>Connection Center</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage incoming skill exchange invitations and chat with connected teachers
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            Pending ({pendingRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('accepted')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'accepted'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Connected ({acceptedRequests.length})
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      {activeTab === 'pending' ? (

        /* Pending Tab */
        pendingRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Sender Row */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => onViewTeacherProfile(req.senderId)}
                      className="flex items-center gap-3 text-left group cursor-pointer"
                    >
                      <img
                        src={req.senderAvatar}
                        alt={req.senderName}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-500 transition-all"
                      />
                      <div>
                        <h4 className="font-extrabold text-slate-900 group-hover:text-indigo-600 text-base transition-colors">
                          {req.senderName}
                        </h4>
                        <span className="text-xs text-slate-400">{req.createdAt}</span>
                      </div>
                    </button>

                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                      Pending Request
                    </span>
                  </div>

                  {/* Offered vs Requested Skill Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Offered Skill:</span>
                      <span className="font-bold text-indigo-600">{req.offeredSkillTitle}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-slate-500 font-semibold">In Exchange For:</span>
                      <span className="font-bold text-emerald-600">{req.targetSkillTitle}</span>
                    </div>
                  </div>

                  {/* Message */}
                  {req.message && (
                    <div className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100/80 text-xs text-slate-700 leading-relaxed mb-6">
                      <span className="font-bold text-indigo-900 block mb-1">Message from {req.senderName.split(' ')[0]}:</span>
                      "{req.message}"
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => onDeclineRequest(req.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                  <button
                    onClick={() => onAcceptRequest(req.id)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    Accept Connection
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">No pending requests</h3>
            <p className="text-slate-500 text-xs">
              When someone wants to exchange skills with you, their requests will appear here!
            </p>
          </div>
        )

      ) : (

        /* Connected Tab + Simulated Chat */
        acceptedRequests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* List of Connected Partners */}
            <div className="space-y-3 lg:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Connected Skill Partners</h3>
              {acceptedRequests.map((req) => {
                const isSelected = activeChatRequest?.id === req.id;
                return (
                  <div
                    key={req.id}
                    onClick={() => setActiveChatRequest(req)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <img
                      src={req.senderAvatar}
                      alt={req.senderName}
                      className="w-11 h-11 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm truncate">{req.senderName}</h4>
                      <p className={`text-xs truncate ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {req.offeredSkillTitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Chat Interface */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between min-h-[420px]">
              {activeChatRequest ? (
                <>
                  {/* Chat Partner Header */}
                  <div className="pb-4 border-b border-slate-100 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeChatRequest.senderAvatar}
                        alt={activeChatRequest.senderName}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-100"
                      />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">{activeChatRequest.senderName}</h4>
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Skill Swap Connected
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewTeacherProfile(activeChatRequest.senderId)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      View Profile
                    </button>
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 space-y-3 overflow-y-auto mb-4 max-h-[280px] p-2 bg-slate-50/60 rounded-2xl border border-slate-100">
                    {(chatMessages[activeChatRequest.id] || []).map((msg, idx) => {
                      const isMe = msg.sender === 'You';
                      return (
                        <div
                          key={idx}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-medium ${
                              isMe
                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none shadow-2xs'
                            }`}
                          >
                            <span className="block text-[10px] font-bold opacity-75 mb-0.5">{msg.sender}</span>
                            <p>{msg.text}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Input Box */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <input
                      type="text"
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(activeChatRequest.id)}
                      placeholder="Type a message to schedule your swap session..."
                      className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => handleSendMessage(activeChatRequest.id)}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto p-8">
                  <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
                  <p className="text-sm font-bold text-slate-700">Select a connected partner to chat</p>
                  <p className="text-xs text-slate-400">Coordinate date, time, and session link for your swap!</p>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mx-auto mb-4">
              <UserCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">No connections yet</h3>
            <p className="text-slate-500 text-xs">
              Explore skills on SkillBridge and send connection requests to start learning!
            </p>
          </div>
        )

      )}

    </section>
  );
};
