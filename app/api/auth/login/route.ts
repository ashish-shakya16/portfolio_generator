import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email and password!' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address!' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Query database for user by email
    // 2. Compare password hash with bcrypt
    // 3. Create session/JWT token
    
    // For demo purposes, we return success and let client validate
    // The client will check credentials against stored signup data
    // This is NOT secure for production!

    return NextResponse.json({
      success: true,
      message: '🎉 Welcome back! Great to see you again!',
      // Client will validate and set user data
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Oops! Something went wrong. Please try again!' },
      { status: 500 }
    );
  }
}
