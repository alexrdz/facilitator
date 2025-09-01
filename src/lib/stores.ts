import { writable } from 'svelte/store';

// Types for our data structures
export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  createdAt: string;
}

export interface PrepAgenda {
  id: string;
  date: string;
  selectedAchievements: string[];
  helpNeeded?: string;
  growthGoals?: string;
  managerQuestions?: string;
  additionalNotes?: string;
  createdAt: string;
}

export interface Reflection {
  id: string;
  date: string;
  rating: number;
  takeaways: string;
  feedback?: string;
  actionItems?: string;
  linkedAgendaId?: string;
  createdAt: string;
}

// Storage keys for localStorage
const STORAGE_KEYS = {
  ACHIEVEMENTS: 'careerSync_achievements',
  PREP_AGENDAS: 'careerSync_prepAgendas',
  REFLECTIONS: 'careerSync_reflections',
} as const;

// Helper to generate UUID-like IDs
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Helper to get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

// Load data from localStorage
function loadFromStorage<T>(key: string): T[] {
  if (typeof localStorage === 'undefined') return [];
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

// Save data to localStorage
function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Create stores with empty initial state
export const achievements = writable<Achievement[]>([]);
export const prepAgendas = writable<PrepAgenda[]>([]);
export const reflections = writable<Reflection[]>([]);

// Initialize stores from localStorage on client side only
if (typeof window !== 'undefined') {
  achievements.set(loadFromStorage<Achievement>(STORAGE_KEYS.ACHIEVEMENTS));
  prepAgendas.set(loadFromStorage<PrepAgenda>(STORAGE_KEYS.PREP_AGENDAS));
  reflections.set(loadFromStorage<Reflection>(STORAGE_KEYS.REFLECTIONS));
}

// Subscribe to changes and save to localStorage (only on client)
if (typeof window !== 'undefined') {
  achievements.subscribe(value => {
    console.log('Achievements store updated:', value);
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, value);
  });
  prepAgendas.subscribe(value => saveToStorage(STORAGE_KEYS.PREP_AGENDAS, value));
  reflections.subscribe(value => saveToStorage(STORAGE_KEYS.REFLECTIONS, value));
}

// Achievement store functions
export const achievementActions = {
  add: (achievementData: Omit<Achievement, 'id' | 'createdAt'>) => {
    const newAchievement: Achievement = {
      ...achievementData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    achievements.update(list => [newAchievement, ...list]);
    return newAchievement;
  },

  update: (id: string, achievementData: Omit<Achievement, 'id' | 'createdAt'>) => {
    achievements.update(list =>
      list.map(item =>
        item.id === id
          ? { ...item, ...achievementData }
          : item
      )
    );
  },

  delete: (id: string) => {
    achievements.update(list => list.filter(item => item.id !== id));
  }
};

// Prep agenda store functions
export const prepAgendaActions = {
  add: (agendaData: Omit<PrepAgenda, 'id' | 'createdAt'>) => {
    const newAgenda: PrepAgenda = {
      ...agendaData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    prepAgendas.update(list => [newAgenda, ...list]);
    return newAgenda;
  }
};

// Reflection store functions
export const reflectionActions = {
  add: (reflectionData: Omit<Reflection, 'id' | 'createdAt'>) => {
    const newReflection: Reflection = {
      ...reflectionData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    reflections.update(list => [newReflection, ...list]);
    return newReflection;
  },

  delete: (id: string) => {
    reflections.update(list => list.filter(item => item.id !== id));
  }
};
