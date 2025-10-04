import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if credentials match
    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful'
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password'
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Server error'
      },
      { status: 500 }
    );
  }
}