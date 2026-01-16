# 📧 Email Setup Instructions

Your application is now configured to send real welcome emails! Follow these simple steps:

## Quick Setup (5 minutes)

### Step 1: Install the Package
```bash
npm install
```
This will install the `resend` package that was added to your dependencies.

### Step 2: Get Your Free Resend API Key

1. **Visit Resend:** Go to [https://resend.com](https://resend.com)

2. **Sign Up:** Create a free account (100 emails/day free tier)

3. **Get API Key:**
   - After logging in, go to **API Keys** section
   - Click **Create API Key**
   - Copy your API key (starts with `re_`)

### Step 3: Add API Key to .env.local

Open your `.env.local` file and add your API key:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Step 4: Restart Your Dev Server

Stop your dev server (Ctrl+C) and restart it:
```bash
npm run dev
```

## ✅ Test It!

1. Go to your app and click **Sign Up**
2. Enter your details with **your real email address**
3. Complete signup
4. **Check your email inbox!** 📬

You should receive a beautiful welcome email with:
- Personalized greeting with your name
- Feature highlights
- Call-to-action button
- Professional design

## 🎨 Email Preview

The welcome email includes:
```
🚀 Welcome to PortfolioAI!

Hi [Your Name]! 👋

We're thrilled to have you here! You've just taken the 
first step towards creating an amazing professional portfolio.

With PortfolioAI, you can:
✨ Build stunning portfolios in minutes
🤖 Get AI-powered content suggestions
🎨 Choose from beautiful templates
📱 Export and share anywhere

[Start Building Now] (button)

Need help? Just reply to this email!

Cheers,
The PortfolioAI Team
```

## 🔧 Customization

### Change Sender Email (For Production)

In `app/api/send-welcome-email/route.ts`, line 37:

**For Testing:**
```typescript
from: 'PortfolioAI <onboarding@resend.dev>'
```

**For Production (with your domain):**
1. Verify your domain in Resend dashboard
2. Change to:
```typescript
from: 'PortfolioAI <hello@yourdomain.com>'
```

### Customize Email Content

Edit the `emailContent` object in `app/api/send-welcome-email/route.ts`:

```typescript
const emailContent = {
  subject: '🎉 Your Custom Subject!',
  html: `
    <!-- Your custom HTML -->
  `,
  text: `Your custom plain text`,
};
```

## 🚨 Troubleshooting

### Email Not Sending?

**Check Console Logs:**
- Look for `✅ Welcome email sent successfully` in terminal
- Or `⚠️ RESEND_API_KEY not configured`

**Common Issues:**

1. **API Key Not Set:**
   ```
   ⚠️ RESEND_API_KEY not configured
   ```
   Solution: Add API key to `.env.local` and restart server

2. **Invalid API Key:**
   ```
   ❌ Resend error: Invalid API key
   ```
   Solution: Check your API key is correct

3. **Email Goes to Spam:**
   - Check your spam folder
   - For production, verify your domain in Resend
   - Add SPF/DKIM records

4. **Free Tier Limit Reached:**
   - Resend free tier: 100 emails/day
   - Upgrade if needed

### Check Email Status

In terminal after signup, you'll see:
```
✅ Welcome email sent successfully to: user@example.com
📧 Email ID: abc123...
```

Copy the Email ID and check it in Resend dashboard > Emails

## 📊 Monitor Emails

In your Resend dashboard you can:
- ✅ See all sent emails
- 📊 Check delivery status
- 👀 Preview email content
- 📈 View open rates
- 🔍 Debug issues

## 🆓 Free Tier Limits

**Resend Free Tier:**
- 100 emails per day
- 3,000 emails per month
- Full API access
- Email logs and analytics

Perfect for:
- Development
- Testing
- Small projects
- Side projects

## 🚀 Production Checklist

Before going live:

- [ ] Add `RESEND_API_KEY` to production environment variables
- [ ] Verify your custom domain in Resend
- [ ] Update sender email to your domain
- [ ] Add SPF/DKIM records to DNS
- [ ] Test email delivery
- [ ] Check spam score
- [ ] Consider upgrading plan if needed
- [ ] Set up email monitoring

## 💡 Alternative Email Services

If you prefer a different service, you can easily switch:

### SendGrid
```bash
npm install @sendgrid/mail
```

### Nodemailer (SMTP)
```bash
npm install nodemailer
```

### AWS SES
```bash
npm install @aws-sdk/client-ses
```

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions.

## 🎉 You're All Set!

Once configured, every new user will automatically receive a welcome email! 

The email will be sent to whatever email address they provide during signup.

## Need Help?

- 📚 Resend Docs: [resend.com/docs](https://resend.com/docs)
- 💬 Resend Support: [resend.com/support](https://resend.com/support)
- 🐛 Issues: Check terminal logs for detailed error messages

Happy emailing! 📧✨
