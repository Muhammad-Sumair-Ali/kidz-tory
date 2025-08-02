/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef, useCallback } from 'react';
import { Particle } from '@/types';

interface UseParticleAnimationOptions {
  particleCount?: number;
  particleColor?: string;
  particleOpacityRange?: [number, number];
  particleSizeRange?: [number, number];
  particleSpeedRange?: [number, number];
}

interface UseParticleAnimationReturn {
  canvasRef: any;
}

export const useParticleAnimation = (
  options: UseParticleAnimationOptions = {}
): UseParticleAnimationReturn => {
  const {
    particleCount = 50,
    particleColor = '124, 58, 237',
    particleOpacityRange = [0.2, 0.7],
    particleSizeRange = [1, 4],
    particleSpeedRange = [-1, 1]
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const initializeParticles = useCallback((width: number, height: number): void => {
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0],
        speedX: Math.random() * (particleSpeedRange[1] - particleSpeedRange[0]) + particleSpeedRange[0],
        speedY: Math.random() * (particleSpeedRange[1] - particleSpeedRange[0]) + particleSpeedRange[0],
        opacity: Math.random() * (particleOpacityRange[1] - particleOpacityRange[0]) + particleOpacityRange[0],
      });
    }
    
    particlesRef.current = particles;
  }, [particleCount, particleOpacityRange, particleSizeRange, particleSpeedRange]);

  const animate = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle: Particle) => {
      // Update particle position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap particles around screen edges
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [particleColor]);

  const updateCanvasSize = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeParticles(canvas.width, canvas.height);
  }, [initializeParticles]);

  const handleResize = useCallback((): void => {
    updateCanvasSize();
  }, [updateCanvasSize]);

  // Setup canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateCanvasSize();
    animate();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, updateCanvasSize, handleResize]);

  return { canvasRef };
};