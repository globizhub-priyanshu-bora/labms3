# Migration Guide: Applying Improvements to Other Components

This guide helps you apply the same patterns and improvements to other components in the system.

## 1. Migrating Alert() to Toast Notifications

### Before (Old Pattern)
```typescript
try {
  const result = await deletePatient({ data: { id: patientId } });
  alert('Patient deleted successfully');
} catch (error) {
  alert(error instanceof Error ? error.message : 'Failed to delete patient');
}
```

### After (New Pattern)
```typescript
import { useToast } from '@/components/Toast';

function MyComponent() {
  const { showToast } = useToast();

  const handleDelete = async (patientId: number) => {
    try {
      const result = await deletePatient({ data: { id: patientId } });
      if (result.success) {
        showToast('Patient deleted successfully', 'success');
      } else {
        showToast('Failed to delete patient', 'error');
      }
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to delete patient',
        'error'
      );
    }
  };

  return <button onClick={() => handleDelete(123)}>Delete</button>;
}
```

### Step-by-Step Migration
1. Import useToast: `import { useToast } from '@/components/Toast';`
2. Get showToast hook: `const { showToast } = useToast();`
3. Replace all `alert('...')` with `showToast('...', 'success|error|warning|info')`
4. Use 'success' for confirmations, 'error' for failures, 'warning' for cautions

### Toast Types Reference
```typescript
showToast('Operation successful', 'success');   // Green with checkmark
showToast('Something went wrong', 'error');     // Red with alert icon
showToast('Please confirm', 'warning');         // Yellow with alert icon
showToast('Important info', 'info');            // Blue with info icon
```

## 2. Protecting Routes with Permissions

### Before (No Access Control)
```typescript
export const Route = createFileRoute('/tests/')({
  component: TestManagement,
  // Anyone can access this
});
```

### After (With Access Control)
```typescript
export const Route = createFileRoute('/tests/')({
  component: () => (
    <Layout requiredRole={['admin', 'lab_tech']}>
      <TestManagement />
    </Layout>
  ),
  loader: async () => {
    // ... data loading
  },
});
```

### Available Roles
- `'admin'` - Full system access
- `'cashier'` or `'Cashier'` - Billing operations
- `'lab_tech'` or `'Lab Technician'` - Lab operations
- `'receptionist'` or `'Receptionist'` - Patient registration

## 3. Checking Permissions in Components

### Before (No Permission Checking)
```typescript
function TestComponent() {
  return (
    <>
      <button onClick={createTest}>Create Test</button>
      <button onClick={deleteTest}>Delete Test</button>
    </>
  );
}
```

### After (Permission-Aware)
```typescript
import { useAuth } from '@/components/ProtectedRoute';
import { hasPermission } from '@/lib/permission-manager';

function TestComponent() {
  const { user } = useAuth();

  return (
    <>
      {hasPermission(user?.permissions, 'tests', 'create') && (
        <button onClick={createTest}>Create Test</button>
      )}
      {hasPermission(user?.permissions, 'tests', 'delete') && (
        <button onClick={deleteTest}>Delete Test</button>
      )}
    </>
  );
}
```

### Permission Checklist
```typescript
// Check specific permission
hasPermission(user?.permissions, 'module', 'action')
// Actions: 'view', 'create', 'edit', 'delete'

// Check any permission for module
hasModuleAccess(user?.permissions, 'module')

// Check role access
hasRoleAccess(user?.role, ['role1', 'role2'])
```

## 4. Adding Loading States to Forms

### Before (No Feedback)
```typescript
const handleSubmit = async (data) => {
  const result = await saveData(data);
  if (result.success) {
    showToast('Saved!', 'success');
  }
};

return <button onClick={handleSubmit}>Save</button>;
```

### After (With Loading State)
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);
const { showToast } = useToast();

const handleSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    const result = await saveData(data);
    if (result.success) {
      showToast('Saved successfully!', 'success');
      resetForm();
    } else {
      showToast('Failed to save', 'error');
    }
  } catch (error) {
    showToast(error.message, 'error');
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <button onClick={handleSubmit} disabled={isSubmitting}>
    {isSubmitting ? 'Saving...' : 'Save'}
  </button>
);
```

## 5. Better Error Handling Pattern

### Pattern for API Calls
```typescript
const loadData = async () => {
  try {
    const result = await fetchData({ data: { limit: 50, offset: 0 } });
    
    if (result.success && result.data) {
      setData(result.data);
      showToast('Loaded successfully', 'success');
    } else {
      showToast(result.error || 'Failed to load data', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast(
      error instanceof Error ? error.message : 'An error occurred',
      'error'
    );
  }
};
```

## 6. Making Components Dynamic (Database-Driven)

### Before (Hard-Coded Data)
```typescript
const tests = [
  { id: 1, name: 'Blood Test', price: 500 },
  { id: 2, name: 'Urine Test', price: 300 },
];

function TestList() {
  return tests.map(test => <div>{test.name}</div>);
}
```

### After (From Database)
```typescript
import { getAllTests } from '@/routes/apis/test-apis';

function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadTests = async () => {
      try {
        const result = await getAllTests({
          data: { limit: 100, offset: 0 }
        });
        
        if (result.success) {
          setTests(result.data || []);
        } else {
          showToast('Failed to load tests', 'error');
        }
      } catch (error) {
        showToast('Error loading tests', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, []);

  if (loading) return <div>Loading...</div>;

  return tests.map(test => (
    <div key={test.id}>
      {test.name} - ₹{test.price}
    </div>
  ));
}
```

## 7. Refactoring a Full Component

### Step-by-Step Example: Patient Management

#### Step 1: Add imports
```typescript
import { useToast } from '@/components/Toast';
import { hasPermission } from '@/lib/permission-manager';
import { useAuth } from '@/components/ProtectedRoute';
```

#### Step 2: Add state and hooks
```typescript
const { showToast } = useToast();
const { user } = useAuth();
const [isSubmitting, setIsSubmitting] = useState(false);
```

#### Step 3: Update handlers
```typescript
const handleCreate = async (data) => {
  setIsSubmitting(true);
  try {
    const result = await createPatient({ data });
    if (result.success) {
      showToast('Patient created successfully', 'success');
      resetForm();
      await loadPatients(); // Reload list
    } else {
      showToast('Failed to create patient', 'error');
    }
  } catch (error) {
    showToast(error instanceof Error ? error.message : 'Error occurred', 'error');
  } finally {
    setIsSubmitting(false);
  }
};
```

#### Step 4: Conditional rendering
```typescript
{hasPermission(user?.permissions, 'patients', 'create') && (
  <button onClick={handleCreate} disabled={isSubmitting}>
    {isSubmitting ? 'Creating...' : 'Create Patient'}
  </button>
)}
```

#### Step 5: Route protection
```typescript
export const Route = createFileRoute('/patients/')({
  component: () => (
    <Layout requiredRole={['admin', 'cashier']}>
      <PatientManagement />
    </Layout>
  ),
});
```

## 8. Adding New Modules to Permission System

### Step 1: Update permission-manager.ts
```typescript
export function getDefaultPermissionsForRole(role: string): PermissionMap {
  const adminPermissions: PermissionMap = {
    // ... existing modules
    newmodule: { view: true, create: true, edit: true, delete: true },
  };

  const cashierPermissions: PermissionMap = {
    // ... existing modules
    newmodule: { view: true, create: false, edit: false, delete: false },
  };

  // ... repeat for all roles
}
```

### Step 2: Use in components
```typescript
import { hasPermission } from '@/lib/permission-manager';

if (hasPermission(user?.permissions, 'newmodule', 'create')) {
  // Show create button
}
```

## 9. Checklist for Component Migration

- [ ] Replace `alert()` with `useToast()`
- [ ] Add `requiredRole` to route protection
- [ ] Check permissions in components
- [ ] Add loading states to forms
- [ ] Improve error messages
- [ ] Make data dynamic from database
- [ ] Add success/error feedback
- [ ] Test with different user roles
- [ ] Test with different permissions
- [ ] Verify toast notifications work

## 10. Common Mistakes to Avoid

❌ **Using alert() in new code**
✅ Use useToast() instead

❌ **Forgetting Lab ID isolation in APIs**
✅ Always filter by labId from getLabIdFromRequest()

❌ **Only checking frontend permissions**
✅ Always enforce in backend too

❌ **Forgetting to pass error messages**
✅ Include meaningful error text in toasts

❌ **Not disabling buttons during submission**
✅ Use isSubmitting state to disable and show loading text

❌ **Hard-coding data instead of fetching**
✅ Always load data from database/API

## Testing Each Migration

### Toast Test
```typescript
// Should show green success toast
showToast('Save completed', 'success');

// Should show red error toast
showToast('Something failed', 'error');
```

### Permission Test
```typescript
// Create users with different roles
// Verify buttons appear/disappear
// Verify routes show access denied if needed
```

### Database Test
```typescript
// Verify data loads from database
// Verify calculations are correct
// Verify lab isolation works
```

## Support & Questions

Refer to:
- `IMPROVEMENTS.md` - Technical details
- `PERMISSIONS_GUIDE.md` - Permission system details
- `QUICK_START_IMPROVEMENTS.md` - Quick examples
- Code comments in updated files

---

**Version**: 1.0.0 | **Last Updated**: 2026-01-02
