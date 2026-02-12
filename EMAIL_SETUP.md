# Email Configuration Guide

This guide explains how to set up email confirmation for bookings.

## Environment Variables

Add these variables to your `.env.local` file:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Application URL (for images in emails)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate a 16-character password
   - Use this as `GMAIL_APP_PASSWORD`

## Image Display in Emails

For images to display properly in emails, set `NEXT_PUBLIC_APP_URL` to your deployed domain:

- **Vercel**: `https://your-project.vercel.app`
- **Custom domain**: `https://your-domain.com`
- **Development**: Images will use `localhost:3000` automatically

## Images Used in Email Template

The email template uses these images:
- `/logo/Pro_barbershop_logo.png` - Company logo
- `/Images/working-tools-barber-master(1).jpg` - Hero image
- `/Images/pexels-rdne-7697476.jpg` - Interior image

Make sure these files exist in your `public` directory.

## Testing

To test email functionality:
1. Set up environment variables
2. Create a test booking with a valid email
3. Check if the confirmation email arrives with images displaying correctly

## Troubleshooting

### Images Not Displaying
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Ensure image files exist in the `public` directory
- Check that your domain is publicly accessible

### Emails Not Sending
- Verify Gmail credentials are correct
- Check that 2FA and App Password are properly configured
- Review server logs for error messages

---

📧 **Note**: In development mode, the system will automatically use `localhost:3000` for image URLs, but emails won't display images properly unless sent to email clients that can access your local development server.