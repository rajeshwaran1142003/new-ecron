import type { Express } from "express";
import { createServer, type Server } from "http";
import { supabaseAdmin } from "./supabase";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact Messages Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .insert(req.body)
        .select()
        .single();

      if (error) {
        console.error("Contact message error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Contact message error:", error);
      res.status(500).json({ success: false, error: "Failed to submit contact message" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Get contact messages error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Get contact messages error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contact messages" });
    }
  });

  // Course Applications Routes
  app.post("/api/course-applications", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('course_applications')
        .insert(req.body)
        .select()
        .single();

      if (error) {
        console.error("Course application error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Course application error:", error);
      res.status(500).json({ success: false, error: "Failed to submit course application" });
    }
  });

  app.get("/api/course-applications", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('course_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Get course applications error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Get course applications error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch course applications" });
    }
  });

  // Demo Applications Routes
  app.post("/api/demo-applications", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('demo_applications')
        .insert(req.body)
        .select()
        .single();

      if (error) {
        console.error("Demo application error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Demo application error:", error);
      res.status(500).json({ success: false, error: "Failed to submit demo application" });
    }
  });

  app.get("/api/demo-applications", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('demo_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Get demo applications error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Get demo applications error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch demo applications" });
    }
  });

  // Newsletter Subscription Routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      // Check if already subscribed
      const { data: existing } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', req.body.email)
        .single();

      if (existing) {
        return res.status(409).json({ 
          success: false, 
          error: "This email is already subscribed to our newsletter" 
        });
      }

      const { data, error } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .insert(req.body)
        .select()
        .single();

      if (error) {
        console.error("Newsletter subscription error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ success: false, error: "Failed to subscribe to newsletter" });
    }
  });

  app.get("/api/newsletter/subscriptions", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Get newsletter subscriptions error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
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

      const { error } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .delete()
        .eq('email', email);

      if (error) {
        console.error("Newsletter unsubscribe error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Newsletter unsubscribe error:", error);
      res.status(500).json({ success: false, error: "Failed to unsubscribe from newsletter" });
    }
  });

  // Event Registration Routes
  app.post("/api/event-registrations", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('event_registrations')
        .insert(req.body)
        .select()
        .single();

      if (error) {
        console.error("Event registration error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Event registration error:", error);
      res.status(500).json({ success: false, error: "Failed to submit event registration" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
