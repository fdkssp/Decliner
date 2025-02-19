import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { declensionSchema, type DeclensionRequest } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    },
  });

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
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Russian Noun
                  <CaseTooltip />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter a noun in Cyrillic" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Declining..." : "Show All Forms"}
          </Button>
        </form>
      </Form>

      {result && <DeclensionResults result={result} />}
    </div>
  );
}