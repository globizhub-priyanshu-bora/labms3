import * as p from 'drizzle-orm/pg-core';

// Lab table - must be created first
export const labSchema = p.pgTable('labSchema', {
  id: p.serial().primaryKey(),
  name: p.text().notNull(),
  addressLine1: p.text(),
  logo: p.text(),
  gstinNumber: p.text().unique(),
  registrationNumber: p.text().unique(),
  state: p.text(),
  country: p.text(),
  pincode: p.integer(),
  phoneNumber: p.bigint({ mode: 'number' }),
  email: p.text().unique(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});

// User table - with labId reference
export const userSchema = p.pgTable('userSchema', {
  id: p.serial().primaryKey(),
  password: p.text().notNull(),
  name: p.text().notNull(),
  role: p.text().notNull(),
  email: p.text().notNull().unique(),
  phoneNumber: p.bigint({ mode: 'number' }),
  permissions: p.json(),
  createdBy: p.integer(),
  isAdmin: p.boolean().default(false),
  labId: p.integer().references(() => labSchema.id),
  hasCompletedSetup: p.boolean().default(false),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});

// Doctor table - with labId
export const doctorSchema = p.pgTable('doctorSchema', {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  registrationNumber: p.text(),
  name: p.text().notNull(),
  specialization: p.text(),
  phoneNumber: p.bigint({ mode: 'number' }), 
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});

// Test table - with labId
export const testSchema = p.pgTable('testSchema', {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  name: p.text().notNull(),
  price: p.decimal().notNull(),
  metadata: p.json(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});

// UPDATED: Test Parameter table with reference ranges for different demographics
export const testParamSchema = p.pgTable('testParamSchema', {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  name: p.text().notNull(),
  unit: p.text(),
  price: p.decimal(),
  // NEW: Store reference ranges as JSON for different age groups and genders
  referenceRanges: p.json(), // Structure: { male: {...}, female: {...}, child: {...} }
  metadata: p.json(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});

// UPDATED: Patient table with proper gender enum
export const patientSchema = p.pgTable('patientSchema', {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  name: p.text().notNull(),
  age: p.integer(),
  gender: p.text(), // Will store: "Male", "Female", "Other"
  phoneNumber: p.bigint({ mode: 'number' }),
  addressLine1: p.text(),
  city: p.text(),
  state: p.text(),
  country: p.text(),
  pincode: p.integer(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
});

// Patient Tests table - with labId
export const patientTestsSchema = p.pgTable('patientTestsSchema', {  
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

// Test Results table - with labId
export const testResultsSchema = p.pgTable('testResultsSchema', {
  id: p.serial().primaryKey(),
  labId: p.integer().references(() => labSchema.id).notNull(),
  patientTestId: p.integer().references(() => patientTestsSchema.id).notNull(),
  result: p.json(),
  createdAt: p.timestamp().defaultNow(),
  updatedAt: p.timestamp().defaultNow(),
  deletedAt: p.timestamp()
});

// Bill table - with labId
export const billSchema = p.pgTable('billSchema', {
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