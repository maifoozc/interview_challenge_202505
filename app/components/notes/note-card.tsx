import {Link, useFetcher} from "@remix-run/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Note } from "~/db/schema";
import { formatRelativeTime } from "~/utils/date";
import {StarIcon} from "lucide-react";
import {Button} from "~/components/ui/button";

type SerializedNote = Omit<Note, "createdAt"> & { createdAt: string };

interface NoteCardProps {
  note: SerializedNote;
}

export function NoteCard({ note }: NoteCardProps) {
    const fetcher = useFetcher();
    const isFavoritedOptimistic =
        fetcher.formData?.get("isFavorite") === "true" ||
        (note.isFavorite && fetcher.formData?.get("isFavorite") !== "false");

    return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-none">
          <div className="flex items-start justify-between gap-2">
        <CardTitle className="line-clamp-2">
          <Link to={`/notes/${note.id}`} className="hover:underline">
            {note.title}
          </Link>
        </CardTitle>
          <fetcher.Form method="post" action={`/notes/${note.id}`}>
              <input type="hidden" name="noteId" value={note.id} />
              <input
                  type="hidden"
                  name="isFavorite"
                  value={(!note.isFavorite).toString()}
              />
              <input type="hidden" name="intent" value="toggleFavorite" />

              <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  title={note.isFavorite ? "Unstar this note" : "Star this note"}
                  disabled={fetcher.state === "submitting"}
              >
                  <StarIcon
                      className={`h-4 w-4 transition-colors duration-200 ${
                          isFavoritedOptimistic
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400 hover:text-yellow-400"
                      }`}
                  />
              </Button>
          </fetcher.Form>
          </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {note.description || ""}
        </p>
      </CardContent>
      <CardFooter className="flex-none border-t pt-4">
        <p className="text-xs text-muted-foreground">
          {formatRelativeTime(note.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
