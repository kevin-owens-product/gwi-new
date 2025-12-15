import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Mail, Bell, TrendingUp, Users, Target, Zap, ChevronRight, Settings, Download, RefreshCw } from 'lucide-react';

export type BriefingFrequency = 'daily' | 'weekly' | 'monthly';
export type InsightCategory = 'trends' | 'audience' | 'competitive' | 'opportunities';
export type InsightPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Insight {
  id: string;
  category: InsightCategory;
  priority: InsightPriority;
  title: string;
  summary: string;
  metric?: {
    value: string;
    change: number;
    trend: 'up' | 'down' | 'stable';
  };
  actionable: boolean;
  timestamp: Date;
  source: string;
}

export interface BriefingConfig {
  frequency: BriefingFrequency;
  deliveryTime: string;
  emailEnabled: boolean;
  slackEnabled: boolean;
  categories: InsightCategory[];
}

interface AIBriefingProps {
  userId: string;
  onConfigChange?: (config: BriefingConfig) => void;
  onInsightClick?: (insightId: string) => void;
  className?: string;
}

const categoryIcons: Record<InsightCategory, React.ReactNode> = {
  trends: <TrendingUp className="w-5 h-5" />,
  audience: <Users className="w-5 h-5" />,
  competitive: <Target className="w-5 h-5" />,
  opportunities: <Zap className="w-5 h-5" />,
};

const categoryColors: Record<InsightCategory, string> = {
  trends: 'bg-purple-100 text-purple-700',
  audience: 'bg-blue-100 text-blue-700',
  competitive: 'bg-orange-100 text-orange-700',
  opportunities: 'bg-green-100 text-green-700',
};

const priorityColors: Record<InsightPriority, string> = {
  critical: 'border-red-500 bg-red-50',
  high: 'border-orange-500 bg-orange-50',
  medium: 'border-yellow-500 bg-yellow-50',
  low: 'border-gray-300 bg-white',
};

// Mock data for demonstration
const mockInsights: Insight[] = [
  {
    id: '1',
    category: 'trends',
    priority: 'critical',
    title: 'Emerging trend: Sustainable Tech adoption surging',
    summary: 'Interest in sustainable technology has increased 47% week-over-week among millennials. This represents a significant shift in consumer priorities that could impact your product positioning.',
    metric: {
      value: '47%',
      change: 47,
      trend: 'up',
    },
    actionable: true,
    timestamp: new Date(),
    source: 'GWI Core Q4 2024',
  },
  {
    id: '2',
    category: 'audience',
    priority: 'high',
    title: 'Target audience expanding into Gen Z',
    summary: 'Your core audience segments are showing 32% overlap with Gen Z digital behaviors. Consider adjusting messaging to capture this emerging demographic.',
    metric: {
      value: '32%',
      change: 12,
      trend: 'up',
    },
    actionable: true,
    timestamp: new Date(),
    source: 'GWI USA 2024',
  },
  {
    id: '3',
    category: 'competitive',
    priority: 'medium',
    title: 'Competitor brand awareness declining',
    summary: 'Main competitor brand recognition down 8% this quarter. Market opportunity to increase share of voice in key demographics.',
    metric: {
      value: '-8%',
      change: -8,
      trend: 'down',
    },
    actionable: true,
    timestamp: new Date(),
    source: 'GWI Brand Lift Study',
  },
  {
    id: '4',
    category: 'opportunities',
    priority: 'high',
    title: 'Untapped market: Health & Wellness crossover',
    summary: 'Analysis reveals 64% of your target audience shows high interest in health and wellness products—a potential partnership or expansion opportunity.',
    metric: {
      value: '64%',
      change: 5,
      trend: 'stable',
    },
    actionable: true,
    timestamp: new Date(),
    source: 'GWI Custom Research',
  },
];

export const AIBriefing: React.FC<AIBriefingProps> = ({
  userId,
  onConfigChange,
  onInsightClick,
  className = '',
}) => {
  const [config, setConfig] = useState<BriefingConfig>({
    frequency: 'daily',
    deliveryTime: '09:00',
    emailEnabled: true,
    slackEnabled: false,
    categories: ['trends', 'audience', 'competitive', 'opportunities'],
  });
  const [insights, setInsights] = useState<Insight[]>(mockInsights);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory | 'all'>('all');

  const filteredInsights = insights.filter(
    (insight) => selectedCategory === 'all' || insight.category === selectedCategory
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleConfigUpdate = (updates: Partial<BriefingConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className={`ai-briefing ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="bg-[#ec4899] p-3 rounded-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1f2937]">AI Intelligence Briefing</h2>
              <p className="text-gray-600 mt-1">
                Your personalized digest of actionable insights • Updated {formatTime(new Date())}
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="inline-flex items-center space-x-1 text-sm text-gray-700">
                  <Calendar className="w-4 h-4" />
                  <span className="capitalize">{config.frequency} delivery</span>
                </span>
                {config.emailEnabled && (
                  <span className="inline-flex items-center space-x-1 text-sm text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>Email enabled</span>
                  </span>
                )}
                {config.slackEnabled && (
                  <span className="inline-flex items-center space-x-1 text-sm text-gray-700">
                    <Bell className="w-4 h-4" />
                    <span>Slack enabled</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 text-gray-600 hover:text-[#ec4899] hover:bg-white rounded-lg transition-colors disabled:opacity-50"
              aria-label="Refresh insights"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:text-[#ec4899] hover:bg-white rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white text-[#1f2937] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-[#1f2937] mb-4">Briefing Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={config.frequency}
                  onChange={(e) => handleConfigUpdate({ frequency: e.target.value as BriefingFrequency })}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                <input
                  type="time"
                  value={config.deliveryTime}
                  onChange={(e) => handleConfigUpdate({ deliveryTime: e.target.value })}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Channels</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.emailEnabled}
                      onChange={(e) => handleConfigUpdate({ emailEnabled: e.target.checked })}
                      className="rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.slackEnabled}
                      onChange={(e) => handleConfigUpdate({ slackEnabled: e.target.checked })}
                      className="rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Slack</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#ec4899] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Insights ({insights.length})
        </button>
        {(['trends', 'audience', 'competitive', 'opportunities'] as InsightCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-[#ec4899] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryIcons[category]}
            <span className="capitalize">{category}</span>
            <span className="text-xs">
              ({insights.filter((i) => i.category === category).length})
            </span>
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No insights available for this category</p>
          </div>
        ) : (
          filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className={`bg-white border-l-4 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                priorityColors[insight.priority]
              }`}
              onClick={() => onInsightClick?.(insight.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[insight.category]}`}>
                      {categoryIcons[insight.category]}
                      <span className="capitalize">{insight.category}</span>
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      insight.priority === 'critical' ? 'bg-red-100 text-red-700' :
                      insight.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {insight.priority.toUpperCase()}
                    </span>
                    {insight.actionable && (
                      <span className="px-2.5 py-1 bg-pink-100 text-[#ec4899] rounded-full text-xs font-medium">
                        Actionable
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-2">{insight.title}</h3>
                  <p className="text-gray-600 mb-4">{insight.summary}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatDate(insight.timestamp)}</span>
                    <span>•</span>
                    <span>{insight.source}</span>
                  </div>
                </div>
                {insight.metric && (
                  <div className="ml-6 text-right">
                    <div className="text-3xl font-bold text-[#1f2937] mb-1">{insight.metric.value}</div>
                    <div className={`flex items-center justify-end space-x-1 text-sm font-medium ${
                      insight.metric.trend === 'up' ? 'text-green-600' :
                      insight.metric.trend === 'down' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {insight.metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                      {insight.metric.trend === 'down' && <TrendingUp className="w-4 h-4 rotate-180" />}
                      <span>{Math.abs(insight.metric.change)}%</span>
                    </div>
                  </div>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <strong>{filteredInsights.length}</strong> insights •{' '}
            <strong>{filteredInsights.filter((i) => i.actionable).length}</strong> actionable opportunities
          </div>
          <button className="flex items-center space-x-2 text-sm font-medium text-[#ec4899] hover:text-[#db2777]">
            <span>View full analysis</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIBriefing;
