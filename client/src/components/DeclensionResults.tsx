import { Card, CardContent } from "@/components/ui/card";
import { cases, type Case, type CaseForm, type AdjectiveForms, type VerbForms } from "@shared/schema";

interface Props {
  result: {
    cases: Record<Case, CaseForm | AdjectiveForms>;
    verbForms?: VerbForms;
    explanations: string[];
  };
}

function isAdjectiveForms(forms: CaseForm | AdjectiveForms): forms is AdjectiveForms {
  return 'masculine' in forms;
}

export default function DeclensionResults({ result }: Props) {
  // If we have verb forms, show the verb conjugation table
  if (result.verbForms) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Present Tense</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-2 border-b">Person</th>
                    <th className="text-left p-2 border-b">Singular</th>
                    <th className="text-left p-2 border-b">Plural</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">1st (я/мы)</td>
                    <td className="p-2">{result.verbForms.present.singular.first}</td>
                    <td className="p-2">{result.verbForms.present.plural.first}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">2nd (ты/вы)</td>
                    <td className="p-2">{result.verbForms.present.singular.second}</td>
                    <td className="p-2">{result.verbForms.present.plural.second}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">3rd (он/она/оно/они)</td>
                    <td className="p-2">{result.verbForms.present.singular.third}</td>
                    <td className="p-2">{result.verbForms.present.plural.third}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Past Tense</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Singular</h4>
                <p className="text-sm mb-1">Masculine: {result.verbForms.past.masculine}</p>
                <p className="text-sm mb-1">Feminine: {result.verbForms.past.feminine}</p>
                <p className="text-sm">Neuter: {result.verbForms.past.neuter}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Plural</h4>
                <p className="text-sm">{result.verbForms.past.plural}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Future Tense</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-2 border-b">Person</th>
                    <th className="text-left p-2 border-b">Singular</th>
                    <th className="text-left p-2 border-b">Plural</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">1st (я/мы)</td>
                    <td className="p-2">{result.verbForms.future.singular.first}</td>
                    <td className="p-2">{result.verbForms.future.plural.first}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">2nd (ты/вы)</td>
                    <td className="p-2">{result.verbForms.future.singular.second}</td>
                    <td className="p-2">{result.verbForms.future.plural.second}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">3rd (он/она/оно/они)</td>
                    <td className="p-2">{result.verbForms.future.singular.third}</td>
                    <td className="p-2">{result.verbForms.future.plural.third}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Imperative</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">
                  <span className="font-medium">Singular:</span> {result.verbForms.imperative.singular}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Plural:</span> {result.verbForms.imperative.plural}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // For adjectives
  if (isAdjectiveForms(result.cases.nominative)) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Adjective Forms</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Case</th>
                  <th className="text-left p-2 border-b">Masculine</th>
                  <th className="text-left p-2 border-b">Feminine</th>
                  <th className="text-left p-2 border-b">Neuter</th>
                  <th className="text-left p-2 border-b">Plural</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseType) => {
                  const forms = result.cases[caseType] as AdjectiveForms;
                  return (
                    <tr key={caseType} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium capitalize">{caseType}</td>
                      <td className="p-2">{forms.masculine}</td>
                      <td className="p-2">{forms.feminine}</td>
                      <td className="p-2">{forms.neuter}</td>
                      <td className="p-2">{forms.plural}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  // For nouns (existing code)
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
                {cases.map((caseType) => {
                  const forms = result.cases[caseType] as CaseForm;
                  return (
                    <tr key={caseType} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium capitalize">{caseType}</td>
                      <td className="p-2">{forms.singular}</td>
                      <td className="p-2">{forms.plural}</td>
                    </tr>
                  );
                })}
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
                  <td className="p-2">один {(result.cases.nominative as CaseForm).quantity1}</td>
                  <td className="p-2">Nominative singular</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">2-4 (два-четыре)</td>
                  <td className="p-2">два {(result.cases.nominative as CaseForm).quantity234}</td>
                  <td className="p-2">Genitive singular</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">5+ (пять и больше)</td>
                  <td className="p-2">пять {(result.cases.nominative as CaseForm).quantity5plus}</td>
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