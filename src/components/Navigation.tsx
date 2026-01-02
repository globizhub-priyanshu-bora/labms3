import { useNavigate, useLocation } from '@tanstack/react-router';
import { ChevronDown, LogOut, Menu, MoreVertical, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './ProtectedRoute';

const MENU_ITEMS = [
  {
    to: '/dashboard',
    label: 'Dashboard',
  },
  {
    to: '/patient-registration',
    label: 'Patient Registration',
  },
  {
    to: '/bills',
    label: 'Bills',
  },
  {
    to: '/tests',
    label: 'Tests',
  },
  {
    to: '/test-parameters',
    label: 'Parameters',
  },
  {
    to: '/doctors',
    label: 'Doctors',
  },
  {
    to: '/lab-management',
    label: 'Lab Management',
  },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  // Only show lab info bar on lab-management page
  const isLabManagementPage = location.pathname === '/lab-management';

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Home */}
            <Link to={user?.isAdmin ? '/lab-management' : '/dashboard'} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">Lab Management</h1>
                <p className="text-xs text-gray-500">Professional Healthcare Lab</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {MENU_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.to
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              {/* User Info */}
              <div className="text-right pr-3 border-r border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-1 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showMoreDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showMoreDropdown && (
                  <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    {(user?.isAdmin) && (
                      <button
                        onClick={() => {
                          setShowMoreDropdown(false);
                          navigate({ to: '/admin/dashboard' });
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        í±¥ User Management
                      </button>
                    )}
                    <Link
                      to="/dashboard"
                      onClick={() => setShowMoreDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      í¿  Dashboard
                    </Link>
                    {(user?.isAdmin) && (
                      <button
                        onClick={() => {
                          setShowMoreDropdown(false);
                          navigate({ to: '/lab-details' });
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        í¿¢ Lab Details
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-200 mt-2 pt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Lab Info Bar - Only on lab-management page */}
      {isLabManagementPage && (
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
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {MENU_ITEMS.map((item, index) => (
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
              {(user?.isAdmin) && (
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
              {(user?.isAdmin) && (
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    navigate({ to: '/lab-details' });
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Lab Details
                </button>
              )}
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md border-t border-gray-200 mt-2 pt-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple Link component replacement
function Link({
  to,
  className = '',
  onClick,
  children,
}: {
  to: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        onClick?.();
        navigate({ to: to as any });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
