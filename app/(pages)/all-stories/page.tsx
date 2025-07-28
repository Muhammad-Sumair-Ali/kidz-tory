import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';
import { StoryResponse } from '@/types/story-form';

const AllStories: React.FC = () => {
  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        // Mock userId (replace with actual userId from authentication)
        const userId = 'mock-user-id';
        const response = await axios.get(`/api/stories?userId=${userId}`);
        setStories(response.data);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to load stories. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">All Your Stories</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : stories.length === 0 ? (
          <p className="text-gray-700">No stories found. Create a new one!</p>
        ) : (
          <div className="space-y-4">
            {stories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <CardTitle>{story?.title}&apos;s Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{story.story}</p>
                  {story.imageUrl && (
                    <Image
                      width={200}
                      height={200}
                      src={story.imageUrl}
                      alt="Story illustration"
                      className="max-w-full h-auto rounded-lg mx-auto mt-4"
                    />
                  )}
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>World:</strong> {story.world}</p>
                    <p><strong>Theme:</strong> {story.theme}</p>
                    <p><strong>Mood:</strong> {story.mood}</p>
                    <p><strong>Age Group:</strong> {story.ageGroup}</p>
                    <p><strong>Language:</strong> {story.language}</p>
                    <p><strong>Favorite Things:</strong> {story.favoriteThings.join(', ')}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <Button onClick={handleBack} className="mt-4">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default AllStories; 