import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { u as useAuth, L as Layout } from "./Layout-Dbn2LpV8.mjs";
import { W as Route$2, B as Button, X, L as Label, Y as deleteUser, t as toast, Z as updateUser, _ as getAllUsers, $ as createUser } from "./router-BXu3XE-7.mjs";
import { P as Plus } from "./plus.mjs";
import { S as SquarePen, T as Trash2 } from "./trash-2.mjs";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "react-hook-form";
import "@radix-ui/react-label";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "bcryptjs";
import "cookie";
import "drizzle-orm";
import "zod";
import "./session-manager-CtAttBZO.mjs";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "./helpers-BpXhOhAI.mjs";
function AdminDashboard() {
  const {
    user: currentUser
  } = useAuth();
  const initialData = Route$2.useLoaderData();
  const [users, setUsers] = useState(initialData?.data || []);
  const [selectedView, setSelectedView] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: void 0,
    permissions: {
      patients: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      bills: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      tests: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      parameters: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      doctors: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      reports: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      users: {
        view: false,
        create: false,
        edit: false,
        delete: false
      }
    }
  });
  const modules = [{
    key: "patients",
    label: "Patients"
  }, {
    key: "bills",
    label: "Bills"
  }, {
    key: "tests",
    label: "Tests"
  }, {
    key: "parameters",
    label: "Parameters"
  }, {
    key: "doctors",
    label: "Doctors"
  }, {
    key: "reports",
    label: "Reports"
  }, {
    key: "users",
    label: "Users"
  }];
  const actions = ["view", "create", "edit", "delete"];
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      phoneNumber: void 0,
      permissions: {
        patients: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        bills: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        tests: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        parameters: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        doctors: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        reports: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        users: {
          view: false,
          create: false,
          edit: false,
          delete: false
        }
      }
    });
  };
  const handleAddUser = () => {
    resetForm();
    setSelectedView("add");
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      phoneNumber: user.phoneNumber || void 0,
      permissions: user.permissions || {
        patients: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        bills: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        tests: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        parameters: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        doctors: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        reports: {
          view: false,
          create: false,
          edit: false,
          delete: false
        },
        users: {
          view: false,
          create: false,
          edit: false,
          delete: false
        }
      }
    });
    setSelectedView("edit");
  };
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const result = await deleteUser({
        data: {
          id: userId
        }
      });
      if (result.success) {
        setUsers(users.filter((u) => u.id !== userId));
        toast.success("User deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete user");
    }
  };
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.name.trim()) {
        toast.error("Name is required");
        setIsSubmitting(false);
        return;
      }
      if (!formData.email.trim()) {
        toast.error("Email is required");
        setIsSubmitting(false);
        return;
      }
      if (!formData.password.trim()) {
        toast.error("Password is required");
        setIsSubmitting(false);
        return;
      }
      if (!formData.role.trim()) {
        toast.error("Role is required");
        setIsSubmitting(false);
        return;
      }
      const result = await createUser({
        data: formData
      });
      if (result.success) {
        const updatedUsers = await getAllUsers({
          data: {
            limit: 100,
            offset: 0,
            sortBy: "createdAt",
            sortOrder: "desc"
          }
        });
        if (updatedUsers.success) {
          setUsers(updatedUsers.data);
          toast.success("User created successfully");
          setSelectedView("users");
          resetForm();
        } else {
          toast.error("User created but failed to reload list");
        }
      } else {
        toast.error(result.error || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsSubmitting(true);
    try {
      if (!formData.name.trim()) {
        toast.error("Name is required");
        setIsSubmitting(false);
        return;
      }
      if (!formData.email.trim()) {
        toast.error("Email is required");
        setIsSubmitting(false);
        return;
      }
      if (!formData.role.trim()) {
        toast.error("Role is required");
        setIsSubmitting(false);
        return;
      }
      const updateData = {
        id: selectedUser.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        permissions: formData.permissions
      };
      if (formData.password) {
        updateData.password = formData.password;
      }
      const result = await updateUser({
        data: updateData
      });
      if (result.success) {
        const updatedUsers = await getAllUsers({
          data: {
            limit: 100,
            offset: 0,
            sortBy: "createdAt",
            sortOrder: "desc"
          }
        });
        if (updatedUsers.success) {
          setUsers(updatedUsers.data);
          toast.success("User updated successfully");
          setSelectedView("users");
          setSelectedUser(null);
          resetForm();
        } else {
          toast.error("User updated but failed to reload list");
        }
      } else {
        toast.error(result.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };
  const togglePermission = (module, action) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [action]: !prev.permissions[module]?.[action]
        }
      }
    }));
  };
  const toggleAllPermissions = (module, grant) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          view: grant,
          create: grant,
          edit: grant,
          delete: grant
        }
      }
    }));
  };
  if (selectedView === "users") {
    return /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin"], children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "User Management" }),
        /* @__PURE__ */ jsxs(Button, { onClick: handleAddUser, className: "bg-blue-600 hover:bg-blue-700", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "Add User"
        ] })
      ] }),
      users.length === 0 ? /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg p-8 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "No users found" }) }) : /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Role" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-sm font-semibold text-gray-900", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: users.map((user) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-900", children: user.name }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-600", children: user.email }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-600", children: user.role }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right text-sm space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { onClick: () => handleEditUser(user), variant: "outline", className: "px-3 py-1", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx(Button, { onClick: () => handleDeleteUser(user.id), variant: "destructive", className: "px-3 py-1", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
          ] })
        ] }, user.id)) })
      ] }) })
    ] }) });
  }
  const isEdit = selectedView === "edit";
  return /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin"], children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: isEdit ? "Edit User" : "Add New User" }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => {
        setSelectedView("users");
        resetForm();
        setSelectedUser(null);
      }, variant: "outline", children: [
        /* @__PURE__ */ jsx(X, { className: "w-4 h-4 mr-2" }),
        "Cancel"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: isEdit ? handleSubmitEdit : handleSubmitAdd, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Name *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({
            ...formData,
            name: e.target.value
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm", placeholder: "Enter user name" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Email *" }),
          /* @__PURE__ */ jsx("input", { type: "email", value: formData.email, onChange: (e) => setFormData({
            ...formData,
            email: e.target.value
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm", placeholder: "Enter email" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: [
            "Password ",
            isEdit && "(Leave blank to keep current)",
            "*"
          ] }),
          /* @__PURE__ */ jsx("input", { type: "password", value: formData.password, onChange: (e) => setFormData({
            ...formData,
            password: e.target.value
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm", placeholder: "Enter password" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Role *" }),
          /* @__PURE__ */ jsxs("select", { value: formData.role, onChange: (e) => setFormData({
            ...formData,
            role: e.target.value
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm", children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select role" }),
            /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
            /* @__PURE__ */ jsx("option", { value: "lab_tech", children: "Lab Technician" }),
            /* @__PURE__ */ jsx("option", { value: "cashier", children: "Cashier" }),
            /* @__PURE__ */ jsx("option", { value: "doctor", children: "Doctor" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-3", children: "Permissions" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: modules.map((module) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900", children: module.label }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
              const hasAny = actions.some((action) => formData.permissions[module.key]?.[action]);
              toggleAllPermissions(module.key, !hasAny);
            }, className: "text-sm text-blue-600 hover:text-blue-700", children: "Toggle All" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: actions.map((action) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: formData.permissions[module.key]?.[action] || false, onChange: () => togglePermission(module.key, action), className: "w-4 h-4 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 capitalize", children: action })
          ] }, action)) })
        ] }, module.key)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => {
          setSelectedView("users");
          resetForm();
          setSelectedUser(null);
        }, variant: "outline", children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, className: "bg-blue-600 hover:bg-blue-700", children: isSubmitting ? "Saving..." : isEdit ? "Update User" : "Create User" })
      ] })
    ] }) })
  ] }) });
}
export {
  AdminDashboard as component
};
