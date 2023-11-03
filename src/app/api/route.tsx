import { NextResponse } from "next/server";
import GetAllDocs from "@/lib/getDocs";
import PostDocs from "@/lib/postDocs";

export async function GET(req: Request, res: Response) {
  try {
    const documents = await GetAllDocs();
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { title, author, content } = body;
    const documents = await PostDocs({
      title,
      author,
      content,
    });
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
