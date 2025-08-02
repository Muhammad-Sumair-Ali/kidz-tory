/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useCallback, useEffect, useState } from 'react';
import { MousePosition } from '@/types';
import { useRouter } from 'next/navigation';

export const useMouseTracking = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};


interface UseNavigationReturn {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  handleGetStarted: () => void;
  handleNavClick: (section: string) => void;
}

export const useNavigation = (): UseNavigationReturn => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter()
  const toggleMenu = useCallback((): void => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
  }, []);

  const handleGetStarted = useCallback((): void => {
    router.push("/generate-story")
  }, []);

;

  const handleNavClick = useCallback(() => {
    closeMenu()
  }, [closeMenu]);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    handleGetStarted,
    handleNavClick
  };
};