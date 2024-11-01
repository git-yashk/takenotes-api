import { Request, Response } from "express";

async function createNote(req: Request, res: Response) {
    res.json({ message: "createNote" });
}

async function getNotes(req: Request, res: Response) {
    res.json({ message: "getNotes" });
}

async function updateNote(req: Request, res: Response) {
    res.json({ message: "updateNote" });
}

async function deleteNote(req: Request, res: Response) {
    res.json({ message: "deleteNote" });
}

export { createNote, getNotes, updateNote, deleteNote };