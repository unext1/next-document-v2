import { connect } from "@planetscale/database";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { categories } from "../db/schema";

export default async function GetAllCategories() {
  const con = connect(config);
  const db = drizzle(con, { schema });

  const categoryArray = await db.select().from(categories);

  return categoryArray;
}
