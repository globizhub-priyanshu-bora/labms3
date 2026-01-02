import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { L as Layout } from "./Layout-C_dtCkhk.mjs";
import { c as createLucideIcon, M as Mail, P as Phone, C as CircleCheckBig, B as Button, g as getCurrentUser } from "./router-BYOHKi2s.mjs";
import { U as Users, T as TrendingUp } from "./users.mjs";
import { D as DollarSign } from "./dollar-sign.mjs";
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
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ]
];
const Badge = createLucideIcon("badge", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getCurrentUser();
        if (result.success && result.user) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-white flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Loading your information..." })
    ] }) }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-white flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "No user data available. Please login again." }) }) });
  }
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-white p-4 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 border-b-2 border-black pb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl font-bold text-black mb-2", children: [
        "Welcome back, ",
        user?.name,
        "!"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700", children: "Here's your dashboard overview and account information" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-black", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-black mb-8 border-b-2 border-gray-300 pb-4", children: "Your Account Information" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 rounded-lg p-6 border border-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(Users, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 font-semibold", children: "Full Name" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-black", children: user?.name || "N/A" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 rounded-lg p-6 border border-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 font-semibold", children: "Email Address" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-black break-all", children: user?.email || "N/A" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 rounded-lg p-6 border border-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(Badge, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 font-semibold", children: "Your Role" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-black capitalize", children: user?.isAdmin ? "Administrator" : user?.role?.replace(/_/g, " ") || "User" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 rounded-lg p-6 border border-gray-400 md:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 font-semibold", children: "Phone Number" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-black", children: user?.phoneNumber ? user.phoneNumber : "Not provided" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-black mb-6 border-b-2 border-gray-300 pb-4", children: "Medical Lab Analytics" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-black", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm font-semibold mb-1", children: "Total Sales" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-black", children: "₹45,230" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm font-semibold mt-2", children: "↑ 12% from last month" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-200 p-4 rounded-lg", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-8 h-8 text-black" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-black", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm font-semibold mb-1", children: "Total Patients" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-black", children: "328" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm font-semibold mt-2", children: "↑ 8% from last month" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-200 p-4 rounded-lg", children: /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 text-black" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-black", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm font-semibold mb-1", children: "Completed Tests" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-black", children: "562" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm font-semibold mt-2", children: "↑ 15% from last month" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-200 p-4 rounded-lg", children: /* @__PURE__ */ jsx(CircleCheckBig, { className: "w-8 h-8 text-black" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-black", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm font-semibold mb-1", children: "Pending Tests" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-black", children: "47" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm font-semibold mt-2", children: "⚠ Needs attention" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-200 p-4 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "w-8 h-8 text-black" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 border-2 border-black", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-black mb-6", children: "Revenue Trend" }),
          /* @__PURE__ */ jsx("div", { className: "h-64 bg-gray-100 rounded-lg flex items-end justify-around px-4 py-6 gap-2 border border-gray-300", children: [45, 52, 48, 65, 58, 72, 68, 75, 82, 88, 85, 92].map((height, i) => /* @__PURE__ */ jsx("div", { className: "flex-1 bg-black rounded-t-lg hover:shadow-lg transition-shadow", style: {
            height: `${height / 100 * 200}px`
          } }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm mt-4 text-center", children: "Monthly Revenue Growth" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 border-2 border-black", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-black mb-6", children: "Test Distribution" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [{
            label: "Blood Tests",
            value: 45
          }, {
            label: "Pathology Tests",
            value: 28
          }, {
            label: "Radiology",
            value: 18
          }, {
            label: "Ultrasound",
            value: 9
          }].map((item, i) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-800 font-semibold", children: item.label }),
              /* @__PURE__ */ jsxs("p", { className: "text-black font-bold", children: [
                item.value,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-300 rounded-full h-3 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-black rounded-full transition-all", style: {
              width: `${item.value}%`
            } }) })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-black rounded-lg shadow-lg p-6 text-white border-2 border-gray-800", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "w-8 h-8 mb-4 opacity-90" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Lab Efficiency" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mb-2", children: "94%" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Tests completed on time" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-black rounded-lg shadow-lg p-6 text-white border-2 border-gray-800", children: [
          /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 mb-4 opacity-90" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Satisfaction Rate" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mb-2", children: "98%" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Customer satisfaction score" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-black rounded-lg shadow-lg p-6 text-white border-2 border-gray-800", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-8 h-8 mb-4 opacity-90" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Avg Processing" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mb-2", children: "2.4h" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Average test processing time" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex gap-4 justify-center pt-8 border-t-2 border-gray-300", children: [
      /* @__PURE__ */ jsx("a", { href: "/patients/register", children: /* @__PURE__ */ jsx(Button, { className: "bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold", children: "Register New Patient" }) }),
      /* @__PURE__ */ jsx("a", { href: "/lab-management", children: /* @__PURE__ */ jsx(Button, { className: "bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold", children: "Go to Lab Management" }) })
    ] })
  ] }) }) });
}
export {
  DashboardPage as component
};
