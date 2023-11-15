import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";

export default async function PostDocs({
  content,
  title,
  userId,
}: {
  content: string;
  title: string;
  userId: string;
}) {
  const con = connect(config);
  const db = drizzle(con);

  const now = new Date();
  // Try fixing formatting for happy db schema
  const formattedDate = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  const docs = await db.insert(documents).values({
    user_id: Number(userId),
    title: title || "",
    content: content || "",
    created_at: formattedDate || "",
    is_public: 0,
    deleted: 0,
    category_id: 0,
  });

  return docs;
}
