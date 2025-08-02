/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  Calendar,
  BookOpen,
  Mail,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminHooks, User as UserType } from '@/hooks/useAdmin';

interface UsersTableProps {
  onUserSelect?: (user: UserType) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ onUserSelect }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const limit = 10;

  const { useAdminUsers, useDeleteUser } = useAdminHooks();
  const { data, isLoading, error } = useAdminUsers({
    page,
    limit,
    search,
    sortBy,
    sortOrder
  });

  const deleteUserMutation = useDeleteUser();

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

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This will also delete all their stories.`)) {
      deleteUserMutation.mutate(userId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        <div className="text-center text-red-400">
          Error loading users: {(error as any)?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Users Management</h3>
          <div className="text-sm text-gray-400">
            {data?.pagination.totalUsers || 0} total users
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/30">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>User</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('storyCount')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Stories</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Joined</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-gray-300">Last Story</th>
              <th className="px-6 py-3 text-right text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-700/30">
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-32 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-48 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-8 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-24 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-4 w-24 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-600 h-8 w-8 rounded"></div>
                  </td>
                </tr>
              ))
            ) : data?.users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              data?.users.map((user: UserType) => (
                <tr 
                  key={user._id} 
                  className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors cursor-pointer"
                  onClick={() => onUserSelect?.(user)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name || 'Unknown'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300">
                      {user.storyCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {user.lastStoryDate ? formatDate(user.lastStoryDate) : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user._id, user.name);
                      }}
                      disabled={deleteUserMutation.isPending}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, data.pagination.totalUsers)} of {data.pagination.totalUsers} users
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

export default UsersTable;