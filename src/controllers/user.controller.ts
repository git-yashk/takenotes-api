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
        res.status(400).json({ message: "Invalid email address" });
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
        return;
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

    res.status(201).json({ accessToken });
}

async function loginUser(req: Request, res: Response) {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
        res.status(400).json({ message: "Please enter all fields" });
        return;
    }

    const emailRegex = /^[a-z]{1,}[a-z0-9._-]{1,}@[a-z]{2,}\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email address" });
        return;
    }

    let user;
    try {
        user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
        return;
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res
        .status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .json({ accessToken, refreshToken });
}

async function logoutUser(req: Request, res: Response) {

    try {
        const user = await userModel.findByIdAndUpdate(req.body._id, { $unset: { refreshToken: "" } }, { new: true });
        res
            .status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({ _id: user?._id, message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
        return;
    }
}

export { registerUser, loginUser, logoutUser };