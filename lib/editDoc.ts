import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function EditDoc({
  id,
  content,
  user_id,
  title,
}: {
  id: number;
  content: string;
  user_id: string;
  title: string;
}) {
  const con = connect(config);
  const db = drizzle(con);

  const edit = await db
    .update(documents)
    .set({
      title: title,
      content: content,
      user_id: 0,
    })
    .where(eq(documents.id, id));

  return edit;
}
