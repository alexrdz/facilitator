import { z } from "zod";

// Achievement/Accomplishment schema
export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  action: z.string().min(1, "Action description is required"),
  context: z.string().min(1, "Context is required"), 
  impact: z.string().min(1, "Impact description is required"),
  createdAt: z.string(),
});

export const insertAchievementSchema = achievementSchema.omit({ 
  id: true, 
  createdAt: true 
});

// 1:1 Prep schema
export const prepAgendaSchema = z.object({
  id: z.string(),
  date: z.string(),
  selectedAchievements: z.array(z.string()), // achievement IDs
  helpNeeded: z.string().optional(),
  growthGoals: z.string().optional(),
  managerQuestions: z.string().optional(),
  additionalNotes: z.string().optional(),
  createdAt: z.string(),
});

export const insertPrepAgendaSchema = prepAgendaSchema.omit({
  id: true,
  createdAt: true
});

// Reflection schema
export const reflectionSchema = z.object({
  id: z.string(),
  date: z.string().min(1, "Date is required"),
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be between 1-5"),
  takeaways: z.string().min(1, "Key takeaways are required"),
  feedback: z.string().optional(),
  actionItems: z.string().optional(),
  linkedAgendaId: z.string().optional(), // Link to prep agenda
  createdAt: z.string(),
});

export const insertReflectionSchema = reflectionSchema.omit({
  id: true,
  createdAt: true
});

// Types
export type Achievement = z.infer<typeof achievementSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type PrepAgenda = z.infer<typeof prepAgendaSchema>;
export type InsertPrepAgenda = z.infer<typeof insertPrepAgendaSchema>;

export type Reflection = z.infer<typeof reflectionSchema>;
export type InsertReflection = z.infer<typeof insertReflectionSchema>;

// Legacy user schema (keeping for compatibility)
export const users = {
  id: "",
  username: "",
  password: "",
};

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users & { id: string };
