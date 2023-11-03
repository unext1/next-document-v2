import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function EditDoc({
  id,
  content,
  author,
  title,
}: {
  id: number;
  content: string;
  author: string;
  title: string;
}) {
  const con = connect(config);
  const db = drizzle(con);

  const edit = await db
    .update(documents)
    .set({ title: title, content: content, author: author })
    .where(eq(documents.id, id));

  return edit;
}
