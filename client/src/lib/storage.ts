import { Achievement, PrepAgenda, Reflection, InsertAchievement, InsertPrepAgenda, InsertReflection } from "@/types";

const STORAGE_KEYS = {
  ACHIEVEMENTS: 'careerSync_achievements',
  PREP_AGENDAS: 'careerSync_prepAgendas', 
  REFLECTIONS: 'careerSync_reflections',
} as const;

// Helper to generate UUID-like IDs
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Achievement storage functions
export function getAchievements(): Achievement[] {
  const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  return stored ? JSON.parse(stored) : [];
}

export function saveAchievement(achievementData: InsertAchievement): Achievement {
  const achievements = getAchievements();
  const newAchievement: Achievement = {
    ...achievementData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  achievements.unshift(newAchievement);
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  return newAchievement;
}

export function updateAchievement(id: string, achievementData: InsertAchievement): Achievement | null {
  const achievements = getAchievements();
  const index = achievements.findIndex(a => a.id === id);
  
  if (index === -1) return null;
  
  const updatedAchievement: Achievement = {
    ...achievements[index],
    ...achievementData,
  };
  
  achievements[index] = updatedAchievement;
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  return updatedAchievement;
}

export function deleteAchievement(id: string): boolean {
  const achievements = getAchievements();
  const filtered = achievements.filter(a => a.id !== id);
  
  if (filtered.length === achievements.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(filtered));
  return true;
}

// Prep Agenda storage functions
export function getPrepAgendas(): PrepAgenda[] {
  const stored = localStorage.getItem(STORAGE_KEYS.PREP_AGENDAS);
  return stored ? JSON.parse(stored) : [];
}

export function savePrepAgenda(agendaData: InsertPrepAgenda): PrepAgenda {
  const agendas = getPrepAgendas();
  const newAgenda: PrepAgenda = {
    ...agendaData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  agendas.unshift(newAgenda);
  localStorage.setItem(STORAGE_KEYS.PREP_AGENDAS, JSON.stringify(agendas));
  return newAgenda;
}

// Reflection storage functions
export function getReflections(): Reflection[] {
  const stored = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
  return stored ? JSON.parse(stored) : [];
}

export function saveReflection(reflectionData: InsertReflection): Reflection {
  const reflections = getReflections();
  const newReflection: Reflection = {
    ...reflectionData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  reflections.unshift(newReflection);
  localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(reflections));
  return newReflection;
}

export function deleteReflection(id: string): boolean {
  const reflections = getReflections();
  const filtered = reflections.filter(r => r.id !== id);
  
  if (filtered.length === reflections.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(filtered));
  return true;
}

// Helper to get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}
