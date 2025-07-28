/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export interface IUser {
    email: string | undefined;
    fullName?: string | undefined;
    password?: string; 
    provider?:string
    image?: string;  
    _id?: mongoose.Types.ObjectId | undefined;
    id?: any ;
    createdAt?: Date;
    updatedAt?: Date;
}