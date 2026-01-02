import { useLocation, useNavigate } from '@tanstack/react-router';
import { ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/lib/toast';
import { useAuth } from './ProtectedRoute';
import { Button } from './ui/button';

const MENU_ITEMS = [
  { to: '/patients/register', label: 'Patient Registration' },
  { to: '/bills/$id', label: 'Bills' },
  { to: '/tests', label: 'Tests' },
  { to: '/test-parameters', label: 'Parameters' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/lab-management', label: 'Lab Management' },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await logout();
      toast.success('Logged out successfully');
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed, redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  const isLabManagementPage = location.pathname === '/lab-management';

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">Lab Management</h1>
                <p className="text-xs text-gray-500">Professional Healthcare Lab</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  active={location.pathname === item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* User Info & Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right pr-4 border-r border-gray-200">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
              </div>
              <div className="relative">
                <Button
                  onClick={() => setShowMore((v) => !v)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md flex items-center gap-1"
                >
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                </Button>
                {showMore && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-300 rounded-lg shadow-2xl py-3 z-50 space-y-1">
                    {user?.isAdmin && (
                      <DropdownButton onClick={() => { setShowMore(false); navigate({ to: '/admin/user-management' }); }}>
                        👤 User Management
                      </DropdownButton>
                    )}
                    <DropdownButton onClick={() => { setShowMore(false); navigate({ to: '/dashboard' }); }}>
                      📊 Dashboard
                    </DropdownButton>
                    {user?.isAdmin && (
                      <DropdownButton onClick={() => { setShowMore(false); navigate({ to: '/lab-details' }); }}>
                        🏥 Lab Details
                      </DropdownButton>
                    )}
                    <div className="border-t border-gray-300 my-2" />
                    <DropdownButton onClick={handleLogout} danger>
                      <LogOut className="w-4 h-4 mr-2 inline" />
                      Logout
                    </DropdownButton>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setShowMobile((v) => !v)}
              className="lg:hidden p-2 text-gray-700 rounded-md"
            >
              {showMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Lab Info Bar */}
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
      {showMobile && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setShowMobile(false)}
                active={location.pathname === item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
              {user?.isAdmin && (
                <DropdownButton onClick={() => { setShowMobile(false); navigate({ to: '/admin/user-management' }); }}>
                  User Management
                </DropdownButton>
              )}
              <DropdownButton onClick={() => { setShowMobile(false); navigate({ to: '/dashboard' }); }}>
                Dashboard
              </DropdownButton>
              {user?.isAdmin && (
                <DropdownButton onClick={() => { setShowMobile(false); navigate({ to: '/lab-details' }); }}>
                  Lab Details
                </DropdownButton>
              )}
              <DropdownButton onClick={() => { setShowMobile(false); handleLogout(); }} danger>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Navigation Link
function NavLink({ to, active, children, onClick }: { to: string; active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => { onClick?.(); navigate({ to }); }}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-900 bg-gray-100'
      }`}
    >
      {children}
    </Button>
  );
}

// Dropdown Button
function DropdownButton({ onClick, children, danger }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-all ${
        danger 
          ? 'text-red-600 bg-red-50 hover:bg-red-100' 
          : 'text-gray-900 bg-gray-50 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}
