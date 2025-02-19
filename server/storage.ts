import { type DeclensionRequest, type DeclensionResponse, type Case, type CaseForm, type AdjectiveForms, type Gender, type VerbForms } from "@shared/schema";
import { verbDictionary } from "@shared/verbs";

export interface IStorage {
  declineNoun(request: DeclensionRequest): Promise<DeclensionResponse>;
}

class VerbConjugation {
  conjugateVerb(word: string): VerbForms {
    // Remove -ть from the infinitive to get the stem
    const stem = word.slice(0, -2);

    return {
      infinitive: word,
      present: {
        singular: {
          first: stem + "ю",
          second: stem + "ешь",
          third: stem + "ет",
        },
        plural: {
          first: stem + "ем",
          second: stem + "ете",
          third: stem + "ют",
        },
      },
      past: {
        masculine: stem + "л",
        feminine: stem + "ла",
        neuter: stem + "ло",
        plural: stem + "ли",
      },
      future: {
        singular: {
          first: "буду " + word,
          second: "будешь " + word,
          third: "будет " + word,
        },
        plural: {
          first: "будем " + word,
          second: "будете " + word,
          third: "будут " + word,
        },
      },
      imperative: {
        singular: stem + "й",
        plural: stem + "йте",
      },
    };
  }
}

class AdjectiveDeclension {
  declineAdjective(word: string, grammaticalCase?: Case): Record<Case, AdjectiveForms> {
    const cases: Record<Case, AdjectiveForms> = {
      nominative: this.getNominativeForms(word),
      genitive: this.getGenitiveForms(word),
      dative: this.getDativeForms(word),
      accusative: this.getAccusativeForms(word),
      instrumental: this.getInstrumentalForms(word),
      prepositional: this.getPrepositionalForms(word),
    };

    return cases;
  }

  private getNominativeForms(word: string): AdjectiveForms {
    // Basic rules for nominative adjectives
    return {
      masculine: word, // ый/ий
      feminine: word.replace(/ый$|ий$/, "ая"), // ая
      neuter: word.replace(/ый$|ий$/, "ое"), // ое
      plural: word.replace(/ый$|ий$/, "ые"), // ые
    };
  }

  private getGenitiveForms(word: string): AdjectiveForms {
    return {
      masculine: word.replace(/ый$|ий$/, "ого"), // ого
      feminine: word.replace(/ый$|ий$/, "ой"), // ой
      neuter: word.replace(/ый$|ий$/, "ого"), // ого
      plural: word.replace(/ый$|ий$/, "ых"), // ых
    };
  }

  private getDativeForms(word: string): AdjectiveForms {
    return {
      masculine: word.replace(/ый$|ий$/, "ому"), // ому
      feminine: word.replace(/ый$|ий$/, "ой"), // ой
      neuter: word.replace(/ый$|ий$/, "ому"), // ому
      plural: word.replace(/ый$|ий$/, "ым"), // ым
    };
  }

  private getAccusativeForms(word: string): AdjectiveForms {
    return {
      masculine: word.replace(/ый$|ий$/, "ого"), // ого (animate) / ый (inanimate)
      feminine: word.replace(/ый$|ий$/, "ую"), // ую
      neuter: word.replace(/ый$|ий$/, "ое"), // ое
      plural: word.replace(/ый$|ий$/, "ых"), // ых (animate) / ые (inanimate)
    };
  }

  private getInstrumentalForms(word: string): AdjectiveForms {
    return {
      masculine: word.replace(/ый$|ий$/, "ым"), // ым
      feminine: word.replace(/ый$|ий$/, "ой"), // ой
      neuter: word.replace(/ый$|ий$/, "ым"), // ым
      plural: word.replace(/ый$|ий$/, "ыми"), // ыми
    };
  }

  private getPrepositionalForms(word: string): AdjectiveForms {
    return {
      masculine: word.replace(/ый$|ий$/, "ом"), // ом
      feminine: word.replace(/ый$|ий$/, "ой"), // ой
      neuter: word.replace(/ый$|ий$/, "ом"), // ом
      plural: word.replace(/ый$|ий$/, "ых"), // ых
    };
  }
}

// Rules-based declension system with number agreement
export class MemStorage implements IStorage {
  private adjectiveDeclension = new AdjectiveDeclension();
  private verbConjugation = new VerbConjugation();

  async declineNoun(request: DeclensionRequest): Promise<DeclensionResponse> {
    const { word, wordType, grammaticalCase, gender } = request;
    const explanations: string[] = [];

    if (wordType === "verb") {
      // Find the verb in our dictionary to get cultural notes and idioms
      const verbInfo = verbDictionary.find(v => v.russian === word);

      return {
        cases: {},
        verbForms: this.verbConjugation.conjugateVerb(word),
        explanations: [
          "Past tense forms vary by gender in singular",
          "Future tense is formed with быть + infinitive",
        ],
        culturalNotes: verbInfo?.culturalNotes,
        idioms: verbInfo?.idioms,
      };
    }

    if (wordType === "adjective") {
      return {
        cases: this.adjectiveDeclension.declineAdjective(word, grammaticalCase),
        explanations,
      };
    }

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