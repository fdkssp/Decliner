import { type Case, type Number } from "@shared/schema";

// Helper functions for declension rules
export function getCaseEnding(word: string, grammaticalCase: Case, number: Number): string {
  // This is a simplified implementation
  // In a production app, this would contain comprehensive Russian declension rules
  
  if (number === "plural") {
    if (word.endsWith("а")) return "ы";
    return "и";
  }

  const endings: Record<Case, Record<string, string>> = {
    nominative: {},
    genitive: { "а": "ы", "я": "и" },
    dative: { "а": "е", "я": "е" },
    accusative: { "а": "у", "я": "ю" },
    instrumental: { "а": "ой", "я": "ей" },
    prepositional: { "а": "е", "я": "е" },
  };

  const lastChar = word.slice(-1);
  return endings[grammaticalCase][lastChar] || word;
}
