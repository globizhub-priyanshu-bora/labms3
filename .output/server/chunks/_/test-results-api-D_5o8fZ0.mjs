import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { and, eq, isNull, inArray } from "drizzle-orm";
import { z } from "zod";
import { d as db, a as patientTestsSchema, e as testResultsSchema, c as doctorSchema, t as testSchema, p as patientSchema, b as billSchema, f as testParamSchema } from "./session-manager-DRdZONnW.mjs";
import { g as getLabIdFromRequest } from "./helpers-VjNq_44e.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const TestResultCreateSchema = z.object({
  patientTestId: z.number().int().positive(),
  results: z.array(z.object({
    parameterId: z.number().int().positive(),
    parameterName: z.string(),
    value: z.string(),
    unit: z.string().optional(),
    referenceRange: z.string().optional(),
    isAbnormal: z.boolean().optional(),
    status: z.enum(["Low", "Normal", "High"]).optional()
  })),
  impression: z.string().optional()
});
const TestResultUpdateSchema = z.object({
  id: z.number().int().positive(),
  results: z.array(z.object({
    parameterId: z.number().int().positive(),
    parameterName: z.string(),
    value: z.string(),
    unit: z.string().optional(),
    referenceRange: z.string().optional(),
    isAbnormal: z.boolean().optional(),
    status: z.enum(["Low", "Normal", "High"]).optional()
  })),
  impression: z.string().optional()
});
const PatientTestIdSchema = z.object({
  patientTestId: z.number().int().positive()
});
const TestResultIdSchema = z.object({
  id: z.number().int().positive()
});
const GetTestResultDataSchema = z.object({
  patientTestId: z.number().int().positive()
});
const PatientIdSchema = z.object({
  patientId: z.number().int().positive()
});
const getTestResultData_createServerFn_handler = createServerRpc("9544b1a68e9027e2205ba603b1d881923ac3d31cf90aafd163820d16ba3022e2", (opts, signal) => {
  return getTestResultData.__executeServer(opts, signal);
});
const getTestResultData = createServerFn({
  method: "GET"
}).inputValidator(GetTestResultDataSchema).handler(getTestResultData_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patientTest] = await db.select().from(patientTestsSchema).where(and(
      eq(patientTestsSchema.id, data.patientTestId),
      eq(patientTestsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(patientTestsSchema.deletedAt)
    )).limit(1);
    if (!patientTest) {
      throw new Error("Patient test not found or access denied");
    }
    const [test] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, patientTest.testId),
      eq(testSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!test) {
      throw new Error("Test details not found");
    }
    const [patient] = await db.select().from(patientSchema).where(and(
      eq(patientSchema.id, patientTest.patientId),
      eq(patientSchema.labId, labId)
      // CRITICAL: Verify ownership
    )).limit(1);
    if (!patient) {
      throw new Error("Patient not found");
    }
    let bill = null;
    if (patientTest.billId) {
      [bill] = await db.select().from(billSchema).where(and(
        eq(billSchema.id, patientTest.billId),
        eq(billSchema.labId, labId)
        // CRITICAL: Verify ownership
      )).limit(1);
    }
    let doctor = null;
    if (patientTest.doctorId) {
      [doctor] = await db.select().from(doctorSchema).where(and(
        eq(doctorSchema.id, patientTest.doctorId),
        eq(doctorSchema.labId, labId)
        // CRITICAL: Verify ownership
      )).limit(1);
    }
    const parameterIds = test.metadata?.parameterIds || [];
    let parameters = [];
    if (parameterIds.length > 0) {
      parameters = await db.select().from(testParamSchema).where(and(
        inArray(testParamSchema.id, parameterIds),
        eq(testParamSchema.labId, labId),
        // CRITICAL: Verify ownership
        isNull(testParamSchema.deletedAt)
      ));
    }
    const [existingResult] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.patientTestId, data.patientTestId),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    return {
      success: true,
      data: {
        patientTest,
        test,
        patient,
        doctor,
        bill,
        parameters: parameters.map((p) => ({
          ...p,
          metadata: p.metadata || {},
          referenceRanges: p.referenceRanges || []
        })),
        existingResult: existingResult || null
      }
    };
  } catch (error) {
    console.error("Error fetching test result data:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch test result data");
  }
});
const createTestResult_createServerFn_handler = createServerRpc("1e92e183ed42b1d74db3b54756cfd5f78162e479fc4673dda7d49db2d69c20bb", (opts, signal) => {
  return createTestResult.__executeServer(opts, signal);
});
const createTestResult = createServerFn({
  method: "POST"
}).inputValidator(TestResultCreateSchema).handler(createTestResult_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patientTest] = await db.select().from(patientTestsSchema).where(and(
      eq(patientTestsSchema.id, data.patientTestId),
      eq(patientTestsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(patientTestsSchema.deletedAt)
    )).limit(1);
    if (!patientTest) {
      throw new Error("Patient test not found or access denied");
    }
    const [existing] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.patientTestId, data.patientTestId),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    if (existing) {
      throw new Error("Test results already exist. Use update instead.");
    }
    const resultData = {
      results: data.results,
      impression: data.impression || null
    };
    const [newResult] = await db.insert(testResultsSchema).values({
      labId,
      // CRITICAL: Assign to user's lab
      patientTestId: data.patientTestId,
      result: resultData
    }).returning();
    await db.update(patientTestsSchema).set({
      status: "completed",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(patientTestsSchema.id, data.patientTestId),
      eq(patientTestsSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Test results saved successfully",
      data: newResult
    };
  } catch (error) {
    console.error("Error creating test results:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to save test results");
  }
});
const updateTestResult_createServerFn_handler = createServerRpc("929a4bea83a025b51e4311bb07e0d243f872eafce12f7a17e06be306d1ef5852", (opts, signal) => {
  return updateTestResult.__executeServer(opts, signal);
});
const updateTestResult = createServerFn({
  method: "POST"
}).inputValidator(TestResultUpdateSchema).handler(updateTestResult_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      results,
      impression
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.id, id),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test result not found or access denied");
    }
    const resultData = {
      results,
      impression: impression || null
    };
    const [updated] = await db.update(testResultsSchema).set({
      result: resultData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testResultsSchema.id, id),
      eq(testResultsSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "Test results updated successfully",
      data: updated
    };
  } catch (error) {
    console.error("Error updating test results:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update test results");
  }
});
const getTestResultByPatientTestId_createServerFn_handler = createServerRpc("adb057ad513135ccdbc5f79a5764efb8c875cd8d13f7d7f751fbeeae680d9bc8", (opts, signal) => {
  return getTestResultByPatientTestId.__executeServer(opts, signal);
});
const getTestResultByPatientTestId = createServerFn({
  method: "GET"
}).inputValidator(PatientTestIdSchema).handler(getTestResultByPatientTestId_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [result] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.patientTestId, data.patientTestId),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    return {
      success: true,
      data: result || null
    };
  } catch (error) {
    console.error("Error fetching test result:", error);
    throw new Error("Failed to fetch test result");
  }
});
const deleteTestResult_createServerFn_handler = createServerRpc("534c7a3973e3c4fbc6d0c95627ea83bb341ed4ec6752a90e4e8648117b39c075", (opts, signal) => {
  return deleteTestResult.__executeServer(opts, signal);
});
const deleteTestResult = createServerFn({
  method: "POST"
}).inputValidator(TestResultIdSchema).handler(deleteTestResult_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testResultsSchema).where(and(
      eq(testResultsSchema.id, data.id),
      eq(testResultsSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testResultsSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test result not found or access denied");
    }
    await db.update(testResultsSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testResultsSchema.id, data.id),
      eq(testResultsSchema.labId, labId)
      // CRITICAL
    ));
    await db.update(patientTestsSchema).set({
      status: "pending",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(patientTestsSchema.id, existing.patientTestId),
      eq(patientTestsSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Test result deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting test result:", error);
    throw new Error("Failed to delete test result");
  }
});
const getPatientTestsWithResults_createServerFn_handler = createServerRpc("5475319725572acce855b57c19cd438e43cd99a07395cfe8b8d128f757465d01", (opts, signal) => {
  return getPatientTestsWithResults.__executeServer(opts, signal);
});
const getPatientTestsWithResults = createServerFn({
  method: "GET"
}).inputValidator(PatientIdSchema).handler(getPatientTestsWithResults_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const patientTests = await db.select({
      patientTest: patientTestsSchema,
      test: testSchema,
      doctor: doctorSchema
    }).from(patientTestsSchema).leftJoin(testSchema, eq(patientTestsSchema.testId, testSchema.id)).leftJoin(doctorSchema, eq(patientTestsSchema.doctorId, doctorSchema.id)).where(and(
      eq(patientTestsSchema.patientId, data.patientId),
      eq(patientTestsSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(patientTestsSchema.deletedAt)
    ));
    const testsWithResults = await Promise.all(patientTests.map(async (pt) => {
      const [result] = await db.select().from(testResultsSchema).where(and(
        eq(testResultsSchema.patientTestId, pt.patientTest.id),
        eq(testResultsSchema.labId, labId),
        // CRITICAL: Filter by labId
        isNull(testResultsSchema.deletedAt)
      )).limit(1);
      return {
        ...pt,
        test: pt.test ? {
          ...pt.test,
          metadata: pt.test.metadata || {}
        } : null,
        result: result || null,
        hasResult: !!result
      };
    }));
    return {
      success: true,
      data: testsWithResults
    };
  } catch (error) {
    console.error("Error fetching patient tests with results:", error);
    throw new Error("Failed to fetch patient tests with results");
  }
});
export {
  createTestResult_createServerFn_handler,
  deleteTestResult_createServerFn_handler,
  getPatientTestsWithResults_createServerFn_handler,
  getTestResultByPatientTestId_createServerFn_handler,
  getTestResultData_createServerFn_handler,
  updateTestResult_createServerFn_handler
};
