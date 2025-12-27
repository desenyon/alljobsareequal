import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/top-nav";
import { AppToaster } from "@/components/ui/sonner";
import { PortalDataProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "AllJobsAreEqual | Fair-chance + disability-inclusive jobs",
  description: "A minimalist portal connecting inclusive employers with fair-chance and disabled candidates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <PortalDataProvider>
          <TopNav />
          <main className="pb-16">{children}</main>
          <AppToaster />
        </PortalDataProvider>
      </body>
    </html>
  );
}
