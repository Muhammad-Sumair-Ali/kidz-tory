import { connectDb } from "@/config/db";
import Story from "@/models/Story";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const url = new URL(req.url);
    const userId = url.pathname.split("/").pop();

    const stories = await Story.find({ userId: userId }); 

    if (!stories) {
      return NextResponse.json(
        { success: false, error: "stories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(stories);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve story" },
      { status: 500 }
    );
  }
}
