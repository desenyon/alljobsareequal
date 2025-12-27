import { Badge } from "@/components/ui/badge";

export function EmployerBadge({ verified }: { verified?: boolean }) {
  if (!verified) {
    return <Badge variant="outline">Inclusive employer</Badge>;
  }
  return <Badge variant="accent">Verified employer</Badge>;
}
