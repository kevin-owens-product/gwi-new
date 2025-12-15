import Link from 'next/link';
import {
  Shield,
  Users,
  Sparkles,
  Brain,
  ChevronRight,
  Zap,
  TrendingUp,
  Globe,
  Target,
  MessageSquare,
  BarChart3,
  UserX,
  Search
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1f2937]">GWI Growth Platform</h1>
              <p className="text-gray-600 mt-1">4-Pillar Strategy for 23x MAU Growth</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/docs"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/demos"
                className="px-6 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors"
              >
                View Demos
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-100 text-[#ec4899] rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Production-Ready Components</span>
          </div>
          <h2 className="text-5xl font-bold text-[#1f2937] mb-6">
            Transform Your Growth Strategy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform built on four strategic pillars to achieve explosive growth
            through access democratization, personalization, ambient intelligence, and AI-first workflows.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'MAU Growth Target', value: '23x', icon: TrendingUp },
            { label: 'Components Built', value: '17', icon: BarChart3 },
            { label: 'Growth Pillars', value: '4', icon: Target },
            { label: 'Lines of Code', value: '5.4K+', icon: Globe },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <stat.icon className="w-8 h-8 text-[#ec4899] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#1f2937] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h3 className="text-3xl font-bold text-[#1f2937] mb-12 text-center">
          The Four Pillars
        </h3>

        <div className="space-y-8">
          {/* Pillar 1 */}
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#ec4899] transition-colors">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[#1f2937] mb-2">
                      Pillar 1: Access-First Architecture
                    </h4>
                    <p className="text-gray-600">
                      Remove barriers with flexible roles, invite flows, and team collaboration
                    </p>
                  </div>
                </div>
                <Link
                  href="/pillar1"
                  className="flex items-center space-x-2 px-4 py-2 text-[#ec4899] hover:bg-pink-50 rounded-lg transition-colors"
                >
                  <span>View Components</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Role Selector', 'Invite User Modal', 'Share Button', 'User Management'].map((component) => (
                  <div key={component} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-[#1f2937] text-sm">{component}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#ec4899] transition-colors">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[#1f2937] mb-2">
                      Pillar 2: Role-Based Experiences
                    </h4>
                    <p className="text-gray-600">
                      Personalized home dashboards optimized for each user persona
                    </p>
                  </div>
                </div>
                <Link
                  href="/pillar2"
                  className="flex items-center space-x-2 px-4 py-2 text-[#ec4899] hover:bg-pink-50 rounded-lg transition-colors"
                >
                  <span>View Components</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Executive Home', 'Analyst Home', 'Marketer Home', 'Agency Home'].map((component) => (
                  <div key={component} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-[#1f2937] text-sm">{component}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#ec4899] transition-colors">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Sparkles className="w-8 h-8 text-[#ec4899]" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[#1f2937] mb-2">
                      Pillar 3: Ambient Intelligence
                    </h4>
                    <p className="text-gray-600">
                      Deliver insights everywhere through email, Slack, and embeds
                    </p>
                  </div>
                </div>
                <Link
                  href="/pillar3"
                  className="flex items-center space-x-2 px-4 py-2 text-[#ec4899] hover:bg-pink-50 rounded-lg transition-colors"
                >
                  <span>View Components</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['AI Briefing', 'Embeddable Chart', 'Insight Card', 'Slack Integration'].map((component) => (
                  <div key={component} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-[#1f2937] text-sm">{component}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#ec4899] transition-colors">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[#1f2937] mb-2">
                      Pillar 4: AI-Native Workflows
                    </h4>
                    <p className="text-gray-600">
                      AI-first interfaces with natural language and intelligent agents
                    </p>
                  </div>
                </div>
                <Link
                  href="/pillar4"
                  className="flex items-center space-x-2 px-4 py-2 text-[#ec4899] hover:bg-pink-50 rounded-lg transition-colors"
                >
                  <span>View Components</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Natural Language Query', 'Persistent Agent', 'Cross-Dataset Synthesis', 'Reactivation Alert'].map((component) => (
                  <div key={component} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-[#1f2937] text-sm">{component}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#ec4899] to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Explore?</h3>
          <p className="text-xl mb-8 text-white/90">
            See all components in action with interactive demos
          </p>
          <Link
            href="/demos"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#ec4899] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            <span>View All Demos</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              GWI Growth Platform • Built with Next.js 14, React 18, TypeScript 5.3
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/docs" className="text-gray-600 hover:text-[#ec4899] transition-colors">
                Documentation
              </Link>
              <Link href="/pillar1" className="text-gray-600 hover:text-[#ec4899] transition-colors">
                Pillar 1
              </Link>
              <Link href="/pillar2" className="text-gray-600 hover:text-[#ec4899] transition-colors">
                Pillar 2
              </Link>
              <Link href="/pillar3" className="text-gray-600 hover:text-[#ec4899] transition-colors">
                Pillar 3
              </Link>
              <Link href="/pillar4" className="text-gray-600 hover:text-[#ec4899] transition-colors">
                Pillar 4
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
