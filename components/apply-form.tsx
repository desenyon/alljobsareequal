"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePortalData } from "@/lib/store";

const formSchema = z.object({
  candidateName: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Add a short note"),
  shareFairChance: z.boolean().default(false),
  shareAccommodations: z.boolean().default(false),
});

interface Props {
  jobId: string;
  defaultPrivacy: { shareFairChance: boolean; shareAccommodations: boolean };
}

export function ApplyForm({ jobId, defaultPrivacy }: Props) {
  const router = useRouter();
  const { applyToJob } = usePortalData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateName: "",
      email: "",
      message: "",
      shareFairChance: defaultPrivacy.shareFairChance,
      shareAccommodations: defaultPrivacy.shareAccommodations,
    },
  });

  useEffect(() => {
    form.reset({
      candidateName: "",
      email: "",
      message: "",
      shareFairChance: defaultPrivacy.shareFairChance,
      shareAccommodations: defaultPrivacy.shareAccommodations,
    });
  }, [defaultPrivacy, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    applyToJob({ jobId, ...values });
    toast.success("Application submitted successfully", {
      description: "Your privacy choices were respected. We'll keep you updated.",
      duration: 4000,
    });
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="candidateName">Name</Label>
        <Input id="candidateName" {...form.register("candidateName")} />
        {form.formState.errors.candidateName && (
          <p className="text-sm text-red-600">{form.formState.errors.candidateName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Short note</Label>
        <Textarea id="message" rows={4} placeholder="What should the team know?" {...form.register("message")} />
        {form.formState.errors.message && (
          <p className="text-sm text-red-600">{form.formState.errors.message.message}</p>
        )}
      </div>
      <div className="space-y-3 rounded-2xl border border-border p-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="shareFairChance"
            checked={form.watch("shareFairChance")}
            onCheckedChange={(checked) => form.setValue("shareFairChance", Boolean(checked))}
          />
          <Label htmlFor="shareFairChance">Share fair-chance status for this application</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="shareAccommodations"
            checked={form.watch("shareAccommodations")}
            onCheckedChange={(checked) => form.setValue("shareAccommodations", Boolean(checked))}
          />
          <Label htmlFor="shareAccommodations">Share accommodation needs for this application</Label>
        </div>
        <p className="text-xs text-muted">
          Defaults come from your privacy settings. Change per-application as needed.
        </p>
      </div>
      <Button type="submit" size="lg" variant="accent" className="w-full">
        Submit application
      </Button>
    </form>
  );
}
