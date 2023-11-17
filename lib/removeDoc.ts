import { connect } from "@planetscale/database";

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { getServerSession } from "next-auth";
import { config } from "../db/config";
import { documents } from "../db/schema";

export default async function RemoveDoc({ id }: { id: number }) {
  const con = connect(config);
  const db = drizzle(con);
  const session = await getServerSession(authOptions);

  const doc = await db.select().from(documents).where(eq(documents.id, id));

  if (doc[0].deleted === 1) {
    // Hard Delete
    return await db
      .delete(documents)
      .where(
        or(eq(documents.id, id), eq(documents.id, Number(session?.user.id)))
      );
  } else {
    // Soft Delete
    await db
      .update(documents)
      .set({ deleted: 1 })
      .where(
        or(eq(documents.id, id), eq(documents.id, Number(session?.user.id)))
      );
  }

  return {};
}
