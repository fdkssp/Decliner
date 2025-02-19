import type { VerbPair } from "@shared/schema";

export type VerbPair = {
  english: string;
  russian: string;
  aspect: "imperfective" | "perfective";
  related?: string[];
  culturalNotes?: string[];
  idioms?: Array<{
    phrase: string;
    translation: string;
    meaning: string;
  }>;
};

// Common Russian verbs with their English translations
export const verbDictionary: VerbPair[] = [
  { 
    english: "to go", 
    russian: "идти", 
    aspect: "imperfective", 
    related: ["walk", "move", "travel", "proceed", "advance", "head", "walk", "leave"],
    culturalNotes: [
      "In Russian culture, the concept of 'going' often implies purpose or determination",
      "Used in many common greetings like 'Как идут дела?' (How are things going?)"
    ],
    idioms: [
      {
        phrase: "идти своей дорогой",
        translation: "to go one's own way",
        meaning: "To be independent and make one's own choices"
      },
      {
        phrase: "идёт как по маслу",
        translation: "going like butter",
        meaning: "Everything is going smoothly (similar to 'like clockwork')"
      }
    ]
  },
  { 
    english: "to drink", 
    russian: "пить", 
    aspect: "imperfective", 
    related: ["sip", "gulp", "consume", "imbibe"],
    culturalNotes: [
      "In Russian culture, drinking tea (чаепитие) is a important social ritual",
      "Refusing a drink can sometimes be seen as impolite in social situations"
    ],
    idioms: [
      {
        phrase: "пить горькую",
        translation: "to drink bitter",
        meaning: "To drink heavily or be on a drinking binge"
      }
    ]
  },
  { 
    english: "to eat", 
    russian: "есть", 
    aspect: "imperfective", 
    related: ["dine", "consume", "feed", "devour"],
    culturalNotes: [
      "Russian meals are often long, social affairs",
      "It's common to wish someone 'приятного аппетита' (bon appétit) before eating"
    ],
    idioms: [
      {
        phrase: "есть просит",
        translation: "asks to be eaten",
        meaning: "Something looks very appetizing"
      }
    ]
  },
  { english: "to go by vehicle", russian: "ехать", aspect: "imperfective", related: ["ride", "drive", "travel", "commute", "journey"] },
  { english: "to come", russian: "прийти", aspect: "perfective", related: ["arrive", "reach", "get", "appear", "show up"] },
  { english: "to leave", russian: "уйти", aspect: "perfective", related: ["depart", "exit", "go away", "walk away", "abandon"] },
  { english: "to read", russian: "читать", aspect: "imperfective", related: ["study", "learn", "understand", "comprehend"] },
  { english: "to write", russian: "писать", aspect: "imperfective", related: ["note", "compose", "draft", "author", "pen"] },
  { english: "to speak", russian: "говорить", aspect: "imperfective", related: ["talk", "say", "tell", "chat", "converse", "communicate"] },
  { english: "to listen", russian: "слушать", aspect: "imperfective", related: ["hear", "pay attention", "attend"] },
  { english: "to work", russian: "работать", aspect: "imperfective", related: ["labor", "toil", "function", "operate"] },
  { english: "to live", russian: "жить", aspect: "imperfective", related: ["exist", "reside", "dwell", "inhabit"] },
  { english: "to love", russian: "любить", aspect: "imperfective", related: ["like", "adore", "cherish", "care"] },
  { english: "to see", russian: "видеть", aspect: "imperfective", related: ["look", "watch", "observe", "notice", "view"] },
  { english: "to buy", russian: "купить", aspect: "perfective", related: ["purchase", "acquire", "get", "obtain"] },
  { english: "to sell", russian: "продать", aspect: "perfective", related: ["trade", "vend", "market", "deal"] },
  { english: "to help", russian: "помочь", aspect: "perfective", related: ["assist", "aid", "support", "facilitate"] },
  { english: "to eat", russian: "есть", aspect: "imperfective", related: ["dine", "consume", "feed", "devour"] },
  { english: "to drink", russian: "пить", aspect: "imperfective", related: ["sip", "gulp", "consume", "imbibe"] },
  { english: "to sleep", russian: "спать", aspect: "imperfective", related: ["rest", "nap", "doze", "slumber"] },
  { english: "to walk", russian: "ходить", aspect: "imperfective", related: ["stroll", "move", "go", "wander"] },
  { english: "to run", russian: "бегать", aspect: "imperfective", related: ["jog", "sprint", "dash", "race"] },
  { english: "to dance", russian: "танцевать", aspect: "imperfective", related: ["move", "groove", "sway", "twirl"] },
  { english: "to sing", russian: "петь", aspect: "imperfective", related: ["chant", "vocalize", "hum", "perform"] },
  { english: "to play", russian: "играть", aspect: "imperfective", related: ["perform", "act", "compete", "sport"] },
  { english: "to think", russian: "думать", aspect: "imperfective", related: ["ponder", "reflect", "contemplate", "consider"] },
  { english: "to understand", russian: "понимать", aspect: "imperfective", related: ["comprehend", "grasp", "get", "know"] },
  { english: "to feel", russian: "чувствовать", aspect: "imperfective", related: ["sense", "experience", "perceive"] },
  { english: "to want", russian: "хотеть", aspect: "imperfective", related: ["desire", "wish", "need", "crave"] },
  { english: "to need", russian: "нуждаться", aspect: "imperfective", related: ["require", "want", "must have"] },
  { english: "to ask", russian: "спрашивать", aspect: "imperfective", related: ["question", "inquire", "query"] },
  { english: "to answer", russian: "отвечать", aspect: "imperfective", related: ["reply", "respond", "retort"] },
  { english: "to begin", russian: "начинать", aspect: "imperfective", related: ["start", "commence", "initiate"] },
  { english: "to end", russian: "заканчивать", aspect: "imperfective", related: ["finish", "complete", "conclude"] },
  { english: "to give", russian: "давать", aspect: "imperfective", related: ["hand", "provide", "offer", "grant", "present"] },
  { english: "to take", russian: "брать", aspect: "imperfective", related: ["grab", "get", "obtain", "receive", "accept"] },
  { english: "to return", russian: "возвращаться", aspect: "imperfective", related: ["come back", "go back", "revert", "restore"] },
  { english: "to stay", russian: "оставаться", aspect: "imperfective", related: ["remain", "wait", "continue", "persist"] },
  { english: "to do", russian: "делать", aspect: "imperfective", related: ["make", "perform", "accomplish", "execute", "create"] },
  { english: "to make", russian: "сделать", aspect: "perfective", related: ["create", "build", "construct", "produce", "form"] },
];

export function searchVerbs(query: string): VerbPair[] {
  const lowerQuery = query.toLowerCase().replace(/^to\s+/, "");

  return verbDictionary.filter(verb => {
    // Check main English verb
    if (verb.english.toLowerCase().includes(lowerQuery)) return true;

    // Check Russian verb
    if (verb.russian.toLowerCase().includes(lowerQuery)) return true;

    // Check related verbs
    if (verb.related?.some(related => related.toLowerCase().includes(lowerQuery))) return true;

    return false;
  });
}