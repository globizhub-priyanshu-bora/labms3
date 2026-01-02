import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { u as useAuth, L as Layout } from "./Layout-CrsrUD83.mjs";
import { y as useToast, S as Route$2, B as Button, X, T as deleteUser, U as createUser, V as getAllUsers, W as updateUser } from "./router-B48m2_K0.mjs";
import { L as Label } from "./label-BgPmW2HV.mjs";
import { P as Plus } from "./plus.mjs";
import { S as SquarePen, T as Trash2 } from "./trash-2.mjs";
import "@tanstack/react-router";
import "./user.mjs";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "bcryptjs";
import "cookie";
import "drizzle-orm";
import "zod";
import "./session-manager-DRdZONnW.mjs";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "./helpers-VjNq_44e.mjs";
import "@radix-ui/react-label";
function AdminDashboard() {
  const {
    user: currentUser
  } = useAuth();
  const {
    showToast
  } = useToast();
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
        showToast("User deleted successfully", "success");
      } else {
        showToast("Failed to delete user", "error");
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to delete user", "error");
    }
  };
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
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
        setUsers(updatedUsers.data);
        showToast("User created successfully", "success");
        setSelectedView("users");
        resetForm();
      } else {
        showToast("Failed to create user", "error");
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to create user", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsSubmitting(true);
    try {
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
        setUsers(updatedUsers.data);
        showToast("User updated successfully", "success");
        setSelectedView("users");
        setSelectedUser(null);
        resetForm();
      } else {
        showToast("Failed to update user", "error");
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to update user", "error");
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
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100 border-b border-gray-200", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Role" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Created" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: users.map((user) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-900", children: user.name }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-600", children: user.email }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold", children: user.role }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-600", children: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-" }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm flex gap-2", children: [
            /* @__PURE__ */ jsx(Button, { onClick: () => handleEditUser(user), className: "px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx(Button, { onClick: () => handleDeleteUser(user.id), className: "px-3 py-1 bg-red-500 hover:bg-red-600 text-white", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
          ] })
        ] }, user.id)) })
      ] }) })
    ] }) });
  }
  const isAddMode = selectedView === "add";
  return /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin"], children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: isAddMode ? "Add New User" : "Edit User" }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setSelectedView("users");
        resetForm();
        setSelectedUser(null);
      }, className: "text-gray-600 hover:text-gray-900", children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: isAddMode ? handleSubmitAdd : handleSubmitEdit, className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Basic Information" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name *" }),
            /* @__PURE__ */ jsx("input", { id: "name", type: "text", required: true, value: formData.name, onChange: (e) => setFormData({
              ...formData,
              name: e.target.value
            }), className: "w-full px-3 py-2 border border-gray-300 rounded-md" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email *" }),
            /* @__PURE__ */ jsx("input", { id: "email", type: "email", required: true, value: formData.email, onChange: (e) => setFormData({
              ...formData,
              email: e.target.value
            }), className: "w-full px-3 py-2 border border-gray-300 rounded-md" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "password", children: [
              "Password ",
              !isAddMode && "(leave empty to keep current)"
            ] }),
            /* @__PURE__ */ jsx("input", { id: "password", type: "password", required: isAddMode, value: formData.password, onChange: (e) => setFormData({
              ...formData,
              password: e.target.value
            }), className: "w-full px-3 py-2 border border-gray-300 rounded-md" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "role", children: "Role *" }),
            /* @__PURE__ */ jsxs("select", { id: "role", required: true, value: formData.role, onChange: (e) => setFormData({
              ...formData,
              role: e.target.value
            }), className: "w-full px-3 py-2 border border-gray-300 rounded-md", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select role" }),
              /* @__PURE__ */ jsx("option", { value: "Admin", children: "Admin" }),
              /* @__PURE__ */ jsx("option", { value: "Cashier", children: "Cashier" }),
              /* @__PURE__ */ jsx("option", { value: "Lab Technician", children: "Lab Technician" }),
              /* @__PURE__ */ jsx("option", { value: "Receptionist", children: "Receptionist" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
            /* @__PURE__ */ jsx("input", { id: "phone", type: "number", value: formData.phoneNumber || "", onChange: (e) => setFormData({
              ...formData,
              phoneNumber: e.target.value ? parseInt(e.target.value) : void 0
            }), className: "w-full px-3 py-2 border border-gray-300 rounded-md" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Permissions" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: modules.map((module) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: module.label }),
            /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => toggleAllPermissions(module.key, true), className: "px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200", children: "Grant All" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => toggleAllPermissions(module.key, false), className: "px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200", children: "Revoke All" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4", children: actions.map((action) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: formData.permissions[module.key]?.[action] || false, onChange: () => togglePermission(module.key, action), className: "w-4 h-4 rounded border-gray-300" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 capitalize", children: action })
          ] }, action)) })
        ] }, module.key)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-end", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => {
          setSelectedView("users");
          resetForm();
          setSelectedUser(null);
        }, className: "px-4 py-2 bg-gray-600 hover:bg-gray-700", children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50", children: isSubmitting ? "Saving..." : isAddMode ? "Create User" : "Update User" })
      ] })
    ] })
  ] }) });
}
export {
  AdminDashboard as component
};
