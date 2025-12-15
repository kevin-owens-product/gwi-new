import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users,
  DollarSign,
  Target,
  Clock,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface KPI {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  unit?: string;
}

interface TrendAlert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: Date;
  category: string;
}

interface AISummary {
  id: string;
  title: string;
  content: string;
  confidence: number;
  generatedAt: Date;
  category: 'market' | 'audience' | 'competitive' | 'performance';
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  assignee?: string;
  completed: boolean;
}

interface ExecutiveHomeProps {
  userName?: string;
  organizationName?: string;
  onRefresh?: () => void;
  className?: string;
}

export const ExecutiveHome: React.FC<ExecutiveHomeProps> = ({
  userName = 'Executive',
  organizationName = 'Your Organization',
  onRefresh,
  className = '',
}) => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [trendAlerts, setTrendAlerts] = useState<TrendAlert[]>([]);
  const [aiSummaries, setAISummaries] = useState<AISummary[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  useEffect(() => {
    loadDashboardData();
  }, [selectedTimeframe]);

  const loadDashboardData = async () => {
    // Simulate API call - replace with actual API integration
    setKpis([
      {
        id: '1',
        label: 'Revenue',
        value: '$2.4M',
        change: 12.5,
        trend: 'up',
        icon: <DollarSign className="w-5 h-5" />,
        unit: 'USD',
      },
      {
        id: '2',
        label: 'Active Users',
        value: '45.2K',
        change: 8.3,
        trend: 'up',
        icon: <Users className="w-5 h-5" />,
      },
      {
        id: '3',
        label: 'Engagement Rate',
        value: '68%',
        change: -2.1,
        trend: 'down',
        icon: <Target className="w-5 h-5" />,
      },
      {
        id: '4',
        label: 'Market Share',
        value: '23.8%',
        change: 5.7,
        trend: 'up',
        icon: <BarChart3 className="w-5 h-5" />,
      },
    ]);

    setTrendAlerts([
      {
        id: '1',
        title: 'Competitor Activity Spike',
        description: 'Major competitor launched new product line in APAC region',
        severity: 'critical',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'Competitive',
      },
      {
        id: '2',
        title: 'Audience Shift Detected',
        description: '18-24 demographic showing 34% increase in engagement',
        severity: 'info',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        category: 'Audience',
      },
      {
        id: '3',
        title: 'Seasonal Trend Emerging',
        description: 'Early indicators suggest strong Q4 performance',
        severity: 'warning',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        category: 'Market',
      },
    ]);

    setAISummaries([
      {
        id: '1',
        title: 'Market Opportunity Analysis',
        content: 'Based on recent data, there is a significant opportunity in the health & wellness segment for ages 25-34. Consumer interest has grown 45% quarter-over-quarter, with particularly strong signals in sustainable and plant-based products.',
        confidence: 92,
        generatedAt: new Date(),
        category: 'market',
      },
      {
        id: '2',
        title: 'Audience Behavior Insights',
        content: 'Your core audience is increasingly engaging with video content (78% increase) and showing strong preference for short-form media. Mobile engagement peaks at 8-10 PM on weekdays.',
        confidence: 88,
        generatedAt: new Date(),
        category: 'audience',
      },
      {
        id: '3',
        title: 'Competitive Landscape Update',
        content: 'Three major competitors have reduced pricing in the mid-market segment. Historical patterns suggest this may signal market expansion rather than margin pressure.',
        confidence: 85,
        generatedAt: new Date(),
        category: 'competitive',
      },
    ]);

    setActionItems([
      {
        id: '1',
        title: 'Review APAC Strategy',
        description: 'Assess competitive response to new product launches',
        priority: 'high',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        assignee: 'Strategy Team',
        completed: false,
      },
      {
        id: '2',
        title: 'Approve Q4 Marketing Budget',
        description: 'Final review of seasonal campaign allocation',
        priority: 'high',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        id: '3',
        title: 'Stakeholder Presentation',
        description: 'Prepare board deck with latest market insights',
        priority: 'medium',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        assignee: 'Analytics Team',
        completed: false,
      },
    ]);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDashboardData();
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleActionItemToggle = (itemId: string) => {
    setActionItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const formatTimeAgo = (date: Date): string => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const getSeverityColor = (severity: TrendAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityColor = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryIcon = (category: AISummary['category']) => {
    switch (category) {
      case 'market':
        return <BarChart3 className="w-4 h-4" />;
      case 'audience':
        return <Users className="w-4 h-4" />;
      case 'competitive':
        return <Target className="w-4 h-4" />;
      case 'performance':
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className={`executive-home ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1f2937]">
              Welcome back, {userName}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening at {organizationName}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Timeframe Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['week', 'month', 'quarter'] as const).map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeframe === timeframe
                      ? 'bg-white text-[#1f2937] shadow-sm'
                      : 'text-gray-600 hover:text-[#1f2937]'
                  }`}
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </button>
              ))}
            </div>
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                {kpi.icon}
              </div>
              <div className={`flex items-center space-x-1 ${
                kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {kpi.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : kpi.trend === 'down' ? (
                  <TrendingDown className="w-4 h-4" />
                ) : null}
                <span className="text-sm font-semibold">
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-[#1f2937]">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* AI-Generated Summaries */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">AI Insights</h2>
              </div>
              <button className="text-[#ec4899] hover:text-[#db2777] text-sm font-medium flex items-center space-x-1">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {aiSummaries.map((summary) => (
                <div
                  key={summary.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#ec4899] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="text-[#ec4899]">
                        {getCategoryIcon(summary.category)}
                      </div>
                      <h3 className="font-semibold text-[#1f2937]">{summary.title}</h3>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span>{summary.confidence}% confident</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {summary.content}
                  </p>
                  <button className="text-[#ec4899] hover:text-[#db2777] text-sm font-medium flex items-center space-x-1">
                    <span>Read full analysis</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend Alerts */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Trend Alerts</h2>
              </div>
            </div>
            <div className="space-y-3">
              {trendAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-3 ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                  </div>
                  <p className="text-xs mb-2 opacity-90">
                    {alert.description}
                  </p>
                  <div className="flex items-center justify-between text-xs opacity-75">
                    <span>{alert.category}</span>
                    <span>{formatTimeAgo(alert.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Action Items</h2>
              </div>
            </div>
            <div className="space-y-3">
              {actionItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-3 hover:border-[#ec4899] transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleActionItemToggle(item.id)}
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-[#ec4899] border-[#ec4899]'
                          : 'border-gray-300 hover:border-[#ec4899]'
                      }`}
                    >
                      {item.completed && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold text-sm ${
                          item.completed ? 'line-through text-gray-400' : 'text-[#1f2937]'
                        }`}>
                          {item.title}
                        </h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        {item.assignee && <span>{item.assignee}</span>}
                        {item.dueDate && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.dueDate.toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveHome;
