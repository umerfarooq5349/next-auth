import { connect } from "@/utils/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    console.log(`Received token: ${token}`);

    // Find user with the given token and valid expiry
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExp: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log(`User found: ${user}`);

    // Update user verification status
    user.isVerified = true; // Corrected typo from 'isVerfied' to 'isVerified'
    user.verifyToken = undefined;
    user.verifyTokenExp = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error verifying email:", error); // Log error for debugging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
