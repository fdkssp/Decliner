export type VerbPair = {
  english: string;
  russian: string;
  aspect: "imperfective" | "perfective";
};

// Common Russian verbs with their English translations
export const verbDictionary: VerbPair[] = [
  { english: "to read", russian: "читать", aspect: "imperfective" },
  { english: "to write", russian: "писать", aspect: "imperfective" },
  { english: "to speak", russian: "говорить", aspect: "imperfective" },
  { english: "to listen", russian: "слушать", aspect: "imperfective" },
  { english: "to work", russian: "работать", aspect: "imperfective" },
  { english: "to live", russian: "жить", aspect: "imperfective" },
  { english: "to love", russian: "любить", aspect: "imperfective" },
  { english: "to see", russian: "видеть", aspect: "imperfective" },
  { english: "to know", russian: "знать", aspect: "imperfective" },
  { english: "to buy", russian: "купить", aspect: "perfective" },
  { english: "to sell", russian: "продать", aspect: "perfective" },
  { english: "to help", russian: "помочь", aspect: "perfective" },
  { english: "to eat", russian: "есть", aspect: "imperfective" },
  { english: "to drink", russian: "пить", aspect: "imperfective" },
  { english: "to sleep", russian: "спать", aspect: "imperfective" },
  { english: "to walk", russian: "ходить", aspect: "imperfective" },
  { english: "to run", russian: "бегать", aspect: "imperfective" },
  { english: "to dance", russian: "танцевать", aspect: "imperfective" },
  { english: "to sing", russian: "петь", aspect: "imperfective" },
  { english: "to play", russian: "играть", aspect: "imperfective" },
];

export function searchVerbs(query: string): VerbPair[] {
  const lowerQuery = query.toLowerCase().replace(/^to\s+/, "");
  return verbDictionary.filter(
    verb => 
      verb.english.toLowerCase().includes(lowerQuery) ||
      verb.russian.toLowerCase().includes(lowerQuery)
  );
}
