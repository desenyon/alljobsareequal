export type BackgroundCheckStage = "pre-interview" | "after-interview" | "after-offer" | "none";
export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type RemoteSupport = "remote" | "hybrid" | "onsite";
export type ApplicationStage = "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";

export interface EmployerPolicyFairChance {
  backgroundCheckTiming: BackgroundCheckStage;
  rolesExcluded: string[];
  policyLink: string;
}

export interface EmployerPolicyDisability {
  accommodations: string[];
  interviewAccommodations: boolean;
  remoteSupport: RemoteSupport;
  mentalHealthBenefits: boolean;
}

export interface Employer {
  id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  verified: boolean;
  fairChance: EmployerPolicyFairChance;
  disability: EmployerPolicyDisability;
  logo?: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  mode: WorkMode;
  salaryMin: number;
  salaryMax: number;
  employerId: string;
  backgroundCheckStage: BackgroundCheckStage;
  accommodations: string[];
  remoteSupport: RemoteSupport;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  highlights: string[];
  verifiedEmployer?: boolean;
  hidden?: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  email: string;
  message: string;
  shareFairChance: boolean;
  shareAccommodations: boolean;
  stage: ApplicationStage;
  createdAt: string;
}

export interface CandidatePrivacy {
  shareFairChance: boolean;
  shareAccommodations: boolean;
}

export interface JobFilters {
  mode?: WorkMode | "";
  salaryMin?: number;
  salaryMax?: number;
  backgroundCheckStage?: BackgroundCheckStage | "";
  accommodations?: string[];
  verifiedOnly?: boolean;
}
