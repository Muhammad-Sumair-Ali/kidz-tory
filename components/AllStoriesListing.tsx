/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

import { useCustomHook } from "@/hooks/useFetch";
import { BookOpen } from "lucide-react";
import StoryCard from "@/components/resuseable/StoryCard";
import StoryReader from "@/components/resuseable/story-reader";

const AllStories: React.FC = () => {
  const [storyReaderOpen, setStoryReaderOpen] = useState(false);
  const [currentReadingStory, setCurrentReadingStory] = useState<any>(null);

  const { fetchAllStories, isLoading, stories, error, hasMore, page } =
    useCustomHook();

  const handleLoadMore = () => {
    fetchAllStories(page + 1);
  };

  const handleReadStory = (story: any) => {
    setCurrentReadingStory(story);
    setStoryReaderOpen(true);
  };
  useEffect(() => {
    fetchAllStories();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-gray-900 text-4xl font-bold max-w-3xl mx-auto">
              Discover all the magical stories created with KidzTory
              AI
            </h1>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && stories?.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No stories yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start your storytelling journey by creating your first magical
                story!
              </p>
            </div>
          )}

          {/* Stories Grid */}
          {!isLoading && stories?.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {stories?.map((story: any) => (
                  <StoryCard
                    handleReadStory={handleReadStory}
                    story={story}
                    key={story._id}
                  />
                ))}
              </div>
            </>
          )}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-2 text-white bg-teal-600 rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <StoryReader
        story={currentReadingStory}
        isOpen={storyReaderOpen}
        onClose={() => {
          setStoryReaderOpen(false);
          setCurrentReadingStory(null);
        }}
      />
    </>
  );
};

export default AllStories;
