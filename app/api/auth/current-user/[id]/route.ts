import { connectDb } from "@/config/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split("/").pop();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized user Id is required" },
        { status: 401 }
      );
    }

    await connectDb();

    const user = await User.findByIdAndUpdate(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "user was not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
