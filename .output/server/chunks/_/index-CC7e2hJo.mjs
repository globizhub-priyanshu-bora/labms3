import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { L as Layout } from "./Layout-CqOKSgmC.mjs";
import { i as Route$9, B as Button, a as CircleAlert, X, j as searchTestParameters, k as deleteTestParameter, m as createTestParameter, n as updateTestParameter, o as getAllTestParameters } from "./router-CekfRpIN.mjs";
import { L as Label } from "./label-BUX4JRaZ.mjs";
import { P as Plus } from "./plus.mjs";
import { S as Search } from "./search.mjs";
import { S as SquarePen, T as Trash2 } from "./trash-2.mjs";
import "@tanstack/react-router";
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
import "@radix-ui/react-label";
function TestParameterManagement() {
  const initialData = Route$9.useLoaderData();
  const [parameters, setParameters] = useState(initialData?.data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [referenceRanges, setReferenceRanges] = useState([]);
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: {
      errors: errorsAdd,
      isSubmitting: isSubmittingAdd
    }
  } = useForm();
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: {
      errors: errorsEdit,
      isSubmitting: isSubmittingEdit
    }
  } = useForm();
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch
  } = useForm();
  const loadParameters = async () => {
    try {
      const result = await getAllTestParameters({
        data: {
          limit: 100,
          offset: 0,
          sortBy: "name",
          sortOrder: "asc"
        }
      });
      if (result.success) {
        setParameters(result.data);
      }
    } catch (error) {
      console.error("Error loading parameters:", error);
    }
  };
  const addReferenceRange = () => {
    setReferenceRanges([...referenceRanges, {
      ageGroup: "adult",
      gender: "Any",
      minAge: void 0,
      maxAge: void 0,
      minValue: "",
      maxValue: ""
    }]);
  };
  const removeReferenceRange = (index) => {
    setReferenceRanges(referenceRanges.filter((_, i) => i !== index));
  };
  const updateReferenceRange = (index, field, value) => {
    const updated = [...referenceRanges];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setReferenceRanges(updated);
  };
  const onAddParameter = async (data) => {
    try {
      const result = await createTestParameter({
        data: {
          name: data.name,
          unit: data.unit || void 0,
          price: data.price || void 0,
          referenceRanges: referenceRanges.length > 0 ? referenceRanges : void 0
        }
      });
      if (result.success) {
        setIsAddModalOpen(false);
        resetAdd();
        setReferenceRanges([]);
        await loadParameters();
      }
    } catch (error) {
      console.error("Error adding parameter:", error);
      alert(error instanceof Error ? error.message : "Failed to add parameter");
    }
  };
  const onSearch = async (data) => {
    if (!data.query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    try {
      const result = await searchTestParameters({
        data: {
          query: data.query,
          limit: 50,
          offset: 0
        }
      });
      if (result.success) {
        setSearchResults(result.data);
        setIsSearching(true);
      }
    } catch (error) {
      console.error("Error searching parameters:", error);
    }
  };
  const openEditModal = (parameter) => {
    setSelectedParameter(parameter);
    resetEdit({
      name: parameter.name,
      unit: parameter.unit || "",
      price: parameter.price || ""
    });
    setReferenceRanges(parameter.referenceRanges || []);
    setIsEditModalOpen(true);
  };
  const onEditParameter = async (data) => {
    if (!selectedParameter) return;
    try {
      const result = await updateTestParameter({
        data: {
          id: selectedParameter.id,
          name: data.name,
          unit: data.unit || void 0,
          price: data.price || void 0,
          referenceRanges: referenceRanges.length > 0 ? referenceRanges : void 0
        }
      });
      if (result.success) {
        setIsEditModalOpen(false);
        setSelectedParameter(null);
        setReferenceRanges([]);
        await loadParameters();
        if (isSearching) {
          await onSearch({
            query: searchQuery
          });
        }
      }
    } catch (error) {
      console.error("Error updating parameter:", error);
      alert(error instanceof Error ? error.message : "Failed to update parameter");
    }
  };
  const onDeleteParameter = async (id) => {
    if (!confirm("Are you sure you want to delete this parameter?")) return;
    try {
      const result = await deleteTestParameter({
        data: {
          id
        }
      });
      if (result.success) {
        await loadParameters();
        if (isSearching) {
          await onSearch({
            query: searchQuery
          });
        }
      }
    } catch (error) {
      console.error("Error deleting parameter:", error);
      alert("Failed to delete parameter");
    }
  };
  const displayedParameters = isSearching ? searchResults : parameters;
  const getRangeDisplay = (ranges) => {
    if (!ranges || ranges.length === 0) return "Not set";
    return `${ranges.length} range(s)`;
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 mb-4 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Test Parameters Management" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
            displayedParameters.length,
            " parameter(s) ",
            isSearching && `for "${searchQuery}"`
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => setIsAddModalOpen(true), className: "px-4 py-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "Add Parameter"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Search Parameters" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitSearch(onSearch), children: [
            /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search...", ...registerSearch("query"), onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 text-sm mb-2" }),
            /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full px-3 py-2 bg-white border border-gray-400 text-gray-900 text-sm", children: [
              /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 inline mr-1" }),
              "Search"
            ] })
          ] }),
          isSearching && /* @__PURE__ */ jsx(Button, { onClick: () => {
            setIsSearching(false);
            setSearchResults([]);
            setSearchQuery("");
          }, className: "w-full mt-2 px-3 py-2 text-sm", children: "Clear Search" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300 bg-gray-50", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Parameter Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Unit" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Reference Ranges" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Price (₹)" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center font-semibold text-gray-900", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: displayedParameters.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-4 py-12 text-center", children: isSearching ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "w-12 h-12 text-gray-400 mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-base", children: "No parameters found" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm mt-1", children: [
              'No results for "',
              searchQuery,
              '"'
            ] }),
            /* @__PURE__ */ jsx(Button, { onClick: () => {
              setIsSearching(false);
              setSearchResults([]);
              setSearchQuery("");
            }, className: "mt-3 px-4 py-2 text-sm", children: "Clear Search" })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "w-12 h-12 text-gray-400 mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-base", children: "No parameters available" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1", children: 'Click "Add Parameter" to create one' })
          ] }) }) }) : displayedParameters.map((param) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-gray-900", children: param.name }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-700", children: param.unit || "-" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-700", children: /* @__PURE__ */ jsx("span", { className: "text-blue-600 font-medium", children: getRangeDisplay(param.referenceRanges) }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-900", children: param.price ? `₹${param.price}` : "-" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
              /* @__PURE__ */ jsx(Button, { onClick: () => openEditModal(param), className: "px-2 py-1", title: "Edit", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx(Button, { onClick: () => onDeleteParameter(param.id), variant: "destructive", className: "px-2 py-1", title: "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
            ] }) })
          ] }, param.id)) })
        ] }) }) }) })
      ] })
    ] }),
    (isAddModalOpen || isEditModalOpen) && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-400 max-w-4xl w-full my-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-gray-50", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: isAddModalOpen ? "Add Test Parameter" : "Edit Test Parameter" }),
        /* @__PURE__ */ jsx(Button, { onClick: () => {
          isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false);
          setReferenceRanges([]);
        }, className: "p-1", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: isAddModalOpen ? handleSubmitAdd(onAddParameter) : handleSubmitEdit(onEditParameter), className: "p-4 max-h-[80vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Parameter Name *" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...isAddModalOpen ? registerAdd("name", {
                required: "Name is required"
              }) : registerEdit("name", {
                required: "Name is required"
              }), className: "w-full px-3 py-2 border border-gray-300 text-sm" }),
              (isAddModalOpen ? errorsAdd.name : errorsEdit.name) && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: (isAddModalOpen ? errorsAdd.name : errorsEdit.name)?.message })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Unit" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...isAddModalOpen ? registerAdd("unit") : registerEdit("unit"), className: "w-full px-3 py-2 border border-gray-300 text-sm", placeholder: "mg/dL, mmol/L, etc." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Price (₹)" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...isAddModalOpen ? registerAdd("price") : registerEdit("price"), className: "w-full px-3 py-2 border border-gray-300 text-sm", placeholder: "150.00" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
              /* @__PURE__ */ jsx(Label, { className: "text-base font-semibold text-gray-900", children: "Reference Ranges (Age & Gender Specific)" }),
              /* @__PURE__ */ jsxs(Button, { type: "button", onClick: addReferenceRange, className: "px-3 py-1 text-sm", children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-1" }),
                "Add Range"
              ] })
            ] }),
            referenceRanges.length === 0 ? /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border border-gray-300 rounded p-4 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: 'No reference ranges added. Click "Add Range" to set age and gender-specific ranges.' }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: referenceRanges.map((range, index) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 rounded p-3 bg-gray-50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-gray-900", children: [
                  "Range #",
                  index + 1
                ] }),
                /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => removeReferenceRange(index), variant: "destructive", className: "px-2 py-1 text-xs", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-700 mb-1", children: "Age Group *" }),
                  /* @__PURE__ */ jsxs("select", { value: range.ageGroup, onChange: (e) => updateReferenceRange(index, "ageGroup", e.target.value), className: "w-full px-2 py-2 border border-gray-300 text-sm rounded", children: [
                    /* @__PURE__ */ jsx("option", { value: "child", children: "Child (0-12)" }),
                    /* @__PURE__ */ jsx("option", { value: "teen", children: "Teen (13-19)" }),
                    /* @__PURE__ */ jsx("option", { value: "adult", children: "Adult (20-64)" }),
                    /* @__PURE__ */ jsx("option", { value: "senior", children: "Senior (65+)" }),
                    /* @__PURE__ */ jsx("option", { value: "custom", children: "Custom Age Range" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-700 mb-1", children: "Gender *" }),
                  /* @__PURE__ */ jsxs("select", { value: range.gender, onChange: (e) => updateReferenceRange(index, "gender", e.target.value), className: "w-full px-2 py-2 border border-gray-300 text-sm rounded", children: [
                    /* @__PURE__ */ jsx("option", { value: "Any", children: "Any" }),
                    /* @__PURE__ */ jsx("option", { value: "Male", children: "Male" }),
                    /* @__PURE__ */ jsx("option", { value: "Female", children: "Female" })
                  ] })
                ] }),
                range.ageGroup === "custom" && /* @__PURE__ */ jsxs("div", { className: "col-span-3 grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-700 mb-1", children: "Min Age" }),
                    /* @__PURE__ */ jsx("input", { type: "number", value: range.minAge || "", onChange: (e) => updateReferenceRange(index, "minAge", e.target.value ? Number(e.target.value) : void 0), className: "w-full px-2 py-2 border border-gray-300 text-sm rounded", placeholder: "0" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-700 mb-1", children: "Max Age" }),
                    /* @__PURE__ */ jsx("input", { type: "number", value: range.maxAge || "", onChange: (e) => updateReferenceRange(index, "maxAge", e.target.value ? Number(e.target.value) : void 0), className: "w-full px-2 py-2 border border-gray-300 text-sm rounded", placeholder: "120" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 mt-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-700 mb-1", children: "Min Value *" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: range.minValue, onChange: (e) => updateReferenceRange(index, "minValue", e.target.value), className: "w-full px-2 py-2 border border-gray-300 text-sm rounded", placeholder: "e.g., 70", required: true })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-700 mb-1", children: "Max Value *" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: range.maxValue, onChange: (e) => updateReferenceRange(index, "maxValue", e.target.value), className: "w-full px-2 py-2 border border-gray-300 text-sm rounded", placeholder: "e.g., 100", required: true })
                ] })
              ] })
            ] }, index)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", onClick: () => {
            isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false);
            setReferenceRanges([]);
          }, className: "flex-1 px-3 py-2 text-sm", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isAddModalOpen ? isSubmittingAdd : isSubmittingEdit, className: "flex-1 px-3 py-2 text-sm", children: (isAddModalOpen ? isSubmittingAdd : isSubmittingEdit) ? "Saving..." : isAddModalOpen ? "Add Parameter" : "Update Parameter" })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  TestParameterManagement as component
};
