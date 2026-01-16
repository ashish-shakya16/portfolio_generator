import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields!' },
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

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long!' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Hash the password with bcrypt
    // 2. Save to database
    // 3. Check if email already exists
    
    // For demo, we'll use a simple approach with localStorage on client
    // This sends back the user data that client will store
    // Note: In production, never send passwords back!

    // Send welcome email (using API route)
    try {
      await fetch(`${request.headers.get('origin')}/api/send-welcome-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail signup if email fails
    }

    return NextResponse.json({
      success: true,
      message: '🎉 Welcome aboard! Check your email for a warm welcome message!',
      user: { name, email, password }, // In production, never send password!
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Oops! Something went wrong. Please try again!' },
      { status: 500 }
    );
  }
}
