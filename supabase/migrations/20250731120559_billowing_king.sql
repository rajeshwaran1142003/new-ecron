-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact Messages Table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    course_interest TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Applications Table
CREATE TABLE course_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    course_name TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    interest_message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Demo Applications Table
CREATE TABLE demo_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    course_for_demo TEXT NOT NULL,
    available_time TEXT NOT NULL,
    preferred_date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Registrations Table
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    degree TEXT NOT NULL,
    year TEXT NOT NULL,
    college_name TEXT NOT NULL,
    university_name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    alternate_number TEXT,
    email_id TEXT NOT NULL,
    certificate_code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on course_applications" ON course_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on demo_applications" ON demo_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on newsletter_subscriptions" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on event_registrations" ON event_registrations FOR INSERT WITH CHECK (true);

-- Allow public read access for newsletter subscription checks
CREATE POLICY "Allow public select on newsletter_subscriptions" ON newsletter_subscriptions FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_course_applications_created_at ON course_applications(created_at DESC);
CREATE INDEX idx_demo_applications_created_at ON demo_applications(created_at DESC);
CREATE INDEX idx_event_registrations_created_at ON event_registrations(created_at DESC);
CREATE INDEX idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);