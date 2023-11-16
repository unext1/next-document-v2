import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { eq, and, or } from "drizzle-orm";
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
      and(
        eq(documents.id, id),
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
      )
    );

  return doc[0];
}
