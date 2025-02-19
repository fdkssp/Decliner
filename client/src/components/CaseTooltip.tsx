import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

const caseExplanations = {
  nominative: "Used for the subject of a sentence (кто/что)",
  genitive: "Indicates possession or absence (кого/чего)",
  dative: "Indicates the indirect object (кому/чему)",
  accusative: "Used for the direct object (кого/что)",
  instrumental: "Indicates means or accompaniment (кем/чем)",
  prepositional: "Used with certain prepositions (о ком/о чём)",
};

export default function CaseTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          <HelpCircle className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            {Object.entries(caseExplanations).map(([caseType, explanation]) => (
              <div key={caseType}>
                <span className="font-semibold capitalize">{caseType}:</span>{" "}
                {explanation}
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
