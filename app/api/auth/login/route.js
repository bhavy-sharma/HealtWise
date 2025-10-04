import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    // ===== 1️⃣ Input Validation =====
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required.' },
        { status: 400 }
      );
    }

    // Simple email format validation
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

    // ===== 2️⃣ Find user and include password =====
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json(
        { message: 'No account found with this email.' },
        { status: 404 }
      );
    }

    // ===== 3️⃣ Verify password =====
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // ===== 4️⃣ Generate JWT Token =====
    const token = generateToken(user._id);

    // ===== 5️⃣ Return response without password =====
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        message: 'Login successful.',
        token,
        user: userResponse,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
