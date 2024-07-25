import { connect } from "@/utils/db/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists and select password field
    const user = await User.findOne({ email }).select("+password");

    // Check if user or password is invalid
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    // Create response and set JWT cookie
    const response = NextResponse.json(
      { message: "User login successful" },
      { status: 200 }
    );

    response.cookies.set("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day in milliseconds
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
