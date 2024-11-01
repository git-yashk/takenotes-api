import express, { Request, Response } from "express";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/note.route";
import verifyJwt from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to TakeNotes API." });
});

app.use("/api/users", userRouter);
app.use("/api/notes", verifyJwt, noteRouter);

export default app;