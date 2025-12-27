"use client";

import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortalData } from "@/lib/store";

const seedReports = [
  { jobId: "job-4", reason: "Clarify schedule expectations" },
  { jobId: "job-9", reason: "Missing pay transparency" },
];

export default function ModerationPage() {
  const { jobs, hideJob, reports } = usePortalData();
  const reported = useMemo(() => {
    const combined = [...seedReports, ...reports.map((jobId) => ({ jobId, reason: "User reported" }))];
    return combined
      .map((report) => ({ ...report, job: jobs.find((job) => job.id === report.jobId) }))
      .filter((item) => item.job);
  }, [jobs, reports]);

  const handleHide = (jobId: string) => {
    hideJob(jobId);
    toast.success("Job hidden", {
      description: "The listing has been removed from search results.",
      duration: 3000,
    });
  };

  return (
    <div className="container-slim space-y-6 py-10 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Moderation</h1>
        <p className="text-sm text-muted">Hide roles that break policy. Hardcoded admin.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Reported jobs</CardTitle>
          <CardDescription>Hide jobs from public listings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reported.length === 0 && <p className="text-sm text-muted">No reports pending.</p>}
          {reported.map((item) => (
            <div key={`${item.jobId}-${item.reason}`} className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-4">
              <div className="flex-1">
                <p className="text-sm text-muted">{item.reason}</p>
                <p className="font-semibold">{item.job?.title}</p>
              </div>
              <Badge variant="outline">{item.job?.mode}</Badge>
              <Button variant="ghost" onClick={() => handleHide(item.jobId)}>Hide job</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
