import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useContext, createContext, useState, useEffect } from "react";
import { c as createLucideIcon, a2 as House, a3 as Building2, g as getCurrentUser } from "./router-BXu3XE-7.mjs";
const __iconNode$7 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$7);
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
];
const PanelsTopLeft = createLucideIcon("panels-top-left", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function hasRoleAccess(userRole, requiredRoles) {
  if (userRole === "admin" || userRole === "Admin") {
    return true;
  }
  if (!requiredRoles) {
    return true;
  }
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.some(
    (role) => userRole.toLowerCase() === role.toLowerCase()
  );
}
const AuthContext = createContext({
  user: null,
  loading: true
});
const useAuth = () => useContext(AuthContext);
const ProtectedRoute = ({
  children,
  requiredRole
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await getCurrentUser();
        if (!result.success || !result.user) {
          setLoading(false);
          navigate({ to: "/" });
          return;
        }
        const userData = result.user;
        if (!userData.hasCompletedSetup || !userData.labId) {
          setLoading(false);
          navigate({ to: "/lab-setup" });
          return;
        }
        if (requiredRole && !hasRoleAccess(userData.role, requiredRole)) {
          setError(`Access denied. This page requires ${Array.isArray(requiredRole) ? requiredRole.join(", ") : requiredRole} role.`);
          setLoading(false);
          return;
        }
        setUser(userData);
        setLoading(false);
      } catch (error2) {
        console.error("Auth check error:", error2);
        setError("Failed to verify authentication");
        setLoading(false);
        navigate({ to: "/" });
      }
    };
    checkAuth();
  }, [navigate, requiredRole]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Loading..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "text-center max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-red-800 mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-red-700", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate({ to: "/dashboard" }),
          className: "mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded",
          children: "Go to Dashboard"
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, loading }, children });
};
function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const handleLogout = async () => {
    logout();
    navigate({ to: "/login" });
  };
  const hasPermission = (resource, action) => {
    if (user.isAdmin) return true;
    if (!user.permissions) return false;
    const perms = user.permissions;
    return perms?.[resource]?.[action] ?? false;
  };
  const getMenuItems = () => {
    const items = [];
    if (hasPermission("patients", "view") || hasPermission("patient", "read")) {
      items.push({
        to: "/patients/register",
        label: "Patient Registration",
        icon: Users
      });
    }
    if (hasPermission("tests", "view") || hasPermission("test", "read")) {
      items.push({
        to: "/tests/",
        label: "Tests",
        icon: PanelsTopLeft
      });
    }
    if (hasPermission("doctors", "view") || hasPermission("doctor", "read")) {
      items.push({
        to: "/doctors/",
        label: "Doctors",
        icon: Users
      });
    }
    if (hasPermission("parameters", "view") || hasPermission("parameters", "read") || hasPermission("test_parameter", "read")) {
      items.push({
        to: "/test-parameters/",
        label: "Parameters",
        icon: Settings
      });
    }
    if (hasPermission("bills", "view") || hasPermission("bills", "create") || hasPermission("bill", "read")) {
      items.push({
        to: "/bills/$id",
        label: "Bills",
        icon: PanelsTopLeft
      });
    }
    items.push({
      to: "/lab-management",
      label: "Lab Management",
      icon: PanelsTopLeft
    });
    return items;
  };
  const menuItems = getMenuItems();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("nav", { className: "bg-white border-b border-gray-200 sticky top-0 z-40", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs(Link, { to: user.isAdmin ? "/lab-management" : "/dashboard", className: "flex items-center gap-3 group", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-2 rounded-lg transition-colors group-hover:bg-gray-800", children: /* @__PURE__ */ jsx(FlaskConical, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:block", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold text-gray-900", children: "Lab Management" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Professional Healthcare Lab" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-1", children: [
        menuItems.map((item, index) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: item.to,
            className: "px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-2 transition-colors",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4" }),
              item.label
            ]
          },
          index
        )),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowMoreDropdown(!showMoreDropdown),
              className: "px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-1 transition-colors ml-2",
              children: [
                /* @__PURE__ */ jsx(EllipsisVertical, { className: "w-4 h-4" }),
                "More",
                /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showMoreDropdown ? "rotate-180" : ""}` })
              ]
            }
          ),
          showMoreDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50", children: [
            (user.isAdmin || hasPermission("users", "view")) && /* @__PURE__ */ jsxs(Link, { to: "/admin/dashboard", className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
              "User Management"
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(House, { className: "w-4 h-4" }),
              "Dashboard"
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setShowMoreDropdown(false);
                  navigate({ to: "/lab-management" });
                },
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4" }),
                  "Lab Details"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowUserMenu(!showUserMenu),
              className: "px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md inline-flex items-center gap-2 transition-colors",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold", children: user.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxs("div", { className: "hidden md:block", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-700", children: user.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: user.role })
                ] }),
                /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showUserMenu ? "rotate-180" : ""}` })
              ]
            }
          ),
          showUserMenu && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 border-b border-gray-200", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: user.email })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleLogout,
                className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
                  "Logout"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowMobileMenu(!showMobileMenu),
            className: "lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors",
            children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: "Lab Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Name: Your Laboratory | Registration: LAB-12345" })
    ] }) }) }) }),
    showMobileMenu && /* @__PURE__ */ jsx("div", { className: "lg:hidden bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 space-y-1", children: [
      menuItems.map((item, index) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.to,
          onClick: () => setShowMobileMenu(false),
          className: "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md",
          children: item.label
        },
        index
      )),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-2 mt-2", children: [
        (user.isAdmin || hasPermission("users", "view")) && /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin/dashboard",
            onClick: () => setShowMobileMenu(false),
            className: "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md",
            children: "User Management"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/dashboard",
            onClick: () => setShowMobileMenu(false),
            className: "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md",
            children: "Dashboard"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/lab-management",
            onClick: () => setShowMobileMenu(false),
            className: "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md",
            children: "Lab Details"
          }
        )
      ] })
    ] }) })
  ] });
}
const Layout = ({ children, requiredRole }) => {
  return /* @__PURE__ */ jsx(ProtectedRoute, { requiredRole, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { children })
  ] }) });
};
export {
  Layout as L,
  Users as U,
  useAuth as u
};
