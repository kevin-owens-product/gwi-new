'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import AIBriefing from '../../components/ai/AIBriefing';
import EmbeddableChart from '../../components/ai/EmbeddableChart';
import InsightCard from '../../components/ai/InsightCard';
import SlackIntegration from '../../components/ai/SlackIntegration';

export default function Pillar3Page() {
  const [activeDemo, setActiveDemo] = useState<string>('briefing');

  const mockChartConfig = {
    title: 'Sustainable Technology Adoption by Age Group',
    type: 'bar' as const,
    data: {
      labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
      values: [67, 72, 58, 43, 31],
      colors: ['#ec4899'],
    },
    width: 800,
    height: 400,
    theme: 'light' as const,
    responsive: true,
    showLegend: true,
    showBranding: true,
    isPublic: false,
  };

  const mockInsight = {
    id: 'insight-1',
    type: 'trend' as const,
    title: 'Sustainable Tech Surge Among Millennials',
    summary: 'Interest in sustainable technology has increased 47% week-over-week among millennials aged 25-34. This represents a significant shift in consumer priorities that could impact product positioning across the tech sector.',
    sentiment: 'positive' as const,
    confidence: 94,
    metric: {
      label: 'Week-over-Week Growth',
      value: '47%',
      change: 47,
      trend: 'up' as const,
    },
    timestamp: new Date(),
    source: 'GWI Core Q4 2024',
    tags: ['Sustainability', 'Technology', 'Millennials', 'Trends'],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="p-2 text-gray-600 hover:text-[#ec4899] hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Sparkles className="w-6 h-6 text-[#ec4899]" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#1f2937]">
                    Pillar 3: Ambient Intelligence
                  </h1>
                </div>
                <p className="text-gray-600 mt-1">
                  Deliver insights everywhere through email, Slack, and embeds
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Component Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            {[
              { id: 'briefing', label: 'AI Briefing' },
              { id: 'chart', label: 'Embeddable Chart' },
              { id: 'insight', label: 'Insight Card' },
              { id: 'slack', label: 'Slack Integration' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeDemo === tab.id
                    ? 'bg-[#ec4899] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeDemo === 'briefing' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">AI Intelligence Briefing</h2>
              <p className="text-gray-600">
                Personalized daily/weekly digests of actionable insights delivered via email or in-app
              </p>
            </div>
            <AIBriefing userId="demo-user" />
          </div>
        )}

        {activeDemo === 'chart' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Embeddable Chart</h2>
              <p className="text-gray-600">
                Generate embed codes for charts and insights to display on any website
              </p>
            </div>
            <EmbeddableChart
              config={mockChartConfig}
              chartId="demo-chart-123"
            />
          </div>
        )}

        {activeDemo === 'insight' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Shareable Insight Card</h2>
              <p className="text-gray-600">
                Beautiful, self-contained insight cards for sharing via email, Slack, or social media
              </p>
            </div>
            <InsightCard insight={mockInsight} showEmbedOption={true} />
          </div>
        )}

        {activeDemo === 'slack' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Slack Integration</h2>
              <p className="text-gray-600">
                Connect your Slack workspace to receive insights and alerts directly in your channels
              </p>
            </div>
            <SlackIntegration userId="demo-user" />
          </div>
        )}
      </div>
    </div>
  );
}
