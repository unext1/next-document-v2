import { NextResponse } from "next/server";
import GetAllDocs from "@/lib/getDocs";
import PostDocs from "@/lib/postDocs";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const documents = await GetAllDocs();

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { title, userId, content } = body;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const documents = await PostDocs({
      title,
      userId,
      content,
    });
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
