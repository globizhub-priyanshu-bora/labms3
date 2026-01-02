import { Link, useNavigate } from '@tanstack/react-router';
import {
  Activity,
  FlaskConical,
  LayoutDashboard,
  Menu,
  Power,
  Receipt,
  TestTube,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/routes/apis/auth-apis';

export const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate({ to: '/' });
    } catch (error) {
      console.error('Logout error:', error);
      navigate({ to: '/' });
    }
  };

  if (!user) {
    return null;
  }

  const hasPermission = (module: string, action: string) => {
    if (user.isAdmin) return true;
    const permissions = user.permissions || {};
    
    // Check various permission structure formats
    // Format 1: permissions.patients.create
    if (permissions[module]?.[action] === true) {
      return true;
    }
    
    // Format 2: permissions.patient.create (singular)
    const singularModule = module.replace(/s$/, '');
    if (permissions[singularModule]?.[action] === true) {
      return true;
    }
    
    // Format 3: permissions.patients.view (for 'read' action)
    if (action === 'read' && permissions[module]?.['view'] === true) {
      return true;
    }
    
    return false;
  };

  const getMenuItems = () => {
    const items = [];

    // Show Dashboard for non-admins, Admin Dashboard for admins
    if (user.isAdmin) {
      items.push({
        to: '/admin/dashboard',
        label: 'Admin Dashboard',
        icon: LayoutDashboard,
      });
    } else {
      items.push({
        to: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
      });
    }

    // Patient Registration - check patients.create or patient.create permission
    if (hasPermission('patients', 'create') || hasPermission('patient', 'create')) {
      items.push({
        to: '/patients/register',
        label: 'Register Patient',
        icon: User,
      });
    }

    // Tests - check tests.view or test.read permission
    if (hasPermission('tests', 'view') || hasPermission('tests', 'read') || hasPermission('test', 'read')) {
      items.push({
        to: '/tests/',
        label: 'Tests',
        icon: TestTube,
      });
    }

    // Parameters - check parameters.view or test_parameter.read permission
    if (hasPermission('parameters', 'view') || hasPermission('parameters', 'read') || hasPermission('test_parameter', 'read')) {
      items.push({
        to: '/test-parameters/',
        label: 'Parameters',
        icon: Activity,
      });
    }

    // Bills - check bills.view or bills.create permission
    if (hasPermission('bills', 'view') || hasPermission('bills', 'create') || hasPermission('bill', 'read')) {
      items.push({
        to: '/bills/$id',
        label: 'Bills',
        icon: Receipt,
      });
    }

    // Lab Management - available to all users
    items.push({
      to: '/lab-management',
      label: 'Lab Management',
      icon: LayoutDashboard,
    });

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Lab Name */}
          <Link to={user.isAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 group">
            <div className="bg-black text-white p-2 rounded-lg transition-colors">
              <FlaskConical className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-black hidden sm:inline">GlobPathology</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors"
                  activeProps={{
                    className: 'flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side - User Menu & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* User Menu Desktop */}
            <div className="hidden md:flex items-center relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-32 truncate text-gray-900">{user.name}</span>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-300 py-1 top-full z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                    <p className="text-xs text-black font-medium mt-1">{user.role}</p>
                  </div>
                  <Button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Power className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-300 py-4 bg-white">
            <div className="flex flex-col gap-2">
              {/* Mobile User Info */}
              <div className="px-4 py-3 bg-gray-50 rounded-lg mb-2 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-black p-2 rounded-full">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Items */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    activeProps={{
                      className: 'flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-black rounded-lg',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile Logout */}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2 w-full"
              >
                <Power className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
