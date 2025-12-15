import React, { useState } from 'react';
import { Eye, Edit, BarChart3, Shield, Check } from 'lucide-react';

export type UserRole = 'viewer' | 'contributor' | 'analyst' | 'admin';

export interface Role {
  id: UserRole;
  name: string;
  description: string;
  icon: React.ReactNode;
  permissions: string[];
}

interface RoleSelectorProps {
  selectedRole?: UserRole;
  onRoleSelect: (role: UserRole) => void;
  disabled?: boolean;
  showPermissions?: boolean;
  className?: string;
}

const roles: Role[] = [
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Can view reports and dashboards',
    icon: <Eye className="w-5 h-5" />,
    permissions: ['View reports', 'View dashboards', 'Export data'],
  },
  {
    id: 'contributor',
    name: 'Contributor',
    description: 'Can create and edit content',
    icon: <Edit className="w-5 h-5" />,
    permissions: ['All Viewer permissions', 'Create reports', 'Edit own content', 'Comment on reports'],
  },
  {
    id: 'analyst',
    name: 'Analyst',
    description: 'Advanced analytics and insights',
    icon: <BarChart3 className="w-5 h-5" />,
    permissions: ['All Contributor permissions', 'Advanced analytics', 'Custom queries', 'API access'],
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full platform access and user management',
    icon: <Shield className="w-5 h-5" />,
    permissions: ['All Analyst permissions', 'User management', 'Billing', 'System settings'],
  },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onRoleSelect,
  disabled = false,
  showPermissions = false,
  className = '',
}) => {
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  return (
    <div className={`role-selector ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          const isHovered = hoveredRole === role.id;

          return (
            <div
              key={role.id}
              className={`
                relative p-4 border-2 rounded-lg cursor-pointer transition-all
                ${isSelected ? 'border-[#ec4899] bg-pink-50' : 'border-gray-200 hover:border-[#ec4899]'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${isHovered && !disabled ? 'shadow-md' : ''}
              `}
              onClick={() => !disabled && onRoleSelect(role.id)}
              onMouseEnter={() => setHoveredRole(role.id)}
              onMouseLeave={() => setHoveredRole(null)}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Select ${role.name} role`}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="bg-[#ec4899] rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-pink-100 text-[#ec4899]' : 'bg-gray-100 text-gray-600'}`}>
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${isSelected ? 'text-[#1f2937]' : 'text-[#1f2937]'}`}>
                    {role.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{role.description}</p>

                  {showPermissions && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase">Permissions:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {role.permissions.map((permission, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#ec4899] mr-2">•</span>
                            <span>{permission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;
