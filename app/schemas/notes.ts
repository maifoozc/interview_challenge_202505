import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(10000, "Description must be less than 10000 characters"),
  isFavorite: z.boolean().optional(),
});

export const noteUpdateSchema = noteSchema.partial();

export type NoteForm = z.infer<typeof noteSchema>;
export type NoteUpdateForm = z.infer<typeof noteUpdateSchema>;
