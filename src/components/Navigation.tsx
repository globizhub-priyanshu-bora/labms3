import { Link, useNavigate } from '@tanstack/react-router';
import {
  Activity,
  ChevronDown,
  FlaskConical,
  LayoutDashboard,
  Menu,
  Power,
  Receipt,
  Settings,
  Stethoscope,
  TestTube,
  User,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/routes/apis/auth-apis';
import { getLabInfo } from '@/routes/apis/lab-apis';

export const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [labInfo, setLabInfo] = useState<any>(null);

  useEffect(() => {
    const fetchLabInfo = async () => {
      try {
        const result = await getLabInfo();
        if (result.success) {
          setLabInfo(result.data);
        }
      } catch (error) {
        console.error('Error fetching lab info:', error);
      }
    };

    if (user) {
      fetchLabInfo();
    }
  }, [user]);

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

    if (permissions[module]?.[action] === true) {
      return true;
    }

    const singularModule = module.replace(/s$/, '');
    if (permissions[singularModule]?.[action] === true) {
      return true;
    }

    if (action === 'read' && permissions[module]?.['view'] === true) {
      return true;
    }

    return false;
  };

  const getMenuItems = () => {
    const items = [];

    if (user.isAdmin) {
      items.push({
        type: 'dropdown',
        label: 'User Management',
        icon: Settings,
      });
    } else {
      items.push({
        to: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
      });
    }

    if (hasPermission('patients', 'create') || hasPermission('patient', 'create')) {
      items.push({
        to: '/patients/register',
        label: 'Register Patient',
        icon: User,
      });
    }

    if (user.isAdmin || hasPermission('doctors', 'view') || hasPermission('doctors', 'create') || hasPermission('doctor', 'view') || hasPermission('doctor', 'create')) {
      items.push({
        to: '/doctors',
        label: 'Doctors',
        icon: Stethoscope,
      });
    }

    if (hasPermission('tests', 'view') || hasPermission('tests', 'read') || hasPermission('test', 'read')) {
      items.push({
        to: '/tests/',
        label: 'Tests',
        icon: TestTube,
      });
    }

    if (hasPermission('parameters', 'view') || hasPermission('parameters', 'read') || hasPermission('test_parameter', 'read')) {
      items.push({
        to: '/test-parameters/',
        label: 'Parameters',
        icon: Activity,
      });
    }

    if (hasPermission('bills', 'view') || hasPermission('bills', 'create') || hasPermission('bill', 'read')) {
      items.push({
        to: '/bills/$id',
        label: 'Bills',
        icon: Receipt,
      });
    }

    items.push({
      to: '/lab-management',
      label: 'Lab Management',
      icon: LayoutDashboard,
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
              {menuItems.map((item, index) => {
                if (item.type === 'dropdown') {
                  return (
                    <div key={index} className="relative">
                      <button
                        onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-1 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showAdminDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      {showAdminDropdown && (
                        <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                          <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            User Management
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={index}
                      to={item.to}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-2 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                }
              })}
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
                  <span className="hidden sm:inline text-sm font-medium text-gray-900">{user.name.split(' ')[0]}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 text-xs text-gray-500">
                      <p>{user.email}</p>
                      <p className="text-blue-600 font-semibold">{user.isAdmin ? 'Administrator' : 'User'}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Power className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-200 space-y-1">
              {menuItems.map((item, index) => {
                if (item.type === 'dropdown') {
                  return (
                    <div key={index} className="space-y-1">
                      <button
                        onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                        className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                        <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showAdminDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      {showAdminDropdown && (
                        <>
                          <Link to="/dashboard" className="ml-4 block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link to="/admin/dashboard" className="ml-4 block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            User Management
                          </Link>
                        </>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={index}
                      to={item.to}
                      className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Lab Info Header */}
      {labInfo && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">{labInfo.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">Reg. No: {labInfo.registrationNumber || 'N/A'}</p>
              </div>
              <div className="text-xs text-gray-600">
                <p>{labInfo.addressLine1}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
