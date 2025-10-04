import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    return NextResponse.json(
      {
        message: "User registered successfully.",
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
