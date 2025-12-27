"use client";

import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortalData } from "@/lib/store";
import { formatSalary } from "@/lib/utils";

export default function EmployerDashboardPage() {
  const { jobs, applicationsByJob } = usePortalData();
  const posted = jobs.filter((job) => job.employerId === "employer-1" || job.employerId === "employer-2");

  return (
    <div className="container-slim space-y-8 py-10 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Employer dashboard</h1>
          <p className="text-sm text-muted">Post roles, view applicants, and honor privacy choices.</p>
        </div>
        <Button asChild variant="accent" className="shadow-sm hover:shadow-md transition-shadow">
          <Link href="/employer/post-job"><Plus className="mr-2 h-4 w-4" /> Post a job</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posted roles</CardTitle>
          <CardDescription>Inclusive defaults shown to candidates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {posted.length === 0 && <p className="text-sm text-muted">No roles yet. Post your first job.</p>}
          {posted.map((job) => {
            const count = applicationsByJob[job.id]?.length ?? 0;
            return (
              <div key={job.id} className="grid gap-2 rounded-xl border border-border p-4 md:grid-cols-[1fr,200px] md:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{job.mode}</Badge>
                    <Badge variant="muted">{job.location}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <Badge variant="accent" className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {count} applicants</Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/employer/jobs/${job.id}/applicants`}>View applicants</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
