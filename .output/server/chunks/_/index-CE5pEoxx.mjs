import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { L as Layout } from "./Layout-DoTX4t_Q.mjs";
import { c as createLucideIcon, p as Route$8, B as Button, q as RefreshCw, X, t as getAllPatients, v as bulkDeletePatients, w as updatePatient } from "./router-Dy2QNYkF.mjs";
import { L as Label } from "./label-D3p7hUlZ.mjs";
import { U as Users, T as TrendingUp } from "./users.mjs";
import { F as FileText } from "./file-text.mjs";
import { C as Calendar } from "./calendar.mjs";
import { S as Search } from "./search.mjs";
import { U as UserPlus } from "./user-plus.mjs";
import { S as SquarePen, T as Trash2 } from "./trash-2.mjs";
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
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function LabManagement() {
  const initialData = Route$8.useLoaderData();
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialData?.data || []);
  const [filteredPatients, setFilteredPatients] = useState(initialData?.data || []);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterForm, setFilterForm] = useState({
    searchQuery: "",
    gender: "",
    city: "",
    state: "",
    dateFrom: "",
    dateTo: "",
    ageMin: "",
    ageMax: ""
  });
  const [editForm, setEditForm] = useState({
    name: "",
    age: void 0,
    gender: "",
    phoneNumber: void 0,
    addressLine1: "",
    city: "",
    state: "",
    country: "",
    pincode: void 0
  });
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
  const formatTime = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await getAllPatients({
        data: {
          limit: 100,
          offset: 0,
          sortBy: "createdAt",
          sortOrder: "desc"
        }
      });
      if (result.success) {
        setPatients(result.data);
        setFilteredPatients(result.data);
        setActiveFilters({});
        setFilterForm({
          searchQuery: "",
          gender: "",
          city: "",
          state: "",
          dateFrom: "",
          dateTo: "",
          ageMin: "",
          ageMax: ""
        });
        setSelectedPatients([]);
      }
    } catch (error) {
      console.error("Error refreshing:", error);
      alert("Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  };
  const handleSelectPatient = (patientId) => {
    setSelectedPatients((prev) => prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId]);
  };
  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map((p) => p.id));
    }
  };
  const applyFilters = (e) => {
    e.preventDefault();
    let filtered = [...patients];
    if (filterForm.searchQuery.trim()) {
      const query = filterForm.searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query) || p.phoneNumber?.toString().includes(query) || p.city?.toLowerCase().includes(query) || p.state?.toLowerCase().includes(query));
    }
    if (filterForm.gender) {
      filtered = filtered.filter((p) => p.gender?.toLowerCase() === filterForm.gender.toLowerCase());
    }
    if (filterForm.city.trim()) {
      filtered = filtered.filter((p) => p.city?.toLowerCase().includes(filterForm.city.toLowerCase()));
    }
    if (filterForm.state.trim()) {
      filtered = filtered.filter((p) => p.state?.toLowerCase().includes(filterForm.state.toLowerCase()));
    }
    if (filterForm.ageMin) {
      const minAge = parseInt(filterForm.ageMin);
      filtered = filtered.filter((p) => p.age !== null && p.age >= minAge);
    }
    if (filterForm.ageMax) {
      const maxAge = parseInt(filterForm.ageMax);
      filtered = filtered.filter((p) => p.age !== null && p.age <= maxAge);
    }
    if (filterForm.dateFrom) {
      const fromDate = new Date(filterForm.dateFrom);
      filtered = filtered.filter((p) => {
        if (!p.createdAt) return false;
        return new Date(p.createdAt) >= fromDate;
      });
    }
    if (filterForm.dateTo) {
      const toDate = new Date(filterForm.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((p) => {
        if (!p.createdAt) return false;
        return new Date(p.createdAt) <= toDate;
      });
    }
    setFilteredPatients(filtered);
    setActiveFilters(filterForm);
    setIsFilterModalOpen(false);
  };
  const clearFilters = () => {
    setFilterForm({
      searchQuery: "",
      gender: "",
      city: "",
      state: "",
      dateFrom: "",
      dateTo: "",
      ageMin: "",
      ageMax: ""
    });
    setFilteredPatients(patients);
    setActiveFilters({});
  };
  const openEditModal = (patient) => {
    setEditingPatient(patient);
    setEditForm({
      name: patient.name,
      age: patient.age || void 0,
      gender: patient.gender || "",
      phoneNumber: patient.phoneNumber || void 0,
      addressLine1: patient.addressLine1 || "",
      city: patient.city || "",
      state: patient.state || "",
      country: patient.country || "",
      pincode: patient.pincode || void 0
    });
    setIsEditModalOpen(true);
  };
  const handleEdit = () => {
    if (selectedPatients.length === 0) {
      alert("Please select a patient to edit");
      return;
    }
    if (selectedPatients.length > 1) {
      alert("Please select only one patient to edit");
      return;
    }
    const patient = filteredPatients.find((p) => p.id === selectedPatients[0]);
    if (patient) {
      openEditModal(patient);
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingPatient) return;
    try {
      const result = await updatePatient({
        data: {
          id: editingPatient.id,
          ...editForm
        }
      });
      if (result.success) {
        const updatedPatients = patients.map((p) => p.id === editingPatient.id ? result.data : p);
        setPatients(updatedPatients);
        setFilteredPatients(updatedPatients);
        setIsEditModalOpen(false);
        setEditingPatient(null);
        setSelectedPatients([]);
        alert("Patient updated successfully!");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert(error instanceof Error ? error.message : "Failed to update patient");
    }
  };
  const handleDelete = async () => {
    if (selectedPatients.length === 0) {
      alert("Please select at least one patient to delete");
      return;
    }
    const confirmMsg = `Are you sure you want to delete ${selectedPatients.length} patient(s)? This action cannot be undone.`;
    if (!confirm(confirmMsg)) return;
    try {
      const result = await bulkDeletePatients({
        data: {
          ids: selectedPatients
        }
      });
      if (result.success) {
        const updatedPatients = patients.filter((p) => !selectedPatients.includes(p.id));
        setPatients(updatedPatients);
        setFilteredPatients(updatedPatients);
        setSelectedPatients([]);
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting patients:", error);
      alert(error instanceof Error ? error.message : "Failed to delete patients");
    }
  };
  const hasActiveFilters = Object.values(activeFilters).some((v) => v && v !== "");
  const StatCard = ({
    icon: Icon,
    label,
    value,
    color
  }) => /* @__PURE__ */ jsx("div", { className: `bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${color}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 font-medium", children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: value })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `p-3 rounded-lg ${color.split(" ")[0]} bg-opacity-10`, children: /* @__PURE__ */ jsx(Icon, { className: `w-6 h-6 ${color.split(" ")[1]}` }) })
  ] }) });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-full mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        /* @__PURE__ */ jsx(StatCard, { icon: Users, label: "Total Patients", value: patients.length, color: "border-l-4 border-blue-500" }),
        /* @__PURE__ */ jsx(StatCard, { icon: FileText, label: "Total Bills", value: filteredPatients.length, color: "border-l-4 border-green-500" }),
        /* @__PURE__ */ jsx(StatCard, { icon: TrendingUp, label: "Active Records", value: filteredPatients.length, color: "border-l-4 border-purple-500" }),
        /* @__PURE__ */ jsx(StatCard, { icon: Calendar, label: "This Month", value: patients.filter((p) => {
          if (!p.createdAt) return false;
          const date = new Date(p.createdAt);
          const now = /* @__PURE__ */ new Date();
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).length, color: "border-l-4 border-orange-500" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Manage Patients" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
          "Total Patients: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: patients.length }),
          filteredPatients.length !== patients.length && /* @__PURE__ */ jsxs(Fragment, { children: [
            " • Filtered: ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: filteredPatients.length })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 rounded-lg shadow-sm mb-4 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-75 max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search patients...", value: searchQuery, onChange: (e) => {
              setSearchQuery(e.target.value);
              const query = e.target.value.toLowerCase();
              if (!query) {
                setFilteredPatients(patients);
              } else {
                const filtered = patients.filter((p) => p.name.toLowerCase().includes(query) || p.phoneNumber?.toString().includes(query) || p.city?.toLowerCase().includes(query) || p.state?.toLowerCase().includes(query));
                setFilteredPatients(filtered);
              }
            }, className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs(Button, { onClick: handleRefresh, disabled: isRefreshing, className: "px-4 py-2 text-sm", children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}` }),
              "Refresh"
            ] }),
            /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
              to: "/patients/register"
            }), className: "px-4 py-2 text-sm", children: [
              /* @__PURE__ */ jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
              "New Patient"
            ] }),
            /* @__PURE__ */ jsxs(Button, { disabled: selectedPatients.length === 0, onClick: handleEdit, className: "px-4 py-2 text-sm", children: [
              /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
              "Edit"
            ] }),
            /* @__PURE__ */ jsxs(Button, { disabled: selectedPatients.length === 0, onClick: handleDelete, variant: "destructive", className: "px-4 py-2 text-sm", children: [
              /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 mr-2" }),
              "Delete"
            ] }),
            /* @__PURE__ */ jsxs(Button, { onClick: () => setIsFilterModalOpen(true), className: `px-4 py-2 text-sm ${hasActiveFilters ? "bg-blue-700" : ""}`, children: [
              /* @__PURE__ */ jsx(Funnel, { className: "w-4 h-4 mr-2" }),
              "Filter"
            ] })
          ] })
        ] }),
        hasActiveFilters && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: "Active Filters:" }),
          Object.entries(activeFilters).map(([key, value]) => {
            if (!value) return null;
            return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium", children: [
              key,
              ": ",
              value
            ] }, key);
          }),
          /* @__PURE__ */ jsx(Button, { onClick: clearFilters, variant: "destructive", className: "px-2 py-1 text-xs", children: "Clear All" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300 bg-gray-50", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center w-12", children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selectedPatients.length === filteredPatients.length && filteredPatients.length > 0, onChange: handleSelectAll, className: "w-4 h-4 rounded border-gray-300" }) }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Lab ID" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Patient" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Registered" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Contact" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-900", children: "Location" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center font-semibold text-gray-900", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: filteredPatients.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-4 py-16 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx(Funnel, { className: "w-16 h-16 text-gray-400 mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium text-lg", children: "No patients found" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-2", children: hasActiveFilters ? "Try adjusting your filters" : 'Click "New Patient" to register' }),
            hasActiveFilters && /* @__PURE__ */ jsx(Button, { onClick: clearFilters, className: "mt-4 px-6 py-2", children: "Clear Filters" })
          ] }) }) }) : filteredPatients.map((patient) => /* @__PURE__ */ jsxs("tr", { className: `border-b border-gray-200 hover:bg-blue-50 transition-colors ${selectedPatients.includes(patient.id) ? "bg-blue-50" : ""}`, children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selectedPatients.includes(patient.id), onChange: () => handleSelectPatient(patient.id), className: "w-4 h-4 rounded border-gray-300" }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold text-blue-600", children: patient.id.toString().padStart(6, "0") }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: formatDate(patient.createdAt) })
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: patient.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-600", children: [
                patient.age && `${patient.age} Yrs`,
                patient.age && patient.gender && " • ",
                patient.gender && `(${patient.gender})`
              ] })
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium", children: formatTime(patient.createdAt) }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: formatDate(patient.createdAt) })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-700", children: patient.phoneNumber || "-" }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-gray-700", children: [
              patient.city || "-",
              patient.city && patient.state && ", ",
              patient.state || ""
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2", children: /* @__PURE__ */ jsxs(Button, { className: "px-3 py-1 text-xs", title: "View Details", onClick: () => navigate({
              to: "/patients/$id",
              params: {
                id: patient.id.toString()
              }
            }), children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-3 h-3 mr-1" }),
              "View"
            ] }) }) })
          ] }, patient.id)) })
        ] }) }),
        filteredPatients.length > 0 && /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 px-4 py-3 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center text-sm", children: /* @__PURE__ */ jsxs("div", { className: "text-gray-600", children: [
          "Showing ",
          filteredPatients.length,
          " patient(s)",
          selectedPatients.length > 0 && ` • ${selectedPatients.length} selected`
        ] }) }) })
      ] })
    ] }),
    isFilterModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg max-w-2xl w-full my-8 shadow-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-200", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Funnel, { className: "w-5 h-5 text-blue-600" }),
          "Filter Patients"
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: () => setIsFilterModalOpen(false), className: "p-1 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-500" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: applyFilters, className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Search Text" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: filterForm.searchQuery, onChange: (e) => setFilterForm({
              ...filterForm,
              searchQuery: e.target.value
            }), placeholder: "Search by name, phone, city, or state...", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Gender" }),
            /* @__PURE__ */ jsxs("select", { value: filterForm.gender, onChange: (e) => setFilterForm({
              ...filterForm,
              gender: e.target.value
            }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Genders" }),
              /* @__PURE__ */ jsx("option", { value: "M", children: "Male" }),
              /* @__PURE__ */ jsx("option", { value: "F", children: "Female" }),
              /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "City" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: filterForm.city, onChange: (e) => setFilterForm({
                ...filterForm,
                city: e.target.value
              }), placeholder: "Enter city", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "State" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: filterForm.state, onChange: (e) => setFilterForm({
                ...filterForm,
                state: e.target.value
              }), placeholder: "Enter state", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Age Range" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx("input", { type: "number", value: filterForm.ageMin, onChange: (e) => setFilterForm({
                ...filterForm,
                ageMin: e.target.value
              }), placeholder: "Min age", min: "0", max: "150", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: filterForm.ageMax, onChange: (e) => setFilterForm({
                ...filterForm,
                ageMax: e.target.value
              }), placeholder: "Max age", min: "0", max: "150", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Registration Date Range" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-500 mb-1 block", children: "From" }),
                /* @__PURE__ */ jsx("input", { type: "date", value: filterForm.dateFrom, onChange: (e) => setFilterForm({
                  ...filterForm,
                  dateFrom: e.target.value
                }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs text-gray-500 mb-1 block", children: "To" }),
                /* @__PURE__ */ jsx("input", { type: "date", value: filterForm.dateTo, onChange: (e) => setFilterForm({
                  ...filterForm,
                  dateTo: e.target.value
                }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-6", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: clearFilters, variant: "destructive", className: "flex-1 px-4 py-2", children: "Reset" }),
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setIsFilterModalOpen(false), className: "flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "flex-1 px-4 py-2", children: "Apply Filters" })
        ] })
      ] })
    ] }) }),
    isEditModalOpen && editingPatient && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg max-w-2xl w-full my-8 shadow-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-200", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(SquarePen, { className: "w-5 h-5 text-blue-600" }),
          "Edit Patient Information"
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: () => {
          setIsEditModalOpen(false);
          setEditingPatient(null);
        }, className: "p-1 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-500" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleEditSubmit, className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Full Name *" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: editForm.name, onChange: (e) => setEditForm({
                ...editForm,
                name: e.target.value
              }), required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Age" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: editForm.age || "", onChange: (e) => setEditForm({
                ...editForm,
                age: e.target.value ? Number(e.target.value) : void 0
              }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Gender" }),
              /* @__PURE__ */ jsxs("select", { value: editForm.gender, onChange: (e) => setEditForm({
                ...editForm,
                gender: e.target.value
              }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select gender" }),
                /* @__PURE__ */ jsx("option", { value: "M", children: "Male" }),
                /* @__PURE__ */ jsx("option", { value: "F", children: "Female" }),
                /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Phone Number" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: editForm.phoneNumber || "", onChange: (e) => setEditForm({
                ...editForm,
                phoneNumber: e.target.value ? Number(e.target.value) : void 0
              }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Address" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: editForm.addressLine1, onChange: (e) => setEditForm({
              ...editForm,
              addressLine1: e.target.value
            }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "City" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: editForm.city, onChange: (e) => setEditForm({
                ...editForm,
                city: e.target.value
              }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "State" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: editForm.state, onChange: (e) => setEditForm({
                ...editForm,
                state: e.target.value
              }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Country" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: editForm.country, onChange: (e) => setEditForm({
                ...editForm,
                country: e.target.value
              }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "mb-2", children: "Pincode" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: editForm.pincode || "", onChange: (e) => setEditForm({
                ...editForm,
                pincode: e.target.value ? Number(e.target.value) : void 0
              }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-6", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => {
            setIsEditModalOpen(false);
            setEditingPatient(null);
          }, className: "flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "flex-1 px-4 py-2 bg-green-600 hover:bg-green-700", children: "Update Patient" })
        ] })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(Layout, { requiredRole: ["admin", "cashier", "lab_tech"], children: /* @__PURE__ */ jsx(LabManagement, {}) });
export {
  SplitComponent as component
};
