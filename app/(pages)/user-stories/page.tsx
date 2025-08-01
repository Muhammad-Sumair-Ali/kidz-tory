/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus} from "lucide-react"
import { useCustomHook } from "@/hooks/useFetch"
import { useAuth } from "@/context/useAuth"
import StoryReader from "@/components/resuseable/story-reader"
import StoryCard from "@/components/resuseable/StoryCard"


const Results: React.FC = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { fetchStories, stories, loading, error } = useCustomHook()
  const [storyReaderOpen, setStoryReaderOpen] = useState(false)
  const [currentReadingStory, setCurrentReadingStory] = useState<any>(null)

  useEffect(() => {
    if (!user?._id) return
    fetchStories(user._id)
  }, [user?._id])

  const handleCreateNewStory = () => {
    router.push("/")
  }

  const handleReadStory = (story: any) => {
    setCurrentReadingStory(story)
    setStoryReaderOpen(true)
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading your magical stories...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover all the magical stories you&apos;ve created with KidzTory AI
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && stories?.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No stories yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start your storytelling journey by creating your first magical story!
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
                 <StoryCard handleReadStory={handleReadStory} story={story} key={story._id} />
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
            </>
          )}
        </div>
      </div>

      <StoryReader
        story={currentReadingStory}
        isOpen={storyReaderOpen}
        onClose={() => {
          setStoryReaderOpen(false)
          setCurrentReadingStory(null)
        }}
      />
    </>
  )
}

export default Results
