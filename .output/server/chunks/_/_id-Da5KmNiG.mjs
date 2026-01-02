import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { L as Layout } from "./Layout-CjqameQ5.mjs";
import { T as Route$3, F as FileText, a as CircleAlert, B as Button, p as RefreshCw, U as searchBills, V as getAllBills } from "./router-DU3091Rk.mjs";
import { D as DollarSign } from "./dollar-sign.mjs";
import { S as Search } from "./search.mjs";
import "./user.mjs";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "bcryptjs";
import "cookie";
import "drizzle-orm";
import "zod";
import "./session-manager-Dkxs0Vej.mjs";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "./helpers-zc_3GKPr.mjs";
function BillsManagement() {
  const initialData = Route$3.useLoaderData();
  const [bills, setBills] = useState(initialData?.data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    register,
    handleSubmit
  } = useForm();
  const loadBills = async () => {
    setIsRefreshing(true);
    try {
      const result = await getAllBills({
        data: {
          limit: 100,
          offset: 0,
          sortBy: "createdAt",
          sortOrder: "desc"
        }
      });
      if (result.success) {
        setBills(result.data);
        if (isSearching && searchQuery) {
          onSearch({
            query: searchQuery
          });
        }
      }
    } catch (error) {
      console.error("Error loading bills:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const onSearch = async (data) => {
    const trimmedQuery = data.query.trim();
    if (!trimmedQuery) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchQuery("");
      return;
    }
    try {
      const result = await searchBills({
        data: {
          query: trimmedQuery,
          limit: 100,
          offset: 0
        }
      });
      if (result.success) {
        setSearchResults(result.data);
        setIsSearching(true);
        setSearchQuery(trimmedQuery);
      }
    } catch (error) {
      console.error("Error searching bills:", error);
      showToast("Failed to search bills. Please try again.");
    }
  };
  const clearSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
    setSearchQuery("");
  };
  const displayedBills = isSearching ? searchResults : bills;
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const getStatusBadge = (isPaid) => {
    return isPaid ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded", children: "PAID" }) : /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded", children: "UNPAID" });
  };
  const stats = {
    total: displayedBills.length,
    paid: displayedBills.filter((b) => b.bill.isPaid).length,
    unpaid: displayedBills.filter((b) => !b.bill.isPaid).length,
    totalAmount: displayedBills.reduce((sum, b) => sum + parseFloat(b.bill.finalAmount), 0),
    paidAmount: displayedBills.filter((b) => b.bill.isPaid).reduce((sum, b) => sum + parseFloat(b.bill.finalAmount), 0)
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-blue-600" }),
        "Bills Management"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "View and manage all laboratory bills" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Total Bills" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.total })
        ] }),
        /* @__PURE__ */ jsx(FileText, { className: "w-10 h-10 text-blue-600 opacity-20" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Paid Bills" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: stats.paid })
        ] }),
        /* @__PURE__ */ jsx(DollarSign, { className: "w-10 h-10 text-green-600 opacity-20" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Unpaid Bills" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-red-600", children: stats.unpaid })
        ] }),
        /* @__PURE__ */ jsx(CircleAlert, { className: "w-10 h-10 text-red-600 opacity-20" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Revenue Collected" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
            "₹",
            stats.paidAmount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsx(DollarSign, { className: "w-10 h-10 text-blue-600 opacity-20" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-lg shadow-sm mb-4", children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSearch), className: "flex-1 min-w-[300px] max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search by invoice number, patient name, or patient ID...", ...register("query"), className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(Button, { type: "submit", onClick: handleSubmit(onSearch), className: "px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 mr-2" }),
            "Search"
          ] }),
          isSearching && /* @__PURE__ */ jsx(Button, { onClick: clearSearch, variant: "destructive", className: "px-4 py-2 text-sm", children: "Clear Search" }),
          /* @__PURE__ */ jsxs(Button, { onClick: loadBills, disabled: isRefreshing, className: "px-4 py-2 text-sm", children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}` }),
            "Refresh"
          ] })
        ] })
      ] }),
      isSearching && /* @__PURE__ */ jsx("div", { className: "mt-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-800", children: [
        "Showing results for: ",
        /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
          '"',
          searchQuery,
          '"'
        ] }),
        " ",
        "(",
        searchResults.length,
        " ",
        searchResults.length === 1 ? "result" : "results",
        " found)"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300 bg-gray-50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Invoice Number" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Patient Details" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Date & Time" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Contact" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Amount" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center font-semibold text-gray-900", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: displayedBills.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-4 py-16 text-center", children: isSearching ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsx(CircleAlert, { className: "w-16 h-16 text-gray-400 mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-lg", children: "No bills found" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm mt-2", children: [
            'No results matching "',
            searchQuery,
            '"'
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: clearSearch, className: "mt-4 px-6 py-2", children: "Clear Search" })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-16 h-16 text-gray-400 mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-lg", children: "No bills available" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-2", children: "Bills will appear here once patients are registered" })
        ] }) }) }) : displayedBills.map(({
          bill,
          patient
        }) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50 transition-colors", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium text-blue-600", children: bill.invoiceNumber }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
              "ID: ",
              bill.id.toString().padStart(6, "0")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: patient?.name || "N/A" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-600", children: [
              patient?.age && `${patient.age} Yrs`,
              patient?.age && patient?.gender && " • ",
              patient?.gender && `${patient.gender.charAt(0)}`,
              patient?.id && /* @__PURE__ */ jsxs(Fragment, { children: [
                " • ",
                /* @__PURE__ */ jsxs("span", { className: "text-blue-600", children: [
                  "PID: ",
                  patient.id.toString().padStart(6, "0")
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "text-gray-900", children: formatDate(bill.createdAt) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-700", children: patient?.phoneNumber || "-" }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "font-semibold text-gray-900", children: [
              "₹",
              parseFloat(bill.finalAmount).toFixed(2)
            ] }),
            (parseFloat(bill.discount || "0") > 0 || parseFloat(bill.tax || "0") > 0) && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
              "Base: ₹",
              parseFloat(bill.totalAmount).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: getStatusBadge(bill.isPaid) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2", children: /* @__PURE__ */ jsx(Link, { to: "/bills/bill/$id", params: {
            id: bill.id.toString()
          }, children: /* @__PURE__ */ jsxs(Button, { className: "px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-3 h-3 mr-1" }),
            "View Bill"
          ] }) }) }) })
        ] }, bill.id)) })
      ] }) }),
      displayedBills.length > 0 && /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 px-4 py-3 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-gray-600", children: [
          "Showing ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: displayedBills.length }),
          " bill(s)",
          isSearching && " (filtered)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-green-500 rounded" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
              "Paid: ",
              stats.paid
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-red-500 rounded" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
              "Unpaid: ",
              stats.unpaid
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "w-3 h-3 text-gray-600" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
              "Total: ₹",
              stats.totalAmount.toFixed(2)
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin", "cashier"], children: /* @__PURE__ */ jsx(BillsManagement, {}) });
export {
  SplitComponent as component
};
