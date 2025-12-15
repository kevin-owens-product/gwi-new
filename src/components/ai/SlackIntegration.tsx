import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Check,
  X,
  AlertCircle,
  Settings,
  Bell,
  TrendingUp,
  Sparkles,
  Mail,
  Clock,
  Hash,
  Users,
  Send,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export type NotificationType = 'insights' | 'alerts' | 'briefings' | 'anomalies' | 'recommendations';
export type NotificationFrequency = 'realtime' | 'hourly' | 'daily' | 'weekly';

export interface SlackChannel {
  id: string;
  name: string;
  isPrivate: boolean;
  memberCount?: number;
}

export interface SlackWorkspace {
  id: string;
  name: string;
  domain: string;
  icon?: string;
}

export interface SlackNotificationConfig {
  enabled: boolean;
  channel: string;
  notificationTypes: NotificationType[];
  frequency: NotificationFrequency;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  minimumPriority: 'all' | 'medium' | 'high' | 'critical';
}

interface SlackIntegrationProps {
  userId: string;
  onConnect?: (workspace: SlackWorkspace) => Promise<void>;
  onDisconnect?: () => Promise<void>;
  onConfigChange?: (config: SlackNotificationConfig) => Promise<void>;
  onTestNotification?: () => Promise<void>;
  className?: string;
}

const notificationTypeIcons: Record<NotificationType, React.ReactNode> = {
  insights: <Sparkles className="w-5 h-5" />,
  alerts: <Bell className="w-5 h-5" />,
  briefings: <Mail className="w-5 h-5" />,
  anomalies: <TrendingUp className="w-5 h-5" />,
  recommendations: <Check className="w-5 h-5" />,
};

const notificationTypeLabels: Record<NotificationType, string> = {
  insights: 'AI Insights',
  alerts: 'Critical Alerts',
  briefings: 'Daily Briefings',
  anomalies: 'Data Anomalies',
  recommendations: 'Recommendations',
};

const notificationTypeDescriptions: Record<NotificationType, string> = {
  insights: 'Automated insights and discoveries from your data',
  alerts: 'High-priority alerts that need immediate attention',
  briefings: 'Scheduled intelligence digests and summaries',
  anomalies: 'Unusual patterns and trends detected in your data',
  recommendations: 'AI-powered suggestions for actions and optimizations',
};

// Mock data
const mockWorkspace: SlackWorkspace = {
  id: 'T12345',
  name: 'GWI Team',
  domain: 'gwi-team',
  icon: '🚀',
};

const mockChannels: SlackChannel[] = [
  { id: 'C001', name: 'general', isPrivate: false, memberCount: 42 },
  { id: 'C002', name: 'analytics', isPrivate: false, memberCount: 12 },
  { id: 'C003', name: 'insights', isPrivate: false, memberCount: 8 },
  { id: 'C004', name: 'marketing-team', isPrivate: true, memberCount: 15 },
  { id: 'C005', name: 'data-alerts', isPrivate: false, memberCount: 6 },
];

export const SlackIntegration: React.FC<SlackIntegrationProps> = ({
  userId,
  onConnect,
  onDisconnect,
  onConfigChange,
  onTestNotification,
  className = '',
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [workspace, setWorkspace] = useState<SlackWorkspace | null>(null);
  const [channels, setChannels] = useState<SlackChannel[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [config, setConfig] = useState<SlackNotificationConfig>({
    enabled: true,
    channel: '',
    notificationTypes: ['insights', 'alerts', 'briefings'],
    frequency: 'realtime',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
    minimumPriority: 'medium',
  });

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      // Simulate OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await onConnect?.(mockWorkspace);
      setWorkspace(mockWorkspace);
      setChannels(mockChannels);
      setIsConnected(true);
      if (!config.channel && mockChannels.length > 0) {
        handleConfigUpdate({ channel: mockChannels[0].id });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Slack');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    setError(null);
    try {
      await onDisconnect?.();
      setIsConnected(false);
      setWorkspace(null);
      setChannels([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect from Slack');
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleConfigUpdate = async (updates: Partial<SlackNotificationConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    try {
      await onConfigChange?.(newConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update configuration');
    }
  };

  const handleTestNotification = async () => {
    setIsTesting(true);
    setError(null);
    setTestSuccess(false);
    try {
      await onTestNotification?.();
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send test notification');
    } finally {
      setIsTesting(false);
    }
  };

  const toggleNotificationType = (type: NotificationType) => {
    const newTypes = config.notificationTypes.includes(type)
      ? config.notificationTypes.filter((t) => t !== type)
      : [...config.notificationTypes, type];
    handleConfigUpdate({ notificationTypes: newTypes });
  };

  const selectedChannel = channels.find((c) => c.id === config.channel);

  return (
    <div className={`slack-integration ${className}`}>
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
              <MessageSquare className={`w-8 h-8 ${isConnected ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1f2937]">Slack Integration</h2>
              <p className="text-gray-600 mt-1">
                Get AI insights and alerts delivered directly to your Slack workspace
              </p>
              {isConnected && workspace && (
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Connected to {workspace.name}
                    </span>
                  </div>
                  {selectedChannel && (
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Hash className="w-4 h-4" />
                      <span>{selectedChannel.name}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            {!isConnected ? (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="flex items-center space-x-2 px-6 py-3 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors disabled:opacity-50 shadow-sm"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    <span>Connect to Slack</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {isDisconnecting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Disconnecting...</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    <span>Disconnect</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {testSuccess && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-green-800">Test notification sent successfully! Check your Slack channel.</p>
          </div>
        )}
      </div>

      {/* Configuration Settings */}
      {isConnected && (
        <>
          {/* Channel Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#1f2937] mb-4">Notification Channel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select channel
                </label>
                <select
                  value={config.channel}
                  onChange={(e) => handleConfigUpdate({ channel: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                >
                  <option value="">Choose a channel...</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name} {channel.isPrivate ? '🔒' : ''} ({channel.memberCount} members)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => handleConfigUpdate({ enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4899]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {config.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                  <button
                    onClick={handleTestNotification}
                    disabled={isTesting || !config.channel}
                    className="flex items-center space-x-2 px-4 py-2 text-[#ec4899] border border-pink-300 rounded-lg hover:bg-pink-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTesting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Test notification</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Types */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#1f2937] mb-4">Notification Types</h3>
            <div className="space-y-3">
              {(Object.keys(notificationTypeIcons) as NotificationType[]).map((type) => (
                <label
                  key={type}
                  className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={config.notificationTypes.includes(type)}
                    onChange={() => toggleNotificationType(type)}
                    className="mt-1 rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center space-x-2">
                      {notificationTypeIcons[type]}
                      <span className="font-medium text-[#1f2937]">{notificationTypeLabels[type]}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notificationTypeDescriptions[type]}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#1f2937] mb-4">Advanced Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Frequency
                </label>
                <select
                  value={config.frequency}
                  onChange={(e) => handleConfigUpdate({ frequency: e.target.value as NotificationFrequency })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                >
                  <option value="realtime">Real-time (as they occur)</option>
                  <option value="hourly">Hourly digest</option>
                  <option value="daily">Daily digest</option>
                  <option value="weekly">Weekly digest</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Priority
                </label>
                <select
                  value={config.minimumPriority}
                  onChange={(e) => handleConfigUpdate({ minimumPriority: e.target.value as SlackNotificationConfig['minimumPriority'] })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                >
                  <option value="all">All priorities</option>
                  <option value="medium">Medium and above</option>
                  <option value="high">High and above</option>
                  <option value="critical">Critical only</option>
                </select>
              </div>

              {/* Quiet Hours */}
              <div className="md:col-span-2">
                <label className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={config.quietHours.enabled}
                    onChange={(e) =>
                      handleConfigUpdate({
                        quietHours: { ...config.quietHours, enabled: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Enable quiet hours</span>
                </label>
                {config.quietHours.enabled && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Start time</label>
                      <input
                        type="time"
                        value={config.quietHours.start}
                        onChange={(e) =>
                          handleConfigUpdate({
                            quietHours: { ...config.quietHours, start: e.target.value },
                          })
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">End time</label>
                      <input
                        type="time"
                        value={config.quietHours.end}
                        onChange={(e) =>
                          handleConfigUpdate({
                            quietHours: { ...config.quietHours, end: e.target.value },
                          })
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-[#ec4899] mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#1f2937]">
                  <strong>Pro tip:</strong> Create a dedicated channel like #gwi-insights to keep your notifications organized.
                  You can also use @mentions in notification settings to alert specific team members.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Not Connected State */}
      {!isConnected && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#1f2937] mb-2">Connect your Slack workspace</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get instant notifications about insights, alerts, and anomalies directly in your Slack channels.
            Never miss important updates from your data.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Real-time alerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Custom channels</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Smart digests</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlackIntegration;
