import { type Note } from "~/db/schema";
import { NoteCard } from "./note-card";

type SerializedNote = Omit<Note, "createdAt"> & { createdAt: string };

interface NotesGridProps {
  notes: SerializedNote[];
  emptyMessage?: string;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function NotesGrid({
  notes,
  emptyMessage = "No notes found.",
                              currentPage = 1,
                              totalPages = 1,
                              onPageChange,
}: NotesGridProps) {
  if (notes.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

          {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                  <button
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                      Previous
                  </button>

                  <span className="px-3 py-1 text-sm">
            Page {currentPage} of {totalPages}
          </span>

                  <button
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                      Next
                  </button>
              </div>
          )}
      </div>
  );
}
