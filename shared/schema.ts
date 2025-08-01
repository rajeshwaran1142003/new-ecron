import { pgTable, text, serial, integer, boolean, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  courseInterest: text("course_interest"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Course applications table
export const courseApplications = pgTable("course_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  courseName: text("course_name").notNull(),
  experienceLevel: text("experience_level").notNull(),
  interestMessage: text("interest_message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Demo applications table
export const demoApplications = pgTable("demo_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  courseForDemo: text("course_for_demo").notNull(),
  availableTime: text("available_time").notNull(),
  preferredDate: text("preferred_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Newsletter subscriptions table
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  email: text("email").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Schema definitions for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertCourseApplicationSchema = createInsertSchema(courseApplications).omit({
  id: true,
  createdAt: true,
});

export const insertDemoApplicationSchema = createInsertSchema(demoApplications).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  createdAt: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type CourseApplication = typeof courseApplications.$inferSelect;
export type InsertCourseApplication = z.infer<typeof insertCourseApplicationSchema>;

export type DemoApplication = typeof demoApplications.$inferSelect;
export type InsertDemoApplication = z.infer<typeof insertDemoApplicationSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
