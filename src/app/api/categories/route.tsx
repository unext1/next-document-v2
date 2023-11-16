import { NextResponse } from "next/server";
import GetAllDocs from "@/lib/getDocs";
import PostDocs from "@/lib/postDocs";
import { getServerSession } from "next-auth";
import GetAllCategories from "@/lib/getCategories";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const documents = await GetAllCategories();

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
