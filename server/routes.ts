import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { 
  insertContactMessageSchema,
  insertCourseApplicationSchema,
  insertDemoApplicationSchema,
  insertNewsletterSubscriptionSchema
} from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact Messages Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      res.json({ success: true, data: contactMessage });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: "Invalid data", details: error.errors });
      } else {
        console.error("Contact message error:", error);
        res.status(500).json({ success: false, error: "Failed to submit contact message" });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error("Get contact messages error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contact messages" });
    }
  });

  // Course Applications Routes
  app.post("/api/course-applications", async (req, res) => {
    try {
      const validatedData = insertCourseApplicationSchema.parse(req.body);
      const application = await storage.createCourseApplication(validatedData);
      res.json({ success: true, data: application });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: "Invalid data", details: error.errors });
      } else {
        console.error("Course application error:", error);
        res.status(500).json({ success: false, error: "Failed to submit course application" });
      }
    }
  });

  app.get("/api/course-applications", async (req, res) => {
    try {
      const applications = await storage.getCourseApplications();
      res.json({ success: true, data: applications });
    } catch (error) {
      console.error("Get course applications error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch course applications" });
    }
  });

  // Demo Applications Routes
  app.post("/api/demo-applications", async (req, res) => {
    try {
      const validatedData = insertDemoApplicationSchema.parse(req.body);
      const application = await storage.createDemoApplication(validatedData);
      res.json({ success: true, data: application });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: "Invalid data", details: error.errors });
      } else {
        console.error("Demo application error:", error);
        res.status(500).json({ success: false, error: "Failed to submit demo application" });
      }
    }
  });

  app.get("/api/demo-applications", async (req, res) => {
    try {
      const applications = await storage.getDemoApplications();
      res.json({ success: true, data: applications });
    } catch (error) {
      console.error("Get demo applications error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch demo applications" });
    }
  });

  // Newsletter Subscription Routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      const existingSubscriptions = await storage.getNewsletterSubscriptions();
      if (existingSubscriptions.some((sub) => sub.email === validatedData.email)) {
        return res.status(409).json({
          success: false,
          error: "This email is already subscribed to our newsletter"
        });
      }

      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json({ success: true, data: subscription });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: "Invalid email address", details: error.errors });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ success: false, error: "Failed to subscribe to newsletter" });
      }
    }
  });

  app.get("/api/newsletter/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json({ success: true, data: subscriptions });
    } catch (error) {
      console.error("Get newsletter subscriptions error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch newsletter subscriptions" });
    }
  });

  app.delete("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, error: "Email is required" });
      }

      await storage.deleteNewsletterSubscription(email);
      res.json({ success: true });
    } catch (error) {
      console.error("Newsletter unsubscribe error:", error);
      res.status(500).json({ success: false, error: "Failed to unsubscribe from newsletter" });
    }
  });

  // Event Registration Routes
  app.post("/api/event-registrations", async (req, res) => {
    try {
      // TODO: Add event registration schema validation
      console.log('Event registration data:', req.body);
      res.json({ success: true, data: { id: crypto.randomUUID(), ...req.body, created_at: new Date() } });
    } catch (error) {
      console.error("Event registration error:", error);
      res.status(500).json({ success: false, error: "Failed to submit event registration" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
