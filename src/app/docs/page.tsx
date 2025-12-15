import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Users, Sparkles, Brain, ExternalLink } from 'lucide-react';

export default function DocsPage() {
  const docs = [
    {
      title: 'Pillar 1: Access-First Architecture',
      icon: Shield,
      color: 'blue',
      file: 'PRD-Access-First.md',
      description: 'Remove barriers with flexible roles, invite flows, share links, and team collaboration features.',
      features: ['Role-Based Access Control', 'Invite User Workflows', 'Share & Permissions', 'User Management Dashboard'],
      size: '100+ pages',
    },
    {
      title: 'Pillar 2: Role-Based Experiences',
      icon: Users,
      color: 'purple',
      file: 'PRD-Role-Based.md',
      description: 'Personalized home dashboards optimized for each user persona with role-specific features.',
      features: ['Executive Dashboard', 'Analyst Workspace', 'Marketer Portal', 'Agency Multi-Client View'],
      size: '85+ pages',
    },
    {
      title: 'Pillar 3: Ambient Intelligence',
      icon: Sparkles,
      color: 'pink',
      file: 'PRD-Ambient-Intelligence.md',
      description: 'Deliver insights everywhere through email briefings, Slack integration, and embeddable content.',
      features: ['AI Briefings', 'Embeddable Charts', 'Insight Sharing', 'Slack Integration'],
      size: '120+ pages',
    },
    {
      title: 'Pillar 4: AI-Native Workflows',
      icon: Brain,
      color: 'green',
      file: 'PRD-AI-Workflows.md',
      description: 'AI-first interfaces with natural language queries, intelligent agents, and cross-dataset synthesis.',
      features: ['Natural Language Query', 'Persistent AI Agent', 'Cross-Dataset Analysis', 'Reactivation Intelligence'],
      size: '110+ pages',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 text-gray-600 hover:text-[#ec4899] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1f2937]">Documentation</h1>
              <p className="text-gray-600 mt-1">
                Comprehensive Product Requirements Documents for all 4 growth pillars
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Overview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="bg-[#ec4899] p-3 rounded-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">GWI Growth Platform Documentation</h2>
              <p className="text-gray-600 mb-4">
                Complete technical specifications, user stories, success metrics, and implementation plans
                for the 4-pillar growth strategy designed to achieve 23x MAU growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#1f2937]">400+</div>
                  <div className="text-sm text-gray-600">Total Pages</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#1f2937]">4</div>
                  <div className="text-sm text-gray-600">PRD Documents</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#1f2937]">17</div>
                  <div className="text-sm text-gray-600">Components</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#1f2937]">23x</div>
                  <div className="text-sm text-gray-600">MAU Growth Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRD Grid */}
        <h3 className="text-2xl font-bold text-[#1f2937] mb-6">Product Requirements Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {docs.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#ec4899] hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-${doc.color}-100 p-3 rounded-lg`}>
                      <Icon className={`w-8 h-8 text-${doc.color}-600`} />
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {doc.size}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#1f2937] mb-2">{doc.title}</h4>
                  <p className="text-gray-600 mb-4">{doc.description}</p>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Key Features:</div>
                    <ul className="space-y-1">
                      {doc.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <span className="text-[#ec4899] mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                    <Link
                      href={`/docs/pillar${idx + 1}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Document</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h3 className="text-xl font-bold text-[#1f2937] mb-4">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-[#1f2937] mb-2">Component Demos</h4>
              <p className="text-sm text-gray-600 mb-3">
                Interactive demonstrations of all 17 components across 4 pillars
              </p>
              <Link
                href="/demos"
                className="inline-flex items-center text-sm text-[#ec4899] hover:text-[#db2777] font-medium"
              >
                <span>View Demos</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div>
              <h4 className="font-semibold text-[#1f2937] mb-2">Technical Architecture</h4>
              <p className="text-sm text-gray-600 mb-3">
                System design, data flows, and infrastructure specifications
              </p>
              <span className="text-sm text-gray-500">Included in each PRD</span>
            </div>
            <div>
              <h4 className="font-semibold text-[#1f2937] mb-2">Success Metrics</h4>
              <p className="text-sm text-gray-600 mb-3">
                KPIs, targets, and measurement frameworks for each pillar
              </p>
              <span className="text-sm text-gray-500">Included in each PRD</span>
            </div>
          </div>
        </div>

        {/* Documentation Note */}
        <div className="mt-8 bg-pink-50 border border-pink-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-[#ec4899] mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#1f2937] mb-2">About These Documents</h4>
              <p className="text-sm text-gray-700">
                Each PRD contains comprehensive specifications including user personas, feature requirements,
                technical architecture, AI/ML requirements, security considerations, rollout strategy, and success metrics.
                These documents serve as the complete blueprint for implementing the GWI Growth Platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
