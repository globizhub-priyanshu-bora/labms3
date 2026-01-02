import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { and, eq, isNull, desc, count, sql, or, ilike, ne } from "drizzle-orm";
import { z } from "zod";
import { b as db, f as doctorSchema } from "./session-manager-DRdZONnW.mjs";
import { g as getLabIdFromRequest } from "./helpers-VjNq_44e.mjs";
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
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional()
});
const DoctorUpdateSchema = z.object({
  id: z.number().int().positive(),
  registrationNumber: z.string().min(1).optional(),
  name: z.string().min(2).optional(),
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional()
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
    const existing = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.registrationNumber, data.registrationNumber),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Check within lab only
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (existing.length > 0) {
      throw new Error("Doctor with this registration number already exists in your lab");
    }
    const [newDoctor] = await db.insert(doctorSchema).values({
      labId,
      // CRITICAL: Assign to user's lab
      registrationNumber: data.registrationNumber,
      name: data.name,
      specialization: data.specialization || null,
      phoneNumber: data.phoneNumber || null
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
      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          limit,
          offset,
          hasMore: false
        }
      };
    }
    const orderByColumn = doctorSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    const doctors = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt)
    )).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: doctors,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return {
      success: true,
      data: [],
      pagination: {
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      }
    };
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
    const {
      query,
      limit,
      offset
    } = data;
    const searchPattern = `%${query}%`;
    const labId = await getLabIdFromRequest(request);
    const doctors = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(doctorSchema.name, searchPattern), ilike(doctorSchema.registrationNumber, searchPattern), ilike(doctorSchema.specialization, searchPattern)),
      isNull(doctorSchema.deletedAt)
    )).orderBy(desc(doctorSchema.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(doctorSchema.name, searchPattern), ilike(doctorSchema.registrationNumber, searchPattern), ilike(doctorSchema.specialization, searchPattern)),
      isNull(doctorSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: doctors,
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching doctors:", error);
    throw new Error("Failed to search doctors");
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
    const [doctor] = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (!doctor) {
      throw new Error("Doctor not found or access denied");
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
  method: "POST"
}).inputValidator(DoctorUpdateSchema).handler(updateDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.id, id),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Doctor not found or access denied");
    }
    if (updateData.registrationNumber) {
      const [duplicate] = await db.select().from(doctorSchema).where(and(
        eq(doctorSchema.registrationNumber, updateData.registrationNumber),
        eq(doctorSchema.labId, labId),
        // CRITICAL: Check within lab only
        ne(doctorSchema.id, id),
        isNull(doctorSchema.deletedAt)
      )).limit(1);
      if (duplicate) {
        throw new Error("Registration number already exists for another doctor in your lab");
      }
    }
    const [updatedDoctor] = await db.update(doctorSchema).set({
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(doctorSchema.id, id),
      eq(doctorSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
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
  method: "POST"
}).inputValidator(DoctorIdSchema).handler(deleteDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(doctorSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Doctor not found or access denied");
    }
    await db.update(doctorSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Doctor deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete doctor");
  }
});
const permanentlyDeleteDoctor_createServerFn_handler = createServerRpc("12abd73b5933ccd6900df5a4730dd5d90c469edca3c73b18a3c763773e2e54e6", (opts, signal) => {
  return permanentlyDeleteDoctor.__executeServer(opts, signal);
});
const permanentlyDeleteDoctor = createServerFn({
  method: "POST"
}).inputValidator(DoctorIdSchema).handler(permanentlyDeleteDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const deleted = await db.delete(doctorSchema).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).returning();
    if (deleted.length === 0) {
      throw new Error("Doctor not found or access denied");
    }
    return {
      success: true,
      message: "Doctor permanently deleted"
    };
  } catch (error) {
    console.error("Error permanently deleting doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to permanently delete doctor");
  }
});
const restoreDoctor_createServerFn_handler = createServerRpc("4b490d806da08483ec5e58551edab8c156b1126c04faaba9f8231b0a7283a58d", (opts, signal) => {
  return restoreDoctor.__executeServer(opts, signal);
});
const restoreDoctor = createServerFn({
  method: "POST"
}).inputValidator(DoctorIdSchema).handler(restoreDoctor_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [restored] = await db.update(doctorSchema).set({
      deletedAt: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(doctorSchema.id, data.id),
      eq(doctorSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).returning();
    if (!restored) {
      throw new Error("Doctor not found or access denied");
    }
    return {
      success: true,
      message: "Doctor restored successfully",
      data: restored
    };
  } catch (error) {
    console.error("Error restoring doctor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to restore doctor");
  }
});
const getDoctorsBySpecialization_createServerFn_handler = createServerRpc("687d43d01dd45244ff29a9f700e5e4f671c268dff00500d71e17031a9e01b8bd", (opts, signal) => {
  return getDoctorsBySpecialization.__executeServer(opts, signal);
});
const getDoctorsBySpecialization = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  specialization: z.string().min(1)
})).handler(getDoctorsBySpecialization_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const doctors = await db.select().from(doctorSchema).where(and(
      eq(doctorSchema.specialization, data.specialization),
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt)
    )).orderBy(doctorSchema.name);
    return {
      success: true,
      data: doctors,
      specialization: data.specialization
    };
  } catch (error) {
    console.error("Error fetching doctors by specialization:", error);
    throw new Error("Failed to fetch doctors by specialization");
  }
});
const getAllSpecializations_createServerFn_handler = createServerRpc("b4feeef641f2188752d2b6bb947e53483e2ba00af311a54e59eb1a98f96416b4", (opts, signal) => {
  return getAllSpecializations.__executeServer(opts, signal);
});
const getAllSpecializations = createServerFn({
  method: "GET"
}).handler(getAllSpecializations_createServerFn_handler, async ({
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const specializations = await db.selectDistinct({
      specialization: doctorSchema.specialization
    }).from(doctorSchema).where(and(
      eq(doctorSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(doctorSchema.deletedAt),
      sql`${doctorSchema.specialization} IS NOT NULL`
    )).orderBy(doctorSchema.specialization);
    return {
      success: true,
      data: specializations.map((s) => s.specialization).filter(Boolean)
    };
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw new Error("Failed to fetch specializations");
  }
});
export {
  deleteDoctor_createServerFn_handler,
  getAllDoctors_createServerFn_handler,
  getAllSpecializations_createServerFn_handler,
  getDoctorById_createServerFn_handler,
  getDoctorsBySpecialization_createServerFn_handler,
  permanentlyDeleteDoctor_createServerFn_handler,
  registerDoctor_createServerFn_handler,
  restoreDoctor_createServerFn_handler,
  searchDoctors_createServerFn_handler,
  updateDoctor_createServerFn_handler
};
