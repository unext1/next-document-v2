import EditDoc from "@/lib/editDoc";
import GetDoc from "@/lib/getDoc";
import RemoveDoc from "@/lib/removeDoc";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const document = await GetDoc({ id });
    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const document = await RemoveDoc({ id });
    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { title, isPublic, content } = body;
    await EditDoc({ id, title, isPublic, content });
    return NextResponse.json({ message: "Updated !" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
