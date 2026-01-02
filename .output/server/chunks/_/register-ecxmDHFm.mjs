import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { J as Route$5, B as Button, a as CircleAlert, q as RefreshCw, K as searchPatientByPhone, L as createPatientWithTests, y as useToast, t as getAllPatients, h as getAllTests, X, M as createBill } from "./router-B48m2_K0.mjs";
import { L as Label } from "./label-BgPmW2HV.mjs";
import { L as Layout } from "./Layout-CrsrUD83.mjs";
import { S as Search } from "./search.mjs";
import { U as UserPlus } from "./user-plus.mjs";
import "@tanstack/react-router";
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
import "./user.mjs";
function BillModal({ isOpen, onClose, onBillCreated }) {
  const { showToast } = useToast();
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);
  const loadData = async () => {
    try {
      const [patientsRes, testsRes] = await Promise.all([
        getAllPatients({ data: { limit: 100, offset: 0 } }),
        getAllTests({ data: { limit: 100, offset: 0 } })
      ]);
      if (patientsRes.success) setPatients(patientsRes.data || []);
      if (testsRes.success) setTests(testsRes.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
      showToast("Failed to load patient and test data", "error");
    }
  };
  const onSubmit = async (data) => {
    if (selectedTests.length === 0) {
      showToast("Please select at least one test", "warning");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createBill({
        data: {
          patientId: data.patientId,
          testIds: selectedTests,
          discount: data.discount ? Number(data.discount) : 0,
          tax: data.tax ? Number(data.tax) : 0
        }
      });
      if (result.success) {
        showToast("Bill created successfully", "success");
        reset();
        setSelectedTests([]);
        onClose();
        onBillCreated?.();
      } else {
        showToast("Failed to create bill", "error");
      }
    } catch (error) {
      console.error("Error creating bill:", error);
      showToast(error instanceof Error ? error.message : "Failed to create bill", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;
  const calculateTotal = () => {
    return selectedTests.reduce((sum, testId) => {
      const test = tests.find((t) => t.id === testId);
      return sum + (test ? Number(test.price) : 0);
    }, 0);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Create New Bill" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "text-gray-600 hover:text-gray-900",
          children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "patient", children: "Patient *" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "patient",
            ...register("patientId", { required: "Patient is required" }),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select a patient" }),
              patients.map((patient) => /* @__PURE__ */ jsx("option", { value: patient.id, children: patient.name }, patient.id))
            ]
          }
        ),
        errors.patientId && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.patientId.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Select Tests *" }),
        /* @__PURE__ */ jsx("div", { className: "border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto bg-gray-50", children: tests.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "No tests available" }) : tests.map((test) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: selectedTests.includes(test.id),
              onChange: () => {
                setSelectedTests(
                  (prev) => prev.includes(test.id) ? prev.filter((id) => id !== test.id) : [...prev, test.id]
                );
              },
              className: "w-4 h-4 rounded border-gray-300"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: test.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-600 ml-2", children: [
              "₹",
              Number(test.price).toFixed(2)
            ] })
          ] })
        ] }, test.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "discount", children: "Discount %" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "discount",
              ...register("discount"),
              type: "number",
              min: "0",
              max: "100",
              step: "0.01",
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
              placeholder: "0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "tax", children: "Tax %" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "tax",
              ...register("tax"),
              type: "number",
              min: "0",
              max: "100",
              step: "0.01",
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
              placeholder: "0"
            }
          )
        ] })
      ] }),
      selectedTests.length > 0 && /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-blue-900", children: [
        "Total: ₹",
        calculateTotal().toFixed(2)
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50",
            children: isSubmitting ? "Creating..." : "Create Bill"
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
      alert("Please enter a valid phone number");
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
      alert("Failed to search patient");
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
      alert("Please select at least one test");
      return;
    }
    setTestFormData(data);
    setStep("payment");
  };
  const handlePaymentConfirmation = async () => {
    if (paymentStatus !== "paid") {
      alert("Please mark the payment as PAID to generate the bill and complete registration");
      return;
    }
    if (!testFormData) {
      alert("Test data is missing. Please go back and select tests again!");
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
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      alert(error instanceof Error ? error.message : "Failed to register patient");
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
