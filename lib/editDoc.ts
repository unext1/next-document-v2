import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { or, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export default async function EditDoc({
  id,
  content,
  title,
  isPublic,
  unDelete,
  categoryId,
}: {
  id: number;
  content: string;
  title: string;
  isPublic: boolean;
  unDelete?: number;
  categoryId: number;
}) {
  const con = connect(config);
  const db = drizzle(con);
  const session = await getServerSession(authOptions);

  const now = new Date();

  const formattedDate = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  const edit = await db
    .update(documents)
    .set({
      title: title,
      content: content,
      is_public: isPublic ? 1 : 0,
      deleted: unDelete,
      category_id: categoryId,
      updated_at: formattedDate,
    })
    .where(
      or(eq(documents.id, id), eq(documents.id, Number(session?.user.id)))
    );

  return edit;
}
