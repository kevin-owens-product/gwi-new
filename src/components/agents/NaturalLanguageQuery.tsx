import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  Lightbulb,
  ChevronRight,
  RefreshCw,
  Bookmark,
  Share2,
  Download,
  Filter,
  Calendar,
  Globe,
  Target,
  Zap,
} from 'lucide-react';

export type QuerySuggestionCategory = 'trending' | 'audience' | 'competitive' | 'custom';
export type ResultType = 'insight' | 'chart' | 'table' | 'recommendation';

export interface QuerySuggestion {
  id: string;
  query: string;
  category: QuerySuggestionCategory;
  description: string;
  icon: React.ReactNode;
  popularity: number;
}

export interface QueryResult {
  id: string;
  type: ResultType;
  title: string;
  summary: string;
  data?: any;
  visualization?: React.ReactNode;
  confidence: number;
  sources: string[];
  timestamp: Date;
  relatedQuestions?: string[];
}

export interface QueryHistory {
  id: string;
  query: string;
  timestamp: Date;
  resultCount: number;
}

interface NaturalLanguageQueryProps {
  onQuery?: (query: string) => Promise<QueryResult[]>;
  onSaveQuery?: (query: string) => void;
  recentQueries?: QueryHistory[];
  className?: string;
}

const querySuggestions: QuerySuggestion[] = [
  {
    id: 'q1',
    query: 'What are the top emerging trends in sustainable technology?',
    category: 'trending',
    description: 'Analyze sustainability trends',
    icon: <TrendingUp className="w-5 h-5" />,
    popularity: 92,
  },
  {
    id: 'q2',
    query: 'Show me Gen Z social media usage patterns',
    category: 'audience',
    description: 'Gen Z digital behavior',
    icon: <Users className="w-5 h-5" />,
    popularity: 87,
  },
  {
    id: 'q3',
    query: 'Compare brand awareness across millennials vs Gen Z',
    category: 'competitive',
    description: 'Cross-generational analysis',
    icon: <BarChart3 className="w-5 h-5" />,
    popularity: 78,
  },
  {
    id: 'q4',
    query: 'Which consumer segments are most interested in AI products?',
    category: 'audience',
    description: 'AI product interest',
    icon: <Target className="w-5 h-5" />,
    popularity: 85,
  },
  {
    id: 'q5',
    query: 'How has health and wellness spending changed in the last quarter?',
    category: 'trending',
    description: 'Wellness spending trends',
    icon: <Calendar className="w-5 h-5" />,
    popularity: 73,
  },
  {
    id: 'q6',
    query: 'What are the biggest barriers to electric vehicle adoption?',
    category: 'custom',
    description: 'EV adoption insights',
    icon: <Lightbulb className="w-5 h-5" />,
    popularity: 81,
  },
];

const mockResults: QueryResult[] = [
  {
    id: 'r1',
    type: 'insight',
    title: 'Sustainable Technology Surge Among Millennials',
    summary: 'Analysis shows a 47% increase in sustainable technology interest among millennials aged 25-34. Key drivers include climate awareness (68%), cost savings (52%), and brand values alignment (43%). Top categories: renewable energy (72%), sustainable fashion (65%), and eco-friendly transportation (58%).',
    confidence: 94,
    sources: ['GWI Core Q4 2024', 'GWI USA 2024', 'Custom Sustainability Study'],
    timestamp: new Date(),
    relatedQuestions: [
      'Which brands are leading in sustainable tech?',
      'What price premium are consumers willing to pay?',
      'How does this vary by region?',
    ],
  },
  {
    id: 'r2',
    type: 'chart',
    title: 'Trend Growth Over Time',
    summary: 'Week-over-week growth in sustainable technology interest shows consistent upward trajectory with acceleration in the past month.',
    confidence: 89,
    sources: ['GWI Trend Tracker'],
    timestamp: new Date(),
  },
  {
    id: 'r3',
    type: 'recommendation',
    title: 'Actionable Recommendations',
    summary: '1. Target millennials with sustainability messaging\n2. Focus on cost-saving benefits alongside environmental impact\n3. Partner with eco-conscious influencers\n4. Emphasize renewable energy and sustainable fashion categories',
    confidence: 87,
    sources: ['GWI AI Insights Engine'],
    timestamp: new Date(),
  },
];

export const NaturalLanguageQuery: React.FC<NaturalLanguageQueryProps> = ({
  onQuery,
  onSaveQuery,
  recentQueries = [],
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResult[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<QuerySuggestionCategory | 'all'>('all');
  const [savedQueries, setSavedQueries] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleQuery = async () => {
    if (!query.trim()) return;

    setIsQuerying(true);
    setShowSuggestions(false);

    try {
      let queryResults: QueryResult[];
      if (onQuery) {
        queryResults = await onQuery(query);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        queryResults = mockResults;
      }
      setResults(queryResults);
    } catch (error) {
      console.error('Query failed:', error);
    } finally {
      setIsQuerying(false);
    }
  };

  const handleSuggestionClick = (suggestion: QuerySuggestion) => {
    setQuery(suggestion.query);
    inputRef.current?.focus();
  };

  const handleSaveQuery = () => {
    if (query.trim() && !savedQueries.includes(query)) {
      setSavedQueries((prev) => [query, ...prev]);
      onSaveQuery?.(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleQuery();
    }
  };

  const filteredSuggestions = querySuggestions.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className={`natural-language-query ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="bg-[#ec4899] p-3 rounded-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-2">AI-Powered Natural Language Query</h2>
            <p className="text-gray-600">
              Ask questions in plain English and get instant insights from your data
            </p>
          </div>
        </div>
      </div>

      {/* Query Input */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm focus-within:border-[#ec4899] focus-within:shadow-md transition-all">
        <div className="flex items-start space-x-4">
          <Search className="w-6 h-6 text-gray-400 mt-2" />
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => !results.length && setShowSuggestions(true)}
              placeholder="Ask anything... e.g., 'What are the top trends in sustainable technology among millennials?'"
              className="w-full text-lg text-[#1f2937] placeholder-gray-400 border-none focus:ring-0 resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Zap className="w-4 h-4" />
                <span>Press Cmd+Enter to search</span>
              </div>
              <div className="flex items-center space-x-2">
                {query && !savedQueries.includes(query) && (
                  <button
                    onClick={handleSaveQuery}
                    className="p-2 text-gray-400 hover:text-[#ec4899] rounded transition-colors"
                    aria-label="Save query"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleQuery}
                  disabled={!query.trim() || isQuerying}
                  className="flex items-center space-x-2 px-6 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isQuerying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {showSuggestions && results.length === 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1f2937]">Popular Queries</h3>
            <div className="flex items-center space-x-2">
              {(['all', 'trending', 'audience', 'competitive', 'custom'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#ec4899] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#ec4899] hover:shadow-md transition-all text-left"
              >
                <div className="text-[#ec4899] mt-0.5">{suggestion.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-[#1f2937] mb-1">{suggestion.query}</div>
                  <div className="text-sm text-gray-600">{suggestion.description}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-[#ec4899] h-1.5 rounded-full"
                        style={{ width: `${suggestion.popularity}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{suggestion.popularity}% popular</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Saved Queries */}
      {savedQueries.length > 0 && showSuggestions && results.length === 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-[#1f2937] mb-3">Saved Queries</h3>
          <div className="flex flex-wrap gap-2">
            {savedQueries.map((savedQuery, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(savedQuery)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-pink-50 text-[#ec4899] border border-pink-200 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <Bookmark className="w-3 h-3 fill-current" />
                <span className="text-sm">{savedQuery}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-[#1f2937]">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </h3>
              <span className="text-sm text-gray-500">• Generated {formatTime(new Date())}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-[#1f2937] hover:bg-gray-100 rounded transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-[#1f2937] hover:bg-gray-100 rounded transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setResults([]);
                  setShowSuggestions(true);
                  setQuery('');
                }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New query</span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {result.type.toUpperCase()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#ec4899] h-2 rounded-full"
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{result.confidence}% confidence</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-[#1f2937] mb-3">{result.title}</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{result.summary}</p>
                  </div>
                </div>

                {/* Sources */}
                <div className="flex flex-wrap gap-2 mb-4 pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Sources:</span>
                  {result.sources.map((source, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {source}
                    </span>
                  ))}
                </div>

                {/* Related Questions */}
                {result.relatedQuestions && result.relatedQuestions.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-[#ec4899]" />
                      <span>Related questions you might ask:</span>
                    </h5>
                    <div className="space-y-2">
                      {result.relatedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setQuery(question);
                            setResults([]);
                            inputRef.current?.focus();
                          }}
                          className="w-full flex items-center justify-between p-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors text-left"
                        >
                          <span className="text-sm text-[#1f2937]">{question}</span>
                          <ChevronRight className="w-4 h-4 text-[#ec4899]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      {!results.length && (
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-[#ec4899] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-[#1f2937]">
                <strong>Powered by AI:</strong> Our natural language engine understands complex questions and
                analyzes across all your datasets to provide comprehensive, actionable insights in seconds.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NaturalLanguageQuery;
