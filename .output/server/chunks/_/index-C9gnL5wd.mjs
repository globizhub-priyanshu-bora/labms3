import { jsx, jsxs } from "react/jsx-runtime";
import { L as Layout } from "./Layout-C_dtCkhk.mjs";
import { x as Building2, M as Mail, P as Phone, y as MapPin, F as FileText, B as Button } from "./router-BYOHKi2s.mjs";
import "@tanstack/react-router";
import "react";
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
function LabDetails() {
  const labData = {
    name: "Your Laboratory",
    registrationNumber: "LAB-12345",
    email: "contact@yourlaboratory.com",
    phone: "+91 9876543210",
    address: "123 Medical Street, Health City, HC 12345",
    city: "Health City",
    state: "HC",
    country: "India",
    zipCode: "12345",
    licenseNumber: "LIC-98765",
    licenseExpiryDate: "2025-12-31",
    totalEmployees: 15,
    testedSamples: 1250,
    averageTestTime: "24 hours",
    createdAt: "2024-01-15"
  };
  return /* @__PURE__ */ jsx(Layout, { requiredRole: "admin", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: "Lab Details" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Complete information about your laboratory" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-6 mb-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Building2, { className: "w-6 h-6 text-blue-600" }),
            "Basic Information"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Laboratory Name" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900 font-semibold", children: labData.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Registration Number" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900 font-semibold", children: labData.registrationNumber })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "License Number" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900 font-semibold", children: labData.licenseNumber })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "License Expiry Date" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900 font-semibold", children: new Date(labData.licenseExpiryDate).toLocaleDateString() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-6 mb-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-blue-600" }),
            "Contact Information"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-gray-400 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700", children: "Email Address" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: labData.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-gray-400 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700", children: "Phone Number" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: labData.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-gray-400 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700", children: "Address" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: labData.address })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-6 mb-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-blue-600" }),
            "Location Details"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "City" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: labData.city })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "State" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: labData.state })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Country" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: labData.country })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Zip Code" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: labData.zipCode })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-600" }),
            "Lab Statistics"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Total Employees" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-blue-600", children: labData.totalEmployees })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Tested Samples" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-green-600", children: labData.testedSamples })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Average Test Time" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-purple-600", children: labData.averageTestTime })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Lab Since" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-orange-600", children: new Date(labData.createdAt).getFullYear() })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-6 sticky top-24", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Button, { className: "w-full bg-blue-600 hover:bg-blue-700 text-white", children: "Edit Lab Details" }),
          /* @__PURE__ */ jsx(Button, { className: "w-full bg-gray-600 hover:bg-gray-700 text-white", children: "Manage Documents" }),
          /* @__PURE__ */ jsx(Button, { className: "w-full bg-green-600 hover:bg-green-700 text-white", children: "View Reports" }),
          /* @__PURE__ */ jsx(Button, { className: "w-full bg-purple-600 hover:bg-purple-700 text-white", children: "Staff Management" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-yellow-900 mb-1", children: "License Status" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-yellow-700", children: [
            "Active until ",
            new Date(labData.licenseExpiryDate).toLocaleDateString()
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 bg-yellow-200 rounded-full", children: /* @__PURE__ */ jsx("div", { className: "h-full w-3/4 bg-yellow-500 rounded-full" }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  LabDetails as component
};
