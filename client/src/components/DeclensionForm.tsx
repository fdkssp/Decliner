import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { cases, declensionSchema, type DeclensionRequest } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import DeclensionResults from "./DeclensionResults";
import CaseTooltip from "./CaseTooltip";

export default function DeclensionForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<{ declined: string; explanation: string } | null>(null);

  const form = useForm<DeclensionRequest>({
    resolver: zodResolver(declensionSchema),
    defaultValues: {
      word: "",
      grammaticalCase: "nominative",
      number: "singular",
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
                <FormLabel>Russian Noun</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a noun in Cyrillic" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="grammaticalCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Case <CaseTooltip />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select case" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cases.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="singular">Singular</SelectItem>
                      <SelectItem value="plural">Plural</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Declining..." : "Decline Noun"}
          </Button>
        </form>
      </Form>

      {result && <DeclensionResults result={result} />}
    </div>
  );
}
