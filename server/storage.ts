import { type DeclensionRequest, type DeclensionResponse, type Case, type CaseForm } from "@shared/schema";

export interface IStorage {
  declineNoun(request: DeclensionRequest): Promise<DeclensionResponse>;
}

// Simple rules-based declension system
export class MemStorage implements IStorage {
  async declineNoun(request: DeclensionRequest): Promise<DeclensionResponse> {
    const { word } = request;
    const explanations: string[] = [];
    const cases: Record<Case, CaseForm> = {
      nominative: this.getNominativeForms(word),
      genitive: this.getGenitiveForms(word),
      dative: this.getDativeForms(word),
      accusative: this.getAccusativeForms(word),
      instrumental: this.getInstrumentalForms(word),
      prepositional: this.getPrepositionalForms(word),
    };

    return { cases, explanations };
  }

  private getNominativeForms(word: string): CaseForm {
    const plural = word.endsWith("а") ? word.slice(0, -1) + "ы" : word + "ы";
    return {
      singular: word,
      plural: plural,
      quantity1: word,
      quantity234: plural,
      quantity5plus: plural,
    };
  }

  private getGenitiveForms(word: string): CaseForm {
    let singular = word;
    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "ы";
    } else if (word.endsWith("я")) {
      singular = word.slice(0, -1) + "и";
    }

    const plural = word.endsWith("а") ? word.slice(0, -1) + "" : word + "ов";
    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }

  private getDativeForms(word: string): CaseForm {
    let singular = word;
    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "е";
    } else if (word.endsWith("я")) {
      singular = word.slice(0, -1) + "е";
    }

    const plural = word.endsWith("а") ? word.slice(0, -1) + "ам" : word + "ам";
    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }

  private getAccusativeForms(word: string): CaseForm {
    let singular = word;
    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "у";
    } else if (word.endsWith("я")) {
      singular = word.slice(0, -1) + "ю";
    }

    const plural = word.endsWith("а") ? word.slice(0, -1) + "" : word + "ов";
    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }

  private getInstrumentalForms(word: string): CaseForm {
    let singular = word;
    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "ой";
    } else if (word.endsWith("я")) {
      singular = word.slice(0, -1) + "ей";
    }

    const plural = word.endsWith("а") ? word.slice(0, -1) + "ами" : word + "ами";
    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }

  private getPrepositionalForms(word: string): CaseForm {
    let singular = word;
    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "е";
    } else if (word.endsWith("я")) {
      singular = word.slice(0, -1) + "е";
    }

    const plural = word.endsWith("а") ? word.slice(0, -1) + "ах" : word + "ах";
    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }
}

export const storage = new MemStorage();