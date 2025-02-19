import { useState } from "react";
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
import DeclensionResults from "./DeclensionResults";
import CaseTooltip from "./CaseTooltip";

export default function DeclensionForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<{ cases: Record<string, any>; explanations: string[] } | null>(null);

  const form = useForm<DeclensionRequest>({
    resolver: zodResolver(declensionSchema),
    defaultValues: {
      word: "",
      wordType: "noun",
      gender: "masculine",
    },
  });

  const wordType = form.watch("wordType");

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
                    onValueChange={field.onChange}
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
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Russian {wordType === "noun" ? "Noun" : "Adjective"}
                  <CaseTooltip />
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={`Enter a ${wordType} in Cyrillic${wordType === "adjective" ? " (e.g., новый)" : ""}`} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {wordType === "adjective" && (
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="masculine" id="masculine" />
                        <label htmlFor="masculine">Masculine</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="feminine" id="feminine" />
                        <label htmlFor="feminine">Feminine</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neuter" id="neuter" />
                        <label htmlFor="neuter">Neuter</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Declining..." : "Show All Forms"}
          </Button>
        </form>
      </Form>

      {result && <DeclensionResults result={result} />}
    </div>
  );
}