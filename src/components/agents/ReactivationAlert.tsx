import React, { useState } from 'react';
import {
  UserX,
  TrendingDown,
  Mail,
  Send,
  Clock,
  Target,
  Zap,
  Calendar,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export interface DormantUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastActive: Date;
  daysDormant: number;
  previousEngagement: 'high' | 'medium' | 'low';
  role: string;
  topInterests: string[];
  potentialValue: number;
}

export interface ReactivationStrategy {
  id: string;
  title: string;
  description: string;
  successRate: number;
  estimatedImpact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  channels: ('email' | 'in-app' | 'slack')[];
  template?: string;
}

export interface ReactivationCampaign {
  id: string;
  name: string;
  targetUsers: number;
  strategy: ReactivationStrategy;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  scheduledDate?: Date;
  results?: {
    sent: number;
    opened: number;
    reactivated: number;
  };
}

interface ReactivationAlertProps {
  dormantUsers?: DormantUser[];
  onCreateCampaign?: (userIds: string[], strategyId: string) => Promise<void>;
  onSendNow?: (campaignId: string) => Promise<void>;
  className?: string;
}

const mockDormantUsers: DormantUser[] = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    lastActive: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    daysDormant: 45,
    previousEngagement: 'high',
    role: 'Analyst',
    topInterests: ['Consumer Trends', 'Social Media Analytics', 'Market Research'],
    potentialValue: 8500,
  },
  {
    id: 'u2',
    name: 'Michael Torres',
    email: 'michael.t@agency.com',
    lastActive: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    daysDormant: 30,
    previousEngagement: 'medium',
    role: 'Marketer',
    topInterests: ['Brand Analytics', 'Campaign Performance'],
    potentialValue: 6200,
  },
  {
    id: 'u3',
    name: 'Emma Watson',
    email: 'emma.watson@enterprise.com',
    lastActive: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    daysDormant: 60,
    previousEngagement: 'high',
    role: 'Executive',
    topInterests: ['Market Intelligence', 'Competitive Analysis', 'Strategic Insights'],
    potentialValue: 12000,
  },
];

const reactivationStrategies: ReactivationStrategy[] = [
  {
    id: 's1',
    title: 'New Features Highlight',
    description: 'Showcase recent platform updates and features they haven\'t seen',
    successRate: 42,
    estimatedImpact: 'high',
    effort: 'low',
    channels: ['email', 'in-app'],
    template: 'Hey {name}, we\'ve added some powerful new features since you last visited...',
  },
  {
    id: 's2',
    title: 'Personalized Insight Preview',
    description: 'Share AI-generated insights based on their previous interests',
    successRate: 58,
    estimatedImpact: 'high',
    effort: 'medium',
    channels: ['email', 'slack'],
    template: 'Hi {name}, we discovered some trends in {interests} that you might find valuable...',
  },
  {
    id: 's3',
    title: 'Limited-Time Value Offer',
    description: 'Provide exclusive access to premium content or features',
    successRate: 35,
    estimatedImpact: 'medium',
    effort: 'low',
    channels: ['email'],
    template: 'Welcome back! We\'re offering you exclusive early access to...',
  },
  {
    id: 's4',
    title: 'Peer Success Story',
    description: 'Share how similar users are achieving results with the platform',
    successRate: 48,
    estimatedImpact: 'high',
    effort: 'medium',
    channels: ['email', 'in-app'],
    template: 'See how {peer_company} is using GWI to drive {metric}% growth...',
  },
];

export const ReactivationAlert: React.FC<ReactivationAlertProps> = ({
  dormantUsers = mockDormantUsers,
  onCreateCampaign,
  onSendNow,
  className = '',
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [campaigns, setCampaigns] = useState<ReactivationCampaign[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === dormantUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(dormantUsers.map((u) => u.id));
    }
  };

  const handleCreateCampaign = async () => {
    if (!selectedStrategy || selectedUsers.length === 0) return;

    setIsCreating(true);
    try {
      await onCreateCampaign?.(selectedUsers, selectedStrategy);

      const strategy = reactivationStrategies.find((s) => s.id === selectedStrategy)!;
      const newCampaign: ReactivationCampaign = {
        id: Date.now().toString(),
        name: `${strategy.title} - ${new Date().toLocaleDateString()}`,
        targetUsers: selectedUsers.length,
        strategy,
        status: 'draft',
      };

      setCampaigns((prev) => [newCampaign, ...prev]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setSelectedUsers([]);
      setSelectedStrategy(null);
      setShowCampaignBuilder(false);
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const highValueUsers = dormantUsers.filter((u) => u.potentialValue > 8000);
  const criticalDormancy = dormantUsers.filter((u) => u.daysDormant > 45);

  return (
    <div className={`reactivation-alert ${className}`}>
      {/* Header with Alert Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-500 p-3 rounded-lg">
              <UserX className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-[#1f2937]">Dormant User Alert</h2>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  {dormantUsers.length} users at risk
                </span>
              </div>
              <p className="text-gray-600 mb-3">
                AI-powered reactivation strategies to bring back valuable users
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">
                    <strong>{criticalDormancy.length}</strong> dormant 45+ days
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">
                    <strong>{highValueUsers.length}</strong> high-value users
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">
                    <strong>${dormantUsers.reduce((sum, u) => sum + u.potentialValue, 0).toLocaleString()}</strong> potential recovery
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowCampaignBuilder(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors shadow-sm"
          >
            <Zap className="w-5 h-5" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
          <Check className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Campaign created successfully!</p>
        </div>
      )}

      {/* Dormant Users List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-[#1f2937]">Dormant Users</h3>
          <button
            onClick={handleSelectAll}
            className="text-sm text-[#ec4899] hover:text-[#db2777] font-medium"
          >
            {selectedUsers.length === dormantUsers.length ? 'Deselect all' : 'Select all'}
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {dormantUsers.map((user) => (
            <div
              key={user.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                selectedUsers.includes(user.id) ? 'bg-pink-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleToggleUser(user.id)}
                    className="mt-1 rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                  />
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img className="w-12 h-12 rounded-full" src={user.avatar} alt={user.name} />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
                        {getInitials(user.name)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-[#1f2937]">{user.name}</h4>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                        {user.role}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          user.previousEngagement === 'high'
                            ? 'bg-green-100 text-green-700'
                            : user.previousEngagement === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.previousEngagement} engagement
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Last active: {formatDate(user.lastActive)}</span>
                      </div>
                      <span>•</span>
                      <span className={user.daysDormant > 45 ? 'text-red-600 font-medium' : ''}>
                        {user.daysDormant} days dormant
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {user.topInterests.map((interest, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-500 mb-1">Potential value</div>
                  <div className="text-xl font-bold text-[#1f2937]">${user.potentialValue.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Builder Modal */}
      {showCampaignBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCampaignBuilder(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-[#1f2937]">Create Reactivation Campaign</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Target {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} with AI-optimized strategies
                </p>
              </div>
              <button
                onClick={() => setShowCampaignBuilder(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {selectedUsers.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No users selected</p>
                  <p className="text-sm text-gray-400 mt-2">Select users from the list to create a campaign</p>
                </div>
              ) : (
                <>
                  {/* Strategy Selection */}
                  <div>
                    <h3 className="font-semibold text-[#1f2937] mb-4">Select Reactivation Strategy</h3>
                    <div className="space-y-3">
                      {reactivationStrategies.map((strategy) => (
                        <label
                          key={strategy.id}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedStrategy === strategy.id
                              ? 'border-[#ec4899] bg-pink-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="strategy"
                            value={strategy.id}
                            checked={selectedStrategy === strategy.id}
                            onChange={() => setSelectedStrategy(strategy.id)}
                            className="sr-only"
                          />
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium text-[#1f2937]">{strategy.title}</h4>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    strategy.estimatedImpact === 'high'
                                      ? 'bg-green-100 text-green-700'
                                      : strategy.estimatedImpact === 'medium'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {strategy.estimatedImpact} impact
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1 text-gray-600">
                                  <BarChart3 className="w-4 h-4" />
                                  <span>{strategy.successRate}% success rate</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600">
                                  <Zap className="w-4 h-4" />
                                  <span>{strategy.effort} effort</span>
                                </div>
                              </div>
                            </div>
                            {selectedStrategy === strategy.id && (
                              <Check className="w-6 h-6 text-[#ec4899]" />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  {selectedStrategy && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-[#1f2937] mb-2">Message Preview</h4>
                      <p className="text-sm text-gray-600 italic">
                        {reactivationStrategies.find((s) => s.id === selectedStrategy)?.template}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowCampaignBuilder(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!selectedStrategy || selectedUsers.length === 0 || isCreating}
                className="flex items-center space-x-2 px-6 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Create Campaign</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Campaigns */}
      {campaigns.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-[#1f2937] mb-4">Recent Campaigns</h3>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-medium text-[#1f2937]">{campaign.name}</h4>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {campaign.targetUsers} users • {campaign.strategy.title}
                  </p>
                </div>
                <button className="flex items-center space-x-2 text-[#ec4899] hover:text-[#db2777] font-medium text-sm">
                  <span>View details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactivationAlert;
