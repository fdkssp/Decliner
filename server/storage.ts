import { type DeclensionRequest, type DeclensionResponse, type Case, type Number } from "@shared/schema";

export interface IStorage {
  declineNoun(request: DeclensionRequest): Promise<DeclensionResponse>;
}

// Simple rules-based declension system
export class MemStorage implements IStorage {
  async declineNoun(request: DeclensionRequest): Promise<DeclensionResponse> {
    const { word, grammaticalCase, number, quantity } = request;
    
    // This is a simplified implementation - in production you'd want a proper
    // Russian language declension engine with complete rules
    let declined = word;
    let explanation = "";

    // Basic rules for some common endings
    if (word.endsWith("а")) {
      if (grammaticalCase === "genitive" && number === "singular") {
        declined = word.slice(0, -1) + "ы";
        explanation = "Feminine nouns ending in -а change to -ы in genitive singular";
      }
    } else if (word.endsWith("й")) {
      if (grammaticalCase === "prepositional" && number === "singular") {
        declined = word.slice(0, -1) + "е";
        explanation = "Masculine nouns ending in -й change to -е in prepositional singular";
      }
    }

    if (number === "plural" && !quantity) {
      if (word.endsWith("а")) {
        declined = word.slice(0, -1) + "ы";
        explanation = "Basic plural form for feminine nouns ending in -а";
      } else {
        declined = word + "и";
        explanation = "Basic plural form adding -и";
      }
    }

    return { declined, explanation };
  }
}

export const storage = new MemStorage();
