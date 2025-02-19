import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cases = [
  "nominative",
  "genitive",
  "dative",
  "accusative",
  "instrumental",
  "prepositional",
] as const;

export type Case = typeof cases[number];
export type Number = "singular" | "plural";

export const declensionSchema = z.object({
  word: z.string().regex(/^[\u0400-\u04FF\s]+$/, "Only Cyrillic characters allowed"),
  grammaticalCase: z.enum(cases).optional(),
  number: z.enum(["singular", "plural"]).optional(),
});

export type DeclensionRequest = z.infer<typeof declensionSchema>;
export type CaseForm = {
  singular: string;
  plural: string;
  quantity1: string;
  quantity234: string;
  quantity5plus: string;
};

export type DeclensionResponse = {
  cases: Record<Case, CaseForm>;
  explanations: string[];
};