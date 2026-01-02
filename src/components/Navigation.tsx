import { Link, useNavigate } from '@tanstack/react-router';
import { ChevronDown, FlaskConical, Layout, LogOut, Menu, Users, Settings, MoreVertical, Home, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './ProtectedRoute';

export function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const handleLogout = async () => {
    logout();
    navigate({ to: '/login' });
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (user.isAdmin) return true;
    if (!user.permissions) return false;

    const perms = user.permissions as Record<string, Record<string, boolean>>;
    return perms?.[resource]?.[action] ?? false;
  };

  const getMenuItems = () => {
    const items: any[] = [];

    if (hasPermission('patients', 'view') || hasPermission('patient', 'read')) {
      items.push({
        to: '/patients/register',
        label: 'Patient Registration',
        icon: Users,
      });
    }

    if (hasPermission('tests', 'view') || hasPermission('test', 'read')) {
      items.push({
        to: '/tests/',
        label: 'Tests',
        icon: Layout,
      });
    }

    if (hasPermission('doctors', 'view') || hasPermission('doctor', 'read')) {
      items.push({
        to: '/doctors/',
        label: 'Doctors',
        icon: Users,
      });
    }

    if (hasPermission('parameters', 'view') || hasPermission('parameters', 'read') || hasPermission('test_parameter', 'read')) {
      items.push({
        to: '/test-parameters/',
        label: 'Parameters',
        icon: Settings,
      });
    }

    if (hasPermission('bills', 'view') || hasPermission('bills', 'create') || hasPermission('bill', 'read')) {
      items.push({
        to: '/bills/$id',
        label: 'Bills',
        icon: Layout,
      });
    }

    items.push({
      to: '/lab-management',
      label: 'Lab Management',
      icon: Layout,
    });

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Lab Name */}
            <Link to={user.isAdmin ? '/lab-management' : '/dashboard'} className="flex items-center gap-3 group">
              <div className="bg-black text-white p-2 rounded-lg transition-colors group-hover:bg-gray-800">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">Lab Management</h1>
                <p className="text-xs text-gray-500">Professional Healthcare Lab</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-2 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-1 transition-colors ml-2"
                >
                  <MoreVertical className="w-4 h-4" />
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showMoreDropdown && (
                  <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    {/* User Management */}
                    {(user.isAdmin || hasPermission('users', 'view')) && (
                      <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        User Management
                      </Link>
                    )}
                    
                    {/* Dashboard */}
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Dashboard
                    </Link>

                    {/* Lab Details */}
                    <button
                      onClick={() => {
                        setShowMoreDropdown(false);
                        navigate({ to: '/lab-management' });
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4" />
                      Lab Details
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md inline-flex items-center gap-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Lab Info Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Lab Information</p>
              <p className="text-xs text-gray-600">Name: Your Laboratory | Registration: LAB-12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              {(user.isAdmin || hasPermission('users', 'view')) && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  User Management
                </Link>
              )}
              <Link
                to="/dashboard"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Dashboard
              </Link>
              <Link
                to="/lab-management"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Lab Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
