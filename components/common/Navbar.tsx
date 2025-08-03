"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  BookOpen,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserInitials } from "@/helpers";
import LoginDialog from "../LoginDialog";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

// Admin emails - you can modify this list
const ADMIN_EMAILS = [process.env.NEXT_PUBLIC_ADMIN_EMAIL];

const UserSection: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      alert("Failed to sign out");
    }
  };

  if (session && user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href={"/user-stories"}>
          <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4" />
            My Stories
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 h-auto hover:bg-gray-800/30 transition-colors bg-transparent border-none cursor-pointer">
            <Avatar className="w-10 h-10 border-2 border-purple-500/30">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback className="text-sm">
                {getUserInitials(user.name || "User")}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex items-center gap-3 p-4">
              <Avatar className="w-12 h-12 border-2 border-purple-500/30">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                <AvatarFallback className="text-sm">
                  {getUserInitials(user.name || "User")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-gray-400">
                  {user.email || ""}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="hover:bg-red-900/20"
            >
              <div className="flex items-center gap-3 text-red-400 hover:text-red-300">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return <LoginDialog />;
};

// Admin Link Component
const AdminLink: React.FC = () => {
  const { data: session } = useSession();
  
  // Check if current user is admin
  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);
  
  if (!isAdmin) {
    return null;
  }

  return (
    <Link href="/admin">
      <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors font-medium">
        <Settings className="w-4 h-4" />
        <span>Admin</span>
      </button>
    </Link>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const getThemeIcon = () => {
    if (!mounted) {
      return <Monitor className="h-4 w-4" />;
    }

    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "light":
        return <Sun className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };
  const toggleMenu = useCallback((): void => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all`}>
      <nav
        className="relative z-50 px-6 py-4 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI KidzTory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={"/features"}>
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Features
              </button>
            </Link>
            <Link href={"/how-it-works"}>
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                How it Works
              </button>
            </Link>
            <Link href={"/about"}>
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                About
              </button>
            </Link>
            
            <AdminLink />

            <UserSection />
            <div>
              {/* Theme Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 rounded-full bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-800/20 border border-white/20 dark:border-gray-700 backdrop-blur-sm transition-all duration-200"
                  >
                    {getThemeIcon()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-xl"
                >
                  <DropdownMenuItem
                    onClick={() => handleThemeChange("dark")}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                  >
                    <Moon className="h-4 w-4 text-teal-600" />
                    <span>Dark Mode</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg p-2"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link href={"/features"}>
              <button className="text-xl text-gray-300 hover:text-purple-400 transition-colors font-medium">
                Features
              </button>
            </Link>
            <Link href={"/how-it-works"}>
              <button className="text-xl text-gray-300 hover:text-purple-400 transition-colors font-medium">
                How it Works
              </button>
            </Link>
            <Link href={"/about"}>
              <button className="text-xl text-gray-300 hover:text-purple-400 transition-colors font-medium">
                About
              </button>
            </Link>
            <AdminLink />
            <div className="mt-8">
              <UserSection />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;