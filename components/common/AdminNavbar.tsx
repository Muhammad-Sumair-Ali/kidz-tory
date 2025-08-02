/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "../ui/button";
import { RefreshCw, Settings } from "lucide-react";

function AdminNavbar({
  period,
  handleRefresh,
  handlePeriodChange,
  isFetching,
}: any) {
  return (
    <div>
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
                <RefreshCw
                  className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
