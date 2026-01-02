import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { eq } from "drizzle-orm";
import { d as db, l as labSchema } from "./session-manager-Dkxs0Vej.mjs";
import { g as getLabIdFromRequest } from "./helpers-zc_3GKPr.mjs";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "cookie";
const getLabInfo_createServerFn_handler = createServerRpc("d78709e5b3dd094a181e5b9137b2b27e1883bd2ce0a4c4fd258eb175dd7eeeca", (opts, signal) => {
  return getLabInfo.__executeServer(opts, signal);
});
const getLabInfo = createServerFn({
  method: "GET"
}).handler(getLabInfo_createServerFn_handler, async ({
  request
}) => {
  try {
    const labId = await getLabIdFromRequest(request);
    const [lab] = await db.select().from(labSchema).where(eq(labSchema.id, labId)).limit(1);
    if (!lab) {
      throw new Error("Lab not found");
    }
    return {
      success: true,
      data: lab
    };
  } catch (error) {
    console.error("Error fetching lab info:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch lab information");
  }
});
export {
  getLabInfo_createServerFn_handler
};
