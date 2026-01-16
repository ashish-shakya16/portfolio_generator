# 🔐 Authentication System Documentation

## Overview

The PortfolioAI application now includes a complete authentication system with user signup, login, and welcome email functionality.

## Features

### ✨ User Authentication
- **Sign Up**: Create new user accounts with name, email, and password
- **Log In**: Secure login for existing users
- **Log Out**: Clean logout with confirmation
- **Session Management**: User data persisted in localStorage
- **User Display**: Shows logged-in user's name/email in navigation

### 📧 Welcome Email System
- Automatic welcome email sent on signup
- Beautiful HTML email template with:
  - Personalized greeting with user's name
  - Feature highlights
  - Call-to-action button
  - Responsive design
- Currently in simulation mode (logs to console)
- Ready to integrate with real email services

### 🎨 User Interface
- Beautiful modal design for login/signup
- Smooth animations and transitions
- Friendly, conversational language
- Real-time form validation
- Loading states with spinners
- Easy toggle between login and signup modes

## File Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── login/
│   │   │   └── route.ts          # Login API endpoint
│   │   └── signup/
│   │       └── route.ts          # Signup API endpoint
│   └── send-welcome-email/
│       └── route.ts              # Email sending service
├── page.tsx                      # Homepage with auth buttons
└── builder/
    └── page.tsx                  # Builder page with user display

components/
└── AuthModal.tsx                 # Login/Signup modal component
```

## How It Works

### 1. User Signup Flow

```
User clicks "Sign Up" → Modal opens → User fills form → API validates → 
Account created → Welcome email sent → User logged in → Modal closes
```

**API Endpoint**: `POST /api/auth/signup`

**Request Body**:
```json
{
  "name": "Mahesh Kumar",
  "email": "mahesh@example.com",
  "password": "secure123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "🎉 Welcome aboard! Check your email for a warm welcome message!",
  "user": {
    "name": "Mahesh Kumar",
    "email": "mahesh@example.com"
  }
}
```

### 2. User Login Flow

```
User clicks "Log In" → Modal opens → User enters credentials → 
API validates → User logged in → Modal closes
```

**API Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "mahesh@example.com",
  "password": "secure123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "🎉 Welcome back! Great to see you again!",
  "user": {
    "email": "mahesh@example.com"
  }
}
```

### 3. Welcome Email Flow

```
Signup successful → Trigger email API → Generate email content → 
Send via email service → Log to console (simulation mode)
```

**API Endpoint**: `POST /api/send-welcome-email`

**Request Body**:
```json
{
  "name": "Mahesh Kumar",
  "email": "mahesh@example.com"
}
```

## User Interface Components

### Navigation Bar (Logged Out)
```
┌──────────────────────────────────────────────────┐
│ 🚀 PortfolioAI            [Log In] [Sign Up]    │
└──────────────────────────────────────────────────┘
```

### Navigation Bar (Logged In)
```
┌─────────────────────────────────────────────────────────┐
│ 🚀 PortfolioAI  [👤 Mahesh Kumar] [Logout] [My Portfolio]│
└─────────────────────────────────────────────────────────┘
```

### Auth Modal (Signup)
```
┌──────────────────────────────────────┐
│  🎉 Join PortfolioAI            [×] │
│  Create your account and start      │
│  building amazing portfolios!       │
│                                      │
│  👤 Your Name                        │
│  [Mahesh Kumar____________]          │
│                                      │
│  📧 Email Address                    │
│  [you@example.com_________]          │
│                                      │
│  🔒 Password                         │
│  [••••••••••••____________]          │
│  💡 At least 6 characters            │
│                                      │
│  [✨ Create Account]                 │
│                                      │
│  Already have an account? Log In     │
│                                      │
│  📧 We'll send you a welcome email!  │
└──────────────────────────────────────┘
```

## Validation Rules

### Email Validation
- ✅ Must be valid email format
- ✅ Required for both signup and login
- Example: `user@example.com`

### Password Validation
- ✅ Minimum 6 characters
- ✅ Required for both signup and login
- Error shown if less than 6 characters

### Name Validation (Signup only)
- ✅ Required for signup
- ✅ No specific format restrictions
- Used in welcome email personalization

## Error Handling

### User-Friendly Error Messages

**Invalid Email**:
```
😅 Please provide a valid email address!
```

**Short Password**:
```
😅 Password must be at least 6 characters long!
```

**Missing Fields**:
```
😅 Please provide all required fields!
```

**Network Error**:
```
😅 Oops! Something went wrong. Please check your connection and try again!
```

**Login Failed**:
```
😅 Invalid credentials!
```

## Session Management

### Storage
- User data stored in `localStorage`
- Key: `'user'`
- Value: `{ name?: string, email: string }`

### Persistence
- Survives page refresh
- Cleared on logout
- Accessible across all pages

### Security Note
⚠️ **Current Implementation**: This is a demo/development implementation using localStorage. For production:
- Implement proper backend authentication
- Use secure HTTP-only cookies
- Add JWT tokens or session tokens
- Implement password hashing (bcrypt)
- Add CSRF protection
- Use database for user storage

## Email Template

### HTML Email Structure
```html
┌─────────────────────────────────────┐
│ 🚀 Welcome to PortfolioAI!         │ (Header)
│ (Purple gradient background)        │
├─────────────────────────────────────┤
│ Hi Mahesh! 👋                       │ (Content)
│                                     │
│ We're thrilled to have you here!   │
│                                     │
│ With PortfolioAI, you can:         │
│ ✨ Build stunning portfolios        │
│ 🤖 Get AI-powered suggestions       │
│ 🎨 Choose from beautiful templates  │
│ 📱 Export and share anywhere        │
│                                     │
│ [Start Building Now]                │ (CTA Button)
│                                     │
│ Need help? Just reply to this email│
│                                     │
│ Cheers,                             │
│ The PortfolioAI Team                │
├─────────────────────────────────────┤
│ © 2026 PortfolioAI                  │ (Footer)
└─────────────────────────────────────┘
```

## Testing the System

### 1. Test Signup
1. Open the app homepage
2. Click "Sign Up" button (top right)
3. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123`
4. Click "✨ Create Account"
5. Check console for email log
6. Verify you're logged in (see name in nav)

### 2. Test Login
1. Logout if logged in
2. Click "Log In" button
3. Enter email and password
4. Click "🚀 Log In"
5. Verify you're logged in

### 3. Test Logout
1. While logged in, click "Logout"
2. Confirm in popup
3. Verify you're logged out

### 4. Test Session Persistence
1. Log in
2. Refresh the page
3. Verify you're still logged in

### 5. Test Email Simulation
1. Sign up with new account
2. Open terminal/console where Next.js is running
3. Look for message:
   ```
   📧 Welcome email would be sent to: user@example.com
   ```
4. See the full email content in logs

## Integration with Email Service

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions on:
- Setting up Resend (recommended)
- Setting up SendGrid
- Setting up Nodemailer
- Setting up AWS SES
- Testing real email delivery

## Customization Guide

### Change Email Template
Edit: `app/api/send-welcome-email/route.ts`
```typescript
const emailContent = {
  subject: '🎉 Welcome to PortfolioAI!',  // Change subject
  html: `...`,  // Edit HTML
  text: `...`,  // Edit plain text
};
```

### Modify Validation Rules
Edit signup route: `app/api/auth/signup/route.ts`
```typescript
// Change minimum password length
if (password.length < 8) {  // Changed from 6 to 8
  return NextResponse.json(...)
}
```

### Change Modal Appearance
Edit: `components/AuthModal.tsx`
- Modify JSX structure
- Change Tailwind classes
- Update colors and styling

### Customize Messages
Search for these in the code:
- Success messages: `🎉 Welcome...`
- Error messages: `😅 Oops...`
- Button text: `✨ Create Account`

## Security Recommendations for Production

### 🔐 Must Implement:

1. **Password Hashing**
   ```bash
   npm install bcrypt
   ```
   Hash passwords before storing

2. **Database Storage**
   - Use PostgreSQL, MongoDB, or MySQL
   - Never store passwords in localStorage
   - Use proper user management

3. **JWT Tokens**
   ```bash
   npm install jsonwebtoken
   ```
   Implement secure token-based auth

4. **HTTP-Only Cookies**
   - Store tokens in secure cookies
   - Prevent XSS attacks

5. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```
   Prevent brute force attacks

6. **HTTPS**
   - Always use HTTPS in production
   - Secure data in transit

7. **Input Sanitization**
   ```bash
   npm install validator
   ```
   Sanitize all user inputs

8. **CSRF Protection**
   - Implement CSRF tokens
   - Validate on form submission

## Future Enhancements

### Planned Features:
- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, GitHub)
- [ ] Two-factor authentication
- [ ] User profile page
- [ ] Portfolio sharing with login
- [ ] Save portfolios to user account
- [ ] Multiple portfolios per user

### Nice to Have:
- [ ] Social login
- [ ] Remember me functionality
- [ ] Session timeout
- [ ] Login activity log
- [ ] Account deletion
- [ ] Profile picture upload

## Troubleshooting

### User Can't Log In
- Check password length (min 6 chars)
- Verify email format
- Check browser console for errors
- Clear localStorage if needed

### Email Not Showing
- Check browser console/terminal
- Verify email service is configured
- Check API route logs

### Session Lost on Refresh
- Check browser localStorage support
- Verify localStorage is not disabled
- Check for browser extensions blocking storage

## Support

For issues or questions:
- Check console for error messages
- Review API route logs
- Test with different browsers
- Clear localStorage and retry

## License

Part of the PortfolioAI project - See main README for license information.
