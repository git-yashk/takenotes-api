import { Request, Response } from "express";
import noteModel from "../models/note.model";

async function createNote(req: Request, res: Response) {
    const { _id, title, content, bg_color } = req.body;
    console.log({ _id, title, content, bg_color });

    if (!title && !content) {
        res.status(400).json({ message: "Either title or content is required." });
        return;
    }

    try {
        const newNote = await noteModel.create({
            title,
            content,
            bg_color,
            user: _id
        });
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
        return;
    }
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