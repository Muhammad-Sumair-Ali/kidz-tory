"use client"
import React from 'react';
import { useParticleAnimation } from '@/hooks/useParticleAnimation';

interface ParticleCanvasProps {
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  particleColor?: string;
  particleOpacityRange?: [number, number];
  particleSizeRange?: [number, number];
  particleSpeedRange?: [number, number];
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  className = "absolute inset-0 z-0",
  style = { background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' },
  ...animationOptions
}) => {
  const { canvasRef } = useParticleAnimation(animationOptions);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
};