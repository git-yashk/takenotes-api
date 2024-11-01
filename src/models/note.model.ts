import mongoose from "mongoose";
import { UserType } from "./user.model";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    bg_color: string;
    user: UserType;
}

const noteSchema = new mongoose.Schema<NoteType>(
    {
        title: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        bg_color: {
            type: String,
            default: "#fff"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true, }
);

export default mongoose.model<NoteType>("Note", noteSchema);