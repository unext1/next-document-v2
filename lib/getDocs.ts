import { connect } from "@planetscale/database";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { documents } from "../db/schema";

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { eq, or, and } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function GetAllDocs() {
  const session = await getServerSession(authOptions);
  const con = connect(config);
  const db = drizzle(con, { schema });

  const docs = await db.query.documents.findMany({
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
    },
    where: and(
      or(
        and(
          eq(documents.user_id, Number(session?.user.id)),
          eq(documents.deleted, 0) // Allow access for the document owner if not deleted
        ),
        and(
          eq(documents.is_public, 1),
          eq(documents.deleted, 0) // Allow access for public documents if not deleted
        )
      )
    ),
  });

  return docs;
}
