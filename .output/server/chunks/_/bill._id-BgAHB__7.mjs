import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { L as Layout } from "./Layout-DXbA5ktY.mjs";
import { Z as Route$1, a as CircleAlert, B as Button } from "./router-C5ryUzyF.mjs";
import { A as ArrowLeft } from "./arrow-left.mjs";
import { P as Printer } from "./printer.mjs";
import { D as Download } from "./download.mjs";
import "react";
import "./user.mjs";
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
function BillDetailPage() {
  const billData = Route$1.useLoaderData();
  const navigate = useNavigate();
  if (!billData.success || !billData.data) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(CircleAlert, { className: "w-16 h-16 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700 mb-4", children: "Bill not found" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-6", children: billData.error || "Unable to load the requested bill" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate({
        to: "/lab-management"
      }), children: "Back to Lab Management" })
    ] }) });
  }
  const {
    bill,
    patient,
    tests
  } = billData.data;
  const handlePrint = () => {
    const printContent = document.getElementById("bill-print-content");
    if (!printContent) return;
    const printWindow = window.open("", "", "width=900,height=700");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill - ${bill.invoiceNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; }
            @page { size: A4; margin: 15mm; }
            @media print { body { margin: 0; } }
            .container { width: 100%; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .lab-name { font-size: 20px; font-weight: bold; }
            .bill-title { font-size: 16px; font-weight: bold; margin-top: 10px; }
            .section { margin-bottom: 15px; }
            .section-title { font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; font-weight: bold; }
            .text-right { text-align: right; }
            .total-row { font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .amount-words { margin: 10px 0; font-style: italic; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
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
  const totalAmount = parseFloat(bill.totalAmount);
  const discountPercent = parseFloat(bill.discount || "0");
  const taxPercent = parseFloat(bill.tax || "0");
  const discountAmount = totalAmount * discountPercent / 100;
  const taxAmount = (totalAmount - discountAmount) * taxPercent / 100;
  const finalAmount = parseFloat(bill.finalAmount);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
        to: "/lab-management"
      }), className: "px-4 py-2 bg-gray-600 hover:bg-gray-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { onClick: handlePrint, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700", children: [
          /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4 mr-2" }),
          "Print"
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => {
          const element = document.getElementById("bill-print-content");
          if (element) {
            const link = document.createElement("a");
            link.href = "data:text/html," + encodeURIComponent(element.innerHTML);
            link.download = `bill-${bill.invoiceNumber}.html`;
            link.click();
          }
        }, className: "px-4 py-2 bg-green-600 hover:bg-green-700", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Download"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "bill-print-content", className: "bg-white rounded-lg shadow-sm border border-gray-200 p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 border-b border-gray-300 pb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "GlobPathology" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Professional Laboratory Management System" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mt-4", children: "BILL / INVOICE" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-3", children: "BILL INFORMATION" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Invoice Number:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: bill.invoiceNumber })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Date:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: formatDate(bill.createdAt) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Time:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: formatTime(bill.createdAt) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Status:" }),
              /* @__PURE__ */ jsx("span", { className: `font-semibold px-2 py-1 rounded text-xs ${bill.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: bill.isPaid ? "PAID" : "UNPAID" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-3", children: "PATIENT INFORMATION" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Name:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: patient?.name || "-" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Phone:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: patient?.phoneNumber || "-" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Age/Gender:" }),
              /* @__PURE__ */ jsxs("p", { className: "font-medium text-gray-900", children: [
                patient?.age && `${patient.age} years`,
                patient?.age && patient?.gender ? " / " : "",
                patient?.gender
              ] })
            ] }),
            patient?.addressLine1 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Address:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: [patient.addressLine1, patient.city, patient.state, patient.pincode].filter(Boolean).join(", ") })
            ] })
          ] })
        ] })
      ] }),
      tests && tests.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-3", children: "TESTS PERFORMED" }),
        /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100", children: [
            /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left text-xs font-semibold text-gray-900 border border-gray-300", children: "Test Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-center text-xs font-semibold text-gray-900 border border-gray-300", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: tests.map((test, index) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-sm text-gray-900 border border-gray-300", children: test.test?.name || "Unknown Test" }),
            /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center text-sm border border-gray-300", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded ${test.patientTest.status.toLowerCase() === "completed" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`, children: test.patientTest.status.toUpperCase() }) })
          ] }, index)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-xs ml-auto mb-8", children: /* @__PURE__ */ jsx("table", { className: "w-full border-collapse", children: /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-sm text-gray-600", children: "Total Amount:" }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 text-sm font-medium text-gray-900 text-right", children: [
            "₹",
            totalAmount.toFixed(2)
          ] })
        ] }),
        discountPercent > 0 && /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 text-sm text-gray-600", children: [
            "Discount (",
            discountPercent,
            "%):"
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 text-sm font-medium text-gray-900 text-right", children: [
            "-₹",
            discountAmount.toFixed(2)
          ] })
        ] }),
        taxPercent > 0 && /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 text-sm text-gray-600", children: [
            "Tax (",
            taxPercent,
            "%):"
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 text-sm font-medium text-gray-900 text-right", children: [
            "₹",
            taxAmount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("tr", { className: "bg-blue-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-3 py-3 text-sm font-bold text-gray-900", children: "Final Amount:" }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 py-3 text-lg font-bold text-gray-900 text-right", children: [
            "₹",
            finalAmount.toFixed(2)
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-6 text-center text-xs text-gray-600", children: [
        /* @__PURE__ */ jsx("p", { children: "This is an electronically generated bill and does not require a signature." }),
        /* @__PURE__ */ jsx("p", { className: "mt-2", children: "Thank you for choosing GlobPathology. We appreciate your trust in our services." })
      ] })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin", "cashier", "lab_tech"], children: /* @__PURE__ */ jsx(BillDetailPage, {}) });
export {
  SplitComponent as component
};
