import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { and, inArray, eq, desc, count, or, ilike } from "drizzle-orm";
import { z } from "zod";
import { d as db, i as patientSchema, j as billSchema, p as patientTestsSchema, f as doctorSchema, h as testSchema } from "./session-manager-DRdZONnW.mjs";
import { a as getLabIdFromRequest } from "./helpers-VjNq_44e.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const PatientSearchSchema = z.object({
  phoneNumber: z.number().int().positive()
});
const PatientCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().int().positive().optional(),
  gender: z.string().optional(),
  phoneNumber: z.number().int().positive(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.number().int().optional()
});
const PatientTestRegistrationSchema = z.object({
  patientId: z.number().int().positive(),
  testIds: z.array(z.number().int().positive()),
  doctorId: z.number().int().positive().optional(),
  reportDeliveryDate: z.string().optional(),
  discount: z.string().optional(),
  tax: z.string().optional(),
  totalAmount: z.string(),
  finalAmount: z.string(),
  isPaid: z.boolean().default(true)
});
const PatientUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2).optional(),
  age: z.number().int().positive().optional(),
  gender: z.string().optional(),
  phoneNumber: z.number().int().positive().optional(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.number().int().optional()
});
const PatientListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "phoneNumber"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const PatientIdSchema = z.object({
  id: z.number().int().positive()
});
const BulkDeleteSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1, "At least one patient ID is required")
});
const searchPatientByPhone_createServerFn_handler = createServerRpc("88b7c6e3e8e9d3afe9bdf1dfd993ff2f25f7170ff5fde2d644329132fdf4665e", (opts, signal) => {
  return searchPatientByPhone.__executeServer(opts, signal);
});
const searchPatientByPhone = createServerFn({
  method: "GET"
}).inputValidator(PatientSearchSchema).handler(searchPatientByPhone_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.phoneNumber, data.phoneNumber),
      eq(patientSchema.labId, labId)
      // CRITICAL: Filter by labId
    )).limit(1);
    if (!patient) {
      return {
        success: true,
        exists: false,
        message: "Patient not found. Please register."
      };
    }
    return {
      success: true,
      exists: true,
      data: patient
    };
  } catch (error) {
    console.error("Error searching patient:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to search patient");
  }
});
const createPatientWithTests_createServerFn_handler = createServerRpc("2ddda0a102698d7e2e60e969ca3027b5f8dec902c1d9ee8c29bf372338ae212f", (opts, signal) => {
  return createPatientWithTests.__executeServer(opts, signal);
});
const createPatientWithTests = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  isNewPatient: z.boolean().default(true),
  patientId: z.number().int().positive().optional(),
  patient: PatientCreateSchema,
  tests: PatientTestRegistrationSchema.omit({
    patientId: true
  })
})).handler(createPatientWithTests_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    let patientId;
    let patientData;
    if (data.isNewPatient) {
      const [newPatient] = await db.insert(patientSchema).values({
        labId,
        // CRITICAL: Assign patient to user's lab
        name: data.patient.name,
        age: data.patient.age || null,
        gender: data.patient.gender || null,
        phoneNumber: data.patient.phoneNumber,
        addressLine1: data.patient.addressLine1 || null,
        city: data.patient.city || null,
        state: data.patient.state || null,
        country: data.patient.country || null,
        pincode: data.patient.pincode || null
      }).returning();
      patientId = newPatient.id;
      patientData = newPatient;
    } else {
      if (!data.patientId) {
        throw new Error("Patient ID is required for registering tests to existing patients. Please search for the patient first.");
      }
      const [existingPatient] = await db.select().from(patientSchema).where(and(eq(patientSchema.id, data.patientId), eq(patientSchema.labId, labId))).limit(1);
      if (!existingPatient) {
        throw new Error("Patient not found or you do not have access to this patient. Please search again.");
      }
      patientId = data.patientId;
      await db.update(patientSchema).set({
        name: data.patient.name,
        age: data.patient.age || null,
        gender: data.patient.gender || null,
        addressLine1: data.patient.addressLine1 || null,
        city: data.patient.city || null,
        state: data.patient.state || null,
        country: data.patient.country || null,
        pincode: data.patient.pincode || null,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(and(eq(patientSchema.id, patientId), eq(patientSchema.labId, labId)));
      const [updated] = await db.select().from(patientSchema).where(and(eq(patientSchema.id, patientId), eq(patientSchema.labId, labId))).limit(1);
      patientData = updated;
    }
    const invoiceNumber = `INV-${labId}-${Date.now()}-${patientId}`;
    const [bill] = await db.insert(billSchema).values({
      labId,
      // CRITICAL: Assign bill to user's lab
      patientId,
      invoiceNumber,
      totalAmount: data.tests.totalAmount,
      discount: data.tests.discount || "0",
      tax: data.tests.tax || "0",
      finalAmount: data.tests.finalAmount,
      isPaid: data.tests.isPaid ?? true
    }).returning();
    const patientTestsInserts = data.tests.testIds.map((testId) => ({
      labId,
      // CRITICAL: Assign test to user's lab
      patientId,
      testId,
      doctorId: data.tests.doctorId || null,
      billId: bill.id,
      status: "pending",
      reportDeliveryDate: data.tests.reportDeliveryDate ? new Date(data.tests.reportDeliveryDate) : null
    }));
    const patientTests = await db.insert(patientTestsSchema).values(patientTestsInserts).returning();
    return {
      success: true,
      message: data.isNewPatient ? "Patient registered successfully" : "Tests added to existing patient successfully",
      data: {
        patient: patientData,
        tests: patientTests,
        bill
      }
    };
  } catch (error) {
    console.error("Error creating patient with tests:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to register patient");
  }
});
const updatePatient_createServerFn_handler = createServerRpc("c9be507217c9d475f5cba5ee979c2141ed64be11ff9f48e1c878f3708d0baa4e", (opts, signal) => {
  return updatePatient.__executeServer(opts, signal);
});
const updatePatient = createServerFn({
  method: "POST"
}).inputValidator(PatientUpdateSchema).handler(updatePatient_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!existing) {
      throw new Error("Patient not found or access denied");
    }
    const [updated] = await db.update(patientSchema).set({
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(patientSchema.id, id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "Patient updated successfully",
      data: updated
    };
  } catch (error) {
    console.error("Error updating patient:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update patient");
  }
});
const getAllPatients_createServerFn_handler = createServerRpc("f8f2093574355cf432609ba4faa9b39fb7a5171543b629a6cd3c64f7408fb7e8", (opts, signal) => {
  return getAllPatients.__executeServer(opts, signal);
});
const getAllPatients = createServerFn({
  method: "GET"
}).inputValidator(PatientListSchema).handler(getAllPatients_createServerFn_handler, async ({
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
    const orderByColumn = patientSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(patientSchema).where(eq(patientSchema.labId, labId));
    const totalCount = Number(countResult[0]?.count || 0);
    const patients = await db.select().from(patientSchema).where(eq(patientSchema.labId, labId)).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: patients,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
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
const searchPatients_createServerFn_handler = createServerRpc("1623252efcf5f98b31b7afd9caf1cce613ab0f72ce8fbe6ade67a53eb62a9090", (opts, signal) => {
  return searchPatients.__executeServer(opts, signal);
});
const searchPatients = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0)
})).handler(searchPatients_createServerFn_handler, async ({
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
    const patients = await db.select().from(patientSchema).where(and(
      eq(patientSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(patientSchema.name, searchPattern), ilike(patientSchema.city, searchPattern), ilike(patientSchema.state, searchPattern))
    )).orderBy(desc(patientSchema.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(patientSchema).where(and(
      eq(patientSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(patientSchema.name, searchPattern), ilike(patientSchema.city, searchPattern), ilike(patientSchema.state, searchPattern))
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: patients,
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching patients:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to search patients");
  }
});
const getPatientWithTests_createServerFn_handler = createServerRpc("e93e61986c068fd6b5a2df790e0d4bfd099cfba1320790f0df20de3eff8b9a6e", (opts, signal) => {
  return getPatientWithTests.__executeServer(opts, signal);
});
const getPatientWithTests = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  id: z.number().int().positive()
})).handler(getPatientWithTests_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, data.id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!patient) {
      throw new Error("Patient not found or access denied");
    }
    const patientTests = await db.select({
      patientTest: patientTestsSchema,
      test: testSchema,
      doctor: doctorSchema
    }).from(patientTestsSchema).leftJoin(testSchema, eq(patientTestsSchema.testId, testSchema.id)).leftJoin(doctorSchema, eq(patientTestsSchema.doctorId, doctorSchema.id)).where(and(
      eq(patientTestsSchema.patientId, data.id),
      eq(patientTestsSchema.labId, labId)
      // CRITICAL: Filter by labId
    ));
    const normalizedTests = patientTests.map((pt) => ({
      ...pt,
      test: pt.test ? {
        ...pt.test,
        metadata: pt.test.metadata || {}
      } : null
    }));
    const bills = await db.select().from(billSchema).where(and(
      eq(billSchema.patientId, data.id),
      eq(billSchema.labId, labId)
      // CRITICAL: Filter by labId
    ));
    return {
      success: true,
      data: {
        patient,
        tests: normalizedTests,
        bills
      }
    };
  } catch (error) {
    console.error("Error fetching patient with tests:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch patient details");
  }
});
const getPatientById_createServerFn_handler = createServerRpc("1265555554103ff0d20d4a9d183747da627d3933399077209b638800eab9673b", (opts, signal) => {
  return getPatientById.__executeServer(opts, signal);
});
const getPatientById = createServerFn({
  method: "GET"
}).inputValidator(PatientIdSchema).handler(getPatientById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, data.id),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!patient) {
      throw new Error("Patient not found or access denied");
    }
    return {
      success: true,
      data: patient
    };
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch patient");
  }
});
const bulkDeletePatients_createServerFn_handler = createServerRpc("dd13b1308a256d04473e96b98fba649f5d50a85253202169ef6b51704ca65a49", (opts, signal) => {
  return bulkDeletePatients.__executeServer(opts, signal);
});
const bulkDeletePatients = createServerFn({
  method: "POST"
}).inputValidator(BulkDeleteSchema).handler(bulkDeletePatients_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const patientsToDelete = await db.select().from(patientSchema).where(and(
      inArray(patientSchema.id, data.ids),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    ));
    if (patientsToDelete.length !== data.ids.length) {
      throw new Error("Some patients not found or access denied");
    }
    await db.delete(billSchema).where(inArray(billSchema.patientId, data.ids));
    await db.delete(patientTestsSchema).where(inArray(patientTestsSchema.patientId, data.ids));
    await db.delete(patientSchema).where(and(inArray(patientSchema.id, data.ids), eq(patientSchema.labId, labId)));
    return {
      success: true,
      message: `Successfully deleted ${patientsToDelete.length} patient(s)`
    };
  } catch (error) {
    console.error("Error deleting patients:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete patients");
  }
});
export {
  bulkDeletePatients_createServerFn_handler,
  createPatientWithTests_createServerFn_handler,
  getAllPatients_createServerFn_handler,
  getPatientById_createServerFn_handler,
  getPatientWithTests_createServerFn_handler,
  searchPatientByPhone_createServerFn_handler,
  searchPatients_createServerFn_handler,
  updatePatient_createServerFn_handler
};
