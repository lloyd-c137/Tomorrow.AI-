
import { Demo, Category, Bounty, Community } from '../types';
import { SEED_DEMOS } from '../constants';

const DEMO_STORAGE_KEY = 'sci_demo_hub_demos_v3';
const CATEGORY_STORAGE_KEY = 'sci_demo_hub_categories_v3';
const BOUNTY_STORAGE_KEY = 'sci_demo_hub_bounties_v3';
const COMMUNITY_STORAGE_KEY = 'sci_demo_hub_communities_v1';

const SEED_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'AP Physics C', parentId: null, createdAt: Date.now() },
];

const SEED_BOUNTIES: Bounty[] = [
  {
    id: 'b-1',
    title: 'Viscous Fluid Simulation',
    description: 'We need a high-performance visual of fluid dynamics with adjustable viscosity parameters.',
    reward: '$200 Grant',
    layer: 'general',
    status: 'open',
    creator: 'Admin',
    createdAt: Date.now()
  }
];

// Helper to safely get data
const getFromStorage = <T>(key: string, seed: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : seed;
  } catch {
    return seed;
  }
};

// Helper to safely save data
const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage save failed", e);
  }
};

const generateCommunityCode = () => {
    return Math.random().toString().slice(2, 14);
}

export const StorageService = {
  initialize: () => {
    if (!localStorage.getItem(DEMO_STORAGE_KEY)) saveToStorage(DEMO_STORAGE_KEY, SEED_DEMOS);
    if (!localStorage.getItem(CATEGORY_STORAGE_KEY)) saveToStorage(CATEGORY_STORAGE_KEY, SEED_CATEGORIES);
    if (!localStorage.getItem(BOUNTY_STORAGE_KEY)) saveToStorage(BOUNTY_STORAGE_KEY, SEED_BOUNTIES);
    if (!localStorage.getItem(COMMUNITY_STORAGE_KEY)) saveToStorage(COMMUNITY_STORAGE_KEY, []);
  },

  // --- Communities ---
  getCommunities: (): Community[] => {
      return getFromStorage<Community[]>(COMMUNITY_STORAGE_KEY, []);
  },

  createCommunity: (name: string, description: string, creatorId: string): Community => {
      const comms = StorageService.getCommunities();
      const newComm: Community = {
          id: `comm-${Date.now()}`,
          name,
          description,
          creatorId,
          code: generateCommunityCode(),
          status: 'pending', // Requires General Admin approval
          members: [creatorId], // Creator is automatically a member
          pendingMembers: [],
          createdAt: Date.now()
      };
      comms.push(newComm);
      saveToStorage(COMMUNITY_STORAGE_KEY, comms);
      return newComm;
  },

  joinCommunityRequest: (communityId: string, userId: string) => {
      const comms = StorageService.getCommunities();
      const comm = comms.find(c => c.id === communityId);
      if(comm && !comm.members.includes(userId) && !comm.pendingMembers.includes(userId)) {
          comm.pendingMembers.push(userId);
          saveToStorage(COMMUNITY_STORAGE_KEY, comms);
      }
  },
  
  joinCommunityByCode: (code: string, userId: string): boolean => {
      const comms = StorageService.getCommunities();
      const comm = comms.find(c => c.code === code && c.status === 'approved');
      if(comm && !comm.members.includes(userId)) {
          comm.members.push(userId);
          // Remove from pending if they were pending
          comm.pendingMembers = comm.pendingMembers.filter(id => id !== userId);
          saveToStorage(COMMUNITY_STORAGE_KEY, comms);
          return true;
      }
      return false;
  },

  approveCommunity: (id: string) => {
      const comms = StorageService.getCommunities();
      const comm = comms.find(c => c.id === id);
      if(comm) {
          comm.status = 'approved';
          saveToStorage(COMMUNITY_STORAGE_KEY, comms);
      }
  },

  rejectCommunity: (id: string) => {
      const comms = StorageService.getCommunities();
      const newComms = comms.filter(c => c.id !== id);
      saveToStorage(COMMUNITY_STORAGE_KEY, newComms);
  },

  manageMember: (communityId: string, memberId: string, action: 'accept' | 'kick') => {
      const comms = StorageService.getCommunities();
      const comm = comms.find(c => c.id === communityId);
      if(!comm) return;

      if(action === 'accept') {
          comm.members.push(memberId);
          comm.pendingMembers = comm.pendingMembers.filter(id => id !== memberId);
      } else if (action === 'kick') {
          comm.members = comm.members.filter(id => id !== memberId);
          comm.pendingMembers = comm.pendingMembers.filter(id => id !== memberId);
      }
      saveToStorage(COMMUNITY_STORAGE_KEY, comms);
  },

  updateCommunityCode: (communityId: string, newCode: string) => {
      const comms = StorageService.getCommunities();
      const comm = comms.find(c => c.id === communityId);
      if(comm) {
          comm.code = newCode;
          saveToStorage(COMMUNITY_STORAGE_KEY, comms);
      }
  },

  // --- Demos ---

  getAllDemos: (): Demo[] => {
    return getFromStorage<Demo[]>(DEMO_STORAGE_KEY, SEED_DEMOS);
  },

  saveDemo: (demo: Demo) => {
    const demos = StorageService.getAllDemos();
    demos.push(demo);
    saveToStorage(DEMO_STORAGE_KEY, demos);
  },

  updateDemoStatus: (id: string, status: Demo['status'], rejectionReason?: string) => {
    const demos = StorageService.getAllDemos();
    const index = demos.findIndex(d => d.id === id);
    if (index !== -1) {
      demos[index].status = status;
      if (rejectionReason) demos[index].rejectionReason = rejectionReason;
      saveToStorage(DEMO_STORAGE_KEY, demos);
    }
  },

  updateDemoCover: (id: string, coverBase64: string) => {
    const demos = StorageService.getAllDemos();
    const index = demos.findIndex(d => d.id === id);
    if (index !== -1) {
      demos[index].thumbnailUrl = coverBase64;
      saveToStorage(DEMO_STORAGE_KEY, demos);
    }
  },
  
  deleteDemo: (id: string): Demo[] => {
    const demos = StorageService.getAllDemos();
    const newDemos = demos.filter(d => d.id !== id);
    saveToStorage(DEMO_STORAGE_KEY, newDemos);
    return newDemos;
  },

  // --- Categories ---

  getCategories: (): Category[] => {
    return getFromStorage<Category[]>(CATEGORY_STORAGE_KEY, SEED_CATEGORIES);
  },

  addCategory: (name: string, parentId: string | null, communityId?: string): Category => {
    const cats = StorageService.getCategories();
    const newCat: Category = {
      id: `cat-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      parentId,
      communityId,
      createdAt: Date.now()
    };
    cats.push(newCat);
    saveToStorage(CATEGORY_STORAGE_KEY, cats);
    return newCat;
  },

  deleteCategory: (id: string): Category[] => {
    let cats = StorageService.getCategories();
    
    // 1. Identify all IDs to delete (the node + all children)
    const idsToDelete = new Set<string>();
    const stack = [id];
    
    while (stack.length > 0) {
      const currentId = stack.pop()!;
      idsToDelete.add(currentId);
      // Find direct children
      const children = cats.filter(c => c.parentId === currentId);
      children.forEach(c => stack.push(c.id));
    }
    
    // 2. Filter out everything in the set
    const newCats = cats.filter(c => !idsToDelete.has(c.id));
    
    saveToStorage(CATEGORY_STORAGE_KEY, newCats);
    return newCats;
  },

  // --- Bounties ---

  getBounties: (): Bounty[] => {
    return getFromStorage<Bounty[]>(BOUNTY_STORAGE_KEY, SEED_BOUNTIES);
  },

  addBounty: (bounty: Bounty) => {
    const bounties = StorageService.getBounties();
    bounties.push(bounty);
    saveToStorage(BOUNTY_STORAGE_KEY, bounties);
  },

  deleteBounty: (id: string): Bounty[] => {
    const bounties = StorageService.getBounties();
    const newBounties = bounties.filter(b => b.id !== id);
    saveToStorage(BOUNTY_STORAGE_KEY, newBounties);
    return newBounties;
  }
};
