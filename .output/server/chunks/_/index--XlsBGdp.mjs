import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { L as Layout } from "./Layout-CrsrUD83.mjs";
import { R as Route$a, B as Button, a as CircleAlert, X, b as calculateTestPrice, d as searchTests, e as deleteTest, f as createTest, u as updateTest, h as getAllTests } from "./router-B48m2_K0.mjs";
import { L as Label } from "./label-BgPmW2HV.mjs";
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
function TestManagement() {
  const initialData = Route$a.useLoaderData();
  const [tests, setTests] = useState(initialData?.tests?.data || []);
  const [allParameters, setAllParameters] = useState(initialData?.parameters?.data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedParameterIds, setSelectedParameterIds] = useState([]);
  const [calculatedPrice, setCalculatedPrice] = useState("0.00");
  const [paramSearchQuery, setParamSearchQuery] = useState("");
  const [filteredParameters, setFilteredParameters] = useState([]);
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    setValue: setValueAdd,
    formState: {
      errors: errorsAdd,
      isSubmitting: isSubmittingAdd
    }
  } = useForm();
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setValueEdit,
    formState: {
      errors: errorsEdit,
      isSubmitting: isSubmittingEdit
    }
  } = useForm();
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch
  } = useForm();
  useEffect(() => {
    if (paramSearchQuery) {
      const filtered = allParameters.filter((param) => param.name.toLowerCase().includes(paramSearchQuery.toLowerCase()));
      setFilteredParameters(filtered);
    } else {
      setFilteredParameters(allParameters);
    }
  }, [paramSearchQuery, allParameters]);
  useEffect(() => {
    const calculatePrice = async () => {
      if (selectedParameterIds.length === 0) {
        setCalculatedPrice("0.00");
        return;
      }
      try {
        const result = await calculateTestPrice({
          data: {
            parameterIds: selectedParameterIds
          }
        });
        if (result.success) {
          setCalculatedPrice(result.totalPrice);
          setValueAdd("price", result.totalPrice);
        }
      } catch (error) {
        console.error("Error calculating price:", error);
      }
    };
    calculatePrice();
  }, [selectedParameterIds, setValueAdd]);
  const loadTests = async () => {
    try {
      const result = await getAllTests({
        data: {
          limit: 100,
          offset: 0,
          sortBy: "name",
          sortOrder: "asc"
        }
      });
      if (result.success) {
        setTests(result.data);
      }
    } catch (error) {
      console.error("Error loading tests:", error);
    }
  };
  const toggleParameter = (id) => {
    setSelectedParameterIds((prev) => prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]);
  };
  const onAddTest = async (data) => {
    try {
      const result = await createTest({
        data: {
          name: data.name,
          price: data.price,
          parameterIds: selectedParameterIds
        }
      });
      if (result.success) {
        setIsAddModalOpen(false);
        resetAdd();
        setSelectedParameterIds([]);
        setCalculatedPrice("0.00");
        await loadTests();
      }
    } catch (error) {
      console.error("Error adding test:", error);
      alert(error instanceof Error ? error.message : "Failed to add test");
    }
  };
  const onSearch = async (data) => {
    if (!data.query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    try {
      const result = await searchTests({
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
      console.error("Error searching tests:", error);
    }
  };
  const openEditModal = async (test) => {
    setSelectedTest(test);
    const paramIds = test.metadata?.parameterIds || [];
    setSelectedParameterIds(paramIds);
    resetEdit({
      name: test.name,
      price: test.price
    });
    if (paramIds.length > 0) {
      try {
        const result = await calculateTestPrice({
          data: {
            parameterIds: paramIds
          }
        });
        if (result.success) {
          setCalculatedPrice(result.totalPrice);
        }
      } catch (error) {
        console.error("Error calculating price:", error);
      }
    }
    setIsEditModalOpen(true);
  };
  const onEditTest = async (data) => {
    if (!selectedTest) return;
    try {
      const result = await updateTest({
        data: {
          id: selectedTest.id,
          name: data.name,
          price: data.price,
          parameterIds: selectedParameterIds
        }
      });
      if (result.success) {
        setIsEditModalOpen(false);
        setSelectedTest(null);
        setSelectedParameterIds([]);
        setCalculatedPrice("0.00");
        await loadTests();
        if (isSearching) {
          await onSearch({
            query: searchQuery
          });
        }
      }
    } catch (error) {
      console.error("Error updating test:", error);
      alert(error instanceof Error ? error.message : "Failed to update test");
    }
  };
  const onDeleteTest = async (id) => {
    if (!confirm("Are you sure you want to delete this test?")) return;
    try {
      const result = await deleteTest({
        data: {
          id
        }
      });
      if (result.success) {
        await loadTests();
        if (isSearching) {
          await onSearch({
            query: searchQuery
          });
        }
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      alert("Failed to delete test");
    }
  };
  const displayedTests = isSearching ? searchResults : tests;
  const getTestParameters = (test) => {
    const paramIds = test.metadata?.parameterIds || [];
    return allParameters.filter((p) => paramIds.includes(p.id));
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 mb-4 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Test Bundles Management" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
            displayedTests.length,
            " test(s) ",
            isSearching && `for "${searchQuery}"`
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => setIsAddModalOpen(true), className: "px-4 py-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "Add Test"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Search Tests" }),
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
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Test Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Parameters" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Price (₹)" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center font-semibold text-gray-900", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: displayedTests.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-4 py-12 text-center", children: isSearching ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "w-12 h-12 text-gray-400 mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-base", children: "No tests found" }),
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
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-base", children: "No tests available" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1", children: 'Click "Add Test" to create one' })
          ] }) }) }) : displayedTests.map((test) => {
            const params = getTestParameters(test);
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-gray-900", children: test.name }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-700", children: params.length > 0 ? params.map((p) => p.name).join(", ") : "-" }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-gray-900", children: [
                "₹",
                test.price
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
                /* @__PURE__ */ jsx(Button, { onClick: () => openEditModal(test), className: "px-2 py-1", title: "Edit", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx(Button, { onClick: () => onDeleteTest(test.id), variant: "destructive", className: "px-2 py-1", title: "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
              ] }) })
            ] }, test.id);
          }) })
        ] }) }) }) })
      ] })
    ] }),
    isAddModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-400 max-w-3xl w-full my-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-gray-50", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Add Test Bundle" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: () => {
          setIsAddModalOpen(false);
          setSelectedParameterIds([]);
          setCalculatedPrice("0.00");
        }, className: "p-1", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitAdd(onAddTest), className: "p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Test Name *" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...registerAdd("name", {
              required: "Test name is required"
            }), className: "w-full px-3 py-2 border border-gray-300 text-sm" }),
            errorsAdd.name && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: errorsAdd.name.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Price (₹) *" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx("input", { type: "text", ...registerAdd("price", {
              required: "Price is required"
            }), className: "flex-1 px-3 py-2 border border-gray-300 text-sm", placeholder: `Calculated: ${calculatedPrice}` }) }),
            errorsAdd.price && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: errorsAdd.price.message }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [
              "Calculated: ₹",
              calculatedPrice
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-4", children: [
          /* @__PURE__ */ jsxs(Label, { className: "block text-sm font-medium text-gray-900 mb-2", children: [
            "Select Parameters (",
            selectedParameterIds.length,
            " selected)"
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search parameters...", value: paramSearchQuery, onChange: (e) => setParamSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 text-sm mb-3" }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-300 max-h-64 overflow-y-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900 w-12", children: "Select" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900", children: "Parameter" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900", children: "Unit" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-right font-semibold text-gray-900", children: "Price" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: filteredParameters.map((param) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50 cursor-pointer", onClick: () => toggleParameter(param.id), children: [
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center", children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selectedParameterIds.includes(param.id), onChange: () => toggleParameter(param.id), className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-gray-900", children: param.name }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-gray-700", children: param.unit || "-" }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-right text-gray-900", children: param.price ? `₹${param.price}` : "-" })
            ] }, param.id)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", onClick: () => {
            setIsAddModalOpen(false);
            setSelectedParameterIds([]);
            setCalculatedPrice("0.00");
          }, className: "flex-1 px-3 py-2 text-sm", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingAdd, className: "flex-1 px-3 py-2 text-sm", children: isSubmittingAdd ? "Adding..." : "Add Test" })
        ] })
      ] })
    ] }) }),
    isEditModalOpen && selectedTest && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-400 max-w-3xl w-full my-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-gray-50", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Edit Test Bundle" }),
        /* @__PURE__ */ jsx(Button, { onClick: () => {
          setIsEditModalOpen(false);
          setSelectedParameterIds([]);
          setCalculatedPrice("0.00");
        }, className: "p-1 bg-white border border-gray-400", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitEdit(onEditTest), className: "p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Test Name *" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...registerEdit("name", {
              required: "Test name is required"
            }), className: "w-full px-3 py-2 border border-gray-300 text-sm" }),
            errorsEdit.name && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: errorsEdit.name.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-medium text-gray-900 mb-1", children: "Price (₹) *" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...registerEdit("price", {
              required: "Price is required"
            }), className: "w-full px-3 py-2 border border-gray-300 text-sm" }),
            errorsEdit.price && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mt-1", children: errorsEdit.price.message }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [
              "Calculated: ₹",
              calculatedPrice
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-4", children: [
          /* @__PURE__ */ jsxs(Label, { className: "block text-sm font-medium text-gray-900 mb-2", children: [
            "Select Parameters (",
            selectedParameterIds.length,
            " selected)"
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search parameters...", value: paramSearchQuery, onChange: (e) => setParamSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 text-sm mb-3" }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-300 max-h-64 overflow-y-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900 w-12", children: "Select" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900", children: "Parameter" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-900", children: "Unit" }),
              /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-right font-semibold text-gray-900", children: "Price" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: filteredParameters.map((param) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50 cursor-pointer", onClick: () => toggleParameter(param.id), children: [
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center", children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selectedParameterIds.includes(param.id), onChange: () => toggleParameter(param.id), className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-gray-900", children: param.name }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-gray-700", children: param.unit || "-" }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-right text-gray-900", children: param.price ? `₹${param.price}` : "-" })
            ] }, param.id)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => {
            setIsEditModalOpen(false);
            setSelectedParameterIds([]);
            setCalculatedPrice("0.00");
          }, className: "flex-1 px-3 py-2 bg-white border border-gray-400 text-gray-900 text-sm", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingEdit, className: "flex-1 px-3 py-2 bg-white border border-gray-400 text-gray-900 text-sm", children: isSubmittingEdit ? "Updating..." : "Update Test" })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  TestManagement as component
};
