import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { L as Layout } from "./Layout-CjqameQ5.mjs";
import { a1 as Route, a as CircleAlert, B as Button } from "./router-DU3091Rk.mjs";
import { A as ArrowLeft } from "./arrow-left.mjs";
import { P as Printer } from "./printer.mjs";
import { D as Download } from "./download.mjs";
import "react";
import "./user.mjs";
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
import "./session-manager-Dkxs0Vej.mjs";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "./helpers-zc_3GKPr.mjs";
function numberToWords(num) {
  if (num === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  function convertHundreds(n) {
    if (n === 0) return "";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + convertHundreds(n % 100) : "");
  }
  if (num < 1e3) return convertHundreds(num);
  if (num < 1e5) {
    const thousands = Math.floor(num / 1e3);
    const remainder = num % 1e3;
    return convertHundreds(thousands) + " Thousand" + (remainder !== 0 ? " " + convertHundreds(remainder) : "");
  }
  if (num < 1e7) {
    const lakhs = Math.floor(num / 1e5);
    const remainder = num % 1e5;
    return convertHundreds(lakhs) + " Lakh" + (remainder !== 0 ? " " + numberToWords(remainder) : "");
  }
  return "Number too large";
}
function BillDetailPage() {
  const billData = Route.useLoaderData();
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
    lab,
    patient,
    tests
  } = billData.data;
  const formatDateTime = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return `${d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })} ${d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })}`;
  };
  const totalAmount = parseFloat(bill.totalAmount);
  const discountAmount = totalAmount * parseFloat(bill.discount || "0") / 100;
  const taxAmount = (totalAmount - discountAmount) * parseFloat(bill.tax || "0") / 100;
  const finalAmount = parseFloat(bill.finalAmount);
  const amountInWords = numberToWords(Math.floor(finalAmount)) + " Rupees";
  const handlePrint = () => {
    const printContent = document.getElementById("bill-print-content");
    if (!printContent) return;
    const printWindow = window.open("", "", "width=1000,height=800");
    if (!printWindow) return;
    const cssStyles = `
      <style>
        @page {
          size: A4;
          margin: 10mm;
        }
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        body { 
          font-family: Arial, sans-serif; 
          background: white;
        }
        .bill-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
        }
        .border-2 { border: 2px solid #000; }
        .border { border: 1px solid #000; }
        .border-b-2 { border-bottom: 2px solid #000; }
        .border-b { border-bottom: 1px solid #000; }
        .border-r { border-right: 1px solid #000; }
        .border-t-2 { border-top: 2px solid #000; }
        .border-t { border-top: 1px solid #000; }
        .p-6 { padding: 16px; }
        .p-4 { padding: 12px; }
        .p-3 { padding: 8px; }
        .py-3 { padding-top: 8px; padding-bottom: 8px; }
        .py-2 { padding-top: 6px; padding-bottom: 6px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .px-4 { padding-left: 12px; padding-right: 12px; }
        .px-3 { padding-left: 8px; padding-right: 8px; }
        .px-2 { padding-left: 6px; padding-right: 6px; }
        .px-8 { padding-left: 24px; padding-right: 24px; }
        .mt-4 { margin-top: 12px; }
        .mt-3 { margin-top: 8px; }
        .mt-2 { margin-top: 6px; }
        .mt-1 { margin-top: 4px; }
        .mb-3 { margin-bottom: 8px; }
        .mb-2 { margin-bottom: 6px; }
        .mb-1 { margin-bottom: 4px; }
        .text-3xl { font-size: 24px; line-height: 1.2; }
        .text-xl { font-size: 16px; line-height: 1.4; }
        .text-lg { font-size: 14px; }
        .text-base { font-size: 13px; }
        .text-sm { font-size: 11px; }
        .text-xs { font-size: 10px; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-left { text-align: left; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .justify-end { justify-content: flex-end; }
        .items-start { align-items: flex-start; }
        .items-center { align-items: center; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .col-span-2 { grid-column: span 2; }
        .gap-2 { gap: 6px; }
        .gap-1 { gap: 4px; }
        .space-y-2 > * + * { margin-top: 6px; }
        .space-y-3 > * + * { margin-top: 8px; }
        .space-y-1 > * + * { margin-top: 4px; }
        .bg-red-600 { background-color: #dc2626; color: white; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .text-red-600 { color: #dc2626; }
        .text-gray-900 { color: #111827; }
        .text-gray-700 { color: #374151; }
        .text-gray-600 { color: #4b5563; }
        .w-full { width: 100%; }
        .w-64 { width: 280px; }
        table { 
          border-collapse: collapse; 
          width: 100%; 
        }
        th, td {
          padding: 0;
        }
        @media print {
          body { 
            padding: 0; 
          }
        }
      </style>
    `;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill - ${bill.invoiceNumber}</title>
          ${cssStyles}
        </head>
        <body>
          <div class="bill-container">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
        to: "/lab-management"
      }), className: "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { onClick: handlePrint, className: "px-4 py-2 bg-black hover:bg-gray-800 text-white", children: [
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
        }, className: "px-4 py-2 bg-black hover:bg-gray-800 text-white", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Download"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "bill-print-content", className: "bg-white border-2 border-gray-900", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-gray-900 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 uppercase", children: lab?.name || "LAB NAME" }),
            lab?.addressLine1 && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700 mt-1", children: lab.addressLine1 }),
            (lab?.city || lab?.state) && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700", children: [lab?.city, lab?.state].filter(Boolean).join(", ") }),
            lab?.country && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700", children: lab.country }),
            lab?.phoneNumber && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-700 mt-1", children: [
              "Tel: ",
              lab.phoneNumber
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-right", children: lab?.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700", children: lab.email }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex justify-between text-xs text-gray-600", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            lab?.gstinNumber && /* @__PURE__ */ jsx("div", { children: lab.gstinNumber }),
            lab?.registrationNumber && /* @__PURE__ */ jsx("div", { children: lab.registrationNumber })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center py-2 border-b border-gray-900", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900", children: "LABORATORY BILL" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 border-b border-gray-900", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-r border-gray-900 p-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xs text-gray-900 mb-2", children: "PATIENT DETAILS" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Name:" }),
              /* @__PURE__ */ jsx("span", { className: "col-span-2 font-medium text-gray-900", children: patient?.name || "-" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Age/Gender:" }),
              /* @__PURE__ */ jsxs("span", { className: "col-span-2 font-medium text-gray-900", children: [
                patient?.age || "-",
                " / ",
                patient?.gender || "-"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Phone:" }),
              /* @__PURE__ */ jsx("span", { className: "col-span-2 font-medium text-gray-900", children: patient?.phoneNumber || "-" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Address:" }),
              /* @__PURE__ */ jsx("span", { className: "col-span-2 font-medium text-gray-900", children: [patient?.addressLine1, patient?.city, patient?.state, patient?.pincode].filter(Boolean).join(", ") || "-" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xs text-gray-900 mb-2", children: "BILL DETAILS" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Patient ID:" }),
              /* @__PURE__ */ jsx("span", { className: "col-span-2 font-medium text-gray-900", children: patient?.id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Bill No:" }),
              /* @__PURE__ */ jsx("span", { className: "col-span-2 font-medium text-gray-900", children: bill.invoiceNumber })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Bill Date:" }),
              /* @__PURE__ */ jsx("span", { className: "col-span-2 font-medium text-gray-900", children: formatDateTime(bill.createdAt) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-xs text-gray-900 mb-2", children: "DETAILS" }),
        /* @__PURE__ */ jsxs("table", { className: "w-full text-xs border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-gray-900", children: [
            /* @__PURE__ */ jsx("th", { className: "text-left py-1 px-2 text-gray-900 font-bold", children: "Service Name" }),
            /* @__PURE__ */ jsx("th", { className: "text-right py-1 px-2 text-gray-900 font-bold", children: "Amount (₹)" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: tests && tests.length > 0 ? tests.map((testItem, idx) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
            /* @__PURE__ */ jsx("td", { className: "py-1 px-2 text-gray-900", children: testItem.test?.name || "-" }),
            /* @__PURE__ */ jsxs("td", { className: "text-right py-1 px-2 text-gray-900", children: [
              "₹",
              (totalAmount / tests.length).toFixed(2)
            ] })
          ] }, idx)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 2, className: "py-3 px-2 text-center text-gray-600", children: "No tests found" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t-2 border-gray-900 mt-2", children: /* @__PURE__ */ jsx("div", { className: "flex justify-end p-3", children: /* @__PURE__ */ jsx("div", { className: "w-64", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: "Subtotal:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 font-medium", children: [
            "₹",
            totalAmount.toFixed(2)
          ] })
        ] }),
        discountAmount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
            "Discount (",
            bill.discount,
            "%):"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-red-600 font-medium", children: [
            "-₹",
            discountAmount.toFixed(2)
          ] })
        ] }),
        taxAmount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
            "Tax (",
            bill.tax,
            "%):"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 font-medium", children: [
            "+₹",
            taxAmount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-1 border-t-2 border-gray-900", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-bold text-sm", children: "Bill Amount:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 font-bold text-sm", children: [
            "₹",
            finalAmount.toFixed(2)
          ] })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-900 p-3 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "In Words: " }),
        /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-900", children: [
          amountInWords,
          " Only"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-900 p-3", children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-600 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "This is a computer generated statement and requires no signature." }),
        /* @__PURE__ */ jsx("p", { children: "For billing and general enquiries, please contact us." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t-2 border-gray-900 bg-gray-100 p-2 text-center text-xs text-gray-600", children: [
        "© ",
        lab?.name || "Lab Name",
        " ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". All Rights Reserved"
      ] })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin", "cashier", "lab_tech"], children: /* @__PURE__ */ jsx(BillDetailPage, {}) });
export {
  SplitComponent as component
};
