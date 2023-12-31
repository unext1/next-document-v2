import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { connect } from "@planetscale/database";
import { and, eq, ne, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { getServerSession } from "next-auth";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { documents } from "../db/schema";

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
    where: and(
      eq(documents.id, id),
      or(
        eq(documents.user_id, Number(session?.user.id)),
        and(eq(documents.is_public, 1), ne(documents.deleted, 1))
      )
    ),
  });

  return doc;
}
