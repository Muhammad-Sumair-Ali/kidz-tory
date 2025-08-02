/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useStoriesData } from "@/hooks/useFetch";
import { BookOpen, Heart, Sparkles, Star, Wand2 } from "lucide-react";
import StoryCard from "@/components/resuseable/StoryCard";
import StoryReader from "@/components/resuseable/story-reader";
import { hero_colors } from "@/helpers/colors";
import LoadingStoryCard from "@/components/resuseable/LoadingstoryCard";
import { FloatingShape } from "@/components/resuseable/HeroComponents";
import { useMouseTracking } from "@/hooks/useMouseTracking";

const AllStoriesPage: React.FC = () => {
  const mousePosition = useMouseTracking();
  const [storyReaderOpen, setStoryReaderOpen] = useState(false);
  const [currentReadingStory, setCurrentReadingStory] = useState<any>(null);

  const {
    stories,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useStoriesData();

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleReadStory = (story: any) => {
    setCurrentReadingStory(story);
    setStoryReaderOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-10" aria-hidden="true">
        <FloatingShape
          className="top-20 left-10 text-purple-400/20"
          delay={0}
          mousePosition={mousePosition}
        >
          <BookOpen size={60} />
        </FloatingShape>
        <FloatingShape
          className="top-40 right-20 text-pink-400/20"
          delay={1}
          mousePosition={mousePosition}
        >
          <Sparkles size={40} />
        </FloatingShape>
        <FloatingShape
          className="bottom-40 left-20 text-blue-400/20"
          delay={2}
          mousePosition={mousePosition}
        >
          <Wand2 size={50} />
        </FloatingShape>
        <FloatingShape
          className="bottom-20 right-40 text-yellow-400/20"
          delay={1.5}
          mousePosition={mousePosition}
        >
          <Star size={35} />
        </FloatingShape>
        <FloatingShape
          className="top-60 left-1/3 text-green-400/20"
          delay={0.5}
          mousePosition={mousePosition}
        >
          <Heart size={45} />
        </FloatingShape>
      </div>

      <div className="relative z-50  min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl relative">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-gray-200 text-4xl font-bold max-w-3xl mx-auto">
              Discover all the magical stories created with KidzTory AI
            </h1>
          </div>

           {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-center">{error.message}</p>
              <div className="text-center mt-2">
                <button
                  onClick={() => refetch()}
                  className="text-red-600 underline hover:text-red-800"
                >
                  Try again
                </button>
              </div>
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

          {isLoading && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {[1, 2, 3]?.map((_story: any, index) => (
                  <LoadingStoryCard key={index} />
                ))}
              </div>
            </>
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
          {/* Load More Stories - Loading State */}
          {isFetchingNextPage && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {[1, 2, 3]?.map((_, index) => (
                <LoadingStoryCard key={`loading-${index}`} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasNextPage && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:scale-105 hover:text-black transition-all gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {/* Decorative Elements for Kid-Friendly Theme */}
          <div className="absolute top-5 left-5 sm:top-10 sm:left-10 opacity-60 animate-spin-slow">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={hero_colors.accent}
              />
            </svg>
          </div>
          <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 opacity-60 animate-pulse">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill={hero_colors.secondary} />
            </svg>
          </div>
          <div className="absolute top-1/3 right-0 opacity-50 animate-bounce-slow">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.09 8.26L20 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L4 9.27L9.91 8.26L12 2Z"
                fill={hero_colors.primary}
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-10"
        aria-hidden="true"
      ></div>

      <StoryReader
        story={currentReadingStory}
        isOpen={storyReaderOpen}
        onClose={() => {
          setStoryReaderOpen(false);
          setCurrentReadingStory(null);
        }}
      />
    </div>
  );
};

export default AllStoriesPage;
