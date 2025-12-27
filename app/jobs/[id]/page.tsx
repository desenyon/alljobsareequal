"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Bookmark, MapPin, Shield, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployerBadge } from "@/components/employer-badge";
import { PolicyCard } from "@/components/policy-card";
import { usePortalData } from "@/lib/store";
import { formatSalary } from "@/lib/utils";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, employers, savedJobs, toggleSaveJob } = usePortalData();
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

  const employer = employers.find((e) => e.id === job.employerId);
  const isSaved = savedJobs.includes(job.id);

  return (
    <div className="container-slim space-y-8 py-10 animate-fade-in">
      <Button variant="ghost" onClick={() => router.back()} className="w-fit">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <EmployerBadge verified={job.verifiedEmployer || employer?.verified} />
                <Badge variant="outline">{job.mode}</Badge>
              </div>
              <h1 className="text-3xl font-semibold">{job.title}</h1>
              <p className="text-muted text-sm">{employer?.name}</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                <span className="inline-flex items-center gap-1"><Wallet className="h-4 w-4" /> {formatSalary(job.salaryMin, job.salaryMax)}</span>
                <span className="inline-flex items-center gap-1"><Shield className="h-4 w-4" /> Background check {job.backgroundCheckStage.replace("-", " ")}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild variant="accent">
                <Link href={`/apply/${job.id}`}>Apply</Link>
              </Button>
              <Button variant={isSaved ? "accent" : "outline"} onClick={() => toggleSaveJob(job.id)}>
                <Bookmark className="mr-2 h-4 w-4" /> {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Role overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-foreground/85">
              <p>{job.summary}</p>
              <div>
                <h3 className="mb-2 font-semibold">Responsibilities</h3>
                <ul className="space-y-1">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="leading-snug">• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Requirements</h3>
                <ul className="space-y-1">
                  {job.requirements.map((item) => (
                    <li key={item} className="leading-snug">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.accommodations.map((acc) => (
                  <Badge key={acc} variant="muted">{acc}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {employer && <PolicyCard employer={employer} />}
      </div>
    </div>
  );
}
