import { Router } from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller";

const noteRouter = Router();

noteRouter.post("/create", createNote);
noteRouter.get("/", getNotes);
noteRouter.put("/update", updateNote);
noteRouter.delete("/delete", deleteNote);

export default noteRouter;