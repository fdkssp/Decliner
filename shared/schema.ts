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
export type Gender = "masculine" | "feminine" | "neuter";
export type WordType = "noun" | "adjective";

export const declensionSchema = z.object({
  word: z.string().regex(/^[\u0400-\u04FF\s]+$/, "Only Cyrillic characters allowed"),
  wordType: z.enum(["noun", "adjective"]),
  grammaticalCase: z.enum(cases).optional(),
  number: z.enum(["singular", "plural"]).optional(),
  gender: z.enum(["masculine", "feminine", "neuter"]).optional(),
});

export type DeclensionRequest = z.infer<typeof declensionSchema>;

export type CaseForm = {
  singular: string;
  plural: string;
  quantity1: string;
  quantity234: string;
  quantity5plus: string;
};

export type AdjectiveForms = {
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
};

export type DeclensionResponse = {
  cases: Record<Case, CaseForm | AdjectiveForms>;
  explanations: string[];
};