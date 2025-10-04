import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs'; // optional: if you hash passwords here

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    // ===== 1️⃣ Field Validations =====
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { message: 'Name must be at least 2 characters long.' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required.' },
        { status: 400 }
      );
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // ===== 2️⃣ Check if user already exists =====
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    // ===== 3️⃣ Hash password before saving (important) =====
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ===== 4️⃣ Generate JWT Token =====
    const token = generateToken(user._id);

    // ===== 5️⃣ Prepare response =====
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        message: 'User registered successfully.',
        token,
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
