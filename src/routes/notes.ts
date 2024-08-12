import { Router } from "express";
import {
  handleCreateNote,
  handleFetchNoteById,
  handleQueryNotesByTitle,
  handleUpdateNote,
} from "../controllers/notesController";

const notesRouter = Router();

notesRouter.post("/notes", handleCreateNote);

notesRouter.get("/notes/:id", handleFetchNoteById);

notesRouter.get("/notes", handleQueryNotesByTitle);

notesRouter.put("/notes/:id", handleUpdateNote);

export default notesRouter;
