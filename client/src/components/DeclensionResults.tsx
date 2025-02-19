import { Card, CardContent } from "@/components/ui/card";
import { cases, type Case, type CaseForm } from "@shared/schema";

interface Props {
  result: {
    cases: Record<Case, CaseForm>;
    explanations: string[];
  };
}

export default function DeclensionResults({ result }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Case Forms</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Case</th>
                  <th className="text-left p-2 border-b">Singular</th>
                  <th className="text-left p-2 border-b">Plural</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseType) => (
                  <tr key={caseType} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium capitalize">{caseType}</td>
                    <td className="p-2">{result.cases[caseType].singular}</td>
                    <td className="p-2">{result.cases[caseType].plural}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Number Agreement</h3>
          <p className="text-sm text-muted-foreground mb-4">
            In Russian, nouns change form depending on the number that precedes them:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Case Rule</th>
                  <th className="text-left p-2 border-b">Example</th>
                  <th className="text-left p-2 border-b">Form Used</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">1 (один)</td>
                  <td className="p-2">один {result.cases.nominative.quantity1}</td>
                  <td className="p-2">Nominative singular</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">2-4 (два-четыре)</td>
                  <td className="p-2">два {result.cases.nominative.quantity234}</td>
                  <td className="p-2">Genitive singular</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">5+ (пять и больше)</td>
                  <td className="p-2">пять {result.cases.nominative.quantity5plus}</td>
                  <td className="p-2">Genitive plural</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}