/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface AdminStats {
  overview: {
    totalUsers: number;
    totalStories: number;
    recentUsers: number;
    recentStories: number;
    avgStoriesPerUser: number;
    userGrowthRate: number;
    storyGrowthRate: number;
  };
  charts: {
    storiesByLanguage: Array<{ _id: string; count: number }>;
    storiesByAgeGroup: Array<{ _id: string; count: number }>;
    storiesByTheme: Array<{ _id: string; count: number }>;
    storiesByMood: Array<{ _id: string; count: number }>;
    dailyStats: Array<{ _id: string; stories: number }>;
  };
  topUsers: Array<{
    _id: string;
    storyCount: number;
    userName: string;
    userEmail: string;
  }>;
  period: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  storyCount: number;
  lastStoryDate: string | null;
}

interface Story {
  _id: string;
  title: string;
  story: string;
  language: string;
  ageGroup: string[];
  theme: string[];
  mood: string[];
  favoriteThings: string;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface UsersParams extends PaginationParams {
  // Additional user-specific filters can be added here
}

interface StoriesParams extends PaginationParams {
  language?: string;
  ageGroup?: string;
}

export const useAdminHooks = () => {
  const queryClient = useQueryClient();

  // Fetch admin statistics
  const useAdminStats = (period: number = 30) => {
    return useQuery({
      queryKey: ['admin-stats', period],
      queryFn: async (): Promise<AdminStats> => {
        const response = await axios.get(`/api/admin/stats?period=${period}`);
        return response.data.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
    });
  };

  // Fetch users with pagination
  const useAdminUsers = (params: UsersParams = {}) => {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    return useQuery({
      queryKey: ['admin-users', page, limit, search, sortBy, sortOrder],
      queryFn: async () => {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          search,
          sortBy,
          sortOrder
        });

        const response = await axios.get(`/api/admin/users?${queryParams}`);
        return response.data.data;
      },
      placeholderData: (previousData) => previousData,
    });
  };

  // Fetch stories with pagination and filters
  const useAdminStories = (params: StoriesParams = {}) => {
    const {
      page = 1,
      limit = 10,
      search = '',
      language = '',
      ageGroup = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    return useQuery({
      queryKey: ['admin-stories', page, limit, search, language, ageGroup, sortBy, sortOrder],
      queryFn: async () => {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          search,
          language,
          ageGroup,
          sortBy,
          sortOrder
        });

        const response = await axios.get(`/api/admin/stories?${queryParams}`);
        return response.data.data;
      },
      placeholderData: (previousData) => previousData,
    });
  };

  // Delete user mutation
  const useDeleteUser = () => {
    return useMutation({
      mutationFn: async (userId: string) => {
        const response = await axios.delete(`/api/admin/users?userId=${userId}`);
        return response.data;
      },
      onSuccess: () => {
        toast.success('User deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      },
      onError: (error: any) => {
        const message = error?.response?.data?.error || 'Failed to delete user';
        toast.error(message);
      },
    });
  };

  // Delete story mutation
  const useDeleteStory = () => {
    return useMutation({
      mutationFn: async (storyId: string) => {
        const response = await axios.delete(`/api/admin/stories?storyId=${storyId}`);
        return response.data;
      },
      onSuccess: () => {
        toast.success('Story deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
        queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      },
      onError: (error: any) => {
        const message = error?.response?.data?.error || 'Failed to delete story';
        toast.error(message);
      },
    });
  };

  return {
    useAdminStats,
    useAdminUsers,
    useAdminStories,
    useDeleteUser,
    useDeleteStory,
  };
};

export type { AdminStats, User, Story, UsersParams, StoriesParams };