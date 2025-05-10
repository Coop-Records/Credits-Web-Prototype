import { NextResponse } from "next/server";
import { mintWithCredits } from "@/lib/mintWithCredits";

export async function POST(request: Request) {
  try {
    const { tokenRecipient } = await request.json();
    if (!tokenRecipient) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
    const result = await mintWithCredits(tokenRecipient);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in mint endpoint:", error);
    return NextResponse.json(
      { error: "Failed to process mint request" },
      { status: 500 }
    );
  }
}
