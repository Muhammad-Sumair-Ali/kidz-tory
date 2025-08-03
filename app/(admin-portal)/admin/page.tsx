'use client';

import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity,
  Calendar,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  Globe
} from 'lucide-react';
import { useAdminHooks } from '@/hooks/useAdmin';
import StatsCard from '@/components/admin/StatsCard';
import ChartCard from '@/components/admin/ChartCard';
import UsersTable from '@/components/admin/UsersTable';
import StoriesTable from '@/components/admin/StoriesTable';
import SettingsPanel from '@/components/admin/SettingsPanel';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'stories' | 'settings'>('overview');
  const [period, setPeriod] = useState(30);
  
  const { useAdminStats } = useAdminHooks();
  const { data: stats, isLoading, error, refetch, isFetching } = useAdminStats(period);

  const handleRefresh = () => {
    refetch();
  };

  const handlePeriodChange = (newPeriod: number) => {
    setPeriod(newPeriod);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Dashboard</h1>
          <p className="text-gray-400 mb-4">Failed to load admin statistics</p>
          <Button onClick={handleRefresh} className="bg-purple-600 hover:bg-purple-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Period Selector */}
              <select
                value={period}
                onChange={(e) => handlePeriodChange(Number(e.target.value))}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-md text-sm text-white"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={365}>Last year</option>
              </select>
              
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isFetching}
                className="border-gray-700 text-gray-300 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'users'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Users</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'stories'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Stories</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                    <div className="animate-pulse">
                      <div className="bg-gray-600 h-4 w-24 rounded mb-2"></div>
                      <div className="bg-gray-600 h-8 w-16 rounded mb-2"></div>
                      <div className="bg-gray-600 h-3 w-20 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Users"
                  value={stats.overview.totalUsers.toLocaleString()}
                  change={stats.overview.userGrowthRate}
                  changeLabel={`vs last ${period} days`}
                  icon={Users}
                  color="bg-gradient-to-r from-blue-500 to-blue-600"
                />
                <StatsCard
                  title="Total Stories"
                  value={stats.overview.totalStories.toLocaleString()}
                  change={stats.overview.storyGrowthRate}
                  changeLabel={`vs last ${period} days`}
                  icon={BookOpen}
                  color="bg-gradient-to-r from-purple-500 to-purple-600"
                />
                <StatsCard
                  title="New Users"
                  value={stats.overview.recentUsers.toLocaleString()}
                  changeLabel={`last ${period} days`}
                  icon={TrendingUp}
                  color="bg-gradient-to-r from-green-500 to-green-600"
                />
                <StatsCard
                  title="Avg Stories/User"
                  value={stats.overview.avgStoriesPerUser.toFixed(1)}
                  icon={Activity}
                  color="bg-gradient-to-r from-pink-500 to-pink-600"
                />
              </div>
            )}

            {/* Charts */}
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                    <div className="animate-pulse">
                      <div className="bg-gray-600 h-6 w-32 rounded mb-4"></div>
                      <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="bg-gray-600 h-4 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : stats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard
                  title="Stories by Language"
                  data={stats.charts.storiesByLanguage}
                  type="pie"
                />
                <ChartCard
                  title="Stories by Age Group"
                  data={stats.charts.storiesByAgeGroup}
                  type="bar"
                />
                <ChartCard
                  title="Stories by Theme"
                  data={stats.charts.storiesByTheme}
                  type="bar"
                />
                <ChartCard
                  title="Stories by Mood"
                  data={stats.charts.storiesByMood}
                  type="pie"
                />
              </div>
            )}

            {/* Top Users */}
            {stats && stats.topUsers.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Top Story Creators</h3>
                <div className="space-y-3">
                  {stats.topUsers.map((user, index) => (
                    <div key={user._id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.userName}</div>
                          <div className="text-gray-400 text-sm">{user.userEmail}</div>
                        </div>
                      </div>
                      <div className="text-purple-400 font-semibold">
                        {user.storyCount} stories
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Stats Chart */}
            {stats && stats.charts.dailyStats.length > 0 && (
              <ChartCard
                title={`Daily Story Creation (Last ${period} days)`}
                data={stats.charts.dailyStats.map(stat => ({
                  _id: new Date(stat._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                  count: stat.stories
                }))}
                type="line"
              />
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <UsersTable />
        )}

        {activeTab === 'stories' && (
          <StoriesTable />
        )}

        {activeTab === 'settings' && (
          <SettingsPanel />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;