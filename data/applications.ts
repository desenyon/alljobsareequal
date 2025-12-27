import { Application } from "@/types";

export const applications: Application[] = [
  {
    id: "app-1",
    jobId: "job-2",
    candidateName: "Jordan Taylor",
    email: "jordan@example.com",
    message: "Excited to support care teams; background in community health.",
    shareFairChance: false,
    shareAccommodations: false,
    stage: "Screening",
    createdAt: "2024-12-10T10:00:00Z",
  },
  {
    id: "app-2",
    jobId: "job-6",
    candidateName: "Casey Lee",
    email: "casey@example.com",
    message: "People ops generalist focused on coaching and onboarding.",
    shareFairChance: true,
    shareAccommodations: false,
    stage: "Interview",
    createdAt: "2024-12-09T14:00:00Z",
  }
];
