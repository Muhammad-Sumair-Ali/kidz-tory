/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/db";
import Story from "@/models/Story";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const language = searchParams.get('language') || '';
    const ageGroup = searchParams.get('ageGroup') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build search query
    const searchQuery: any = {};

    if (search) {
      searchQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { story: { $regex: search, $options: 'i' } },
        { favoriteThings: { $regex: search, $options: 'i' } }
      ];
    }

    if (language) {
      searchQuery.language = language;
    }

    if (ageGroup) {
      searchQuery.ageGroup = { $in: [ageGroup] };
    }

    // Build sort object
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get stories with user information
    const stories = await Story.find(searchQuery)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('userId', 'name email')
      .lean();

    // Get total count for pagination
    const totalStories = await Story.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalStories / limit);

    return NextResponse.json({
      success: true,
      data: {
        stories,
        pagination: {
          currentPage: page,
          totalPages,
          totalStories,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error("Admin stories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('storyId');

    if (!storyId) {
      return NextResponse.json(
        { success: false, error: "Story ID is required" },
        { status: 400 }
      );
    }

    const deletedStory = await Story.findByIdAndDelete(storyId);

    if (!deletedStory) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Story deleted successfully"
    });

  } catch (error) {
    console.error("Delete story error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete story" },
      { status: 500 }
    );
  }
}