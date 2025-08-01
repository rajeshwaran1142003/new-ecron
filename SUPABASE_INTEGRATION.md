# Data Integration Documentation

## Overview
This document outlines the integration points for user forms and data storage for the Ecron Technologies website.

**Note: Supabase integration has been removed. Please implement your preferred data storage solution.**

## Forms That Need Data Integration

### 1. Apply for this Course (CourseDetailPage.tsx)
- **Data Fields**: full_name, email, phone, course_name, experience_level, interest_message
- **Current Status**: Placeholder function logs data to console
- **TODO**: Implement with your chosen database/API

### 2. Schedule Free Demo (DemoForm.tsx)
- **Data Fields**: name, phone, email, course_for_demo, available_time, preferred_date
- **Current Status**: Placeholder function logs data to console
- **TODO**: Implement with your chosen database/API

### 3. Stay Updated - Newsletter (Footer.tsx)
- **Data Fields**: email
- **Current Status**: Placeholder function simulates success
- **TODO**: Implement with your chosen database/API and email service

### 4. Send us a Message (Contact.tsx)
- **Data Fields**: first_name, last_name, email, phone, course_interest, message
- **Current Status**: Placeholder function logs data to console
- **TODO**: Implement with your chosen database/API

### 5. Campus to Cloud Event Registration (EventRegistrationForm.tsx)
- **Data Fields**: name, degree, year, college_name, university_name, contact_number, alternate_number, email_id, certificate_code
- **Current Status**: Placeholder function logs data to console
- **TODO**: Implement with your chosen database/API

## Required Database Schema

All forms will need corresponding database tables with the fields listed above, plus:
- UUID primary keys (except newsletter which can use email as PK)
- `created_at` timestamp fields
- Appropriate data validation
- Security measures for data protection

## Authentication System

The AuthProvider component is currently a placeholder. You'll need to:
- Implement user authentication
- Add session management
- Configure access controls for admin features

## Next Steps

1. Choose your preferred database solution (PostgreSQL, MySQL, MongoDB, etc.)
2. Set up your database schema based on the forms above
3. Implement API endpoints for form submissions
4. Replace placeholder functions in `client/src/lib/supabaseClient.ts`
5. Configure authentication system in `client/src/components/AuthProvider.tsx`
6. Add proper error handling and validation
7. Set up email notifications for form submissions
8. Implement admin dashboard for viewing submissions

## Files That Need Implementation

- `client/src/lib/supabaseClient.ts` - Replace all functions with your API calls
- `client/src/components/AuthProvider.tsx` - Implement authentication
- `client/src/lib/newsletter.ts` - Implement newsletter subscription logic

## Environment Variables to Configure

Remove these Supabase variables and add your own:
- ~~VITE_SUPABASE_URL~~
- ~~VITE_SUPABASE_ANON_KEY~~

Add variables for your chosen solution:
- DATABASE_URL (or similar)
- API_BASE_URL
- AUTH_SECRET_KEY
- EMAIL_SERVICE_API_KEY (for newsletters)