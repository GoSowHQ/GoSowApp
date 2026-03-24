export interface User {
  id: string;
  email: string;
  name: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  role: 'BACKER' | 'CREATOR' | 'ADMIN';
  provider: 'LOCAL' | 'GOOGLE' | 'GITHUB';
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  imageUrl?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  goalAmount: number;
  currentAmount: number;
  backerCount: number;
  startDate?: string;
  endDate?: string;
  featured: boolean;
  creatorId: string;
  creator?: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  rewards?: Reward[];
  createdAt: string;
  updatedAt: string;
  _count?: { fundings: number; comments: number; bookmarks: number };
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  amount: number;
  quantity?: number;
  claimed: number;
  imageUrl?: string;
  deliveryDate?: string;
  projectId: string;
  createdAt: string;
}

export interface Funding {
  id: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';
  stripePaymentId?: string;
  userId: string;
  projectId: string;
  rewardId?: string;
  user?: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  project?: Pick<Project, 'title' | 'slug' | 'imageUrl'>;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  projectId: string;
  parentId?: string;
  user?: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  replies?: Comment[];
  createdAt: string;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  projectId: string;
  authorId: string;
  author?: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: EventType;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  imageUrl?: string;
  location?: string;
  isVirtual: boolean;
  meetingUrl?: string;
  startDate: string;
  endDate: string;
  maxAttendees?: number;
  createdAt: string;
  _count?: { registrations: number };
}

export type ProjectCategory =
  | 'AI_ML' | 'SAAS' | 'DEVELOPER_TOOLS' | 'OPEN_SOURCE'
  | 'HARDWARE' | 'WEB3' | 'MOBILE_APPS' | 'HACKATHONS'
  | 'TECH_EVENTS' | 'OTHER';

export type ProjectStatus =
  | 'DRAFT' | 'PENDING' | 'ACTIVE' | 'FUNDED' | 'EXPIRED' | 'CANCELLED';

export type EventType =
  | 'HACKATHON' | 'WORKSHOP' | 'MEETUP' | 'LAUNCH_PARTY' | 'DEMO_DAY' | 'WEBINAR';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  AI_ML: 'AI / ML',
  SAAS: 'SaaS',
  DEVELOPER_TOOLS: 'Developer Tools',
  OPEN_SOURCE: 'Open Source',
  HARDWARE: 'Hardware',
  WEB3: 'Web3',
  MOBILE_APPS: 'Mobile Apps',
  HACKATHONS: 'Hackathons',
  TECH_EVENTS: 'Tech Events',
  OTHER: 'Other',
};
