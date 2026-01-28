# AI Consultancy Landing Page

A modern, bilingual (English/Spanish) landing page for an AI automation consultancy targeting SMEs. Built with Java Spring Boot backend and React TypeScript frontend.

## 🚀 Features

- **Bilingual Support**: Full English/Spanish translation with language toggle
- **Modern UI**: Responsive design with Tailwind CSS and smooth animations
- **Interactive Chatbot**: AI-powered chat widget with automated responses
- **Quote Request System**: Comprehensive form with email notifications
- **Mobile-First**: Fully responsive design for all devices
- **Accessibility**: WCAG 2.1 compliant components

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (development) / **PostgreSQL** (production)
- **Spring Mail** (email notifications)

### Frontend
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **i18next** (internationalization)
- **Framer Motion** (animations)
- **Axios** (HTTP client)

## 📋 Prerequisites

- **Java 17+** installed
- **Node.js 16+** and **npm** installed
- **Maven 3.6+** installed
- **PostgreSQL** (optional, for production)

## 🔧 Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Configure database** (optional for production):
   
   Edit `src/main/resources/application.properties` and uncomment PostgreSQL configuration:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/consultancydb
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   ```
   
   Comment out H2 configuration if using PostgreSQL.

3. **Configure email** (optional):
   
   Set environment variables or edit `application.properties`:
   ```properties
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-app-password
   admin.email=admin@aiconsultancy.com
   ```
   
   For Gmail, you'll need to generate an [App Password](https://support.google.com/accounts/answer/185833).

4. **Build and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

5. **Access H2 Console** (development only):
   - Navigate to `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:consultancydb`
   - Username: `sa`
   - Password: (leave empty)

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API URL** (optional):
   
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   ```
   
   If not set, it defaults to `http://localhost:8080/api`.

4. **Start development server:**
   ```bash
   npm start
   ```
   
   The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/aiconsultancy/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Unit tests
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── i18n/                    # Translation files
│   │   ├── services/                # API services
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 🌐 API Endpoints

### Chat API
- `POST /api/chat/message` - Send a chat message
- `GET /api/chat/history/{sessionId}` - Get conversation history
- `POST /api/chat/validate-email` - Validate email address

### Quote Request API
- `POST /api/quote/request` - Submit a quote request
- `GET /api/quote/{id}` - Get a quote request by ID

## 🎨 Key Sections

1. **Hero Section**: Compelling value proposition with call-to-action buttons
2. **Services**: Overview of AI Training, Process Automation, and Custom Solutions
3. **Benefits**: Five key benefits of AI adoption for SMEs
4. **About**: Company expertise and statistics
5. **Contact**: Quote request form with validation
6. **Chatbot**: Interactive chat widget with automated responses

## 🔐 Environment Variables

### Backend
- `MAIL_USERNAME` - Email username for sending notifications
- `MAIL_PASSWORD` - Email password/app password
- `ADMIN_EMAIL` - Admin email for receiving quote requests

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: `http://localhost:8080/api`)

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 🚢 Production Deployment

### Backend
1. Update `application.properties` with production database credentials
2. Set environment variables for email configuration
3. Build JAR file:
   ```bash
   mvn clean package
   ```
4. Run JAR:
   ```bash
   java -jar target/ai-consultancy-backend-1.0.0.jar
   ```

### Frontend
1. Update API URL in `.env.production`:
   ```env
   REACT_APP_API_URL=https://your-api-domain.com/api
   ```
2. Build production bundle:
   ```bash
   npm run build
   ```
3. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

## 📝 Notes

- The chatbot uses session-based conversations stored in the database
- Email notifications require proper SMTP configuration
- Language preference is persisted in browser localStorage
- All form validations are handled both client-side and server-side

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions, please open an issue in the repository.
