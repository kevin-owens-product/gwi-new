import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, Mail, Eye, BarChart3, Shield, Check, X } from 'lucide-react';
import { UserRole } from './RoleSelector';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'inactive';
  lastActive?: Date;
  joinedDate: Date;
  avatar?: string;
}

interface UserManagementProps {
  users: User[];
  onRoleChange: (userId: string, newRole: UserRole) => void;
  onRemoveUser: (userId: string) => void;
  onResendInvite?: (userId: string) => void;
  currentUserId?: string;
  className?: string;
}

const roleIcons: Record<UserRole, React.ReactNode> = {
  viewer: <Eye className="w-4 h-4" />,
  contributor: <Edit className="w-4 h-4" />,
  analyst: <BarChart3 className="w-4 h-4" />,
  admin: <Shield className="w-4 h-4" />,
};

const roleColors: Record<UserRole, string> = {
  viewer: 'bg-gray-100 text-gray-700',
  contributor: 'bg-blue-100 text-blue-700',
  analyst: 'bg-purple-100 text-purple-700',
  admin: 'bg-red-100 text-red-700',
};

const statusColors: Record<User['status'], string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-gray-100 text-gray-500',
};

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onRoleChange,
  onRemoveUser,
  onResendInvite,
  currentUserId,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<User['status'] | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('viewer');
  const [actionMenuUserId, setActionMenuUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleRoleEdit = (userId: string, currentRole: UserRole) => {
    setEditingUserId(userId);
    setSelectedRole(currentRole);
    setActionMenuUserId(null);
  };

  const handleRoleSave = (userId: string) => {
    onRoleChange(userId, selectedRole);
    setEditingUserId(null);
  };

  const handleRoleCancel = () => {
    setEditingUserId(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`user-management ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <p className="text-gray-600 mt-1">Manage team members and their permissions</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="viewer">Viewer</option>
                  <option value="contributor">Contributor</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as User['status'] | 'all')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isCurrentUser = user.id === currentUserId;
                  const isEditing = editingUserId === user.id;

                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      {/* User Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.avatar ? (
                              <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                {getInitials(user.name)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs text-gray-500">(You)</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <select
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="viewer">Viewer</option>
                              <option value="contributor">Contributor</option>
                              <option value="analyst">Analyst</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => handleRoleSave(user.id)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleRoleCancel}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                            {roleIcons[user.role]}
                            <span className="capitalize">{user.role}</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.joinedDate)}
                      </td>

                      {/* Last Active */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive ? formatDate(user.lastActive) : 'Never'}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setActionMenuUserId(actionMenuUserId === user.id ? null : user.id)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                            disabled={isCurrentUser}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {actionMenuUserId === user.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                              <button
                                onClick={() => handleRoleEdit(user.id, user.role)}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit Role</span>
                              </button>

                              {user.status === 'pending' && onResendInvite && (
                                <button
                                  onClick={() => {
                                    onResendInvite(user.id);
                                    setActionMenuUserId(null);
                                  }}
                                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <Mail className="w-4 h-4" />
                                  <span>Resend Invite</span>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to remove ${user.name}?`)) {
                                    onRemoveUser(user.id);
                                  }
                                  setActionMenuUserId(null);
                                }}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Remove User</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
