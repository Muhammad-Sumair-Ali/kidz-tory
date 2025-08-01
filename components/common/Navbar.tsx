"use client";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import LogoIcon from "./LogoIcon";
import { getUserInitials } from "@/helpers";
import LoginDialog from "../LoginDialog";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      alert("Signed out successfully");
    } catch {
      alert("Failed to sign out");
    }
  };

  // Show loading state during session loading
  if (status === "loading") {
    return (
      <header className="sticky top-0 left-0 right-0 bg-white z-50 transition-all border-b duration-300">
        <div className="max-w-[1230px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="p-1.5 rounded-md text-white">
                <LogoIcon />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="flex md:hidden items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full" disabled>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const user = session?.user;

  return (
    <header className="sticky top-0 left-0 right-0 bg-white z-50 transition-all border-b duration-300">
      <div className="max-w-[1230px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Alternative: Use div wrapper */}
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="p-1.5 rounded-md text-white">
              <LogoIcon />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {session && user ? (
              <>
                <Link href="/user-stories">
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-blue-500 via-purple-400 to-purple-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2 text-base"
                  >
                    <BookOpen className="w-5 h-5" />
                    My Stories
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 rounded-full p-1 h-auto"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback className="text-xs">
                          {getUserInitials(user.name || "User")}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback className="text-xs">
                          {getUserInitials(user.name || "User")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {user.name || "User"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.email || ""}
                        </span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <LoginDialog setMobileMenuOpen={() => {}} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {session && user ? (
              <>
                <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback>
                      {getUserInitials(user.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {user.name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.email || ""}
                    </span>
                  </div>
                </div>

                <Link
                  href="/user-stories"
                  className="flex items-center gap-2 p-3 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  My Stories
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 p-3 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-3 text-destructive hover:bg-destructive/10 rounded-md text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <LoginDialog setMobileMenuOpen={setMobileMenuOpen} />
            )}
          </div>
        </div>
      )}
    </header>
  );
}