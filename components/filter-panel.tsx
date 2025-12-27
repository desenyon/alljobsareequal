"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { JobFilters } from "@/types";

interface Props {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

const accommodationOptions = [
  "Flexible scheduling",
  "Remote care coordination",
  "Adaptive devices",
  "Interview breaks",
  "Hardware stipend",
];

export function FilterPanel({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Work mode</Label>
        <Select
          value={filters.mode ?? "any"}
          onValueChange={(value) => {
            const next = value === "any" ? undefined : (value as any);
            onChange({ ...filters, mode: next });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="On-site">On-site</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Salary min</Label>
          <Input
            type="number"
            inputMode="numeric"
            value={filters.salaryMin ?? ""}
            onChange={(e) => onChange({ ...filters, salaryMin: Number(e.target.value) || undefined })}
            placeholder="e.g. 60000"
          />
        </div>
        <div>
          <Label>Salary max</Label>
          <Input
            type="number"
            inputMode="numeric"
            value={filters.salaryMax ?? ""}
            onChange={(e) => onChange({ ...filters, salaryMax: Number(e.target.value) || undefined })}
            placeholder="e.g. 110000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Background check stage</Label>
        <Select
          value={filters.backgroundCheckStage ?? "any"}
          onValueChange={(value) => {
            const next = value === "any" ? undefined : (value as any);
            onChange({ ...filters, backgroundCheckStage: next });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any timing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="pre-interview">Pre-interview</SelectItem>
            <SelectItem value="after-interview">After interview</SelectItem>
            <SelectItem value="after-offer">After offer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Accommodations</Label>
        <div className="space-y-2 rounded-xl border border-border p-3">
          {accommodationOptions.map((option) => {
            const checked = filters.accommodations?.includes(option) ?? false;
            return (
              <label key={option} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(state) => {
                    const next = state
                      ? [...(filters.accommodations ?? []), option]
                      : (filters.accommodations ?? []).filter((item) => item !== option);
                    onChange({ ...filters, accommodations: next });
                  }}
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium">
        <Checkbox
          checked={filters.verifiedOnly ?? false}
          onCheckedChange={(state) => onChange({ ...filters, verifiedOnly: Boolean(state) })}
        />
        Verified employers only
      </label>
      <Button variant="ghost" className="w-full" onClick={() => onChange({})}>
        Reset filters
      </Button>
    </div>
  );

  return (
    <div className="md:sticky md:top-20 md:h-fit md:min-w-[280px] md:rounded-xl md:border md:border-border/80 md:bg-card md:p-5 md:shadow-sm">
      <h3 className="hidden md:block text-sm font-semibold mb-4 text-foreground/90">Filters</h3>
      <div className="hidden md:block">{content}</div>
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full" aria-label="Open filters">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter jobs</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4" onClick={(e) => e.stopPropagation()}>
              {content}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
