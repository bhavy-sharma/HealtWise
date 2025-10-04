import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const token = generateToken(user._id);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
