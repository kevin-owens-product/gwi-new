import React, { useState, useEffect } from 'react';
import {
  Database,
  Zap,
  Bookmark,
  Clock,
  Search,
  Code,
  TrendingUp,
  Download,
  Share2,
  Filter,
  Play,
  FileText,
  Users,
  Globe,
  Calendar,
  Star,
  ChevronRight,
  BarChart3,
  Table as TableIcon,
} from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  description: string;
  recordCount: number;
  lastUpdated: Date;
  category: string;
  tags: string[];
  favorite: boolean;
}

interface QueryShortcut {
  id: string;
  name: string;
  description: string;
  category: 'audience' | 'trend' | 'competitive' | 'custom';
  icon: React.ReactNode;
  executionTime: string;
  useCount: number;
}

interface SavedAudience {
  id: string;
  name: string;
  size: number;
  criteria: string;
  lastModified: Date;
  shared: boolean;
  tags: string[];
}

interface AdvancedTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isPro: boolean;
}

interface RecentActivity {
  id: string;
  type: 'query' | 'export' | 'analysis' | 'share';
  title: string;
  timestamp: Date;
  details: string;
}

interface AnalystHomeProps {
  userName?: string;
  onDatasetSelect?: (datasetId: string) => void;
  onQueryExecute?: (queryId: string) => void;
  onAudienceSelect?: (audienceId: string) => void;
  onToolLaunch?: (toolId: string) => void;
  className?: string;
}

export const AnalystHome: React.FC<AnalystHomeProps> = ({
  userName = 'Analyst',
  onDatasetSelect,
  onQueryExecute,
  onAudienceSelect,
  onToolLaunch,
  className = '',
}) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [queryShortcuts, setQueryShortcuts] = useState<QueryShortcut[]>([]);
  const [savedAudiences, setSavedAudiences] = useState<SavedAudience[]>([]);
  const [advancedTools, setAdvancedTools] = useState<AdvancedTool[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadAnalystData();
  }, []);

  const loadAnalystData = async () => {
    // Simulate API call - replace with actual API integration
    setDatasets([
      {
        id: '1',
        name: 'Global Consumer Trends Q4 2024',
        description: 'Latest consumer behavior data across 50+ markets',
        recordCount: 2500000,
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'Consumer Trends',
        tags: ['Global', 'Q4', 'Trending'],
        favorite: true,
      },
      {
        id: '2',
        name: 'Social Media Engagement Metrics',
        description: 'Platform-specific engagement patterns and trends',
        recordCount: 1800000,
        lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000),
        category: 'Social Media',
        tags: ['Social', 'Engagement', 'Real-time'],
        favorite: false,
      },
      {
        id: '3',
        name: 'E-commerce Purchase Intent',
        description: 'Shopping behavior and purchase intent signals',
        recordCount: 3200000,
        lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000),
        category: 'E-commerce',
        tags: ['Shopping', 'Intent', 'Conversion'],
        favorite: true,
      },
    ]);

    setQueryShortcuts([
      {
        id: '1',
        name: 'Top Trending Topics',
        description: 'Identify emerging trends in your target market',
        category: 'trend',
        icon: <TrendingUp className="w-4 h-4" />,
        executionTime: '~2 min',
        useCount: 234,
      },
      {
        id: '2',
        name: 'Audience Demographics',
        description: 'Demographic breakdown of selected audience',
        category: 'audience',
        icon: <Users className="w-4 h-4" />,
        executionTime: '~1 min',
        useCount: 512,
      },
      {
        id: '3',
        name: 'Competitive Analysis',
        description: 'Compare performance against competitors',
        category: 'competitive',
        icon: <BarChart3 className="w-4 h-4" />,
        executionTime: '~3 min',
        useCount: 189,
      },
      {
        id: '4',
        name: 'Geographic Distribution',
        description: 'Analyze audience by region and country',
        category: 'audience',
        icon: <Globe className="w-4 h-4" />,
        executionTime: '~1 min',
        useCount: 301,
      },
    ]);

    setSavedAudiences([
      {
        id: '1',
        name: 'Tech-Savvy Millennials',
        size: 1250000,
        criteria: 'Age 25-40, Tech Interest, High Income',
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        shared: true,
        tags: ['Tech', 'Millennials', 'High-Value'],
      },
      {
        id: '2',
        name: 'Sustainable Shoppers',
        size: 890000,
        criteria: 'Eco-conscious, Purchase Intent, Urban',
        lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        shared: false,
        tags: ['Sustainability', 'Shopping', 'Urban'],
      },
      {
        id: '3',
        name: 'Gaming Enthusiasts 18-35',
        size: 2100000,
        criteria: 'Gaming Interest, Age 18-35, Active Engagement',
        lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        shared: true,
        tags: ['Gaming', 'Young Adults', 'Engaged'],
      },
    ]);

    setAdvancedTools([
      {
        id: '1',
        name: 'Custom Query Builder',
        description: 'Build complex queries with visual interface',
        icon: <Code className="w-5 h-5" />,
        category: 'Query',
        isPro: false,
      },
      {
        id: '2',
        name: 'Predictive Analytics',
        description: 'ML-powered trend forecasting and predictions',
        icon: <TrendingUp className="w-5 h-5" />,
        category: 'Analytics',
        isPro: true,
      },
      {
        id: '3',
        name: 'Data Export Suite',
        description: 'Export data in multiple formats with scheduling',
        icon: <Download className="w-5 h-5" />,
        category: 'Export',
        isPro: false,
      },
      {
        id: '4',
        name: 'API Playground',
        description: 'Test and prototype API integrations',
        icon: <Zap className="w-5 h-5" />,
        category: 'Developer',
        isPro: true,
      },
      {
        id: '5',
        name: 'Advanced Segmentation',
        description: 'Create sophisticated audience segments',
        icon: <Filter className="w-5 h-5" />,
        category: 'Audience',
        isPro: false,
      },
      {
        id: '6',
        name: 'Report Generator',
        description: 'Automated report creation and distribution',
        icon: <FileText className="w-5 h-5" />,
        category: 'Reporting',
        isPro: false,
      },
    ]);

    setRecentActivity([
      {
        id: '1',
        type: 'query',
        title: 'Audience Demographics Query',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        details: 'Tech-Savvy Millennials',
      },
      {
        id: '2',
        type: 'export',
        title: 'Data Export',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        details: 'Consumer Trends Q4 - CSV',
      },
      {
        id: '3',
        type: 'analysis',
        title: 'Trend Analysis',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        details: 'Top Trending Topics',
      },
    ]);
  };

  const toggleFavorite = (datasetId: string) => {
    setDatasets(datasets.map(dataset =>
      dataset.id === datasetId
        ? { ...dataset, favorite: !dataset.favorite }
        : dataset
    ));
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'query':
        return <Search className="w-4 h-4" />;
      case 'export':
        return <Download className="w-4 h-4" />;
      case 'analysis':
        return <BarChart3 className="w-4 h-4" />;
      case 'share':
        return <Share2 className="w-4 h-4" />;
    }
  };

  return (
    <div className={`analyst-home ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1f2937]">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-600 mt-1">
          Your data workspace is ready
        </p>
      </div>

      {/* Quick Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search datasets, audiences, queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899] text-[#1f2937]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Datasets */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Recent Datasets</h2>
              </div>
              <button className="text-[#ec4899] hover:text-[#db2777] text-sm font-medium flex items-center space-x-1">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {datasets.map((dataset) => (
                <div
                  key={dataset.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#ec4899] transition-colors cursor-pointer"
                  onClick={() => onDatasetSelect?.(dataset.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-[#1f2937]">{dataset.name}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(dataset.id);
                          }}
                          className="text-gray-400 hover:text-[#ec4899] transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 ${dataset.favorite ? 'fill-[#ec4899] text-[#ec4899]' : ''}`}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <TableIcon className="w-3 h-3" />
                          <span>{formatNumber(dataset.recordCount)} records</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Updated {formatTimeAgo(dataset.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    {dataset.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Query Shortcuts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Quick Queries</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {queryShortcuts.map((query) => (
                <button
                  key={query.id}
                  onClick={() => onQueryExecute?.(query.id)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#ec4899] hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-gray-100 group-hover:bg-pink-100 p-2 rounded-lg text-gray-600 group-hover:text-[#ec4899] transition-colors">
                      {query.icon}
                    </div>
                    <Play className="w-4 h-4 text-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold text-[#1f2937] mb-1">{query.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{query.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{query.executionTime}</span>
                    <span>{query.useCount} uses</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Saved Audiences */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Saved Audiences</h2>
              </div>
              <button className="text-[#ec4899] hover:text-[#db2777]">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {savedAudiences.map((audience) => (
                <div
                  key={audience.id}
                  onClick={() => onAudienceSelect?.(audience.id)}
                  className="border border-gray-200 rounded-lg p-3 hover:border-[#ec4899] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-[#1f2937]">{audience.name}</h4>
                    {audience.shared && (
                      <Share2 className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{audience.criteria}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-semibold text-[#ec4899]">
                      {formatNumber(audience.size)}
                    </span>
                    <span>{formatTimeAgo(audience.lastModified)}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    {audience.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border-2 border-[#ec4899] text-[#ec4899] rounded-lg hover:bg-[#ec4899] hover:text-white transition-colors font-medium">
              Create New Audience
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Recent Activity</h2>
              </div>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="bg-gray-100 p-2 rounded-lg text-gray-600 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1f2937]">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Tools */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#ec4899]" />
            <h2 className="text-xl font-bold text-[#1f2937]">Advanced Tools</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advancedTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolLaunch?.(tool.id)}
              className="border border-gray-200 rounded-lg p-4 hover:border-[#ec4899] hover:shadow-md transition-all text-left group relative"
            >
              {tool.isPro && (
                <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-[#ec4899] text-white rounded-full font-medium">
                  PRO
                </span>
              )}
              <div className="bg-gray-100 group-hover:bg-pink-100 p-3 rounded-lg text-gray-600 group-hover:text-[#ec4899] transition-colors w-fit mb-3">
                {tool.icon}
              </div>
              <h3 className="font-semibold text-[#1f2937] mb-1">{tool.name}</h3>
              <p className="text-xs text-gray-600">{tool.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalystHome;
