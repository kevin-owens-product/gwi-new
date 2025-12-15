import React, { useState, useRef } from 'react';
import { Code, Copy, Check, Download, Share2, Settings, Maximize2, Eye, Lock, Globe } from 'lucide-react';

export type ChartType = 'bar' | 'line' | 'pie' | 'area';
export type EmbedFormat = 'iframe' | 'script' | 'image';
export type ChartTheme = 'light' | 'dark' | 'brand';

export interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[];
}

export interface ChartConfig {
  title: string;
  type: ChartType;
  data: ChartData;
  width: number;
  height: number;
  theme: ChartTheme;
  responsive: boolean;
  showLegend: boolean;
  showBranding: boolean;
  isPublic: boolean;
}

interface EmbeddableChartProps {
  config: ChartConfig;
  chartId: string;
  embedBaseUrl?: string;
  onConfigChange?: (config: ChartConfig) => void;
  onShare?: (chartId: string) => void;
  className?: string;
}

export const EmbeddableChart: React.FC<EmbeddableChartProps> = ({
  config,
  chartId,
  embedBaseUrl = 'https://embed.gwi.com/charts',
  onConfigChange,
  onShare,
  className = '',
}) => {
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [embedFormat, setEmbedFormat] = useState<EmbedFormat>('iframe');
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const embedUrl = `${embedBaseUrl}/${chartId}`;

  const generateEmbedCode = () => {
    const { width, height, responsive } = config;
    const dimensions = responsive
      ? 'width="100%" height="auto"'
      : `width="${width}" height="${height}"`;

    switch (embedFormat) {
      case 'iframe':
        return `<iframe src="${embedUrl}" ${dimensions} frameborder="0" allowfullscreen></iframe>`;
      case 'script':
        return `<div id="gwi-chart-${chartId}"></div>\n<script src="${embedBaseUrl}/embed.js" data-chart-id="${chartId}" ${responsive ? 'data-responsive="true"' : ''}></script>`;
      case 'image':
        return `<img src="${embedUrl}/image.png" ${dimensions} alt="${config.title}" />`;
      default:
        return '';
    }
  };

  const handleCopyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy embed code:', err);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDownloading(false);
  };

  const handleConfigUpdate = (updates: Partial<ChartConfig>) => {
    const newConfig = { ...config, ...updates };
    onConfigChange?.(newConfig);
  };

  // Simple bar chart visualization for demo
  const renderChart = () => {
    const { data, type, theme } = config;
    const maxValue = Math.max(...data.values);
    const chartHeight = 200;
    const barWidth = 40;
    const gap = 20;

    const bgColor = theme === 'dark' ? '#1f2937' : theme === 'brand' ? '#fdf2f8' : '#ffffff';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const barColor = data.colors?.[0] || '#ec4899';

    return (
      <div
        ref={chartRef}
        className="p-6 rounded-lg"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: textColor }}>
          {config.title}
        </h3>
        <div className="flex items-end justify-center space-x-4" style={{ height: `${chartHeight}px` }}>
          {data.labels.map((label, index) => {
            const barHeight = (data.values[index] / maxValue) * chartHeight;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2 text-sm font-medium">{data.values[index]}%</div>
                <div
                  className="rounded-t transition-all hover:opacity-80"
                  style={{
                    width: `${barWidth}px`,
                    height: `${barHeight}px`,
                    backgroundColor: barColor,
                  }}
                />
                <div className="mt-2 text-xs text-center" style={{ width: `${barWidth + 20}px` }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
        {config.showBranding && (
          <div className="mt-6 pt-4 border-t border-gray-300 text-xs text-center opacity-60">
            Powered by GWI
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`embeddable-chart ${className}`}>
      {/* Chart Container */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              config.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {config.isPublic ? (
                <span className="flex items-center space-x-1">
                  <Globe className="w-3 h-3" />
                  <span>Public</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>Private</span>
                </span>
              )}
            </span>
            <span className="text-sm text-gray-600">
              {config.width} × {config.height}px
              {config.responsive && ' (Responsive)'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:text-[#ec4899] hover:bg-gray-100 rounded transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center space-x-1 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download</span>
            </button>
            <button
              onClick={() => setShowEmbedCode(!showEmbedCode)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-[#ec4899] text-white rounded hover:bg-[#db2777] transition-colors"
            >
              <Code className="w-4 h-4" />
              <span className="text-sm">Embed</span>
            </button>
            {onShare && (
              <button
                onClick={() => onShare(chartId)}
                className="flex items-center space-x-1 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h4 className="font-semibold text-[#1f2937] mb-4">Chart Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={config.theme}
                  onChange={(e) => handleConfigUpdate({ theme: e.target.value as ChartTheme })}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="brand">Brand</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={config.width}
                    onChange={(e) => handleConfigUpdate({ width: parseInt(e.target.value) })}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                    placeholder="Width"
                  />
                  <span className="text-gray-500">×</span>
                  <input
                    type="number"
                    value={config.height}
                    onChange={(e) => handleConfigUpdate({ height: parseInt(e.target.value) })}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899]"
                    placeholder="Height"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.responsive}
                      onChange={(e) => handleConfigUpdate({ responsive: e.target.checked })}
                      className="rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Responsive</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.showBranding}
                      onChange={(e) => handleConfigUpdate({ showBranding: e.target.checked })}
                      className="rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show GWI branding</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.isPublic}
                      onChange={(e) => handleConfigUpdate({ isPublic: e.target.checked })}
                      className="rounded border-gray-300 text-[#ec4899] focus:ring-[#ec4899]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Make public</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart Preview */}
        <div className="bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ maxWidth: `${config.width}px`, margin: '0 auto' }}>
            {renderChart()}
          </div>
        </div>

        {/* Embed Code Panel */}
        {showEmbedCode && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-[#1f2937]">Embed Code</h4>
              <div className="flex items-center space-x-2">
                {(['iframe', 'script', 'image'] as EmbedFormat[]).map((format) => (
                  <button
                    key={format}
                    onClick={() => setEmbedFormat(format)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      embedFormat === format
                        ? 'bg-[#ec4899] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <pre className="bg-[#1f2937] text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generateEmbedCode()}</code>
              </pre>
              <button
                onClick={handleCopyEmbedCode}
                className="absolute top-2 right-2 flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-4 bg-pink-50 border border-pink-200 rounded-lg p-3">
              <p className="text-sm text-[#1f2937]">
                <strong>Note:</strong> This embed code will display your chart on any website. {!config.isPublic && 'The chart is currently private and will only be visible to authenticated users.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview URL */}
      <div className="mt-4 flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <Eye className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-[#1f2937]">Preview URL</div>
            <div className="text-sm text-gray-600 font-mono">{embedUrl}</div>
          </div>
        </div>
        <button
          onClick={() => window.open(embedUrl, '_blank')}
          className="flex items-center space-x-2 px-4 py-2 text-[#ec4899] hover:bg-pink-50 rounded-lg transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="text-sm font-medium">Open preview</span>
        </button>
      </div>
    </div>
  );
};

export default EmbeddableChart;
