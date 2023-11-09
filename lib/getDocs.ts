import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";

import { asc, desc } from "drizzle-orm";

export default async function GetAllDocs() {
  const con = connect(config);
  const db = drizzle(con);

  const docs = await db
    .select()
    .from(documents)
    .orderBy(desc(documents.created_at));

  return docs;
}
