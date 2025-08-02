import { connectDb } from "@/config/db";
import { generateAndSaveStory } from "@/lib/services/storyService";
import Story from "@/models/Story";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const data = body.reqData || body;
    if (!data.userId) {
      return NextResponse.json(
        { success: false, error: "stories not found" },
        { status: 404 }
      );
    }

    const stories = await Story.find({ userId: data.userId });

    if (stories.length >= 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to generate Story. You have reached the limit.",
        },
        { status: 403 }
      );
    }

    const requiredFields = [
      "userId",
      "ageGroup",
      "language",
      "favoriteThings",
      "world",
      "theme",
      "mood",
    ];

    const missing = requiredFields.filter(
      (field) =>
        !data[field] ||
        (Array.isArray(data[field]) && data[field].length === 0) ||
        (typeof data[field] === "string" && data[field].trim() === "")
    );

    if (missing.length) {
      return Response.json(
        {
          success: false,
          error: `Missing or invalid fields: ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const result = await generateAndSaveStory(data);
    return Response.json({ success: true, ...result });
  } catch (err) {
    console.error("API Error:", err);
    return Response.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
