import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { L as Layout } from "./Layout-C_dtCkhk.mjs";
import { c as createLucideIcon, I as Route$6, a as CircleAlert, B as Button, L as Label, J as updateTestResult, K as createTestResult } from "./router-BYOHKi2s.mjs";
import { A as ArrowLeft } from "./arrow-left.mjs";
import { P as Printer } from "./printer.mjs";
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
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function getApplicableReferenceRange(ranges, demographics) {
  if (!ranges || ranges.length === 0) {
    return null;
  }
  const { age, gender } = demographics;
  const ageMatches = (range) => {
    if (!age) return true;
    if (range.ageGroup === "custom") {
      const minAge = range.minAge ?? 0;
      const maxAge = range.maxAge ?? 150;
      return age >= minAge && age <= maxAge;
    }
    switch (range.ageGroup) {
      case "child":
        return age >= 0 && age <= 12;
      case "teen":
        return age >= 13 && age <= 19;
      case "adult":
        return age >= 20 && age <= 64;
      case "senior":
        return age >= 65;
      default:
        return true;
    }
  };
  const genderMatches = (range) => {
    if (!gender || range.gender === "Any") return true;
    return range.gender === gender;
  };
  const exactMatch = ranges.find(
    (range) => ageMatches(range) && genderMatches(range)
  );
  if (exactMatch) return exactMatch;
  const ageOnlyMatch = ranges.find(
    (range) => ageMatches(range) && range.gender === "Any"
  );
  if (ageOnlyMatch) return ageOnlyMatch;
  if (age && age >= 20 && age <= 64) {
    const genderOnlyMatch = ranges.find(
      (range) => range.ageGroup === "adult" && genderMatches(range)
    );
    if (genderOnlyMatch) return genderOnlyMatch;
  }
  const defaultRange = ranges.find(
    (range) => range.ageGroup === "adult" && range.gender === "Any"
  );
  if (defaultRange) return defaultRange;
  return ranges[0];
}
function isAbnormal(value, referenceRange) {
  if (!value || !referenceRange) return false;
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  const minValue = parseFloat(referenceRange.minValue);
  const maxValue = parseFloat(referenceRange.maxValue);
  return numValue < minValue || numValue > maxValue;
}
function getResultStatus(value, referenceRange) {
  if (!value || !referenceRange) return null;
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return null;
  const minValue = parseFloat(referenceRange.minValue);
  const maxValue = parseFloat(referenceRange.maxValue);
  if (numValue < minValue) return "Low";
  if (numValue > maxValue) return "High";
  return "Normal";
}
function formatReferenceRange(referenceRange) {
  if (!referenceRange) return "-";
  return `${referenceRange.minValue} - ${referenceRange.maxValue}`;
}
const LAB_DATA = {
  name: "MEDICARE DIAGNOSTIC CENTER",
  tagline: "Accurate | Caring | Instant",
  address: "105-108, SMART VISION COMPLEX, HEALTHCARE ROAD, OPPOSITE HEALTHCARE COMPLEX, MUMBAI - 689578",
  phone: "0123456789",
  mobilePhone: "09123456789",
  email: "drlogy.pathlab@drlogy.com",
  website: "www.medicare.com",
  sampleCollection: {
    address: "125, Shivam Bungalow, S G Road, Mumbai"
  }
};
function TestResultEntry() {
  const testData = Route$6.useLoaderData();
  const navigate = useNavigate();
  const printRef = useRef(null);
  const [impression, setImpression] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [savedResults, setSavedResults] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      isDirty
    }
  } = useForm();
  useEffect(() => {
    if (testData.data?.existingResult) {
      const existingData = testData.data.existingResult.result;
      if (existingData?.results) {
        existingData.results.forEach((r) => {
          setValue(`result_${r.parameterId}`, r.value);
        });
      }
      if (existingData?.impression) {
        setImpression(existingData.impression);
      }
    }
  }, [testData, setValue]);
  if (!testData.success || !testData.data) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(CircleAlert, { className: "w-16 h-16 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700 mb-4", children: "Test data not found" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate({
        to: "/lab-management"
      }), children: "Back to Lab Management" })
    ] }) });
  }
  const {
    patientTest,
    test,
    patient,
    doctor,
    bill,
    parameters,
    existingResult
  } = testData.data;
  const patientDemographics = {
    age: patient.age,
    gender: patient.gender
  };
  const formatDate = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };
  const formatTime = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  };
  const allFormValues = watch();
  const hasAnyResults = Object.keys(allFormValues).some((key) => allFormValues[key]?.trim());
  const filledCount = parameters.filter((param) => allFormValues[`result_${param.id}`]?.trim()).length;
  const totalCount = parameters.length;
  const completionPercentage = totalCount > 0 ? Math.round(filledCount / totalCount * 100) : 0;
  const onSubmit = async (formData) => {
    if (!hasAnyResults) {
      setSaveError("Please enter at least one test result");
      return;
    }
    setIsSaving(true);
    setSaveError("");
    try {
      const results = parameters.map((param) => {
        const value = formData[`result_${param.id}`];
        if (!value?.trim()) return null;
        const referenceRange = getApplicableReferenceRange(param.referenceRanges || [], patientDemographics);
        const referenceRangeStr = formatReferenceRange(referenceRange);
        const abnormal = isAbnormal(value, referenceRange, param.referenceRanges || []);
        const status = getResultStatus(value, referenceRange);
        return {
          parameterId: param.id,
          parameterName: param.name,
          value,
          unit: param.unit || "",
          referenceRange: referenceRangeStr,
          isAbnormal: abnormal,
          status: status || void 0
        };
      }).filter(Boolean);
      const resultData = {
        patientTestId: patientTest.id,
        results,
        impression: impression.trim() || void 0
      };
      let result;
      if (existingResult) {
        result = await updateTestResult({
          data: {
            id: existingResult.id,
            ...resultData
          }
        });
      } else {
        result = await createTestResult({
          data: resultData
        });
      }
      if (result.success) {
        setSavedResults(results);
        setIsPreview(true);
      }
    } catch (error) {
      console.error("Error saving results:", error);
      setSaveError(error instanceof Error ? error.message : "Failed to save results");
    } finally {
      setIsSaving(false);
    }
  };
  const handlePrint = () => {
    window.print();
  };
  if (isPreview && savedResults) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("style", { children: `
          @media print {
            @page {
              size: A4;
              margin: 8mm;
            }
            body {
              margin: 0;
              padding: 0;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print {
              display: none !important;
            }
            nav,
            header,
            .no-print,
            button,
            [role="button"],
            [class*="nav"],
            [class*="header"],
            [class*="menu"],
            [class*="sidebar"] {
              display: none !important;
              visibility: hidden !important;
            }
          }
        ` }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 print:bg-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "fixed top-4 right-4 z-50 flex gap-2 no-print bg-white p-3 rounded-lg shadow-lg", children: [
          /* @__PURE__ */ jsxs(Button, { onClick: () => setIsPreview(false), className: "px-4 py-2 bg-gray-600 hover:bg-gray-700", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            "Back to Edit"
          ] }),
          /* @__PURE__ */ jsxs(Button, { onClick: handlePrint, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700", children: [
            /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4 mr-2" }),
            "Print Report"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-20 pb-8 print:pt-0 print:pb-0", children: /* @__PURE__ */ jsxs("div", { ref: printRef, className: "max-w-[210mm] mx-auto bg-white p-8 print:p-4 shadow-lg print:shadow-none", children: [
          /* @__PURE__ */ jsx("div", { className: "border-4 border-blue-600 mb-3", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-wide", children: LAB_DATA.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs mt-1 font-medium", children: LAB_DATA.tagline }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] mt-2 max-w-2xl leading-tight", children: LAB_DATA.address })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-blue-700 px-3 py-1.5 rounded font-bold text-xs", children: [
                "��� ",
                LAB_DATA.phone
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[9px] mt-2 border-t border-blue-400 pt-1.5", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "��� ",
                LAB_DATA.email
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "��� ",
                LAB_DATA.website
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 mb-3 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 p-2.5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold mb-1.5 text-sm text-gray-800", children: patient.name }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-0.5 text-[10px]", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                  "Age: ",
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                    patient.age || "N/A",
                    " Years"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                  "Sex: ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: patient.gender || "N/A" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                  "PID: ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: patient.id })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 p-2.5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold mb-1.5 text-[11px] text-gray-800", children: "Sample Collected At:" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-[9px] leading-tight mb-2", children: LAB_DATA.sampleCollection.address }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-[10px]", children: [
                "Ref. By: ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: doctor?.name || "N/A" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "border border-gray-300 p-2.5", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-[9px]", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Registered on:" }),
                " ",
                formatDate(patientTest.createdAt),
                " ",
                formatTime(patientTest.createdAt)
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Collected on:" }),
                " ",
                formatDate(patientTest.createdAt),
                " ",
                formatTime(patientTest.createdAt)
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Reported on:" }),
                " ",
                formatDate(/* @__PURE__ */ new Date()),
                " ",
                formatTime(/* @__PURE__ */ new Date())
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-100 border-t-2 border-b-2 border-gray-800 py-1.5 px-4 mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-center text-gray-900", children: test.name }) }),
          /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse mb-3 text-[10px]", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100", children: [
              /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-3 py-1.5 text-left font-bold text-gray-800", children: "Parameter" }),
              /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-3 py-1.5 text-center font-bold text-gray-800", children: "Result" }),
              /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-3 py-1.5 text-center font-bold text-gray-800", children: "Reference Value" }),
              /* @__PURE__ */ jsx("th", { className: "border border-gray-300 px-3 py-1.5 text-center font-bold text-gray-800", children: "Unit" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { children: [
              /* @__PURE__ */ jsx("tr", { className: "bg-blue-50 border-b-2 border-blue-400", children: /* @__PURE__ */ jsxs("td", { colSpan: 4, className: "border border-gray-300 px-3 py-1.5 text-[10px] font-bold text-blue-900", children: [
                test.name,
                " - Primary Sample Type: Serum"
              ] }) }),
              savedResults.map((result) => {
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-3 py-1.5 text-gray-800", children: result.parameterName }),
                  /* @__PURE__ */ jsxs("td", { className: `border border-gray-300 px-3 py-1.5 text-center font-semibold ${result.status === "High" ? "text-red-600" : result.status === "Low" ? "text-blue-600" : "text-gray-800"}`, children: [
                    result.value || "-",
                    result.status && result.status !== "Normal" && /* @__PURE__ */ jsxs("span", { className: "ml-1.5 text-[9px] font-bold", children: [
                      "(",
                      result.status,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-3 py-1.5 text-center text-gray-700", children: result.referenceRange || "-" }),
                  /* @__PURE__ */ jsx("td", { className: "border border-gray-300 px-3 py-1.5 text-center text-gray-700", children: result.unit || "-" })
                ] }, result.parameterId);
              })
            ] })
          ] }),
          impression && /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-bold text-gray-900 mb-2", children: "Clinical Impression / Notes:" }),
            /* @__PURE__ */ jsx("div", { className: "border border-gray-300 p-2.5 text-[10px] text-gray-700 whitespace-pre-wrap break-words", children: impression })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsx("div", {}),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("div", { className: "h-10 flex items-end justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-sm italic text-gray-600", children: "Dr. Vimal Shah" }) }) }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-[10px] text-gray-800", children: "Dr. Vimal Shah" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[8px]", children: "(MD, Pathologist)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("div", { className: "h-10 flex items-end justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-sm italic text-gray-600", children: "Dr. Vimal Shah" }) }) }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-[10px] text-gray-800", children: "Dr. Vimal Shah" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[8px]", children: "(MD, Pathologist)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 flex justify-between items-center text-[9px] mt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { children: "��� Sample Collection" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                "��� ",
                LAB_DATA.mobilePhone
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Generated on: ",
                formatDate(/* @__PURE__ */ new Date()),
                " ",
                formatTime(/* @__PURE__ */ new Date())
              ] }),
              /* @__PURE__ */ jsx("span", { className: "ml-4", children: "Page 1 of 1" })
            ] })
          ] })
        ] }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Test Result Entry" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
            "Patient: ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: patient.name }),
            " | Test: ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: test.name })
          ] }),
          patient.age && patient.gender && /* @__PURE__ */ jsxs("p", { className: "text-xs text-blue-600 mt-1", children: [
            "Reference ranges are automatically selected based on patient's age (",
            patient.age,
            " years) and gender (",
            patient.gender,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
          to: "/lab-management"
        }), className: "px-4 py-2", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to Lab"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Completion Progress" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-gray-900", children: [
            filledCount,
            " / ",
            totalCount,
            " (",
            completionPercentage,
            "%)"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all duration-300", style: {
          width: `${completionPercentage}%`
        } }) })
      ] }),
      saveError && /* @__PURE__ */ jsx("div", { className: "mb-4 bg-red-50 border border-red-200 rounded-lg p-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-red-800", children: saveError }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Test Parameters" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: parameters.map((param) => {
          const referenceRange = getApplicableReferenceRange(param.referenceRanges || [], patientDemographics);
          const referenceRangeStr = formatReferenceRange(referenceRange);
          return /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-base font-semibold text-gray-900", children: param.name }),
                param.unit && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [
                  "Unit: ",
                  param.unit
                ] })
              ] }),
              referenceRangeStr && /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 font-semibold", children: "Reference" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-600 font-bold", children: referenceRangeStr })
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "text", ...register(`result_${param.id}`), placeholder: "Enter result value", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" })
          ] }, param.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6", children: [
        /* @__PURE__ */ jsx(Label, { className: "block text-lg font-semibold text-gray-900 mb-3", children: "Clinical Impression / Notes" }),
        /* @__PURE__ */ jsx("textarea", { value: impression, onChange: (e) => setImpression(e.target.value), rows: 8, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", placeholder: "Enter clinical impression, observations, recommendations, or any relevant notes here..." }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Optional: Add any clinical observations or recommendations" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => navigate({
          to: "/lab-management"
        }), className: "flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700", children: "Cancel" }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: isSaving || !hasAnyResults, className: "flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: [
          /* @__PURE__ */ jsx(Save, { className: "w-5 h-5 mr-2" }),
          isSaving ? "Saving..." : existingResult ? "Update & Preview Report" : "Save & Preview Report"
        ] })
      ] }),
      !hasAnyResults && /* @__PURE__ */ jsx("div", { className: "mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-yellow-800", children: [
        /* @__PURE__ */ jsx(CircleAlert, { className: "w-4 h-4 inline mr-2" }),
        "Please enter at least one test result to save and generate the report."
      ] }) })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin", "lab_tech"], children: /* @__PURE__ */ jsx(TestResultEntry, {}) });
export {
  SplitComponent as component
};
