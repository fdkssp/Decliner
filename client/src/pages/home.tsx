import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeclensionForm from "@/components/DeclensionForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Russian Noun Declension Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center mb-6">
              Enter a Russian noun and select the grammatical case and number to see its declined form
            </p>
            <DeclensionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
