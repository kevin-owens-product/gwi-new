import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Search,
  FileText,
  BarChart3,
  Clock,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Zap,
} from 'lucide-react';

export type MessageRole = 'user' | 'agent' | 'system';
export type MessageType = 'text' | 'suggestion' | 'action' | 'insight';

export interface Message {
  id: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  timestamp: Date;
  actions?: QuickAction[];
  metadata?: Record<string, any>;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export interface AgentSuggestion {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
  action: () => void;
}

interface PersistentAgentProps {
  userId: string;
  workspaceId: string;
  onSendMessage?: (message: string) => Promise<string>;
  onActionClick?: (actionId: string) => void;
  onFeedback?: (messageId: string, feedback: 'positive' | 'negative') => void;
  initialMessages?: Message[];
  className?: string;
}

const mockSuggestions: AgentSuggestion[] = [
  {
    id: 'analyze-trends',
    title: 'Analyze recent trends',
    description: 'Review trending topics from the past week',
    icon: <TrendingUp className="w-5 h-5" />,
    priority: 'high',
    action: () => console.log('Analyzing trends...'),
  },
  {
    id: 'create-report',
    title: 'Create audience report',
    description: 'Build a report for your saved audience segment',
    icon: <FileText className="w-5 h-5" />,
    priority: 'medium',
    action: () => console.log('Creating report...'),
  },
  {
    id: 'explore-insights',
    title: 'Explore new insights',
    description: '3 new insights available from your datasets',
    icon: <Sparkles className="w-5 h-5" />,
    priority: 'high',
    action: () => console.log('Exploring insights...'),
  },
];

export const PersistentAgent: React.FC<PersistentAgentProps> = ({
  userId,
  workspaceId,
  onSendMessage,
  onActionClick,
  onFeedback,
  initialMessages = [],
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages.length > 0 ? initialMessages : [
    {
      id: '1',
      role: 'agent',
      type: 'text',
      content: "Hi! I'm your GWI AI assistant. I'm here to help you discover insights, analyze data, and answer questions. What would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<AgentSuggestion[]>(mockSuggestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let agentResponse = '';
      if (onSendMessage) {
        agentResponse = await onSendMessage(inputValue);
      } else {
        // Mock response
        agentResponse = generateMockResponse(inputValue);
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        type: 'text',
        content: agentResponse,
        timestamp: new Date(),
        actions: generateQuickActions(inputValue),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error('Failed to get agent response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const generateMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('trend') || lowerInput.includes('trending')) {
      return "I've analyzed the latest trends in your data. The top emerging trend is sustainable technology adoption, which has increased 47% week-over-week among millennials. Would you like me to create a detailed report on this trend?";
    } else if (lowerInput.includes('audience') || lowerInput.includes('segment')) {
      return "I can help you analyze your audience segments. Your primary audience shows strong interest in tech innovation and sustainability. I've identified 3 new micro-segments that might be valuable for your targeting strategy. Shall we explore them?";
    } else if (lowerInput.includes('report') || lowerInput.includes('create')) {
      return "I can help you create a comprehensive report. What type of report would you like? I can generate audience insights, trend analysis, competitive benchmarking, or custom data visualizations.";
    } else {
      return "I understand you're looking for insights about that. Based on your workspace activity, I recommend starting with your most recent datasets. I can help you analyze trends, create reports, or explore specific audience segments. What would you like to focus on?";
    }
  };

  const generateQuickActions = (input: string): QuickAction[] => {
    const lowerInput = input.toLowerCase();
    const actions: QuickAction[] = [];

    if (lowerInput.includes('trend')) {
      actions.push({
        id: 'view-trends',
        label: 'View trends dashboard',
        icon: <TrendingUp className="w-4 h-4" />,
        action: () => console.log('Opening trends dashboard'),
      });
    }

    if (lowerInput.includes('report') || lowerInput.includes('create')) {
      actions.push({
        id: 'create-report',
        label: 'Create report',
        icon: <FileText className="w-4 h-4" />,
        action: () => console.log('Creating report'),
      });
    }

    actions.push({
      id: 'search',
      label: 'Search data',
      icon: <Search className="w-4 h-4" />,
      action: () => console.log('Opening search'),
    });

    return actions;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: AgentSuggestion) => {
    suggestion.action();
    const message: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'action',
      content: suggestion.title,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    onFeedback?.(messageId, feedback);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-[#ec4899] text-white rounded-full shadow-lg hover:bg-[#db2777] transition-all hover:scale-110 z-50"
        aria-label="Open AI assistant"
      >
        <Bot className="w-6 h-6" />
        {suggestions.filter((s) => s.priority === 'high').length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {suggestions.filter((s) => s.priority === 'high').length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transition-all ${
        isMinimized ? 'w-80' : 'w-96 h-[600px]'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-[#ec4899] rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1f2937]">GWI AI Assistant</h3>
            <p className="text-xs text-gray-500">Always learning, always here</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: '400px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-[#ec4899] text-white rounded-lg rounded-tr-none'
                      : 'bg-gray-100 text-[#1f2937] rounded-lg rounded-tl-none'
                  } p-3`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                      {message.actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={action.action}
                          className="w-full flex items-center space-x-2 px-3 py-2 bg-white text-[#1f2937] rounded border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                    {message.role === 'agent' && (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleFeedback(message.id, 'positive')}
                          className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                          aria-label="Helpful"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, 'negative')}
                          className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                          aria-label="Not helpful"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg rounded-tl-none p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && suggestions.length > 0 && (
            <div className="px-4 pb-4 space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Suggested actions</p>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-start space-x-3 p-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors text-left"
                >
                  <div className="text-[#ec4899] mt-0.5">{suggestion.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#1f2937]">{suggestion.title}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{suggestion.description}</div>
                  </div>
                  {suggestion.priority === 'high' && (
                    <Zap className="w-4 h-4 text-[#ec4899]" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-[#ec4899] text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </>
      )}

      {isMinimized && (
        <div className="p-4">
          <p className="text-sm text-gray-600">
            {suggestions.filter((s) => s.priority === 'high').length} high-priority suggestions available
          </p>
        </div>
      )}
    </div>
  );
};

export default PersistentAgent;
