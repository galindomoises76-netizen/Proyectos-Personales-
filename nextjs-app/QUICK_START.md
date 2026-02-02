# Quick Start Guide

## Get Your Site Running in 3 Steps

### Step 1: Install Dependencies

```bash
cd nextjs-app
npm install
```

### Step 2: Run the Development Server

```bash
npm run dev
```

### Step 3: Open Your Browser

Go to: **http://localhost:3000**

That's it! Your site is now running! 🎉

---

## What You'll See

- ✅ **Hero Section** - Main landing area with call-to-action
- ✅ **Services** - Three service cards
- ✅ **Benefits** - Five benefit cards
- ✅ **About** - Company information and stats
- ✅ **Contact Form** - Quote request form
- ✅ **Chatbot** - Floating chat widget (bottom right)
- ✅ **Language Toggle** - EN/ES button in navbar

---

## Test the Features

1. **Language Toggle**: Click the EN/ES button in the navbar
2. **Chatbot**: Click the chat icon (bottom right) and try asking:
   - "What services do you offer?"
   - "How can AI help my business?"
   - "What's the typical project timeline?"
3. **Contact Form**: Fill out and submit the quote request form

---

## Optional: Email Configuration

If you want email notifications to work, create a `.env.local` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@aiconsultancy.com
```

**Note:** The site works perfectly without email configuration - you just won't receive email notifications.

---

## Troubleshooting

### Port 3000 already in use?
Next.js will automatically use the next available port (3001, 3002, etc.)

### Installation errors?
Try:
```bash
npm install --legacy-peer-deps
```

### Database errors?
The database is automatically created on first run. Make sure you have write permissions in the project directory.

---

**Enjoy your new Next.js landing page!** 🚀
