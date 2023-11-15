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

const now = new Date();
const formattedDate = `${now.getFullYear()}-${
  now.getMonth() + 1
}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;


  const edit = await db
    .update(documents)
    .set({ title: title, content: content, user_id: 0, updated_at: formattedDate, })
    .where(eq(documents.id, id));

  return edit;
}
