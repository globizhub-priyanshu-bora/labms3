# Permission & Access Control Guide

## Overview
This guide explains how the permission system works in the Medical Lab Management System.

## Architecture

### Two-Level Access Control

1. **Role-Based Access Control (RBAC)**
   - Routes are protected by required roles
   - Users must have the specified role to access a route
   - Admin role bypasses all role requirements

2. **Permission-Based Access Control (PBAC)**
   - Fine-grained control within modules
   - Supports: view, create, edit, delete permissions
   - Can be customized per user by admin

## User Roles

### 1. Admin
- **Full System Access**
- All routes accessible
- All permissions granted
- Can manage other users and permissions
- Can access: Admin Dashboard, All Reports, All Data

### 2. Cashier
- **Billing & Patient Management**
- Routes: /patients, /bills, /dashboard
- Permissions:
  - Patients: View ✓, Create ✓, Edit ✗, Delete ✗
  - Bills: View ✓, Create ✓, Edit ✓, Delete ✗
  - Tests: View ✓ only
  - Reports: View ✓ only

### 3. Lab Technician (lab_tech)
- **Test & Report Management**
- Routes: /tests, /test-results, /test-parameters, /dashboard
- Permissions:
  - Tests: View ✓, Create ✓, Edit ✓, Delete ✗
  - Reports: View ✓, Create ✓, Edit ✓, Delete ✗
  - Patients: View ✓ only
  - Bills: View ✓ only

### 4. Receptionist
- **Patient Registration & Appointment**
- Routes: /patients, /doctors, /dashboard
- Permissions:
  - Patients: View ✓, Create ✓, Edit ✗, Delete ✗
  - Doctors: View ✓ only
  - Bills: View ✓ only

## Implementation

### Using Permission Manager

```typescript
import { 
  hasPermission, 
  hasModuleAccess, 
  hasRoleAccess 
} from '@/lib/permission-manager';

// Check specific permission
if (hasPermission(user.permissions, 'bills', 'create')) {
  // User can create bills
}

// Check module access
if (hasModuleAccess(user.permissions, 'bills')) {
  // User has any access to bills module
}

// Check role access
if (hasRoleAccess(user.role, ['admin', 'cashier'])) {
  // User is admin or cashier
}
```

### Route Protection

```typescript
// Require specific role
<Layout requiredRole={['admin', 'cashier']}>
  <YourComponent />
</Layout>

// Automatically checks:
// 1. User is authenticated
// 2. Lab setup is completed
// 3. User has required role
// Shows access denied if requirements not met
```

### Conditional Rendering

```typescript
import { useAuth } from '@/components/ProtectedRoute';
import { hasPermission } from '@/lib/permission-manager';

function MyComponent() {
  const { user } = useAuth();

  return (
    <>
      {hasPermission(user?.permissions, 'bills', 'create') && (
        <button onClick={createBill}>Create Bill</button>
      )}
    </>
  );
}
```

## Permission Structure

### Default Permission Schema

```typescript
{
  module: {
    view: boolean,    // Can view/list resources
    create: boolean,  // Can create new resources
    edit: boolean,    // Can update resources
    delete: boolean   // Can delete resources
  }
}

// Modules
- patients
- bills
- tests
- parameters (test parameters)
- doctors
- reports
- users
```

## Managing Permissions

### For Admins

1. **Create New User**
   - Go to: Admin Dashboard → Add User
   - Select role
   - Set specific permissions
   - Click "Grant All" for quick setup
   - Click "Revoke All" to remove all permissions

2. **Edit User Permissions**
   - Go to: Admin Dashboard → Select User → Edit
   - Modify individual permissions
   - Use "Grant All" / "Revoke All" buttons
   - Save changes

3. **View User Permissions**
   - Check User Management table
   - See role assignment
   - Review permissions in edit view

### For Module Developers

When adding new modules:

1. Add module to `permission-manager.ts`:
```typescript
export function getDefaultPermissionsForRole(role: string) {
  const adminPermissions = {
    // ... existing modules
    newmodule: { view: true, create: true, edit: true, delete: true },
  };
  // Update all roles
}
```

2. Protect routes:
```typescript
<Layout requiredRole={['admin']}>
  <Component />
</Layout>
```

3. Conditional features:
```typescript
if (hasPermission(user?.permissions, 'newmodule', 'create')) {
  // Show create button
}
```

## Security Considerations

### Frontend Checks (Not Sufficient Alone)
✓ Prevent UI access
✓ Hide unauthorized features
✗ Cannot prevent direct API calls

### Backend Enforcement (Required)
✓ API validates user permissions
✓ API enforces lab isolation
✓ API checks role access
✓ Database-level security

### Always Remember
```
Frontend Security = User Experience
Backend Security = Actual Security
Both are required!
```

## Multi-Tenancy (Lab Isolation)

Every API call automatically:
1. Gets user's labId
2. Filters all queries by labId
3. Prevents cross-lab data access
4. Enforces data isolation

```typescript
// All APIs use this
const labId = await getLabIdFromRequest(request);

// This ensures:
const bills = await db
  .select()
  .from(billSchema)
  .where(eq(billSchema.labId, labId)); // ← Forced lab isolation
```

## Testing Permissions

### Manual Testing

1. **Test Role Access**
   - Login as different users (admin, cashier, lab_tech)
   - Verify each can only access their routes
   - Verify access denied messages appear

2. **Test Module Permissions**
   - Create/edit user with specific permissions
   - Verify buttons appear/disappear based on permissions
   - Test create/edit/delete operations

3. **Test Multi-Lab Isolation**
   - Create 2 labs
   - Create users in each lab
   - Verify each user only sees their lab's data

### Unit Tests (Recommended)

```typescript
import { hasPermission, hasRoleAccess } from '@/lib/permission-manager';

describe('Permission Manager', () => {
  it('should grant admin all permissions', () => {
    const perms = getDefaultPermissionsForRole('admin');
    expect(hasPermission(perms, 'bills', 'delete')).toBe(true);
  });

  it('should deny cashier bill delete', () => {
    const perms = getDefaultPermissionsForRole('cashier');
    expect(hasPermission(perms, 'bills', 'delete')).toBe(false);
  });

  it('should allow admin all role access', () => {
    expect(hasRoleAccess('admin', ['cashier'])).toBe(true);
  });
});
```

## Common Issues & Solutions

### Issue: User sees "Access Denied"
**Solution:**
1. Check user's assigned role
2. Verify route requires that role
3. Check if role was updated (may need logout/login)

### Issue: Feature button not appearing
**Solution:**
1. Check permission-manager.ts for module permissions
2. Verify user has permission for that action
3. Check conditional rendering logic

### Issue: User can access data they shouldn't
**Solution:**
1. Check backend API enforces labId filtering
2. Verify lab isolation in database queries
3. Check session management

## Best Practices

1. **Always enforce backend permissions**
   - Frontend is for UX only
   - Backend must validate every request

2. **Use role-based defaults**
   - Set sensible defaults for each role
   - Allow customization via permissions

3. **Regular audits**
   - Review permission logs
   - Check unusual access patterns
   - Test role transitions

4. **Clear documentation**
   - Document who can do what
   - Keep permission matrix updated
   - Train staff on access levels

5. **Principle of Least Privilege**
   - Give minimum necessary permissions
   - Revoke when role changes
   - Audit before elevating permissions

---

**For Support:** Check IMPROVEMENTS.md for general system information
**Last Updated:** 2026-01-02
