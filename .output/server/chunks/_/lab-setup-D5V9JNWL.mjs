import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { c as createLucideIcon, B as Button, s as setupLab } from "./router-B48m2_K0.mjs";
import { L as Label } from "./label-BgPmW2HV.mjs";
import { F as FileText } from "./file-text.mjs";
import { P as Phone, M as Mail } from "./phone.mjs";
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
const __iconNode$1 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function LabSetup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      const result = await setupLab({
        data
      });
      if (result.success) {
        navigate({
          to: "/lab-management"
        });
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Lab setup failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-3xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4", children: /* @__PURE__ */ jsx(Building2, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Complete Lab Setup" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Please provide your laboratory details to get started" })
      ] }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-red-800", children: errorMessage }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Laboratory Name *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Building2, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...register("name", {
              required: "Lab name is required",
              minLength: {
                value: 2,
                message: "Lab name must be at least 2 characters"
              }
            }), className: "w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter laboratory name" })
          ] }),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.name.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Registration Number *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(FileText, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...register("registrationNumber", {
              required: "Registration number is required"
            }), className: "w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter registration number" })
          ] }),
          errors.registrationNumber && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.registrationNumber.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "GSTIN Number" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...register("gstinNumber"), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter GSTIN" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Phone Number" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: "number", ...register("phoneNumber", {
                valueAsNumber: true
              }), className: "w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter phone number" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Email Address" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx("input", { type: "email", ...register("email"), className: "w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter email address" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Address" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "absolute left-3 top-3 w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx("textarea", { ...register("addressLine1"), rows: 3, className: "w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", placeholder: "Enter laboratory address" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "State" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...register("state"), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "State" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Country" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...register("country"), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Country" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Pincode" }),
            /* @__PURE__ */ jsx("input", { type: "number", ...register("pincode", {
              valueAsNumber: true
            }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Pincode" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-800", children: [
          /* @__PURE__ */ jsx("strong", { children: "Note:" }),
          " This information will be used for all your laboratory's reports, bills, and official documents. You can update these details later from the settings."
        ] }) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, className: "w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl text-lg", children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
            /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }),
          "Setting up laboratory..."
        ] }) : "Complete Setup & Continue" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
      "Need help? Contact support at",
      " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:support@example.com", className: "text-blue-600 hover:underline", children: "support@example.com" })
    ] }) })
  ] }) });
}
export {
  LabSetup as component
};
