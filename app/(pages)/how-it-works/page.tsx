'use client';

import React from 'react';
import { 
  Sparkles, 
  Users, 
  Brain, 
  Image as ImageIcon, 
  CheckCircle,
  Globe,
  Zap,
  Heart,
  Star
} from 'lucide-react';
import CTASection from '@/components/CTASection';

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Story Parameters",
      description: "Select your child's age, interests, favorite characters, and story theme. Our AI adapts to create age-appropriate content.",
      icon: <Users className="w-8 h-8 text-white" />,
      gradient: "from-purple-500 to-blue-500",
      details: [
        "Age-appropriate content selection",
        "Interest-based story themes",
        "Character customization",
        "Educational level adjustment"
      ]
    },
    {
      number: "02", 
      title: "AI Story Generation",
      description: "Our advanced AI models create unique, engaging narratives tailored specifically to your child's preferences and learning style.",
      icon: <Brain className="w-8 h-8 text-white" />,
      gradient: "from-blue-500 to-teal-500",
      details: [
        "Groq Llama-3.3-70B powered story creation",
        "Personalized narrative structure",
        "Educational content integration",
        "Moral lessons embedded naturally"
      ]
    },
    {
      number: "03",
      title: "Beautiful Illustration Creation", 
      description: "Each story comes with stunning AI-generated images that perfectly complement the narrative and bring characters to life.",
      icon: <ImageIcon className="w-8 h-8 text-white" />,
      gradient: "from-teal-500 to-green-500",
      details: [
        "Stability AI SD3.5-Large-Turbo powered image generation",
        "Consistent character design",
        "Vibrant, child-friendly artwork",
        "Scene-specific illustrations"
      ]
    },
    {
      number: "04",
      title: "Read, Share & Enjoy",
      description: "Your personalized story is ready! Read together, share with family, or save for bedtime reading.",
      icon: <Heart className="w-8 h-8 text-white" />,
      gradient: "from-green-500 to-pink-500",
      details: [
        "Interactive reading experience",
        "Easy sharing options",
        "Download for offline reading",
        "Build your story library"
      ]
    }
  ];

  const techStack = [
    {
      category: "AI & Machine Learning",
      technologies: [
        { name: "Groq Llama-3.3-70B", description: "Advanced language model for story generation" },
        { name: "Stability AI SD3.5-Large-Turbo", description: "AI image generation for illustrations" },
        { name: "Groq SDK", description: "Fast AI inference and processing" },
        { name: "AI SDK", description: "AI integration and processing" }
      ],
      icon: <Brain className="w-6 h-6" />,
      gradient: "from-purple-500 to-blue-500"
    },
    {
      category: "Frontend Development",
      technologies: [
        { name: "Next.js 15", description: "React framework with App Router" },
        { name: "React 19", description: "Latest React with concurrent features" },
        { name: "TypeScript", description: "Type-safe development" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" }
      ],
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-blue-500 to-teal-500"
    },
    {
      category: "Backend & Database",
      technologies: [
        { name: "MongoDB", description: "NoSQL database for story storage" },
        { name: "Mongoose", description: "MongoDB object modeling" },
        { name: "NextAuth.js", description: "Authentication solution" },
        { name: "Cloudinary", description: "Image storage and optimization" }
      ],
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-teal-500 to-green-500"
    },
    {
      category: "UI/UX & Design",
      technologies: [
        { name: "Shadcn UI", description: "Accessible component primitives" },
        { name: "Lucide React", description: "Beautiful icon library" },
        { name: "Framer Motion", description: "Smooth animations" },
        { name: "Next Themes", description: "Dark/light mode support" }
      ],
      icon: <Star className="w-6 h-6" />,
      gradient: "from-green-500 to-pink-500"
    }
  ];

  const languages = [
    "English", "Urdu", "Roman Urdu"
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-900/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-300 mb-6 border border-purple-800/50">
            <Sparkles size={16} />
            <span>AI-Powered Story Creation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              How AI KidzTory
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Creates Magic
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the technology and process behind creating personalized, illustrated stories 
            that spark imagination and learning in children worldwide.
          </p>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Story Creation Process
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From idea to illustrated story in just minutes - here&apos;s how our AI brings your child&apos;s imagination to life.
            </p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="text-6xl font-bold text-gray-800">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className={`w-full h-80 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-20 flex items-center justify-center`}>
                    <div className="text-8xl opacity-50">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Built with Cutting-Edge Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform leverages the latest in AI, web development, and cloud technologies 
              to deliver fast, reliable, and magical story creation experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStack.map((category, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="border-l-2 border-gray-600 pl-4">
                      <h4 className="text-lg font-semibold text-purple-300">{tech.name}</h4>
                      <p className="text-gray-400">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Support Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Stories in {languages.length}+ Languages
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI can generate beautiful stories in multiple languages, making storytelling 
              accessible to children around the world.
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {languages.map((language, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg px-4 py-2 text-center hover:bg-gray-600/50 transition-colors">
                  <span className="text-gray-300 font-medium">{language}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don&apos;t see your language? <span className="text-purple-400 font-semibold">Contact us</span> - we&apos;re always adding more!
              </p>
            </div>
          </div>
        </div>
      </section>

     <CTASection/>
    </div>
  );
};

export default HowItWorksPage;