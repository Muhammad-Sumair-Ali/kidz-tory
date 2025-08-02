/* eslint-disable @typescript-eslint/no-explicit-any */
import { Story } from "@/types/story-form";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useInfiniteQuery, UseQueryResult, UseInfiniteQueryResult } from "@tanstack/react-query";

interface StoriesResponse {
  success: boolean;
  data: Story[];
  totalPages: number;
  currentPage: number;
  total: number;
}

interface FetchAllStoriesParams {
  page: number;
  limit: number;
}

export const useCustomHook = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch stories for a specific user
  const fetchStories = async (userId: string | number): Promise<Story[]> => {
    try {
      const res = await axios.get(`/api/get-stories/${userId}`);
      return res.data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || "Failed to fetch stories.";
      toast.error(`Error while getting stories: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  };

  const fetchAllStories = async ({ page, limit }: FetchAllStoriesParams): Promise<StoriesResponse> => {
    try {
      const res = await axios.get(`/api/stories?page=${page}&limit=${limit}`);
      const { success, data, totalPages, currentPage, total } = res.data;

      if (!success) {
        toast.error("Failed to load stories");
        throw new Error("Failed to load stories");
      }

      return {
        success,
        data,
        totalPages,
        currentPage: currentPage || page,
        total: total || data.length
      };
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const useUserStories = (userId: string | number | null) => {
    return useQuery({
      queryKey: ['user-stories', userId],
      queryFn: () => fetchStories(userId!),
      enabled: !!userId, 
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }) as UseQueryResult<Story[], Error>;
  };

  const useAllStories = () => {
    return useInfiniteQuery({
      queryKey: ['all-stories', limit],
      queryFn: ({ pageParam = 1 }) => fetchAllStories({ page: pageParam as number, limit }),
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.currentPage > 1) {
          return firstPage.currentPage - 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }) as UseInfiniteQueryResult<{
      pages: StoriesResponse[];
      pageParams: unknown[];
    }, Error>;
  };

  const useStoriesWithPagination = (currentPage: number = 1) => {
    return useQuery({
      queryKey: ['stories-paginated', currentPage, limit],
      queryFn: () => fetchAllStories({ page: currentPage, limit }),
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      placeholderData: (previousData) => previousData,
    }) as UseQueryResult<StoriesResponse, Error>;
  };

  return {
    // Original methods (now deprecated in favor of React Query hooks)
    fetchStories,
    
    // React Query hooks
    useUserStories,
    useAllStories,
    useStoriesWithPagination,
    
    // Pagination state
    page,
    setPage,
    limit,
  };
};

// Helper hook for easier usage with flattened stories array
export const useStoriesData = () => {
  const { useAllStories } = useCustomHook();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useAllStories();

  // Flatten all pages into a single stories array
  const stories: Story[] = data?.pages.flatMap(page => page.data) || [];
  
  return {
    stories,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    totalStories: data?.pages[0]?.total || 0,
    totalPages: data?.pages[0]?.totalPages || 0,
  };
};

// Helper hook for regular pagination
export const usePaginatedStories = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { useStoriesWithPagination } = useCustomHook();
  
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useStoriesWithPagination(currentPage);

  return {
    stories: data?.data || [],
    currentPage,
    totalPages: data?.totalPages || 0,
    totalStories: data?.total || 0,
    setCurrentPage,
    error,
    isLoading,
    isFetching,
    isError,
    refetch,
    hasNextPage: currentPage < (data?.totalPages || 0),
    hasPreviousPage: currentPage > 1,
    goToNextPage: () => setCurrentPage(prev => prev + 1),
    goToPreviousPage: () => setCurrentPage(prev => Math.max(1, prev - 1)),
  };
};