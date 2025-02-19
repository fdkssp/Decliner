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
                <th className="text-left p-2 border-b">Forms</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseType) => (
                <tr key={caseType} className="border-b">
                  <td className="p-2 font-medium capitalize">{caseType}</td>
                  <td className="p-2">
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">Singular:</span>{" "}
                        {result.cases[caseType].singular}
                      </div>
                      <div>
                        <span className="font-medium">Plural:</span>{" "}
                        {result.cases[caseType].plural}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">один:</span>{" "}
                          {result.cases[caseType].quantity1}
                        </div>
                        <div>
                          <span className="font-medium">два-четыре:</span>{" "}
                          {result.cases[caseType].quantity234}
                        </div>
                        <div>
                          <span className="font-medium">пять+:</span>{" "}
                          {result.cases[caseType].quantity5plus}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}