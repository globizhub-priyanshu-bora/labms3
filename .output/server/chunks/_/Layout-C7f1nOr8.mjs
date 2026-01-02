import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useContext, createContext, useState, useEffect } from "react";
import { c as createLucideIcon, B as Button, X, g as getCurrentUser, $ as logoutUser } from "./router-90jZpvv6.mjs";
import { U as User, A as Activity } from "./user.mjs";
const __iconNode$9 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$9);
const __iconNode$8 = [
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
const FlaskConical = createLucideIcon("flask-conical", __iconNode$8);
const __iconNode$7 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$7);
const __iconNode$6 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
];
const Power = createLucideIcon("power", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
];
const Stethoscope = createLucideIcon("stethoscope", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2", key: "125lnx" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }],
  ["path", { d: "M14.5 16h-5", key: "1ox875" }]
];
const TestTube = createLucideIcon("test-tube", __iconNode$1);
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
const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout error:", error);
      navigate({ to: "/" });
    }
  };
  if (!user) {
    return null;
  }
  const hasPermission = (module, action) => {
    if (user.isAdmin) return true;
    const permissions = user.permissions || {};
    if (permissions[module]?.[action] === true) {
      return true;
    }
    const singularModule = module.replace(/s$/, "");
    if (permissions[singularModule]?.[action] === true) {
      return true;
    }
    if (action === "read" && permissions[module]?.["view"] === true) {
      return true;
    }
    return false;
  };
  const getMenuItems = () => {
    const items = [];
    if (user.isAdmin) {
      items.push({
        type: "dropdown",
        label: "User Management",
        icon: Settings
      });
    } else {
      items.push({
        to: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard
      });
    }
    if (hasPermission("patients", "create") || hasPermission("patient", "create")) {
      items.push({
        to: "/patients/register",
        label: "Register Patient",
        icon: User
      });
    }
    if (user.isAdmin || hasPermission("doctors", "view") || hasPermission("doctors", "create") || hasPermission("doctor", "view") || hasPermission("doctor", "create")) {
      items.push({
        to: "/doctors",
        label: "Doctors",
        icon: Stethoscope
      });
    }
    if (hasPermission("tests", "view") || hasPermission("tests", "read") || hasPermission("test", "read")) {
      items.push({
        to: "/tests/",
        label: "Tests",
        icon: TestTube
      });
    }
    if (hasPermission("parameters", "view") || hasPermission("parameters", "read") || hasPermission("test_parameter", "read")) {
      items.push({
        to: "/test-parameters/",
        label: "Parameters",
        icon: Activity
      });
    }
    if (hasPermission("bills", "view") || hasPermission("bills", "create") || hasPermission("bill", "read")) {
      items.push({
        to: "/bills/$id",
        label: "Bills",
        icon: Receipt
      });
    }
    items.push({
      to: "/lab-management",
      label: "Lab Management",
      icon: LayoutDashboard
    });
    return items;
  };
  const menuItems = getMenuItems();
  return /* @__PURE__ */ jsx("nav", { className: "bg-white border-b border-gray-300 sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs(Link, { to: user.isAdmin ? "/admin/dashboard" : "/dashboard", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-2 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(FlaskConical, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-black hidden sm:inline", children: "GlobPathology" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-1", children: menuItems.map((item) => {
        const Icon = item.icon;
        if (item.type === "dropdown") {
          return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setShowAdminDropdown(!showAdminDropdown),
                className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors hover:bg-gray-100",
                children: [
                  /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: item.label }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showAdminDropdown ? "rotate-180" : ""}` })
                ]
              }
            ),
            showAdminDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-300 py-1 z-50", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/dashboard",
                  onClick: () => setShowAdminDropdown(false),
                  className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(LayoutDashboard, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Dashboard" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/admin/dashboard",
                  onClick: () => setShowAdminDropdown(false),
                  className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "User Management" })
                  ]
                }
              )
            ] })
          ] }, "admin-dropdown");
        }
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: item.to,
            className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors",
            activeProps: {
              className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md"
            },
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: item.label })
            ]
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowUserMenu(!showUserMenu),
              className: "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm", children: user.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline max-w-32 truncate text-gray-900", children: user.name })
              ]
            }
          ),
          showUserMenu && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-300 py-1 top-full z-50", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-gray-200", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: user.email }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-black font-medium mt-1", children: user.role })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => {
                  setShowUserMenu(false);
                  handleLogout();
                },
                className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Power, { className: "w-4 h-4" }),
                  "Logout"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
            className: "lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
            children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
          }
        )
      ] })
    ] }),
    isMobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "lg:hidden border-t border-gray-300 py-4 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "px-4 py-3 bg-gray-50 rounded-lg mb-2 border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-black p-2 rounded-full", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: user.role })
        ] })
      ] }) }),
      menuItems.map((item) => {
        const Icon = item.icon;
        if (item.type === "dropdown") {
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setShowAdminDropdown(!showAdminDropdown),
                className: "flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsx("span", { children: item.label })
                  ] }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showAdminDropdown ? "rotate-180" : ""}` })
                ]
              }
            ),
            showAdminDropdown && /* @__PURE__ */ jsxs("div", { className: "pl-4 space-y-2", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/dashboard",
                  onClick: () => {
                    setShowAdminDropdown(false);
                    setIsMobileMenuOpen(false);
                  },
                  className: "flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors ml-4 border-l-2 border-gray-300",
                  children: [
                    /* @__PURE__ */ jsx(LayoutDashboard, { className: "w-5 h-5" }),
                    "Dashboard"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/admin/dashboard",
                  onClick: () => {
                    setShowAdminDropdown(false);
                    setIsMobileMenuOpen(false);
                  },
                  className: "flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors ml-4 border-l-2 border-gray-300",
                  children: [
                    /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }),
                    "User Management"
                  ]
                }
              )
            ] })
          ] }, "admin-mobile-dropdown");
        }
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: item.to,
            onClick: () => setIsMobileMenuOpen(false),
            className: "flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors",
            activeProps: {
              className: "flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-black rounded-lg"
            },
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }),
              item.label
            ]
          },
          item.to
        );
      }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => {
            setIsMobileMenuOpen(false);
            handleLogout();
          },
          className: "flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2 w-full",
          children: [
            /* @__PURE__ */ jsx(Power, { className: "w-5 h-5" }),
            "Logout"
          ]
        }
      )
    ] }) })
  ] }) });
};
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
