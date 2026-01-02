import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import bcrypt from "bcryptjs";
import { eq, and, isNull, desc, count, ne } from "drizzle-orm";
import { z } from "zod";
import { d as db, u as userSchema } from "./session-manager-CtAttBZO.mjs";
import { a as getUserFromRequest, g as getLabIdFromRequest } from "./helpers-BpXhOhAI.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Role is required"),
  phoneNumber: z.number().int().positive().optional(),
  permissions: z.object({
    patients: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    bills: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    tests: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    parameters: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    doctors: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    reports: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    users: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional()
  })
});
const UpdateUserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  role: z.string().min(1).optional(),
  phoneNumber: z.number().int().positive().optional(),
  permissions: z.object({
    patients: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    bills: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    tests: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    parameters: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    doctors: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    reports: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional(),
    users: z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean()
    }).optional()
  }).optional()
});
const UserIdSchema = z.object({
  id: z.number().int().positive()
});
const UserListSchema = z.object({
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(["name", "createdAt", "role", "email"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});
const createUser_createServerFn_handler = createServerRpc("2ebbe331e59ad581a81bb5e90852666a0c0e00b858cc4ca3b8b770c45469e288", (opts, signal) => {
  return createUser.__executeServer(opts, signal);
});
const createUser = createServerFn({
  method: "POST"
}).inputValidator(CreateUserSchema).handler(createUser_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const currentUser = await getUserFromRequest(request);
    const labId = await getLabIdFromRequest(request);
    const existingUser = await db.select().from(userSchema).where(eq(userSchema.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("Email already exists");
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const [newUser] = await db.insert(userSchema).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      phoneNumber: data.phoneNumber || null,
      permissions: data.permissions,
      isAdmin: false,
      createdBy: currentUser.id,
      labId,
      // CRITICAL: Assign to current user's lab
      hasCompletedSetup: true
      // New users inherit lab setup
    }).returning();
    return {
      success: true,
      message: "User created successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        permissions: newUser.permissions,
        isAdmin: newUser.isAdmin
      }
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create user");
  }
});
const getAllUsers_createServerFn_handler = createServerRpc("16cf2e1d8110b30236f86f4674f057330fda70584dc3fc37bf8ad42310052c35", (opts, signal) => {
  return getAllUsers.__executeServer(opts, signal);
});
const getAllUsers = createServerFn({
  method: "GET"
}).inputValidator(UserListSchema).handler(getAllUsers_createServerFn_handler, async ({
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
    const labId = await getLabIdFromRequest(request);
    const orderByColumn = userSchema[sortBy];
    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : orderByColumn;
    const countResult = await db.select({
      count: count()
    }).from(userSchema).where(and(
      eq(userSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(userSchema.deletedAt)
    ));
    const totalCount = Number(countResult[0]?.count || 0);
    const users = await db.select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      role: userSchema.role,
      phoneNumber: userSchema.phoneNumber,
      permissions: userSchema.permissions,
      isAdmin: userSchema.isAdmin,
      createdAt: userSchema.createdAt,
      updatedAt: userSchema.updatedAt
    }).from(userSchema).where(and(
      eq(userSchema.labId, labId),
      // CRITICAL: Filter by labId
      isNull(userSchema.deletedAt)
    )).orderBy(orderBy).limit(limit).offset(offset);
    return {
      success: true,
      data: users,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
});
const getUserById_createServerFn_handler = createServerRpc("a4cfac5ab013dbdfc4fce6241a731ff2b94401c72afa868c8033486e498f35d3", (opts, signal) => {
  return getUserById.__executeServer(opts, signal);
});
const getUserById = createServerFn({
  method: "GET"
}).inputValidator(UserIdSchema).handler(getUserById_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [user] = await db.select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      role: userSchema.role,
      phoneNumber: userSchema.phoneNumber,
      permissions: userSchema.permissions,
      isAdmin: userSchema.isAdmin,
      createdAt: userSchema.createdAt,
      updatedAt: userSchema.updatedAt
    }).from(userSchema).where(and(
      eq(userSchema.id, data.id),
      eq(userSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(userSchema.deletedAt)
    )).limit(1);
    if (!user) {
      throw new Error("User not found or access denied");
    }
    return {
      success: true,
      data: user
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch user");
  }
});
const updateUser_createServerFn_handler = createServerRpc("50299f7d500516c957d4cebbe56ccc63ce8e3d70a295fb4e98ed657ef1ab5427", (opts, signal) => {
  return updateUser.__executeServer(opts, signal);
});
const updateUser = createServerFn({
  method: "POST"
}).inputValidator(UpdateUserSchema).handler(updateUser_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const {
      id,
      password,
      ...updateData
    } = data;
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(userSchema).where(and(
      eq(userSchema.id, id),
      eq(userSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(userSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("User not found or access denied");
    }
    if (updateData.email && updateData.email !== existing.email) {
      const [duplicate] = await db.select().from(userSchema).where(and(eq(userSchema.email, updateData.email), ne(userSchema.id, id), isNull(userSchema.deletedAt))).limit(1);
      if (duplicate) {
        throw new Error("Email already exists");
      }
    }
    const updateValues = {
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (password) {
      const saltRounds = 12;
      updateValues.password = await bcrypt.hash(password, saltRounds);
    }
    const [updated] = await db.update(userSchema).set(updateValues).where(and(
      eq(userSchema.id, id),
      eq(userSchema.labId, labId)
      // CRITICAL: Ensure update is for user's lab
    )).returning();
    return {
      success: true,
      message: "User updated successfully",
      data: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        phoneNumber: updated.phoneNumber,
        permissions: updated.permissions,
        isAdmin: updated.isAdmin
      }
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update user");
  }
});
const deleteUser_createServerFn_handler = createServerRpc("1d4bd1f7515f038c36c633a90c3e0dbe63010b09b76b2b2bbfebda95954528b2", (opts, signal) => {
  return deleteUser.__executeServer(opts, signal);
});
const deleteUser = createServerFn({
  method: "POST"
}).inputValidator(UserIdSchema).handler(deleteUser_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [existing] = await db.select().from(userSchema).where(and(
      eq(userSchema.id, data.id),
      eq(userSchema.labId, labId),
      // CRITICAL: Verify ownership
      isNull(userSchema.deletedAt)
    )).limit(1);
    if (!existing) {
      throw new Error("User not found or access denied");
    }
    if (existing.isAdmin) {
      throw new Error("Cannot delete admin accounts");
    }
    await db.update(userSchema).set({
      deletedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(and(
      eq(userSchema.id, data.id),
      eq(userSchema.labId, labId)
      // CRITICAL
    ));
    return {
      success: true,
      message: "User deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to delete user");
  }
});
export {
  createUser_createServerFn_handler,
  deleteUser_createServerFn_handler,
  getAllUsers_createServerFn_handler,
  getUserById_createServerFn_handler,
  updateUser_createServerFn_handler
};
