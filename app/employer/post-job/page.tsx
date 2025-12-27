"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePortalData } from "@/lib/store";

const schema = z.object({
  title: z.string().min(3),
  employerId: z.string().min(1),
  location: z.string().min(2),
  mode: z.enum(["Remote", "Hybrid", "On-site"]),
  salaryMin: z.number().min(40000),
  salaryMax: z.number().min(40000),
  backgroundCheckStage: z.enum(["pre-interview", "after-interview", "after-offer", "none"]),
  accommodations: z.string().min(3),
  summary: z.string().min(10),
});

export default function PostJobPage() {
  const { employers, createJob } = usePortalData();
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      employerId: employers[0]?.id ?? "",
      mode: "Remote",
      backgroundCheckStage: "after-interview",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    createJob({
      ...values,
      accommodations: values.accommodations.split(",").map((item) => item.trim()).filter(Boolean),
      salaryMin: Number(values.salaryMin),
      salaryMax: Number(values.salaryMax),
      responsibilities: ["Define in intake"],
      requirements: ["Define in intake"],
      highlights: ["Employer provided"],
      remoteSupport: values.mode === "Remote" ? "remote" : values.mode === "Hybrid" ? "hybrid" : "onsite",
    });
    toast.success("Job posted successfully", { 
      description: "Your inclusive job listing is now live and visible to candidates.",
      duration: 4000,
    });
    setTimeout(() => {
      router.push("/employer");
    }, 800);
  };

  return (
    <div className="container-slim space-y-6 py-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Post a job</h1>
          <p className="text-sm text-muted">Inclusive defaults baked in.</p>
        </div>
        <Badge variant="accent">Fast draft</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role details</CardTitle>
          <CardDescription>Only share what you are ready to honor.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Job title</Label>
              <Input id="title" {...form.register("title")} placeholder="Accessibility QA" />
              {form.formState.errors.title && <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Employer</Label>
              <Select value={form.watch("employerId")} onValueChange={(value) => form.setValue("employerId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {employers.map((employer) => (
                    <SelectItem key={employer.id} value={employer.id}>{employer.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} placeholder="Remote or City, ST" />
            </div>
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select value={form.watch("mode") || "Remote"} onValueChange={(value) => form.setValue("mode", value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Salary min</Label>
              <Input type="number" inputMode="numeric" id="salaryMin" {...form.register("salaryMin", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Salary max</Label>
              <Input type="number" inputMode="numeric" id="salaryMax" {...form.register("salaryMax", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Background check timing</Label>
              <Select
                value={form.watch("backgroundCheckStage") || "after-interview"}
                onValueChange={(value) => form.setValue("backgroundCheckStage", value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-interview">Pre-interview</SelectItem>
                  <SelectItem value="after-interview">After interview</SelectItem>
                  <SelectItem value="after-offer">After offer</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="accommodations">Accommodations (comma separated)</Label>
              <Input id="accommodations" placeholder="ASL interpreters, Flexible scheduling" {...form.register("accommodations")} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" rows={4} placeholder="What candidates should know" {...form.register("summary")} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" variant="accent" size="lg" className="w-full md:w-fit">
                Publish job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
