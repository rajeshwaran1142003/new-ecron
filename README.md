# Ecron Technologies Website

This project is a modern website for Ecron Technologies, a software training institute in Tamil Nadu, India.

## 🚀 Features

- **Modern Website Features**
  - Responsive design for all devices
  - Course catalog and detailed course pages
  - Contact forms and demo scheduling
  - Newsletter subscription
  - Event registration system
  - Professional testimonials and statistics

- **Technical Features**
  - Built with React and TypeScript
  - Tailwind CSS for styling
  - Express.js backend API
  - Form validation and error handling
  - Modern animations and interactions

## 📋 Prerequisites

Before running the project, ensure you have:

1. **Node.js**: Version 16 or higher
2. **npm**: Package manager

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utility functions and API clients
│   │   └── styles/        # CSS and styling files
├── server/                # Backend Express.js application
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                # Shared types and schemas
└── dist/                  # Built application files
```

## 🔌 Data Integration

**Note: Database integration has been removed. Please implement your preferred data storage solution.**

### Forms That Need Data Integration

1. **Contact Form** - Contact inquiries and messages
2. **Course Applications** - Course enrollment applications
3. **Demo Scheduling** - Free demo session bookings
4. **Newsletter Subscription** - Email newsletter signups
5. **Event Registration** - Campus to Cloud event registrations

### Implementation Required

- Replace placeholder functions in `client/src/lib/supabaseClient.ts`
- Implement authentication system in `client/src/components/AuthProvider.tsx`
- Add database schema and API endpoints
- Configure email notifications for form submissions

## 🎨 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations
- **Course Catalog**: Detailed information about programming courses
- **Contact Forms**: Multiple ways for students to get in touch
- **Event System**: Registration for special events and workshops
- **Newsletter**: Email subscription for updates and news

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Build Tools**: Vite, ESBuild
- **Validation**: Zod schemas
- **Icons**: Lucide React
- **Animations**: CSS animations and transitions

## 📞 Support

For questions about the codebase or implementation:

1. Check the browser console for error messages
2. Review the placeholder functions for implementation guidance
3. Ensure all required dependencies are installed

## 🔄 Next Steps

After setting up your preferred data storage solution:

1. **Database Setup**: Choose and configure your database solution
2. **API Implementation**: Replace placeholder functions with real API calls
3. **Authentication**: Implement user authentication system
4. **Email Integration**: Set up email notifications for form submissions
5. **Admin Dashboard**: Create admin interface for managing submissions
6. **Analytics**: Add tracking and analytics for website performance

## 📄 License

This project is proprietary software for Ecron Technologies.

---

**Ecron Technologies** - Empowering careers through quality software education and industry connections.