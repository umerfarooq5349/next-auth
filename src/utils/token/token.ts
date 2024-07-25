import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("jwt")?.value || "";

    if (!token) {
      return { error: "Please login again" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return decoded; // Assuming decoded contains user ID
  } catch (error: any) {
    return { error: error.message };
  }
};
