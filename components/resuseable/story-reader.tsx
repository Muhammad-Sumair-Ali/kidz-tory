/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, BookOpen, Home, Volume2, VolumeX, RotateCcw } from "lucide-react"
import Image from "next/image"

interface StoryReaderProps {
  story: any
  isOpen: boolean
  onClose: () => void
}

const StoryReader: React.FC<StoryReaderProps> = ({ story, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [pages, setPages] = useState<string[]>([])

  // Split story into pages (approximately 150-200 characters per page for kids)
  useEffect(() => {
    if (story?.story) {
      const sentences = story.story.split(/[.!?]+/).filter((s: string) => s.trim().length > 0)
      const storyPages: string[] = []
      let currentPageText = ""

      sentences.forEach((sentence: string, ) => {
        const trimmedSentence = sentence.trim()
        if (trimmedSentence) {
          const potentialPage = currentPageText + (currentPageText ? ". " : "") + trimmedSentence + "."

          if (potentialPage.length > 200 && currentPageText.length > 0) {
            storyPages.push(currentPageText + ".")
            currentPageText = trimmedSentence
          } else {
            currentPageText = potentialPage.replace(/\.$/, "")
          }
        }
      })

      if (currentPageText.trim()) {
        storyPages.push(currentPageText + ".")
      }

      setPages(storyPages.length > 0 ? storyPages : [story.story])
    }
  }, [story])

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  const restartStory = () => {
    setCurrentPage(0)
  }

  // Text-to-speech functionality
  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(pages[currentPage])
      utterance.rate = 0.8
      utterance.pitch = 1.1
      utterance.onend = () => setIsReading(false)
      window.speechSynthesis.speak(utterance)
      setIsReading(true)
    }
  }

  const progress = ((currentPage + 1) / pages.length) * 100

  if (!story) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 bg-white/80 backdrop-blur-sm border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
                {story.title}&apos;s Adventure
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  Page {currentPage + 1} of {pages.length}
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="w-full h-2 mt-2" />
          </DialogHeader>

          {/* Story Content */}
          <div className="flex h-[calc(90vh-140px)]">
            {/* Story Image - Left Side */}
            <div className="w-1/2 p-6 flex items-center justify-center">
              <Card className="w-full h-full shadow-lg border-0 overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  {story.imageUrl ? (
                    <Image
                      fill
                      src={story.imageUrl || "/placeholder.svg"}
                      alt={`${story.title}'s story illustration`}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                      <BookOpen className="h-24 w-24 text-white/50" />
                    </div>
                  )}
                  {/* Story Theme Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 shadow-md">{story.theme}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Story Text - Right Side */}
            <div className="w-1/2 p-6 flex flex-col">
              <Card className="flex-1 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                      Chapter {currentPage + 1}
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg leading-relaxed text-gray-800 text-center font-medium">
                      {pages[currentPage]}
                    </p>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={toggleReading}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      {isReading ? (
                        <>
                          <VolumeX className="h-4 w-4" />
                          Stop Reading
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-4 w-4" />
                          Read Aloud
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  <Button onClick={restartStory} variant="ghost" size="sm" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Restart
                  </Button>
                  <Button onClick={onClose} variant="ghost" size="sm" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Close
                  </Button>
                </div>

                <Button
                  onClick={nextPage}
                  disabled={currentPage === pages.length - 1}
                  size="lg"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Page Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentPage ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StoryReader
