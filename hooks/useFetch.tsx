/* eslint-disable @typescript-eslint/no-explicit-any */
import { Story } from "@/types/story-form";
import axios from "axios";
import { useState } from "react";

export const useCustomHook = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchStories = async (userId: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/get-stories/${userId}`);
      setStories(res.data);
    } catch (err: any) {
      console.error("Error while getting stories:", err);
      setError(err?.response?.data?.error || "Failed to fetch stories.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStories = async (nextPage = 1) => {
    if (isLoading) return;
    if (nextPage > 1 && !hasMore) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(
        `/api/stories?page=${nextPage}&limit=${limit}`
      );
      const { success, data, totalPages } = res.data;

      if (success) {
        if (nextPage === 1) {
          setStories(data);
        } else {
          setStories((prev) => [...prev, ...data]);
        }
        setPage(nextPage);
        setHasMore(nextPage <= totalPages);
      } else {
        setError("Failed to load stories");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchStories,
    stories,
    loading,
    error,
    fetchAllStories,
    hasMore,
    page,
    isLoading,
  };
};
