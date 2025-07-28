"use client"
import {Menu, Plus, Search, X, User, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useAuth } from "@/context/useAuth"
import { useState } from "react"

import LogoIcon from "./LogoIcon"


export default function Navbar() {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      alert("Signed out successfully")
    } catch {
      alert("Failed to sign out")
    }
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 left-0 right-0 bg-white z-50 transition-all border-b duration-300">
      <div className="max-w-[1230px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl" prefetch={true}>
            <div className=" p-1.5 rounded-md text-white">
             <LogoIcon/>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            
            <Link href={user ? "/upload" : "/login"}>
              <Button variant="outline" size="sm" className="gap-2 rounded-full bg-transparent">
                <span>Generate story</span>
              </Button>
            </Link>

            {/* Desktop User Profile Dropdown */}
            {user?._id ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rounded-full p-1 h-auto">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.image || user.image} alt={user.fullName || "User"} />
                      <AvatarFallback className="text-xs">
                        {getUserInitials(user.fullName || user.fullName || "User")}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.image || user.image} alt={user.fullName || "User"} />
                      <AvatarFallback className="text-xs">
                        {getUserInitials(user.fullName || "User")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{user.fullName || "User"}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
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
            ) : (
              <Link href="/login">
                <Button className="rounded-full">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {user?._id && (
              <Link href="/upload">
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Plus className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="bg-muted/50 rounded-full pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {user?._id ? (
              <>
                <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.image || user.image} alt={user.fullName || "User"} />
                    <AvatarFallback>{getUserInitials(user.fullName || "User")}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.fullName || "User"}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>

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
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-2 p-3 text-destructive hover:bg-destructive/10 rounded-md text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
