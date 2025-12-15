import Link from 'next/link';
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react';

export default function Pillar2DocPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/docs" className="p-2 text-gray-600 hover:text-[#ec4899] hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1f2937]">Pillar 2: Role-Based Experiences</h1>
                <p className="text-gray-600">Product Requirements Document</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div><div className="text-sm text-gray-600">Pages</div><div className="text-2xl font-bold text-[#1f2937]">85+</div></div>
            <div><div className="text-sm text-gray-600">Version</div><div className="text-2xl font-bold text-[#1f2937]">1.0</div></div>
            <div><div className="text-sm text-gray-600">Status</div><div className="text-2xl font-bold text-[#1f2937]">Draft</div></div>
            <div><div className="text-sm text-gray-600">Date</div><div className="text-2xl font-bold text-[#1f2937]">Dec 2024</div></div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">File Location:</div>
            <code className="block text-xs bg-gray-100 text-gray-800 px-3 py-2 rounded font-mono">src/docs/PRD-Role-Based.md</code>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1f2937] mb-4">Document Overview</h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 mb-4">
              This PRD details the Role-Based Experiences strategy, creating personalized home dashboards optimized for each user persona. Each role gets a tailored interface designed to maximize productivity and value for their specific use cases.
            </p>

            <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Table of Contents</h3>
            <ul className="space-y-2 text-gray-700">
              <li>1. Executive Summary</li>
              <li>2. User Personas & Scenarios</li>
              <li>3. Feature Specifications
                <ul className="ml-6 mt-1 space-y-1">
                  <li>• Executive Home Dashboard</li>
                  <li>• Analyst Home Workspace</li>
                  <li>• Marketer Home Portal</li>
                  <li>• Agency Home Multi-Client View</li>
                </ul>
              </li>
              <li>4. Technical Architecture</li>
              <li>5. AI/ML Requirements</li>
              <li>6. Testing Strategy</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#1f2937] mt-6 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Executive Dashboard:</strong> AI summaries, real-time KPIs, trend alerts, and action items</li>
              <li><strong>Analyst Workspace:</strong> Datasets, queries, saved audiences, and advanced tools</li>
              <li><strong>Marketer Portal:</strong> Pre-built scenarios, curated narratives, and learning journeys</li>
              <li><strong>Agency Multi-Client:</strong> Client switcher, portfolio metrics, and white-label options</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#1f2937] mt-6 mb-3">Success Metrics</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Increase role-specific feature adoption by 3.2x</li>
              <li>Reduce time-to-value from 18 min to 4 min</li>
              <li>Achieve 78% daily active user rate among executives</li>
              <li>Drive 65% increase in multi-user workspace creation</li>
            </ul>
          </div>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
          <h3 className="font-semibold text-[#1f2937] mb-4">How to View This Document</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <ExternalLink className="w-5 h-5 text-[#ec4899] mt-0.5" />
              <div>
                <div className="font-medium text-[#1f2937]">Clone the Repository</div>
                <p className="text-sm text-gray-700 mt-1">
                  Clone the git repository and open <code className="px-1.5 py-0.5 bg-pink-100 rounded text-xs">src/docs/PRD-Role-Based.md</code> in your markdown viewer
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-[#ec4899] mt-0.5" />
              <div>
                <div className="font-medium text-[#1f2937]">View in VS Code or IDE</div>
                <p className="text-sm text-gray-700 mt-1">
                  Open the file in Visual Studio Code, IntelliJ, or any IDE with markdown preview support
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-pink-300">
            <Link href="/pillar2" className="inline-flex items-center space-x-2 text-[#ec4899] hover:text-[#db2777] font-medium">
              <span>View Interactive Component Demos</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
