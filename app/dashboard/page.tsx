"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortalData } from "@/lib/store";
import { formatSalary } from "@/lib/utils";

export default function DashboardPage() {
  const { jobs, applications, savedJobs, toggleSaveJob, privacy } = usePortalData();

  const saved = jobs.filter((job) => savedJobs.includes(job.id));
  const applied = applications.map((app) => ({
    ...app,
    job: jobs.find((j) => j.id === app.jobId),
  }));

  return (
    <div className="container-slim space-y-8 py-8 animate-fade-in">
      <div className="flex flex-col gap-2 pb-4 border-b border-border/50">
        <h1 className="text-2xl font-semibold">Your dashboard</h1>
        <p className="text-sm text-muted">Saved roles, applications, and privacy defaults.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-accent" />
              <CardTitle>Saved roles</CardTitle>
            </div>
            <CardDescription>{saved.length} saved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {saved.length === 0 && <p className="text-sm text-muted py-4">Save roles to track them quickly.</p>}
            {saved.map((job) => (
              <div key={job.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{job.mode}</Badge>
                    <Badge variant="muted">{job.location}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="accent" size="sm">
                    <Link href={`/jobs/${job.id}`}>View</Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleSaveJob(job.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Privacy</CardTitle>
            <CardDescription>Defaults apply to new applications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-foreground/80">
            <p>Fair-chance status: {privacy.shareFairChance ? "On" : "Off"}</p>
            <p>Accommodation needs: {privacy.shareAccommodations ? "On" : "Off"}</p>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href="/dashboard/privacy">Edit privacy</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Applications
          </CardTitle>
          <CardDescription>Track stages per employer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {applied.length === 0 && <p className="text-sm text-muted">No applications yet.</p>}
          {applied.map((entry) => (
            <div key={entry.id} className="grid gap-2 rounded-xl border border-border p-4 md:grid-cols-[1fr,220px] md:items-center">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{entry.job?.title}</h3>
                <p className="text-sm text-muted">{entry.job?.location} · {entry.job?.mode}</p>
                <p className="text-sm text-foreground/80">Stage: {entry.stage}</p>
                <p className="text-xs text-muted">Shared: {entry.shareFairChance ? "Fair-chance" : "Fair-chance hidden"} · {entry.shareAccommodations ? "Accommodations shared" : "Needs hidden"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/jobs/${entry.job?.id ?? ""}`}>View job</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/apply/${entry.job?.id ?? ""}`}>Update sharing</Link>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
