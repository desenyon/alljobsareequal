"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { applications as seedApplications } from "@/data/applications";
import { employers } from "@/data/employers";
import { jobs as seedJobs } from "@/data/jobs";
import {
  Application,
  ApplicationStage,
  CandidatePrivacy,
  Job,
} from "@/types";

const STORAGE_KEYS = {
  createdJobs: "ajae_createdJobs",
  applications: "ajae_applications",
  savedJobs: "ajae_savedJobs",
  reports: "ajae_reports",
  hiddenJobs: "ajae_hiddenJobs",
  privacy: "ajae_privacy",
} as const;

const defaultPrivacy: CandidatePrivacy = {
  shareFairChance: false,
  shareAccommodations: false,
};

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`Failed to parse ${key}`, error);
    return fallback;
  }
}

function persist<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function usePortalDataState() {
  const [createdJobs, setCreatedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>(seedApplications);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [reports, setReports] = useState<string[]>([]);
  const [hiddenJobs, setHiddenJobs] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<CandidatePrivacy>(defaultPrivacy);

  useEffect(() => {
    const initCreated = loadLocal<Job[]>(STORAGE_KEYS.createdJobs, []);
    const initApplications = loadLocal<Application[]>(
      STORAGE_KEYS.applications,
      seedApplications,
    );
    const initSaved = loadLocal<string[]>(STORAGE_KEYS.savedJobs, []);
    const initReports = loadLocal<string[]>(STORAGE_KEYS.reports, []);
    const initHidden = loadLocal<string[]>(STORAGE_KEYS.hiddenJobs, []);
    const initPrivacy = loadLocal<CandidatePrivacy>(
      STORAGE_KEYS.privacy,
      defaultPrivacy,
    );

    setCreatedJobs(initCreated);
    setApplications(initApplications);
    setSavedJobs(initSaved);
    setReports(initReports);
    setHiddenJobs(initHidden);
    setPrivacy(initPrivacy);
  }, []);

  useEffect(() => {
    persist(STORAGE_KEYS.createdJobs, createdJobs);
  }, [createdJobs]);
  useEffect(() => {
    persist(STORAGE_KEYS.applications, applications);
  }, [applications]);
  useEffect(() => {
    persist(STORAGE_KEYS.savedJobs, savedJobs);
  }, [savedJobs]);
  useEffect(() => {
    persist(STORAGE_KEYS.reports, reports);
  }, [reports]);
  useEffect(() => {
    persist(STORAGE_KEYS.hiddenJobs, hiddenJobs);
  }, [hiddenJobs]);
  useEffect(() => {
    persist(STORAGE_KEYS.privacy, privacy);
  }, [privacy]);

  const mergedJobs = useMemo(() => {
    const visibleSeeds = seedJobs.filter((job) => !hiddenJobs.includes(job.id));
    const visibleCreated = createdJobs.filter((job) => !hiddenJobs.includes(job.id));
    return [...visibleSeeds, ...visibleCreated].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [createdJobs, hiddenJobs]);

  const applicationsByJob = useMemo(() => {
    return mergedJobs.reduce<Record<string, Application[]>>((acc, job) => {
      acc[job.id] = applications.filter((app) => app.jobId === job.id);
      return acc;
    }, {});
  }, [applications, mergedJobs]);

  const employerById = useMemo(() => {
    return employers.reduce<Record<string, (typeof employers)[number]>>((acc, employer) => {
      acc[employer.id] = employer;
      return acc;
    }, {});
  }, []);

  const toggleSaveJob = useCallback((jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId],
    );
  }, []);

  const createJob = useCallback(
    (payload: Omit<Job, "id" | "createdAt" | "verifiedEmployer">) => {
      const employer = employers.find((e) => e.id === payload.employerId);
      const job: Job = {
        ...payload,
        id: makeId("job"),
        createdAt: new Date().toISOString(),
        verifiedEmployer: employer?.verified ?? false,
      };
      setCreatedJobs((prev) => [job, ...prev]);
      return job;
    },
    [],
  );

  const applyToJob = useCallback(
    (payload: Omit<Application, "id" | "stage" | "createdAt">) => {
      const application: Application = {
        ...payload,
        id: makeId("app"),
        stage: "Applied",
        createdAt: new Date().toISOString(),
      };
      setApplications((prev) => [application, ...prev]);
      return application;
    },
    [],
  );

  const updateApplicationStage = useCallback(
    (applicationId: string, stage: ApplicationStage) => {
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, stage } : app)),
      );
    },
    [],
  );

  const hideJob = useCallback((jobId: string) => {
    setHiddenJobs((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  }, []);

  const addReport = useCallback((jobId: string) => {
    setReports((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  }, []);

  const updatePrivacy = useCallback((value: CandidatePrivacy) => {
    setPrivacy(value);
  }, []);

  return {
    jobs: mergedJobs,
    employers,
    applications,
    applicationsByJob,
    savedJobs,
    reports,
    hiddenJobs,
    privacy,
    toggleSaveJob,
    createJob,
    applyToJob,
    updateApplicationStage,
    hideJob,
    addReport,
    updatePrivacy,
    employerById,
  };
}

type PortalDataState = ReturnType<typeof usePortalDataState>;

const PortalDataContext = createContext<PortalDataState | null>(null);

export function PortalDataProvider({ children }: { children: ReactNode }) {
  const value = usePortalDataState();
  return <PortalDataContext.Provider value={value}>{children}</PortalDataContext.Provider>;
}

export function usePortalData() {
  const ctx = useContext(PortalDataContext);
  if (!ctx) {
    throw new Error("PortalDataProvider is missing");
  }
  return ctx;
}
