import { db, notes, type Note, type NewNote } from "~/db/schema";
import {count, eq, sql} from "drizzle-orm";

export async function createNote(data: NewNote): Promise<Note> {
  const [note] = await db.insert(notes).values(data).returning();
  return note;
}

export async function getNoteById(id: number, userId: number): Promise<Note | null> {
  const [note] = await db
    .select()
    .from(notes)
    .where(sql`${notes.id} = ${id} AND ${notes.userId} = ${userId}`);
  return note || null;
}

export async function getNotesByUserId(
  userId: number,
  { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {}
  // { limit = 10 }: { limit?: number } = {}
): Promise<{
    notes: Note[],
    totalCount: number;
    totalPages: number;
    currentPage: number; }> {
  const notesList = await db
    .select()
    .from(notes)
    .where(sql`${notes.userId} = ${userId}`)
    // .limit(limit);
      .limit(perPage)
      .offset((page - 1) * perPage);

    const totalResult = await db
        .select({ count: count() })
        .from(notes)
        .where(eq(notes.userId, userId));
  return {
    notes: notesList,
      totalCount: totalResult[0].count,
      totalPages: Math.ceil(totalResult[0].count / perPage),
      currentPage: page,
  };
}

export async function updateNote(
  id: number,
  userId: number,
  data: Partial<NewNote>
): Promise<Note | null> {
  const [note] = await db
    .update(notes)
    .set(data)
    .where(sql`${notes.id} = ${id} AND ${notes.userId} = ${userId}`)
    .returning();
  return note || null;
}

export async function deleteNote(id: number, userId: number): Promise<boolean> {
  const [note] = await db
    .delete(notes)
    .where(sql`${notes.id} = ${id} AND ${notes.userId} = ${userId}`)
    .returning();
  return !!note;
}
