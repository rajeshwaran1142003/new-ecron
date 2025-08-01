// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  contactMessagesMap;
  courseApplicationsMap;
  demoApplicationsMap;
  newsletterSubscriptionsMap;
  userCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactMessagesMap = /* @__PURE__ */ new Map();
    this.courseApplicationsMap = /* @__PURE__ */ new Map();
    this.demoApplicationsMap = /* @__PURE__ */ new Map();
    this.newsletterSubscriptionsMap = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Contact message methods
  async createContactMessage(message) {
    const id = crypto.randomUUID();
    const contactMessage = {
      ...message,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      courseInterest: message.courseInterest || null
    };
    this.contactMessagesMap.set(id, contactMessage);
    return contactMessage;
  }
  async getContactMessages() {
    return Array.from(this.contactMessagesMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
  // Course application methods
  async createCourseApplication(application) {
    const id = crypto.randomUUID();
    const courseApplication = {
      ...application,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.courseApplicationsMap.set(id, courseApplication);
    return courseApplication;
  }
  async getCourseApplications() {
    return Array.from(this.courseApplicationsMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
  // Demo application methods
  async createDemoApplication(application) {
    const id = crypto.randomUUID();
    const demoApplication = {
      ...application,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      preferredDate: application.preferredDate || null
    };
    this.demoApplicationsMap.set(id, demoApplication);
    return demoApplication;
  }
  async getDemoApplications() {
    return Array.from(this.demoApplicationsMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
  // Newsletter subscription methods
  async createNewsletterSubscription(subscription) {
    const newsletterSubscription = {
      ...subscription,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.newsletterSubscriptionsMap.set(subscription.email, newsletterSubscription);
    return newsletterSubscription;
  }
  async getNewsletterSubscriptions() {
    return Array.from(this.newsletterSubscriptionsMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
  async deleteNewsletterSubscription(email) {
    this.newsletterSubscriptionsMap.delete(email);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  courseInterest: text("course_interest"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
var courseApplications = pgTable("course_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  courseName: text("course_name").notNull(),
  experienceLevel: text("experience_level").notNull(),
  interestMessage: text("interest_message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
var demoApplications = pgTable("demo_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  courseForDemo: text("course_for_demo").notNull(),
  availableTime: text("available_time").notNull(),
  preferredDate: text("preferred_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
var newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  email: text("email").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});
var insertCourseApplicationSchema = createInsertSchema(courseApplications).omit({
  id: true,
  createdAt: true
});
var insertDemoApplicationSchema = createInsertSchema(demoApplications).omit({
  id: true,
  createdAt: true
});
var insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  createdAt: true
});

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
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
  app2.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error("Get contact messages error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contact messages" });
    }
  });
  app2.post("/api/course-applications", async (req, res) => {
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
  app2.get("/api/course-applications", async (req, res) => {
    try {
      const applications = await storage.getCourseApplications();
      res.json({ success: true, data: applications });
    } catch (error) {
      console.error("Get course applications error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch course applications" });
    }
  });
  app2.post("/api/demo-applications", async (req, res) => {
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
  app2.get("/api/demo-applications", async (req, res) => {
    try {
      const applications = await storage.getDemoApplications();
      res.json({ success: true, data: applications });
    } catch (error) {
      console.error("Get demo applications error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch demo applications" });
    }
  });
  app2.post("/api/newsletter/subscribe", async (req, res) => {
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
  app2.get("/api/newsletter/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json({ success: true, data: subscriptions });
    } catch (error) {
      console.error("Get newsletter subscriptions error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch newsletter subscriptions" });
    }
  });
  app2.delete("/api/newsletter/unsubscribe", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
