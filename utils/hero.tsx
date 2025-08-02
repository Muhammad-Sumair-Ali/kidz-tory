import { PenTool, Users,Image as IconImage } from "lucide-react";

  // Feature data
  export const features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    hoverColor: string;
  }> = [
    {
      icon: <PenTool className="w-6 h-6 text-white" />,
      title: "AI Story Generation",
      description: "Create unique, engaging stories tailored to your child's interests and age.",
      gradient: "from-purple-500 to-blue-500",
      hoverColor: "border-purple-700/50"
    },
    {
      icon: <IconImage className="w-6 h-6 text-white" />,
      title: "Beautiful Illustrations",
      description: "Every story comes with stunning AI-generated images that bring the tale to life.",
      gradient: "from-pink-500 to-purple-500",
      hoverColor: "border-pink-700/50"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Personalized Content",
      description: "Stories adapt to your child's preferences, learning style, and favorite characters.",
      gradient: "from-green-500 to-teal-500",
      hoverColor: "border-green-700/50"
    }
  ];