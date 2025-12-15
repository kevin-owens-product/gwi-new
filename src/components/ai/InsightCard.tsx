import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Bookmark,
  Share2,
  Code,
  Download,
  ExternalLink,
  Copy,
  Check,
  Mail,
  MessageCircle,
  Linkedin,
  Twitter,
  ChevronDown,
  Sparkles,
  Clock,
} from 'lucide-react';

export type InsightType = 'trend' | 'anomaly' | 'prediction' | 'recommendation' | 'alert';
export type InsightSentiment = 'positive' | 'negative' | 'neutral' | 'warning';

export interface InsightData {
  id: string;
  type: InsightType;
  title: string;
  summary: string;
  sentiment: InsightSentiment;
  confidence: number;
  metric?: {
    label: string;
    value: string;
    change?: number;
    trend?: 'up' | 'down' | 'stable';
  };
  timestamp: Date;
  source: string;
  tags?: string[];
  actionUrl?: string;
}

interface InsightCardProps {
  insight: InsightData;
  onBookmark?: (insightId: string) => void;
  onShare?: (insightId: string, method: string) => void;
  onExplore?: (insightId: string) => void;
  isBookmarked?: boolean;
  showEmbedOption?: boolean;
  embedBaseUrl?: string;
  className?: string;
}

const insightTypeIcons: Record<InsightType, React.ReactNode> = {
  trend: <TrendingUp className="w-5 h-5" />,
  anomaly: <Sparkles className="w-5 h-5" />,
  prediction: <Clock className="w-5 h-5" />,
  recommendation: <ExternalLink className="w-5 h-5" />,
  alert: <TrendingDown className="w-5 h-5" />,
};

const insightTypeColors: Record<InsightType, string> = {
  trend: 'bg-blue-100 text-blue-700',
  anomaly: 'bg-purple-100 text-purple-700',
  prediction: 'bg-indigo-100 text-indigo-700',
  recommendation: 'bg-green-100 text-green-700',
  alert: 'bg-red-100 text-red-700',
};

const sentimentColors: Record<InsightSentiment, string> = {
  positive: 'border-green-500 bg-green-50',
  negative: 'border-red-500 bg-red-50',
  neutral: 'border-gray-300 bg-white',
  warning: 'border-yellow-500 bg-yellow-50',
};

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  onBookmark,
  onShare,
  onExplore,
  isBookmarked = false,
  showEmbedOption = true,
  embedBaseUrl = 'https://embed.gwi.com/insights',
  className = '',
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const shareUrl = `${embedBaseUrl}/${insight.id}`;

  const generateEmbedCode = () => {
    return `<div class="gwi-insight-card" data-insight-id="${insight.id}"></div>\n<script src="${embedBaseUrl}/embed.js"></script>`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCopyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy embed code:', err);
    }
  };

  const handleShare = (method: string) => {
    onShare?.(insight.id, method);
    setShowShareMenu(false);

    // Handle social share URLs
    const text = `${insight.title} - ${insight.summary}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    switch (method) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(insight.title)}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`insight-card ${className}`}>
      <div className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-all ${sentimentColors[insight.sentiment]}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${insightTypeColors[insight.type]}`}>
              {insightTypeIcons[insight.type]}
              <span className="capitalize">{insight.type}</span>
            </span>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-gray-500">{formatTimestamp(insight.timestamp)}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{insight.source}</span>
              </div>
              {insight.confidence && (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-[100px]">
                    <div
                      className="bg-[#ec4899] h-1.5 rounded-full"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{insight.confidence}% confidence</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            <button
              onClick={() => onBookmark?.(insight.id)}
              className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                isBookmarked ? 'text-[#ec4899]' : 'text-gray-400'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 text-gray-400 hover:text-[#ec4899] hover:bg-gray-100 rounded transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                  <div className="p-2">
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Link copied!' : 'Copy link'}</span>
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Share via email</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>Share on LinkedIn</span>
                    </button>
                    {showEmbedOption && (
                      <>
                        <div className="border-t border-gray-200 my-2" />
                        <button
                          onClick={() => {
                            setShowEmbedCode(!showEmbedCode);
                            setShowShareMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                        >
                          <Code className="w-4 h-4" />
                          <span>Get embed code</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#1f2937] mb-2">{insight.title}</h3>
          <p className="text-gray-700 leading-relaxed">{insight.summary}</p>
        </div>

        {/* Metric Display */}
        {insight.metric && (
          <div className="mb-4 p-4 bg-white bg-opacity-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">{insight.metric.label}</div>
                <div className="text-2xl font-bold text-[#1f2937]">{insight.metric.value}</div>
              </div>
              {insight.metric.change !== undefined && (
                <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${
                  insight.metric.trend === 'up' ? 'bg-green-100' :
                  insight.metric.trend === 'down' ? 'bg-red-100' :
                  'bg-gray-100'
                }`}>
                  {insight.metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {insight.metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                  <span className={`text-sm font-medium ${
                    insight.metric.trend === 'up' ? 'text-green-700' :
                    insight.metric.trend === 'down' ? 'text-red-700' :
                    'text-gray-700'
                  }`}>
                    {insight.metric.change > 0 ? '+' : ''}{insight.metric.change}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {insight.tags && insight.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {insight.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => onExplore?.(insight.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Explore further</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-[#1f2937] hover:bg-gray-100 rounded transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-[#1f2937] hover:bg-gray-100 rounded transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embed Code Panel */}
        {showEmbedCode && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-[#1f2937]">Embed this insight</h4>
              <button
                onClick={() => setShowEmbedCode(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
            </div>
            <div className="relative">
              <pre className="bg-[#1f2937] text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
                <code>{generateEmbedCode()}</code>
              </pre>
              <button
                onClick={handleCopyEmbedCode}
                className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
              >
                {embedCopied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
