import { connect } from "@/utils/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    // Create response and set JWT cookie
    const response = NextResponse.json(
      { message: "User Logout successfully", status: "success" },
      { status: 200 }
    );

    response.cookies.delete("jwt");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
