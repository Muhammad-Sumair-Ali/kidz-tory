'use client';

import React from 'react';
import { 
  Heart, 
  Code, 
  Sparkles, 
  Users, 
  BookOpen, 
  Mail, 
  Github, 
  Linkedin, 
  Globe,
  Zap,
  Target,
  Award,
  Coffee,
  Lightbulb,
  Rocket,
  Star,
  ArrowRight,
  ExternalLink,
  Facebook
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DevImage from "@/images/developer.jpg"
import Image from 'next/image';
const AboutPage = () => {
  const techStack = [
    { name: 'Next.js 15', category: 'Frontend', color: 'from-blue-500 to-blue-600' },
    { name: 'React 19', category: 'Frontend', color: 'from-cyan-500 to-cyan-600' },
    { name: 'TypeScript', category: 'Language', color: 'from-blue-600 to-blue-700' },
    { name: 'Tailwind CSS', category: 'Styling', color: 'from-teal-500 to-teal-600' },
    { name: 'MongoDB', category: 'Database', color: 'from-green-500 to-green-600' },
    { name: 'NextAuth.js', category: 'Auth', color: 'from-purple-500 to-purple-600' },
    { name: 'Groq Llama-3.3-70B', category: 'AI', color: 'from-orange-500 to-orange-600' },
    { name: 'Stability AI', category: 'AI', color: 'from-pink-500 to-pink-600' },
    { name: 'Cloudinary', category: 'Storage', color: 'from-yellow-500 to-yellow-600' },
    { name: 'React Query', category: 'State', color: 'from-red-500 to-red-600' },
    { name: 'Zustand', category: 'State', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Radix UI', category: 'Components', color: 'from-violet-500 to-violet-600' }
  ];

  const achievements = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full Stack Development",
      description: "Expert in modern web technologies and frameworks",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Integration",
      description: "Specialized in integrating AI services for enhanced user experiences",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "User-Centric Design",
      description: "Focus on creating intuitive and accessible user interfaces",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Building fast, scalable, and efficient web applications",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const projectFeatures = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI-Powered Story Generation",
      description: "Advanced language models create unique, personalized stories"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Interactive Reading Experience",
      description: "Beautiful illustrations and engaging storytelling interface"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Multi-Language Support",
      description: "Stories available in English, Urdu, and Roman Urdu"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Child-Safe Content",
      description: "All content is filtered and age-appropriate for children"
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "muhammadsumair@gmail.com",
      link: "mailto:muhammadsumair@gmail.com",
      color: "text-blue-400"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/Muhammad-Sumair-Ali",
      link: "https://github.com/Muhammad-Sumair-Ali",
      color: "text-gray-400"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/muhammad-sumair",
      link: "https://www.linkedin.com/in/muhammad-sumair-b60a91301",
      color: "text-blue-500"
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      value: "@Muhammad Sumair",
      link: "https://www.facebook.com/m.sumair.jatoi",
      color: "text-sky-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-900/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-300 mb-6 border border-purple-800/50">
            <Heart size={16} />
            <span>Made with passion for children&apos;s education</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              About AI KidzTory
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empowering children&apos;s imagination through AI-generated stories and fostering a love for reading 
            in the digital age.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To revolutionize children&apos;s storytelling by combining cutting-edge AI technology with 
              educational content, creating personalized reading experiences that inspire and educate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Innovation in Education</h3>
                  <p className="text-gray-300">
                    We believe in using technology to enhance learning experiences, making education 
                    more engaging and accessible for children worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Global Accessibility</h3>
                  <p className="text-gray-300">
                    Breaking language barriers by providing stories in multiple languages, 
                    ensuring every child can enjoy personalized storytelling.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 ">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Quality & Safety</h3>
                  <p className="text-gray-300">
                    Every story is carefully crafted to be age-appropriate, educational, 
                    and safe for children of all ages.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">
                    {"Every child deserves a story that speaks to their heart and sparks their imagination."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                What Makes Us Special
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI KidzTory combines advanced technology with educational expertise to create 
              unique storytelling experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Meet the Developer
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate about creating technology that makes a difference in children&apos;s lives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="w-36 h-36 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Image src={DevImage} alt='Developer' width={100} height={100} priority className='rounded-full w-32 h-32' />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2">Muhammad Sumair</h3>
              <p className="text-xl text-purple-400 mb-4">Full Stack Developer</p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                A passionate full-stack developer with expertise in modern web technologies and AI integration. 
                Dedicated to creating innovative solutions that combine cutting-edge technology with meaningful 
                user experiences. Specialized in React, Next.js, Node.js, and AI-powered applications.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">React Expert</span>
                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-full text-sm">AI Integration</span>
                <span className="px-3 py-1 bg-pink-900/50 text-pink-300 rounded-full text-sm">TypeScript</span>
              </div>

              <div className="flex flex-wrap gap-4">
                {contactInfo.map((contact, index) => (
                  <Link
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 ${contact.color} hover:text-white transition-colors group`}
                  >
                    {contact.icon}
                    <span className="group-hover:underline">{contact.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-white mb-4">Expertise & Achievements</h4>
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center text-white`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-1">{achievement.title}</h5>
                      <p className="text-gray-300 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Built with Modern Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI KidzTory is built using the latest technologies to ensure performance, 
              scalability, and an exceptional user experience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{tech.name}</h4>
                <p className="text-gray-400 text-xs">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                3
              </div>
              <p className="text-gray-300">Languages Supported</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                ∞
              </div>
              <p className="text-gray-300">Unique Stories</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-gray-300">Child-Safe Content</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                24/7
              </div>
              <p className="text-gray-300">Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or want to collaborate? I&apos;d love to hear from you!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {contactInfo.map((contact, index) => (
              <Link
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center ${contact.color} group-hover:scale-110 transition-transform duration-300`}>
                    {contact.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-semibold">{contact.label}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{contact.value}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors ml-auto" />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button className="group bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25">
              <Coffee size={20} />
              <span>Buy me a coffee</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button className="group bg-gray-600/50 text-gray-200  backdrop-blur-sm border border-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700/50 transition-all duration-300 flex items-center space-x-2">
              <Star size={20} />
              <span>Star on GitHub</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;