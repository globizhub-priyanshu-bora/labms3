import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { L as Layout } from "./Layout-C_dtCkhk.mjs";
import { a0 as Route$1, a as CircleAlert, B as Button, t as toast } from "./router-BYOHKi2s.mjs";
import { A as ArrowLeft } from "./arrow-left.mjs";
import { P as Printer } from "./printer.mjs";
import { D as Download } from "./download.mjs";
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
function BillDetailPage() {
  const loaderData = Route$1.useLoaderData();
  const navigate = useNavigate();
  if (!loaderData.success || !loaderData.data) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(CircleAlert, { className: "w-16 h-16 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700 mb-4", children: "Bill not found" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-6", children: loaderData.error || "Unable to load the requested bill" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate({
        to: "/lab-management"
      }), children: "Back to Lab Management" })
    ] }) });
  }
  const {
    bill,
    patient,
    tests
  } = loaderData.data;
  const labInfo = loaderData.lab;
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
  const handleDownloadPDF = async () => {
    try {
      const billDataForPDF = {
        labName: labInfo?.name || "Laboratory",
        labRegistration: labInfo?.registrationNumber || "",
        labAddress: labInfo?.address || "",
        labPhone: labInfo?.contactPhone || "",
        patientName: patient?.name || "N/A",
        patientAge: patient?.age || void 0,
        patientPhone: patient?.phone || void 0,
        invoiceNumber: bill.invoiceNumber,
        totalAmount: bill.totalAmount?.toString() || "0",
        discount: bill.discount?.toString() || "0",
        tax: bill.tax?.toString() || "0",
        finalAmount: bill.finalAmount?.toString() || "0",
        isPaid: bill.isPaid || false,
        createdAt: bill.createdAt?.toString() || (/* @__PURE__ */ new Date()).toISOString(),
        tests: tests?.map((test) => ({
          name: test.testName || test.name || "Test",
          price: test.price?.toString() || "0"
        })) || []
      };
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Bill - ${billDataForPDF.invoiceNumber}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .bill-container {
                max-width: 800px;
                margin: 0 auto;
                background-color: white;
                padding: 40px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
              }
              .header {
                border-bottom: 3px solid #333;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .lab-name {
                font-size: 28px;
                font-weight: bold;
                color: #333;
                margin: 0;
              }
              .lab-details {
                font-size: 12px;
                color: #666;
                margin-top: 5px;
              }
              .section {
                margin-bottom: 20px;
              }
              .section-title {
                font-weight: bold;
                font-size: 14px;
                color: #333;
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                margin-bottom: 8px;
              }
              .label {
                font-weight: 600;
                color: #555;
                width: 150px;
              }
              .value {
                color: #333;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th {
                background-color: #f0f0f0;
                padding: 10px;
                text-align: left;
                font-weight: bold;
                border-bottom: 2px solid #333;
                font-size: 12px;
              }
              td {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                font-size: 12px;
              }
              .totals {
                width: 100%;
                margin-top: 20px;
                border-top: 2px solid #333;
                padding-top: 15px;
              }
              .total-row {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 10px;
                font-size: 13px;
              }
              .total-label {
                width: 150px;
                font-weight: 600;
              }
              .total-value {
                width: 100px;
                text-align: right;
              }
              .final-amount {
                font-size: 18px;
                font-weight: bold;
                color: #2c5282;
                background-color: #f0f7ff;
                padding: 10px;
                border-radius: 5px;
              }
              .payment-status {
                margin-top: 20px;
                padding: 10px;
                border-radius: 5px;
                font-weight: bold;
              }
              .paid {
                background-color: #d4edda;
                color: #155724;
              }
              .unpaid {
                background-color: #f8d7da;
                color: #721c24;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                text-align: center;
                font-size: 11px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="bill-container">
              <div class="header">
                <p class="lab-name">${billDataForPDF.labName}</p>
                <div class="lab-details">
                  <div>Registration: ${billDataForPDF.labRegistration || "N/A"}</div>
                  ${billDataForPDF.labAddress ? `<div>Address: ${billDataForPDF.labAddress}</div>` : ""}
                  ${billDataForPDF.labPhone ? `<div>Phone: ${billDataForPDF.labPhone}</div>` : ""}
                </div>
              </div>

              <div class="section">
                <div class="section-title">Bill Information</div>
                <div class="info-row">
                  <span class="label">Invoice Number:</span>
                  <span class="value">${billDataForPDF.invoiceNumber}</span>
                </div>
                <div class="info-row">
                  <span class="label">Date:</span>
                  <span class="value">${new Date(billDataForPDF.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Patient Information</div>
                <div class="info-row">
                  <span class="label">Patient Name:</span>
                  <span class="value">${billDataForPDF.patientName}</span>
                </div>
                ${billDataForPDF.patientAge ? `
                <div class="info-row">
                  <span class="label">Age:</span>
                  <span class="value">${billDataForPDF.patientAge}</span>
                </div>
                ` : ""}
                ${billDataForPDF.patientPhone ? `
                <div class="info-row">
                  <span class="label">Phone:</span>
                  <span class="value">${billDataForPDF.patientPhone}</span>
                </div>
                ` : ""}
              </div>

              ${billDataForPDF.tests && billDataForPDF.tests.length > 0 ? `
              <div class="section">
                <div class="section-title">Tests</div>
                <table>
                  <thead>
                    <tr>
                      <th>Test Name</th>
                      <th style="text-align: right;">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${billDataForPDF.tests.map((test) => `
                      <tr>
                        <td>${test.name}</td>
                        <td style="text-align: right;">₹${parseFloat(test.price).toFixed(2)}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
              ` : ""}

              <div class="totals">
                <div class="total-row">
                  <span class="total-label">Subtotal:</span>
                  <span class="total-value">₹${parseFloat(billDataForPDF.totalAmount).toFixed(2)}</span>
                </div>
                ${billDataForPDF.discount ? `
                <div class="total-row">
                  <span class="total-label">Discount:</span>
                  <span class="total-value">-₹${parseFloat(billDataForPDF.discount).toFixed(2)}</span>
                </div>
                ` : ""}
                ${billDataForPDF.tax ? `
                <div class="total-row">
                  <span class="total-label">Tax:</span>
                  <span class="total-value">+₹${parseFloat(billDataForPDF.tax).toFixed(2)}</span>
                </div>
                ` : ""}
                <div class="total-row final-amount">
                  <span class="total-label">Total Amount:</span>
                  <span class="total-value">₹${parseFloat(billDataForPDF.finalAmount).toFixed(2)}</span>
                </div>
              </div>

              <div class="payment-status ${billDataForPDF.isPaid ? "paid" : "unpaid"}">
                Payment Status: ${billDataForPDF.isPaid ? "PAID" : "UNPAID"}
              </div>

              <div class="footer">
                <p>This is a computer-generated bill. No signature required.</p>
                <p>Generated on ${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `;
      const newWindow = window.open("", "", "width=800,height=600");
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        setTimeout(() => {
          newWindow.print();
          toast.success('PDF download started. Use "Save as PDF" in the print dialog.');
        }, 100);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download PDF");
    }
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
      second: "2-digit"
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
          to: "/lab-management"
        }), variant: "outline", className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Back" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Bill Details" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
        /* @__PURE__ */ jsxs(Button, { onClick: handlePrint, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700", children: [
          /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4 mr-2" }),
          "Print"
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: handleDownloadPDF, className: "px-4 py-2 bg-green-600 hover:bg-green-700", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Download PDF"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "bill-print-content", className: "bg-white rounded-lg shadow-sm border border-gray-200 p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 border-b border-gray-300 pb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: labInfo?.name || "Laboratory" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: labInfo?.address || "Laboratory Address" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          "Registration: ",
          labInfo?.registrationNumber || "N/A"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          "Phone: ",
          labInfo?.contactPhone || "N/A"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mt-4", children: "BILL / INVOICE" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Bill Information" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Invoice Number:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 ml-2", children: bill.invoiceNumber })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Date:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 ml-2", children: formatDate(bill.createdAt) })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Time:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 ml-2", children: formatTime(bill.createdAt) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Patient Information" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Name:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 ml-2", children: patient?.name || "-" })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Age:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 ml-2", children: patient?.age || "-" })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Phone:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 ml-2", children: patient?.phone || "-" })
            ] })
          ] })
        ] })
      ] }),
      tests && tests.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Tests" }),
        /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse border border-gray-300", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100", children: [
            /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-4 py-2 text-left font-semibold", children: "Test Name" }),
            /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-4 py-2 text-right font-semibold", children: "Price" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: tests.map((test, index) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-4 py-2", children: test.testName || test.name }),
            /* @__PURE__ */ jsxs("td", { className: "border border-gray-300 px-4 py-2 text-right", children: [
              "₹",
              parseFloat(test.price || 0).toFixed(2)
            ] })
          ] }, index)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t-2 border-gray-300 pt-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 w-40", children: "Subtotal:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 w-24 text-right", children: [
            "₹",
            parseFloat(bill.totalAmount || 0).toFixed(2)
          ] })
        ] }),
        bill.discount && bill.discount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-end mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 w-40", children: "Discount:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 w-24 text-right", children: [
            "-₹",
            parseFloat(bill.discount).toFixed(2)
          ] })
        ] }),
        bill.tax && bill.tax > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-end mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 w-40", children: "Tax:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 w-24 text-right", children: [
            "+₹",
            parseFloat(bill.tax).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end border-t border-gray-300 pt-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 w-40", children: "Total Amount:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-blue-600 w-24 text-right", children: [
            "₹",
            parseFloat(bill.finalAmount || 0).toFixed(2)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-lg font-semibold text-center mb-6 ${bill.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: [
        "Payment Status: ",
        bill.isPaid ? "PAID" : "UNPAID"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-4 text-center text-xs text-gray-600", children: [
        /* @__PURE__ */ jsx("p", { children: "This is a computer-generated bill. No signature required." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Generated on ",
          (/* @__PURE__ */ new Date()).toLocaleString()
        ] })
      ] })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin", "cashier", "lab_tech"], children: /* @__PURE__ */ jsx(BillDetailPage, {}) });
export {
  SplitComponent as component
};
