import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Category, SkillItem, User, ConnectionRequest, ToastMessage } from './types';
import { MOCK_USERS, CURRENT_USER, INITIAL_CONNECTION_REQUESTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillExplorer } from './components/SkillExplorer';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { AddSkillModal } from './components/AddSkillModal';
import { ConnectionModal } from './components/ConnectionModal';
import { ConnectionsDrawer } from './components/ConnectionsDrawer';
import { UserProfileView } from './components/UserProfileView';
import { ToastContainer } from './components/Toast';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'explore' | 'my-profile' | 'connections'>('explore');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Persisted Users & Current User State
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sb_users');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('sb_current_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // Connection Requests State
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(() => {
    const saved = localStorage.getItem('sb_connection_requests');
    return saved ? JSON.parse(saved) : INITIAL_CONNECTION_REQUESTS;
  });

  // Modal States
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [connectionTargetSkill, setConnectionTargetSkill] = useState<SkillItem | null>(null);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = 'toast_' + Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sb_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('sb_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sb_connection_requests', JSON.stringify(connectionRequests));
  }, [connectionRequests]);

  // Aggregate All Skills across community & current user
  const allCommunitySkills = useMemo(() => {
    const skillList: SkillItem[] = [];
    users.forEach((user) => {
      skillList.push(...user.teachSkills);
      skillList.push(...user.learnSkills);
    });
    return skillList;
  }, [users]);

  // Pending requests count for currentUser
  const pendingRequestsCount = useMemo(() => {
    return connectionRequests.filter(
      (r) => r.recipientId === currentUser.id && r.status === 'pending'
    ).length;
  }, [connectionRequests, currentUser.id]);

  // Handle Add Skill
  const handleAddSkill = (newSkillData: Omit<SkillItem, 'id' | 'createdAt'>) => {
    const newSkill: SkillItem = {
      ...newSkillData,
      id: 'skill_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUser = { ...currentUser };
    if (newSkill.type === 'TEACH') {
      updatedUser.teachSkills = [newSkill, ...updatedUser.teachSkills];
    } else {
      updatedUser.learnSkills = [newSkill, ...updatedUser.learnSkills];
    }

    setCurrentUser(updatedUser);

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );

    // Fire Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast(
      'success',
      'Skill Published!',
      `"${newSkill.title}" is now visible to the SkillBridge community.`
    );
  };

  // Handle Delete Skill
  const handleDeleteSkill = (skillId: string) => {
    const updatedUser = {
      ...currentUser,
      teachSkills: currentUser.teachSkills.filter((s) => s.id !== skillId),
      learnSkills: currentUser.learnSkills.filter((s) => s.id !== skillId)
    };

    setCurrentUser(updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );

    showToast('info', 'Skill Removed', 'The skill card has been deleted from your profile.');
  };

  // Handle Update User Bio
  const handleUpdateBio = (role: string, location: string, bio: string) => {
    const updatedUser = {
      ...currentUser,
      role,
      location,
      bio
    };

    setCurrentUser(updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );

    showToast('success', 'Profile Updated', 'Your bio and details have been saved.');
  };

  // Handle Submit Connection Request
  const handleSubmitConnectionRequest = (
    targetSkill: SkillItem,
    offeredSkillTitle: string,
    message: string
  ) => {
    const newRequest: ConnectionRequest = {
      id: 'req_' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      recipientId: targetSkill.teacherId,
      recipientName: targetSkill.teacherName,
      offeredSkillTitle,
      targetSkillTitle: targetSkill.title,
      message,
      status: 'pending',
      createdAt: 'Just now'
    };

    setConnectionRequests((prev) => [newRequest, ...prev]);

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });

    showToast(
      'success',
      'Connection Request Sent!',
      `Sent swap request to ${targetSkill.teacherName}.`
    );
  };

  // Handle Accept Connection
  const handleAcceptRequest = (requestId: string) => {
    setConnectionRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'accepted' as const } : r))
    );

    showToast(
      'success',
      'Connection Accepted!',
      'You can now chat and coordinate your skill exchange.'
    );
  };

  // Handle Decline Connection
  const handleDeclineRequest = (requestId: string) => {
    setConnectionRequests((prev) => prev.filter((r) => r.id !== requestId));
    showToast('info', 'Request Declined', 'The request has been removed.');
  };

  // Find currently inspected teacher object
  const inspectedTeacher = useMemo(() => {
    if (!selectedTeacherId) return null;
    return users.find((u) => u.id === selectedTeacherId) || null;
  }, [selectedTeacherId, users]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        pendingRequestsCount={pendingRequestsCount}
        onOpenAddSkill={() => setIsAddSkillOpen(true)}
      />

      {/* Main Content Areas based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            <Hero
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenAddSkill={() => setIsAddSkillOpen(true)}
            />
            <SkillExplorer
              skills={allCommunitySkills}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onViewTeacherProfile={(teacherId) => setSelectedTeacherId(teacherId)}
              onRequestConnection={(skill) => setConnectionTargetSkill(skill)}
              currentUserId={currentUser.id}
            />
          </>
        )}

        {activeTab === 'connections' && (
          <ConnectionsDrawer
            requests={connectionRequests}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
            onViewTeacherProfile={(teacherId) => setSelectedTeacherId(teacherId)}
          />
        )}

        {activeTab === 'my-profile' && (
          <UserProfileView
            currentUser={currentUser}
            onUpdateUserBio={handleUpdateBio}
            onOpenAddSkill={() => setIsAddSkillOpen(true)}
            onDeleteSkill={handleDeleteSkill}
            onViewTeacherProfile={(teacherId) => setSelectedTeacherId(teacherId)}
          />
        )}
      </main>

      {/* Teacher Profile Modal */}
      <TeacherProfileModal
        user={inspectedTeacher}
        onClose={() => setSelectedTeacherId(null)}
        onRequestConnection={(skill) => setConnectionTargetSkill(skill)}
        isCurrentUser={inspectedTeacher?.id === currentUser.id}
      />

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={isAddSkillOpen}
        onClose={() => setIsAddSkillOpen(false)}
        onAddSkill={handleAddSkill}
        currentUserId={currentUser.id}
        currentUserName={currentUser.name}
        currentUserAvatar={currentUser.avatar}
        currentUserRating={currentUser.rating}
      />

      {/* Send Connection Request Modal */}
      <ConnectionModal
        targetSkill={connectionTargetSkill}
        currentUser={currentUser}
        onClose={() => setConnectionTargetSkill(null)}
        onSubmitRequest={handleSubmitConnectionRequest}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-white text-base font-extrabold tracking-tight">SkillBridge</span>
            <span className="text-slate-500">• Swap Knowledge, Build Community</span>
          </div>

          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for passionate lifelong learners.
          </p>
        </div>
      </footer>

    </div>
  );
}
