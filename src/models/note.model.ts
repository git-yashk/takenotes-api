import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
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

export default mongoose.model("Note", noteSchema);