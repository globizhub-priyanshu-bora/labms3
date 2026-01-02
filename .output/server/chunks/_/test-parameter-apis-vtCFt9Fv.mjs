import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { and, eq, isNull, desc, count, or, ilike, ne } from "drizzle-orm";
import { z } from "zod";
import { d as db, k as testParamSchema } from "./session-manager-DRdZONnW.mjs";
import { a as getLabIdFromRequest } from "./helpers-VjNq_44e.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const ReferenceRangeSchema = z.object({
  ageGroup: z.string(),
  // "child", "adult", "senior"
  gender: z.string(),
  // "Male", "Female", "Any"
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
  minValue: z.string(),
  maxValue: z.string()
});
const TestParamCreateSchema = z.object({
  name: z.string().min(1, "Parameter name is required"),
  unit: z.string().optional(),
  price: z.string().optional(),
  referenceRanges: z.array(ReferenceRangeSchema).optional(),
  // NEW
  metadata: z.any().optional()
});
const TestParamUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).optional(),
  unit: z.string().optional(),
  price: z.string().optional(),
  referenceRanges: z.array(ReferenceRangeSchema).optional(),
  // NEW
  metadata: z.any().optional()
});
const TestParamIdSchema = z.object({
  id: z.number().int().positive()
});
const TestParamSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0)
});
const TestParamListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "price"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc")
});
const createTestParameter_createServerFn_handler = createServerRpc("866e013d630692cace706289cf850c03b2e8b7525cadcd4706c7a4ca0f40c872", (opts, signal) => {
  return createTestParameter.__executeServer(opts, signal);
});
const createTestParameter = createServerFn({
  method: "POST"
}).inputValidator(TestParamCreateSchema).handler(createTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const existing = await db.select().from(testParamSchema).where(and(eq(testParamSchema.name, data.name), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (existing.length > 0) {
      throw new Error("A parameter with this name already exists");
    }
    const [newParam] = await db.insert(testParamSchema).values({
      labId,
      name: data.name,
      unit: data.unit || null,
      price: data.price || null,
      referenceRanges: data.referenceRanges || null,
      // NEW
      metadata: data.metadata || null
    }).returning();
    return {
      success: true,
      message: "Test parameter created successfully",
      data: {
        ...newParam,
        metadata: newParam.metadata || {}
      }
    };
  } catch (error) {
    console.error("Error creating test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create test parameter");
  }
});
const getAllTestParameters_createServerFn_handler = createServerRpc("9c8f0900160bae46a845536c1c878b268fdec731ff2c8bc5c6f18073dca787c4", (opts, signal) => {
  return getAllTestParameters.__executeServer(opts, signal);
});
const getAllTestParameters = createServerFn({
  method: "GET"
}).inputValidator(TestParamListSchema).handler(getAllTestParameters_createServerFn_handler, async ({
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
    const orderByColumn = testParamSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(testParamSchema).where(and(eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt)));
    const totalCount = Number(countResult[0]?.count || 0);
    const parameters = await db.select().from(testParamSchema).where(and(eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: parameters.map((p) => ({
        ...p,
        metadata: p.metadata || {},
        referenceRanges: p.referenceRanges || []
        // NEW
      })),
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching test parameters:", error);
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
const searchTestParameters_createServerFn_handler = createServerRpc("0388eaaa61b7f81a1942a5e405b75a7191876ac918e5ba9a72e580ed165c34f3", (opts, signal) => {
  return searchTestParameters.__executeServer(opts, signal);
});
const searchTestParameters = createServerFn({
  method: "GET"
}).inputValidator(TestParamSearchSchema).handler(searchTestParameters_createServerFn_handler, async ({
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
    const parameters = await db.select().from(testParamSchema).where(and(eq(testParamSchema.labId, labId), or(ilike(testParamSchema.name, searchPattern), ilike(testParamSchema.unit, searchPattern)), isNull(testParamSchema.deletedAt))).orderBy(testParamSchema.name).limit(limit).offset(offset);
    const countResult = await db.select({
      count: count()
    }).from(testParamSchema).where(and(eq(testParamSchema.labId, labId), or(ilike(testParamSchema.name, searchPattern), ilike(testParamSchema.unit, searchPattern)), isNull(testParamSchema.deletedAt)));
    const totalCount = Number(countResult[0]?.count || 0);
    return {
      success: true,
      data: parameters.map((p) => ({
        ...p,
        metadata: p.metadata || {},
        referenceRanges: p.referenceRanges || []
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
    console.error("Error searching test parameters:", error);
    throw new Error("Failed to search test parameters");
  }
});
const getTestParameterById_createServerFn_handler = createServerRpc("cff0fc9e1e697678742ffcecccbf079f07115c4109ce1d08d008914f2f490a10", (opts, signal) => {
  return getTestParameterById.__executeServer(opts, signal);
});
const getTestParameterById = createServerFn({
  method: "GET"
}).inputValidator(TestParamIdSchema).handler(getTestParameterById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [parameter] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (!parameter) {
      throw new Error("Test parameter not found");
    }
    return {
      success: true,
      data: {
        ...parameter,
        metadata: parameter.metadata || {},
        referenceRanges: parameter.referenceRanges || []
      }
    };
  } catch (error) {
    console.error("Error fetching test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch test parameter");
  }
});
const updateTestParameter_createServerFn_handler = createServerRpc("89320401cbd68179409c80ee1d04eb642a9512b752b4b3c464616a03ad0c3eea", (opts, signal) => {
  return updateTestParameter.__executeServer(opts, signal);
});
const updateTestParameter = createServerFn({
  method: "POST"
}).inputValidator(TestParamUpdateSchema).handler(updateTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.id, id), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (!existing) {
      throw new Error("Test parameter not found");
    }
    if (updateData.name && updateData.name !== existing.name) {
      const [duplicate] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.name, updateData.name), eq(testParamSchema.labId, labId), ne(testParamSchema.id, id), isNull(testParamSchema.deletedAt))).limit(1);
      if (duplicate) {
        throw new Error("A parameter with this name already exists");
      }
    }
    const [updated] = await db.update(testParamSchema).set({
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(testParamSchema.id, id), eq(testParamSchema.labId, labId))).returning();
    return {
      success: true,
      message: "Test parameter updated successfully",
      data: {
        ...updated,
        metadata: updated.metadata || {},
        referenceRanges: updated.referenceRanges || []
      }
    };
  } catch (error) {
    console.error("Error updating test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update test parameter");
  }
});
const deleteTestParameter_createServerFn_handler = createServerRpc("1751a1fc416db730f7528d13b6531bdb2b51d1129b7b4d17421297247f982d3c", (opts, signal) => {
  return deleteTestParameter.__executeServer(opts, signal);
});
const deleteTestParameter = createServerFn({
  method: "POST"
}).inputValidator(TestParamIdSchema).handler(deleteTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(testParamSchema).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId), isNull(testParamSchema.deletedAt))).limit(1);
    if (!existing) {
      throw new Error("Test parameter not found");
    }
    await db.update(testParamSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId)));
    return {
      success: true,
      message: "Test parameter deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete test parameter");
  }
});
const restoreTestParameter_createServerFn_handler = createServerRpc("187263fe889609bed8f64002c35873b22ba56af05158412d579789d39e3a0680", (opts, signal) => {
  return restoreTestParameter.__executeServer(opts, signal);
});
const restoreTestParameter = createServerFn({
  method: "POST"
}).inputValidator(TestParamIdSchema).handler(restoreTestParameter_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [restored] = await db.update(testParamSchema).set({
      deletedAt: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(eq(testParamSchema.id, data.id), eq(testParamSchema.labId, labId))).returning();
    if (!restored) {
      throw new Error("Test parameter not found");
    }
    return {
      success: true,
      message: "Test parameter restored successfully",
      data: {
        ...restored,
        metadata: restored.metadata || {},
        referenceRanges: restored.referenceRanges || []
      }
    };
  } catch (error) {
    console.error("Error restoring test parameter:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to restore test parameter");
  }
});
export {
  createTestParameter_createServerFn_handler,
  deleteTestParameter_createServerFn_handler,
  getAllTestParameters_createServerFn_handler,
  getTestParameterById_createServerFn_handler,
  restoreTestParameter_createServerFn_handler,
  searchTestParameters_createServerFn_handler,
  updateTestParameter_createServerFn_handler
};
