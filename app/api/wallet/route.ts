import { NextRequest, NextResponse } from "next/server";
import { getOrCreateWallet } from "@/lib/getOrCreateWallet";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  if (!owner) {
    return NextResponse.json(
      { error: "Missing owner parameter" },
      { status: 400 }
    );
  }

  try {
    const result = await getOrCreateWallet(owner);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
