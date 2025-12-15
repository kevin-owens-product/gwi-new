import React, { useState } from 'react';
import {
  Layers,
  Plus,
  X,
  Sparkles,
  TrendingUp,
  Link2,
  Download,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  Check,
  Filter,
  BarChart3,
  Eye,
  ArrowRight,
} from 'lucide-react';

export interface Dataset {
  id: string;
  name: string;
  description: string;
  recordCount: number;
  lastUpdated: Date;
  category: string;
  fields: string[];
}

export interface CrossInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  datasets: string[];
  correlations: Correlation[];
  impact: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export interface Correlation {
  field1: string;
  dataset1: string;
  field2: string;
  dataset2: string;
  strength: number;
  type: 'positive' | 'negative' | 'neutral';
}

interface CrossDatasetSynthesisProps {
  availableDatasets: Dataset[];
  onSynthesize?: (datasetIds: string[]) => Promise<CrossInsight[]>;
  onExportInsights?: (insights: CrossInsight[]) => void;
  className?: string;
}

const mockDatasets: Dataset[] = [
  {
    id: 'ds1',
    name: 'Global Consumer Trends Q4 2024',
    description: 'Quarterly consumer behavior and preferences',
    recordCount: 125000,
    lastUpdated: new Date('2024-12-01'),
    category: 'Consumer Behavior',
    fields: ['age', 'interests', 'purchase_intent', 'brand_awareness'],
  },
  {
    id: 'ds2',
    name: 'Social Media Engagement 2024',
    description: 'Platform usage and engagement metrics',
    recordCount: 89000,
    lastUpdated: new Date('2024-11-15'),
    category: 'Digital Behavior',
    fields: ['platform', 'engagement_rate', 'content_type', 'demographics'],
  },
  {
    id: 'ds3',
    name: 'Sustainability Attitudes Study',
    description: 'Consumer attitudes toward sustainable products',
    recordCount: 67000,
    lastUpdated: new Date('2024-10-20'),
    category: 'Lifestyle',
    fields: ['sustainability_concern', 'purchase_behavior', 'brand_preference'],
  },
  {
    id: 'ds4',
    name: 'Tech Adoption Tracker',
    description: 'Emerging technology adoption rates',
    recordCount: 94000,
    lastUpdated: new Date('2024-11-30'),
    category: 'Technology',
    fields: ['tech_category', 'adoption_stage', 'influencers', 'barriers'],
  },
];

const mockInsights: CrossInsight[] = [
  {
    id: 'ci1',
    title: 'Sustainability-Tech Convergence in Millennial Segment',
    description: 'Strong correlation between sustainable product interest and early tech adoption among millennials. Users showing high sustainability concern are 2.3x more likely to adopt emerging green technologies.',
    confidence: 87,
    datasets: ['ds1', 'ds3', 'ds4'],
    correlations: [
      {
        field1: 'sustainability_concern',
        dataset1: 'ds3',
        field2: 'adoption_stage',
        dataset2: 'ds4',
        strength: 0.73,
        type: 'positive',
      },
    ],
    impact: 'high',
    timestamp: new Date(),
  },
  {
    id: 'ci2',
    title: 'Social Engagement Drives Purchase Intent',
    description: 'Higher social media engagement rates correlate with increased purchase intent across sustainable brands. Engagement on visual platforms shows strongest correlation (r=0.68).',
    confidence: 92,
    datasets: ['ds1', 'ds2', 'ds3'],
    correlations: [
      {
        field1: 'engagement_rate',
        dataset1: 'ds2',
        field2: 'purchase_intent',
        dataset2: 'ds1',
        strength: 0.68,
        type: 'positive',
      },
    ],
    impact: 'high',
    timestamp: new Date(),
  },
  {
    id: 'ci3',
    title: 'Tech Barrier-Age Relationship',
    description: 'Moderate negative correlation between age and perceived technology barriers. However, sustainability-focused messaging reduces this gap significantly among 45+ demographics.',
    confidence: 78,
    datasets: ['ds1', 'ds3', 'ds4'],
    correlations: [
      {
        field1: 'age',
        dataset1: 'ds1',
        field2: 'barriers',
        dataset2: 'ds4',
        strength: -0.54,
        type: 'negative',
      },
    ],
    impact: 'medium',
    timestamp: new Date(),
  },
];

export const CrossDatasetSynthesis: React.FC<CrossDatasetSynthesisProps> = ({
  availableDatasets = mockDatasets,
  onSynthesize,
  onExportInsights,
  className = '',
}) => {
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [insights, setInsights] = useState<CrossInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDatasetPicker, setShowDatasetPicker] = useState(false);
  const [impactFilter, setImpactFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const handleToggleDataset = (datasetId: string) => {
    setSelectedDatasets((prev) =>
      prev.includes(datasetId)
        ? prev.filter((id) => id !== datasetId)
        : [...prev, datasetId]
    );
  };

  const handleSynthesize = async () => {
    if (selectedDatasets.length < 2) return;

    setIsAnalyzing(true);
    try {
      let results: CrossInsight[];
      if (onSynthesize) {
        results = await onSynthesize(selectedDatasets);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2500));
        results = mockInsights.filter((insight) =>
          insight.datasets.some((ds) => selectedDatasets.includes(ds))
        );
      }
      setInsights(results);
    } catch (error) {
      console.error('Failed to synthesize datasets:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    onExportInsights?.(insights);
  };

  const getDatasetById = (id: string) => availableDatasets.find((ds) => ds.id === id);

  const filteredInsights = insights.filter(
    (insight) => impactFilter === 'all' || insight.impact === impactFilter
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className={`cross-dataset-synthesis ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="bg-[#ec4899] p-3 rounded-lg">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1f2937]">Cross-Dataset Synthesis</h2>
              <p className="text-gray-600 mt-1">
                Discover hidden patterns and correlations across multiple datasets
              </p>
            </div>
          </div>
          {insights.length > 0 && (
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-[#1f2937] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export insights</span>
            </button>
          )}
        </div>
      </div>

      {/* Dataset Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1f2937]">Selected Datasets</h3>
          <button
            onClick={() => setShowDatasetPicker(!showDatasetPicker)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add dataset</span>
          </button>
        </div>

        {/* Selected Datasets Display */}
        <div className="space-y-3 mb-4">
          {selectedDatasets.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No datasets selected</p>
              <p className="text-sm text-gray-400 mt-1">Select at least 2 datasets to begin synthesis</p>
            </div>
          ) : (
            selectedDatasets.map((datasetId) => {
              const dataset = getDatasetById(datasetId);
              if (!dataset) return null;

              return (
                <div
                  key={datasetId}
                  className="flex items-center justify-between p-4 bg-pink-50 border border-pink-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-[#ec4899]" />
                      <div>
                        <h4 className="font-medium text-[#1f2937]">{dataset.name}</h4>
                        <p className="text-sm text-gray-600">{dataset.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{dataset.recordCount.toLocaleString()} records</span>
                          <span>•</span>
                          <span>{dataset.category}</span>
                          <span>•</span>
                          <span>Updated {formatDate(dataset.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleDataset(datasetId)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded transition-colors"
                    aria-label="Remove dataset"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Dataset Picker */}
        {showDatasetPicker && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="font-medium text-[#1f2937] mb-3">Available Datasets</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {availableDatasets
                .filter((ds) => !selectedDatasets.includes(ds.id))
                .map((dataset) => (
                  <button
                    key={dataset.id}
                    onClick={() => {
                      handleToggleDataset(dataset.id);
                      if (selectedDatasets.length >= 1) {
                        setShowDatasetPicker(false);
                      }
                    }}
                    className="p-3 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-sm text-[#1f2937]">{dataset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{dataset.category}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {dataset.recordCount.toLocaleString()} records
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Synthesize Button */}
        {selectedDatasets.length >= 2 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleSynthesize}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Analyzing patterns across datasets...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Synthesize insights from {selectedDatasets.length} datasets</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Insights Results */}
      {insights.length > 0 && (
        <>
          {/* Filters */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by impact:</span>
              {(['all', 'high', 'medium', 'low'] as const).map((impact) => (
                <button
                  key={impact}
                  onClick={() => setImpactFilter(impact)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    impactFilter === impact
                      ? 'bg-[#ec4899] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {impact.charAt(0).toUpperCase() + impact.slice(1)}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {filteredInsights.length} insight{filteredInsights.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Insights Grid */}
          <div className="space-y-4">
            {filteredInsights.map((insight) => (
              <div
                key={insight.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          insight.impact === 'high'
                            ? 'bg-red-100 text-red-700'
                            : insight.impact === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {insight.impact.toUpperCase()} IMPACT
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#ec4899] h-2 rounded-full"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1f2937] mb-2">{insight.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{insight.description}</p>
                  </div>
                </div>

                {/* Dataset Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.datasets.map((dsId) => {
                    const dataset = getDatasetById(dsId);
                    return dataset ? (
                      <span
                        key={dsId}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        <BarChart3 className="w-3 h-3" />
                        <span>{dataset.name}</span>
                      </span>
                    ) : null;
                  })}
                </div>

                {/* Correlations */}
                {insight.correlations.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Key Correlations:</h4>
                    <div className="space-y-2">
                      {insight.correlations.map((correlation, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-mono text-xs">
                            {correlation.field1}
                          </span>
                          <ArrowRight className={`w-4 h-4 ${
                            correlation.type === 'positive' ? 'text-green-600' :
                            correlation.type === 'negative' ? 'text-red-600' :
                            'text-gray-600'
                          }`} />
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-mono text-xs">
                            {correlation.field2}
                          </span>
                          <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                            correlation.type === 'positive' ? 'bg-green-100 text-green-700' :
                            correlation.type === 'negative' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            r = {correlation.strength.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    {formatDate(insight.timestamp)}
                  </span>
                  <button className="flex items-center space-x-2 text-[#ec4899] hover:text-[#db2777] font-medium text-sm">
                    <span>Explore in detail</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {selectedDatasets.length >= 2 && insights.length === 0 && !isAnalyzing && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#1f2937] mb-2">Ready to synthesize</h3>
          <p className="text-gray-600">
            Click the button above to analyze patterns and correlations across your selected datasets
          </p>
        </div>
      )}
    </div>
  );
};

export default CrossDatasetSynthesis;
