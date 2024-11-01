import { Request, Response } from "express";
import userModel from "../models/user.model";

async function registerUser(req: Request, res: Response) {
    let { name, email, password }: { name: string, email: string, password: string } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!name || !email || !password) {
        res.status(400).json({ message: "Please enter all fields" });
        return;
    }

    const emailRegex = /^[a-z]{1,}[a-z0-9._-]{1,}@[a-z]{2,}\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email" });
        return;
    }

    name = name.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

    let newUser;
    try {
        newUser = await userModel.create({ name, email, password });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
        return;
    }

    const accessToken = newUser.generateAccessToken();

    res.json({ accessToken });
}

export { registerUser };