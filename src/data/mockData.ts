import { User, ConnectionRequest, Category } from '../types';

export const CATEGORIES: { name: Category; iconName: string; color: string; description: string }[] = [
  { name: 'Cooking', iconName: 'Utensils', color: 'from-amber-500 to-orange-500', description: 'Culinary arts, baking, pasta making, global cuisines' },
  { name: 'Gardening', iconName: 'Sprout', color: 'from-emerald-500 to-green-600', description: 'Urban farming, botany, houseplant care, composting' },
  { name: 'Coding', iconName: 'Code', color: 'from-blue-500 to-indigo-600', description: 'Web dev, Python, React, algorithms, mobile apps' },
  { name: 'Music', iconName: 'Music', color: 'from-purple-500 to-pink-500', description: 'Guitar, piano vocal training, music production' },
  { name: 'Art', iconName: 'Palette', color: 'from-rose-500 to-red-500', description: 'Watercolor, digital illustration, ceramics, sketching' },
  { name: 'Languages', iconName: 'Languages', color: 'from-teal-500 to-cyan-600', description: 'Spanish, Japanese, French, ESL, conversation practice' },
];

export const CURRENT_USER: User = {
  id: 'user_current',
  name: 'Alex Rivera',
  role: 'Full-Stack Developer & Hobby Baker',
  bio: 'Passion for building web apps and crafting sourdough bread! Always eager to exchange software engineering tips for sourdough secrets or language practice.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  location: 'San Francisco, CA',
  rating: 4.9,
  reviewCount: 18,
  completedSwaps: 14,
  responseRate: '98%',
  joinedDate: 'March 2024',
  teachSkills: [
    {
      id: 'skill_curr_teach_1',
      title: 'Modern React & TypeScript Development',
      category: 'Coding',
      type: 'TEACH',
      level: 'Intermediate',
      format: 'Online',
      description: 'Master React 19, custom hooks, Tailwind CSS, and state management. Hands-on project-based mentoring.',
      teacherId: 'user_current',
      teacherName: 'Alex Rivera',
      teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      teacherRating: 4.9,
      teacherReviewCount: 18,
      tags: ['React', 'TypeScript', 'Web Dev', 'Frontend'],
      createdAt: '2025-01-10'
    },
    {
      id: 'skill_curr_teach_2',
      title: 'Artisan Sourdough Bread from Scratch',
      category: 'Cooking',
      type: 'TEACH',
      level: 'Beginner',
      format: 'In-Person',
      description: 'Learn to cultivate starter, shape loaves, and bake crispy sourdough bread at home with simple equipment.',
      teacherId: 'user_current',
      teacherName: 'Alex Rivera',
      teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      teacherRating: 4.9,
      teacherReviewCount: 18,
      tags: ['Baking', 'Bread', 'Sourdough', 'Fermentation'],
      createdAt: '2025-01-15'
    }
  ],
  learnSkills: [
    {
      id: 'skill_curr_learn_1',
      title: 'Conversational Spanish Fluency',
      category: 'Languages',
      type: 'LEARN',
      level: 'Beginner',
      format: 'Online',
      description: 'Looking for a native Spanish speaker for casual weekly conversation practice and pronunciation help.',
      teacherId: 'user_current',
      teacherName: 'Alex Rivera',
      teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      tags: ['Spanish', 'Conversation', 'Grammar'],
      createdAt: '2025-01-12'
    },
    {
      id: 'skill_curr_learn_2',
      title: 'Acoustic Guitar Fingerpicking Basics',
      category: 'Music',
      type: 'LEARN',
      level: 'Beginner',
      format: 'Online',
      description: 'Want to learn basic chords, strumming patterns, and fingerstyle technique for indie acoustic folk music.',
      teacherId: 'user_current',
      teacherName: 'Alex Rivera',
      teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      tags: ['Guitar', 'Acoustic', 'Chords'],
      createdAt: '2025-01-18'
    }
  ],
  reviews: [
    {
      id: 'rev_1',
      authorName: 'Elena Rostova',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      comment: 'Alex was an incredible mentor for React! Explained hooks and component architecture super clearly.',
      date: '2 weeks ago'
    },
    {
      id: 'rev_2',
      authorName: 'Marcus Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      comment: 'The sourdough baking session was amazing! My starter is thriving and my loaves turned out crusty and delicious.',
      date: '1 month ago'
    }
  ]
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'user_1',
    name: 'Chef Marco Rossi',
    role: 'Italian Culinary Instructor & Sommelier',
    bio: 'Classically trained chef with 12 years of restaurant experience in Florence. Passionate about fresh pasta, risotto, and authentic Mediterranean recipes.',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=250',
    location: 'Chicago, IL',
    rating: 5.0,
    reviewCount: 32,
    completedSwaps: 28,
    responseRate: '100%',
    joinedDate: 'November 2023',
    teachSkills: [
      {
        id: 'skill_1',
        title: 'Authentic Handmade Italian Pasta Masterclass',
        category: 'Cooking',
        type: 'TEACH',
        level: 'All Levels',
        format: 'Hybrid',
        description: 'Learn the secrets of making tagliatelle, ravioli, and gnocchi from scratch without special machinery. Sauce pairing included!',
        teacherId: 'user_1',
        teacherName: 'Chef Marco Rossi',
        teacherAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=250',
        teacherRating: 5.0,
        teacherReviewCount: 32,
        tags: ['Pasta', 'Italian', 'Baking', 'Dinner'],
        createdAt: '2025-01-05'
      },
      {
        id: 'skill_1_2',
        title: 'Neapolitan Pizza Crust & Woodfire Techniques',
        category: 'Cooking',
        type: 'TEACH',
        level: 'Intermediate',
        format: 'In-Person',
        description: 'Master high-hydration pizza dough, slow cold fermentation, and baking in regular home ovens or outdoor pizza ovens.',
        teacherId: 'user_1',
        teacherName: 'Chef Marco Rossi',
        teacherAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=250',
        teacherRating: 5.0,
        teacherReviewCount: 32,
        tags: ['Pizza', 'Dough', 'Baking'],
        createdAt: '2025-01-12'
      }
    ],
    learnSkills: [
      {
        id: 'skill_1_learn',
        title: 'Web Design & Portfolio Website Building',
        category: 'Coding',
        type: 'LEARN',
        level: 'Beginner',
        format: 'Online',
        description: 'Want to build an elegant website for my culinary workshops. Looking for HTML/CSS or Webflow guidance.',
        teacherId: 'user_1',
        teacherName: 'Chef Marco Rossi',
        teacherAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=250',
        tags: ['Web Design', 'HTML/CSS', 'Portfolios'],
        createdAt: '2025-01-08'
      }
    ],
    reviews: [
      {
        id: 'rev_1_1',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        comment: 'Marco is a true maestro! Made pasta making feel effortless and super fun. Will definitely connect again.',
        date: '3 weeks ago'
      }
    ]
  },
  {
    id: 'user_2',
    name: 'Sofia Thorne',
    role: 'Urban Botanist & Landscape Designer',
    bio: 'Transforming tiny apartments and urban backyards into lush green oases. Expert in indoor plant care, pest diagnosis, and vegetable gardens.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    location: 'Seattle, WA',
    rating: 4.8,
    reviewCount: 24,
    completedSwaps: 19,
    responseRate: '95%',
    joinedDate: 'January 2024',
    teachSkills: [
      {
        id: 'skill_2',
        title: 'Balcony Gardening & Organic Vegetable Harvesting',
        category: 'Gardening',
        type: 'TEACH',
        level: 'Beginner',
        format: 'Online',
        description: 'Grow fresh tomatoes, herbs, microgreens, and peppers in limited apartment spaces with container gardening.',
        teacherId: 'user_2',
        teacherName: 'Sofia Thorne',
        teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        teacherRating: 4.8,
        teacherReviewCount: 24,
        tags: ['Herbs', 'Organic', 'Balcony', 'Soil Care'],
        createdAt: '2025-01-02'
      },
      {
        id: 'skill_2_2',
        title: 'Indoor Houseplant Propagation & Tropical Care',
        category: 'Gardening',
        type: 'TEACH',
        level: 'Intermediate',
        format: 'Hybrid',
        description: 'Learn water and moss propagation for Monstera, Pothos, Philodendron, and how to fix yellowing leaves.',
        teacherId: 'user_2',
        teacherName: 'Sofia Thorne',
        teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        teacherRating: 4.8,
        teacherReviewCount: 24,
        tags: ['Houseplants', 'Propagation', 'Botanical Care'],
        createdAt: '2025-01-14'
      }
    ],
    learnSkills: [
      {
        id: 'skill_2_learn',
        title: 'Watercolor Botanical Illustration',
        category: 'Art',
        type: 'LEARN',
        level: 'Beginner',
        format: 'Online',
        description: 'Looking to sketch and paint leaf patterns and flowers in realistic watercolor style.',
        teacherId: 'user_2',
        teacherName: 'Sofia Thorne',
        teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        tags: ['Watercolor', 'Painting', 'Botanical Art'],
        createdAt: '2025-01-11'
      }
    ],
    reviews: [
      {
        id: 'rev_2_1',
        authorName: 'David Kim',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        comment: 'Sofia rescued my dying Monstera and gave me a foolproof soil recipe. Highly recommend!',
        date: '1 month ago'
      }
    ]
  },
  {
    id: 'user_3',
    name: 'Kenji Takahashi',
    role: 'Language Specialist & Native Japanese Tutor',
    bio: 'Bilingual language instructor with passion for cultural exchanges, manga, anime, and travel conversation. Teaching conversational Japanese and JLPT prep.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    location: 'Tokyo / Remote',
    rating: 4.9,
    reviewCount: 45,
    completedSwaps: 40,
    responseRate: '99%',
    joinedDate: 'August 2023',
    teachSkills: [
      {
        id: 'skill_3',
        title: 'Conversational Japanese & Kanji Secrets',
        category: 'Languages',
        type: 'TEACH',
        level: 'All Levels',
        format: 'Online',
        description: 'Interactive conversational sessions, essential travel phrases, slang, and breakdown of Hiragana/Katakana and Kanji shortcuts.',
        teacherId: 'user_3',
        teacherName: 'Kenji Takahashi',
        teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        teacherRating: 4.9,
        teacherReviewCount: 45,
        tags: ['Japanese', 'Kanji', 'JLPT', 'Culture'],
        createdAt: '2025-01-01'
      }
    ],
    learnSkills: [
      {
        id: 'skill_3_learn',
        title: 'Python for Data Analysis & Automation',
        category: 'Coding',
        type: 'LEARN',
        level: 'Beginner',
        format: 'Online',
        description: 'Eager to learn Pandas, NumPy, and simple web scrapers to automate language study datasets.',
        teacherId: 'user_3',
        teacherName: 'Kenji Takahashi',
        teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        tags: ['Python', 'Data Science', 'Automation'],
        createdAt: '2025-01-09'
      }
    ],
    reviews: []
  },
  {
    id: 'user_4',
    name: 'Maya Lin',
    role: 'Illustrator & Procreate Digital Artist',
    bio: 'Freelance visual artist specialising in character design, digital gouache, and children book illustrations. Loving art swaps and acoustic sessions.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    location: 'Brooklyn, NY',
    rating: 4.9,
    reviewCount: 29,
    completedSwaps: 22,
    responseRate: '97%',
    joinedDate: 'December 2023',
    teachSkills: [
      {
        id: 'skill_4',
        title: 'Digital Illustration & Procreate Character Design',
        category: 'Art',
        type: 'TEACH',
        level: 'Intermediate',
        format: 'Online',
        description: 'Learn color harmony, brush setup, lighting techniques, and workflow tips using iPad and Procreate.',
        teacherId: 'user_4',
        teacherName: 'Maya Lin',
        teacherAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
        teacherRating: 4.9,
        teacherReviewCount: 29,
        tags: ['Procreate', 'Character Design', 'iPad', 'Color Theory'],
        createdAt: '2025-01-06'
      }
    ],
    learnSkills: [
      {
        id: 'skill_4_learn',
        title: 'Sourdough Baking Fundamentals',
        category: 'Cooking',
        type: 'LEARN',
        level: 'Beginner',
        format: 'In-Person',
        description: 'Want to bake sourdough bread over weekends in NYC.',
        teacherId: 'user_4',
        teacherName: 'Maya Lin',
        teacherAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
        tags: ['Baking', 'Bread'],
        createdAt: '2025-01-16'
      }
    ],
    reviews: []
  },
  {
    id: 'user_5',
    name: 'Carlos Santana',
    role: 'Acoustic Guitarist & Songwriter',
    bio: 'Playing guitar for over 15 years in indie bands. Teaching acoustic fingerpicking, chord progressions, and basic music theory in a fun, relaxed way.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    location: 'Austin, TX',
    rating: 4.7,
    reviewCount: 16,
    completedSwaps: 12,
    responseRate: '92%',
    joinedDate: 'February 2024',
    teachSkills: [
      {
        id: 'skill_5',
        title: 'Acoustic Guitar Fingerstyle & Songwriting',
        category: 'Music',
        type: 'TEACH',
        level: 'Beginner',
        format: 'Hybrid',
        description: 'Unlock your musical creativity! Learn fingerpicking patterns, open tunings, and how to structure original songs.',
        teacherId: 'user_5',
        teacherName: 'Carlos Santana',
        teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
        teacherRating: 4.7,
        teacherReviewCount: 16,
        tags: ['Guitar', 'Acoustic', 'Songwriting', 'Fingerpicking'],
        createdAt: '2025-01-04'
      }
    ],
    learnSkills: [
      {
        id: 'skill_5_learn',
        title: 'Organic Gardening & Composting',
        category: 'Gardening',
        type: 'LEARN',
        level: 'Beginner',
        format: 'In-Person',
        description: 'Setting up my backyard garden in Austin and want tips on rich soil and composting.',
        teacherId: 'user_5',
        teacherName: 'Carlos Santana',
        teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
        tags: ['Compost', 'Backyard Gardening'],
        createdAt: '2025-01-13'
      }
    ],
    reviews: []
  }
];

export const INITIAL_CONNECTION_REQUESTS: ConnectionRequest[] = [
  {
    id: 'req_1',
    senderId: 'user_1',
    senderName: 'Chef Marco Rossi',
    senderAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=250',
    recipientId: 'user_current',
    recipientName: 'Alex Rivera',
    offeredSkillTitle: 'Authentic Handmade Italian Pasta Masterclass',
    targetSkillTitle: 'Modern React & TypeScript Development',
    message: 'Ciao Alex! I would love to learn React from you so I can build my culinary site, in exchange for private pasta & risotto masterclasses!',
    status: 'pending',
    createdAt: 'Yesterday at 3:45 PM'
  },
  {
    id: 'req_2',
    senderId: 'user_2',
    senderName: 'Sofia Thorne',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    recipientId: 'user_current',
    recipientName: 'Alex Rivera',
    offeredSkillTitle: 'Balcony Gardening & Organic Vegetable Harvesting',
    targetSkillTitle: 'Artisan Sourdough Bread from Scratch',
    message: 'Hi Alex! Your sourdough loaves look incredible! I can teach you everything about indoor herb garden setups in return.',
    status: 'pending',
    createdAt: '3 days ago'
  }
];
