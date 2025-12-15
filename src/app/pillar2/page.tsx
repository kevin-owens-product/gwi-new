'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import ExecutiveHome from '../../components/home/ExecutiveHome';
import AnalystHome from '../../components/home/AnalystHome';
import MarketerHome from '../../components/home/MarketerHome';
import AgencyHome from '../../components/home/AgencyHome';

export default function Pillar2Page() {
  const [activeDemo, setActiveDemo] = useState<string>('executive');

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
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#1f2937]">
                    Pillar 2: Role-Based Experiences
                  </h1>
                </div>
                <p className="text-gray-600 mt-1">
                  Personalized home dashboards optimized for each user persona
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
              { id: 'executive', label: 'Executive Home' },
              { id: 'analyst', label: 'Analyst Home' },
              { id: 'marketer', label: 'Marketer Home' },
              { id: 'agency', label: 'Agency Home' },
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
        {activeDemo === 'executive' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Executive Home Dashboard</h2>
              <p className="text-gray-600">
                C-suite dashboard with AI summaries, real-time KPIs, trend alerts, and action items
              </p>
            </div>
            <ExecutiveHome userName="Sarah Chen" />
          </div>
        )}

        {activeDemo === 'analyst' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Analyst Home Dashboard</h2>
              <p className="text-gray-600">
                Power user workspace with datasets, queries, saved audiences, and advanced tools
              </p>
            </div>
            <AnalystHome userName="Michael Torres" />
          </div>
        )}

        {activeDemo === 'marketer' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Marketer Home Dashboard</h2>
              <p className="text-gray-600">
                Guided insights with pre-built scenarios, curated narratives, and learning journeys
              </p>
            </div>
            <MarketerHome userName="Emma Watson" />
          </div>
        )}

        {activeDemo === 'agency' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Agency Home Dashboard</h2>
              <p className="text-gray-600">
                Multi-client workspace with visual switcher, portfolio metrics, and white-label settings
              </p>
            </div>
            <AgencyHome currentUser="David Kim" agencyName="Kim Digital Agency" />
          </div>
        )}
      </div>
    </div>
  );
}
