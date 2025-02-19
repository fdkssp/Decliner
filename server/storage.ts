import { type DeclensionRequest, type DeclensionResponse, type Case, type CaseForm } from "@shared/schema";

export interface IStorage {
  declineNoun(request: DeclensionRequest): Promise<DeclensionResponse>;
}

// Rules-based declension system with number agreement
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
    let plural;
    let quantity234;
    let quantity5plus;

    if (word.endsWith("а")) {
      plural = word.slice(0, -1) + "ы";
      quantity234 = word.slice(0, -1) + "ы";
      quantity5plus = word.slice(0, -1); // genitive plural
    } else {
      plural = word + "ы";
      quantity234 = word + "а"; // genitive singular
      quantity5plus = word + "ов"; // genitive plural
    }

    return {
      singular: word,
      plural,
      quantity1: word, // nominative singular
      quantity234, // genitive singular
      quantity5plus, // genitive plural
    };
  }

  private getGenitiveForms(word: string): CaseForm {
    let singular;
    let plural;
    let quantity5plus;

    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "ы";
      plural = word.slice(0, -1);
      quantity5plus = word.slice(0, -1);
    } else {
      singular = word + "а";
      plural = word + "ов";
      quantity5plus = word + "ов";
    }

    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: plural,
      quantity5plus,
    };
  }

  private getDativeForms(word: string): CaseForm {
    let singular;
    let plural;

    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "е";
      plural = word.slice(0, -1) + "ам";
    } else {
      singular = word + "у";
      plural = word + "ам";
    }

    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }

  private getAccusativeForms(word: string): CaseForm {
    let singular;
    let plural;

    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "у";
      plural = word.slice(0, -1);
    } else {
      singular = word;
      plural = word + "ов";
    }

    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }

  private getInstrumentalForms(word: string): CaseForm {
    let singular;
    let plural;

    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "ой";
      plural = word.slice(0, -1) + "ами";
    } else {
      singular = word + "ом";
      plural = word + "ами";
    }

    return {
      singular,
      plural,
      quantity1: singular,
      quantity234: singular,
      quantity5plus: plural,
    };
  }

  private getPrepositionalForms(word: string): CaseForm {
    let singular;
    let plural;

    if (word.endsWith("а")) {
      singular = word.slice(0, -1) + "е";
      plural = word.slice(0, -1) + "ах";
    } else {
      singular = word + "е";
      plural = word + "ах";
    }

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