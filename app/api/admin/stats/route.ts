import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/db";
import Story from "@/models/Story";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    // Get query parameters for date filtering
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Total counts
    const totalUsers = await User.countDocuments();
    const totalStories = await Story.countDocuments();
    
    // Recent counts (based on period)
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: startDate }
    });
    
    const recentStories = await Story.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Stories by language
    const storiesByLanguage = await Story.aggregate([
      {
        $group: {
          _id: "$language",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Stories by age group
    const storiesByAgeGroup = await Story.aggregate([
      {
        $unwind: "$ageGroup"
      },
      {
        $group: {
          _id: "$ageGroup",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Stories by theme
    const storiesByTheme = await Story.aggregate([
      {
        $unwind: "$theme"
      },
      {
        $group: {
          _id: "$theme",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Stories by mood
    const storiesByMood = await Story.aggregate([
      {
        $unwind: "$mood"
      },
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Daily story creation for the last 30 days
    const dailyStats = await Story.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          stories: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Top users by story count
    const topUsers = await Story.aggregate([
      {
        $group: {
          _id: "$userId",
          storyCount: { $sum: 1 }
        }
      },
      { $sort: { storyCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 1,
          storyCount: 1,
          userName: "$user.name",
          userEmail: "$user.email"
        }
      }
    ]);

    // Average stories per user
    const avgStoriesPerUser = totalUsers > 0 ? parseFloat((totalStories / totalUsers).toFixed(2)) : 0;

    // Growth rate calculation
    const previousPeriodStart = new Date();
    previousPeriodStart.setDate(previousPeriodStart.getDate() - (parseInt(period) * 2));
    previousPeriodStart.setDate(previousPeriodStart.getDate() + parseInt(period));

    const previousPeriodUsers = await User.countDocuments({
      createdAt: { $gte: previousPeriodStart, $lt: startDate }
    });

    const previousPeriodStories = await Story.countDocuments({
      createdAt: { $gte: previousPeriodStart, $lt: startDate }
    });

    const userGrowthRate = previousPeriodUsers > 0 
      ? parseFloat((((recentUsers - previousPeriodUsers) / previousPeriodUsers) * 100).toFixed(2))
      : 0;

    const storyGrowthRate = previousPeriodStories > 0
      ? parseFloat((((recentStories - previousPeriodStories) / previousPeriodStories) * 100).toFixed(2))
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalStories,
          recentUsers,
          recentStories,
          avgStoriesPerUser,
          userGrowthRate,
          storyGrowthRate
        },
        charts: {
          storiesByLanguage,
          storiesByAgeGroup,
          storiesByTheme,
          storiesByMood,
          dailyStats
        },
        topUsers,
        period: parseInt(period)
      }
    });

  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch admin statistics" },
      { status: 500 }
    );
  }
}