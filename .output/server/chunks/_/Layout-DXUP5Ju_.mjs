import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useContext, createContext, useState, useEffect } from "react";
import { c as createLucideIcon, X, g as getCurrentUser, a4 as logoutUser, t as toast } from "./router-BxwJzg91.mjs";
const __iconNode$3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$3);
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
const __iconNode = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode);
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
  loading: true,
  logout: async () => {
  }
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
  const handleLogout = async () => {
    try {
      const result = await logoutUser({});
      if (result.success) {
        toast.success("Logged out successfully");
        setUser(null);
        navigate({ to: "/" });
      } else {
        toast.error("Failed to logout");
      }
    } catch (error2) {
      console.error("Logout error:", error2);
      toast.error(error2 instanceof Error ? error2.message : "Failed to logout");
      setUser(null);
      navigate({ to: "/" });
    }
  };
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
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, loading, logout: handleLogout }, children });
};
const MENU_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard"
  },
  {
    to: "/patient-registration",
    label: "Patient Registration"
  },
  {
    to: "/bills",
    label: "Bills"
  },
  {
    to: "/tests",
    label: "Tests"
  },
  {
    to: "/test-parameters",
    label: "Parameters"
  },
  {
    to: "/doctors",
    label: "Doctors"
  },
  {
    to: "/lab-management",
    label: "Lab Management"
  }
];
function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleLogout = async () => {
    await logout();
  };
  const isLabManagementPage = location.pathname === "/lab-management";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("nav", { className: "bg-white border-b border-gray-200 sticky top-0 z-40", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs(Link, { to: user?.isAdmin ? "/lab-management" : "/dashboard", className: "flex items-center gap-3 group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", children: "L" }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:block", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold text-gray-900", children: "Lab Management" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Professional Healthcare Lab" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-1", children: MENU_ITEMS.map((item, index) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.to,
          className: `px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === item.to ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`,
          children: item.label
        },
        index
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-right pr-3 border-r border-gray-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: user?.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 capitalize", children: user?.role })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowMoreDropdown(!showMoreDropdown),
              className: "px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md inline-flex items-center gap-1 transition-colors",
              children: [
                /* @__PURE__ */ jsx(EllipsisVertical, { className: "w-4 h-4" }),
                "More",
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: `w-4 h-4 transition-transform ${showMoreDropdown ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          showMoreDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50", children: [
            user?.isAdmin && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setShowMoreDropdown(false);
                  navigate({ to: "/admin/dashboard" });
                },
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2",
                children: "��� User Management"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/dashboard",
                onClick: () => setShowMoreDropdown(false),
                className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2",
                children: "��� Dashboard"
              }
            ),
            user?.isAdmin && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setShowMoreDropdown(false);
                  navigate({ to: "/lab-details" });
                },
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2",
                children: "��� Lab Details"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleLogout,
                className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-200 mt-2 pt-2",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
                  "Logout"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowMobileMenu(!showMobileMenu),
          className: "lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-md",
          children: showMobileMenu ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
        }
      )
    ] }) }) }),
    isLabManagementPage && /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: "Lab Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Name: Your Laboratory | Registration: LAB-12345" })
    ] }) }) }) }),
    showMobileMenu && /* @__PURE__ */ jsx("div", { className: "lg:hidden bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 space-y-1", children: [
      MENU_ITEMS.map((item, index) => /* @__PURE__ */ jsx(
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
        user?.isAdmin && /* @__PURE__ */ jsx(
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
        user?.isAdmin && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowMobileMenu(false);
              navigate({ to: "/lab-details" });
            },
            className: "w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md",
            children: "Lab Details"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowMobileMenu(false);
              handleLogout();
            },
            className: "w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md border-t border-gray-200 mt-2 pt-2",
            children: "Logout"
          }
        )
      ] })
    ] }) })
  ] });
}
function Link({
  to,
  className = "",
  onClick,
  children
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => {
        onClick?.();
        navigate({ to });
      },
      className,
      children
    }
  );
}
const Layout = ({ children, requiredRole }) => {
  return /* @__PURE__ */ jsx(ProtectedRoute, { requiredRole, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { children })
  ] }) });
};
export {
  Layout as L,
  useAuth as u
};
