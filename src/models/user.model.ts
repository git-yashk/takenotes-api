import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

export interface UserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema<UserType>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true, }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (): string {
    return jwt.sign(
        {
            sub: this._id,
        },
        config.token.access_token_secret as string,
        {
            expiresIn: config.token.access_token_expiry
        }
    )
}

userSchema.methods.generateRefreshToken = function (): string {
    return jwt.sign(
        {
            sub: this._id,
        },
        config.token.refresh_token_secret as string,
        {
            expiresIn: config.token.refresh_token_expiry
        }
    )
}

export default mongoose.model<UserType>("User", userSchema);