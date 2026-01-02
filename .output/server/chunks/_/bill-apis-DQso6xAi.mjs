import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { and, eq, isNull, or, desc, count, ilike } from "drizzle-orm";
import { z } from "zod";
import { b as db, p as patientSchema, h as testSchema, i as billSchema, j as patientTestsSchema, l as labSchema, f as doctorSchema } from "./session-manager-DRdZONnW.mjs";
import { g as getLabIdFromRequest } from "./helpers-VjNq_44e.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const BillIdSchema = z.object({
  id: z.number().int().positive()
});
const BillInvoiceSchema = z.object({
  invoiceNumber: z.string().min(1)
});
const BillListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["createdAt", "invoiceNumber", "finalAmount"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const BillUpdateSchema = z.object({
  id: z.number().int().positive(),
  isPaid: z.boolean().optional(),
  discount: z.string().optional(),
  tax: z.string().optional(),
  finalAmount: z.string().optional()
});
const CreateBillSchema = z.object({
  patientId: z.coerce.number().int().positive(),
  testIds: z.array(z.coerce.number().int().positive()),
  discount: z.number().min(0).max(100).default(0),
  tax: z.number().min(0).max(100).default(0)
});
const getBillById_createServerFn_handler = createServerRpc("f92db8bdce09118a362d19980bc6e5e9abc700027626a5f05984458477de49a1", (opts, signal) => {
  return getBillById.__executeServer(opts, signal);
});
const getBillById = createServerFn({
  method: "GET"
}).inputValidator(BillIdSchema).handler(getBillById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [bill] = await db.select().from(billSchema).where(and(
      eq(billSchema.id, data.id),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!bill) {
      throw new Error("Bill not found or access denied");
    }
    const [lab] = await db.select().from(labSchema).where(eq(labSchema.id, labId)).limit(1);
    const [patient] = await db.select().from(patientSchema).where(eq(patientSchema.id, bill.patientId)).limit(1);
    const patientTests = await db.select({
      patientTest: patientTestsSchema,
      test: testSchema,
      doctor: doctorSchema
    }).from(patientTestsSchema).leftJoin(testSchema, eq(patientTestsSchema.testId, testSchema.id)).leftJoin(doctorSchema, eq(patientTestsSchema.doctorId, doctorSchema.id)).where(eq(patientTestsSchema.billId, bill.id));
    const normalizedTests = patientTests.map((pt) => ({
      ...pt,
      test: pt.test ? {
        ...pt.test,
        metadata: pt.test.metadata || {}
      } : null
    }));
    return {
      success: true,
      data: {
        bill,
        lab,
        patient,
        tests: normalizedTests
      }
    };
  } catch (error) {
    console.error("Error fetching bill:", error);
    throw new Error("Failed to fetch bill");
  }
});
const getBillByInvoiceNumber_createServerFn_handler = createServerRpc("b3c59b70ed69a28aeba6173a683c0fcf6a93e795e2005231ce2e85f74120a05a", (opts, signal) => {
  return getBillByInvoiceNumber.__executeServer(opts, signal);
});
const getBillByInvoiceNumber = createServerFn({
  method: "GET"
}).inputValidator(BillInvoiceSchema).handler(getBillByInvoiceNumber_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [bill] = await db.select().from(billSchema).where(and(
      eq(billSchema.invoiceNumber, data.invoiceNumber),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!bill) {
      throw new Error("Bill not found");
    }
    return {
      success: true,
      data: bill
    };
  } catch (error) {
    console.error("Error fetching bill by invoice:", error);
    throw new Error("Failed to fetch bill");
  }
});
const getAllBills_createServerFn_handler = createServerRpc("f780fb6379629698039faabfe5c4d357289df1cb4637e17d3d91bc5e3fc62997", (opts, signal) => {
  return getAllBills.__executeServer(opts, signal);
});
const getAllBills = createServerFn({
  method: "GET"
}).inputValidator(BillListSchema).handler(getAllBills_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const {
      limit,
      offset,
      sortBy,
      sortOrder
    } = data;
    const bills = await db.select({
      bill: billSchema,
      patient: patientSchema
    }).from(billSchema).leftJoin(patientSchema, eq(billSchema.patientId, patientSchema.id)).where(and(eq(billSchema.labId, labId), isNull(billSchema.deletedAt))).orderBy(sortOrder === "asc" ? billSchema[sortBy] : desc(billSchema[sortBy])).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(billSchema).where(and(eq(billSchema.labId, labId), isNull(billSchema.deletedAt)));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: bills,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw new Error("Failed to fetch bills");
  }
});
const updateBill_createServerFn_handler = createServerRpc("076f63fa49b79d248b4ec77ce1f7ad773960f371253cb297d5d34e30562a7e6f", (opts, signal) => {
  return updateBill.__executeServer(opts, signal);
});
const updateBill = createServerFn({
  method: "POST"
}).inputValidator(BillUpdateSchema).handler(updateBill_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existingBill] = await db.select().from(billSchema).where(and(
      eq(billSchema.id, data.id),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!existingBill) {
      throw new Error("Bill not found or access denied");
    }
    const updateData = {
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (data.isPaid !== void 0) updateData.isPaid = data.isPaid;
    if (data.discount !== void 0) updateData.discount = data.discount;
    if (data.tax !== void 0) updateData.tax = data.tax;
    if (data.finalAmount !== void 0) updateData.finalAmount = data.finalAmount;
    const [updatedBill] = await db.update(billSchema).set(updateData).where(eq(billSchema.id, data.id)).returning();
    return {
      success: true,
      data: updatedBill,
      message: "Bill updated successfully"
    };
  } catch (error) {
    console.error("Error updating bill:", error);
    throw new Error("Failed to update bill");
  }
});
const markBillAsPaid_createServerFn_handler = createServerRpc("4f80872130608d08ab0eabb65a626bd4fd8bc1344f43710133f97b863985b048", (opts, signal) => {
  return markBillAsPaid.__executeServer(opts, signal);
});
const markBillAsPaid = createServerFn({
  method: "POST"
}).inputValidator(BillIdSchema).handler(markBillAsPaid_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [bill] = await db.select().from(billSchema).where(and(
      eq(billSchema.id, data.id),
      eq(billSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(billSchema.deletedAt)
    )).limit(1);
    if (!bill) {
      throw new Error("Bill not found or access denied");
    }
    const [updatedBill] = await db.update(billSchema).set({
      isPaid: true,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(billSchema.id, data.id)).returning();
    return {
      success: true,
      data: updatedBill,
      message: "Bill marked as paid"
    };
  } catch (error) {
    console.error("Error marking bill as paid:", error);
    throw new Error("Failed to mark bill as paid");
  }
});
const searchBills_createServerFn_handler = createServerRpc("ef4ee991aefd308a17fdb0c859c233536daeaa3078e8376a00c82487335d1b25", (opts, signal) => {
  return searchBills.__executeServer(opts, signal);
});
const searchBills = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0)
})).handler(searchBills_createServerFn_handler, async ({
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
    const bills = await db.select({
      bill: billSchema,
      patient: patientSchema
    }).from(billSchema).leftJoin(patientSchema, eq(billSchema.patientId, patientSchema.id)).where(and(
      eq(billSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(billSchema.invoiceNumber, searchPattern), ilike(patientSchema.name, searchPattern)),
      isNull(billSchema.deletedAt)
    )).orderBy(desc(billSchema.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(billSchema).leftJoin(patientSchema, eq(billSchema.patientId, patientSchema.id)).where(and(
      eq(billSchema.labId, labId),
      // CRITICAL: Filter by labId
      or(ilike(billSchema.invoiceNumber, searchPattern), ilike(patientSchema.name, searchPattern)),
      isNull(billSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: bills,
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching bills:", error);
    throw new Error("Failed to search bills");
  }
});
const createBill_createServerFn_handler = createServerRpc("97ddf72c598e878cce67459468ec608dac486714304c1d3038b759ce0c485f24", (opts, signal) => {
  return createBill.__executeServer(opts, signal);
});
const createBill = createServerFn({
  method: "POST"
}).inputValidator(CreateBillSchema).handler(createBill_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [patient] = await db.select().from(patientSchema).where(and(eq(patientSchema.id, data.patientId), eq(patientSchema.labId, labId), isNull(patientSchema.deletedAt))).limit(1);
    if (!patient) {
      throw new Error("Patient not found or access denied");
    }
    const selectedTests = await db.select().from(testSchema).where(and(eq(testSchema.labId, labId), data.testIds.length > 0 ? or(...data.testIds.map((id) => eq(testSchema.id, id))) : void 0));
    if (selectedTests.length === 0) {
      throw new Error("No valid tests found");
    }
    const subtotal = selectedTests.reduce((sum, test) => {
      return sum + (parseFloat(test.price || "0") || 0);
    }, 0);
    const discountAmount = subtotal * data.discount / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * data.tax / 100;
    const finalAmount = afterDiscount + taxAmount;
    const now = /* @__PURE__ */ new Date();
    const invoiceNumber = `INV-${labId}-${now.getTime()}`;
    const [newBill] = await db.insert(billSchema).values({
      labId,
      patientId: data.patientId,
      invoiceNumber,
      subtotal: subtotal.toString(),
      discount: data.discount.toString(),
      tax: data.tax.toString(),
      finalAmount: finalAmount.toString(),
      isPaid: false,
      createdAt: now,
      updatedAt: now
    }).returning();
    if (newBill) {
      await db.insert(patientTestsSchema).values(selectedTests.map((test) => ({
        patientId: data.patientId,
        testId: test.id,
        billId: newBill.id,
        result: null,
        createdAt: now,
        updatedAt: now
      })));
    }
    return {
      success: true,
      data: newBill,
      message: "Bill created successfully"
    };
  } catch (error) {
    console.error("Error creating bill:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create bill");
  }
});
export {
  createBill_createServerFn_handler,
  getAllBills_createServerFn_handler,
  getBillById_createServerFn_handler,
  getBillByInvoiceNumber_createServerFn_handler,
  markBillAsPaid_createServerFn_handler,
  searchBills_createServerFn_handler,
  updateBill_createServerFn_handler
};
