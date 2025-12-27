"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Shield } from "lucide-react";
import { ApplyForm } from "@/components/apply-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployerBadge } from "@/components/employer-badge";
import { usePortalData } from "@/lib/store";
import { formatSalary } from "@/lib/utils";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, employers, privacy } = usePortalData();
  const job = jobs.find((item) => item.id === params?.jobId);

  if (!job) {
    return (
      <div className="container-slim space-y-4 py-10">
        <Button variant="ghost" onClick={() => router.back()} className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted">
          Job not found or hidden.
        </div>
      </div>
    );
  }

  const employer = employers.find((e) => e.id === job.employerId);

  return (
    <div className="container-slim grid gap-8 py-8 lg:grid-cols-[1.2fr,0.8fr] animate-fade-in">
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="w-fit -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Apply to {job.title}</CardTitle>
            <CardDescription>Choose what you share for this application.</CardDescription>
          </CardHeader>
          <CardContent>
            <ApplyForm jobId={job.id} defaultPrivacy={privacy} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EmployerBadge verified={job.verifiedEmployer || employer?.verified} />
              {job.title}
            </CardTitle>
            <CardDescription>{employer?.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-foreground/80">
            <p className="font-semibold">{formatSalary(job.salaryMin, job.salaryMax)}</p>
            <p>{job.summary}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{job.mode}</Badge>
              <Badge variant="outline">Background check {job.backgroundCheckStage.replace("-", " ")}</Badge>
              <Badge variant="muted">{job.location}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Privacy defaults</CardTitle>
            <CardDescription>Off by default; toggle per application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted">
            <p>Fair-chance status: {privacy.shareFairChance ? "On" : "Off"}</p>
            <p>Accommodation needs: {privacy.shareAccommodations ? "On" : "Off"}</p>
            <p className="text-xs">Employers only see disclosures you share for this application.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
