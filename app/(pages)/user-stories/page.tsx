/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, RefreshCw } from "lucide-react";
import StoryReader from "@/components/resuseable/story-reader";
import StoryCard from "@/components/resuseable/StoryCard";
import LoadingStoryCard from "@/components/resuseable/LoadingstoryCard";
import { useCustomHook } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";

const Results: React.FC = () => {
  const router = useRouter();
  const { data } = useSession();
  const { useUserStories } = useCustomHook(); 
  const [storyReaderOpen, setStoryReaderOpen] = useState(false);
  const [currentReadingStory, setCurrentReadingStory] = useState<any>(null);
  
  const {
    data: stories = [],
    isLoading: loading,
    error,
    refetch,
    isFetching,
  } = useUserStories(data?.user?.id ?? null);

  const handleCreateNewStory = () => {
    router.push("/");
  };

  const handleReadStory = (story: any) => {
    setCurrentReadingStory(story);
    setStoryReaderOpen(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white py-16 relative">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4">
              <p className="text-gray-200 text-4xl font-bold -mt-6 max-w-3xl mx-auto">
                Discover all the magical stories you&apos;ve created with KidzTory AI
              </p>
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isFetching}
                className="mt-2 p-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh stories"
              >
                <RefreshCw className={`h-5 w-5 ${isFetching ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-center">{error.message}</p>
              <div className="text-center mt-2">
                <button
                  onClick={handleRefresh}
                  className="text-red-600 underline hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {[1, 2, 3, 4, 5, 6]?.map((_, index) => (
                <LoadingStoryCard key={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && stories?.length === 0 && !error && (
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
              <Button
                onClick={handleCreateNewStory}
                size="lg"
                variant={"kids"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Story
              </Button>
            </div>
          )}

          {/* Stories Grid */}
          {!loading && stories?.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {stories.map((story: any) => (
                  <StoryCard
                    handleReadStory={handleReadStory}
                    story={story}
                    key={story._id}
                  />
                ))}
              </div>

              {/* Create New Story Button */}
              <div className="text-center">
                <Button
                  onClick={handleCreateNewStory}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Another Story
                </Button>
              </div>

              {/* Stories Count */}
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">
                  You have created {stories.length} magical {stories.length === 1 ? 'story' : 'stories'}
                </p>
              </div>
            </>
          )}

          {/* Background refresh indicator */}
          {isFetching && !loading && (
            <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
              Refreshing stories...
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

export default Results;