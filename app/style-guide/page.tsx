"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function StyleGuidePage() {
  return (
    <div className="container-slim space-y-8 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Style guide</h1>
        <p className="text-sm text-muted">Quick look at typography, buttons, cards, and fields.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Editorial, calm, future-light.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <h1 className="text-3xl font-semibold">Heading 1</h1>
            <h2 className="text-2xl font-semibold">Heading 2</h2>
            <h3 className="text-xl font-semibold">Heading 3</h3>
            <p className="text-sm text-muted">Body text for notes and helper copy.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Primary + secondary.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>States and policies.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="accent">Verified</Badge>
            <Badge variant="outline">Fair-chance</Badge>
            <Badge variant="muted">Disability-inclusive</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Form fields</CardTitle>
            <CardDescription>Simple and quiet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
            </div>
            <div className="space-y-1">
              <Label>Notes</Label>
              <Textarea rows={3} placeholder="Keep it concise" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
