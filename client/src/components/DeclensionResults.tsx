import { Card, CardContent } from "@/components/ui/card";
import { type DeclensionResponse } from "@shared/schema";

interface Props {
  result: DeclensionResponse;
}

export default function DeclensionResults({ result }: Props) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Declined Form:</h3>
            <p className="text-2xl font-medium text-primary">{result.declined}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-1">Explanation:</h3>
            <p className="text-muted-foreground">{result.explanation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
