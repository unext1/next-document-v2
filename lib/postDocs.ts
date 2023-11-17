import { connect } from "@planetscale/database";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { config } from "../db/config";
import { documents } from "../db/schema";

export default async function PostDocs({
  content,
  title,
  userId,
  isPublic,
  categoryId,
}: {
  content: string;
  title: string;
  userId: string;
  isPublic: boolean;
  categoryId: number;
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
    is_public: isPublic ? 1 : 0,
    deleted: 0,
    category_id: categoryId,
    updated_at: formattedDate || "",
  });

  return docs;
}
