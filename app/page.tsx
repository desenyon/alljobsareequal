"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "@/components/job-card";
import { usePortalData } from "@/lib/store";

export default function HomePage() {
  const { jobs, employers } = usePortalData();
  const recentJobs = jobs.slice(0, 4);
  const verifiedEmployers = employers.filter((employer) => employer.verified).slice(0, 3);

  return (
    <div className="container-slim space-y-20 py-12">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        <div className="space-y-6 lg:pt-4 animate-slide-in">
          <Badge variant="accent" className="w-fit">Inclusive-first</Badge>
          <h1 className="text-4xl font-semibold leading-[1.15] md:text-5xl max-w-2xl">
            Fair hiring without the fine print.
          </h1>
          <p className="max-w-xl text-base text-foreground/75 leading-relaxed">
            AllJobsAreEqual is a calm, editorial portal where fair-chance and disabled candidates meet employers who explicitly commit to inclusive policies.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" variant="accent">
              <Link href="/jobs">Browse jobs</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/employer/post-job">Post a role</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted pt-2">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Privacy first</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> Verified policies</span>
            <span className="inline-flex items-center gap-2">Real roles, no AI fluff</span>
          </div>
        </div>
        <div className="space-y-4 rounded-xl border border-border/80 bg-card p-6 shadow-lg animate-fade-in stagger-2">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-medium">Fresh this week</p>
              <h3 className="text-lg font-semibold mt-1">Recent jobs</h3>
            </div>
            <Link href="/jobs" className="text-xs font-medium text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentJobs.map((job, idx) => (
              <div key={job.id} className={`flex items-start justify-between rounded-2xl border border-border p-4 transition-all hover:border-accent/40 hover:shadow-md animate-fade-in stagger-${idx + 3}`}>
                <div>
                  <p className="text-sm text-muted">{job.location} · {job.mode}</p>
                  <h4 className="text-lg font-semibold">{job.title}</h4>
                  <p className="text-sm text-foreground/80 line-clamp-2">{job.summary}</p>
                </div>
                <Link href={`/jobs/${job.id}`} className="text-sm text-accent hover:underline shrink-0">View →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Verified employers</h2>
          <div className="gradient-line" aria-hidden />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {verifiedEmployers.map((employer) => (
            <Card key={employer.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
                    {employer.logo}
                  </span>
                  {employer.name}
                </CardTitle>
                <CardDescription>{employer.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-foreground/80">
                <p>{employer.description}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="accent">Verified</Badge>
                  <Badge variant="outline">Fair-chance</Badge>
                  <Badge variant="outline">Disability-inclusive</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <Link href="/jobs" className="inline-flex items-center gap-1 text-sm font-medium text-accent underline">
            See jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Browse with filters", "Choose what to share", "Apply and track"].map((title, index) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Step {index + 1}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                {index === 0 && "Filter by remote, salary, background check timing, and accommodations that actually matter."}
                {index === 1 && "Privacy defaults off. Toggle fair-chance status or accommodation needs per-application."}
                {index === 2 && "Save roles, apply in minutes, and track stages from a calm dashboard."}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Live roles</h2>
          <div className="gradient-line" aria-hidden />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
