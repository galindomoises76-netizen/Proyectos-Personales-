# AI Consultancy Landing Page - Next.js 14

A modern, bilingual (English/Spanish) landing page for an AI automation consultancy targeting SMEs. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Bilingual Support**: Full English/Spanish translation with language toggle
- **Modern UI**: Responsive design with Tailwind CSS and smooth animations
- **Interactive Chatbot**: AI-powered chat widget with automated responses
- **Quote Request System**: Comprehensive form with email notifications
- **Mobile-First**: Fully responsive design for all devices
- **Database**: SQLite database for chat messages and quote requests
- **Server-Side API**: Next.js API routes for backend functionality

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **i18next** - Internationalization
- **Framer Motion** - Animation library
- **SQLite** - Database (better-sqlite3)
- **Nodemailer** - Email functionality

## 📋 Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd nextjs-app
npm install
```

### 2. Configure Environment Variables (Optional)

Create a `.env.local` file in the `nextjs-app` directory:

```env
# Email Configuration (Optional - for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@aiconsultancy.com
```

**Note:** Email functionality is optional. The site will work without it, but email notifications won't be sent.

For Gmail, you'll need to generate an [App Password](https://support.google.com/accounts/answer/185833).

### 3. Run Development Server

```bash
npm run dev
```

The site will be available at: **http://localhost:3000**

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs-app/
├── app/
│   ├── api/              # API routes
│   │   ├── chat/         # Chatbot endpoints
│   │   └── quote/        # Quote request endpoint
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Benefits.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Chatbot.tsx
│   ├── Footer.tsx
│   └── I18nProvider.tsx
├── lib/
│   ├── db.ts            # Database setup
│   └── i18n/            # Translation files
└── package.json
```

## 🌐 API Endpoints

### Chat API
- `POST /api/chat` - Send a chat message
- `POST /api/chat/validate-email` - Validate email address

### Quote Request API
- `POST /api/quote` - Submit a quote request

## 🎨 Key Sections

1. **Hero Section**: Compelling value proposition with call-to-action buttons
2. **Services**: Overview of AI Training, Process Automation, and Custom Solutions
3. **Benefits**: Five key benefits of AI adoption for SMEs
4. **About**: Company expertise and statistics
5. **Contact**: Quote request form with validation
6. **Chatbot**: Interactive chat widget with automated responses

## 🗄️ Database

The application uses SQLite (better-sqlite3) for data storage. The database file (`consultancy.db`) is automatically created in the project root on first run.

**Tables:**
- `chat_messages` - Stores chatbot conversations
- `quote_requests` - Stores quote request submissions

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Next.js can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

**Note:** For production, consider using PostgreSQL instead of SQLite for better scalability.

## 🔐 Environment Variables

- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username (email)
- `SMTP_PASSWORD` - SMTP password/app password
- `ADMIN_EMAIL` - Admin email for receiving quote requests

## 📝 Notes

- The chatbot uses session-based conversations stored in the database
- Email notifications require proper SMTP configuration
- Language preference is persisted in browser localStorage
- All form validations are handled both client-side and server-side
- Database is automatically initialized on first run

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions, please open an issue in the repository.
