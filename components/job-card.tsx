"use client";

import Link from "next/link";
import { Bookmark, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployerBadge } from "@/components/employer-badge";
import { formatSalary } from "@/lib/utils";
import { usePortalData } from "@/lib/store";
import { Job } from "@/types";

interface Props {
  job: Job;
}

export function JobCard({ job }: Props) {
  const { employerById, savedJobs, toggleSaveJob } = usePortalData();
  const employer = employerById[job.employerId];
  const isSaved = savedJobs.includes(job.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
    if (!isSaved) {
      toast.success("Job saved", {
        description: "Added to your saved jobs for quick access.",
        duration: 2000,
      });
    }
  };

  return (
    <Card className="relative overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 mb-3">
          <EmployerBadge verified={job.verifiedEmployer || employer?.verified} />
          <Button
            variant={isSaved ? "accent" : "ghost"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            aria-label={isSaved ? "Unsave job" : "Save job"}
            className="-mt-1 transition-transform hover:scale-110"
          >
            <Bookmark className={`h-4 w-4 transition-all ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl group-hover:text-accent transition-colors">{job.title}</CardTitle>
          <CardDescription className="text-sm">{employer?.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
          <span className="inline-flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5" /> {formatSalary(job.salaryMin, job.salaryMax)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-xs">{job.mode}</Badge>
          <Badge variant="outline" className="text-xs">Check {job.backgroundCheckStage.replace("-", " ")}</Badge>
        </div>
        <p className="text-sm leading-relaxed text-foreground/75 line-clamp-2">{job.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {job.highlights.slice(0, 3).map((item) => (
            <Badge key={item} variant="muted" className="text-xs">{item}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <Button asChild size="sm" variant="accent" className="flex-1">
            <Link href={`/jobs/${job.id}`}>View details</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/apply/${job.id}`}>Apply</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
          <ShieldCheck className="h-3.5 w-3.5" /> <span>Privacy respected</span>
        </div>
      </CardContent>
    </Card>
  );
}
