import express, { Request, Response } from "express";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to TakeNotes API." });
});

app.use("/api/users", userRouter);

export default app;