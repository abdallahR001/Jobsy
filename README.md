# Jobsy - Job Board Platform

A comprehensive job board platform connecting job seekers with employers, featuring real-time notifications, AI-powered resume generation, and advanced job matching algorithms.

## 🚀 Features

### For Job Seekers
- **Smart Job Matching**: Get personalized job recommendations based on your skills and experience
- **Advanced Search**: Search jobs by title, location, category, and skills
- **AI Resume Generator**: Generate professional resumes using Google's Generative AI
- **Application Tracking**: Track all your job applications in one place
- **Company Following**: Follow companies and stay updated with their latest job postings
- **Job Saving**: Bookmark jobs for later review
- **Portfolio Management**: Upload and manage portfolio files (documents, images, videos)
- **Skill Management**: Add and showcase your professional skills
- **Real-time Notifications**: Receive instant updates on application status
- **Google OAuth Integration**: Quick sign-up and login with Google account

### For Employers/Companies
- **Job Posting Management**: Create, edit, and manage job listings
- **Applicant Tracking System (ATS)**: Review and manage all applications
- **Company Dashboard**: Analytics and insights about your job postings
- **Application Management**: Accept, reject, or mark applications as seen
- **Follower Insights**: Track users following your company
- **Notification System**: Send notifications to potential candidates
- **Google OAuth Integration**: Streamlined company registration

### For Administrators
- **Category Management**: Create and manage job categories
- **Skill Database**: Maintain a comprehensive skills database
- **Platform Oversight**: Monitor and manage users, companies, and jobs

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - Server framework
- **Prisma ORM** - Database management with PostgreSQL
- **JWT** - Authentication and authorization
- **Passport.js** - Google OAuth 2.0 integration
- **Socket.io** - Real-time communication
- **Redis** - Caching layer
- **Multer** - File upload handling
- **Bcrypt.js** - Password hashing
- **Nodemailer** - Email notifications

### AI Integration
- **Google Generative AI** - AI-powered resume generation

### Database
- **PostgreSQL** - Primary database

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Redis server
- Google OAuth credentials

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd jobsy-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/jobsy"
JWT_SECRET="your-jwt-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
REDIS_URL="redis://localhost:6379"
EMAIL_USER="your-email@example.com"
EMAIL_PASS="your-email-password"
```

4. **Set up the database**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Run the application**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📚 API Documentation

### Authentication Routes

#### Users
- `GET /api/users/google` - Initiate Google OAuth for users
- `GET /api/users/google/callback` - Google OAuth callback
- `POST /api/users/signUp` - Create user account
- `POST /api/users/signIn` - User login
- `GET /api/users/logout` - User logout
- `GET /api/users/me` - Get current user info

#### Companies
- `GET /api/companies/google` - Initiate Google OAuth for companies
- `GET /api/companies/google/callback` - Google OAuth callback
- `POST /api/companies` - Create company account
- `POST /api/companies/login` - Company login
- `GET /api/companies/logout` - Company logout

### User Routes

#### Profile Management
- `GET /api/users/profile` - Get user profile
- `GET /api/users/viewprofile/:userId` - View another user's profile
- `PUT /api/users/update-profile` - Update profile (with image upload)
- `DELETE /api/users/delete` - Delete account
- `GET /api/users/field` - Get user's field of expertise
- `GET /api/users/onBoarding` - Onboarding page data

#### Resume & Portfolio
- `POST /api/users/resume` - Upload resume
- `POST /api/users/upload-file` - Upload portfolio file
- `DELETE /api/users/delete-file/:fileId` - Delete portfolio file

#### Skills
- `POST /api/users/add-skill` - Add skill to profile
- `GET /api/skills/userskills` - Get user's skills
- `PUT /api/skills/add-user-skills` - Add multiple skills
- `PUT /api/skills/delete-user-skill` - Remove skill

#### Job Interactions
- `POST /api/users/save` - Save/bookmark a job
- `GET /api/users/savedjobs` - Get saved jobs
- `POST /api/users/follow` - Follow a company
- `GET /api/users/followed-companies` - Get followed companies
- `GET /api/users/company/:companyId` - View company profile
- `GET /api/users/home` - Homepage with job recommendations

### Company Routes

#### Company Management
- `GET /api/companies` - Get company details
- `PUT /api/companies` - Update company profile (with image upload)
- `DELETE /api/companies` - Delete company account
- `GET /api/companies/dashboard` - Company dashboard
- `GET /api/companies/onBoarding` - Onboarding page data

#### Applicant Management
- `GET /api/companies/applicants` - Get all applicants
- `GET /api/companies/followers` - Get company followers

### Job Routes

#### Job Listings
- `GET /api/jobs` - Get jobs based on user skills
- `GET /api/jobs/search` - Search jobs (query parameters)
- `GET /api/jobs/activejobs` - Get open/active jobs
- `GET /api/jobs/companyjobs` - Get company's jobs
- `GET /api/jobs/category/:categoryId` - Get jobs by category
- `GET /api/jobs/:jobId` - Get specific job details
- `GET /api/jobs/dashboard/:jobId` - Get job for company dashboard

#### Job Management (Companies)
- `POST /api/jobs` - Create new job posting
- `DELETE /api/jobs/:jobId` - Delete specific job
- `DELETE /api/jobs` - Delete all company jobs

### Application Routes

#### For Job Seekers
- `GET /api/applications/my-applications` - Get user's applications
- `POST /api/applications/:jobId` - Apply to a job

#### For Companies
- `GET /api/applications/:jobId` - Get applications for a job
- `PUT /api/applications/see/:applicationId` - Mark application as seen
- `PUT /api/applications/accept/:applicationId` - Accept application
- `PUT /api/applications/reject/:applicationId` - Reject application

### Category Routes

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get specific category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Skills Routes

- `GET /api/skills/default` - Get default skills
- `GET /api/skills/search` - Search skills
- `GET /api/skills/:id` - Get specific skill
- `POST /api/skills` - Add skill (Admin)
- `PUT /api/skills` - Update skill (Admin)
- `DELETE /api/skills` - Delete skill (Admin)

### Notification Routes

- `POST /api/notifications` - Create notification (Companies)
- `GET /api/notifications` - Get all user notifications
- `GET /api/notifications/:notificationId` - Get specific notification

### AI Routes

- `POST /api/gemini` - Generate resume using AI

## 🔐 Authentication & Authorization

The platform implements role-based access control (RBAC) with three user roles:

- **user**: Job seekers
- **company**: Employers
- **admin**: Platform administrators

### Protected Routes
All routes (except sign-up and sign-in) require JWT authentication via the `authMiddleWare`. Additional authorization is enforced using the `authorizeRoles` middleware.

## 📂 Database Schema

### Main Models

- **User**: Job seeker profiles with skills, experience, and portfolio
- **Company**: Employer profiles with job postings
- **Job**: Job listings with requirements and details
- **Application**: Job applications with status tracking
- **Skill**: Skills database linked to users and jobs
- **Category**: Job categories for organization
- **Notification**: Real-time notification system
- **PortfolioFile**: User portfolio files
- **Resume**: User resume storage
- **Admin**: Platform administrator accounts

## 🔄 Real-time Features

- Live notification system using Socket.io
- Instant application status updates
- Real-time job posting alerts for followers

## 📝 File Upload

Supports multiple file types for:
- Profile images
- Company logos
- Portfolio files (PDFs, images, videos)
- Resumes

**Security**: Blocks executable files (.exe) and enforces 50MB file size limit

## 🚦 Development

### Running in Development Mode
```bash
npm run dev
```

Uses `nodemon` for automatic server restart on file changes.

### Database Management
```bash
# Create migration
npx prisma migrate dev --name migration-name

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

## 🤝 Contributing

This project is part of a portfolio. If you'd like to contribute or have suggestions, feel free to reach out.

## 👨‍💻 Author

**Abdullah Ramadan**

## 📄 License

ISC

## 🙏 Acknowledgments

- Google Generative AI for resume generation capabilities
- All the open-source libraries that made this project possible

---

**Built with ❤️ as a portfolio project**
