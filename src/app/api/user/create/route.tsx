import { NextResponse } from "next/server";

import CreateUser from "@/lib/createUser";
import { hash } from "bcrypt";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const hashedPassword = await hash(password, 10);
    console.log(username, email, password);

    const userCreated = await CreateUser({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(userCreated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
