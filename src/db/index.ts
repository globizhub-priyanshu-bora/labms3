import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from './schema.ts'
export const db = drizzle(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_EFfd2lB1sgyh@ep-dark-snow-a1vlroad-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require", {schema});