import Link from 'next/link';
import { ArrowLeft, Sparkles, Brain, Shield, Users, ChevronRight } from 'lucide-react';

export default function DemosPage() {
  const demos = [
    {
      pillar: 1,
      title: 'Access-First Architecture',
      description: 'Role-based access control, invitations, and team collaboration',
      icon: Shield,
      color: 'blue',
      href: '/pillar1',
      components: 4,
    },
    {
      pillar: 2,
      title: 'Role-Based Experiences',
      description: 'Personalized dashboards for executives, analysts, marketers, and agencies',
      icon: Users,
      color: 'purple',
      href: '/pillar2',
      components: 4,
    },
    {
      pillar: 3,
      title: 'Ambient Intelligence',
      description: 'AI briefings, embeddable charts, and Slack integration',
      icon: Sparkles,
      color: 'pink',
      href: '/pillar3',
      components: 4,
    },
    {
      pillar: 4,
      title: 'AI-Native Workflows',
      description: 'Natural language queries, AI agents, and cross-dataset synthesis',
      icon: Brain,
      color: 'green',
      href: '/pillar4',
      components: 4,
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
              <h1 className="text-2xl font-bold text-[#1f2937]">Interactive Demos</h1>
              <p className="text-gray-600 mt-1">
                Explore all components across the 4 growth pillars
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <Link
                key={demo.pillar}
                href={demo.href}
                className="group bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-[#ec4899] hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`bg-${demo.color}-100 p-4 rounded-lg`}>
                    <Icon className={`w-10 h-10 text-${demo.color}-600`} />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {demo.components} components
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#1f2937] mb-3">
                  Pillar {demo.pillar}: {demo.title}
                </h3>
                <p className="text-gray-600 mb-6">{demo.description}</p>
                <div className="flex items-center text-[#ec4899] font-medium group-hover:translate-x-2 transition-transform">
                  <span>Explore demos</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
