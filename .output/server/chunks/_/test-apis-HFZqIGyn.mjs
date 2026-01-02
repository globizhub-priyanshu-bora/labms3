import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { and, inArray, eq, isNull, desc, count, ilike, ne } from "drizzle-orm";
import { z } from "zod";
import { d as db, e as testParamSchema, t as testSchema } from "./session-manager-CtAttBZO.mjs";
import { g as getLabIdFromRequest } from "./helpers-BpXhOhAI.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const TestCreateSchema = z.object({
  name: z.string().min(1, "Test name is required"),
  price: z.string().min(1, "Price is required"),
  parameterIds: z.array(z.number().int().positive()).default([]),
  metadata: z.any().optional()
});
const TestUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).optional(),
  price: z.string().optional(),
  parameterIds: z.array(z.number().int().positive()).optional(),
  metadata: z.any().optional()
});
const TestIdSchema = z.object({
  id: z.number().int().positive()
});
const TestSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0)
});
const TestListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "price"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc")
});
const CalculatePriceSchema = z.object({
  parameterIds: z.array(z.number().int().positive())
});
const calculateTestPrice_createServerFn_handler = createServerRpc("eb1d14c8d6a9b119928a19fe1231bc4ad90c2383e46a87da4e08c98f410062fa", (opts, signal) => {
  return calculateTestPrice.__executeServer(opts, signal);
});
const calculateTestPrice = createServerFn({
  method: "POST"
}).inputValidator(CalculatePriceSchema).handler(calculateTestPrice_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    if (data.parameterIds.length === 0) {
      return {
        success: true,
        totalPrice: "0",
        parameters: []
      };
    }
    const labId = await getLabIdFromRequest(request);
    const parameters = await db.select().from(testParamSchema).where(and(
      inArray(testParamSchema.id, data.parameterIds),
      eq(testParamSchema.labId, labId),
      // CRITICAL: Only user's lab
      isNull(testParamSchema.deletedAt)
    ));
    const totalPrice = parameters.reduce((sum, param) => {
      const price = parseFloat(param.price || "0");
      return sum + price;
    }, 0);
    return {
      success: true,
      totalPrice: totalPrice.toFixed(2),
      parameters: parameters.map((p) => ({
        ...p,
        metadata: p.metadata || {}
      }))
    };
  } catch (error) {
    console.error("Error calculating test price:", error);
    throw new Error("Failed to calculate test price");
  }
});
const createTest_createServerFn_handler = createServerRpc("637fa0a6cb974ee0ad13740d89fa64759b27d6f06f21154eba5a4ccef9e9e623", (opts, signal) => {
  return createTest.__executeServer(opts, signal);
});
const createTest = createServerFn({
  method: "POST"
}).inputValidator(TestCreateSchema).handler(createTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const existing = await db.select().from(testSchema).where(and(
      eq(testSchema.name, data.name),
      eq(testSchema.labId, labId),
      // CRITICAL
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (existing.length > 0) {
      throw new Error("A test with this name already exists");
    }
    const metadata = {
      ...data.metadata || {},
      parameterIds: data.parameterIds
    };
    const [newTest] = await db.insert(testSchema).values({
      labId,
      // CRITICAL: Assign to user's lab
      name: data.name,
      price: data.price,
      metadata
    }).returning();
    return {
      success: true,
      message: "Test created successfully",
      data: {
        ...newTest,
        metadata: newTest.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error creating test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create test");
  }
});
const getAllTests_createServerFn_handler = createServerRpc("858a035ba8fe3e986049d70d2e2c78a274ee1b54703c81c0f747d341b815b0bf", (opts, signal) => {
  return getAllTests.__executeServer(opts, signal);
});
const getAllTests = createServerFn({
  method: "GET"
}).inputValidator(TestListSchema).handler(getAllTests_createServerFn_handler, async ({
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
    const orderByColumn = testSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      isNull(testSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    const tests = await db.select().from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      isNull(testSchema.deletedAt)
    )).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: tests.map((t) => ({
        ...t,
        metadata: t.metadata || {}
      })),
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching tests:", error);
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
const searchTests_createServerFn_handler = createServerRpc("1d31eacb2464df9513f187bfb8438460098d091c006e11adf097692b0bbe11c1", (opts, signal) => {
  return searchTests.__executeServer(opts, signal);
});
const searchTests = createServerFn({
  method: "GET"
}).inputValidator(TestSearchSchema).handler(searchTests_createServerFn_handler, async ({
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
    const tests = await db.select().from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      ilike(testSchema.name, searchPattern),
      isNull(testSchema.deletedAt)
    )).orderBy(testSchema.name).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(testSchema).where(and(
      eq(testSchema.labId, labId),
      // CRITICAL
      ilike(testSchema.name, searchPattern),
      isNull(testSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: tests.map((t) => ({
        ...t,
        metadata: t.metadata || {}
      })),
      query,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error searching tests:", error);
    throw new Error("Failed to search tests");
  }
});
const getTestById_createServerFn_handler = createServerRpc("5f896f4cd6c0e010abc051ec335ff7e2c13b6fe1b805bf0cdf3ff056e7912ca9", (opts, signal) => {
  return getTestById.__executeServer(opts, signal);
});
const getTestById = createServerFn({
  method: "GET"
}).inputValidator(TestIdSchema).handler(getTestById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [test] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (!test) {
      throw new Error("Test not found");
    }
    const parameterIds = test.metadata?.parameterIds || [];
    let parameters = [];
    if (parameterIds.length > 0) {
      parameters = await db.select().from(testParamSchema).where(and(
        inArray(testParamSchema.id, parameterIds),
        eq(testParamSchema.labId, labId),
        // CRITICAL
        isNull(testParamSchema.deletedAt)
      ));
    }
    return {
      success: true,
      data: {
        ...test,
        metadata: test.metadata || {},
        parameters: parameters.map((p) => ({
          ...p,
          metadata: p.metadata || {}
        }))
      }
    };
  } catch (error) {
    console.error("Error fetching test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch test");
  }
});
const updateTest_createServerFn_handler = createServerRpc("7d6e6eb88891a2eee6ac2ef7154cdb493c084d5f6498c9cf5c67b858c04db855", (opts, signal) => {
  return updateTest.__executeServer(opts, signal);
});
const updateTest = createServerFn({
  method: "POST"
}).inputValidator(TestUpdateSchema).handler(updateTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      parameterIds,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, id),
      eq(testSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test not found");
    }
    if (updateData.name && updateData.name !== existing.name) {
      const [duplicate] = await db.select().from(testSchema).where(and(
        eq(testSchema.name, updateData.name),
        eq(testSchema.labId, labId),
        // CRITICAL
        ne(testSchema.id, id),
        isNull(testSchema.deletedAt)
      )).limit(1);
      if (duplicate) {
        throw new Error("A test with this name already exists");
      }
    }
    let metadata = existing.metadata;
    if (parameterIds !== void 0) {
      metadata = {
        ...metadata || {},
        parameterIds
      };
    }
    const [updated] = await db.update(testSchema).set({
      ...updateData,
      metadata,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testSchema.id, id),
      eq(testSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "Test updated successfully",
      data: {
        ...updated,
        metadata: updated.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error updating test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update test");
  }
});
const deleteTest_createServerFn_handler = createServerRpc("79a57f0a6ebc6fa335dccfe8cdfa1727e5be684d513c257755fdb209a1670baa", (opts, signal) => {
  return deleteTest.__executeServer(opts, signal);
});
const deleteTest = createServerFn({
  method: "POST"
}).inputValidator(TestIdSchema).handler(deleteTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testSchema).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(testSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("Test not found");
    }
    await db.update(testSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "Test deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete test");
  }
});
const restoreTest_createServerFn_handler = createServerRpc("56f6533ed64761137df96642690335ce6fa8490cac01f564994b6518a93b36b2", (opts, signal) => {
  return restoreTest.__executeServer(opts, signal);
});
const restoreTest = createServerFn({
  method: "POST"
}).inputValidator(TestIdSchema).handler(restoreTest_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [restored] = await db.update(testSchema).set({
      deletedAt: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(testSchema.id, data.id),
      eq(testSchema.labId, labId)
      // CRITICAL
    )).returning();
    if (!restored) {
      throw new Error("Test not found");
    }
    return {
      success: true,
      message: "Test restored successfully",
      data: {
        ...restored,
        metadata: restored.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error restoring test:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to restore test");
  }
});
export {
  calculateTestPrice_createServerFn_handler,
  createTest_createServerFn_handler,
  deleteTest_createServerFn_handler,
  getAllTests_createServerFn_handler,
  getTestById_createServerFn_handler,
  restoreTest_createServerFn_handler,
  searchTests_createServerFn_handler,
  updateTest_createServerFn_handler
};
