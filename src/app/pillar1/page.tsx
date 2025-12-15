'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import RoleSelector from '../../components/access/RoleSelector';
import InviteUserModal from '../../components/access/InviteUserModal';
import ShareButton from '../../components/access/ShareButton';
import UserManagement from '../../components/access/UserManagement';

export default function Pillar1Page() {
  const [activeDemo, setActiveDemo] = useState<string>('role-selector');
  const [showInviteModal, setShowInviteModal] = useState(false);

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
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#1f2937]">
                    Pillar 1: Access-First Architecture
                  </h1>
                </div>
                <p className="text-gray-600 mt-1">
                  Remove barriers with flexible roles, invite flows, and team collaboration
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
              { id: 'role-selector', label: 'Role Selector' },
              { id: 'invite-modal', label: 'Invite User Modal' },
              { id: 'share-button', label: 'Share Button' },
              { id: 'user-management', label: 'User Management' },
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
        {activeDemo === 'role-selector' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Role Selector</h2>
              <p className="text-gray-600">
                Visual role selection interface with 4 role types: Viewer, Contributor, Analyst, and Admin
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <RoleSelector
                selectedRole="analyst"
                onRoleSelect={(role) => console.log('Role selected:', role)}
              />
            </div>
          </div>
        )}

        {activeDemo === 'invite-modal' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Invite User Modal</h2>
              <p className="text-gray-600">
                Email invitation modal with role assignment and personalized messages
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-6 py-3 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition-colors font-medium"
              >
                Open Invite Modal
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Click the button above to see the invite user modal in action
              </p>
            </div>
            {showInviteModal && (
              <InviteUserModal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                onInvite={async (email, role) => {
                  console.log('Invite sent:', { email, role });
                  setShowInviteModal(false);
                }}
              />
            )}
          </div>
        )}

        {activeDemo === 'share-button' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">Share Button</h2>
              <p className="text-gray-600">
                Share functionality with permission levels (view, comment, edit) and link generation
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="max-w-md">
                <ShareButton
                  resourceUrl="/reports/q4-2024-trends"
                  resourceTitle="Q4 2024 Consumer Trends Report"
                  defaultPermission="view"
                  onPermissionChange={(permission) => {
                    console.log('Permission changed to:', permission);
                  }}
                  onInviteClick={() => setShowInviteModal(true)}
                />
              </div>
            </div>
          </div>
        )}

        {activeDemo === 'user-management' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1f2937] mb-2">User Management</h2>
              <p className="text-gray-600">
                Admin dashboard for managing team members, roles, and permissions
              </p>
            </div>
            <UserManagement
              users={[
                {
                  id: '1',
                  name: 'Sarah Chen',
                  email: 'sarah@example.com',
                  role: 'admin',
                  status: 'active',
                  joinedDate: new Date('2024-01-15'),
                  lastActive: new Date(),
                },
                {
                  id: '2',
                  name: 'Michael Torres',
                  email: 'michael@example.com',
                  role: 'analyst',
                  status: 'active',
                  joinedDate: new Date('2024-02-20'),
                  lastActive: new Date(),
                },
                {
                  id: '3',
                  name: 'Emma Watson',
                  email: 'emma@example.com',
                  role: 'contributor',
                  status: 'active',
                  joinedDate: new Date('2024-03-10'),
                  lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                },
                {
                  id: '4',
                  name: 'David Kim',
                  email: 'david@example.com',
                  role: 'viewer',
                  status: 'pending',
                  joinedDate: new Date('2024-11-28'),
                },
              ]}
              currentUserId="1"
              onRoleChange={(userId, newRole) => {
                console.log('Update role:', { userId, newRole });
              }}
              onRemoveUser={(userId) => {
                console.log('Remove user:', userId);
              }}
              onResendInvite={(userId) => {
                console.log('Resend invite:', userId);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
