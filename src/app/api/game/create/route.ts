import { NextResponse } from "next/server";
import { GameData } from "../data";

export async function POST(request: Request) {
  return NextResponse.json({ message: "Joined game" });
}
