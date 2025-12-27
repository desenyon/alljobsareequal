"use client";

import { useEffect, useState } from "react";

type Role = "candidate" | "employer" | "admin";
const ROLE_KEY = "ajae_role";

export function useRole() {
  const [role, setRole] = useState<Role>("candidate");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(ROLE_KEY) : null;
    if (stored === "candidate" || stored === "employer" || stored === "admin") {
      setRole(stored);
    }
  }, []);

  const updateRole = (value: Role) => {
    setRole(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ROLE_KEY, value);
    }
  };

  return { role, updateRole };
}
