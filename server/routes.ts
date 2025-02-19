import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { declensionSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  app.post("/api/decline", async (req, res) => {
    try {
      const request = declensionSchema.parse(req.body);
      const result = await storage.declineNoun(request);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return createServer(app);
}
