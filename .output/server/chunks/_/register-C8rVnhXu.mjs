import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { N as Route$5, L as Label, B as Button, a as CircleAlert, p as RefreshCw, t as toast, O as searchPatientByPhone, Q as createPatientWithTests, X } from "./router-BYOHKi2s.mjs";
import { L as Layout } from "./Layout-C_dtCkhk.mjs";
import { S as Search } from "./search.mjs";
import { U as UserPlus } from "./user-plus.mjs";
import "@tanstack/react-router";
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
import "./session-manager-CtAttBZO.mjs";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "./helpers-BpXhOhAI.mjs";
function BillModal({ isOpen, onClose, billData }) {
  const [isPrinting, setIsPrinting] = useState(false);
  if (!isOpen || !billData) return null;
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };
  const handleDownloadPDF = () => {
    toast.success("PDF download feature coming soon");
  };
  const calculateTotal = () => {
    return billData.tests.reduce((sum, item) => {
      return sum + (item.test ? parseFloat(item.test.price || 0) : 0);
    }, 0);
  };
  const total = calculateTotal();
  const discount = parseFloat(billData.bill?.discount || 0);
  const tax = parseFloat(billData.bill?.tax || 0);
  const discountAmount = total * discount / 100;
  const taxAmount = (total - discountAmount) * tax / 100;
  const finalAmount = total - discountAmount + taxAmount;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Invoice" }),
        /* @__PURE__ */ jsxs("p", { className: "text-blue-100 text-sm", children: [
          "Invoice #: ",
          billData.bill?.invoiceNumber
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "text-white hover:bg-blue-800 p-2 rounded-lg transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-600 mb-2", children: "LAB INFORMATION" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: "Your Laboratory" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Registration: LAB-12345" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Phone: +91 9876543210" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-600 mb-2", children: "PATIENT INFORMATION" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: billData.patient?.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
            "Phone: ",
            billData.patient?.phoneNumber
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
            "Age: ",
            billData.patient?.age || "N/A",
            " | Gender: ",
            billData.patient?.gender || "N/A"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-2 border-gray-300 rounded-lg overflow-hidden mb-8", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-100 border-b-2 border-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left font-semibold text-gray-900", children: "Test Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right font-semibold text-gray-900", children: "Price" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: billData.tests && billData.tests.length > 0 ? billData.tests.map((item, idx) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-3 text-gray-900", children: item.test?.name || "N/A" }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-3 text-right text-gray-900", children: [
            "₹",
            item.test?.price || "0.00"
          ] })
        ] }, idx)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 2, className: "px-6 py-4 text-center text-gray-500", children: "No tests selected" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-8", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xs border-2 border-gray-300 rounded-lg p-6 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-900", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Subtotal:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            total.toFixed(2)
          ] })
        ] }),
        discount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-red-600", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            "Discount (",
            discount,
            "%):"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "-₹",
            discountAmount.toFixed(2)
          ] })
        ] }),
        tax > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-green-600", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            "Tax (",
            tax,
            "%):"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "+₹",
            taxAmount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 pt-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-bold text-gray-900", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Amount:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            finalAmount.toFixed(2)
          ] })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: `p-4 rounded-lg mb-6 ${billData.bill?.isPaid ? "bg-green-50 border-2 border-green-300" : "bg-yellow-50 border-2 border-yellow-300"}`, children: /* @__PURE__ */ jsxs("p", { className: `font-semibold ${billData.bill?.isPaid ? "text-green-700" : "text-yellow-700"}`, children: [
        "Payment Status: ",
        billData.bill?.isPaid ? "✓ PAID" : "⏳ UNPAID"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-gray-500 border-t border-gray-300 pt-4 mb-6", children: [
        /* @__PURE__ */ jsx("p", { children: "Thank you for using our laboratory services!" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2", children: [
          "Generated on: ",
          (/* @__PURE__ */ new Date()).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-end print:hidden", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors",
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleDownloadPDF,
            className: "px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors",
            children: "��� Download PDF"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrint,
            disabled: isPrinting,
            className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50",
            children: isPrinting ? "Processing..." : "���️ Print"
          }
        )
      ] })
    ] })
  ] }) });
}
function PatientRegistration() {
  const loaderData = Route$5.useLoaderData();
  const [step, setStep] = useState("search");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [existingPatient, setExistingPatient] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [testSearchQuery, setTestSearchQuery] = useState("");
  const [showBillModal, setShowBillModal] = useState(false);
  const [billData, setBillData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [isProcessing, setIsProcessing] = useState(false);
  const [testFormData, setTestFormData] = useState(null);
  const allTests = loaderData?.tests?.data || [];
  const allDoctors = loaderData?.doctors?.data || [];
  const {
    register: registerPatient,
    handleSubmit: handleSubmitPatient,
    formState: {
      errors: errorsPatient,
      isSubmitting: isSubmittingPatient
    }
  } = useForm();
  const {
    register: registerTests,
    handleSubmit: handleSubmitTests,
    watch,
    formState: {
      isSubmitting: isSubmittingTests
    }
  } = useForm();
  const discount = watch("discount") || "0";
  const tax = watch("tax") || "0";
  const calculateTotals = () => {
    const testsTotal = selectedTests.reduce((sum, testId) => {
      const test = allTests.find((t) => t.id === testId);
      return sum + (test ? parseFloat(test.price) : 0);
    }, 0);
    const discountAmount = testsTotal * parseFloat(discount) / 100;
    const taxAmount = (testsTotal - discountAmount) * parseFloat(tax) / 100;
    const finalAmount = testsTotal - discountAmount + taxAmount;
    return {
      total: testsTotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      final: finalAmount.toFixed(2)
    };
  };
  const totals = calculateTotals();
  const onSearchPhone = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    try {
      const result = await searchPatientByPhone({
        data: {
          phoneNumber: parseInt(phoneNumber)
        }
      });
      if (result.exists && result.data) {
        setExistingPatient({
          ...result.data,
          phoneNumber: parseInt(phoneNumber)
        });
        setStep("tests");
      } else {
        setStep("register");
      }
    } catch (error) {
      console.error("Error searching patient:", error);
      toast.error("Failed to search patient");
    }
  };
  const onRegisterPatient = async (data) => {
    setExistingPatient({
      ...data,
      phoneNumber: parseInt(phoneNumber)
    });
    setStep("tests");
  };
  const onSubmitTests = async (data) => {
    if (selectedTests.length === 0) {
      toast.error("Please select at least one test");
      return;
    }
    setTestFormData(data);
    setStep("payment");
  };
  const handlePaymentConfirmation = async () => {
    if (paymentStatus !== "paid") {
      toast.error("Please mark the payment as PAID to generate the bill and complete registration");
      return;
    }
    if (!testFormData) {
      toast.error("Test data is missing. Please go back and select tests again!");
      return;
    }
    setIsProcessing(true);
    try {
      const doctorId = testFormData.doctorId && !isNaN(Number(testFormData.doctorId)) ? Number(testFormData.doctorId) : void 0;
      const isNewPatient = !existingPatient.id;
      const result = await createPatientWithTests({
        data: {
          isNewPatient,
          patientId: existingPatient.id ? existingPatient.id : void 0,
          patient: {
            name: existingPatient.name,
            age: existingPatient.age,
            gender: existingPatient.gender,
            phoneNumber: existingPatient.phoneNumber || parseInt(phoneNumber),
            addressLine1: existingPatient.addressLine1,
            city: existingPatient.city,
            state: existingPatient.state,
            country: existingPatient.country,
            pincode: existingPatient.pincode
          },
          tests: {
            testIds: selectedTests,
            doctorId,
            reportDeliveryDate: testFormData.reportDeliveryDate,
            discount: discount || "0",
            tax: tax || "0",
            totalAmount: totals.total,
            finalAmount: totals.final
          }
        }
      });
      if (result.success) {
        const fullTestDetails = selectedTests.map((testId) => {
          const test = allTests.find((t) => t.id === testId);
          const patientTest = result.data.tests.find((pt) => pt.testId === testId);
          const doctor = doctorId ? allDoctors.find((d) => d.id === doctorId) : null;
          return {
            patientTest,
            test,
            doctor
          };
        });
        const completeBillData = {
          bill: result.data.bill,
          patient: result.data.patient,
          tests: fullTestDetails
        };
        setBillData(completeBillData);
        setShowBillModal(true);
        toast.success("Patient registered successfully!");
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      toast.error(error instanceof Error ? error.message : "Failed to register patient");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleCloseBill = () => {
    setShowBillModal(false);
    window.location.href = "/lab-management";
  };
  const toggleTest = (testId) => {
    setSelectedTests((prev) => prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]);
  };
  const filteredTests = allTests.filter((test) => test.name.toLowerCase().includes(testSearchQuery.toLowerCase()));
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 mb-4 p-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Patient Registration" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
          step === "search" && "Search patient by phone number",
          step === "register" && "Enter patient information",
          step === "tests" && "Select tests and complete registration",
          step === "payment" && "Confirm payment and generate bill"
        ] })
      ] }),
      step === "search" && /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx(Search, { className: "w-16 h-16 text-gray-400" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 text-center mb-6", children: "Search Patient" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-2", children: "Phone Number *" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value), placeholder: "Enter phone number", className: "w-full px-4 py-3 border border-gray-300 text-sm rounded" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { onClick: onSearchPhone, className: "w-full px-4 py-3", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 mr-2" }),
            "Search Patient"
          ] })
        ] })
      ] }) }),
      step === "register" && /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx(UserPlus, { className: "w-6 h-6 text-gray-700" }),
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Basic Information" })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitPatient(onRegisterPatient), children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Full Name *" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...registerPatient("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters"
                }
              }), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "Enter full name" }),
              errorsPatient.name && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: errorsPatient.name.message })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Age" }),
              /* @__PURE__ */ jsx("input", { type: "number", ...registerPatient("age", {
                valueAsNumber: true
              }), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "Enter age" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Gender" }),
              /* @__PURE__ */ jsxs("select", { ...registerPatient("gender"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select gender" }),
                /* @__PURE__ */ jsx("option", { value: "Male", children: "Male" }),
                /* @__PURE__ */ jsx("option", { value: "Female", children: "Female" }),
                /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Phone Number *" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: phoneNumber, disabled: true, className: "w-full px-3 py-2 border border-gray-300 text-sm bg-gray-100 rounded" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Address" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...registerPatient("addressLine1"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "Enter address" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "City" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...registerPatient("city"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "Enter city" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "State" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...registerPatient("state"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "Enter state" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Country" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...registerPatient("country"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "Enter country" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Pincode" }),
              /* @__PURE__ */ jsx("input", { type: "number", ...registerPatient("pincode", {
                valueAsNumber: true
              }), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "Enter pincode" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-6", children: [
            /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setStep("search"), variant: "destructive", className: "flex-1 px-4 py-2", children: "Back" }),
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingPatient, className: "flex-1 px-4 py-2", children: isSubmittingPatient ? "Processing..." : "Next" })
          ] })
        ] })
      ] }),
      step === "tests" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white border border-gray-300 p-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: [
            "Select Tests (",
            selectedTests.length,
            " selected)"
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search tests...", value: testSearchQuery, onChange: (e) => setTestSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 text-sm mb-4 rounded" }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-300 max-h-96 overflow-y-auto rounded", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900 w-12", children: "Select" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900", children: "Test Name" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-right font-semibold text-gray-900", children: "Price (₹)" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: filteredTests.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 3, className: "px-3 py-8 text-center", children: [
              /* @__PURE__ */ jsx(CircleAlert, { className: "w-12 h-12 text-gray-400 mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "No tests found" })
            ] }) }) : filteredTests.map((test) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50 cursor-pointer", onClick: () => toggleTest(test.id), children: [
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center", children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selectedTests.includes(test.id), onChange: () => toggleTest(test.id), className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-gray-900", children: test.name }),
              /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 text-right text-gray-900", children: [
                "₹",
                test.price
              ] })
            ] }, test.id)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmitTests(onSubmitTests), children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 p-4 rounded", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Bill Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Referring Doctor" }),
              /* @__PURE__ */ jsxs("select", { ...registerTests("doctorId"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select doctor" }),
                allDoctors.map((doctor) => /* @__PURE__ */ jsx("option", { value: doctor.id, children: doctor.name }, doctor.id))
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Report Delivery Date" }),
              /* @__PURE__ */ jsx("input", { type: "date", ...registerTests("reportDeliveryDate"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Discount (%)" }),
                /* @__PURE__ */ jsx("input", { type: "number", step: "0.01", ...registerTests("discount"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "0" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Tax (%)" }),
                /* @__PURE__ */ jsx("input", { type: "number", step: "0.01", ...registerTests("tax"), className: "w-full px-3 py-2 border border-gray-300 text-sm rounded", placeholder: "0" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-3 space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Subtotal:" }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
                "₹",
                totals.total
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Discount:" }),
              /* @__PURE__ */ jsxs("span", { className: "text-red-600", children: [
                "-₹",
                totals.discountAmount
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Tax:" }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
                "+₹",
                totals.taxAmount
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-base font-semibold border-t border-gray-300 pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: "Total:" }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
                "₹",
                totals.final
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6", children: [
            /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setStep(existingPatient.id ? "search" : "register"), variant: "destructive", className: "flex-1 px-4 py-2 text-sm", children: "Back" }),
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingTests || selectedTests.length === 0, className: "flex-1 px-4 py-2 text-sm", children: isSubmittingTests ? "Processing..." : "Proceed to Payment" })
          ] })
        ] }) }) })
      ] }),
      step === "payment" && /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 p-8 rounded-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Payment Confirmation" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-300 p-6 rounded-lg mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Registration Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Patient Name:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: existingPatient?.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Phone Number:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: phoneNumber })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Selected Tests:" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: selectedTests.length })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-3 mt-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Subtotal:" }),
                /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
                  "₹",
                  totals.total
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Discount:" }),
                /* @__PURE__ */ jsxs("span", { className: "text-red-600", children: [
                  "-₹",
                  totals.discountAmount
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Tax:" }),
                /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
                  "+₹",
                  totals.taxAmount
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-bold border-t border-gray-300 pt-3 mt-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: "Total Amount:" }),
                /* @__PURE__ */ jsxs("span", { className: "text-blue-600", children: [
                  "₹",
                  totals.final
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx(Label, { className: "block text-base font-semibold text-gray-900 mb-3", children: "Payment Status *" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setPaymentStatus("paid"), className: `px-6 py-4 border-2 rounded-lg text-center transition-all ${paymentStatus === "paid" ? "border-green-600 bg-green-50" : "border-gray-300 bg-white hover:border-green-400"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-full border-2 mb-2 flex items-center justify-center ${paymentStatus === "paid" ? "border-green-600 bg-green-600" : "border-gray-300"}`, children: paymentStatus === "paid" && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
              /* @__PURE__ */ jsx("span", { className: `font-semibold ${paymentStatus === "paid" ? "text-green-700" : "text-gray-700"}`, children: "PAID" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 mt-1", children: "Payment received" })
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setPaymentStatus("unpaid"), className: `px-6 py-4 border-2 rounded-lg text-center transition-all ${paymentStatus === "unpaid" ? "border-red-600 bg-red-50" : "border-gray-300 bg-white hover:border-red-400"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-full border-2 mb-2 flex items-center justify-center ${paymentStatus === "unpaid" ? "border-red-600 bg-red-600" : "border-gray-300"}`, children: paymentStatus === "unpaid" && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
              /* @__PURE__ */ jsx("span", { className: `font-semibold ${paymentStatus === "unpaid" ? "text-red-700" : "text-gray-700"}`, children: "UNPAID" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 mt-1", children: "Payment pending" })
            ] }) })
          ] })
        ] }),
        paymentStatus === "unpaid" && /* @__PURE__ */ jsx("div", { className: "bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx(CircleAlert, { className: "w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-yellow-800", children: "Payment Required" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-yellow-700 mt-1", children: "Please mark the payment as PAID to generate the bill and complete the patient registration." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setStep("tests"), variant: "destructive", className: "flex-1 px-6 py-3", disabled: isProcessing, children: "Back to Tests" }),
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: handlePaymentConfirmation, disabled: paymentStatus !== "paid" || isProcessing, className: "flex-1 px-6 py-3 bg-green-600 hover:bg-green-700", children: isProcessing ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
            "Processing..."
          ] }) : "Generate Bill & Complete Registration" })
        ] }),
        paymentStatus !== "paid" && /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-gray-500 mt-4", children: "* Bill can only be generated after payment is marked as PAID" })
      ] }) })
    ] }),
    showBillModal && billData && /* @__PURE__ */ jsx(BillModal, { billData, onClose: handleCloseBill })
  ] });
}
export {
  PatientRegistration as component
};
