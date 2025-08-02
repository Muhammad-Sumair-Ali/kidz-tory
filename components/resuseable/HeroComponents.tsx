"use client"
import { FeatureCardProps, FloatingShapeProps } from "@/types";
import React from "react";

export const FloatingShape: React.FC<FloatingShapeProps> = ({ 
  children, 
  className = '', 
  delay = 0, 
  mousePosition 
}) => (
  <div 
    className={`absolute animate-pulse ${className}`}
    style={{
      animationDelay: `${delay}s`,
      transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
      transition: 'transform 0.3s ease-out'
    }}
  >
    {children}
  </div>
);

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  gradient, 
  hoverColor 
}) => (
  <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:${hoverColor} transition-all duration-300 group`}>
    <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);