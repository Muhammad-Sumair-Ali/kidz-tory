import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  Play, Eye } from "lucide-react"

const LoadingStoryCard = () => {
  return (
    <div>
      <Card className="group border-0 shadow-md bg-zinc-900 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            </CardTitle>
            
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="w-16 h-6 bg-gray-500 rounded animate-pulse" variant="outline" />
            <Badge className="w-16 h-6 bg-gray-500 rounded animate-pulse" variant="outline" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-700 " />
          <div className="space-y-2">
            <div className="text-gray-700 text-sm leading-relaxed line-clamp-3 space-y-1">
              <div className="h-4 w-full bg-gray-500 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-500 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-500 rounded animate-pulse" />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <div className="h-4 w-1/4 bg-gray-500 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-gray-500 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1 bg-gray-500 animate-pulse text-transparent" size="sm" disabled>
              <Play className="h-4 w-4 mr-2 text-transparent" />
              Read Story
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-gray-200 animate-pulse text-transparent"
              disabled
            >
              <Eye className="h-4 w-4 text-transparent" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingStoryCard
