/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, BookOpen, Home, Volume2, VolumeX, RotateCcw, Moon, Sun } from "lucide-react"
import Image from "next/image"
import { romanUrduPatterns, urduRegex } from "@/utils"

interface StoryReaderProps {
  story: any
  isOpen: boolean
  onClose: () => void
}

const StoryReader: React.FC<StoryReaderProps> = ({ story, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [pages, setPages] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const isUrduText = (text: string): boolean => {
    
    return urduRegex?.test(text)
  }

  const isRomanUrdu = (text: string): boolean => {
   
    
    let matches = 0
    romanUrduPatterns?.forEach(pattern => {
      const found = text.match(pattern)
      if (found) matches += found.length
    })
    
    return matches >= 2
  }

  // Initialize dark mode from system preference or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('storyReader-theme')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      setIsDarkMode(savedTheme === 'dark' || (!savedTheme && systemPrefersDark))
    }
  }, [])

  // Save theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('storyReader-theme', isDarkMode ? 'dark' : 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    if (story?.story) {
      const storyText = story.story.trim()
      
      if (!storyText) {
        setPages(['No story content available'])
        return
      }

      const isUrdu = isUrduText(storyText)
      const isRomanUrduText = isRomanUrdu(storyText)
      
      let sentences: string[]
      
      if (isUrdu) {
        sentences = storyText.split(/[۔؟!]+/).filter((s: string) => s.trim().length > 0)
      } else if (isRomanUrduText) {
        sentences = storyText.split(/[.!?]+/).filter((s: string) => s.trim().length > 0)
        const expandedSentences: string[] = []
        sentences.forEach(sentence => {
          const parts = sentence.split(/,\s+/).filter(part => part.trim().length > 0)
          if (parts.length > 1) {
            expandedSentences.push(...parts)
          } else {
            expandedSentences.push(sentence)
          }
        })
        sentences = expandedSentences
      } else {
        // English text
        sentences = storyText.split(/[.!?]+/).filter((s: string) => s.trim().length > 0)
      }

      const storyPages: string[] = []
      let currentPageText = ""
      
      const maxPageLength = isUrdu ? 150 : isRomanUrduText ? 200 : 250

      sentences.forEach((sentence: string) => {
        const trimmedSentence = sentence.trim()
        if (trimmedSentence) {
          const separator = currentPageText ? " " : ""
          let formattedSentence = trimmedSentence
          
          if (!isUrdu && !trimmedSentence.match(/[.!?]$/)) {
            formattedSentence += "."
          } else if (isUrdu && !trimmedSentence.match(/[۔؟!]$/)) {
            formattedSentence += "۔"
          }
          
          const potentialPage = currentPageText + separator + formattedSentence

          if (potentialPage.length > maxPageLength && currentPageText.length > 0) {
            storyPages.push(currentPageText)
            currentPageText = formattedSentence
          } else {
            currentPageText = potentialPage
          }
        }
      })

      // Add the last page if there's remaining content
      if (currentPageText.trim()) {
        storyPages.push(currentPageText)
      }

      // Fallback to original text if no pages were created
      setPages(storyPages.length > 0 ? storyPages : [storyText])
      setCurrentPage(0) // Reset to first page when story changes
    }
  }, [story])

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      // Stop reading when changing pages
      if (isReading) {
        window.speechSynthesis.cancel()
        setIsReading(false)
      }
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      // Stop reading when changing pages
      if (isReading) {
        window.speechSynthesis.cancel()
        setIsReading(false)
      }
    }
  }

  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      setCurrentPage(pageIndex)
      // Stop reading when changing pages
      if (isReading) {
        window.speechSynthesis.cancel()
        setIsReading(false)
      }
    }
  }

  const restartStory = () => {
    setCurrentPage(0)
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    }
  }

  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else {
      const currentText = pages[currentPage]
      if (!currentText || currentText.trim() === '') return

      const utterance = new SpeechSynthesisUtterance(currentText)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1.1
      utterance.volume = 1.0
      
      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      utterance.onerror = () => setIsReading(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Stop speech when component unmounts or dialog closes
  useEffect(() => {
    return () => {
      if (isReading) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isReading])

  useEffect(() => {
    if (!isOpen && isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    }
  }, [isOpen, isReading])

  const progress = pages.length > 0 ? ((currentPage + 1) / pages.length) * 100 : 0

  if (!story) return null

  // Check if current page text is Urdu (Arabic script or Roman Urdu) for styling
  const currentPageIsUrdu = pages[currentPage] ? (isUrduText(pages[currentPage]) || isRomanUrdu(pages[currentPage])) : false

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden w-[95vw] sm:w-full">
        <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-950 via-zinc-900 to-zinc-800' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} h-full transition-colors duration-300`}>
          {/* Header */}
          <DialogHeader className={`p-3 sm:p-6 pb-2 sm:pb-4 ${isDarkMode ? 'bg-zinc-800/90 backdrop-blur-sm border-zinc-700' : 'bg-white/80 backdrop-blur-sm border-b'} border-b transition-colors duration-300`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <DialogTitle className={`flex items-center gap-2 text-lg sm:text-2xl ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'} truncate flex-1 min-w-0`}>
                <BookOpen className={`h-4 w-4 sm:h-6 sm:w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} flex-shrink-0`} />
                <span className="truncate">{story.title}&apos;s Adventure</span>
              </DialogTitle>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  size="sm"
                  className={`${isDarkMode ? 'text-zinc-300 hover:bg-zinc-700 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100'} p-1 sm:p-2`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
                </Button>
                <Badge className={`${isDarkMode ? 'bg-slate-700 text-slate-200 border-slate-600' : 'bg-purple-100 text-purple-800 border-purple-200'} text-xs sm:text-sm px-1 sm:px-2`}>
                  {currentPage + 1}/{pages.length}
                </Badge>
                {currentPageIsUrdu && (
                  <Badge className={`${isDarkMode ? 'bg-emerald-800 text-emerald-200 border-emerald-700' : 'bg-green-100 text-green-800 border-green-200'} text-xs sm:text-sm px-1 sm:px-2 hidden sm:inline-flex`}>
                    {isUrduText(pages[currentPage] || '') ? 'اردو' : 'Roman Urdu'}
                  </Badge>
                )}
              </div>
            </div>
            <Progress 
              value={progress} 
              className={`w-full h-1 sm:h-2 mt-2 ${isDarkMode ? 'bg-zinc-700' : ''}`} 
            />
          </DialogHeader>

          {/* Story Content */}
          <div className="flex flex-col lg:flex-row h-[calc(95vh-120px)] sm:h-[calc(90vh-140px)]">
            {/* Story Image - Top on mobile, Left on desktop */}
            <div className="w-full lg:w-1/2 p-3 sm:p-6 flex items-center justify-center order-1 lg:order-1">
              <Card className={`w-full h-48 sm:h-64 lg:h-full ${isDarkMode ? 'shadow-xl border-zinc-700' : 'shadow-lg'} border-0 overflow-hidden transition-colors duration-300`}>
                <CardContent className="p-0 h-full relative">
                  {story.imageUrl ? (
                    <Image
                    width={200}
                    height={200}
                      src={story.imageUrl || "/placeholder"}
                      alt={`${story.title}'s story illustration`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className={`w-full h-full ${isDarkMode ? 'bg-gradient-to-br from-zinc-700 to-slate-700' : 'bg-gradient-to-br from-blue-200 to-purple-200'} flex items-center justify-center transition-colors duration-300`}>
                      <BookOpen className={`h-12 w-12 sm:h-16 sm:w-16 lg:h-24 lg:w-24 ${isDarkMode ? 'text-zinc-400' : 'text-white/50'}`} />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                    <Badge className={`${isDarkMode ? 'bg-zinc-700/90 text-zinc-200 shadow-md' : 'bg-white/90 text-zinc-800 shadow-md'} text-xs sm:text-sm`}>
                      {story.theme}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Story Text - Bottom on mobile, Right on desktop */}
            <div className="w-full lg:w-1/2 p-3 sm:p-6 flex flex-col order-2 lg:order-2 flex-1">
              <Card className={`flex-1 ${isDarkMode ? 'shadow-xl border-0 bg-zinc-800/90 backdrop-blur-sm' : 'shadow-lg border-0 bg-white/90 backdrop-blur-sm'} transition-colors duration-300`}>
                <CardContent className="p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-center">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className={`inline-flex items-center gap-2 ${isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-blue-100 text-blue-800'} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4`}>
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${isDarkMode ? 'bg-slate-500' : 'bg-blue-600'} rounded-full animate-pulse`}></span>
                      {currentPageIsUrdu ? `باب ${currentPage + 1}` : `Chapter ${currentPage + 1}`}
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
                    <p 
                      className={`text-sm sm:text-base lg:text-lg leading-relaxed ${isDarkMode ? 'text-zinc-100' : 'text-zinc-800'} text-center font-medium transition-colors duration-300 ${
                        isUrduText(pages[currentPage] || '') ? 'font-urdu text-right text-base sm:text-lg lg:text-xl leading-loose' : 
                        isRomanUrdu(pages[currentPage] || '') ? 'text-center text-sm sm:text-base lg:text-lg leading-relaxed' : ''
                      }`}
                      style={
                        isUrduText(pages[currentPage] || '') ? { 
                          fontFamily: 'Noto Nastaliq Urdu, Arial, sans-serif',
                          direction: 'rtl',
                          unicodeBidi: 'embed',
                          lineHeight: '2.2em',
                          textShadow: isDarkMode ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
                        } : isRomanUrdu(pages[currentPage] || '') ? {
                          lineHeight: '1.9em',
                          textShadow: isDarkMode ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                          fontStyle: 'italic'
                        } : {
                          lineHeight: '1.8em',
                          textShadow: isDarkMode ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                        }
                      }
                    >
                      {pages[currentPage] || 'Loading...'}
                    </p>
                  </div>

                  {/* Audio Controls - Only show for non-Urdu text (Roman Urdu and English supported) */}
                  {!isUrduText(pages[currentPage] || '') && (
                    <div className="flex justify-center mt-4 sm:mt-6">
                      <Button
                        onClick={toggleReading}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${isDarkMode ? 'bg-transparent border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:text-white' : 'bg-transparent border-zinc-300 text-zinc-700 hover:bg-zinc-100'} transition-colors duration-300 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2`}
                        disabled={!pages[currentPage] || pages[currentPage].trim() === ''}
                      >
                        {isReading ? (
                          <>
                            <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Stop Reading</span>
                            <span className="sm:hidden">Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">{isRomanUrdu(pages[currentPage] || '') ? 'Read Roman Urdu' : 'Read Aloud'}</span>
                            <span className="sm:hidden">Play</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-3 sm:mt-6 gap-2">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 sm:gap-2 ${isDarkMode ? 'bg-transparent border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:text-white' : 'bg-transparent border-zinc-300 text-zinc-700 hover:bg-zinc-100'} transition-colors duration-300 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''} px-2 sm:px-4 py-2 text-xs sm:text-sm`}
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{currentPageIsUrdu && isUrduText(pages[currentPage] || '') ? 'پچھلا' : 'Previous'}</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Button 
                    onClick={restartStory} 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center gap-1 sm:gap-2 ${isDarkMode ? 'text-zinc-300 hover:bg-zinc-700 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100'} transition-colors duration-300 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm`}
                  >
                    <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden lg:inline">{currentPageIsUrdu && isUrduText(pages[currentPage] || '') ? 'دوبارہ شروع' : 'Restart'}</span>
                  </Button>
                  <Button 
                    onClick={onClose} 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center gap-1 sm:gap-2 ${isDarkMode ? 'text-zinc-300 hover:bg-zinc-700 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100'} transition-colors duration-300 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm`}
                  >
                    <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden lg:inline">{currentPageIsUrdu && isUrduText(pages[currentPage] || '') ? 'بند کریں' : 'Close'}</span>
                  </Button>
                </div>

                <Button
                  onClick={nextPage}
                  disabled={currentPage === pages.length - 1}
                  size="sm"
                  className={`flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 ${currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''} px-2 sm:px-4 py-2 text-xs sm:text-sm`}
                >
                  <span className="hidden sm:inline">{currentPageIsUrdu && isUrduText(pages[currentPage] || '') ? 'اگلا' : 'Next'}</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>

              {/* Page Dots Indicator */}
              <div className="flex justify-center gap-1 sm:gap-2 mt-3 sm:mt-4 flex-wrap max-w-full px-2">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                      index === currentPage 
                        ? (isDarkMode ? 'bg-blue-500 scale-125' : 'bg-blue-600 scale-125')
                        : (isDarkMode ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-zinc-300 hover:bg-zinc-400')
                    }`}
                    aria-label={`Go to page ${index + 1}`}
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