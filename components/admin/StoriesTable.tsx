/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  Calendar,
  User,
  Globe,
  Users,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminHooks, Story as StoryType } from '@/hooks/useAdmin';

interface StoriesTableProps {
  onStorySelect?: (story: StoryType) => void;
}

const StoriesTable: React.FC<StoriesTableProps> = ({ onStorySelect }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const limit = 10;

  const { useAdminStories, useDeleteStory } = useAdminHooks();
  const { data, isLoading, error } = useAdminStories({
    page,
    limit,
    search,
    language,
    ageGroup,
    sortBy,
    sortOrder
  });

  const deleteStoryMutation = useDeleteStory();

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleLanguageFilter = (value: string) => {
    setLanguage(value);
    setPage(1);
  };

  const handleAgeGroupFilter = (value: string) => {
    setAgeGroup(value);
    setPage(1);
  };

  const handleDeleteStory = async (storyId: string, storyTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the story "${storyTitle}"?`)) {
      deleteStoryMutation.mutate(storyId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Helper function to render age groups safely
  const renderAgeGroups = (ageGroups: any) => {
    if (Array.isArray(ageGroups)) {
      return ageGroups.map((age, index) => (
        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-300">
          {age}
        </span>
      ));
    } else if (ageGroups) {
      // Handle case where ageGroup is a string (possibly JSON string)
      try {
        const parsed = typeof ageGroups === 'string' ? JSON.parse(ageGroups) : ageGroups;
        if (Array.isArray(parsed)) {
          return parsed.map((age, index) => (
            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-300">
              {age}
            </span>
          ));
        } else {
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-300">
              {parsed}
            </span>
          );
        }
      } catch {
        // If parsing fails, treat as string
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-300">
            {ageGroups}
          </span>
        );
      }
    } else {
      return <span className="text-gray-500 text-xs">No age group</span>;
    }
  };

  if (error) {
    return (
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        <div className="text-center text-red-400">
          Error loading stories: {(error as any)?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Stories Management</h3>
          <div className="text-sm text-gray-400">
            {data?.pagination.totalStories || 0} total stories
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search stories..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <select
            value={language}
            onChange={(e) => handleLanguageFilter(e.target.value)}
            className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Urdu">Urdu</option>
            <option value="Roman Urdu">Roman Urdu</option>
          </select>

          <select
            value={ageGroup}
            onChange={(e) => handleAgeGroupFilter(e.target.value)}
            className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white"
          >
            <option value="">All Age Groups</option>
            <option value="1-5">1-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-15">11-15 years</option>
            <option value="15 and above">15+ years</option>
          </select>

          <Button
            variant="outline"
            onClick={() => {
              setSearch('');
              setLanguage('');
              setAgeGroup('');
              setPage(1);
            }}
            className="border-gray-600 text-gray-300 hover:text-white"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/30">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span>Story</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('userId')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Author</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('language')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Language</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center space-x-1 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>Age Group</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Created</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-700/30">
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-48 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-32 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-20 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-16 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-24 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-8 w-16 rounded"></div>
                  </td>
                </tr>
              ))
            ) : data?.stories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No stories found
                </td>
              </tr>
            ) : (
              data?.stories?.map((story: StoryType) => (
                <tr 
                  key={story._id} 
                  className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors cursor-pointer"
                  onClick={() => onStorySelect?.(story)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{truncateText(story.title, 40)}</div>
                      <div className="text-gray-400 text-sm mt-1">{truncateText(story.story, 60)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {story.userId?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">{story.userId?.name || 'Unknown'}</div>
                        <div className="text-gray-500 text-xs">{story.userId?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300">
                      {story.language}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {renderAgeGroups(story.ageGroup)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(story.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStorySelect?.(story);
                        }}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteStory(story._id, story.title);
                        }}
                        disabled={deleteStoryMutation.isPending}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-700/50 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, data.pagination.totalStories)} of {data.pagination.totalStories} stories
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={!data.pagination.hasPreviousPage}
              className="text-gray-300 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm text-gray-300">
              Page {page} of {data.pagination.totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={!data.pagination.hasNextPage}
              className="text-gray-300 hover:text-white"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesTable;