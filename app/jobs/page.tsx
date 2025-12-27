"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FilterPanel } from "@/components/filter-panel";
import { JobCard } from "@/components/job-card";
import { usePortalData } from "@/lib/store";
import { JobFilters } from "@/types";

export default function JobsPage() {
  const { jobs, employers } = usePortalData();
  const [filters, setFilters] = useState<JobFilters>({});

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const employer = employers.find((e) => e.id === job.employerId);
      if (filters.mode && job.mode !== filters.mode) return false;
      if (filters.salaryMin && job.salaryMin < filters.salaryMin) return false;
      if (filters.salaryMax && job.salaryMax > filters.salaryMax) return false;
      if (filters.backgroundCheckStage && job.backgroundCheckStage !== filters.backgroundCheckStage)
        return false;
      if (filters.accommodations && filters.accommodations.length) {
        const hasAll = filters.accommodations.every((acc) => job.accommodations.includes(acc));
        if (!hasAll) return false;
      }
      if (filters.verifiedOnly && !(job.verifiedEmployer || employer?.verified)) return false;
      return true;
    });
  }, [filters, jobs, employers]);

  return (
    <div className="container-slim grid gap-6 py-8 md:grid-cols-[300px,1fr] md:gap-8">
      <div>
        <FilterPanel filters={filters} onChange={setFilters} />
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Find a role built for you</h1>
            <p className="text-muted text-sm">Filters that matter: mode, salary, verification, and accommodations.</p>
          </div>
          <Badge variant="accent" className="shrink-0">{filtered.length} {filtered.length === 1 ? 'role' : 'roles'}</Badge>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((job, idx) => (
            <div key={job.id} className={`animate-fade-in stagger-${Math.min(idx + 1, 6)}`}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-border/60 p-12 text-center animate-fade-in">
            <div className="mx-auto w-fit rounded-full bg-muted/50 p-4 mb-4">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm text-muted font-medium mb-2">No roles match your filters</p>
            <p className="text-xs text-muted-foreground">Try adjusting your criteria or reset filters to see all jobs</p>
          </div>
        )}
      </div>
    </div>
  );
}
