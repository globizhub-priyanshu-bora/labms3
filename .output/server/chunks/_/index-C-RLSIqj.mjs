import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { L as Layout } from "./Layout-C7f1nOr8.mjs";
import { x as Route$7, y as useToast, B as Button, X, z as deleteDoctor, A as searchDoctors, D as registerDoctor, E as updateDoctor, F as getAllDoctors } from "./router-90jZpvv6.mjs";
import { L as Label } from "./label-DD-AC2eC.mjs";
import { P as Plus } from "./plus.mjs";
import { U as UserPlus } from "./user-plus.mjs";
import { S as SquarePen, T as Trash2 } from "./trash-2.mjs";
import { S as Search } from "./search.mjs";
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
function DoctorManagement() {
  const initialData = Route$7.useLoaderData();
  const {
    showToast
  } = useToast();
  const [doctors, setDoctors] = useState(initialData?.data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
  const loadDoctors = async () => {
    try {
      const result = await getAllDoctors({
        data: {
          limit: 50,
          offset: 0,
          sortBy: "name",
          sortOrder: "asc"
        }
      });
      if (result.success) {
        setDoctors(result.data);
      }
    } catch (error) {
      console.error("Error loading doctors:", error);
      showToast("Failed to load doctors", "error");
    }
  };
  const onAddDoctor = async (data) => {
    try {
      const result = await registerDoctor({
        data: {
          registrationNumber: data.registrationNumber,
          name: data.name,
          specialization: data.specialization || void 0,
          phoneNumber: data.phoneNumber ? Number(data.phoneNumber) : void 0
        }
      });
      if (result.success) {
        setIsAddModalOpen(false);
        resetAdd();
        await loadDoctors();
        showToast("Doctor added successfully", "success");
      } else {
        showToast("Failed to add doctor", "error");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      showToast(error instanceof Error ? error.message : "Failed to add doctor", "error");
    }
  };
  const onSearch = async (data) => {
    if (!data.query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    try {
      const result = await searchDoctors({
        data: {
          query: data.query,
          limit: 20,
          offset: 0
        }
      });
      if (result.success) {
        setSearchResults(result.data);
        setIsSearching(true);
      }
    } catch (error) {
      console.error("Error searching doctors:", error);
      showToast("Search failed", "error");
    }
  };
  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    resetEdit({
      registrationNumber: doctor.registrationNumber || "",
      name: doctor.name,
      specialization: doctor.specialization || "",
      phoneNumber: doctor.phoneNumber || void 0
    });
    setIsEditModalOpen(true);
  };
  const onEditDoctor = async (data) => {
    if (!selectedDoctor) return;
    try {
      const result = await updateDoctor({
        data: {
          id: selectedDoctor.id,
          registrationNumber: data.registrationNumber,
          name: data.name,
          specialization: data.specialization || void 0,
          phoneNumber: data.phoneNumber ? Number(data.phoneNumber) : void 0
        }
      });
      if (result.success) {
        setIsEditModalOpen(false);
        setSelectedDoctor(null);
        await loadDoctors();
        if (isSearching) {
          await onSearch({
            query: searchQuery
          });
        }
        showToast("Doctor updated successfully", "success");
      } else {
        showToast("Failed to update doctor", "error");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      showToast(error instanceof Error ? error.message : "Failed to update doctor", "error");
    }
  };
  const onDeleteDoctor = async (id) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const result = await deleteDoctor({
        data: {
          id
        }
      });
      if (result.success) {
        await loadDoctors();
        if (isSearching) {
          await onSearch({
            query: searchQuery
          });
        }
        showToast("Doctor deleted successfully", "success");
      } else {
        showToast("Failed to delete doctor", "error");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      showToast("Failed to delete doctor", "error");
    }
  };
  const displayedDoctors = isSearching ? searchResults : doctors;
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "rounded-lg shadow-sm border", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: isSearching ? "Search Results" : "Available Doctors" }),
            /* @__PURE__ */ jsxs(Button, { onClick: () => setIsAddModalOpen(true), className: "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium", children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
              "Add New Doctor"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm mt-1", children: [
            displayedDoctors.length,
            " doctor(s) found"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-6", children: displayedDoctors.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsx(UserPlus, { className: "w-16 h-16 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: "No doctors available" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: 'Click "Add New Doctor" to register a doctor' })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: displayedDoctors.map((doctor) => /* @__PURE__ */ jsxs("div", { className: "border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-800 text-lg", children: doctor.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600 mt-1", children: [
                "Reg: ",
                doctor.registrationNumber
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { onClick: () => openEditModal(doctor), className: "p-2 rounded-lg transition-colors", title: "Edit", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx(Button, { onClick: () => onDeleteDoctor(doctor.id), className: "p-2 rounded-lg transition-colors bg-red-500 hover:bg-red-600", title: "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            doctor.specialization && /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Specialization:" }),
              " ",
              doctor.specialization
            ] }),
            doctor.phoneNumber && /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Phone:" }),
              " ",
              doctor.phoneNumber
            ] })
          ] })
        ] }, doctor.id)) }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "rounded-lg shadow-sm border p-6 mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Search Doctors" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitSearch(onSearch), className: "space-y-3", children: [
          /* @__PURE__ */ jsx("input", { ...registerSearch("query"), placeholder: "Search by name...", className: "w-full px-3 py-2 border border-gray-300 rounded-lg" }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 mr-2" }),
            "Search"
          ] })
        ] }),
        isSearching && /* @__PURE__ */ jsx(Button, { onClick: () => {
          setIsSearching(false);
          setSearchResults([]);
        }, className: "w-full mt-2 bg-gray-600 hover:bg-gray-700", children: "Clear Search" })
      ] }) })
    ] }) }),
    isAddModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Add New Doctor" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsAddModalOpen(false), className: "text-gray-600 hover:text-gray-900", children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitAdd(onAddDoctor), className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Registration Number *" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("registrationNumber", {
            required: true
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "e.g., MCI12345" }),
          errorsAdd.registrationNumber && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Name *" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("name", {
            required: true
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "Doctor name" }),
          errorsAdd.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Specialization" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("specialization"), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "e.g., Cardiology" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Phone Number" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("phoneNumber"), type: "number", className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "10-digit number" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setIsAddModalOpen(false), className: "px-4 py-2 bg-gray-600 hover:bg-gray-700", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingAdd, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50", children: isSubmittingAdd ? "Adding..." : "Add Doctor" })
        ] })
      ] })
    ] }) }),
    isEditModalOpen && selectedDoctor && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Edit Doctor" }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setIsEditModalOpen(false);
          setSelectedDoctor(null);
        }, className: "text-gray-600 hover:text-gray-900", children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitEdit(onEditDoctor), className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Registration Number *" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("registrationNumber", {
            required: true
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "e.g., MCI12345" }),
          errorsEdit.registrationNumber && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Name *" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("name", {
            required: true
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "Doctor name" }),
          errorsEdit.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Specialization" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("specialization"), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "e.g., Cardiology" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Phone Number" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("phoneNumber"), type: "number", className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "10-digit number" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => {
            setIsEditModalOpen(false);
            setSelectedDoctor(null);
          }, className: "px-4 py-2 bg-gray-600 hover:bg-gray-700", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingEdit, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50", children: isSubmittingEdit ? "Updating..." : "Update Doctor" })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  DoctorManagement as component
};
