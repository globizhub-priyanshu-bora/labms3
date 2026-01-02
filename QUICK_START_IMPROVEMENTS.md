# Quick Start: Using the Improved System

## What Changed?

### 1. Toast Notifications (Instead of Alert Popups)
✅ Professional, non-blocking notifications  
✅ Color-coded by type (success, error, warning, info)  
✅ Auto-dismiss with manual close button  
✅ Better UX for users  

**How to use:**
```typescript
import { useToast } from '@/components/Toast';

function MyComponent() {
  const { showToast } = useToast();

  const handleSave = async () => {
    try {
      const result = await saveData();
      if (result.success) {
        showToast('Saved successfully!', 'success');
      }
    } catch (error) {
      showToast('Failed to save', 'error');
    }
  };
}
```

### 2. Permission System (Proper Access Control)
✅ Role-based access (Admin, Cashier, Lab Tech, Receptionist)  
✅ Fine-grained permissions (view, create, edit, delete)  
✅ Automatic access enforcement on routes  
✅ Safe API isolation by lab  

**Updated Roles:**
- **Admin**: Full system access
- **Cashier**: Patient & Bill management
- **Lab Tech**: Test & Report management
- **Receptionist**: Patient registration

### 3. Dynamic Bills & Reports
✅ Data pulled from database, not hard-coded  
✅ Real-time calculations  
✅ Support for discounts and taxes  
✅ Professional formatting  

**Bill Creation Now:**
- Select patient from database
- Choose tests (real-time price calculation)
- Apply discount/tax percentage
- Generate invoice automatically

### 4. Better Error Handling
✅ Clear error messages  
✅ Proper loading states  
✅ Type-safe validation  
✅ Graceful fallbacks  

## For End Users

### Logging In
1. Login with your credentials
2. Complete lab setup (if first time)
3. You'll see only features you have permission for

### Creating a Bill
1. Click "Lab Management" → "Create Bill"
2. Select patient from dropdown
3. Choose tests (prices auto-calculate)
4. Set discount/tax if needed
5. Click "Create Bill"
6. See success toast notification
7. View bill with professional formatting

### Managing Users (Admin Only)
1. Go to "Admin Dashboard"
2. Click "Add User"
3. Fill in details
4. Use "Grant All" / "Revoke All" for quick permission setup
5. Click "Create User"
6. See success notification

## For Developers

### Adding Toast Notifications
```typescript
const { showToast } = useToast();

// Success
showToast('Operation successful', 'success');

// Error
showToast('Operation failed', 'error');

// Warning
showToast('Are you sure?', 'warning');

// Info
showToast('Important information', 'info');
```

### Checking Permissions
```typescript
import { hasPermission, hasRoleAccess } from '@/lib/permission-manager';

// In components
if (hasPermission(user?.permissions, 'bills', 'create')) {
  // Show create button
}

// Protect routes
<Layout requiredRole={['admin', 'cashier']}>
  <Component />
</Layout>
```

### Creating API Endpoints
All API endpoints automatically enforce:
- Lab isolation (multi-tenancy)
- Permission checking
- Error handling
- Type validation

Example from existing code:
```typescript
export const getBillById = createServerFn({ method: 'GET' })
  .inputValidator(BillIdSchema)
  .handler(async ({ data, request }) => {
    try {
      // ✅ Automatically enforces lab isolation
      const labId = await getLabIdFromRequest(request);
      
      const [bill] = await db
        .select()
        .from(billSchema)
        .where(
          and(
            eq(billSchema.id, data.id),
            eq(billSchema.labId, labId), // ← Lab isolation
            isNull(billSchema.deletedAt)
          )
        )
        .limit(1);

      return { success: true, data: bill };
    } catch (error) {
      throw new Error(error.message);
    }
  });
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/components/Toast.tsx` | Toast notification system |
| `src/lib/permission-manager.ts` | Permission & role checking |
| `src/components/ProtectedRoute.tsx` | Route access control |
| `src/components/BillModal.tsx` | Dynamic bill creation |
| `src/routes/admin/user-management.tsx` | User & permission management |
| `src/routes/doctors/index.tsx` | Doctor management with toasts |

## Common Tasks

### Make a Toast Notification
```typescript
const { showToast } = useToast();
showToast('Your message', 'success'); // or 'error', 'warning', 'info'
```

### Check User Permission
```typescript
if (hasPermission(user?.permissions, 'bills', 'delete')) {
  // User can delete bills
}
```

### Require Role for Route
```typescript
<Layout requiredRole={['admin']}>
  <AdminComponent />
</Layout>
```

### Get List with Error Handling
```typescript
try {
  const result = await getAllBills({ data: { limit: 50, offset: 0 } });
  if (result.success) {
    setBills(result.data);
    showToast('Loaded successfully', 'success');
  }
} catch (error) {
  showToast(error.message, 'error');
}
```

## Testing Checklist

Before deploying:
- [ ] Test login with different user roles
- [ ] Verify each role only sees permitted features
- [ ] Test creating/editing/deleting resources
- [ ] Verify toast notifications appear
- [ ] Test bill creation with dynamic calculations
- [ ] Test error cases show proper messages
- [ ] Verify hard reload still works (no auth issues)

## Troubleshooting

**Q: User sees "Access Denied"**  
A: Check if user has required role. May need logout/login to refresh.

**Q: Toast notification not showing**  
A: Ensure `useToast()` is called inside a component wrapped by `<ToastProvider>` (happens in root layout).

**Q: Features button not showing**  
A: Check user permissions in admin dashboard, verify permission-manager.ts includes the module.

**Q: Bill shows wrong data**  
A: Ensure bill was created after all tests were registered. Check lab setup is complete.

## Next Steps

1. **Test the system** thoroughly with different user roles
2. **Review** IMPROVEMENTS.md for technical details
3. **Check** PERMISSIONS_GUIDE.md for permission system details
4. **Deploy** to staging first, then production
5. **Monitor** logs for any issues

---

**Need Help?** Check the documentation files or review the code comments.  
**Version**: 1.0.0 | **Updated**: 2026-01-02
