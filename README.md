# LoginStream

A modern, full-stack authentication application built with React, Node.js, and PostgreSQL. LoginStream provides a comprehensive authentication system with email verification, password reset functionality, and secure token management.

## 🚀 Features

### Authentication & Security
- **User Registration & Login** - Secure user registration and login with email/password
- **Email Verification** - OTP-based email verification system
- **Password Reset** - Secure password reset with OTP verification
- **Change Password** - Authenticated password change functionality
- **JWT Authentication** - Access and refresh token system with automatic token refresh
- **Protected Routes** - Route protection with authentication middleware
- **Password Hashing** - Secure password storage using bcrypt

### User Experience
- **Responsive Design** - Modern UI built with Tailwind CSS and Radix UI components
- **Form Validation** - Client and server-side validation using Zod schemas
- **Loading States** - Comprehensive loading states and error handling
- **Toast Notifications** - User-friendly notifications using Sonner
- **Error Boundaries** - Graceful error handling with React Error Boundaries

### Technical Features
- **State Management** - Redux Toolkit for global state management
- **Database ORM** - Prisma ORM with PostgreSQL
- **Email Service** - Automated email sending with Mailgen templates
- **Logging** - Winston logger for comprehensive logging
- **Code Quality** - ESLint and Prettier for code formatting
- **Development Tools** - Hot reload with Vite

## 🏗️ Architecture

### Frontend (React + Vite)
```
client/
├── src/
│   ├── app/                 # Redux store and API calls
│   ├── components/          # Reusable UI components
│   ├── config/             # Configuration files
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   ├── routes/             # Route definitions
│   └── lib/                # Utility functions
```

### Backend (Node.js + Express)
```
server/
├── controllers/            # Request handlers
├── middlewares/            # Custom middleware
├── routes/                 # API routes
├── utils/                  # Utility functions
├── validators/             # Validation schemas
├── prisma/                 # Database schema and migrations
└── logger/                 # Logging configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **Redux Toolkit 2.9.0** - State management
- **React Router DOM 7.8.1** - Client-side routing
- **Tailwind CSS 4.1.12** - Styling
- **Radix UI** - Accessible component primitives
- **React Hook Form 7.62.0** - Form handling
- **Zod 4.1.7** - Schema validation
- **Axios 1.11.0** - HTTP client
- **Sonner 2.0.7** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **Prisma 6.15.0** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Token-based authentication
- **Bcrypt 6.0.0** - Password hashing
- **Nodemailer 7.0.6** - Email service
- **Winston 3.17.0** - Logging
- **Zod 4.1.5** - Schema validation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/loginstream.git
cd loginstream
```

### 2. Install Dependencies

#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd server
npm install
```

### 3. Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `server` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/loginstream"

# JWT Secrets
ACCESS_TOKEN_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
ACCESS_TOKEN_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="15d"

# Email Configuration (Mailtrap/other email service)
MAILTRAP_MAIL="your_email@example.com"
MAILTRAP_HOST="sandbox.smtp.mailtrap.io"
MAILTRAP_PORT="2525"
MAILTRAP_USERNAME="your_mailtrap_username"
MAILTRAP_PASSWORD="your_mailtrap_password"

# Production Email Configuration (Port 465 for SMTPS)
EMAIL_MAIL="your_production_email@domain.com"
EMAIL_HOST="smtp.your-domain.com"
EMAIL_PORT="465"
EMAIL_USERNAME="your_email_username"
EMAIL_PASSWORD="your_email_password"

# Server Configuration
PORT=8000
NODE_ENV="development"
```

#### Frontend Environment Variables
Create a `.env` file in the `client` directory:

```env
VITE_BASE_URL=http://localhost:8000/api/v1
```

### 4. Database Setup

#### Generate Prisma Client
```bash
cd server
npx prisma generate
```

#### Run Database Migrations
```bash
npx prisma migrate deploy
```

#### (Optional) Seed Database
```bash
npx prisma db seed
```

## 🚀 Running the Application

### Development Mode

#### Start the Backend Server
```bash
cd server
npm run start
```
The server will start on `http://localhost:8000`

#### Start the Frontend Development Server
```bash
cd client
npm run dev
```
The client will start on `http://localhost:5173`

### Production Build

#### Build the Frontend
```bash
cd client
npm run build
```

#### Start Production Server
```bash
cd server
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### User Registration
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### User Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Send Email Verification OTP
```http
POST /api/v1/auth/send-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Verify Email OTP
```http
POST /api/v1/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Forgot Password - Send OTP
```http
POST /api/v1/auth/forgotPassword/send-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Forgot Password - Verify OTP
```http
POST /api/v1/auth/forgotPassword/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Reset Password
```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "resetToken": "reset_token_from_verify_otp",
  "confirmPassword": "newpassword123"
}
```

#### Change Password
```http
POST /api/v1/auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

#### Get Current User
```http
GET /api/v1/auth/getme
Authorization: Bearer <access_token>
```

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer <access_token>
```

#### Refresh Access Token
```http
GET /api/v1/auth/refresh-access-token
```

### Health Check
```http
GET /api/v1/health-check
```


## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test
```

### Test Coverage
```bash
# Generate coverage report
npm run test:coverage
```

```

## 🛠️ Development

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name migration_name
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors  

Made by [Sourish](https://github.com/sourish19) 😎
