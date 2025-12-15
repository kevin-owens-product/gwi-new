import React, { useState, useRef, useEffect } from 'react';
import { Share2, Link2, Mail, Copy, Check, Eye, MessageSquare, Edit3, ChevronDown } from 'lucide-react';

export type PermissionLevel = 'view' | 'comment' | 'edit';

interface ShareButtonProps {
  resourceUrl: string;
  resourceTitle?: string;
  onInviteClick?: () => void;
  onPermissionChange?: (permission: PermissionLevel) => void;
  defaultPermission?: PermissionLevel;
  className?: string;
}

interface Permission {
  id: PermissionLevel;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const permissions: Permission[] = [
  {
    id: 'view',
    label: 'Can view',
    description: 'View only access',
    icon: <Eye className="w-4 h-4" />,
  },
  {
    id: 'comment',
    label: 'Can comment',
    description: 'View and add comments',
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    id: 'edit',
    label: 'Can edit',
    description: 'Full edit access',
    icon: <Edit3 className="w-4 h-4" />,
  },
];

export const ShareButton: React.FC<ShareButtonProps> = ({
  resourceUrl,
  resourceTitle = 'this resource',
  onInviteClick,
  onPermissionChange,
  defaultPermission = 'view',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<PermissionLevel>(defaultPermission);
  const [showPermissions, setShowPermissions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowPermissions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(resourceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handlePermissionSelect = (permission: PermissionLevel) => {
    setSelectedPermission(permission);
    setShowPermissions(false);
    onPermissionChange?.(permission);
  };

  const currentPermission = permissions.find((p) => p.id === selectedPermission);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors shadow-sm"
        aria-label="Share"
        aria-expanded={isOpen}
      >
        <Share2 className="w-4 h-4" />
        <span className="font-medium">Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-[#1f2937]">Share {resourceTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">Choose how you want to share</p>
          </div>

          {/* Share Options */}
          <div className="p-2">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-pink-100 p-2 rounded-lg">
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Link2 className="w-5 h-5 text-[#ec4899]" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-[#1f2937]">
                  {copied ? 'Link copied!' : 'Copy link'}
                </p>
                <p className="text-sm text-gray-500">
                  {copied ? 'Share the link with others' : 'Get a shareable link'}
                </p>
              </div>
            </button>

            {/* Email Invitation */}
            {onInviteClick && (
              <button
                onClick={() => {
                  onInviteClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-[#ec4899]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-[#1f2937]">Invite by email</p>
                  <p className="text-sm text-gray-500">Send an invitation to specific people</p>
                </div>
              </button>
            )}
          </div>

          {/* Permission Settings */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link permissions
            </label>

            <div className="relative">
              <button
                onClick={() => setShowPermissions(!showPermissions)}
                className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {currentPermission?.icon}
                  <span className="font-medium text-[#1f2937]">{currentPermission?.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showPermissions ? 'rotate-180' : ''}`} />
              </button>

              {showPermissions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {permissions.map((permission) => (
                    <button
                      key={permission.id}
                      onClick={() => handlePermissionSelect(permission.id)}
                      className={`w-full flex items-start space-x-3 p-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedPermission === permission.id ? 'bg-pink-50' : ''
                      }`}
                    >
                      <div className={`mt-0.5 ${selectedPermission === permission.id ? 'text-[#ec4899]' : 'text-gray-600'}`}>
                        {permission.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`font-medium ${selectedPermission === permission.id ? 'text-[#1f2937]' : 'text-[#1f2937]'}`}>
                          {permission.label}
                        </p>
                        <p className="text-sm text-gray-500">{permission.description}</p>
                      </div>
                      {selectedPermission === permission.id && (
                        <Check className="w-5 h-5 text-[#ec4899]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Anyone with the link will have {currentPermission?.label.toLowerCase()} access
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
