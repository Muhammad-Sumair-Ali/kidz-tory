/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";
import StoryReader from "@/components/resuseable/story-reader";
import StoryCard from "@/components/resuseable/StoryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  BookOpen, 
  Home, 
  Share2, 
  RefreshCw,
  Heart,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMoodColor, getThemeColor } from "@/helpers/colors";
import toast from "react-hot-toast";

const StoryResultPage = () => {
  const router = useRouter();
  const generatedStory = useAppStore((state: any) => state.generatedStory);
  const clearGeneratedStory = useAppStore((state: any) => state.clearGeneratedStory);
  
  const [storyReaderOpen, setStoryReaderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If no generated story, redirect to create story page
    if (!isLoading && !generatedStory) {
      router.push("/generate-story");
    }
  }, [generatedStory, isLoading, router]);

  const handleReadStory = () => {
    setStoryReaderOpen(true);
  };

  const handleCreateAnother = () => {
    clearGeneratedStory();
    router.push("/generate-story");
  };

  const handleGoToMyStories = () => {
    clearGeneratedStory();
    router.push("/user-stories");
  };

  const handleShareStory = async () => {
    if (navigator.share && generatedStory) {
      try {
        await navigator.share({
          title: `${generatedStory.title}'s Adventure`,
          text: generatedStory.story.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success("Story link copied to clipboard!");
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Story link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <Card className="bg-gray-800/50 backdrop-blur-md shadow-2xl border border-gray-700/50 max-w-4xl mx-auto rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              <div className="flex flex-col items-center gap-6">
                <div className="animate-spin h-16 w-16 border-4 border-purple-600 border-t-transparent rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Preparing your magical story...</h2>
                <p className="text-gray-300">Just a moment while we set everything up!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!generatedStory) {
    return null; // Will redirect in useEffect
  }

  return (
    <section className="min-h-screen w-full p-4 sm:p-8 bg-gray-950 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
            <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Story is Ready!
            </h1>
            <Sparkles className="w-10 h-10 text-pink-400 animate-pulse" />
          </div>
          <p className="text-lg text-gray-300 mb-6">
            🎉 Congratulations! Your magical adventure has been created
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={handleReadStory}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read Story Now
            </Button>
            <Button
              onClick={handleShareStory}
              variant="outline"
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Story
            </Button>
          </div>
        </div>

        {/* Story Preview Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Story Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <StoryCard 
                story={generatedStory} 
                handleReadStory={handleReadStory}
              />
            </div>
          </div>

          {/* Story Details */}
          <Card className="bg-gray-800/50 backdrop-blur-md shadow-2xl border border-gray-700/50 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Story Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Title</h3>
                  <p className="text-gray-300">{generatedStory.title}&apos;s Adventure</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Theme & Mood</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getThemeColor(Array.isArray(generatedStory?.theme) ? generatedStory.theme[0] : generatedStory?.theme)}>
                      {Array.isArray(generatedStory?.theme) ? generatedStory.theme.join(", ") : generatedStory?.theme}
                    </Badge>
                    <Badge className={getMoodColor(Array.isArray(generatedStory?.mood) ? generatedStory.mood[0] : generatedStory?.mood)}>
                      {Array.isArray(generatedStory?.mood) ? generatedStory.mood.join(", ") : generatedStory?.mood}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Story World</h3>
                  <p className="text-gray-300">{generatedStory.world}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Language & Age Group</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-gray-300 border-gray-500">
                      {generatedStory.language}
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-500">
                      {generatedStory.ageGroup}
                    </Badge>
                  </div>
                </div>
                
                {generatedStory.favoriteThings && (
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Favorite Things</h3>
                    <p className="text-gray-300">{generatedStory.favoriteThings}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons Section */}
        <Card className="bg-gray-800/50 backdrop-blur-md shadow-2xl border border-gray-700/50 rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-red-400" />
              What would you like to do next?
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <Button
                onClick={handleCreateAnother}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl flex flex-col items-center gap-2"
              >
                <RefreshCw className="w-8 h-8" />
                <span className="font-semibold">Create Another Story</span>
              </Button>
              
              <Button
                onClick={handleGoToMyStories}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl flex flex-col items-center gap-2"
              >
                <BookOpen className="w-8 h-8" />
                <span className="font-semibold">View My Stories</span>
              </Button>
              
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white p-6 rounded-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center gap-2"
              >
                <Home className="w-8 h-8" />
                <span className="font-semibold">Go Home</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-30 animate-spin-slow">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="#F472B6"
            />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 opacity-30 animate-pulse">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FBBF24" />
          </svg>
        </div>
      </div>

      {/* Story Reader Modal */}
      <StoryReader
        story={generatedStory}
        isOpen={storyReaderOpen}
        onClose={() => setStoryReaderOpen(false)}
      />
    </section>
  );
};

export default StoryResultPage;