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
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Case</th>
                <th className="text-left p-2 border-b">Singular</th>
                <th className="text-left p-2 border-b">Plural</th>
                <th className="text-left p-2 border-b">один [1]</th>
                <th className="text-left p-2 border-b">два-четыре [2-4]</th>
                <th className="text-left p-2 border-b">пять+ [5+]</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseType) => (
                <tr key={caseType} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium capitalize">{caseType}</td>
                  <td className="p-2">{result.cases[caseType].singular}</td>
                  <td className="p-2">{result.cases[caseType].plural}</td>
                  <td className="p-2">один {result.cases[caseType].quantity1}</td>
                  <td className="p-2">два {result.cases[caseType].quantity234}</td>
                  <td className="p-2">пять {result.cases[caseType].quantity5plus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}