import { 
  users, contactMessages, courseApplications, demoApplications, newsletterSubscriptions,
  type User, type InsertUser, 
  type ContactMessage, type InsertContactMessage,
  type CourseApplication, type InsertCourseApplication,
  type DemoApplication, type InsertDemoApplication,
  type NewsletterSubscription, type InsertNewsletterSubscription
} from "@shared/schema";

// Interface with all CRUD methods for the application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;

  // Course application methods
  createCourseApplication(application: InsertCourseApplication): Promise<CourseApplication>;
  getCourseApplications(): Promise<CourseApplication[]>;

  // Demo application methods
  createDemoApplication(application: InsertDemoApplication): Promise<DemoApplication>;
  getDemoApplications(): Promise<DemoApplication[]>;

  // Newsletter subscription methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  deleteNewsletterSubscription(email: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessagesMap: Map<string, ContactMessage>;
  private courseApplicationsMap: Map<string, CourseApplication>;
  private demoApplicationsMap: Map<string, DemoApplication>;
  private newsletterSubscriptionsMap: Map<string, NewsletterSubscription>;
  private userCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactMessagesMap = new Map();
    this.courseApplicationsMap = new Map();
    this.demoApplicationsMap = new Map();
    this.newsletterSubscriptionsMap = new Map();
    this.userCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = crypto.randomUUID();
    const contactMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date(),
      courseInterest: message.courseInterest || null,
    };
    this.contactMessagesMap.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  // Course application methods
  async createCourseApplication(application: InsertCourseApplication): Promise<CourseApplication> {
    const id = crypto.randomUUID();
    const courseApplication: CourseApplication = {
      ...application,
      id,
      createdAt: new Date(),
    };
    this.courseApplicationsMap.set(id, courseApplication);
    return courseApplication;
  }

  async getCourseApplications(): Promise<CourseApplication[]> {
    return Array.from(this.courseApplicationsMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  // Demo application methods
  async createDemoApplication(application: InsertDemoApplication): Promise<DemoApplication> {
    const id = crypto.randomUUID();
    const demoApplication: DemoApplication = {
      ...application,
      id,
      createdAt: new Date(),
      preferredDate: application.preferredDate || null,
    };
    this.demoApplicationsMap.set(id, demoApplication);
    return demoApplication;
  }

  async getDemoApplications(): Promise<DemoApplication[]> {
    return Array.from(this.demoApplicationsMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  // Newsletter subscription methods
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const newsletterSubscription: NewsletterSubscription = {
      ...subscription,
      createdAt: new Date(),
    };
    this.newsletterSubscriptionsMap.set(subscription.email, newsletterSubscription);
    return newsletterSubscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptionsMap.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async deleteNewsletterSubscription(email: string): Promise<void> {
    this.newsletterSubscriptionsMap.delete(email);
  }
}

export const storage = new MemStorage();
