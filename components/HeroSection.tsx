"use client";
import "@/styles/hero.css"
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { hero_colors } from "@/helpers/colors";


const HeroSection: React.FC = () => {


  return (
    <section
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-blue-100 to-purple-100"
      style={{ backgroundColor: hero_colors.background }}
    >
      <div className="container mx-auto text-center relative">
        <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 max-w-5xl mx-auto rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-12">
            <h1
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 animate-bounce-slow"
              style={{ color: hero_colors.text }}
            >
              Welcome to <span style={{ color: hero_colors.primary }}>KidzTory</span>
            </h1>
            <p
              className="text-base sm:text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-medium"
              style={{ color: hero_colors.text }}
            >
              Create magical AI-powered stories and colorful images with just a few clicks! Perfect for kids and families.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
                <BookOpen
                  className="w-8 h-8"
                  style={{ color: hero_colors.secondary }}
                />
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: hero_colors.text }}
                >
                  Magical Story Creator
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
                <ImageIcon
                  className="w-8 h-8"
                  style={{ color: hero_colors.accent }}
                />
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: hero_colors.text }}
                >
                  Vibrant AI Images
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
                <Sparkles
                  className="w-8 h-8"
                  style={{ color: hero_colors.primary }}
                />
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: hero_colors.text }}
                >
                  Fun for All Ages
                </span>
              </div>
            </div>

            <Link href="/generate-story">
              <Button
                variant={"kids"}
                className="hover:text-black z-50 bg-gradient-to-r from-blue-400 via-purple-400  to-purple-500 font-bold px-6 py-4 h-10  -mb-4 text-xl transition-all duration-300 transform hover:scale-110 shadow-md"
              >
                
               Create Your Story Now!
              </Button>
            </Link>
          </CardContent>
        </Card>

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

     
    </section>
  );
};

export default HeroSection;