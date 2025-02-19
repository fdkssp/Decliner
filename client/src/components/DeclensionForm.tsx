import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { declensionSchema, type DeclensionRequest, type WordType } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { searchVerbs, verbDictionary, type VerbPair } from "@shared/verbs";
import DeclensionResults from "./DeclensionResults";
import CaseTooltip from "./CaseTooltip";

export default function DeclensionForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<{ cases: Record<string, any>; verbForms?: any; explanations: string[] } | null>(null);
  const [verbSuggestions, setVerbSuggestions] = useState<VerbPair[]>([]);

  const form = useForm<DeclensionRequest>({
    resolver: zodResolver(declensionSchema),
    defaultValues: {
      word: "",
      wordType: "noun",
      gender: "masculine",
    },
  });

  const wordType = form.watch("wordType");

  // Show all verbs when verb type is selected
  useEffect(() => {
    if (wordType === "verb") {
      setVerbSuggestions(verbDictionary);
    } else {
      setVerbSuggestions([]);
    }
  }, [wordType]);

  const mutation = useMutation({
    mutationFn: async (data: DeclensionRequest) => {
      const res = await apiRequest("POST", "/api/decline", data);
      return res.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleVerbSearch = (input: string) => {
    if (wordType === "verb") {
      if (!input.trim()) {
        setVerbSuggestions(verbDictionary);
      } else {
        const suggestions = searchVerbs(input);
        setVerbSuggestions(suggestions);
      }
    }
  };

  const handleVerbSelect = (verb: VerbPair) => {
    form.setValue("word", verb.russian);
    setVerbSuggestions(verbDictionary); // Keep showing all verbs after selection
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <FormField
            control={form.control}
            name="wordType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === "verb") {
                        setVerbSuggestions(verbDictionary);
                      } else {
                        setVerbSuggestions([]);
                      }
                    }}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="noun" id="noun" />
                      <label htmlFor="noun">Noun</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="adjective" id="adjective" />
                      <label htmlFor="adjective">Adjective</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="verb" id="verb" />
                      <label htmlFor="verb">Verb</label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="word"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2">
                  Russian {wordType === "noun" ? "Noun" : wordType === "adjective" ? "Adjective" : "Verb"}
                  <CaseTooltip />
                </FormLabel>
                <FormControl>
                  <div className="relative space-y-2">
                    <Input 
                      placeholder={
                        wordType === "verb" 
                          ? "Enter a verb in English or Russian (e.g., 'to read' or 'читать')"
                          : wordType === "adjective" 
                          ? "Enter an adjective in Cyrillic (e.g., новый)"
                          : "Enter a noun in Cyrillic"
                      }
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleVerbSearch(e.target.value);
                      }}
                    />
                    {wordType === "verb" && verbSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full max-h-64 overflow-auto bg-background border rounded-md shadow-lg">
                        <div className="sticky top-0 bg-muted/90 backdrop-blur-sm p-2 border-b">
                          <p className="text-sm text-muted-foreground">Click a verb to select it</p>
                        </div>
                        {verbSuggestions.map((verb, index) => (
                          <button
                            key={index}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-accent flex items-center justify-between group"
                            onClick={() => handleVerbSelect(verb)}
                          >
                            <div>
                              <span className="font-medium">{verb.english}</span>
                              <span className="text-muted-foreground ml-2">→ {verb.russian}</span>
                            </div>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                              {verb.aspect}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Processing..." : "Show All Forms"}
          </Button>
        </form>
      </Form>

      {result && <DeclensionResults result={result} />}
    </div>
  );
}