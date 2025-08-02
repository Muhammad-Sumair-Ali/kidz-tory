'use client';

import React from 'react';
import { BookOpen, Sparkles, Wand2, Star, Play, ArrowRight,Heart } from 'lucide-react';
import { FeatureCard, FloatingShape } from '../resuseable/HeroComponents';
import { useMouseTracking } from '@/hooks/useMouseTracking';
import { features } from '@/utils/hero';
import { ParticleCanvas } from '../ParticleCanvas';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  const mousePosition = useMouseTracking();

  return (
    <div className=" bg-gray-950 py-12 text-white relative overflow-hidden">
      <ParticleCanvas />

      <div className="absolute inset-0 z-10" aria-hidden="true">
        <FloatingShape className="top-20 left-10 text-purple-400/20" delay={0} mousePosition={mousePosition}>
          <BookOpen size={60} />
        </FloatingShape>
        <FloatingShape className="top-40 right-20 text-pink-400/20" delay={1} mousePosition={mousePosition}>
          <Sparkles size={40} />
        </FloatingShape>
        <FloatingShape className="bottom-40 left-20 text-blue-400/20" delay={2} mousePosition={mousePosition}>
          <Wand2 size={50} />
        </FloatingShape>
        <FloatingShape className="bottom-20 right-40 text-yellow-400/20" delay={1.5} mousePosition={mousePosition}>
          <Star size={35} />
        </FloatingShape>
        <FloatingShape className="top-60 left-1/3 text-green-400/20" delay={0.5} mousePosition={mousePosition}>
          <Heart size={45} />
        </FloatingShape>
      </div>

     

      {/* Hero Section */}
      <main className="relative z-20  flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <header className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-purple-900/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-300 mb-6 border border-purple-800/50">
              <Sparkles size={16} aria-hidden="true" />
              <span>Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Stories Come Alive
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                With AI Magic
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create personalized, illustrated stories for your kids in seconds. 
              Watch their imagination soar with AI-generated tales and beautiful images.
            </p>
          </header>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Link href="/generate-story">
            <button 
              className="group bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
              <Wand2 size={20} aria-hidden="true" />
              <span>Create Your First Story</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
              </Link>
            <Link href="/all-stories">
            <button 
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700/50 transition-all duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
              <Play size={20} aria-hidden="true" />
              <span>Read AI-Generated Stories</span>
            </button>
              </Link>
          </div>

          {/* Features Preview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">Key Features</h2>
            {features?.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                hoverColor={feature.hoverColor}
              />
            ))}
          </section>
        </div>
      </main>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-10" aria-hidden="true"></div>
    </div>
  );
};

export default HeroSection;