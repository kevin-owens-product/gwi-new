'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain } from 'lucide-react';
import PersistentAgent from '../../components/agents/PersistentAgent';
import CrossDatasetSynthesis from '../../components/agents/CrossDatasetSynthesis';
import ReactivationAlert from '../../components/agents/ReactivationAlert';
import NaturalLanguageQuery from '../../components/agents/NaturalLanguageQuery';

export default function Pillar4Page() {
  const [activeDemo, setActiveDemo] = useState<string>('nlq');

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
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Brain className="w-6 h-6 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#1f2937]">
                    Pillar 4: AI-Native Workflows
                  </h1>
                </div>
                <p className="text-gray-600 mt-1">
                  AI-first interfaces with natural language and intelligent agents
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
              { id: 'nlq', label: 'Natural Language Query' },
              { id: 'agent', label: 'Persistent Agent' },
              { id: 'synthesis', label: 'Cross-Dataset Synthesis' },
              { id: 'reactivation', label: 'Reactivation Alert' },
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
        {activeDemo === 'nlq' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Natural Language Query</h2>
              <p className="text-gray-600">
                Ask questions in plain English and get instant insights from your data
              </p>
            </div>
            <NaturalLanguageQuery />
          </div>
        )}

        {activeDemo === 'agent' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Persistent AI Agent</h2>
              <p className="text-gray-600">
                Your always-on AI assistant that learns your goals and provides contextual help
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">
                The Persistent Agent appears as a floating widget in the bottom-right corner of the screen.
              </p>
              <p className="text-sm text-gray-500">
                Scroll down to see the agent in action, or look for the pink bot icon in the corner.
              </p>
            </div>
            <PersistentAgent userId="demo-user" workspaceId="demo-workspace" />
          </div>
        )}

        {activeDemo === 'synthesis' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Cross-Dataset Synthesis</h2>
              <p className="text-gray-600">
                Discover hidden patterns and correlations across multiple datasets using AI
              </p>
            </div>
            <CrossDatasetSynthesis availableDatasets={[]} />
          </div>
        )}

        {activeDemo === 'reactivation' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Reactivation Intelligence</h2>
              <p className="text-gray-600">
                Identify at-risk users and create automated re-engagement campaigns
              </p>
            </div>
            <ReactivationAlert />
          </div>
        )}
      </div>
    </div>
  );
}
