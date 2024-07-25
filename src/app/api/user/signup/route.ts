import { connect } from "@/utils/db/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { mailer } from "@/utils/mail/mail";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password, role, photo } = reqBody; // Set default values

    console.log(`request body: ${JSON.stringify(reqBody)}`);

    //check if user already exists
    // const user = await User.findOne({ email });

    // if (user) {
    //   return NextResponse.json(
    //     { error: "User already exists" },
    //     { status: 400 }
    //   );
    // }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log(`hashed password: ${hashedPassword}\nSimple: ${password}`);
    console.log("newUser");
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      photo,
    });

    //send verification email
    console.log(newUser);
    await mailer(email, newUser._id, "verify");

    return NextResponse.json(
      {
        message: "User created successfully",
        status: "success",
        newUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
