import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function RemoveDoc({ id }: { id: number }) {
  const con = connect(config);
  const db = drizzle(con);

  const doc = await db.select().from(documents).where(eq(documents.id, id));

  if (doc[0].deleted === 1) {
    // Hard Delete
    return await db.delete(documents).where(eq(documents.id, id));
  } else {
    // Soft Delete
    await db.update(documents).set({ deleted: 1 }).where(eq(documents.id, id));
  }

  return {};
}
