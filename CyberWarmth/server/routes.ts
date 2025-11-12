import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizSchema, insertCourseSchema, insertModuleSchema, insertKnowledgeArticleSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/courses", async (_req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourseById(req.params.id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const validated = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validated);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: "Invalid course data" });
    }
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const modules = await storage.getModulesByCourseId(req.params.courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  app.get("/api/courses/:courseId/modules/:moduleId", async (req, res) => {
    try {
      const module = await storage.getModuleById(req.params.moduleId);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch module" });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const validated = insertModuleSchema.parse({
        ...req.body,
        courseId: req.params.courseId
      });
      const module = await storage.createModule(validated);
      res.status(201).json(module);
    } catch (error) {
      res.status(400).json({ error: "Invalid module data" });
    }
  });

  app.get("/api/modules/:moduleId/quiz", async (req, res) => {
    try {
      const quiz = await storage.getQuizByModuleId(req.params.moduleId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });

  app.post("/api/quizzes", async (req, res) => {
    try {
      const validated = insertQuizSchema.parse(req.body);
      const quiz = await storage.createQuiz(validated);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ error: "Invalid quiz data" });
    }
  });

  app.get("/api/progress", async (req, res) => {
    try {
      const userId = "default-user";
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.get("/api/progress/:courseId", async (req, res) => {
    try {
      const userId = "default-user";
      const progress = await storage.getProgressByCourseId(userId, req.params.courseId);
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress/complete", async (req, res) => {
    try {
      const { courseId, moduleId } = req.body;
      const userId = "default-user";
      
      if (!courseId || !moduleId) {
        return res.status(400).json({ error: "Missing courseId or moduleId" });
      }

      const progress = await storage.completeModule(userId, courseId, moduleId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to complete module" });
    }
  });

  app.get("/api/knowledge", async (_req, res) => {
    try {
      const articles = await storage.getAllKnowledgeArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/knowledge/:id", async (req, res) => {
    try {
      const article = await storage.getKnowledgeArticleById(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/knowledge", async (req, res) => {
    try {
      const validated = insertKnowledgeArticleSchema.parse(req.body);
      const article = await storage.createKnowledgeArticle(validated);
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
