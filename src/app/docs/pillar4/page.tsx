import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';
import MarkdownViewer from '@/components/MarkdownViewer';

export default async function Pillar4DocPage() {
  const filePath = path.join(process.cwd(), 'src', 'docs', 'PRD-AI-Workflows.md');
  const markdownContent = await fs.readFile(filePath, 'utf-8');
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/docs" className="p-2 text-gray-600 hover:text-[#ec4899] hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1f2937]">Pillar 4: AI-Native Workflows</h1>
                <p className="text-gray-600">Product Requirements Document</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div><div className="text-sm text-gray-600">Pages</div><div className="text-2xl font-bold text-[#1f2937]">110+</div></div>
            <div><div className="text-sm text-gray-600">Version</div><div className="text-2xl font-bold text-[#1f2937]">1.0</div></div>
            <div><div className="text-sm text-gray-600">Status</div><div className="text-2xl font-bold text-[#1f2937]">Draft</div></div>
            <div><div className="text-sm text-gray-600">Date</div><div className="text-2xl font-bold text-[#1f2937]">Dec 2024</div></div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">File Location:</div>
            <code className="block text-xs bg-gray-100 text-gray-800 px-3 py-2 rounded font-mono">src/docs/PRD-AI-Workflows.md</code>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <MarkdownViewer content={markdownContent} />
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
          <h3 className="font-semibold text-[#1f2937] mb-2">Ready to see it in action?</h3>
          <p className="text-gray-700 text-sm mb-4">
            Explore the interactive component demos for Pillar 4: AI-Native Workflows
          </p>
          <Link
            href="/pillar4"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors font-medium"
          >
            <span>View Interactive Component Demos</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
