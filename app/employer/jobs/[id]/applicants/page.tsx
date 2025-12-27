"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";
import { ApplicantTable } from "@/components/applicant-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortalData } from "@/lib/store";

export default function ApplicantsPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, applicationsByJob } = usePortalData();
  const job = jobs.find((item) => item.id === params?.id);

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

  const count = applicationsByJob[job.id]?.length ?? 0;

  return (
    <div className="container-slim space-y-6 py-10">
      <Button variant="ghost" onClick={() => router.back()} className="w-fit">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Applicants for {job.title}
          </CardTitle>
          <CardDescription>{count} total</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <Badge variant="outline">{job.mode}</Badge>
            <Badge variant="outline">Background check {job.backgroundCheckStage.replace("-", " ")}</Badge>
            <Link href={`/jobs/${job.id}`} className="text-accent underline">View public job</Link>
          </div>
          <ApplicantTable jobId={job.id} />
        </CardContent>
      </Card>
    </div>
  );
}
