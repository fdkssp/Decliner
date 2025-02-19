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

export const tenses = [
  "present",
  "past",
  "future",
] as const;

export type Case = typeof cases[number];
export type Number = "singular" | "plural";
export type Gender = "masculine" | "feminine" | "neuter";
export type WordType = "noun" | "adjective" | "verb";
export type Tense = typeof tenses[number];
export type Person = "first" | "second" | "third";

export const declensionSchema = z.object({
  word: z.string().regex(/^[\u0400-\u04FF\s]+$/, "Only Cyrillic characters allowed"),
  wordType: z.enum(["noun", "adjective", "verb"]),
  grammaticalCase: z.enum(cases).optional(),
  number: z.enum(["singular", "plural"]).optional(),
  gender: z.enum(["masculine", "feminine", "neuter"]).optional(),
  tense: z.enum(tenses).optional(),
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

export type VerbForms = {
  infinitive: string;
  present: {
    singular: {
      first: string;
      second: string;
      third: string;
    };
    plural: {
      first: string;
      second: string;
      third: string;
    };
  };
  past: {
    masculine: string;
    feminine: string;
    neuter: string;
    plural: string;
  };
  future: {
    singular: {
      first: string;
      second: string;
      third: string;
    };
    plural: {
      first: string;
      second: string;
      third: string;
    };
  };
  imperative: {
    singular: string;
    plural: string;
  };
};

export type DeclensionResponse = {
  cases: Record<Case, CaseForm | AdjectiveForms>;
  verbForms?: VerbForms;
  explanations: string[];
};