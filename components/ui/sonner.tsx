"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: 12,
          border: "1px solid #d9dad5",
          background: "#ffffff",
          color: "#0f1115",
          boxShadow: "0 10px 40px -20px rgba(10,10,10,0.2)",
        },
      }}
    />
  );
}
