/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import {
  Info,
  Sparkles,
  Globe,
  Palette,
  Heart,
  Users,
  Languages,
  Star,
  Play,
  Eye,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Copy,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { getMoodColor, getThemeColor } from "@/helpers/colors";
import { useState } from "react";

const StoryCard = ({ story, handleReadStory }: any) => {
  const [open, setOpen] = useState(false);

  // Social sharing functions
  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this amazing story: "${story.title}'s "!`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this amazing story: "${story.title}'s "! 📚✨`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out this amazing story: "${story.title}'s "! ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Amazing Story: ${story.title}'s `);
    const body = encodeURIComponent(`I found this wonderful story and thought you'd enjoy it!\n\nTitle: ${story.title}'s Adventure\nTheme: ${story.theme}\nMood: ${story.mood}\n\nRead it here: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Story link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.title}'s `,
          text: `Check out this amazing story: "${story.title}'s "!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };
  return (
    <div className="z-20">
      <Card
        key={story._id}
        className="group z-50 hover:shadow-xl transition-all duration-300 border-0 min-h-[540px] max-h-[540px] shadow-md bg-zinc-900 backdrop-blur-sm"
      >
        <CardHeader className="pb-3  h-[100px]">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-bold text-gray-200 group-hover:text-pink-600 transition-colors line-clamp-2">
              {story.title}&apos;s 
            </CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-40 group-hover:opacity-100 transition-opacity"
                >
                  <Info className="h-4 w-4 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Story Creation Details
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        {story.title}&apos;s Story
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Created with these magical ingredients:
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">World Setting</p>
                          <p className="text-sm text-gray-600">{story.world}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Palette className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Theme</p>
                          <Badge className={getThemeColor(story.theme)}>
                            {story.theme}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-pink-500" />
                        <div>
                          <p className="font-medium">Mood</p>
                          <Badge className={getMoodColor(story.mood)}>
                            {story.mood}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Age Group</p>
                          <p className="text-sm text-gray-600">
                            {story.ageGroup}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Languages className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Language</p>
                          <p className="text-sm text-gray-600">
                            {story.language}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-yellow-500 mt-1" />
                        <div>
                          <p className="font-medium">Favorite Things</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {story.favoriteThings.map(
                              (thing: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {thing}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h5 className="font-medium mb-2">The Complete Story</h5>
                      <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {story.story}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={getThemeColor(story.theme)} variant="outline">
              {story.theme}
            </Badge>
            <Badge className={getMoodColor(story.mood)} variant="outline">
              {story.mood}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {story.imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                width={360}
                height={200}
                src={story.imageUrl || "/placeholder"}
                alt="Story illustration"
                className="object-cover w-[400px] h-[210px] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="space-y-2">
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {story.story}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
              <span>{story.ageGroup}</span>
              <span>{story.language}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => handleReadStory(story)}
              className="flex-1 bg-gradient-to-r from-purple-700 to-pink-600 px-4 py-4 rounded-lg hover:from-purple-700 text-white"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Read Story
            </Button>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Eye className="h-4 w-4" />
              Details
            </Button>

            {/* Share Button with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
                <DropdownMenuItem 
                  onClick={handleNativeShare}
                  className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  Quick Share
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={shareToFacebook}
                  className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                >
                  <Facebook className="h-4 w-4 text-blue-500" />
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={shareToTwitter}
                  className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                >
                  <Twitter className="h-4 w-4 text-blue-400" />
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={shareToWhatsApp}
                  className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={shareViaEmail}
                  className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                >
                  <Mail className="h-4 w-4 text-red-500" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryCard;
