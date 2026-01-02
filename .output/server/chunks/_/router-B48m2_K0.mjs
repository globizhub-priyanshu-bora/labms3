import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, redirect, HeadContent, Scripts } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import React, { forwardRef, createElement, useState, useCallback, createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server.mjs";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { and, eq, isNull, desc, count, inArray, ilike, ne, or, sql } from "drizzle-orm";
import { z } from "zod";
import { b as db, i as billSchema, l as labSchema, p as patientSchema, f as doctorSchema, h as testSchema, j as patientTestsSchema, t as testParamSchema, k as testResultsSchema, u as userSchema, g as getSessionFromRequest, a as getSession, d as deleteSession, c as updateSession, e as createSession } from "./session-manager-DRdZONnW.mjs";
import { g as getLabIdFromRequest, a as getUserFromRequest } from "./helpers-VjNq_44e.mjs";
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$3);
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const ToastContext = createContext(void 0);
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "info", duration = 3e3) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, type, message, duration };
    setToasts((prev) => [...prev, newToast]);
    if (duration && duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);
  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { showToast, hideToast }, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4 z-50 space-y-2 max-w-sm pointer-events-none", children: toasts.map((toast) => /* @__PURE__ */ jsx(
      ToastComponent,
      {
        toast,
        onRemove: () => hideToast(toast.id)
      },
      toast.id
    )) })
  ] });
};
function ToastComponent({ toast, onRemove }) {
  const bgColorClass = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200"
  }[toast.type];
  const textColorClass = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    warning: "text-yellow-800"
  }[toast.type];
  const iconColorClass = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
    warning: "text-yellow-500"
  }[toast.type];
  const IconComponent = {
    success: CircleCheckBig,
    error: CircleAlert,
    info: Info,
    warning: CircleAlert
  }[toast.type];
  return /* @__PURE__ */ jsxs("div", { className: `border ${bgColorClass} rounded-lg p-4 shadow-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto`, children: [
    /* @__PURE__ */ jsx(IconComponent, { className: `w-5 h-5 flex-shrink-0 ${iconColorClass} mt-0.5` }),
    /* @__PURE__ */ jsx("p", { className: `${textColorClass} text-sm font-medium flex-1`, children: toast.message }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onRemove,
        className: `flex-shrink-0 ${textColorClass} hover:opacity-75 transition-opacity`,
        "aria-label": "Close notification",
        children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
      }
    )
  ] });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorCount: 0
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("��� Error caught by boundary:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorCount: this.state.errorCount + 1
    });
  };
  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full bg-white rounded-lg shadow-xl p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx("div", { className: "bg-red-100 rounded-full p-4", children: /* @__PURE__ */ jsx(CircleAlert, { className: "w-8 h-8 text-red-600" }) }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 text-center mb-2", children: "Something went wrong" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-2", children: "An unexpected error occurred. Our team has been notified." }),
        process.env.NODE_ENV === "development" && /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-red-900 mb-2", children: "Error Details:" }),
          /* @__PURE__ */ jsx("p", { className: "text-red-800 font-mono text-xs break-words", children: this.state.error.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: this.resetError,
              className: "flex-1 bg-blue-600 hover:bg-blue-700",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
                "Try Again"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => window.location.href = "/",
              className: "flex-1 bg-gray-600 hover:bg-gray-700",
              children: [
                /* @__PURE__ */ jsx(House, { className: "w-4 h-4 mr-2" }),
                "Go Home"
              ]
            }
          )
        ] }),
        this.state.errorCount > 2 && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4 text-center", children: "If this error persists, please refresh your browser or contact support." })
      ] }) });
    }
    return this.props.children;
  }
}
const appCss = "/assets/styles-DqcdtTrM.css";
const Route$e = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Medical Lab Management System"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(ToastProvider, { children }) }),
      process.env.NODE_ENV === "development",
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$d = () => import("./lab-setup-D5V9JNWL.mjs");
const Route$d = createFileRoute("/lab-setup")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./dashboard-BZF1JmBT.mjs");
const Route$c = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  phoneNumber: z.number().int().positive().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});
const LabSetupSchema = z.object({
  name: z.string().min(2, "Lab name is required"),
  addressLine1: z.string().optional(),
  gstinNumber: z.string().optional(),
  registrationNumber: z.string().min(1, "Registration number is required"),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.number().int().optional(),
  phoneNumber: z.number().int().positive().optional(),
  email: z.string().email().optional()
});
const registerUser_createServerFn_handler = createSsrRpc("0c005628ac49757db198f125d1a498626067a86ca2f0f4afa5c9f1f0b43cc0dd");
const registerUser = createServerFn({
  method: "POST"
}).inputValidator(RegisterSchema).handler(registerUser_createServerFn_handler, async ({
  data
}) => {
  try {
    const existingUser = await db.select().from(userSchema).where(eq(userSchema.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("Email already registered");
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const [newUser] = await db.insert(userSchema).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "Admin",
      isAdmin: true,
      permissions: {},
      phoneNumber: data.phoneNumber || null,
      labId: null,
      hasCompletedSetup: false,
      createdBy: null
    }).returning();
    return {
      success: true,
      message: "Registration successful. Please complete lab setup.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isAdmin: newUser.isAdmin,
        hasCompletedSetup: newUser.hasCompletedSetup
      }
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error instanceof Error ? error.message : "Registration failed");
  }
});
const setupLab_createServerFn_handler = createSsrRpc("db4ebd3ba6391de77039712065a7b3d52b648b08a812676533a82e20375101ea");
const setupLab = createServerFn({
  method: "POST"
}).inputValidator(LabSetupSchema).handler(setupLab_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const sessionId = getSessionFromRequest(request);
    if (!sessionId) {
      throw new Error("Not authenticated");
    }
    const session = getSession(sessionId);
    if (!session) {
      throw new Error("Session expired");
    }
    const [user] = await db.select().from(userSchema).where(eq(userSchema.id, session.userId)).limit(1);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.labId) {
      throw new Error("Lab already set up for this user");
    }
    const [newLab] = await db.insert(labSchema).values({
      name: data.name,
      addressLine1: data.addressLine1 || null,
      gstinNumber: data.gstinNumber || null,
      registrationNumber: data.registrationNumber,
      state: data.state || null,
      country: data.country || null,
      pincode: data.pincode || null,
      phoneNumber: data.phoneNumber || null,
      email: data.email || null
    }).returning();
    const [updatedUser] = await db.update(userSchema).set({
      labId: newLab.id,
      hasCompletedSetup: true,
      updatedAt: /* @__PURE__ */ new Date(),
      permissions: {
        patients: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        bills: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        tests: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        parameters: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        doctors: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        reports: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        users: {
          view: true,
          create: true,
          edit: true,
          delete: true
        }
      }
    }).where(eq(userSchema.id, session.userId)).returning();
    updateSession(sessionId, {
      labId: newLab.id,
      hasCompletedSetup: true,
      permissions: updatedUser.permissions
    });
    return {
      success: true,
      message: "Lab setup completed successfully",
      lab: newLab,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isAdmin: updatedUser.isAdmin,
        labId: updatedUser.labId,
        hasCompletedSetup: updatedUser.hasCompletedSetup
      }
    };
  } catch (error) {
    console.error("Lab setup error:", error);
    throw new Error(error instanceof Error ? error.message : "Lab setup failed");
  }
});
const loginUser_createServerFn_handler = createSsrRpc("e1434429e00235720242889071d2b09e8d637d9040ab1de3dfc7cb37d0932728");
const loginUser = createServerFn({
  method: "POST"
}).inputValidator(LoginSchema).handler(loginUser_createServerFn_handler, async ({
  data
}) => {
  try {
    const [user] = await db.select().from(userSchema).where(eq(userSchema.email, data.email)).limit(1);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (user.deletedAt) {
      throw new Error("Account has been deactivated");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const sessionId = createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin || false,
      permissions: user.permissions || {},
      labId: user.labId,
      hasCompletedSetup: user.hasCompletedSetup || false
    });
    const cookie = serialize("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/"
    });
    return new Response(JSON.stringify({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin || false,
        permissions: user.permissions || {},
        phoneNumber: user.phoneNumber,
        labId: user.labId,
        hasCompletedSetup: user.hasCompletedSetup || false
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
});
const logoutUser_createServerFn_handler = createSsrRpc("f67c49cd0388d59a1b85369ceb7040fdc1fcfbb7f869ff006d5c879f6c993615");
const logoutUser = createServerFn({
  method: "POST"
}).handler(logoutUser_createServerFn_handler, async ({
  request
}) => {
  try {
    const sessionId = getSessionFromRequest(request);
    if (sessionId) {
      deleteSession(sessionId);
    }
    const cookie = serialize("sessionId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/"
    });
    return new Response(JSON.stringify({
      success: true,
      message: "Logout successful"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie
      }
    });
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed");
  }
});
const getCurrentUser_createServerFn_handler = createSsrRpc("d44e08e9022a7a8299e66f49a70beed8a64f1805d6343a463c02a86c05501596");
const getCurrentUser = createServerFn({
  method: "GET"
}).handler(getCurrentUser_createServerFn_handler, async ({
  request
}) => {
  try {
    const sessionId = getSessionFromRequest(request);
    if (!sessionId) {
      return {
        success: false,
        user: null
      };
    }
    const session = getSession(sessionId);
    if (!session) {
      return {
        success: false,
        user: null
      };
    }
    const [user] = await db.select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      role: userSchema.role,
      isAdmin: userSchema.isAdmin,
      permissions: userSchema.permissions,
      phoneNumber: userSchema.phoneNumber,
      labId: userSchema.labId,
      hasCompletedSetup: userSchema.hasCompletedSetup
    }).from(userSchema).where(eq(userSchema.id, session.userId)).limit(1);
    if (!user) {
      deleteSession(sessionId);
      return {
        success: false,
        user: null
      };
    }
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return {
      success: false,
      user: null
    };
  }
});
const checkAuthorization_createServerFn_handler = createSsrRpc("689e01ce4655f2fed02e9958da166f777fe71c702dd1f2d5d6197818f7df469e");
createServerFn({
  method: "GET"
}).inputValidator(z.object({
  requiredPermission: z.string().optional()
})).handler(checkAuthorization_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const userResult = await getCurrentUser({
      request
    });
    if (!userResult.success || !userResult.user) {
      return {
        authorized: false,
        message: "Not authenticated"
      };
    }
    if (!userResult.user.hasCompletedSetup) {
      return {
        authorized: false,
        message: "Lab setup not completed",
        requiresSetup: true
      };
    }
    if (userResult.user.isAdmin) {
      return {
        authorized: true,
        user: userResult.user
      };
    }
    if (data.requiredPermission) {
      const [module, action] = data.requiredPermission.split(".");
      const permissions = userResult.user.permissions || {};
      if (!permissions[module] || !permissions[module][action]) {
        return {
          authorized: false,
          message: "Insufficient permissions"
        };
      }
    }
    return {
      authorized: true,
      user: userResult.user
    };
  } catch (error) {
    console.error("Authorization check error:", error);
    return {
      authorized: false,
      message: "Authorization failed"
    };
  }
});
const validateSessionEndpoint_createServerFn_handler = createSsrRpc("ef24663278daf8b75d14591dbe78c90f61ff559b5549291c84747406c4d727c3");
createServerFn({
  method: "GET"
}).handler(validateSessionEndpoint_createServerFn_handler, async ({
  request
}) => {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return {
        valid: false,
        message: "No session found"
      };
    }
    const isValid = session && session.userId;
    return {
      valid: isValid,
      sessionId: session?.id,
      userId: session?.userId,
      expiresAt: session?.expiresAt,
      lastActivity: session?.lastActivity
    };
  } catch (error) {
    console.error("Session validation error:", error);
    return {
      valid: false,
      message: "Session validation failed"
    };
  }
});
const keepSessionAlive_createServerFn_handler = createSsrRpc("e895c864166834f5e7cfc38efbc119082baecf5df853d01fb8b74b810657c204");
createServerFn({
  method: "POST"
}).handler(keepSessionAlive_createServerFn_handler, async ({
  request
}) => {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return {
        success: false,
        message: "No session to keep alive"
      };
    }
    const updated = updateSession(session.id, {
      ...session,
      lastActivity: Date.now()
    });
    if (!updated) {
      return {
        success: false,
        message: "Failed to update session"
      };
    }
    return {
      success: true,
      message: "Session kept alive",
      nextActivityCheckIn: 5 * 60 * 1e3
      // 5 minutes
    };
  } catch (error) {
    console.error("Keep session alive error:", error);
    return {
      success: false,
      message: "Keep alive failed"
    };
  }
});
const forceLogout_createServerFn_handler = createSsrRpc("0cad0243b984fee4b121caa3e1b2058a0cad1a95551393d388b3e525bd569647");
createServerFn({
  method: "POST"
}).handler(forceLogout_createServerFn_handler, async ({
  request
}) => {
  try {
    const session = await getSessionFromRequest(request);
    if (session) {
      deleteSession(session.id);
      console.log(`✅ Session ${session.id} deleted - user logged out`);
    }
    return {
      success: true,
      message: "Logged out successfully",
      redirectTo: "/auth/login"
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "Logout failed"
    };
  }
});
const $$splitComponentImporter$b = () => import("./index-Dr_w-9_2.mjs");
const Route$b = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component"),
  beforeLoad: async () => {
    const result = await getCurrentUser();
    if (result.success && result.user) {
      if (!result.user.hasCompletedSetup || !result.user.labId) {
        throw redirect({
          to: "/lab-setup"
        });
      } else {
        throw redirect({
          to: "/lab-management"
        });
      }
    }
  }
});
const TestCreateSchema = z.object({
  name: z.string().min(1, "Test name is required"),
  price: z.string().min(1, "Price is required"),
  parameterIds: z.array(z.number().int().positive()).default([]),
  metadata: z.any().optional()
});
const TestUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).optional(),
  price: z.string().optional(),
  parameterIds: z.array(z.number().int().positive()).optional(),
  metadata: z.any().optional()
});
const TestIdSchema = z.object({
  id: z.number().int().positive()
});
const TestSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0)
});
const TestListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "price"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc")
});
const CalculatePriceSchema = z.object({
  parameterIds: z.array(z.number().int().positive())
});
const calculateTestPrice_createServerFn_handler = createSsrRpc("eb1d14c8d6a9b119928a19fe1231bc4ad90c2383e46a87da4e08c98f410062fa");
const calculateTestPrice = createServerFn({
  method: "POST"
}).inputValidator(CalculatePriceSchema).handler(calculateTestPrice_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    if (data.parameterIds.length === 0) {
      return {
        success: true,
        totalPrice: "0",
        parameters: []
      };
    }
    const labId = await getLabIdFromRequest(request);
    const parameters = await db.select().from(testParamSchema).where(and(
      inArray(testParamSchema.id, data.parameterIds),
      eq(testParamSchema.labId, labId),
      // CRITICAL: Only user's lab
      isNull(testParamSchema.deletedAt)
    ));
    const totalPrice = parameters.reduce((sum, param) => {
      const price = parseFloat(param.price || "0");
      return sum + price;
    }, 0);
    return {
      success: true,
      totalPrice: totalPrice.toFixed(2),
      parameters: parameters.map((p) => ({
        ...p,
        metadata: p.metadata || {}
      }))
    };
  } catch (error) {
    console.error("Error calculating test price:", error);
    throw new Error("Failed to calculate test price");
  }
});
const createTest_createServerFn_handler = createSsrRpc("637fa0a6cb974ee0ad13740d89fa64759b27d6f06f21154eba5a4ccef9e9e623");
const createTest = createServerFn({
  method: "POST"
}).inputValidator(TestCreateSchema).handler(createTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const existing = await db.select().from(testSchema).where(and(
      eq(testSchema.name, data.name),
      eq(testSchema.labId, labId),
      // CRITICAL
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (existing.length > 0) {
      throw new Error("A test with this name already exists");
    }
    const metadata = {
      ...data.metadata || {},
      parameterIds: data.parameterIds
    };
    const [newTest] = await db.insert(testSchema).values({
      labId,
      // CRITICAL: Assign to user's lab
      name: data.name,
      price: data.price,
      metadata
    }).returning();
    return {
      success: true,
      message: "Test created successfully",
      data: {
        ...newTest,
        metadata: newTest.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error creating test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create test");
  }
});
const getAllTests_createServerFn_handler = createSsrRpc("858a035ba8fe3e986049d70d2e2c78a274ee1b54703c81c0f747d341b815b0bf");
const getAllTests = createServerFn({
  method: "GET"
}).inputValidator(TestListSchema).handler(getAllTests_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    let labId;
    try {
      labId = await getLabIdFromRequest(request);
    } catch (error) {
      console.error("Error getting lab ID:", error);
      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          limit,
          offset,
          hasMore: false
        }
      };
    }
    const orderByColumn = testSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      isNull(testSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    const tests = await db.select().from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      isNull(testSchema.deletedAt)
    )).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: tests.map((t) => ({
        ...t,
        metadata: t.metadata || {}
      })),
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching tests:", error);
    return {
      success: true,
      data: [],
      pagination: {
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      }
    };
  }
});
const searchTests_createServerFn_handler = createSsrRpc("1d31eacb2464df9513f187bfb8438460098d091c006e11adf097692b0bbe11c1");
const searchTests = createServerFn({
  method: "GET"
}).inputValidator(TestSearchSchema).handler(searchTests_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      query,
      limit,
      offset
    } = data;
    const searchPattern = `%${query}%`;
    const labId = await getLabIdFromRequest(request);
    const tests = await db.select().from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      ilike(testSchema.name, searchPattern),
      isNull(testSchema.deletedAt)
    )).orderBy(testSchema.name).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      ilike(testSchema.name, searchPattern),
      isNull(testSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: tests.map((t) => ({
        ...t,
        metadata: t.metadata || {}
      })),
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching tests:", error);
    throw new Error("Failed to search tests");
  }
});
const getTestById_createServerFn_handler = createSsrRpc("5f896f4cd6c0e010abc051ec335ff7e2c13b6fe1b805bf0cdf3ff056e7912ca9");
createServerFn({
  method: "GET"
}).inputValidator(TestIdSchema).handler(getTestById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [test] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (!test) {
      throw new Error("Test not found");
    }
    const parameterIds = test.metadata?.parameterIds || [];
    let parameters = [];
    if (parameterIds.length > 0) {
      parameters = await db.select().from(testParamSchema).where(and(
        inArray(testParamSchema.id, parameterIds),
        eq(testParamSchema.labId, labId),
        // CRITICAL
        isNull(testParamSchema.deletedAt)
      ));
    }
    return {
      success: true,
      data: {
        ...test,
        metadata: test.metadata || {},
        parameters: parameters.map((p) => ({
          ...p,
          metadata: p.metadata || {}
        }))
      }
    };
  } catch (error) {
    console.error("Error fetching test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch test");
  }
});
const updateTest_createServerFn_handler = createSsrRpc("7d6e6eb88891a2eee6ac2ef7154cdb493c084d5f6498c9cf5c67b858c04db855");
const updateTest = createServerFn({
  method: "POST"
}).inputValidator(TestUpdateSchema).handler(updateTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      parameterIds,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, id),
      eq(testSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test not found");
    }
    if (updateData.name && updateData.name !== existing.name) {
      const [duplicate] = await db.select().from(testSchema).where(and(
        eq(testSchema.name, updateData.name),
        eq(testSchema.labId, labId),
        // CRITICAL
        ne(testSchema.id, id),
        isNull(testSchema.deletedAt)
      )).limit(1);
      if (duplicate) {
        throw new Error("A test with this name already exists");
      }
    }
    let metadata = existing.metadata;
    if (parameterIds !== void 0) {
      metadata = {
        ...metadata || {},
        parameterIds
      };
    }
    const [updated] = await db.update(testSchema).set({
      ...updateData,
      metadata,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testSchema.id, id),
      eq(testSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "Test updated successfully",
      data: {
        ...updated,
        metadata: updated.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error updating test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update test");
  }
});
const deleteTest_createServerFn_handler = createSsrRpc("79a57f0a6ebc6fa335dccfe8cdfa1727e5be684d513c257755fdb209a1670baa");
const deleteTest = createServerFn({
  method: "POST"
}).inputValidator(TestIdSchema).handler(deleteTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test not found");
    }
    await db.update(testSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Test deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete test");
  }
});
const restoreTest_createServerFn_handler = createSsrRpc("56f6533ed64761137df96642690335ce6fa8490cac01f564994b6518a93b36b2");
createServerFn({
  method: "POST"
}).inputValidator(TestIdSchema).handler(restoreTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [restored] = await db.update(testSchema).set({
      deletedAt: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId)
      // CRITICAL
    )).returning();
    if (!restored) {
      throw new Error("Test not found");
    }
    return {
      success: true,
      message: "Test restored successfully",
      data: {
        ...restored,
        metadata: restored.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error restoring test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to restore test");
  }
});
const ReferenceRangeSchema = z.object({
  ageGroup: z.string(),
  // "child", "adult", "senior"
  gender: z.string(),
  // "Male", "Female", "Any"
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
  minValue: z.string(),
  maxValue: z.string()
});
const TestParamCreateSchema = z.object({
  name: z.string().min(1, "Parameter name is required"),
  unit: z.string().optional(),
  price: z.string().optional(),
  referenceRanges: z.array(ReferenceRangeSchema).optional(),
  // NEW
  metadata: z.any().optional()
});
const TestParamUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).optional(),
  unit: z.string().optional(),
  price: z.string().optional(),
  referenceRanges: z.array(ReferenceRangeSchema).optional(),
  // NEW
  metadata: z.any().optional()
});
const TestParamIdSchema = z.object({
  id: z.number().int().positive()
});
const TestParamSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0)
});
const TestParamListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "price"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc")
});
const createTestParameter_createServerFn_handler = createSsrRpc("866e013d630692cace706289cf850c03b2e8b7525cadcd4706c7a4ca0f40c872");
const createTestParameter = createServerFn({
  method: "POST"
}).inputValidator(TestParamCreateSchema).handler(createTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const existing = await db.select().from(testParamSchema).where(and(eq(testParamSchema.name, data.name), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (existing.length > 0) {
      throw new Error("A parameter with this name already exists");
    }
    const [newParam] = await db.insert(testParamSchema).values({
      labId,
      name: data.name,
      unit: data.unit || null,
      price: data.price || null,
      referenceRanges: data.referenceRanges || null,
      // NEW
      metadata: data.metadata || null
    }).returning();
    return {
      success: true,
      message: "Test parameter created successfully",
      data: {
        ...newParam,
        metadata: newParam.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error creating test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create test parameter");
  }
});
const getAllTestParameters_createServerFn_handler = createSsrRpc("9c8f0900160bae46a845536c1c878b268fdec731ff2c8bc5c6f18073dca787c4");
const getAllTestParameters = createServerFn({
  method: "GET"
}).inputValidator(TestParamListSchema).handler(getAllTestParameters_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    let labId;
    try {
      labId = await getLabIdFromRequest(request);
    } catch (error) {
      console.error("Error getting lab ID:", error);
      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          limit,
          offset,
          hasMore: false
        }
      };
    }
    const orderByColumn = testParamSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(testParamSchema).where(and(eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt)));
    const totalCount = Number(countResult[0]?.count || 0);
    const parameters = await db.select().from(testParamSchema).where(and(eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: parameters.map((p) => ({
        ...p,
        metadata: p.metadata || {},
        referenceRanges: p.referenceRanges || []
        // NEW
      })),
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching test parameters:", error);
    return {
      success: true,
      data: [],
      pagination: {
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      }
    };
  }
});
const searchTestParameters_createServerFn_handler = createSsrRpc("0388eaaa61b7f81a1942a5e405b75a7191876ac918e5ba9a72e580ed165c34f3");
const searchTestParameters = createServerFn({
  method: "GET"
}).inputValidator(TestParamSearchSchema).handler(searchTestParameters_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      query,
      limit,
      offset
    } = data;
    const searchPattern = `%${query}%`;
    const labId = await getLabIdFromRequest(request);
    const parameters = await db.select().from(testParamSchema).where(and(eq(testParamSchema.labId, labId), or(ilike(testParamSchema.name, searchPattern), ilike(testParamSchema.unit, searchPattern)), isNull(testParamSchema.deletedAt))).orderBy(testParamSchema.name).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(testParamSchema).where(and(eq(testParamSchema.labId, labId), or(ilike(testParamSchema.name, searchPattern), ilike(testParamSchema.unit, searchPattern)), isNull(testParamSchema.deletedAt)));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: parameters.map((p) => ({
        ...p,
        metadata: p.metadata || {},
        referenceRanges: p.referenceRanges || []
      })),
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching test parameters:", error);
    throw new Error("Failed to search test parameters");
  }
});
const getTestParameterById_createServerFn_handler = createSsrRpc("cff0fc9e1e697678742ffcecccbf079f07115c4109ce1d08d008914f2f490a10");
createServerFn({
  method: "GET"
}).inputValidator(TestParamIdSchema).handler(getTestParameterById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [parameter] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (!parameter) {
      throw new Error("Test parameter not found");
    }
    return {
      success: true,
      data: {
        ...parameter,
        metadata: parameter.metadata || {},
        referenceRanges: parameter.referenceRanges || []
      }
    };
  } catch (error) {
    console.error("Error fetching test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch test parameter");
  }
});
const updateTestParameter_createServerFn_handler = createSsrRpc("89320401cbd68179409c80ee1d04eb642a9512b752b4b3c464616a03ad0c3eea");
const updateTestParameter = createServerFn({
  method: "POST"
}).inputValidator(TestParamUpdateSchema).handler(updateTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.id, id), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (!existing) {
      throw new Error("Test parameter not found");
    }
    if (updateData.name && updateData.name !== existing.name) {
      const [duplicate] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.name, updateData.name), eq(testParamSchema.labId, labId), ne(testParamSchema.id, id), isNull(testParamSchema.deletedAt))).limit(1);
      if (duplicate) {
        throw new Error("A parameter with this name already exists");
      }
    }
    const [updated] = await db.update(testParamSchema).set({
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(testParamSchema.id, id), eq(testParamSchema.labId, labId))).returning();
    return {
      success: true,
      message: "Test parameter updated successfully",
      data: {
        ...updated,
        metadata: updated.metadata || {},
        referenceRanges: updated.referenceRanges || []
      }
    };
  } catch (error) {
    console.error("Error updating test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update test parameter");
  }
});
const deleteTestParameter_createServerFn_handler = createSsrRpc("1751a1fc416db730f7528d13b6531bdb2b51d1129b7b4d17421297247f982d3c");
const deleteTestParameter = createServerFn({
  method: "POST"
}).inputValidator(TestParamIdSchema).handler(deleteTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (!existing) {
      throw new Error("Test parameter not found");
    }
    await db.update(testParamSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId)));
    return {
      success: true,
      message: "Test parameter deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete test parameter");
  }
});
const restoreTestParameter_createServerFn_handler = createSsrRpc("187263fe889609bed8f64002c35873b22ba56af05158412d579789d39e3a0680");
createServerFn({
  method: "POST"
}).inputValidator(TestParamIdSchema).handler(restoreTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [restored] = await db.update(testParamSchema).set({
      deletedAt: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId))).returning();
    if (!restored) {
      throw new Error("Test parameter not found");
    }
    return {
      success: true,
      message: "Test parameter restored successfully",
      data: {
        ...restored,
        metadata: restored.metadata || {},
        referenceRanges: restored.referenceRanges || []
      }
    };
  } catch (error) {
    console.error("Error restoring test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to restore test parameter");
  }
});
const $$splitComponentImporter$a = () => import("./index--XlsBGdp.mjs");
const Route$a = createFileRoute("/tests/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  loader: async () => {
    const [testsResult, parametersResult] = await Promise.all([getAllTests({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "name",
        sortOrder: "asc"
      }
    }), getAllTestParameters({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "name",
        sortOrder: "asc"
      }
    })]);
    return {
      tests: testsResult,
      parameters: parametersResult
    };
  }
});
const $$splitComponentImporter$9 = () => import("./index-BImFyCBU.mjs");
const Route$9 = createFileRoute("/test-parameters/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  loader: async () => {
    const result = await getAllTestParameters({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "name",
        sortOrder: "asc"
      }
    });
    return result;
  }
});
const PatientSearchSchema = z.object({
  phoneNumber: z.number().int().positive()
});
const PatientCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().int().positive().optional(),
  gender: z.string().optional(),
  phoneNumber: z.number().int().positive(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.number().int().optional()
});
const PatientTestRegistrationSchema = z.object({
  patientId: z.number().int().positive(),
  testIds: z.array(z.number().int().positive()),
  doctorId: z.number().int().positive().optional(),
  reportDeliveryDate: z.string().optional(),
  discount: z.string().optional(),
  tax: z.string().optional(),
  totalAmount: z.string(),
  finalAmount: z.string(),
  isPaid: z.boolean().default(true)
});
const PatientUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2).optional(),
  age: z.number().int().positive().optional(),
  gender: z.string().optional(),
  phoneNumber: z.number().int().positive().optional(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.number().int().optional()
});
const PatientListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "phoneNumber"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const PatientIdSchema$1 = z.object({
  id: z.number().int().positive()
});
const BulkDeleteSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1, "At least one patient ID is required")
});
const searchPatientByPhone_createServerFn_handler = createSsrRpc("88b7c6e3e8e9d3afe9bdf1dfd993ff2f25f7170ff5fde2d644329132fdf4665e");
const searchPatientByPhone = createServerFn({
  method: "GET"
}).inputValidator(PatientSearchSchema).handler(searchPatientByPhone_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.phoneNumber, data.phoneNumber),
      eq(patientSchema.labId, labId)
      // CRITICAL: Filter by labId
    )).limit(1);
    if (!patient) {
      return {
        success: true,
        exists: false,
        message: "Patient not found. Please register."
      };
    }
    return {
      success: true,
      exists: true,
      data: patient
    };
  } catch (error) {
    console.error("Error searching patient:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to search patient");
  }
});
const createPatientWithTests_createServerFn_handler = createSsrRpc("2ddda0a102698d7e2e60e969ca3027b5f8dec902c1d9ee8c29bf372338ae212f");
const createPatientWithTests = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  isNewPatient: z.boolean().default(true),
  patientId: z.number().int().positive().optional(),
  patient: PatientCreateSchema,
  tests: PatientTestRegistrationSchema.omit({
    patientId: true
  })
})).handler(createPatientWithTests_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    let patientId;
    let patientData;
    if (data.isNewPatient) {
      const [newPatient] = await db.insert(patientSchema).values({
        labId,
        // CRITICAL: Assign patient to user's lab
        name: data.patient.name,
        age: data.patient.age || null,
        gender: data.patient.gender || null,
        phoneNumber: data.patient.phoneNumber,
        addressLine1: data.patient.addressLine1 || null,
        city: data.patient.city || null,
        state: data.patient.state || null,
        country: data.patient.country || null,
        pincode: data.patient.pincode || null
      }).returning();
      patientId = newPatient.id;
      patientData = newPatient;
    } else {
      if (!data.patientId) {
        throw new Error("Patient ID is required for registering tests to existing patients. Please search for the patient first.");
      }
      const [existingPatient] = await db.select().from(patientSchema).where(and(eq(patientSchema.id, data.patientId), eq(patientSchema.labId, labId))).limit(1);
      if (!existingPatient) {
        throw new Error("Patient not found or you do not have access to this patient. Please search again.");
      }
      patientId = data.patientId;
      await db.update(patientSchema).set({
        name: data.patient.name,
        age: data.patient.age || null,
        gender: data.patient.gender || null,
        addressLine1: data.patient.addressLine1 || null,
        city: data.patient.city || null,
        state: data.patient.state || null,
        country: data.patient.country || null,
        pincode: data.patient.pincode || null,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(and(eq(patientSchema.id, patientId), eq(patientSchema.labId, labId)));
      const [updated] = await db.select().from(patientSchema).where(and(eq(patientSchema.id, patientId), eq(patientSchema.labId, labId))).limit(1);
      patientData = updated;
    }
    const invoiceNumber = `INV-${labId}-${Date.now()}-${patientId}`;
    const [bill] = await db.insert(billSchema).values({
      labId,
      // CRITICAL: Assign bill to user's lab
      patientId,
      invoiceNumber,
      totalAmount: data.tests.totalAmount,
      discount: data.tests.discount || "0",
      tax: data.tests.tax || "0",
      finalAmount: data.tests.finalAmount,
      isPaid: data.tests.isPaid ?? true
    }).returning();
    const patientTestsInserts = data.tests.testIds.map((testId) => ({
      labId,
      // CRITICAL: Assign test to user's lab
      patientId,
      testId,
      doctorId: data.tests.doctorId || null,
      billId: bill.id,
      status: "pending",
      reportDeliveryDate: data.tests.reportDeliveryDate ? new Date(data.tests.reportDeliveryDate) : null
    }));
    const patientTests = await db.insert(patientTestsSchema).values(patientTestsInserts).returning();
    return {
      success: true,
      message: data.isNewPatient ? "Patient registered successfully" : "Tests added to existing patient successfully",
      data: {
        patient: patientData,
        tests: patientTests,
        bill
      }
    };
  } catch (error) {
    console.error("Error creating patient with tests:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to register patient");
  }
});
const updatePatient_createServerFn_handler = createSsrRpc("c9be507217c9d475f5cba5ee979c2141ed64be11ff9f48e1c878f3708d0baa4e");
const updatePatient = createServerFn({
  method: "POST"
}).inputValidator(PatientUpdateSchema).handler(updatePatient_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!existing) {
      throw new Error("Patient not found or access denied");
    }
    const [updated] = await db.update(patientSchema).set({
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(patientSchema.id, id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "Patient updated successfully",
      data: updated
    };
  } catch (error) {
    console.error("Error updating patient:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update patient");
  }
});
const getAllPatients_createServerFn_handler = createSsrRpc("f8f2093574355cf432609ba4faa9b39fb7a5171543b629a6cd3c64f7408fb7e8");
const getAllPatients = createServerFn({
  method: "GET"
}).inputValidator(PatientListSchema).handler(getAllPatients_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    let labId;
    try {
      labId = await getLabIdFromRequest(request);
    } catch (error) {
      console.error("Error getting lab ID:", error);
      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          limit,
          offset,
          hasMore: false
        }
      };
    }
    const orderByColumn = patientSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(patientSchema).where(eq(patientSchema.labId, labId));
    const totalCount = Number(countResult[0]?.count || 0);
    const patients = await db.select().from(patientSchema).where(eq(patientSchema.labId, labId)).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: patients,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    return {
      success: true,
      data: [],
      pagination: {
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      }
    };
  }
});
const searchPatients_createServerFn_handler = createSsrRpc("1623252efcf5f98b31b7afd9caf1cce613ab0f72ce8fbe6ade67a53eb62a9090");
createServerFn({
  method: "GET"
}).inputValidator(z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0)
})).handler(searchPatients_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      query,
      limit,
      offset
    } = data;
    const searchPattern = `%${query}%`;
    const labId = await getLabIdFromRequest(request);
    const patients = await db.select().from(patientSchema).where(and(
      eq(patientSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(patientSchema.name, searchPattern), ilike(patientSchema.city, searchPattern), ilike(patientSchema.state, searchPattern))
    )).orderBy(desc(patientSchema.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(patientSchema).where(and(
      eq(patientSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(patientSchema.name, searchPattern), ilike(patientSchema.city, searchPattern), ilike(patientSchema.state, searchPattern))
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: patients,
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching patients:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to search patients");
  }
});
const getPatientWithTests_createServerFn_handler = createSsrRpc("e93e61986c068fd6b5a2df790e0d4bfd099cfba1320790f0df20de3eff8b9a6e");
const getPatientWithTests = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  id: z.number().int().positive()
})).handler(getPatientWithTests_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, data.id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!patient) {
      throw new Error("Patient not found or access denied");
    }
    const patientTests = await db.select({
      patientTest: patientTestsSchema,
      test: testSchema,
      doctor: doctorSchema
    }).from(patientTestsSchema).leftJoin(testSchema, eq(patientTestsSchema.testId, testSchema.id)).leftJoin(doctorSchema, eq(patientTestsSchema.doctorId, doctorSchema.id)).where(and(
      eq(patientTestsSchema.patientId, data.id),
      eq(patientTestsSchema.labId, labId)
      // CRITICAL: Filter by labId
    ));
    const normalizedTests = patientTests.map((pt) => ({
      ...pt,
      test: pt.test ? {
        ...pt.test,
        metadata: pt.test.metadata || {}
      } : null
    }));
    const bills = await db.select().from(billSchema).where(and(
      eq(billSchema.patientId, data.id),
      eq(billSchema.labId, labId)
      // CRITICAL: Filter by labId
    ));
    return {
      success: true,
      data: {
        patient,
        tests: normalizedTests,
        bills
      }
    };
  } catch (error) {
    console.error("Error fetching patient with tests:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch patient details");
  }
});
const getPatientById_createServerFn_handler = createSsrRpc("1265555554103ff0d20d4a9d183747da627d3933399077209b638800eab9673b");
createServerFn({
  method: "GET"
}).inputValidator(PatientIdSchema$1).handler(getPatientById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, data.id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!patient) {
      throw new Error("Patient not found or access denied");
    }
    return {
      success: true,
      data: patient
    };
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch patient");
  }
});
const bulkDeletePatients_createServerFn_handler = createSsrRpc("dd13b1308a256d04473e96b98fba649f5d50a85253202169ef6b51704ca65a49");
const bulkDeletePatients = createServerFn({
  method: "POST"
}).inputValidator(BulkDeleteSchema).handler(bulkDeletePatients_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const patientsToDelete = await db.select().from(patientSchema).where(and(
      inArray(patientSchema.id, data.ids),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    ));
    if (patientsToDelete.length !== data.ids.length) {
      throw new Error("Some patients not found or access denied");
    }
    await db.delete(billSchema).where(inArray(billSchema.patientId, data.ids));
    await db.delete(patientTestsSchema).where(inArray(patientTestsSchema.patientId, data.ids));
    await db.delete(patientSchema).where(and(inArray(patientSchema.id, data.ids), eq(patientSchema.labId, labId)));
    return {
      success: true,
      message: `Successfully deleted ${patientsToDelete.length} patient(s)`
    };
  } catch (error) {
    console.error("Error deleting patients:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete patients");
  }
});
const $$splitComponentImporter$8 = () => import("./index-AHI1Zkic.mjs");
const Route$8 = createFileRoute("/lab-management/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  loader: async () => {
    const result = await getAllPatients({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "createdAt",
        sortOrder: "desc"
      }
    });
    return result;
  }
});
const DoctorCreateSchema = z.object({
  registrationNumber: z.string().min(1, "Registration number is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional()
});
const DoctorUpdateSchema = z.object({
  id: z.number().int().positive(),
  registrationNumber: z.string().min(1).optional(),
  name: z.string().min(2).optional(),
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional()
});
const DoctorIdSchema = z.object({
  id: z.number().int().positive()
});
const DoctorSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0)
});
const DoctorListSchema = z.object({
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "specialization"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const registerDoctor_createServerFn_handler = createSsrRpc("e8dd402e17590eb08d3d0bd24e3683c0f1d033b4a7e6aff487a22f37fd8e2618");
const registerDoctor = createServerFn({
  method: "POST"
}).inputValidator(DoctorCreateSchema).handler(registerDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const existing = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.registrationNumber, data.registrationNumber),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Check within lab only
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (existing.length > 0) {
      throw new Error("Doctor with this registration number already exists in your lab");
    }
    const [newDoctor] = await db.insert(doctorSchema).values({
      labId,
      // CRITICAL: Assign to user's lab
      registrationNumber: data.registrationNumber,
      name: data.name,
      specialization: data.specialization || null,
      phoneNumber: data.phoneNumber || null
    }).returning();
    return {
      success: true,
      message: "Doctor registered successfully",
      data: newDoctor
    };
  } catch (error) {
    console.error("Error registering doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to register doctor");
  }
});
const getAllDoctors_createServerFn_handler = createSsrRpc("145982feac1e984b1cef6b5523f0eb1e7c41d91af7983fc05b0328d6c10759f6");
const getAllDoctors = createServerFn({
  method: "GET"
}).inputValidator(DoctorListSchema).handler(getAllDoctors_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    let labId;
    try {
      labId = await getLabIdFromRequest(request);
    } catch (error) {
      console.error("Error getting lab ID:", error);
      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          limit,
          offset,
          hasMore: false
        }
      };
    }
    const orderByColumn = doctorSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    const doctors = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt)
    )).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: doctors,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return {
      success: true,
      data: [],
      pagination: {
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      }
    };
  }
});
const searchDoctors_createServerFn_handler = createSsrRpc("e41548d8794ad3413f5f64cb80d858e746fbaa33ea6383b9b514d8079fc0286b");
const searchDoctors = createServerFn({
  method: "GET"
}).inputValidator(DoctorSearchSchema).handler(searchDoctors_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      query,
      limit,
      offset
    } = data;
    const searchPattern = `%${query}%`;
    const labId = await getLabIdFromRequest(request);
    const doctors = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(doctorSchema.name, searchPattern), ilike(doctorSchema.registrationNumber, searchPattern), ilike(doctorSchema.specialization, searchPattern)),
      isNull(doctorSchema.deletedAt)
    )).orderBy(desc(doctorSchema.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(doctorSchema.name, searchPattern), ilike(doctorSchema.registrationNumber, searchPattern), ilike(doctorSchema.specialization, searchPattern)),
      isNull(doctorSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: doctors,
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching doctors:", error);
    throw new Error("Failed to search doctors");
  }
});
const getDoctorById_createServerFn_handler = createSsrRpc("d370673239cbcaddeee0b905aa8fae5daff42009a9e089864251255533f765ea");
createServerFn({
  method: "GET"
}).inputValidator(DoctorIdSchema).handler(getDoctorById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [doctor] = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (!doctor) {
      throw new Error("Doctor not found or access denied");
    }
    return {
      success: true,
      data: doctor
    };
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch doctor");
  }
});
const updateDoctor_createServerFn_handler = createSsrRpc("08ec65a6b61510a6035c5d92dabce42347377649b13f70fabdf89b17d2f1f8fb");
const updateDoctor = createServerFn({
  method: "POST"
}).inputValidator(DoctorUpdateSchema).handler(updateDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.id, id),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Doctor not found or access denied");
    }
    if (updateData.registrationNumber) {
      const [duplicate] = await db.select().from(doctorSchema).where(and(
        eq(doctorSchema.registrationNumber, updateData.registrationNumber),
        eq(doctorSchema.labId, labId),
        // CRITICAL: Check within lab only
        ne(doctorSchema.id, id),
        isNull(doctorSchema.deletedAt)
      )).limit(1);
      if (duplicate) {
        throw new Error("Registration number already exists for another doctor in your lab");
      }
    }
    const [updatedDoctor] = await db.update(doctorSchema).set({
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(doctorSchema.id, id),
      eq(doctorSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "Doctor updated successfully",
      data: updatedDoctor
    };
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update doctor");
  }
});
const deleteDoctor_createServerFn_handler = createSsrRpc("3e743f8de56b84d00b0dfb65853cccba90375ac6b709a29e25593f0c7329d022");
const deleteDoctor = createServerFn({
  method: "POST"
}).inputValidator(DoctorIdSchema).handler(deleteDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Doctor not found or access denied");
    }
    await db.update(doctorSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Doctor deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete doctor");
  }
});
const permanentlyDeleteDoctor_createServerFn_handler = createSsrRpc("12abd73b5933ccd6900df5a4730dd5d90c469edca3c73b18a3c763773e2e54e6");
createServerFn({
  method: "POST"
}).inputValidator(DoctorIdSchema).handler(permanentlyDeleteDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const deleted = await db.delete(doctorSchema).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).returning();
    if (deleted.length === 0) {
      throw new Error("Doctor not found or access denied");
    }
    return {
      success: true,
      message: "Doctor permanently deleted"
    };
  } catch (error) {
    console.error("Error permanently deleting doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to permanently delete doctor");
  }
});
const restoreDoctor_createServerFn_handler = createSsrRpc("4b490d806da08483ec5e58551edab8c156b1126c04faaba9f8231b0a7283a58d");
createServerFn({
  method: "POST"
}).inputValidator(DoctorIdSchema).handler(restoreDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [restored] = await db.update(doctorSchema).set({
      deletedAt: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).returning();
    if (!restored) {
      throw new Error("Doctor not found or access denied");
    }
    return {
      success: true,
      message: "Doctor restored successfully",
      data: restored
    };
  } catch (error) {
    console.error("Error restoring doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to restore doctor");
  }
});
const getDoctorsBySpecialization_createServerFn_handler = createSsrRpc("687d43d01dd45244ff29a9f700e5e4f671c268dff00500d71e17031a9e01b8bd");
createServerFn({
  method: "GET"
}).inputValidator(z.object({
  specialization: z.string().min(1)
})).handler(getDoctorsBySpecialization_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const doctors = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.specialization, data.specialization),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt)
    )).orderBy(doctorSchema.name);
    return {
      success: true,
      data: doctors,
      specialization: data.specialization
    };
  } catch (error) {
    console.error("Error fetching doctors by specialization:", error);
    throw new Error("Failed to fetch doctors by specialization");
  }
});
const getAllSpecializations_createServerFn_handler = createSsrRpc("b4feeef641f2188752d2b6bb947e53483e2ba00af311a54e59eb1a98f96416b4");
createServerFn({
  method: "GET"
}).handler(getAllSpecializations_createServerFn_handler, async ({
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const specializations = await db.selectDistinct({
      specialization: doctorSchema.specialization
    }).from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt),
      sql`${doctorSchema.specialization} IS NOT NULL`
    )).orderBy(doctorSchema.specialization);
    return {
      success: true,
      data: specializations.map((s) => s.specialization).filter(Boolean)
    };
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw new Error("Failed to fetch specializations");
  }
});
const $$splitComponentImporter$7 = () => import("./index-CDKu4BRx.mjs");
const Route$7 = createFileRoute("/doctors/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  loader: async () => {
    const result = await getAllDoctors({
      data: {
        limit: 50,
        offset: 0,
        sortBy: "name",
        sortOrder: "asc"
      }
    });
    return result;
  }
});
const TestResultCreateSchema = z.object({
  patientTestId: z.number().int().positive(),
  results: z.array(z.object({
    parameterId: z.number().int().positive(),
    parameterName: z.string(),
    value: z.string(),
    unit: z.string().optional(),
    referenceRange: z.string().optional(),
    isAbnormal: z.boolean().optional(),
    status: z.enum(["Low", "Normal", "High"]).optional()
  })),
  impression: z.string().optional()
});
const TestResultUpdateSchema = z.object({
  id: z.number().int().positive(),
  results: z.array(z.object({
    parameterId: z.number().int().positive(),
    parameterName: z.string(),
    value: z.string(),
    unit: z.string().optional(),
    referenceRange: z.string().optional(),
    isAbnormal: z.boolean().optional(),
    status: z.enum(["Low", "Normal", "High"]).optional()
  })),
  impression: z.string().optional()
});
const PatientTestIdSchema = z.object({
  patientTestId: z.number().int().positive()
});
const TestResultIdSchema = z.object({
  id: z.number().int().positive()
});
const GetTestResultDataSchema = z.object({
  patientTestId: z.number().int().positive()
});
const PatientIdSchema = z.object({
  patientId: z.number().int().positive()
});
const getTestResultData_createServerFn_handler = createSsrRpc("9544b1a68e9027e2205ba603b1d881923ac3d31cf90aafd163820d16ba3022e2");
const getTestResultData = createServerFn({
  method: "GET"
}).inputValidator(GetTestResultDataSchema).handler(getTestResultData_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patientTest] = await db.select().from(patientTestsSchema).where(and(
      eq(patientTestsSchema.id, data.patientTestId),
      eq(patientTestsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(patientTestsSchema.deletedAt)
    )).limit(1);
    if (!patientTest) {
      throw new Error("Patient test not found or access denied");
    }
    const [test] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, patientTest.testId),
      eq(testSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!test) {
      throw new Error("Test details not found");
    }
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, patientTest.patientId),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!patient) {
      throw new Error("Patient not found");
    }
    let bill = null;
    if (patientTest.billId) {
      [bill] = await db.select().from(billSchema).where(and(
        eq(billSchema.id, patientTest.billId),
        eq(billSchema.labId, labId)
        // CRITICAL: Verify ownership
      )).limit(1);
    }
    let doctor = null;
    if (patientTest.doctorId) {
      [doctor] = await db.select().from(doctorSchema).where(and(
        eq(doctorSchema.id, patientTest.doctorId),
        eq(doctorSchema.labId, labId)
        // CRITICAL: Verify ownership
      )).limit(1);
    }
    const parameterIds = test.metadata?.parameterIds || [];
    let parameters = [];
    if (parameterIds.length > 0) {
      parameters = await db.select().from(testParamSchema).where(and(
        inArray(testParamSchema.id, parameterIds),
        eq(testParamSchema.labId, labId),
        // CRITICAL: Verify ownership
        isNull(testParamSchema.deletedAt)
      ));
    }
    const [existingResult] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.patientTestId, data.patientTestId),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    return {
      success: true,
      data: {
        patientTest,
        test,
        patient,
        doctor,
        bill,
        parameters: parameters.map((p) => ({
          ...p,
          metadata: p.metadata || {},
          referenceRanges: p.referenceRanges || []
        })),
        existingResult: existingResult || null
      }
    };
  } catch (error) {
    console.error("Error fetching test result data:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch test result data");
  }
});
const createTestResult_createServerFn_handler = createSsrRpc("1e92e183ed42b1d74db3b54756cfd5f78162e479fc4673dda7d49db2d69c20bb");
const createTestResult = createServerFn({
  method: "POST"
}).inputValidator(TestResultCreateSchema).handler(createTestResult_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patientTest] = await db.select().from(patientTestsSchema).where(and(
      eq(patientTestsSchema.id, data.patientTestId),
      eq(patientTestsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(patientTestsSchema.deletedAt)
    )).limit(1);
    if (!patientTest) {
      throw new Error("Patient test not found or access denied");
    }
    const [existing] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.patientTestId, data.patientTestId),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    if (existing) {
      throw new Error("Test results already exist. Use update instead.");
    }
    const resultData = {
      results: data.results,
      impression: data.impression || null
    };
    const [newResult] = await db.insert(testResultsSchema).values({
      labId,
      // CRITICAL: Assign to user's lab
      patientTestId: data.patientTestId,
      result: resultData
    }).returning();
    await db.update(patientTestsSchema).set({
      status: "completed",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(patientTestsSchema.id, data.patientTestId),
      eq(patientTestsSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Test results saved successfully",
      data: newResult
    };
  } catch (error) {
    console.error("Error creating test results:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to save test results");
  }
});
const updateTestResult_createServerFn_handler = createSsrRpc("929a4bea83a025b51e4311bb07e0d243f872eafce12f7a17e06be306d1ef5852");
const updateTestResult = createServerFn({
  method: "POST"
}).inputValidator(TestResultUpdateSchema).handler(updateTestResult_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      results,
      impression
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.id, id),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test result not found or access denied");
    }
    const resultData = {
      results,
      impression: impression || null
    };
    const [updated] = await db.update(testResultsSchema).set({
      result: resultData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testResultsSchema.id, id),
      eq(testResultsSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "Test results updated successfully",
      data: updated
    };
  } catch (error) {
    console.error("Error updating test results:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update test results");
  }
});
const getTestResultByPatientTestId_createServerFn_handler = createSsrRpc("adb057ad513135ccdbc5f79a5764efb8c875cd8d13f7d7f751fbeeae680d9bc8");
createServerFn({
  method: "GET"
}).inputValidator(PatientTestIdSchema).handler(getTestResultByPatientTestId_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [result] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.patientTestId, data.patientTestId),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    return {
      success: true,
      data: result || null
    };
  } catch (error) {
    console.error("Error fetching test result:", error);
    throw new Error("Failed to fetch test result");
  }
});
const deleteTestResult_createServerFn_handler = createSsrRpc("534c7a3973e3c4fbc6d0c95627ea83bb341ed4ec6752a90e4e8648117b39c075");
createServerFn({
  method: "POST"
}).inputValidator(TestResultIdSchema).handler(deleteTestResult_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.id, data.id),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test result not found or access denied");
    }
    await db.update(testResultsSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testResultsSchema.id, data.id),
      eq(testResultsSchema.labId, labId)
      // CRITICAL
    ));
    await db.update(patientTestsSchema).set({
      status: "pending",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(patientTestsSchema.id, existing.patientTestId),
      eq(patientTestsSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Test result deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting test result:", error);
    throw new Error("Failed to delete test result");
  }
});
const getPatientTestsWithResults_createServerFn_handler = createSsrRpc("5475319725572acce855b57c19cd438e43cd99a07395cfe8b8d128f757465d01");
createServerFn({
  method: "GET"
}).inputValidator(PatientIdSchema).handler(getPatientTestsWithResults_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const patientTests = await db.select({
      patientTest: patientTestsSchema,
      test: testSchema,
      doctor: doctorSchema
    }).from(patientTestsSchema).leftJoin(testSchema, eq(patientTestsSchema.testId, testSchema.id)).leftJoin(doctorSchema, eq(patientTestsSchema.doctorId, doctorSchema.id)).where(and(
      eq(patientTestsSchema.patientId, data.patientId),
      eq(patientTestsSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(patientTestsSchema.deletedAt)
    ));
    const testsWithResults = await Promise.all(patientTests.map(async (pt) => {
      const [result] = await db.select().from(testResultsSchema).where(and(
        eq(testResultsSchema.patientTestId, pt.patientTest.id),
        eq(testResultsSchema.labId, labId),
        // CRITICAL: Filter by labId
        isNull(testResultsSchema.deletedAt)
      )).limit(1);
      return {
        ...pt,
        test: pt.test ? {
          ...pt.test,
          metadata: pt.test.metadata || {}
        } : null,
        result: result || null,
        hasResult: !!result
      };
    }));
    return {
      success: true,
      data: testsWithResults
    };
  } catch (error) {
    console.error("Error fetching patient tests with results:", error);
    throw new Error("Failed to fetch patient tests with results");
  }
});
const $$splitComponentImporter$6 = () => import("./_testId-C2JN7LUA.mjs");
const Route$6 = createFileRoute("/test-results/$testId")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  loader: async ({
    params
  }) => {
    const result = await getTestResultData({
      data: {
        patientTestId: parseInt(params.testId)
      }
    });
    return result;
  }
});
const $$splitComponentImporter$5 = () => import("./register-ecxmDHFm.mjs");
const Route$5 = createFileRoute("/patients/register")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  loader: async () => {
    const [testsResult, doctorsResult] = await Promise.all([getAllTests({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "name",
        sortOrder: "asc"
      }
    }), getAllDoctors({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "name",
        sortOrder: "asc"
      }
    })]);
    return {
      tests: testsResult,
      doctors: doctorsResult
    };
  }
});
const $$splitComponentImporter$4 = () => import("./_id-noMCOcHn.mjs");
const Route$4 = createFileRoute("/patients/$id")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  loader: async ({
    params
  }) => {
    const result = await getPatientWithTests({
      data: {
        id: parseInt(params.id)
      }
    });
    return result;
  }
});
const BillIdSchema = z.object({
  id: z.number().int().positive()
});
const BillInvoiceSchema = z.object({
  invoiceNumber: z.string().min(1)
});
const BillListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["createdAt", "invoiceNumber", "finalAmount"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const BillUpdateSchema = z.object({
  id: z.number().int().positive(),
  isPaid: z.boolean().optional(),
  discount: z.string().optional(),
  tax: z.string().optional(),
  finalAmount: z.string().optional()
});
const CreateBillSchema = z.object({
  patientId: z.coerce.number().int().positive(),
  testIds: z.array(z.coerce.number().int().positive()),
  discount: z.number().min(0).max(100).default(0),
  tax: z.number().min(0).max(100).default(0)
});
const getBillById_createServerFn_handler = createSsrRpc("f92db8bdce09118a362d19980bc6e5e9abc700027626a5f05984458477de49a1");
const getBillById = createServerFn({
  method: "GET"
}).inputValidator(BillIdSchema).handler(getBillById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [bill] = await db.select().from(billSchema).where(and(
      eq(billSchema.id, data.id),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!bill) {
      throw new Error("Bill not found or access denied");
    }
    const [lab] = await db.select().from(labSchema).where(eq(labSchema.id, labId)).limit(1);
    const [patient] = await db.select().from(patientSchema).where(eq(patientSchema.id, bill.patientId)).limit(1);
    const patientTests = await db.select({
      patientTest: patientTestsSchema,
      test: testSchema,
      doctor: doctorSchema
    }).from(patientTestsSchema).leftJoin(testSchema, eq(patientTestsSchema.testId, testSchema.id)).leftJoin(doctorSchema, eq(patientTestsSchema.doctorId, doctorSchema.id)).where(eq(patientTestsSchema.billId, bill.id));
    const normalizedTests = patientTests.map((pt) => ({
      ...pt,
      test: pt.test ? {
        ...pt.test,
        metadata: pt.test.metadata || {}
      } : null
    }));
    return {
      success: true,
      data: {
        bill,
        lab,
        patient,
        tests: normalizedTests
      }
    };
  } catch (error) {
    console.error("Error fetching bill:", error);
    throw new Error("Failed to fetch bill");
  }
});
const getBillByInvoiceNumber_createServerFn_handler = createSsrRpc("b3c59b70ed69a28aeba6173a683c0fcf6a93e795e2005231ce2e85f74120a05a");
createServerFn({
  method: "GET"
}).inputValidator(BillInvoiceSchema).handler(getBillByInvoiceNumber_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [bill] = await db.select().from(billSchema).where(and(
      eq(billSchema.invoiceNumber, data.invoiceNumber),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!bill) {
      throw new Error("Bill not found");
    }
    return {
      success: true,
      data: bill
    };
  } catch (error) {
    console.error("Error fetching bill by invoice:", error);
    throw new Error("Failed to fetch bill");
  }
});
const getAllBills_createServerFn_handler = createSsrRpc("f780fb6379629698039faabfe5c4d357289df1cb4637e17d3d91bc5e3fc62997");
const getAllBills = createServerFn({
  method: "GET"
}).inputValidator(BillListSchema).handler(getAllBills_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    const bills = await db.select({
      bill: billSchema,
      patient: patientSchema
    }).from(billSchema).leftJoin(patientSchema, eq(billSchema.patientId, patientSchema.id)).where(and(eq(billSchema.labId, labId), isNull(billSchema.deletedAt))).orderBy(sortOrder === "asc" ? billSchema[sortBy] : desc(billSchema[sortBy])).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(billSchema).where(and(eq(billSchema.labId, labId), isNull(billSchema.deletedAt)));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: bills,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw new Error("Failed to fetch bills");
  }
});
const updateBill_createServerFn_handler = createSsrRpc("076f63fa49b79d248b4ec77ce1f7ad773960f371253cb297d5d34e30562a7e6f");
createServerFn({
  method: "POST"
}).inputValidator(BillUpdateSchema).handler(updateBill_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existingBill] = await db.select().from(billSchema).where(and(
      eq(billSchema.id, data.id),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!existingBill) {
      throw new Error("Bill not found or access denied");
    }
    const updateData = {
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (data.isPaid !== void 0) updateData.isPaid = data.isPaid;
    if (data.discount !== void 0) updateData.discount = data.discount;
    if (data.tax !== void 0) updateData.tax = data.tax;
    if (data.finalAmount !== void 0) updateData.finalAmount = data.finalAmount;
    const [updatedBill] = await db.update(billSchema).set(updateData).where(eq(billSchema.id, data.id)).returning();
    return {
      success: true,
      data: updatedBill,
      message: "Bill updated successfully"
    };
  } catch (error) {
    console.error("Error updating bill:", error);
    throw new Error("Failed to update bill");
  }
});
const markBillAsPaid_createServerFn_handler = createSsrRpc("4f80872130608d08ab0eabb65a626bd4fd8bc1344f43710133f97b863985b048");
createServerFn({
  method: "POST"
}).inputValidator(BillIdSchema).handler(markBillAsPaid_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [bill] = await db.select().from(billSchema).where(and(
      eq(billSchema.id, data.id),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!bill) {
      throw new Error("Bill not found or access denied");
    }
    const [updatedBill] = await db.update(billSchema).set({
      isPaid: true,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(billSchema.id, data.id)).returning();
    return {
      success: true,
      data: updatedBill,
      message: "Bill marked as paid"
    };
  } catch (error) {
    console.error("Error marking bill as paid:", error);
    throw new Error("Failed to mark bill as paid");
  }
});
const searchBills_createServerFn_handler = createSsrRpc("ef4ee991aefd308a17fdb0c859c233536daeaa3078e8376a00c82487335d1b25");
const searchBills = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0)
})).handler(searchBills_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      query,
      limit,
      offset
    } = data;
    const searchPattern = `%${query}%`;
    const labId = await getLabIdFromRequest(request);
    const bills = await db.select({
      bill: billSchema,
      patient: patientSchema
    }).from(billSchema).leftJoin(patientSchema, eq(billSchema.patientId, patientSchema.id)).where(and(
      eq(billSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(billSchema.invoiceNumber, searchPattern), ilike(patientSchema.name, searchPattern)),
      isNull(billSchema.deletedAt)
    )).orderBy(desc(billSchema.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(billSchema).leftJoin(patientSchema, eq(billSchema.patientId, patientSchema.id)).where(and(
      eq(billSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(billSchema.invoiceNumber, searchPattern), ilike(patientSchema.name, searchPattern)),
      isNull(billSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: bills,
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching bills:", error);
    throw new Error("Failed to search bills");
  }
});
const createBill_createServerFn_handler = createSsrRpc("97ddf72c598e878cce67459468ec608dac486714304c1d3038b759ce0c485f24");
const createBill = createServerFn({
  method: "POST"
}).inputValidator(CreateBillSchema).handler(createBill_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(eq(patientSchema.id, data.patientId), eq(patientSchema.labId, labId), isNull(patientSchema.deletedAt))).limit(1);
    if (!patient) {
      throw new Error("Patient not found or access denied");
    }
    const selectedTests = await db.select().from(testSchema).where(and(eq(testSchema.labId, labId), data.testIds.length > 0 ? or(...data.testIds.map((id) => eq(testSchema.id, id))) : void 0));
    if (selectedTests.length === 0) {
      throw new Error("No valid tests found");
    }
    const subtotal = selectedTests.reduce((sum, test) => {
      return sum + (parseFloat(test.price || "0") || 0);
    }, 0);
    const discountAmount = subtotal * data.discount / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * data.tax / 100;
    const finalAmount = afterDiscount + taxAmount;
    const now = /* @__PURE__ */ new Date();
    const invoiceNumber = `INV-${labId}-${now.getTime()}`;
    const [newBill] = await db.insert(billSchema).values({
      labId,
      patientId: data.patientId,
      invoiceNumber,
      subtotal: subtotal.toString(),
      discount: data.discount.toString(),
      tax: data.tax.toString(),
      finalAmount: finalAmount.toString(),
      isPaid: false,
      createdAt: now,
      updatedAt: now
    }).returning();
    if (newBill) {
      await db.insert(patientTestsSchema).values(selectedTests.map((test) => ({
        patientId: data.patientId,
        testId: test.id,
        billId: newBill.id,
        result: null,
        createdAt: now,
        updatedAt: now
      })));
    }
    return {
      success: true,
      data: newBill,
      message: "Bill created successfully"
    };
  } catch (error) {
    console.error("Error creating bill:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create bill");
  }
});
const $$splitComponentImporter$3 = () => import("./_id-DjlOGuMd.mjs");
const Route$3 = createFileRoute("/bills/$id")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  loader: async () => {
    const result = await getAllBills({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "createdAt",
        sortOrder: "desc"
      }
    });
    return result;
  }
});
const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Role is required"),
  phoneNumber: z.number().int().positive().optional(),
  permissions: z.object({
    patients: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    bills: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    tests: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    parameters: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    doctors: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    reports: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    users: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional()
  })
});
const UpdateUserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  role: z.string().min(1).optional(),
  phoneNumber: z.number().int().positive().optional(),
  permissions: z.object({
    patients: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    bills: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    tests: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    parameters: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    doctors: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    reports: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    users: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional()
  }).optional()
});
const UserIdSchema = z.object({
  id: z.number().int().positive()
});
const UserListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "role", "email"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const createUser_createServerFn_handler = createSsrRpc("2ebbe331e59ad581a81bb5e90852666a0c0e00b858cc4ca3b8b770c45469e288");
const createUser = createServerFn({
  method: "POST"
}).inputValidator(CreateUserSchema).handler(createUser_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const currentUser = await getUserFromRequest(request);
    const labId = await getLabIdFromRequest(request);
    const existingUser = await db.select().from(userSchema).where(eq(userSchema.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("Email already exists");
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const [newUser] = await db.insert(userSchema).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      phoneNumber: data.phoneNumber || null,
      permissions: data.permissions,
      isAdmin: false,
      createdBy: currentUser.id,
      labId,
      // CRITICAL: Assign to current user's lab
      hasCompletedSetup: true
      // New users inherit lab setup
    }).returning();
    return {
      success: true,
      message: "User created successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        permissions: newUser.permissions,
        isAdmin: newUser.isAdmin
      }
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create user");
  }
});
const getAllUsers_createServerFn_handler = createSsrRpc("16cf2e1d8110b30236f86f4674f057330fda70584dc3fc37bf8ad42310052c35");
const getAllUsers = createServerFn({
  method: "GET"
}).inputValidator(UserListSchema).handler(getAllUsers_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    const labId = await getLabIdFromRequest(request);
    const orderByColumn = userSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(userSchema).where(and(
      eq(userSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(userSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    const users = await db.select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      role: userSchema.role,
      phoneNumber: userSchema.phoneNumber,
      permissions: userSchema.permissions,
      isAdmin: userSchema.isAdmin,
      createdAt: userSchema.createdAt,
      updatedAt: userSchema.updatedAt
    }).from(userSchema).where(and(
      eq(userSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(userSchema.deletedAt)
    )).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: users,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
});
const getUserById_createServerFn_handler = createSsrRpc("a4cfac5ab013dbdfc4fce6241a731ff2b94401c72afa868c8033486e498f35d3");
createServerFn({
  method: "GET"
}).inputValidator(UserIdSchema).handler(getUserById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [user] = await db.select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      role: userSchema.role,
      phoneNumber: userSchema.phoneNumber,
      permissions: userSchema.permissions,
      isAdmin: userSchema.isAdmin,
      createdAt: userSchema.createdAt,
      updatedAt: userSchema.updatedAt
    }).from(userSchema).where(and(
      eq(userSchema.id, data.id),
      eq(userSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(userSchema.deletedAt)
    )).limit(1);
    if (!user) {
      throw new Error("User not found or access denied");
    }
    return {
      success: true,
      data: user
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch user");
  }
});
const updateUser_createServerFn_handler = createSsrRpc("50299f7d500516c957d4cebbe56ccc63ce8e3d70a295fb4e98ed657ef1ab5427");
const updateUser = createServerFn({
  method: "POST"
}).inputValidator(UpdateUserSchema).handler(updateUser_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      password,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(userSchema).where(and(
      eq(userSchema.id, id),
      eq(userSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(userSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("User not found or access denied");
    }
    if (updateData.email && updateData.email !== existing.email) {
      const [duplicate] = await db.select().from(userSchema).where(and(eq(userSchema.email, updateData.email), ne(userSchema.id, id), isNull(userSchema.deletedAt))).limit(1);
      if (duplicate) {
        throw new Error("Email already exists");
      }
    }
    const updateValues = {
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (password) {
      const saltRounds = 12;
      updateValues.password = await bcrypt.hash(password, saltRounds);
    }
    const [updated] = await db.update(userSchema).set(updateValues).where(and(
      eq(userSchema.id, id),
      eq(userSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "User updated successfully",
      data: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        phoneNumber: updated.phoneNumber,
        permissions: updated.permissions,
        isAdmin: updated.isAdmin
      }
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update user");
  }
});
const deleteUser_createServerFn_handler = createSsrRpc("1d4bd1f7515f038c36c633a90c3e0dbe63010b09b76b2b2bbfebda95954528b2");
const deleteUser = createServerFn({
  method: "POST"
}).inputValidator(UserIdSchema).handler(deleteUser_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(userSchema).where(and(
      eq(userSchema.id, data.id),
      eq(userSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(userSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("User not found or access denied");
    }
    if (existing.isAdmin) {
      throw new Error("Cannot delete admin accounts");
    }
    await db.update(userSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(userSchema.id, data.id),
      eq(userSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "User deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete user");
  }
});
const $$splitComponentImporter$2 = () => import("./dashboard-x3ER1xff.mjs");
const Route$2 = createFileRoute("/admin/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  loader: async () => {
    const result = await getAllUsers({
      data: {
        limit: 100,
        offset: 0,
        sortBy: "createdAt",
        sortOrder: "desc"
      }
    });
    return result;
  }
});
const $$splitComponentImporter$1 = () => import("./bill._id-B5JCxc0O.mjs");
const Route$1 = createFileRoute("/bills/bill/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  loader: async ({
    params
  }) => {
    try {
      const result = await getBillById({
        data: {
          id: parseInt(params.id)
        }
      });
      return result;
    } catch (error) {
      console.error("Error fetching bill:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch bill"
      };
    }
  }
});
const $$splitComponentImporter = () => import("./bill.-DyPnIqDR.mjs");
const Route = createFileRoute("/bills/bill/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async ({
    params
  }) => {
    try {
      const result = await getBillById({
        data: {
          id: parseInt(params.id)
        }
      });
      return result;
    } catch (error) {
      console.error("Error fetching bill:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch bill"
      };
    }
  }
});
const LabSetupRoute = Route$d.update({
  id: "/lab-setup",
  path: "/lab-setup",
  getParentRoute: () => Route$e
});
const DashboardRoute = Route$c.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const TestsIndexRoute = Route$a.update({
  id: "/tests/",
  path: "/tests/",
  getParentRoute: () => Route$e
});
const TestParametersIndexRoute = Route$9.update({
  id: "/test-parameters/",
  path: "/test-parameters/",
  getParentRoute: () => Route$e
});
const LabManagementIndexRoute = Route$8.update({
  id: "/lab-management/",
  path: "/lab-management/",
  getParentRoute: () => Route$e
});
const DoctorsIndexRoute = Route$7.update({
  id: "/doctors/",
  path: "/doctors/",
  getParentRoute: () => Route$e
});
const TestResultsTestIdRoute = Route$6.update({
  id: "/test-results/$testId",
  path: "/test-results/$testId",
  getParentRoute: () => Route$e
});
const PatientsRegisterRoute = Route$5.update({
  id: "/patients/register",
  path: "/patients/register",
  getParentRoute: () => Route$e
});
const PatientsIdRoute = Route$4.update({
  id: "/patients/$id",
  path: "/patients/$id",
  getParentRoute: () => Route$e
});
const BillsIdRoute = Route$3.update({
  id: "/bills/$id",
  path: "/bills/$id",
  getParentRoute: () => Route$e
});
const AdminDashboardRoute = Route$2.update({
  id: "/admin/dashboard",
  path: "/admin/dashboard",
  getParentRoute: () => Route$e
});
const BillsBillIdRoute = Route$1.update({
  id: "/bills/bill/$id",
  path: "/bills/bill/$id",
  getParentRoute: () => Route$e
});
const BillsBillRoute = Route.update({
  id: "/bills/bill/",
  path: "/bills/bill/",
  getParentRoute: () => Route$e
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  LabSetupRoute,
  AdminDashboardRoute,
  BillsIdRoute,
  PatientsIdRoute,
  PatientsRegisterRoute,
  TestResultsTestIdRoute,
  DoctorsIndexRoute,
  LabManagementIndexRoute,
  TestParametersIndexRoute,
  TestsIndexRoute,
  BillsBillRoute,
  BillsBillIdRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
const routerB48m2_K0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  A: getAllDoctors,
  B: Button,
  C: Route$6,
  D: updateTestResult,
  E: createTestResult,
  F: createBill,
  G: Route$5,
  H: searchPatientByPhone,
  I: createPatientWithTests,
  J: Route$4,
  K: Route$3,
  L: searchBills,
  M: getAllBills,
  N: Route$2,
  O: deleteUser,
  P: createUser,
  Q: getAllUsers,
  R: Route$a,
  S: updateUser,
  T: cn,
  U: Route$1,
  V: Route,
  W: logoutUser,
  X: router,
  a: searchTests,
  b: createTest,
  c: calculateTestPrice,
  d: deleteTest,
  e: getAllTests,
  f: Route$9,
  g: getCurrentUser,
  h: searchTestParameters,
  i: deleteTestParameter,
  j: createTestParameter,
  k: updateTestParameter,
  l: loginUser,
  m: getAllTestParameters,
  n: Route$8,
  o: getAllPatients,
  p: bulkDeletePatients,
  q: updatePatient,
  r: registerUser,
  s: setupLab,
  t: Route$7,
  u: updateTest,
  v: useToast,
  w: deleteDoctor,
  x: searchDoctors,
  y: registerDoctor,
  z: updateDoctor
});
export {
  logoutUser as $,
  searchDoctors as A,
  Button as B,
  CircleCheckBig as C,
  registerDoctor as D,
  updateDoctor as E,
  getAllDoctors as F,
  Route$6 as G,
  updateTestResult as H,
  createTestResult as I,
  Route$5 as J,
  searchPatientByPhone as K,
  createPatientWithTests as L,
  createBill as M,
  Route$4 as N,
  Route$3 as O,
  searchBills as P,
  getAllBills as Q,
  Route$a as R,
  Route$2 as S,
  deleteUser as T,
  createUser as U,
  getAllUsers as V,
  updateUser as W,
  X,
  cn as Y,
  Route$1 as Z,
  Route as _,
  CircleAlert as a,
  routerB48m2_K0 as a0,
  calculateTestPrice as b,
  createLucideIcon as c,
  searchTests as d,
  deleteTest as e,
  createTest as f,
  getCurrentUser as g,
  getAllTests as h,
  Route$9 as i,
  searchTestParameters as j,
  deleteTestParameter as k,
  loginUser as l,
  createTestParameter as m,
  updateTestParameter as n,
  getAllTestParameters as o,
  Route$8 as p,
  RefreshCw as q,
  registerUser as r,
  setupLab as s,
  getAllPatients as t,
  updateTest as u,
  bulkDeletePatients as v,
  updatePatient as w,
  Route$7 as x,
  useToast as y,
  deleteDoctor as z
};
