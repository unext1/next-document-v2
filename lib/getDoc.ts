import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function GetDoc({ id }: { id: number }) {
  const con = connect(config);
  const db = drizzle(con);

  const doc = await db.select().from(documents).where(eq(documents.id, id));

  return doc[0];
}
