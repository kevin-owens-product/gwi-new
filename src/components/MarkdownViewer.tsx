'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
      <style jsx global>{`
        .prose {
          color: #1f2937;
        }
        .prose h1 {
          color: #1f2937;
          font-size: 2.25rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .prose h2 {
          color: #1f2937;
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .prose h3 {
          color: #374151;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose h4 {
          color: #374151;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .prose h5 {
          color: #4b5563;
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .prose p {
          margin-top: 1rem;
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .prose ul,
        .prose ol {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .prose li > p {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: #1f2937;
          font-weight: 600;
        }
        .prose a {
          color: #ec4899;
          text-decoration: none;
          font-weight: 500;
        }
        .prose a:hover {
          color: #db2777;
          text-decoration: underline;
        }
        .prose code {
          background-color: #f3f4f6;
          color: #ec4899;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-weight: 600;
        }
        .prose pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .prose pre code {
          background-color: transparent;
          color: #f9fafb;
          padding: 0;
          font-weight: 400;
        }
        .prose blockquote {
          border-left: 4px solid #ec4899;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .prose th {
          background-color: #f3f4f6;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          border: 1px solid #e5e7eb;
        }
        .prose td {
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
        }
        .prose tr:nth-child(even) {
          background-color: #f9fafb;
        }
        .prose hr {
          border: 0;
          border-top: 2px solid #e5e7eb;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
