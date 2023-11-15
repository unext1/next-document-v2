import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents, users } from "../db/schema";

export default async function CreateUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const con = connect(config);
  const db = drizzle(con);

  const createdUser = db.insert(users).values({
    email: email,
    username: username,
    password: password,
  });

  return createdUser;
}
