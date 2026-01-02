import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { g as getSessionFromRequest, d as deleteSession, a as getSession, b as db, u as userSchema, c as updateSession, e as createSession, l as labSchema } from "./session-manager-DRdZONnW.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  phoneNumber: z.number().int().positive().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});
const LabSetupSchema = z.object({
  name: z.string().min(2, "Lab name is required"),
  addressLine1: z.string().optional(),
  gstinNumber: z.string().optional(),
  registrationNumber: z.string().min(1, "Registration number is required"),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.number().int().optional(),
  phoneNumber: z.number().int().positive().optional(),
  email: z.string().email().optional()
});
const registerUser_createServerFn_handler = createServerRpc("0c005628ac49757db198f125d1a498626067a86ca2f0f4afa5c9f1f0b43cc0dd", (opts, signal) => {
  return registerUser.__executeServer(opts, signal);
});
const registerUser = createServerFn({
  method: "POST"
}).inputValidator(RegisterSchema).handler(registerUser_createServerFn_handler, async ({
  data
}) => {
  try {
    const existingUser = await db.select().from(userSchema).where(eq(userSchema.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("Email already registered");
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const [newUser] = await db.insert(userSchema).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "Admin",
      isAdmin: true,
      permissions: {},
      phoneNumber: data.phoneNumber || null,
      labId: null,
      hasCompletedSetup: false,
      createdBy: null
    }).returning();
    return {
      success: true,
      message: "Registration successful. Please complete lab setup.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isAdmin: newUser.isAdmin,
        hasCompletedSetup: newUser.hasCompletedSetup
      }
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error instanceof Error ? error.message : "Registration failed");
  }
});
const setupLab_createServerFn_handler = createServerRpc("db4ebd3ba6391de77039712065a7b3d52b648b08a812676533a82e20375101ea", (opts, signal) => {
  return setupLab.__executeServer(opts, signal);
});
const setupLab = createServerFn({
  method: "POST"
}).inputValidator(LabSetupSchema).handler(setupLab_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const sessionId = getSessionFromRequest(request);
    if (!sessionId) {
      throw new Error("Not authenticated");
    }
    const session = getSession(sessionId);
    if (!session) {
      throw new Error("Session expired");
    }
    const [user] = await db.select().from(userSchema).where(eq(userSchema.id, session.userId)).limit(1);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.labId) {
      throw new Error("Lab already set up for this user");
    }
    const [newLab] = await db.insert(labSchema).values({
      name: data.name,
      addressLine1: data.addressLine1 || null,
      gstinNumber: data.gstinNumber || null,
      registrationNumber: data.registrationNumber,
      state: data.state || null,
      country: data.country || null,
      pincode: data.pincode || null,
      phoneNumber: data.phoneNumber || null,
      email: data.email || null
    }).returning();
    const [updatedUser] = await db.update(userSchema).set({
      labId: newLab.id,
      hasCompletedSetup: true,
      updatedAt: /* @__PURE__ */ new Date(),
      permissions: {
        patients: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        bills: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        tests: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        parameters: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        doctors: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        reports: {
          view: true,
          create: true,
          edit: true,
          delete: true
        },
        users: {
          view: true,
          create: true,
          edit: true,
          delete: true
        }
      }
    }).where(eq(userSchema.id, session.userId)).returning();
    updateSession(sessionId, {
      labId: newLab.id,
      hasCompletedSetup: true,
      permissions: updatedUser.permissions
    });
    return {
      success: true,
      message: "Lab setup completed successfully",
      lab: newLab,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isAdmin: updatedUser.isAdmin,
        labId: updatedUser.labId,
        hasCompletedSetup: updatedUser.hasCompletedSetup
      }
    };
  } catch (error) {
    console.error("Lab setup error:", error);
    throw new Error(error instanceof Error ? error.message : "Lab setup failed");
  }
});
const loginUser_createServerFn_handler = createServerRpc("e1434429e00235720242889071d2b09e8d637d9040ab1de3dfc7cb37d0932728", (opts, signal) => {
  return loginUser.__executeServer(opts, signal);
});
const loginUser = createServerFn({
  method: "POST"
}).inputValidator(LoginSchema).handler(loginUser_createServerFn_handler, async ({
  data
}) => {
  try {
    const [user] = await db.select().from(userSchema).where(eq(userSchema.email, data.email)).limit(1);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (user.deletedAt) {
      throw new Error("Account has been deactivated");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const sessionId = createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin || false,
      permissions: user.permissions || {},
      labId: user.labId,
      hasCompletedSetup: user.hasCompletedSetup || false
    });
    const cookie = serialize("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/"
    });
    return new Response(JSON.stringify({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin || false,
        permissions: user.permissions || {},
        phoneNumber: user.phoneNumber,
        labId: user.labId,
        hasCompletedSetup: user.hasCompletedSetup || false
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
});
const logoutUser_createServerFn_handler = createServerRpc("f67c49cd0388d59a1b85369ceb7040fdc1fcfbb7f869ff006d5c879f6c993615", (opts, signal) => {
  return logoutUser.__executeServer(opts, signal);
});
const logoutUser = createServerFn({
  method: "POST"
}).handler(logoutUser_createServerFn_handler, async ({
  request
}) => {
  try {
    const sessionId = getSessionFromRequest(request);
    if (sessionId) {
      deleteSession(sessionId);
    }
    const cookie = serialize("sessionId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/"
    });
    return new Response(JSON.stringify({
      success: true,
      message: "Logout successful"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie
      }
    });
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed");
  }
});
const getCurrentUser_createServerFn_handler = createServerRpc("d44e08e9022a7a8299e66f49a70beed8a64f1805d6343a463c02a86c05501596", (opts, signal) => {
  return getCurrentUser.__executeServer(opts, signal);
});
const getCurrentUser = createServerFn({
  method: "GET"
}).handler(getCurrentUser_createServerFn_handler, async ({
  request
}) => {
  try {
    const sessionId = getSessionFromRequest(request);
    if (!sessionId) {
      return {
        success: false,
        user: null
      };
    }
    const session = getSession(sessionId);
    if (!session) {
      return {
        success: false,
        user: null
      };
    }
    const [user] = await db.select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      role: userSchema.role,
      isAdmin: userSchema.isAdmin,
      permissions: userSchema.permissions,
      phoneNumber: userSchema.phoneNumber,
      labId: userSchema.labId,
      hasCompletedSetup: userSchema.hasCompletedSetup
    }).from(userSchema).where(eq(userSchema.id, session.userId)).limit(1);
    if (!user) {
      deleteSession(sessionId);
      return {
        success: false,
        user: null
      };
    }
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return {
      success: false,
      user: null
    };
  }
});
const checkAuthorization_createServerFn_handler = createServerRpc("689e01ce4655f2fed02e9958da166f777fe71c702dd1f2d5d6197818f7df469e", (opts, signal) => {
  return checkAuthorization.__executeServer(opts, signal);
});
const checkAuthorization = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  requiredPermission: z.string().optional()
})).handler(checkAuthorization_createServerFn_handler, async ({
  data,
  request
}) => {
  try {
    const userResult = await getCurrentUser({
      request
    });
    if (!userResult.success || !userResult.user) {
      return {
        authorized: false,
        message: "Not authenticated"
      };
    }
    if (!userResult.user.hasCompletedSetup) {
      return {
        authorized: false,
        message: "Lab setup not completed",
        requiresSetup: true
      };
    }
    if (userResult.user.isAdmin) {
      return {
        authorized: true,
        user: userResult.user
      };
    }
    if (data.requiredPermission) {
      const [module, action] = data.requiredPermission.split(".");
      const permissions = userResult.user.permissions || {};
      if (!permissions[module] || !permissions[module][action]) {
        return {
          authorized: false,
          message: "Insufficient permissions"
        };
      }
    }
    return {
      authorized: true,
      user: userResult.user
    };
  } catch (error) {
    console.error("Authorization check error:", error);
    return {
      authorized: false,
      message: "Authorization failed"
    };
  }
});
const validateSessionEndpoint_createServerFn_handler = createServerRpc("ef24663278daf8b75d14591dbe78c90f61ff559b5549291c84747406c4d727c3", (opts, signal) => {
  return validateSessionEndpoint.__executeServer(opts, signal);
});
const validateSessionEndpoint = createServerFn({
  method: "GET"
}).handler(validateSessionEndpoint_createServerFn_handler, async ({
  request
}) => {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return {
        valid: false,
        message: "No session found"
      };
    }
    const isValid = session && session.userId;
    return {
      valid: isValid,
      sessionId: session?.id,
      userId: session?.userId,
      expiresAt: session?.expiresAt,
      lastActivity: session?.lastActivity
    };
  } catch (error) {
    console.error("Session validation error:", error);
    return {
      valid: false,
      message: "Session validation failed"
    };
  }
});
const keepSessionAlive_createServerFn_handler = createServerRpc("e895c864166834f5e7cfc38efbc119082baecf5df853d01fb8b74b810657c204", (opts, signal) => {
  return keepSessionAlive.__executeServer(opts, signal);
});
const keepSessionAlive = createServerFn({
  method: "POST"
}).handler(keepSessionAlive_createServerFn_handler, async ({
  request
}) => {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return {
        success: false,
        message: "No session to keep alive"
      };
    }
    const updated = updateSession(session.id, {
      ...session,
      lastActivity: Date.now()
    });
    if (!updated) {
      return {
        success: false,
        message: "Failed to update session"
      };
    }
    return {
      success: true,
      message: "Session kept alive",
      nextActivityCheckIn: 5 * 60 * 1e3
      // 5 minutes
    };
  } catch (error) {
    console.error("Keep session alive error:", error);
    return {
      success: false,
      message: "Keep alive failed"
    };
  }
});
const forceLogout_createServerFn_handler = createServerRpc("0cad0243b984fee4b121caa3e1b2058a0cad1a95551393d388b3e525bd569647", (opts, signal) => {
  return forceLogout.__executeServer(opts, signal);
});
const forceLogout = createServerFn({
  method: "POST"
}).handler(forceLogout_createServerFn_handler, async ({
  request
}) => {
  try {
    const session = await getSessionFromRequest(request);
    if (session) {
      deleteSession(session.id);
      console.log(`✅ Session ${session.id} deleted - user logged out`);
    }
    return {
      success: true,
      message: "Logged out successfully",
      redirectTo: "/auth/login"
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "Logout failed"
    };
  }
});
export {
  checkAuthorization_createServerFn_handler,
  forceLogout_createServerFn_handler,
  getCurrentUser_createServerFn_handler,
  keepSessionAlive_createServerFn_handler,
  loginUser_createServerFn_handler,
  logoutUser_createServerFn_handler,
  registerUser_createServerFn_handler,
  setupLab_createServerFn_handler,
  validateSessionEndpoint_createServerFn_handler
};
