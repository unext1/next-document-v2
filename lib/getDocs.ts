import { connect } from "@planetscale/database";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { documents } from "../db/schema";

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { eq, or } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function GetAllDocs() {
  const session = await getServerSession(authOptions);
  const con = connect(config);
  const db = drizzle(con, { schema });

  const docs = await db.query.documents.findMany({
    with: {
      user: true,
    },
    where: or(
      eq(documents.user_id, Number(session?.user.id)),
      eq(documents.is_public, 1)
    ),
  });

  return docs;
}
