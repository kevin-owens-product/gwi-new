import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  BookOpen,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  PlayCircle,
  FileText,
  ChevronRight,
  Star,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  Heart,
  ShoppingBag,
} from 'lucide-react';

interface PrebuiltScenario {
  id: string;
  title: string;
  description: string;
  category: 'campaign' | 'audience' | 'product' | 'content';
  icon: React.ReactNode;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popular: boolean;
}

interface CuratedNarrative {
  id: string;
  title: string;
  summary: string;
  keyInsights: string[];
  tags: string[];
  publishedDate: Date;
  readTime: number;
  category: string;
  thumbnail?: string;
}

interface ReadyIntelligence {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'insight' | 'opportunity' | 'recommendation';
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  category: string;
}

interface GuidedJourney {
  id: string;
  title: string;
  description: string;
  steps: number;
  completedSteps: number;
  estimatedTime: string;
  category: string;
}

interface MarketerHomeProps {
  userName?: string;
  industry?: string;
  onScenarioSelect?: (scenarioId: string) => void;
  onNarrativeRead?: (narrativeId: string) => void;
  onIntelligenceView?: (intelligenceId: string) => void;
  onJourneyStart?: (journeyId: string) => void;
  className?: string;
}

export const MarketerHome: React.FC<MarketerHomeProps> = ({
  userName = 'Marketer',
  industry = 'Your Industry',
  onScenarioSelect,
  onNarrativeRead,
  onIntelligenceView,
  onJourneyStart,
  className = '',
}) => {
  const [prebuiltScenarios, setPrebuiltScenarios] = useState<PrebuiltScenario[]>([]);
  const [curatedNarratives, setCuratedNarratives] = useState<CuratedNarrative[]>([]);
  const [readyIntelligence, setReadyIntelligence] = useState<ReadyIntelligence[]>([]);
  const [guidedJourneys, setGuidedJourneys] = useState<GuidedJourney[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMarketerData();
  }, []);

  const loadMarketerData = async () => {
    // Simulate API call - replace with actual API integration
    setPrebuiltScenarios([
      {
        id: '1',
        title: 'Launch New Product Campaign',
        description: 'Complete framework for launching a new product with audience targeting and messaging',
        category: 'campaign',
        icon: <Target className="w-5 h-5" />,
        estimatedTime: '15 min',
        difficulty: 'beginner',
        popular: true,
      },
      {
        id: '2',
        title: 'Identify High-Value Audiences',
        description: 'Discover and segment audiences most likely to convert',
        category: 'audience',
        icon: <Users className="w-5 h-5" />,
        estimatedTime: '10 min',
        difficulty: 'beginner',
        popular: true,
      },
      {
        id: '3',
        title: 'Content Strategy Builder',
        description: 'Build data-driven content strategy based on audience interests',
        category: 'content',
        icon: <MessageSquare className="w-5 h-5" />,
        estimatedTime: '20 min',
        difficulty: 'intermediate',
        popular: false,
      },
      {
        id: '4',
        title: 'Competitor Positioning Analysis',
        description: 'Understand your position in the market relative to competitors',
        category: 'product',
        icon: <TrendingUp className="w-5 h-5" />,
        estimatedTime: '25 min',
        difficulty: 'intermediate',
        popular: true,
      },
      {
        id: '5',
        title: 'Seasonal Campaign Planner',
        description: 'Plan and optimize campaigns for seasonal opportunities',
        category: 'campaign',
        icon: <Globe className="w-5 h-5" />,
        estimatedTime: '18 min',
        difficulty: 'beginner',
        popular: false,
      },
      {
        id: '6',
        title: 'Brand Health Monitor',
        description: 'Track brand perception and sentiment over time',
        category: 'product',
        icon: <Heart className="w-5 h-5" />,
        estimatedTime: '12 min',
        difficulty: 'intermediate',
        popular: false,
      },
    ]);

    setCuratedNarratives([
      {
        id: '1',
        title: 'The Rise of Sustainable Shopping in 2024',
        summary: 'Consumer attitudes toward sustainability have shifted dramatically. Here\'s what brands need to know to stay relevant.',
        keyInsights: [
          '67% of consumers prioritize eco-friendly products',
          'Gen Z leads with 89% sustainability focus',
          'Premium pricing accepted for sustainable options',
        ],
        tags: ['Sustainability', 'Consumer Trends', 'E-commerce'],
        publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        readTime: 5,
        category: 'Consumer Trends',
      },
      {
        id: '2',
        title: 'Social Commerce Revolution: What Marketers Need to Know',
        summary: 'Social media platforms are becoming the new storefronts. Learn how to leverage this shift for your brand.',
        keyInsights: [
          'Social commerce growing 30% year-over-year',
          'Instagram & TikTok lead in purchase intent',
          'Live shopping experiences driving 3x engagement',
        ],
        tags: ['Social Media', 'E-commerce', 'Trends'],
        publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        readTime: 7,
        category: 'Digital Marketing',
      },
      {
        id: '3',
        title: 'AI-Generated Content: Consumer Perception Study',
        summary: 'How do consumers really feel about AI-created content? Our latest research reveals surprising insights.',
        keyInsights: [
          '54% can\'t distinguish AI from human content',
          'Transparency about AI use builds trust',
          'Quality matters more than origin',
        ],
        tags: ['AI', 'Content Marketing', 'Research'],
        publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        readTime: 6,
        category: 'Content Strategy',
      },
    ]);

    setReadyIntelligence([
      {
        id: '1',
        title: 'Untapped Audience Segment Identified',
        description: 'We\'ve identified a high-value audience segment (25-34, tech-savvy) showing 45% higher engagement with your category',
        type: 'opportunity',
        priority: 'high',
        actionable: true,
        category: 'Audience',
      },
      {
        id: '2',
        title: 'Competitor Price Change Alert',
        description: 'Major competitor reduced pricing by 15% in your primary market. Consider response strategy.',
        type: 'trend',
        priority: 'high',
        actionable: true,
        category: 'Competitive',
      },
      {
        id: '3',
        title: 'Content Gap Opportunity',
        description: 'Your audience is actively searching for "sustainable packaging" content - low competition, high interest',
        type: 'insight',
        priority: 'medium',
        actionable: true,
        category: 'Content',
      },
      {
        id: '4',
        title: 'Optimize Email Send Times',
        description: 'Data suggests 8 PM Tuesday has 2.3x higher open rates for your audience',
        type: 'recommendation',
        priority: 'medium',
        actionable: true,
        category: 'Campaign',
      },
    ]);

    setGuidedJourneys([
      {
        id: '1',
        title: 'Build Your First Campaign',
        description: 'Step-by-step guide to creating a data-driven marketing campaign',
        steps: 5,
        completedSteps: 2,
        estimatedTime: '30 min',
        category: 'Getting Started',
      },
      {
        id: '2',
        title: 'Master Audience Insights',
        description: 'Learn to identify, segment, and target your ideal customers',
        steps: 4,
        completedSteps: 0,
        estimatedTime: '25 min',
        category: 'Audience Building',
      },
    ]);
  };

  const getDifficultyColor = (difficulty: PrebuiltScenario['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: ReadyIntelligence['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTypeIcon = (type: ReadyIntelligence['type']) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-4 h-4" />;
      case 'insight':
        return <Lightbulb className="w-4 h-4" />;
      case 'opportunity':
        return <Target className="w-4 h-4" />;
      case 'recommendation':
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={`marketer-home ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1f2937]">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-600 mt-1">
          Your guided insights for {industry}
        </p>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200 p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#ec4899]" />
              <h2 className="text-xl font-bold text-[#1f2937]">
                Ready to Drive Results?
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Access pre-built scenarios, curated insights, and actionable intelligence tailored for marketers like you.
            </p>
            <button className="px-6 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors font-medium flex items-center space-x-2">
              <PlayCircle className="w-4 h-4" />
              <span>Start Guided Tour</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pre-built Scenarios */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Pre-built Scenarios</h2>
              </div>
              <button className="text-[#ec4899] hover:text-[#db2777] text-sm font-medium flex items-center space-x-1">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prebuiltScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => onScenarioSelect?.(scenario.id)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#ec4899] hover:shadow-md transition-all text-left group relative"
                >
                  {scenario.popular && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-4 h-4 fill-[#ec4899] text-[#ec4899]" />
                    </div>
                  )}
                  <div className="bg-gray-100 group-hover:bg-pink-100 p-3 rounded-lg text-gray-600 group-hover:text-[#ec4899] transition-colors w-fit mb-3">
                    {scenario.icon}
                  </div>
                  <h3 className="font-semibold text-[#1f2937] mb-2 pr-6">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {scenario.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(scenario.difficulty)}`}>
                        {scenario.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{scenario.estimatedTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Curated Narratives */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Curated Narratives</h2>
              </div>
              <button className="text-[#ec4899] hover:text-[#db2777] text-sm font-medium flex items-center space-x-1">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {curatedNarratives.map((narrative) => (
                <div
                  key={narrative.id}
                  onClick={() => onNarrativeRead?.(narrative.id)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#ec4899] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#1f2937] flex-1">
                      {narrative.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 ml-4">
                      <Clock className="w-3 h-3" />
                      <span>{narrative.readTime} min</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{narrative.summary}</p>
                  <div className="space-y-1 mb-3">
                    {narrative.keyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3 h-3 text-[#ec4899] mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {narrative.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(narrative.publishedDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Ready-to-Use Intelligence */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Smart Insights</h2>
              </div>
            </div>
            <div className="space-y-3">
              {readyIntelligence.map((intel) => (
                <div
                  key={intel.id}
                  onClick={() => onIntelligenceView?.(intel.id)}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${getPriorityColor(intel.priority)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="opacity-75">
                        {getTypeIcon(intel.type)}
                      </div>
                      <h4 className="font-semibold text-sm">{intel.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs mb-3 opacity-90">
                    {intel.description}
                  </p>
                  {intel.actionable && (
                    <button className="text-xs font-medium flex items-center space-x-1 opacity-90 hover:opacity-100">
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Guided Journeys */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <PlayCircle className="w-5 h-5 text-[#ec4899]" />
                <h2 className="text-xl font-bold text-[#1f2937]">Guided Journeys</h2>
              </div>
            </div>
            <div className="space-y-4">
              {guidedJourneys.map((journey) => (
                <div
                  key={journey.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#ec4899] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-[#1f2937]">
                      {journey.title}
                    </h4>
                    <span className="text-xs text-gray-500">{journey.estimatedTime}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{journey.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>{journey.completedSteps} of {journey.steps} steps</span>
                      <span>{Math.round((journey.completedSteps / journey.steps) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#ec4899] h-2 rounded-full transition-all"
                        style={{ width: `${(journey.completedSteps / journey.steps) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onJourneyStart?.(journey.id)}
                    className="w-full px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors font-medium text-sm"
                  >
                    {journey.completedSteps > 0 ? 'Continue' : 'Start Journey'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketerHome;
