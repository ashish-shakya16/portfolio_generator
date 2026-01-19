import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required!' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.log('⚠️  RESEND_API_KEY not configured. Email not sent.');
      console.log('📧 Would send welcome email to:', email);
      return NextResponse.json({
        success: true,
        message: 'Email service not configured. Please add RESEND_API_KEY to .env.local',
        note: 'User registered successfully but email not sent',
      });
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Email content
    const emailContent = {
      to: email,
      from: 'onboarding@resend.dev', // Using Resend's test domain
      subject: '🎉 Welcome to PortfolioAI!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚀 Welcome to PortfolioAI!</h1>
              </div>
              <div class="content">
                <h2>Hi ${name}! 👋</h2>
                <p>We're thrilled to have you here! You've just taken the first step towards creating an amazing professional portfolio.</p>
                
                <p>With PortfolioAI, you can:</p>
                <ul>
                  <li>✨ Build stunning portfolios in minutes</li>
                  <li>🤖 Get AI-powered content suggestions</li>
                  <li>🎨 Choose from beautiful templates</li>
                  <li>📱 Export and share anywhere</li>
                </ul>
                
                <p>Ready to get started?</p>
                <a href="${request.headers.get('origin')}/builder" class="button">Start Building Now</a>
                
                <p>If you have any questions or need help, just reply to this email - we're here for you! 💙</p>
                
                <p>Cheers,<br><strong>The PortfolioAI Team</strong></p>
              </div>
              <div class="footer">
                <p>This email was sent because you signed up for PortfolioAI</p>
                <p>&copy; 2026 PortfolioAI. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Hi ${name}!

Welcome to PortfolioAI! 🎉

We're thrilled to have you here. You've just taken the first step towards creating an amazing professional portfolio.

With PortfolioAI, you can:
- Build stunning portfolios in minutes
- Get AI-powered content suggestions
- Choose from beautiful templates
- Export and share anywhere

Ready to get started? Visit: ${request.headers.get('origin')}/builder

If you have any questions, just reply to this email - we're here for you!

Cheers,
The PortfolioAI Team
      `,
    };

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'PortfolioAI <onboarding@resend.dev>', // Use resend.dev for testing, your domain for production
        to: [email],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        return NextResponse.json({
          success: false,
          message: 'Failed to send welcome email',
          error: error.message,
        }, { status: 500 });
      }

      console.log('✅ Welcome email sent successfully to:', email);
      console.log('📧 Email ID:', data?.id);

      return NextResponse.json({
        success: true,
        message: 'Welcome email sent successfully!',
        emailId: data?.id,
      });
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      return NextResponse.json({
        success: false,
        message: 'Failed to send email: ' + emailError.message,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send welcome email: ' + error.message },
      { status: 500 }
    );
  }
}
