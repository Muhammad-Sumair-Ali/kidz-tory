"use client";

import React from "react";
import {
  BookOpen,
  Sparkles,
  Users,
  Brain,
  Image as ImageIcon,
  Download,
  Share2,
  CheckCircle,
  Globe,
  Zap,
  Heart,
  Star,
  Shield,
  Clock,
  Palette,
  Volume2,
  Smartphone,
  Cloud,
  Award,
  Target,
  Lightbulb,
  PenTool,
  Settings,
  Lock,
} from "lucide-react";
import CTASection from "@/components/CTASection";

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-white" />,
      title: "Advanced AI Story Generation",
      description:
        "Powered by Groq Llama-3.3-70B and cutting-edge language models to create unique, engaging narratives.",
      gradient: "from-purple-500 to-blue-500",
      features: [
        "Contextually aware storytelling",
        "Age-appropriate content generation",
        "Multiple story genres and themes",
        "Adaptive narrative complexity",
        "Educational content integration",
      ],
    },
    {
      icon: <ImageIcon className="w-8 h-8 text-white" />,
      title: "Stunning AI Illustrations",
      description:
        "Every story comes with beautiful, custom-generated images that perfectly match your narrative.",
      gradient: "from-pink-500 to-purple-500",
      features: [
        "Stability AI SD3.5-Large-Turbo powered image generation",
        "Consistent character design",
        "Vibrant, child-friendly artwork",
        "Scene-specific illustrations",
        "High-resolution image quality",
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Personalized Content",
      description:
        "Stories that adapt to your child's interests, learning style, and developmental stage.",
      gradient: "from-green-500 to-teal-500",
      features: [
        "Interest-based customization",
        "Learning style adaptation",
        "Character preference integration",
        "Cultural sensitivity options",
        "Progressive difficulty levels",
      ],
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Multi-Language Support",
      description:
        "Create stories in 3 languages, making storytelling accessible to diverse audiences.",
      gradient: "from-blue-500 to-green-500",
      features: [
        "English language support",
        "Urdu language support",
        "Roman Urdu support",
        "Cultural context awareness",
        "Language learning integration",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download & Save",
      description:
        "Save your favorite stories for offline reading and build your personal library.",
      color: "text-blue-400",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Easy Sharing",
      description:
        "Share magical stories with family and friends across social platforms.",
      color: "text-green-400",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Child-Safe Content",
      description:
        "All content is filtered and verified to be appropriate for children.",
      color: "text-purple-400",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Generation",
      description: "Create complete illustrated stories in under 2 minutes.",
      color: "text-pink-400",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Art Style Options",
      description:
        "Choose from various illustration styles to match your preferences.",
      color: "text-orange-400",
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Audio Narration",
      description:
        "Listen to stories with AI-generated voice narration (coming soon).",
      color: "text-teal-400",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description:
        "Perfect reading experience on all devices - phone, tablet, or desktop.",
      color: "text-indigo-400",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Storage",
      description:
        "Your stories are safely stored in the cloud and accessible anywhere.",
      color: "text-cyan-400",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Educational Value",
      description:
        "Stories incorporate learning objectives and moral lessons naturally.",
      color: "text-yellow-400",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Age Targeting",
      description:
        "Content automatically adjusts for different age groups and reading levels.",
      color: "text-red-400",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Creative Prompts",
      description:
        "Get inspired with suggested story ideas and creative writing prompts.",
      color: "text-lime-400",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customizable Settings",
      description:
        "Fine-tune story length, complexity, and content preferences.",
      color: "text-violet-400",
    },
  ];

  const storyTypes = [
    {
      title: "Adventure Stories",
      description: "Exciting journeys and quests that spark imagination",
      icon: <Zap className="w-6 h-6" />,
      examples: [
        "Treasure hunts",
        "Space exploration",
        "Magical quests",
        "Time travel adventures",
      ],
    },
    {
      title: "Educational Tales",
      description: "Learning made fun through engaging narratives",
      icon: <BookOpen className="w-6 h-6" />,
      examples: [
        "Science concepts",
        "History lessons",
        "Math adventures",
        "Language learning",
      ],
    },
    {
      title: "Moral Stories",
      description: "Life lessons wrapped in entertaining stories",
      icon: <Heart className="w-6 h-6" />,
      examples: [
        "Friendship values",
        "Honesty lessons",
        "Kindness tales",
        "Courage stories",
      ],
    },
    {
      title: "Fantasy & Magic",
      description: "Magical worlds filled with wonder and possibility",
      icon: <Sparkles className="w-6 h-6" />,
      examples: [
        "Fairy tales",
        "Dragon adventures",
        "Magical creatures",
        "Enchanted forests",
      ],
    },
    {
      title: "Bedtime Stories",
      description: "Gentle, soothing tales perfect for winding down",
      icon: <Star className="w-6 h-6" />,
      examples: [
        "Peaceful adventures",
        "Dream journeys",
        "Cozy tales",
        "Sleepy animals",
      ],
    },
    {
      title: "Interactive Stories",
      description: "Stories where children can influence the outcome",
      icon: <Users className="w-6 h-6" />,
      examples: [
        "Choose your path",
        "Decision making",
        "Problem solving",
        "Character choices",
      ],
    },
  ];

  const benefits = [
    {
      title: "Boost Creativity",
      description:
        "Inspire children to think creatively and develop their imagination through unique storytelling.",
      icon: <PenTool className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Improve Reading Skills",
      description:
        "Encourage reading habits with personalized content that matches their interests and level.",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-blue-500 to-teal-500",
    },
    {
      title: "Build Confidence",
      description:
        "See themselves as heroes in stories, building self-esteem and confidence.",
      icon: <Award className="w-8 h-8" />,
      gradient: "from-green-500 to-blue-500",
    },
    {
      title: "Family Bonding",
      description:
        "Create shared reading experiences that bring families closer together.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-pink-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-900/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-300 mb-6 border border-purple-800/50">
            <Star size={16} />
            <span>Powerful Features for Magical Stories</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Features That Make
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stories Magical
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the comprehensive features that make AI KidzTory the
            ultimate platform for creating personalized, illustrated stories
            that children love.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Core Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The powerful capabilities that set AI KidzTory apart from
              traditional storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Additional Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Even more capabilities to enhance your storytelling experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Types */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Story Types & Genres
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create diverse stories across multiple genres and themes to match
              every child&apos;s interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storyTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{type.title}</h3>
                </div>

                <p className="text-gray-300 mb-4">{type.description}</p>

                <div className="space-y-2">
                  {type.examples.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="text-sm text-gray-400 bg-gray-700/30 rounded-lg px-3 py-1"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Benefits for Children
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How AI KidzTory helps children grow, learn, and develop through
              personalized storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Safety & Privacy First
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your child&apos;s safety and your family&apos;s privacy are our
              top priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Content Safety
              </h3>
              <p className="text-gray-300">
                All generated content is filtered and verified to be
                age-appropriate and safe for children.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Data Privacy
              </h3>
              <p className="text-gray-300">
                Your personal information and stories are encrypted and never
                shared with third parties.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Family Control
              </h3>
              <p className="text-gray-300">
                Parents have full control over content settings and can review
                all generated stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default FeaturesPage;
