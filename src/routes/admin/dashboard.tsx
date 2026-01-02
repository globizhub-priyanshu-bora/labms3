// Save this file as: /routes/admin/dashboard.tsx

import { createFileRoute } from '@tanstack/react-router';
import { Edit, Plus, Trash2, User, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/components/ProtectedRoute';
import { useToast } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createUser, deleteUser, getAllUsers, updateUser } from '@/routes/apis/user-apis';        

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboard,
  loader: async () => {
    const result = await getAllUsers({
      data: { limit: 100, offset: 0, sortBy: 'createdAt', sortOrder: 'desc' },
    });
    return result;
  },
});

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  phoneNumber: number | null;
  permissions: any;
  isAdmin: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: number;
  permissions: {
    patients?: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    bills?: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    tests?: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    parameters?: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    doctors?: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    reports?: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    users?: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  };
}

function AdminDashboard() {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const initialData = Route.useLoaderData();

  const [users, setUsers] = useState<UserData[]>(initialData?.data || []);
  const [selectedView, setSelectedView] = useState<'users' | 'add' | 'edit'>('users');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: undefined,
    permissions: {
      patients: { view: false, create: false, edit: false, delete: false },
      bills: { view: false, create: false, edit: false, delete: false },
      tests: { view: false, create: false, edit: false, delete: false },
      parameters: { view: false, create: false, edit: false, delete: false },
      doctors: { view: false, create: false, edit: false, delete: false },
      reports: { view: false, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
    },
  });

  const modules = [
    { key: 'patients', label: 'Patients' },
    { key: 'bills', label: 'Bills' },
    { key: 'tests', label: 'Tests' },
    { key: 'parameters', label: 'Parameters' },
    { key: 'doctors', label: 'Doctors' },
    { key: 'reports', label: 'Reports' },
    { key: 'users', label: 'Users' },
  ];

  const actions = ['view', 'create', 'edit', 'delete'];

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
      phoneNumber: undefined,
      permissions: {
        patients: { view: false, create: false, edit: false, delete: false },
        bills: { view: false, create: false, edit: false, delete: false },
        tests: { view: false, create: false, edit: false, delete: false },
        parameters: { view: false, create: false, edit: false, delete: false },
        doctors: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      },
    });
  };

  const handleAddUser = () => {
    resetForm();
    setSelectedView('add');
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      phoneNumber: user.phoneNumber || undefined,
      permissions: user.permissions || {
        patients: { view: false, create: false, edit: false, delete: false },
        bills: { view: false, create: false, edit: false, delete: false },
        tests: { view: false, create: false, edit: false, delete: false },
        parameters: { view: false, create: false, edit: false, delete: false },
        doctors: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      },
    });
    setSelectedView('edit');
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const result = await deleteUser({ data: { id: userId } });
      if (result.success) {
        setUsers(users.filter(u => u.id !== userId));
        showToast('User deleted successfully', 'success');
      } else {
        showToast('Failed to delete user', 'error');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to delete user', 'error');
    }
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await createUser({ data: formData });
      if (result.success) {
        const updatedUsers = await getAllUsers({
          data: { limit: 100, offset: 0, sortBy: 'createdAt', sortOrder: 'desc' },
        });
        setUsers(updatedUsers.data);
        showToast('User created successfully', 'success');
        setSelectedView('users');
        resetForm();
      } else {
        showToast('Failed to create user', 'error');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to create user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsSubmitting(true);
    try {
      const updateData: any = {
        id: selectedUser.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        permissions: formData.permissions,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const result = await updateUser({ data: updateData });
      if (result.success) {
        const updatedUsers = await getAllUsers({
          data: { limit: 100, offset: 0, sortBy: 'createdAt', sortOrder: 'desc' },
        });
        setUsers(updatedUsers.data);
        showToast('User updated successfully', 'success');
        setSelectedView('users');
        setSelectedUser(null);
        resetForm();
      } else {
        showToast('Failed to update user', 'error');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to update user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePermission = (module: string, action: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module as keyof typeof prev.permissions],
          [action]: !prev.permissions[module as keyof typeof prev.permissions]?.[action as keyof any],
        },
      },
    }));
  };

  const toggleAllPermissions = (module: string, grant: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          view: grant,
          create: grant,
          edit: grant,
          delete: grant,
        },
      },
    }));
  };

  if (selectedView === 'users') {
    return (
      <Layout requiredRole={['admin']}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <Button
              onClick={handleAddUser}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <Button
                        onClick={() => handleEditUser(user)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }

  const isAddMode = selectedView === 'add';
  return (
    <Layout requiredRole={['admin']}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isAddMode ? 'Add New User' : 'Edit User'}
          </h1>
          <button
            onClick={() => {
              setSelectedView('users');
              resetForm();
              setSelectedUser(null);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={isAddMode ? handleSubmitAdd : handleSubmitEdit} className="bg-white rounded-lg shadow p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="password">Password {!isAddMode && '(leave empty to keep current)'}</Label>
                <input
                  id="password"
                  type="password"
                  required={isAddMode}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Receptionist">Receptionist</option>
                </select>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <input
                  id="phone"
                  type="number"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h2>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">{module.label}</h3>
                    <div className="space-x-2">
                      <button
                        type="button"
                        onClick={() => toggleAllPermissions(module.key, true)}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                      >
                        Grant All
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleAllPermissions(module.key, false)}
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Revoke All
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {actions.map((action) => (
                      <label key={action} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            formData.permissions[module.key as keyof typeof formData.permissions]?.[
                              action as keyof any
                            ] || false
                          }
                          onChange={() => togglePermission(module.key, action)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 capitalize">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={() => {
                setSelectedView('users');
                resetForm();
                setSelectedUser(null);
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : isAddMode ? 'Create User' : 'Update User'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
