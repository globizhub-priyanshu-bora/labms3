import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useContext, createContext, useState, useEffect } from "react";
import { c as createLucideIcon, B as Button, X, g as getCurrentUser, a2 as logoutUser, t as toast } from "./router-BYOHKi2s.mjs";
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
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
  { to: "/patients/register", label: "Patient Registration" },
  { to: "/bills/$id", label: "Bills" },
  { to: "/tests", label: "Tests" },
  { to: "/test-parameters", label: "Parameters" },
  { to: "/doctors", label: "Doctors" },
  { to: "/lab-management", label: "Lab Management" }
];
function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const handleLogout = async () => {
    try {
      const result = await logout();
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed, redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1e3);
    }
  };
  const isLabManagementPage = location.pathname === "/lab-management";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("nav", { className: "bg-white border-b border-gray-200 sticky top-0 z-40", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", children: "L" }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:block", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold text-gray-900", children: "Lab Management" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Professional Healthcare Lab" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-1", children: MENU_ITEMS.map((item) => /* @__PURE__ */ jsx(
        NavLink,
        {
          to: item.to,
          active: location.pathname === item.to,
          children: item.label
        },
        item.to
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-right pr-4 border-r border-gray-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: user?.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 capitalize", children: user?.role })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => setShowMore((v) => !v),
              className: "px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md flex items-center gap-1",
              children: [
                "More",
                /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}` })
              ]
            }
          ),
          showMore && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white border-2 border-gray-300 rounded-lg shadow-2xl py-3 z-50 space-y-1", children: [
            user?.isAdmin && /* @__PURE__ */ jsx(DropdownButton, { onClick: () => {
              setShowMore(false);
              navigate({ to: "/admin/user-management" });
            }, children: "👤 User Management" }),
            /* @__PURE__ */ jsx(DropdownButton, { onClick: () => {
              setShowMore(false);
              navigate({ to: "/dashboard" });
            }, children: "📊 Dashboard" }),
            user?.isAdmin && /* @__PURE__ */ jsx(DropdownButton, { onClick: () => {
              setShowMore(false);
              navigate({ to: "/lab-details" });
            }, children: "🏥 Lab Details" }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 my-2" }),
            /* @__PURE__ */ jsxs(DropdownButton, { onClick: handleLogout, danger: true, children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2 inline" }),
              "Logout"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => setShowMobile((v) => !v),
          className: "lg:hidden p-2 text-gray-700 rounded-md",
          children: showMobile ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
        }
      )
    ] }) }) }),
    isLabManagementPage && /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: "Lab Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Name: Your Laboratory | Registration: LAB-12345" })
    ] }) }) }) }),
    showMobile && /* @__PURE__ */ jsx("div", { className: "lg:hidden bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 space-y-1", children: [
      MENU_ITEMS.map((item) => /* @__PURE__ */ jsx(
        NavLink,
        {
          to: item.to,
          onClick: () => setShowMobile(false),
          active: location.pathname === item.to,
          children: item.label
        },
        item.to
      )),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-2 mt-2 space-y-1", children: [
        user?.isAdmin && /* @__PURE__ */ jsx(DropdownButton, { onClick: () => {
          setShowMobile(false);
          navigate({ to: "/admin/user-management" });
        }, children: "User Management" }),
        /* @__PURE__ */ jsx(DropdownButton, { onClick: () => {
          setShowMobile(false);
          navigate({ to: "/dashboard" });
        }, children: "Dashboard" }),
        user?.isAdmin && /* @__PURE__ */ jsx(DropdownButton, { onClick: () => {
          setShowMobile(false);
          navigate({ to: "/lab-details" });
        }, children: "Lab Details" }),
        /* @__PURE__ */ jsxs(DropdownButton, { onClick: () => {
          setShowMobile(false);
          handleLogout();
        }, danger: true, children: [
          /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }),
          "Logout"
        ] })
      ] })
    ] }) })
  ] });
}
function NavLink({ to, active, children, onClick }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => {
        onClick?.();
        navigate({ to });
      },
      className: `px-4 py-2 text-sm font-semibold rounded-md transition-all ${active ? "bg-blue-600 text-white shadow-md" : "text-gray-900 bg-gray-100"}`,
      children
    }
  );
}
function DropdownButton({ onClick, children, danger }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: `w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-all ${danger ? "text-red-600 bg-red-50 hover:bg-red-100" : "text-gray-900 bg-gray-50 hover:bg-gray-100"}`,
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
