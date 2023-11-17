import { connect } from "@planetscale/database";

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { getServerSession } from "next-auth";
import { config } from "../db/config";
import { documents } from "../db/schema";

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
