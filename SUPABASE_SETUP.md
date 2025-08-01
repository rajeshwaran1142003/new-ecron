# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Sign in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `ecron-technologies`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

Once your project is created:

1. Go to Settings → API
2. Copy your project credentials:
   - `Project URL`: This is your `SUPABASE_URL` and `VITE_SUPABASE_URL`
   - `anon public`: This is your `VITE_SUPABASE_ANON_KEY`
   - `service_role`: This is your `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 3. Set Up Environment Variables

Update your `.env` file with your actual Supabase credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Server-side Supabase (for secure operations)
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project-ref.supabase.co:5432/postgres
```

## 4. Run Database Migration

Copy and run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_interest TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course applications table
CREATE TABLE IF NOT EXISTS course_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_name TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  interest_message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Demo applications table
CREATE TABLE IF NOT EXISTS demo_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  course_for_demo TEXT NOT NULL,
  available_time TEXT NOT NULL,
  preferred_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  degree TEXT NOT NULL,
  year TEXT NOT NULL,
  college_name TEXT NOT NULL,
  university_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  alternate_number TEXT,
  email_id TEXT NOT NULL,
  certificate_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert access
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert on course_applications" ON course_applications
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert on demo_applications" ON demo_applications
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert on newsletter_subscriptions" ON newsletter_subscriptions
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public select on newsletter_subscriptions" ON newsletter_subscriptions
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert on event_registrations" ON event_registrations
  FOR INSERT TO public WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_course_applications_created_at ON course_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_applications_created_at ON demo_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_event_registrations_created_at ON event_registrations(created_at DESC);
```

## 5. Configure Authentication (Optional)

If you want to add user authentication:

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure your site URL and redirect URLs
3. Enable email confirmation if desired
4. Set up any additional auth providers

## 6. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try submitting any form on the website
3. Check your Supabase dashboard → Table Editor to see if data is being saved

## 7. Security Considerations

- **Never expose your service role key** in client-side code
- The service role key is only used on the server-side for admin operations
- Row Level Security (RLS) is enabled to protect your data
- Only public insert operations are allowed for form submissions

## 8. Next Steps

- Set up email notifications for form submissions
- Create an admin dashboard to view submissions
- Configure additional authentication methods if needed
- Set up backup and monitoring

## Troubleshooting

- **Connection errors**: Check your environment variables
- **Permission errors**: Verify RLS policies in Supabase dashboard
- **Migration errors**: Run SQL manually in Supabase SQL editor
- **CORS errors**: Check your site URL configuration in Supabase auth settings