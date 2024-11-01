import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import userModel from "../models/user.model";

async function verifyJwt(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(accessToken, config.token.access_token_secret as string);
        if (!decodedToken) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const user = await userModel.findById(decodedToken.sub);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        req.body._id = user._id;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
        return;
    }

    next();
}

export default verifyJwt;