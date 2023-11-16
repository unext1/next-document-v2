import { connect } from "@planetscale/database";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { documents } from "../db/schema";

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { eq, or, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
export default async function GetDoc({ id }: { id: number }) {
  const session = await getServerSession(authOptions);
  const con = connect(config);
  const db = drizzle(con, { schema });

  const doc = await db.query.documents.findFirst({
    with: {
      user: {
        columns: {
          id: true,
          email: true,
          username: true,
          role: true,
          created_at: true,
        },
      },
      categories: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
    where: or(
      and(eq(documents.id, id), eq(documents.deleted, 0)),
      and(eq(documents.id, Number(session?.user.id)), eq(documents.deleted, 0)),
      and(
        eq(documents.id, id),
        eq(documents.deleted, 1),
        eq(documents.user_id, Number(session?.user.id))
      )
    ),
  });

  return doc;
}
