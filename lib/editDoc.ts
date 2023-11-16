import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

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
  const session = await getServerSession(authOptions);

  const edit = await db
    .update(documents)
    .set({
      title: title,
      content: content,
      user_id: 0,
    })
    .where(
      and(eq(documents.id, id), eq(documents.id, Number(session?.user.id)))
    );

  return edit;
}
