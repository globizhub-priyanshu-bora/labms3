import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { L as Layout } from "./Layout-DXbA5ktY.mjs";
import { c as createLucideIcon, N as Route$4, a as CircleAlert, B as Button } from "./router-C5ryUzyF.mjs";
import { A as ArrowLeft } from "./arrow-left.mjs";
import { U as User } from "./user.mjs";
import { C as Calendar } from "./calendar.mjs";
import { F as FileText } from "./file-text.mjs";
import "react";
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
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
function PatientTestsPage() {
  const patientData = Route$4.useLoaderData();
  const navigate = useNavigate();
  Route$4.useParams();
  if (!patientData.success || !patientData.data) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(CircleAlert, { className: "w-16 h-16 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700 mb-4", children: "Patient not found" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate({
        to: "/lab-management"
      }), children: "Back to Lab Management" })
    ] }) });
  }
  const {
    patient,
    tests,
    bills
  } = patientData.data;
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
  const formatTime = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };
  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: "bg-orange-100",
        text: "text-orange-800"
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800"
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-800"
      }
    };
    const badge = badges[status.toLowerCase()] || badges.pending;
    return /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-xs font-semibold rounded-full ${badge.bg} ${badge.text}`, children: status.toUpperCase() });
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
        to: "/lab-management"
      }), className: "mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back to Lab Management"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Patient Tests & Details" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
        "Patient ID: ",
        patient.id.toString().padStart(6, "0")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-600 p-3 rounded-full", children: /* @__PURE__ */ jsx(User, { className: "w-6 h-6 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900", children: patient.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              patient.age && `${patient.age} Years`,
              patient.age && patient.gender && " • ",
              patient.gender && patient.gender
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm", children: [
          patient.phoneNumber && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 text-gray-400", children: "📞" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Phone Number" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: patient.phoneNumber })
            ] })
          ] }),
          (patient.addressLine1 || patient.city || patient.state || patient.pincode) && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 text-gray-400", children: "📍" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Address" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: [patient.addressLine1, patient.city, patient.state, patient.pincode].filter(Boolean).join(", ") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-gray-400 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Registration Date" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: formatDate(patient.createdAt) })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(ClipboardList, { className: "w-5 h-5 text-gray-700" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900", children: [
              "Test Records (",
              tests?.length || 0,
              ")"
            ] })
          ] }),
          tests && tests.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: tests.map((testItem, index) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-base", children: testItem.test?.name || "Unknown Test" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [
                  "Test ID: ",
                  testItem.patientTest.id
                ] })
              ] }),
              getStatusBadge(testItem.patientTest.status)
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm mb-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Registered On" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: formatDate(testItem.patientTest.createdAt) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Time" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: formatTime(testItem.patientTest.createdAt) })
              ] }),
              testItem.doctor && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Referred By" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: testItem.doctor.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Doctor Reg." }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: testItem.doctor.registrationNumber || "-" })
                ] })
              ] }),
              testItem.patientTest.reportDeliveryDate && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Delivery Date" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: formatDate(testItem.patientTest.reportDeliveryDate) })
              ] }),
              testItem.test?.price && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs", children: "Test Price" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-900 font-medium", children: [
                  "₹",
                  testItem.test.price
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: testItem.patientTest.status.toLowerCase() === "pending" ? /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
              to: "/test-results/$testId",
              params: {
                testId: testItem.patientTest.id.toString()
              }
            }), className: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700", children: [
              /* @__PURE__ */ jsx(ClipboardList, { className: "w-4 h-4 mr-2" }),
              "Enter Results"
            ] }) : /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
              to: "/test-results/$testId",
              params: {
                testId: testItem.patientTest.id.toString()
              }
            }), className: "flex-1 px-4 py-2 bg-green-600 hover:bg-green-700", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 mr-2" }),
              "View/Edit Report"
            ] }) })
          ] }, index)) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-gray-600", children: [
            /* @__PURE__ */ jsx(ClipboardList, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "No tests recorded" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "This patient hasn't been assigned any tests yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-gray-700" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900", children: [
              "Billing History (",
              bills?.length || 0,
              ")"
            ] })
          ] }),
          bills && bills.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: bills.map((bill) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: bill.invoiceNumber }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [
                  formatDate(bill.createdAt),
                  " at ",
                  formatTime(bill.createdAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-gray-900", children: [
                  "₹",
                  parseFloat(bill.finalAmount).toFixed(2)
                ] }),
                bill.isPaid ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded", children: "PAID" }) : /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded", children: "UNPAID" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
              to: "/bills/bill/$id",
              params: {
                id: bill.id.toString()
              }
            }), className: "w-full px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 mr-2" }),
              "View Bill Details"
            ] }) })
          ] }, bill.id)) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-gray-600", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-12 h-12 text-gray-400 mx-auto mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-base font-medium", children: "No billing records" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "No bills have been generated for this patient yet." })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin", "cashier", "lab_tech"], children: /* @__PURE__ */ jsx(PatientTestsPage, {}) });
export {
  SplitComponent as component
};
