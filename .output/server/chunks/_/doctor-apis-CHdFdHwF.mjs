import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { and, eq, desc, isNull, count, or, ilike } from "drizzle-orm";
import { z } from "zod";
import { d as db, c as doctorSchema } from "./session-manager-Dkxs0Vej.mjs";
import { g as getLabIdFromRequest } from "./helpers-zc_3GKPr.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const DoctorCreateSchema = z.object({
  registrationNumber: z.string().min(1, "Registration number is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.string().optional(),
  // NEW: Gender field
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional(),
  photoDocument: z.string().optional()
  // NEW: Photo document (base64 or URL)
});
const DoctorUpdateSchema = z.object({
  id: z.number().int().positive(),
  registrationNumber: z.string().min(1).optional(),
  name: z.string().min(2).optional(),
  gender: z.string().optional(),
  // NEW: Gender field
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional(),
  photoDocument: z.string().optional()
  // NEW: Photo document
});
const DoctorIdSchema = z.object({
  id: z.number().int().positive()
});
const DoctorSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0)
});
const DoctorListSchema = z.object({
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "specialization"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const registerDoctor_createServerFn_handler = createServerRpc("e8dd402e17590eb08d3d0bd24e3683c0f1d033b4a7e6aff487a22f37fd8e2618", (opts, signal) => {
  return registerDoctor.__executeServer(opts, signal);
});
const registerDoctor = createServerFn({
  method: "POST"
}).inputValidator(DoctorCreateSchema).handler(registerDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const existing = await db.select().from(doctorSchema).where(and(eq(doctorSchema.registrationNumber, data.registrationNumber), eq(doctorSchema.labId, labId), isNull(doctorSchema.deletedAt))).limit(1);
    if (existing.length > 0) {
      throw new Error("Doctor with this registration number already exists in your lab");
    }
    const [newDoctor] = await db.insert(doctorSchema).values({
      labId,
      registrationNumber: data.registrationNumber,
      name: data.name,
      gender: data.gender || null,
      // NEW: Store gender
      specialization: data.specialization || null,
      phoneNumber: data.phoneNumber || null,
      photoDocument: data.photoDocument || null
      // NEW: Store photo document
    }).returning();
    return {
      success: true,
      message: "Doctor registered successfully",
      data: newDoctor
    };
  } catch (error) {
    console.error("Error registering doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to register doctor");
  }
});
const getAllDoctors_createServerFn_handler = createServerRpc("145982feac1e984b1cef6b5523f0eb1e7c41d91af7983fc05b0328d6c10759f6", (opts, signal) => {
  return getAllDoctors.__executeServer(opts, signal);
});
const getAllDoctors = createServerFn({
  method: "GET"
}).inputValidator(DoctorListSchema).handler(getAllDoctors_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    let labId;
    try {
      labId = await getLabIdFromRequest(request);
    } catch (error) {
      console.error("Error getting lab ID:", error);
      throw new Error("Unable to identify your lab. Please log in again.");
    }
    let sortColumn = desc(doctorSchema.createdAt);
    if (sortBy === "name") {
      sortColumn = sortOrder === "asc" ? doctorSchema.name : desc(doctorSchema.name);
    } else if (sortBy === "specialization") {
      sortColumn = sortOrder === "asc" ? doctorSchema.specialization : desc(doctorSchema.specialization);
    } else {
      sortColumn = sortOrder === "asc" ? doctorSchema.createdAt : desc(doctorSchema.createdAt);
    }
    const doctors = await db.select().from(doctorSchema).where(and(eq(doctorSchema.labId, labId), isNull(doctorSchema.deletedAt))).orderBy(sortColumn).limit(limit).offset(offset);
    const totalResult = await db.select({
      count: count()
    }).from(doctorSchema).where(and(eq(doctorSchema.labId, labId), isNull(doctorSchema.deletedAt)));
    const total = totalResult[0]?.count || 0;
    return {
      success: true,
      data: doctors,
      total,
      limit,
      offset
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch doctors");
  }
});
const getDoctorById_createServerFn_handler = createServerRpc("d370673239cbcaddeee0b905aa8fae5daff42009a9e089864251255533f765ea", (opts, signal) => {
  return getDoctorById.__executeServer(opts, signal);
});
const getDoctorById = createServerFn({
  method: "GET"
}).inputValidator(DoctorIdSchema).handler(getDoctorById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [doctor] = await db.select().from(doctorSchema).where(and(eq(doctorSchema.id, data.id), eq(doctorSchema.labId, labId), isNull(doctorSchema.deletedAt)));
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    return {
      success: true,
      data: doctor
    };
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch doctor");
  }
});
const updateDoctor_createServerFn_handler = createServerRpc("08ec65a6b61510a6035c5d92dabce42347377649b13f70fabdf89b17d2f1f8fb", (opts, signal) => {
  return updateDoctor.__executeServer(opts, signal);
});
const updateDoctor = createServerFn({
  method: "PUT"
}).inputValidator(DoctorUpdateSchema).handler(updateDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const {
      id,
      ...updateData
    } = data;
    const [existingDoctor] = await db.select().from(doctorSchema).where(and(eq(doctorSchema.id, id), eq(doctorSchema.labId, labId), isNull(doctorSchema.deletedAt)));
    if (!existingDoctor) {
      throw new Error("Doctor not found");
    }
    if (updateData.registrationNumber && updateData.registrationNumber !== existingDoctor.registrationNumber) {
      const duplicate = await db.select().from(doctorSchema).where(and(eq(doctorSchema.registrationNumber, updateData.registrationNumber), eq(doctorSchema.labId, labId), isNull(doctorSchema.deletedAt))).limit(1);
      if (duplicate.length > 0) {
        throw new Error("Another doctor with this registration number already exists");
      }
    }
    const [updatedDoctor] = await db.update(doctorSchema).set({
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(doctorSchema.id, id)).returning();
    return {
      success: true,
      message: "Doctor updated successfully",
      data: updatedDoctor
    };
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update doctor");
  }
});
const deleteDoctor_createServerFn_handler = createServerRpc("3e743f8de56b84d00b0dfb65853cccba90375ac6b709a29e25593f0c7329d022", (opts, signal) => {
  return deleteDoctor.__executeServer(opts, signal);
});
const deleteDoctor = createServerFn({
  method: "DELETE"
}).inputValidator(DoctorIdSchema).handler(deleteDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [deletedDoctor] = await db.update(doctorSchema).set({
      deletedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(doctorSchema.id, data.id), eq(doctorSchema.labId, labId))).returning();
    if (!deletedDoctor) {
      throw new Error("Doctor not found");
    }
    return {
      success: true,
      message: "Doctor deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete doctor");
  }
});
const searchDoctors_createServerFn_handler = createServerRpc("e41548d8794ad3413f5f64cb80d858e746fbaa33ea6383b9b514d8079fc0286b", (opts, signal) => {
  return searchDoctors.__executeServer(opts, signal);
});
const searchDoctors = createServerFn({
  method: "GET"
}).inputValidator(DoctorSearchSchema).handler(searchDoctors_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const {
      query,
      limit,
      offset
    } = data;
    const doctors = await db.select().from(doctorSchema).where(and(eq(doctorSchema.labId, labId), isNull(doctorSchema.deletedAt), or(ilike(doctorSchema.name, `%${query}%`), ilike(doctorSchema.specialization, `%${query}%`)))).limit(limit).offset(offset);
    return {
      success: true,
      data: doctors
    };
  } catch (error) {
    console.error("Error searching doctors:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to search doctors");
  }
});
export {
  deleteDoctor_createServerFn_handler,
  getAllDoctors_createServerFn_handler,
  getDoctorById_createServerFn_handler,
  registerDoctor_createServerFn_handler,
  searchDoctors_createServerFn_handler,
  updateDoctor_createServerFn_handler
};
