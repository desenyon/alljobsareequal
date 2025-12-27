"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { usePortalData } from "@/lib/store";

export default function PrivacyPage() {
  const { privacy, updatePrivacy } = usePortalData();
  const [local, setLocal] = useState(privacy);

  const handleSave = () => {
    updatePrivacy(local);
    toast.success("Privacy settings updated", {
      description: "Your defaults have been saved and will apply to new applications.",
      duration: 3000,
    });
  };

  return (
    <div className="container-slim space-y-6 py-10 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Privacy controls</h1>
        <p className="text-sm text-muted">Defaults are OFF. You choose what to share per application.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sharing defaults</CardTitle>
          <CardDescription>Applies to new applications unless you change them during apply.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/30">
            <div>
              <p className="font-semibold">Share fair-chance status</p>
              <p className="text-sm text-muted">Default OFF. Turn on only when you want to disclose.</p>
            </div>
            <Switch
              checked={local.shareFairChance}
              onClick={() => setLocal((prev) => ({ ...prev, shareFairChance: !prev.shareFairChance }))}
              aria-label="Toggle fair-chance status sharing"
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/30">
            <div>
              <p className="font-semibold">Share accommodation needs</p>
              <p className="text-sm text-muted">Default OFF. Add only when helpful for the interview.</p>
            </div>
            <Switch
              checked={local.shareAccommodations}
              onClick={() => setLocal((prev) => ({ ...prev, shareAccommodations: !prev.shareAccommodations }))}
              aria-label="Toggle accommodation needs sharing"
            />
          </div>
          <Button variant="accent" onClick={handleSave} className="w-full md:w-auto">
            Save defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
