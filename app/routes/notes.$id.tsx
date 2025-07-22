import {ActionFunctionArgs, json, type LoaderFunctionArgs} from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { NoteDetail } from "~/components/notes/note-detail";
import { NoteDetailSkeleton } from "~/components/notes/note-detail-skeleton";
import {getNoteById, updateFavoriteStatus} from "~/services/notes.server";
import {requireUserId} from "~/services/session.server";

export async function loader({ request,params }: LoaderFunctionArgs) {
  const noteId = parseInt(params.id || "", 10);
  const userId = await requireUserId(request)

  if (isNaN(noteId)) {
    throw new Response("Invalid note ID", { status: 400 });
  }

  const note = await getNoteById(noteId,userId);
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }

  return json({ note });
}

export default function NoteDetailPage() {
  const { note } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="container py-8">
      {isLoading ? <NoteDetailSkeleton /> : <NoteDetail note={note} />}
    </div>
  );
}

export async function action({ request,params  }: ActionFunctionArgs) {
  const userId = await requireUserId(request); // Authenticates the user for this action
  const formData = await request.formData();

  // Use an 'intent' to distinguish different actions from the same route
  const intent = formData.get("intent");

  if (intent === "toggleFavorite") {
    // Get noteId from route params, as this action is specific to this note's page
    const noteId = parseInt(params.id || "", 10);

    if (isNaN(noteId)) {
      // Always return a JSON response, even for errors
      return json({ error: "Invalid note ID" }, { status: 400 });
    }

    const isFavoriteString = formData.get("isFavorite");
    const isFavorite = isFavoriteString === "true";

    try {
      await updateFavoriteStatus(noteId, userId, isFavorite);
      return json({ success: true, isFavorite: isFavorite });
    } catch (error) {
      console.error("Error updating favorite status:", error);
      return json({ error: "Failed to update favorite status" }, { status: 500 });
    }
  }

  return json({ error: "Invalid action intent" }, { status: 400 });
}