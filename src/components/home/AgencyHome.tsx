import React, { useState, useEffect } from 'react';
import {
  Building2,
  ChevronDown,
  Check,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  FileText,
  Calendar,
  AlertCircle,
  Plus,
  Settings,
  Eye,
  Download,
  Share2,
  BarChart3,
  Clock,
  Palette,
  Globe,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  status: 'active' | 'paused' | 'churned';
  monthlyValue: number;
  activeCampaigns: number;
  teamSize: number;
  lastActivity: Date;
  color: string;
}

interface PortfolioMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  clientId?: string;
}

interface ClientActivity {
  id: string;
  clientId: string;
  clientName: string;
  type: 'report' | 'campaign' | 'meeting' | 'milestone';
  title: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
}

interface WhiteLabelOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'branding' | 'reports' | 'portal' | 'communication';
  icon: React.ReactNode;
}

interface UpcomingDeliverable {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  type: string;
  dueDate: Date;
  status: 'on-track' | 'at-risk' | 'overdue';
  progress: number;
}

interface AgencyHomeProps {
  agencyName?: string;
  currentUser?: string;
  onClientSelect?: (clientId: string) => void;
  onActivityView?: (activityId: string) => void;
  onWhiteLabelToggle?: (optionId: string, enabled: boolean) => void;
  onDeliverableView?: (deliverableId: string) => void;
  className?: string;
}

export const AgencyHome: React.FC<AgencyHomeProps> = ({
  agencyName = 'Your Agency',
  currentUser = 'Agency User',
  onClientSelect,
  onActivityView,
  onWhiteLabelToggle,
  onDeliverableView,
  className = '',
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [portfolioMetrics, setPortfolioMetrics] = useState<PortfolioMetric[]>([]);
  const [clientActivities, setClientActivities] = useState<ClientActivity[]>([]);
  const [whiteLabelOptions, setWhiteLabelOptions] = useState<WhiteLabelOption[]>([]);
  const [upcomingDeliverables, setUpcomingDeliverables] = useState<UpcomingDeliverable[]>([]);
  const [showClientSwitcher, setShowClientSwitcher] = useState(false);
  const [showWhiteLabelSettings, setShowWhiteLabelSettings] = useState(false);

  useEffect(() => {
    loadAgencyData();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      loadClientSpecificData(selectedClient.id);
    }
  }, [selectedClient]);

  const loadAgencyData = async () => {
    // Simulate API call - replace with actual API integration
    const clientsData: Client[] = [
      {
        id: '1',
        name: 'TechStart Inc.',
        industry: 'Technology',
        status: 'active',
        monthlyValue: 25000,
        activeCampaigns: 3,
        teamSize: 5,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
        color: '#3b82f6',
      },
      {
        id: '2',
        name: 'EcoProducts Co.',
        industry: 'E-commerce',
        status: 'active',
        monthlyValue: 18000,
        activeCampaigns: 2,
        teamSize: 3,
        lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000),
        color: '#10b981',
      },
      {
        id: '3',
        name: 'HealthWell Brands',
        industry: 'Healthcare',
        status: 'active',
        monthlyValue: 32000,
        activeCampaigns: 4,
        teamSize: 7,
        lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
        color: '#ec4899',
      },
      {
        id: '4',
        name: 'GlobalRetail Group',
        industry: 'Retail',
        status: 'active',
        monthlyValue: 45000,
        activeCampaigns: 5,
        teamSize: 9,
        lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        color: '#f59e0b',
      },
    ];

    setClients(clientsData);
    setSelectedClient(clientsData[0]);

    setPortfolioMetrics([
      {
        id: '1',
        label: 'Total Monthly Revenue',
        value: '$120K',
        change: 15.3,
        trend: 'up',
        icon: <DollarSign className="w-5 h-5" />,
      },
      {
        id: '2',
        label: 'Active Clients',
        value: '24',
        change: 8.7,
        trend: 'up',
        icon: <Building2 className="w-5 h-5" />,
      },
      {
        id: '3',
        label: 'Active Campaigns',
        value: '38',
        change: -3.2,
        trend: 'down',
        icon: <Target className="w-5 h-5" />,
      },
      {
        id: '4',
        label: 'Team Utilization',
        value: '87%',
        change: 5.1,
        trend: 'up',
        icon: <Users className="w-5 h-5" />,
      },
    ]);

    setWhiteLabelOptions([
      {
        id: '1',
        name: 'Custom Branding',
        description: 'Use your agency logo and colors across all reports',
        enabled: true,
        category: 'branding',
        icon: <Palette className="w-5 h-5" />,
      },
      {
        id: '2',
        name: 'White-Label Reports',
        description: 'Remove GWI branding from exported reports',
        enabled: true,
        category: 'reports',
        icon: <FileText className="w-5 h-5" />,
      },
      {
        id: '3',
        name: 'Custom Domain',
        description: 'Host client portal on your domain',
        enabled: false,
        category: 'portal',
        icon: <Globe className="w-5 h-5" />,
      },
      {
        id: '4',
        name: 'Branded Emails',
        description: 'Send notifications from your agency email',
        enabled: true,
        category: 'communication',
        icon: <Share2 className="w-5 h-5" />,
      },
    ]);

    setUpcomingDeliverables([
      {
        id: '1',
        clientId: '1',
        clientName: 'TechStart Inc.',
        title: 'Q4 Market Analysis Report',
        type: 'Report',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'on-track',
        progress: 75,
      },
      {
        id: '2',
        clientId: '3',
        clientName: 'HealthWell Brands',
        title: 'Campaign Performance Review',
        type: 'Presentation',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'on-track',
        progress: 45,
      },
      {
        id: '3',
        clientId: '2',
        clientName: 'EcoProducts Co.',
        title: 'Audience Segmentation Study',
        type: 'Analysis',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        status: 'at-risk',
        progress: 60,
      },
    ]);
  };

  const loadClientSpecificData = async (clientId: string) => {
    // Simulate API call for client-specific activities
    setClientActivities([
      {
        id: '1',
        clientId: clientId,
        clientName: selectedClient?.name || '',
        type: 'report',
        title: 'Monthly Performance Report Generated',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        priority: 'medium',
      },
      {
        id: '2',
        clientId: clientId,
        clientName: selectedClient?.name || '',
        type: 'campaign',
        title: 'New Campaign Launched: Holiday Special',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        priority: 'high',
      },
      {
        id: '3',
        clientId: clientId,
        clientName: selectedClient?.name || '',
        type: 'meeting',
        title: 'Strategy Review Meeting',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        priority: 'medium',
      },
    ]);
  };

  const handleClientSwitch = (client: Client) => {
    setSelectedClient(client);
    setShowClientSwitcher(false);
    onClientSelect?.(client.id);
  };

  const handleWhiteLabelToggle = (optionId: string) => {
    setWhiteLabelOptions(options =>
      options.map(option =>
        option.id === optionId
          ? { ...option, enabled: !option.enabled }
          : option
      )
    );
    const option = whiteLabelOptions.find(o => o.id === optionId);
    if (option) {
      onWhiteLabelToggle?.(optionId, !option.enabled);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'churned':
        return 'bg-red-100 text-red-800';
    }
  };

  const getDeliverableStatusColor = (status: UpcomingDeliverable['status']) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
    }
  };

  const getActivityIcon = (type: ClientActivity['type']) => {
    switch (type) {
      case 'report':
        return <FileText className="w-4 h-4" />;
      case 'campaign':
        return <Target className="w-4 h-4" />;
      case 'meeting':
        return <Calendar className="w-4 h-4" />;
      case 'milestone':
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`agency-home ${className}`}>
      {/* Header with Client Switcher */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1f2937]">
              {agencyName} Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {currentUser}
            </p>
          </div>
          <button
            onClick={() => setShowWhiteLabelSettings(!showWhiteLabelSettings)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-[#ec4899] transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>White Label</span>
          </button>
        </div>

        {/* Client Switcher */}
        <div className="mt-6 relative">
          <button
            onClick={() => setShowClientSwitcher(!showClientSwitcher)}
            className="flex items-center justify-between w-full md:w-96 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-[#ec4899] transition-colors"
          >
            {selectedClient ? (
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: selectedClient.color }}
                >
                  {getInitials(selectedClient.name)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#1f2937]">{selectedClient.name}</p>
                  <p className="text-xs text-gray-500">{selectedClient.industry}</p>
                </div>
              </div>
            ) : (
              <span className="text-gray-600">Select a client</span>
            )}
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showClientSwitcher ? 'rotate-180' : ''}`} />
          </button>

          {showClientSwitcher && (
            <div className="absolute top-full left-0 right-0 md:w-96 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
              <div className="p-2">
                <button
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ec4899] flex items-center justify-center text-white">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-[#1f2937]">Add New Client</span>
                </button>
              </div>
              <div className="border-t border-gray-200">
                {clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => handleClientSwitch(client)}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selectedClient?.id === client.id ? 'bg-pink-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: client.color }}
                      >
                        {getInitials(client.name)}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-[#1f2937]">{client.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{client.industry}</span>
                          <span>•</span>
                          <span>{client.activeCampaigns} campaigns</span>
                        </div>
                      </div>
                    </div>
                    {selectedClient?.id === client.id && (
                      <Check className="w-5 h-5 text-[#ec4899]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* White Label Settings Modal */}
      {showWhiteLabelSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Settings className="w-6 h-6 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">White Label Settings</h2>
              </div>
              <button
                onClick={() => setShowWhiteLabelSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {whiteLabelOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-[#ec4899] transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1f2937]">{option.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWhiteLabelToggle(option.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      option.enabled ? 'bg-[#ec4899]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        option.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {portfolioMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                {metric.icon}
              </div>
              <div className={`flex items-center space-x-1 ${
                metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : metric.trend === 'down' ? (
                  <TrendingDown className="w-4 h-4" />
                ) : null}
                <span className="text-sm font-semibold">
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-[#1f2937]">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedClient && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Client Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1f2937]">Client Overview</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-[#ec4899] hover:text-[#ec4899] transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-[#ec4899] hover:text-[#ec4899] transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-[#ec4899] hover:text-[#ec4899] transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Monthly Value</p>
                  </div>
                  <p className="text-xl font-bold text-[#1f2937]">
                    {formatCurrency(selectedClient.monthlyValue)}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Campaigns</p>
                  </div>
                  <p className="text-xl font-bold text-[#1f2937]">
                    {selectedClient.activeCampaigns}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Team Size</p>
                  </div>
                  <p className="text-xl font-bold text-[#1f2937]">
                    {selectedClient.teamSize}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Status</p>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedClient.status)}`}>
                    {selectedClient.status}
                  </span>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold text-[#1f2937] mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {clientActivities.map((activity) => (
                    <div
                      key={activity.id}
                      onClick={() => onActivityView?.(activity.id)}
                      className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:border-[#ec4899] transition-colors cursor-pointer"
                    >
                      <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-[#1f2937]">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-[#ec4899] hover:shadow-md transition-all group">
                  <FileText className="w-6 h-6 text-gray-600 group-hover:text-[#ec4899] mb-2" />
                  <span className="text-sm font-medium text-[#1f2937]">New Report</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-[#ec4899] hover:shadow-md transition-all group">
                  <Target className="w-6 h-6 text-gray-600 group-hover:text-[#ec4899] mb-2" />
                  <span className="text-sm font-medium text-[#1f2937]">New Campaign</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-[#ec4899] hover:shadow-md transition-all group">
                  <Calendar className="w-6 h-6 text-gray-600 group-hover:text-[#ec4899] mb-2" />
                  <span className="text-sm font-medium text-[#1f2937]">Schedule</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-[#ec4899] hover:shadow-md transition-all group">
                  <BarChart3 className="w-6 h-6 text-gray-600 group-hover:text-[#ec4899] mb-2" />
                  <span className="text-sm font-medium text-[#1f2937]">Analytics</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Upcoming Deliverables */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#ec4899]" />
                  <h2 className="text-xl font-bold text-[#1f2937]">Upcoming</h2>
                </div>
              </div>
              <div className="space-y-4">
                {upcomingDeliverables.map((deliverable) => (
                  <div
                    key={deliverable.id}
                    onClick={() => onDeliverableView?.(deliverable.id)}
                    className="border border-gray-200 rounded-lg p-3 hover:border-[#ec4899] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-[#1f2937] flex-1">
                        {deliverable.title}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getDeliverableStatusColor(deliverable.status)}`}>
                        {deliverable.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{deliverable.clientName}</p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{deliverable.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-[#ec4899] h-1.5 rounded-full"
                          style={{ width: `${deliverable.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{deliverable.type}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{deliverable.dueDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyHome;
