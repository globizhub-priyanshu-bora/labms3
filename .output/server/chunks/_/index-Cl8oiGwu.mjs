import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { L as Layout } from "./Layout-C_dtCkhk.mjs";
import { R as Route$b, t as toast, B as Button, a as CircleAlert, X, L as Label, b as calculateTestPrice, s as searchTests, d as deleteTest, e as getAllTestParameters, f as createTest, u as updateTest, h as getAllTests } from "./router-BYOHKi2s.mjs";
import { P as Plus } from "./plus.mjs";
import { S as Search } from "./search.mjs";
import { S as SquarePen, T as Trash2 } from "./trash-2.mjs";
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
function TestManagement() {
  const initialData = Route$b.useLoaderData();
  const [tests, setTests] = useState(initialData?.tests?.data || []);
  const [allParameters, setAllParameters] = useState(initialData?.parameters?.data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [parametersLoadError, setParametersLoadError] = useState(null);
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
    if (initialData?.error) {
      setParametersLoadError(initialData.error);
      toast.error(initialData.error);
    }
  }, [initialData?.error]);
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
      toast.error("Failed to load tests");
    }
  };
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
        setAllParameters(result.data);
        setParametersLoadError(null);
      } else {
        toast.error("Failed to load test parameters");
        setParametersLoadError("Failed to load test parameters");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load test parameters";
      console.error("Error loading parameters:", error);
      toast.error(errorMessage);
      setParametersLoadError(errorMessage);
    }
  };
  const toggleParameter = (id) => {
    setSelectedParameterIds((prev) => prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]);
  };
  const onAddTest = async (data) => {
    if (!data.name.trim()) {
      toast.error("Test name is required");
      return;
    }
    if (!data.price || parseFloat(data.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (selectedParameterIds.length === 0) {
      toast.error("Please select at least one parameter");
      return;
    }
    try {
      const result = await createTest({
        data: {
          name: data.name,
          price: data.price,
          parameterIds: selectedParameterIds
        }
      });
      if (result.success) {
        toast.success("Test created successfully");
        resetAdd();
        setSelectedParameterIds([]);
        setCalculatedPrice("0.00");
        setIsAddModalOpen(false);
        await loadTests();
      } else {
        toast.error(result.error || "Failed to create test");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create test";
      console.error("Error creating test:", error);
      toast.error(errorMessage);
    }
  };
  const onEditTest = async (data) => {
    if (!selectedTest) {
      toast.error("No test selected");
      return;
    }
    if (!data.name.trim()) {
      toast.error("Test name is required");
      return;
    }
    if (!data.price || parseFloat(data.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (selectedParameterIds.length === 0) {
      toast.error("Please select at least one parameter");
      return;
    }
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
        toast.success("Test updated successfully");
        resetEdit();
        setSelectedParameterIds([]);
        setCalculatedPrice("0.00");
        setIsEditModalOpen(false);
        await loadTests();
      } else {
        toast.error(result.error || "Failed to update test");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update test";
      console.error("Error updating test:", error);
      toast.error(errorMessage);
    }
  };
  const onDeleteTest = async (id) => {
    if (!confirm("Are you sure you want to delete this test?")) {
      return;
    }
    try {
      const result = await deleteTest({
        data: {
          id
        }
      });
      if (result.success) {
        toast.success("Test deleted successfully");
        await loadTests();
      } else {
        toast.error(result.error || "Failed to delete test");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete test";
      console.error("Error deleting test:", error);
      toast.error(errorMessage);
    }
  };
  const onSearchTests = async (data) => {
    if (!data.query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
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
      } else {
        toast.error("Failed to search tests");
        setSearchResults([]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to search tests";
      console.error("Error searching tests:", error);
      toast.error(errorMessage);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  const displayTests = searchResults.length > 0 ? searchResults : tests;
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 mb-4 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Test Management" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
          displayTests.length,
          " test(s) ",
          isSearching && `for "${searchQuery}"`
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => {
        setIsAddModalOpen(true);
        setSelectedParameterIds([]);
        setCalculatedPrice("0.00");
        resetAdd();
      }, className: "bg-blue-600 hover:bg-blue-700 text-white", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add Test"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Search Tests" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitSearch(onSearchTests), children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search...", ...registerSearch("query"), onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 text-sm mb-2" }),
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full px-3 py-2 bg-white border border-gray-400 text-gray-900 text-sm hover:bg-gray-50", children: [
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
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Price (₹)" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Parameters" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center font-semibold text-gray-900", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: displayTests.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-4 py-12 text-center", children: isSearching ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
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
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-base", children: "No tests created yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Get started by adding your first test" })
        ] }) }) }) : displayTests.map((test) => {
          const paramIds = test.metadata?.parameterIds || [];
          const paramNames = paramIds.map((id) => {
            const param = allParameters.find((p) => p.id === id);
            return param?.name || "Unknown";
          }).join(", ");
          return /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-900 font-medium", children: test.name }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-gray-700", children: [
              "₹",
              test.price
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-700 text-xs", children: paramNames || "-" }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-center", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => {
                setSelectedTest(test);
                const paramIds2 = test.metadata?.parameterIds || [];
                setSelectedParameterIds(paramIds2);
                setValueEdit("name", test.name);
                setValueEdit("price", test.price);
                setIsEditModalOpen(true);
                const calculatePrice = async () => {
                  if (paramIds2.length === 0) {
                    setCalculatedPrice("0.00");
                    return;
                  }
                  try {
                    const result = await calculatePrice({
                      data: {
                        parameterIds: paramIds2
                      }
                    });
                    if (result.success) {
                      setCalculatedPrice(result.totalPrice);
                    }
                  } catch (error) {
                    console.error("Error calculating price:", error);
                  }
                };
                calculatePrice();
              }, className: "text-blue-600 hover:text-blue-800 mr-3 inline", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => onDeleteTest(test.id), className: "text-red-600 hover:text-red-800 inline", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
            ] })
          ] }, test.id);
        }) })
      ] }) }) }) })
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
          parametersLoadError && /* @__PURE__ */ jsxs("div", { className: "mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: parametersLoadError }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: loadParameters, className: "text-red-600 hover:text-red-800 underline", children: "Try loading parameters again" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search parameters...", value: paramSearchQuery, onChange: (e) => setParamSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 text-sm mb-3" }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-300 max-h-64 overflow-y-auto", children: filteredParameters.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-gray-500", children: allParameters.length === 0 ? "No parameters available. Please create test parameters first." : "No parameters match your search" }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
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
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx("input", { type: "text", ...registerEdit("price", {
              required: "Price is required"
            }), className: "flex-1 px-3 py-2 border border-gray-300 text-sm", placeholder: `Calculated: ${calculatedPrice}` }) }),
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
          parametersLoadError && /* @__PURE__ */ jsxs("div", { className: "mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: parametersLoadError }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: loadParameters, className: "text-red-600 hover:text-red-800 underline", children: "Try loading parameters again" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search parameters...", value: paramSearchQuery, onChange: (e) => setParamSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 text-sm mb-3" }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-300 max-h-64 overflow-y-auto", children: filteredParameters.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-gray-500", children: allParameters.length === 0 ? "No parameters available. Please create test parameters first." : "No parameters match your search" }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
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
            setIsEditModalOpen(false);
            setSelectedParameterIds([]);
            setCalculatedPrice("0.00");
          }, className: "flex-1 px-3 py-2 text-sm", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingEdit, className: "flex-1 px-3 py-2 text-sm", children: isSubmittingEdit ? "Saving..." : "Save Changes" })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  TestManagement as component
};
