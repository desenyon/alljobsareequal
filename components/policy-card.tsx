import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Employer } from "@/types";

interface Props {
  employer: Employer;
}

export function PolicyCard({ employer }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Policies</CardTitle>
        <CardDescription>{employer.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Fair-chance</Badge>
            <span className="text-sm text-muted">Background check</span>
          </div>
          <p className="text-sm">
            Runs {employer.fairChance.backgroundCheckTiming.replace("-", " ")} with exclusions: {employer.fairChance.rolesExcluded.join(", ") || "none"}.
          </p>
          <a className="text-sm font-medium text-accent underline" href={employer.fairChance.policyLink} target="_blank" rel="noreferrer">
            View policy
          </a>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Disability-inclusive</Badge>
            <span className="text-sm text-muted">Accommodations</span>
          </div>
          <p className="text-sm">
            Offers {employer.disability.accommodations.join(", ")}. Interview accommodations {employer.disability.interviewAccommodations ? "available" : "not listed"}. Remote support: {employer.disability.remoteSupport}.
          </p>
          <p className="text-sm text-muted">
            Mental health benefits {employer.disability.mentalHealthBenefits ? "included" : "not listed"}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
