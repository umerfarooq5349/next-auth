import { connect } from "@/utils/db/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/utils/token/token";

connect();

export async function GET(request: NextRequest) {
  try {
    const decoded: any = await getToken(request);

    if (decoded.error) {
      return NextResponse.json({ error: decoded.error }, { status: 401 });
    }

    const { id } = decoded;

    // Check if user exists
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { error: "Please Login first" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Loged in user",
        status: "success",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
