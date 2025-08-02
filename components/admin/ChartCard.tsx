import React from 'react';

interface ChartData {
  _id: string;
  count: number;
}

interface ChartCardProps {
  title: string;
  data: ChartData[];
  type: 'bar' | 'pie' | 'line';
  colors?: string[];
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  type,
  colors = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#3B82F6']
}) => {
  const maxValue = Math.max(...data.map(item => item.count));

  const renderBarChart = () => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={item._id} className="flex items-center space-x-3">
          <div className="w-20 text-sm text-gray-300 truncate">{item._id}</div>
          <div className="flex-1 bg-gray-700 rounded-full h-2 relative">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(item.count / maxValue) * 100}%`,
                backgroundColor: colors[index % colors.length]
              }}
            />
          </div>
          <div className="w-12 text-sm text-gray-300 text-right">{item.count}</div>
        </div>
      ))}
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    return (
      <div className="space-y-2">
        {data.map((item, index) => {
          const percentage = ((item.count / total) * 100).toFixed(1);
          return (
            <div key={item._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm text-gray-300">{item._id}</span>
              </div>
              <div className="text-sm text-gray-400">
                {item.count} ({percentage}%)
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLineChart = () => (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={item._id} className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-300">{item._id}</span>
          <span className="text-sm font-medium text-white">{item.count}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {data.length > 0 ? (
        <div>
          {type === 'bar' && renderBarChart()}
          {type === 'pie' && renderPieChart()}
          {type === 'line' && renderLineChart()}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No data available
        </div>
      )}
    </div>
  );
};

export default ChartCard;