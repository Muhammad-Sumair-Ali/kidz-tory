"use client"

import { ArrowRight, BookOpen, Wand2 } from "lucide-react"
import Link from "next/link"

const CTASection = () => {
  return (
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Experience All Features Today
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of families who are already enjoying personalized, illustrated stories 
            with all these amazing features.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href={"/generate-story"}>
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25">
              <Wand2 size={20} />
              <span>Start Creating Stories</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            <Link href={"/all-stories"}>
            <button className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700/50 transition-all duration-300 flex items-center space-x-2">
              <BookOpen size={20} />
              <span>View Sample Stories</span>
            </button>
            </Link>
          </div>
        </div>
      </section>

  )
}

export default CTASection
