import { drizzle } from "drizzle-orm/node-postgres";
import * as p from "drizzle-orm/pg-core";
import { parse } from "cookie";
const labSchema = p.pgTable("labSchema", {
  id: p.serial().primaryKey(),
  name: p.text().notNull(),
  addressLine1: p.text(),
  logo: p.text(),
  gstinNumber: p.text().unique(),
  registrationNumber: p.text().unique(),
  state: p.text(),
  country: p.text(),
  pincode: p.integer(),
  phoneNumber: p.bigint({ mode: "number" }),
  email: p.text().unique(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const userSchema = p.pgTable("userSchema", {
  id: p.serial().primaryKey(),
  password: p.text().notNull(),
  name: p.text().notNull(),
  role: p.text().notNull(),
  email: p.text().notNull().unique(),
  phoneNumber: p.bigint({ mode: "number" }),
  permissions: p.json(),
  createdBy: p.integer(),
  isAdmin: p.boolean().default(false),
  labId: p.integer().references(() => labSchema.id),
  hasCompletedSetup: p.boolean().default(false),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const doctorSchema = p.pgTable("doctorSchema", {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  registrationNumber: p.text(),
  name: p.text().notNull(),
  specialization: p.text(),
  phoneNumber: p.bigint({ mode: "number" }),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const testSchema = p.pgTable("testSchema", {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  name: p.text().notNull(),
  price: p.decimal().notNull(),
  metadata: p.json(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const testParamSchema = p.pgTable("testParamSchema", {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  name: p.text().notNull(),
  unit: p.text(),
  price: p.decimal(),
  // NEW: Store reference ranges as JSON for different age groups and genders
  referenceRanges: p.json(),
  // Structure: { male: {...}, female: {...}, child: {...} }
  metadata: p.json(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const patientSchema = p.pgTable("patientSchema", {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  name: p.text().notNull(),
  age: p.integer(),
  gender: p.text(),
  // Will store: "Male", "Female", "Other"
  phoneNumber: p.bigint({ mode: "number" }),
  addressLine1: p.text(),
  city: p.text(),
  state: p.text(),
  country: p.text(),
  pincode: p.integer(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow()
});
const patientTestsSchema = p.pgTable("patientTestsSchema", {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  patientId: p.integer().references(() => patientSchema.id).notNull(),
  testId: p.integer().references(() => testSchema.id).notNull(),
  doctorId: p.integer().references(() => doctorSchema.id),
  billId: p.integer().references(() => billSchema.id),
  status: p.text().notNull(),
  reportDeliveryDate: p.timestamp(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const testResultsSchema = p.pgTable("testResultsSchema", {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  patientTestId: p.integer().references(() => patientTestsSchema.id).notNull(),
  result: p.json(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const billSchema = p.pgTable("billSchema", {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  patientId: p.integer().references(() => patientSchema.id).notNull(),
  invoiceNumber: p.text().notNull().unique(),
  totalAmount: p.decimal().notNull(),
  discount: p.decimal(),
  tax: p.decimal(),
  finalAmount: p.decimal().notNull(),
  isPaid: p.boolean().default(false),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  billSchema,
  doctorSchema,
  labSchema,
  patientSchema,
  patientTestsSchema,
  testParamSchema,
  testResultsSchema,
  testSchema,
  userSchema
}, Symbol.toStringTag, { value: "Module" }));
const db = drizzle(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_EFfd2lB1sgyh@ep-dark-snow-a1vlroad-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require", { schema });
const sessions = /* @__PURE__ */ new Map();
const SESSION_TIMEOUT_MS = 30 * 60 * 1e3;
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1e3;
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
      sessions.delete(sessionId);
      cleaned++;
      continue;
    }
    if (now - session.createdAt > SESSION_MAX_AGE_MS) {
      sessions.delete(sessionId);
      cleaned++;
    }
  }
  if (cleaned > 0) {
    console.log(`��� Cleaned up ${cleaned} expired sessions`);
  }
}, 5 * 60 * 1e3);
if (typeof process !== "undefined") {
  process.on("exit", () => clearInterval(cleanupInterval));
}
const generateSessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};
const createSession = (userData) => {
  const sessionId = generateSessionId();
  const now = Date.now();
  sessions.set(sessionId, {
    ...userData,
    createdAt: now,
    lastActivity: now
  });
  console.log("✅ Session created:", sessionId, "for user:", userData.email);
  return sessionId;
};
const getSession = (sessionId) => {
  const session = sessions.get(sessionId);
  if (!session) {
    console.log("❌ Session not found:", sessionId);
    return null;
  }
  const now = Date.now();
  if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
    console.log("❌ Session inactive timeout:", sessionId);
    sessions.delete(sessionId);
    return null;
  }
  if (now - session.createdAt > SESSION_MAX_AGE_MS) {
    console.log("❌ Session max age exceeded:", sessionId);
    sessions.delete(sessionId);
    return null;
  }
  session.lastActivity = now;
  console.log("✅ Session valid:", sessionId);
  return session;
};
const updateSession = (sessionId, updates) => {
  const session = sessions.get(sessionId);
  if (!session) {
    return false;
  }
  const now = Date.now();
  sessions.set(sessionId, {
    ...session,
    ...updates,
    lastActivity: now
    // Always update activity on any session access
  });
  console.log("✅ Session updated:", sessionId);
  return true;
};
const deleteSession = (sessionId) => {
  sessions.delete(sessionId);
  console.log("✅ Session deleted:", sessionId);
};
const getSessionFromRequest = (request) => {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    console.log("❌ No cookie header found");
    return null;
  }
  try {
    const cookies = parse(cookieHeader);
    const sessionId = cookies.sessionId || null;
    if (sessionId) {
      console.log("��� Session ID from cookie:", sessionId);
    }
    return sessionId;
  } catch (error) {
    console.error("❌ Error parsing cookies:", error);
    return null;
  }
};
export {
  doctorSchema as a,
  testSchema as b,
  patientSchema as c,
  db as d,
  billSchema as e,
  testParamSchema as f,
  getSessionFromRequest as g,
  deleteSession as h,
  getSession as i,
  updateSession as j,
  createSession as k,
  labSchema as l,
  patientTestsSchema as p,
  testResultsSchema as t,
  userSchema as u
};
