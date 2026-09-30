export type Category = 'Cooking' | 'Gardening' | 'Coding' | 'Music' | 'Art' | 'Languages';

export type SkillType = 'TEACH' | 'LEARN';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export type TeachingFormat = 'Online' | 'In-Person' | 'Hybrid';

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SkillItem {
  id: string;
  title: string;
  category: Category;
  type: SkillType; // 'TEACH' = I can teach this, 'LEARN' = I want to learn this
  level: SkillLevel;
  format: TeachingFormat;
  description: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  teacherRating?: number;
  teacherReviewCount?: number;
  tags: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  rating: number;
  reviewCount: number;
  completedSwaps: number;
  responseRate: string;
  joinedDate: string;
  teachSkills: SkillItem[];
  learnSkills: SkillItem[];
  reviews: Review[];
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  recipientName: string;
  offeredSkillTitle: string;
  targetSkillTitle: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}
