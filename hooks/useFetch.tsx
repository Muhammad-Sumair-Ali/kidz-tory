/* eslint-disable @typescript-eslint/no-explicit-any */
import { Story } from "@/types/story-form";
import axios from "axios";
import { useState } from "react";

export const useCustomHook = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    fetchStories,
    stories,
    loading,
    error,
  };
};
