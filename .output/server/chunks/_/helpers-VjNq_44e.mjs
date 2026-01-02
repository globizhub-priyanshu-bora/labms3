import { eq } from "drizzle-orm";
import { g as getSessionFromRequest, b as getSession, d as db, u as userSchema } from "./session-manager-DRdZONnW.mjs";
const getLabIdFromRequest = async (request) => {
  const sessionId = getSessionFromRequest(request);
  if (!sessionId) {
    throw new Error("Not authenticated");
  }
  const session = getSession(sessionId);
  if (!session) {
    throw new Error("Session expired");
  }
  if (!session.labId) {
    throw new Error("Lab not set up");
  }
  const [user] = await db.select({ labId: userSchema.labId }).from(userSchema).where(eq(userSchema.id, session.userId)).limit(1);
  if (!user || !user.labId) {
    throw new Error("User lab not found");
  }
  return user.labId;
};
const getUserFromRequest = async (request) => {
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
  return user;
};
export {
  getLabIdFromRequest as a,
  getUserFromRequest as g
};
