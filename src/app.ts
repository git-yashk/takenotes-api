import express, { Request, Response } from "express";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to TakeNotes API." });
});

app.use("/api/users", userRouter);

export default app;