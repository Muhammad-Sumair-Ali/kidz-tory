// Type definitions
export interface MousePosition {
  x: number;
  y: number;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export interface FloatingShapeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mousePosition: MousePosition;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  hoverColor: string;
}