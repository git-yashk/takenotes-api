import { Request, Response } from "express";
import noteModel from "../models/note.model";

async function createNote(req: Request, res: Response) {
    const { title, content, bg_color } = req.body;
    const user_id = req.body.user._id;

    if (!title && !content) {
        res.status(400).json({ message: "Either title or content is required." });
        return;
    }

    try {
        const newNote = await noteModel.create({
            title,
            content,
            bg_color,
            user: user_id
        });
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}

async function getNotes(req: Request, res: Response) {
    try {
        const notes = await noteModel.find({ user: req.body.user._id });
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}

async function updateNote(req: Request, res: Response) {
    const { _id, title, content, bg_color } = req.body;
    const user_id = req.body.user._id;

    try {
        const updatedNote = await noteModel.findOneAndUpdate(
            { _id, user: user_id },
            { title, content, bg_color },
            { new: true }
        );
        if (!updatedNote) {
            res.status(404).json({ message: "Note not found." });
            return;
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}

async function deleteNote(req: Request, res: Response) {
    res.json({ message: "deleteNote" });
}

export { createNote, getNotes, updateNote, deleteNote };