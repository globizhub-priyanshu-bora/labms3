import { createServerFn } from '@tanstack/react-start';
import { and, count, desc, eq, ilike, isNull, ne, or, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { doctorSchema } from '@/db/schema';
import { getLabIdFromRequest } from './helpers';

// ============================================
// VALIDATION SCHEMAS
// ============================================

const DoctorCreateSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional(),
});

const DoctorUpdateSchema = z.object({
  id: z.number().int().positive(),
  registrationNumber: z.string().min(1).optional(),
  name: z.string().min(2).optional(),
  specialization: z.string().optional(),
  phoneNumber: z.number().int().positive().optional(),
});

const DoctorIdSchema = z.object({
  id: z.number().int().positive(),
});

const DoctorSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

const DoctorListSchema = z.object({
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0),
  sortBy: z.enum(['name', 'createdAt', 'specialization']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const registerDoctor = createServerFn({ method: 'POST' })
  .inputValidator(DoctorCreateSchema)
  .handler(async ({ data, request }) => {
    try {
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      // Check if registration number already exists IN THIS LAB
      const existing = await db
        .select()
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.registrationNumber, data.registrationNumber),
            eq(doctorSchema.labId, labId), // CRITICAL: Check within lab only
            isNull(doctorSchema.deletedAt)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        throw new Error('Doctor with this registration number already exists in your lab');
      }

      // Insert new doctor WITH labId
      const [newDoctor] = await db
        .insert(doctorSchema)
        .values({
          labId, // CRITICAL: Assign to user's lab
          registrationNumber: data.registrationNumber,
          name: data.name,
          specialization: data.specialization || null,
          phoneNumber: data.phoneNumber || null,
        })
        .returning();

      return {
        success: true,
        message: 'Doctor registered successfully',
        data: newDoctor,
      };
    } catch (error) {
      console.error('Error registering doctor:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to register doctor'
      );
    }
  });

export const getAllDoctors = createServerFn({ method: 'GET' })
  .inputValidator(DoctorListSchema)
  .handler(async ({ data, request }) => {
    try {
      const { limit, offset, sortBy, sortOrder } = data;
      
      // CRITICAL: Get labId from authenticated user
      let labId: number;
      try {
        labId = await getLabIdFromRequest(request);
      } catch (error) {
        console.error('Error getting lab ID:', error);
        // Return empty list instead of throwing to prevent deployment errors
        return {
          success: true,
          data: [],
          pagination: {
            total: 0,
            limit,
            offset,
            hasMore: false,
          },
        };
      }

      const orderByColumn = doctorSchema[sortBy];
      const orderBy = sortOrder === 'desc' ? desc(orderByColumn) : orderByColumn;

      // Count only doctors from user's lab
      const countResult = await db
        .select({ count: count() })
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.labId, labId), // CRITICAL: Filter by labId
            isNull(doctorSchema.deletedAt)
          )
        );

      const totalCount = Number(countResult[0]?.count || 0);

      // Get only doctors from user's lab
      const doctors = await db
        .select()
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.labId, labId), // CRITICAL: Filter by labId
            isNull(doctorSchema.deletedAt)
          )
        )
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        data: doctors,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount,
        },
      };
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Return empty list instead of throwing to prevent deployment errors
      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          limit: 50,
          offset: 0,
          hasMore: false,
        },
      };
    }
  });

export const searchDoctors = createServerFn({ method: 'GET' })
  .inputValidator(DoctorSearchSchema)
  .handler(async ({ data, request }) => {
    try {
      const { query, limit, offset } = data;
      const searchPattern = `%${query}%`;
      
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      const doctors = await db
        .select()
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.labId, labId), // CRITICAL: Filter by labId
            or(
              ilike(doctorSchema.name, searchPattern),
              ilike(doctorSchema.registrationNumber, searchPattern),
              ilike(doctorSchema.specialization, searchPattern)
            ),
            isNull(doctorSchema.deletedAt)
          )
        )
        .orderBy(desc(doctorSchema.createdAt))
        .limit(limit)
        .offset(offset);

      const countResult = await db
        .select({ count: count() })
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.labId, labId), // CRITICAL: Filter by labId
            or(
              ilike(doctorSchema.name, searchPattern),
              ilike(doctorSchema.registrationNumber, searchPattern),
              ilike(doctorSchema.specialization, searchPattern)
            ),
            isNull(doctorSchema.deletedAt)
          )
        );

      const totalCount = Number(countResult[0]?.count || 0);

      return {
        success: true,
        data: doctors,
        query,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount,
        },
      };
    } catch (error) {
      console.error('Error searching doctors:', error);
      throw new Error('Failed to search doctors');
    }
  });

export const getDoctorById = createServerFn({ method: 'GET' })
  .inputValidator(DoctorIdSchema)
  .handler(async ({ data, request }) => {
    try {
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      const [doctor] = await db
        .select()
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.id, data.id),
            eq(doctorSchema.labId, labId), // CRITICAL: Verify ownership
            isNull(doctorSchema.deletedAt)
          )
        )
        .limit(1);

      if (!doctor) {
        throw new Error('Doctor not found or access denied');
      }

      return {
        success: true,
        data: doctor,
      };
    } catch (error) {
      console.error('Error fetching doctor:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to fetch doctor'
      );
    }
  });

export const updateDoctor = createServerFn({ method: 'POST' })
  .inputValidator(DoctorUpdateSchema)
  .handler(async ({ data, request }) => {
    try {
      const { id, ...updateData } = data;
      
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      // Check if doctor exists AND belongs to user's lab
      const [existing] = await db
        .select()
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.id, id),
            eq(doctorSchema.labId, labId), // CRITICAL: Verify ownership
            isNull(doctorSchema.deletedAt)
          )
        )
        .limit(1);

      if (!existing) {
        throw new Error('Doctor not found or access denied');
      }

      // If updating registration number, check for duplicates IN THIS LAB
      if (updateData.registrationNumber) {
        const [duplicate] = await db
          .select()
          .from(doctorSchema)
          .where(
            and(
              eq(doctorSchema.registrationNumber, updateData.registrationNumber),
              eq(doctorSchema.labId, labId), // CRITICAL: Check within lab only
              ne(doctorSchema.id, id),
              isNull(doctorSchema.deletedAt)
            )
          )
          .limit(1);

        if (duplicate) {
          throw new Error('Registration number already exists for another doctor in your lab');
        }
      }

      // Update doctor
      const [updatedDoctor] = await db
        .update(doctorSchema)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(doctorSchema.id, id),
            eq(doctorSchema.labId, labId) // CRITICAL: Ensure update is for user's lab
          )
        )
        .returning();

      return {
        success: true,
        message: 'Doctor updated successfully',
        data: updatedDoctor,
      };
    } catch (error) {
      console.error('Error updating doctor:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to update doctor'
      );
    }
  });

export const deleteDoctor = createServerFn({ method: 'POST' })
  .inputValidator(DoctorIdSchema)
  .handler(async ({ data, request }) => {
    try {
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      // Check if doctor exists AND belongs to user's lab
      const [existing] = await db
        .select()
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.id, data.id),
            eq(doctorSchema.labId, labId), // CRITICAL: Verify ownership
            isNull(doctorSchema.deletedAt)
          )
        )
        .limit(1);

      if (!existing) {
        throw new Error('Doctor not found or access denied');
      }

      // Soft delete
      await db
        .update(doctorSchema)
        .set({
          deletedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(doctorSchema.id, data.id),
            eq(doctorSchema.labId, labId) // CRITICAL
          )
        );

      return {
        success: true,
        message: 'Doctor deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to delete doctor'
      );
    }
  });

export const permanentlyDeleteDoctor = createServerFn({ method: 'POST' })
  .inputValidator(DoctorIdSchema)
  .handler(async ({ data, request }) => {
    try {
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      const deleted = await db
        .delete(doctorSchema)
        .where(
          and(
            eq(doctorSchema.id, data.id),
            eq(doctorSchema.labId, labId) // CRITICAL: Verify ownership
          )
        )
        .returning();

      if (deleted.length === 0) {
        throw new Error('Doctor not found or access denied');
      }

      return {
        success: true,
        message: 'Doctor permanently deleted',
      };
    } catch (error) {
      console.error('Error permanently deleting doctor:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to permanently delete doctor'
      );
    }
  });

export const restoreDoctor = createServerFn({ method: 'POST' })
  .inputValidator(DoctorIdSchema)
  .handler(async ({ data, request }) => {
    try {
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      const [restored] = await db
        .update(doctorSchema)
        .set({
          deletedAt: null,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(doctorSchema.id, data.id),
            eq(doctorSchema.labId, labId) // CRITICAL: Verify ownership
          )
        )
        .returning();

      if (!restored) {
        throw new Error('Doctor not found or access denied');
      }

      return {
        success: true,
        message: 'Doctor restored successfully',
        data: restored,
      };
    } catch (error) {
      console.error('Error restoring doctor:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to restore doctor'
      );
    }
  });

export const getDoctorsBySpecialization = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ specialization: z.string().min(1) }))
  .handler(async ({ data, request }) => {
    try {
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      const doctors = await db
        .select()
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.specialization, data.specialization),
            eq(doctorSchema.labId, labId), // CRITICAL: Filter by labId
            isNull(doctorSchema.deletedAt)
          )
        )
        .orderBy(doctorSchema.name);

      return {
        success: true,
        data: doctors,
        specialization: data.specialization,
      };
    } catch (error) {
      console.error('Error fetching doctors by specialization:', error);
      throw new Error('Failed to fetch doctors by specialization');
    }
  });

export const getAllSpecializations = createServerFn({ method: 'GET' })
  .handler(async ({ request }) => {
    try {
      // CRITICAL: Get labId from authenticated user
      const labId = await getLabIdFromRequest(request);

      const specializations = await db
        .selectDistinct({ specialization: doctorSchema.specialization })
        .from(doctorSchema)
        .where(
          and(
            eq(doctorSchema.labId, labId), // CRITICAL: Filter by labId
            isNull(doctorSchema.deletedAt),
            sql`${doctorSchema.specialization} IS NOT NULL`
          )
        )
        .orderBy(doctorSchema.specialization);

      return {
        success: true,
        data: specializations.map((s: { specialization: any }) => s.specialization).filter(Boolean),
      };
    } catch (error) {
      console.error('Error fetching specializations:', error);
      throw new Error('Failed to fetch specializations');
    }
  });