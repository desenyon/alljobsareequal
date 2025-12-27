"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortalData } from "@/lib/store";
import { ApplicationStage } from "@/types";

interface Props {
  jobId: string;
}

const stageOptions: ApplicationStage[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
];

export function ApplicantTable({ jobId }: Props) {
  const { applicationsByJob, updateApplicationStage } = usePortalData();
  const [saving, setSaving] = useState<string | null>(null);
  const list = applicationsByJob[jobId] ?? [];

  const handleStageUpdate = async (applicationId: string, stage: ApplicationStage) => {
    setSaving(applicationId);
    updateApplicationStage(applicationId, stage);
    toast.success("Stage updated", {
      description: `Application moved to ${stage}.`,
      duration: 2000,
    });
    setTimeout(() => setSaving(null), 500);
  };

  if (!list.length) {
    return <p className="text-sm text-muted">No applicants yet.</p>;
  }

  return (
    <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
      <div className="grid grid-cols-5 gap-3 text-xs font-medium text-muted">
        <span>Name</span>
        <span>Email</span>
        <span>Shared</span>
        <span>Note</span>
        <span>Stage</span>
      </div>
      <div className="divide-y divide-border/70">
        {list.map((app) => (
          <div key={app.id} className="grid grid-cols-5 items-center gap-3 py-3 text-sm">
            <div className="font-semibold text-foreground">{app.candidateName}</div>
            <a className="text-accent underline" href={`mailto:${app.email}`}>
              {app.email}
            </a>
            <div className="text-xs text-muted">
              {app.shareFairChance ? "Fair-chance shared" : "Fair-chance hidden"}
              <br />
              {app.shareAccommodations ? "Needs shared" : "Needs hidden"}
            </div>
            <div className="text-sm text-foreground/80 line-clamp-2">{app.message}</div>
            <div className="flex items-center gap-2">
              <Select
                value={app.stage}
                onValueChange={(value) => handleStageUpdate(app.id, value as ApplicationStage)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stageOptions.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {saving === app.id && (
                <Button size="sm" variant="ghost" disabled>
                  Updating...
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
