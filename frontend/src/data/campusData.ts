import {
  Briefcase,
  Calendar,
  MessageCircle,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export type FeedPost = {
  id: number;
  author: string;
  initials: string;
  campus: string;
  time: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
};

export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  rsvpd: boolean;
};

export type MarketplaceListing = {
  id: number;
  title: string;
  price: string;
  category: string;
  seller: string;
  condition: string;
};

export type Opportunity = {
  id: number;
  title: string;
  org: string;
  type: string;
  location: string;
  deadline: string;
  skills: string[];
};

export type Conversation = {
  id: number;
  type: "dm";
  name: string;
  initials: string;
  lastMsg: string;
  time: string;
  unread: number;
};

export type Chatroom = {
  id: number;
  type: "room";
  name: string;
  initials: string;
  lastMsg: string;
  time: string;
  members: number;
  category: string;
};

export type ChatMessage = {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSystem?: boolean;
};

export type TrendingTopic = {
  topic: string;
  posts: number;
  sentiment: "positive" | "neutral" | "negative";
  change: string;
};

export type Discussion = {
  title: string;
  replies: number;
  participants: number;
};

export const landingFeatures = [
  {
    icon: Zap,
    title: "Campus Pulse",
    desc: "A simple view of active campus topics based on posts and discussions.",
  },
  {
    icon: Users,
    title: "Community Feed",
    desc: "Share updates, ask questions, and connect with classmates through a campus feed.",
  },
  {
    icon: Calendar,
    title: "Events Hub",
    desc: "Discover campus events, RSVP instantly, and never miss what matters with smart reminders.",
  },
  {
    icon: TrendingUp,
    title: "Opportunities",
    desc: "Find internships, projects, and collaborations filtered by your skills and interests.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Buy and sell textbooks, gadgets, and more within your trusted campus community.",
  },
  {
    icon: MessageCircle,
    title: "Messaging",
    desc: "Direct chats and topic-based rooms for seamless real-time conversations.",
  },
];

export const feedPosts: FeedPost[] = [];
export const campusEvents: CampusEvent[] = [];
export const marketplaceListings: MarketplaceListing[] = [];
export const opportunities: Opportunity[] = [];
export const conversations: Conversation[] = [];
export const chatrooms: Chatroom[] = [];
export const dmHistory: ChatMessage[] = [];
export const roomHistory: ChatMessage[] = [];
export const trendingTopics: TrendingTopic[] = [];
export const topDiscussions: Discussion[] = [];
