import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { eq, or, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export default async function GetDoc({ id }: { id: number }) {
  const con = connect(config);
  const db = drizzle(con);
  const session = await getServerSession(authOptions);

  const doc = await db
    .select()
    .from(documents)
    .where(
      or(
        and(
          eq(documents.id, id),
          eq(documents.user_id, Number(session?.user.id))
        ),
        eq(documents.is_public, 1)
      )
    );

  return doc[0];
}
