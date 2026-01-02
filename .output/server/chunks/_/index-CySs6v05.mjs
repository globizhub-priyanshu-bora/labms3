import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { L as Layout } from "./Layout-DXUP5Ju_.mjs";
import { z as Route$7, B as Button, X, L as Label, A as deleteDoctor, t as toast, D as searchDoctors, E as registerDoctor, G as updateDoctor, H as getAllDoctors } from "./router-BxwJzg91.mjs";
import { U as UserPlus } from "./user-plus.mjs";
import { S as SquarePen, T as Trash2 } from "./trash-2.mjs";
import { S as Search } from "./search.mjs";
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
function DoctorsPage() {
  const loaderData = Route$7.useLoaderData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);
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
  const displayedDoctors = isSearching ? searchResults : loaderData?.data || [];
  const loadDoctors = async () => {
    try {
      const result = await getAllDoctors({
        data: {
          limit: 100,
          offset: 0,
          sortBy: "name",
          sortOrder: "asc"
        }
      });
      if (result.success) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to load doctors");
    }
  };
  const onAddDoctor = async (data) => {
    try {
      const result = await registerDoctor({
        data: {
          registrationNumber: data.registrationNumber,
          name: data.name,
          gender: data.gender || void 0,
          specialization: data.specialization || void 0,
          phoneNumber: data.phoneNumber ? Number(data.phoneNumber) : void 0,
          photoDocument: photoPreview || void 0
        }
      });
      if (result.success) {
        setIsAddModalOpen(false);
        resetAdd();
        setPhotoPreview(null);
        await loadDoctors();
        toast.success("Doctor added successfully");
      } else {
        toast.error("Failed to add doctor");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add doctor");
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
      toast.error("Search failed");
    }
  };
  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setEditPhotoPreview(doctor.photoDocument || null);
    resetEdit({
      registrationNumber: doctor.registrationNumber || "",
      name: doctor.name,
      gender: doctor.gender || "",
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
          gender: data.gender || void 0,
          specialization: data.specialization || void 0,
          phoneNumber: data.phoneNumber ? Number(data.phoneNumber) : void 0,
          photoDocument: editPhotoPreview || void 0
        }
      });
      if (result.success) {
        setIsEditModalOpen(false);
        setSelectedDoctor(null);
        setEditPhotoPreview(null);
        await loadDoctors();
        if (isSearching) {
          await onSearch({
            query: searchQuery
          });
        }
        toast.success("Doctor updated successfully");
      } else {
        toast.error("Failed to update doctor");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update doctor");
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
        toast.success("Doctor deleted successfully");
      } else {
        toast.error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor");
    }
  };
  const handlePhotoSelect = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        if (isEdit) {
          setEditPhotoPreview(base64);
        } else {
          setPhotoPreview(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Doctors Management" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Manage medical professionals and their information" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Doctors List" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
              displayedDoctors.length,
              " doctor(s) found"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Button, { onClick: () => {
            setIsAddModalOpen(true);
            setPhotoPreview(null);
          }, className: "bg-blue-600 hover:bg-blue-700", children: [
            /* @__PURE__ */ jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
            "Add New Doctor"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-6", children: displayedDoctors.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsx(UserPlus, { className: "w-16 h-16 mx-auto mb-4 text-gray-400" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: "No doctors available" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-2", children: 'Click "Add New Doctor" to register a doctor' })
        ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Registration" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Gender" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Specialization" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Phone" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: displayedDoctors.map((doctor) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-900 font-medium", children: doctor.name }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-600", children: doctor.registrationNumber || "-" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-600", children: doctor.gender || "-" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-600", children: doctor.specialization || "-" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-600", children: doctor.phoneNumber || "-" }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-sm flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { onClick: () => openEditModal(doctor), className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg", title: "Edit", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx(Button, { onClick: () => onDeleteDoctor(doctor.id), className: "p-2 text-red-600 hover:bg-red-50 rounded-lg", title: "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
            ] })
          ] }, doctor.id)) })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Search Doctors" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          onSearch({
            query: searchQuery
          });
        }, className: "space-y-3", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name or specialization", className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" }) }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 mr-2" }),
            "Search"
          ] }),
          isSearching && /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => {
            setSearchResults([]);
            setIsSearching(false);
            setSearchQuery("");
          }, className: "w-full bg-gray-600 hover:bg-gray-700", children: "Clear Search" })
        ] })
      ] }) })
    ] }),
    isAddModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Add New Doctor" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsAddModalOpen(false), className: "text-gray-600 hover:text-gray-900", children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitAdd(onAddDoctor), className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Registration Number *" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("registrationNumber", {
            required: "Required"
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "e.g., MCI12345" }),
          errorsAdd.registrationNumber && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Name *" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("name", {
            required: "Required"
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "Doctor name" }),
          errorsAdd.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Gender" }),
          /* @__PURE__ */ jsxs("select", { ...registerAdd("gender"), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select Gender" }),
            /* @__PURE__ */ jsx("option", { value: "Male", children: "Male" }),
            /* @__PURE__ */ jsx("option", { value: "Female", children: "Female" }),
            /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Specialization" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("specialization"), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "e.g., Cardiology" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Phone Number" }),
          /* @__PURE__ */ jsx("input", { ...registerAdd("phoneNumber"), type: "tel", className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "10-digit number" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Photo / ID Document" }),
          /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*,.pdf", onChange: (e) => handlePhotoSelect(e, false), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1" }),
          photoPreview && /* @__PURE__ */ jsx("div", { className: "mt-2 relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden", children: photoPreview.includes("pdf") ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full text-gray-600", children: "PDF Document" }) : /* @__PURE__ */ jsx("img", { src: photoPreview, alt: "Preview", className: "w-full h-full object-cover" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-4 border-t", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setIsAddModalOpen(false), className: "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingAdd, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50", children: isSubmittingAdd ? "Adding..." : "Add Doctor" })
        ] })
      ] })
    ] }) }),
    isEditModalOpen && selectedDoctor && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Edit Doctor" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsEditModalOpen(false), className: "text-gray-600 hover:text-gray-900", children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitEdit(onEditDoctor), className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Registration Number *" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("registrationNumber", {
            required: "Required"
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "e.g., MCI12345" }),
          errorsEdit.registrationNumber && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Name *" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("name", {
            required: "Required"
          }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "Doctor name" }),
          errorsEdit.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: "This field is required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Gender" }),
          /* @__PURE__ */ jsxs("select", { ...registerEdit("gender"), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select Gender" }),
            /* @__PURE__ */ jsx("option", { value: "Male", children: "Male" }),
            /* @__PURE__ */ jsx("option", { value: "Female", children: "Female" }),
            /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Specialization" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("specialization"), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "e.g., Cardiology" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Phone Number" }),
          /* @__PURE__ */ jsx("input", { ...registerEdit("phoneNumber"), type: "tel", className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1", placeholder: "10-digit number" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Photo / ID Document" }),
          /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*,.pdf", onChange: (e) => handlePhotoSelect(e, true), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1" }),
          editPhotoPreview && /* @__PURE__ */ jsx("div", { className: "mt-2 relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden", children: editPhotoPreview.includes("pdf") || editPhotoPreview.includes("application") ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full text-gray-600", children: "PDF Document" }) : /* @__PURE__ */ jsx("img", { src: editPhotoPreview, alt: "Preview", className: "w-full h-full object-cover" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-4 border-t", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setIsEditModalOpen(false), className: "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingEdit, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50", children: isSubmittingEdit ? "Updating..." : "Update Doctor" })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  DoctorsPage as component
};
