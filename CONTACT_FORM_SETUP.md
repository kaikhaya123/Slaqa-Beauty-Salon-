# Contact Form Setup Guide

## New Contact Form Design Implementation

The contact page has been redesigned with a modern, professional split-layout design inspired by contemporary web design patterns.

### Features

✅ **Beautiful UI Design**
- Split layout: Image on left, contact form on right
- Dark navy/teal gradient background with yellow accents
- Responsive design (mobile and desktop)
- Smooth animations and hover effects
- Vertical text elements for visual interest

✅ **Contact Form Functionality**
- Name, Email, and Message input fields
- Form validation
- Auto-submit with loading state
- Success confirmation message
- Email notifications (to business + auto-reply to customer)

✅ **Contact Information Display**
- Phone number: +27 66 564 1784 (pulls from BUSINESS_INFO.phone)
- Email: contact@slaqa.co.za (pulls from BUSINESS_INFO.email)
- Social media links (Instagram, Facebook)
- Language selector (EN)

### Files Created/Updated

1. **New Component**: `components/contact/ContactFormSection.tsx`
   - Main contact form component
   - Beautiful split layout design
   - Responsive for all screen sizes

2. **API Endpoint**: `app/api/contact/route.ts`
   - Handles form submissions
   - Sends email to business owner
   - Sends auto-reply to customer

3. **Updated Page**: `app/contact/page.tsx`
   - Replaced old contact info section
   - Integrated new ContactFormSection component

### Required Environment Variables

Add these to your `.env.local` file for email functionality:

```
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=your-app-specific-password
```

### Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the generated 16-character password
3. **Update Environment Variables**:
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_PASSWORD`: The 16-character app password (without spaces)

### Features

- ✅ Responsive design (mobile-first)
- ✅ Email notifications to business
- ✅ Auto-reply emails to customers
- ✅ Form validation
- ✅ Loading states and success feedback
- ✅ Social media integration
- ✅ Professional styling with animations
- ✅ Accessibility features

### Customization Options

**Colors**:
- Yellow accents: `#FFFF00` (from Slaqa branding)
- Adjust gradient colors in `from-black-900 via-blue-950 to-black-900`

**Contact Details**:
- Automatically pulled from `BUSINESS_INFO` in `lib/constants.ts`
- Update there to change across entire site

**Social Links**:
- Instagram: Update href in component
- Facebook: Update href in component

### Testing

1. Fill out the contact form
2. Check that email is sent successfully
3. Verify auto-reply is received in your inbox
4. Test on mobile and desktop layouts
