import { useEffect } from "react";
import { useLocation } from "wouter";

function track(path: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  }).catch(() => {});
}

export function usePageTracker() {
  const [location] = useLocation();

  useEffect(() => {
    track(location);
  }, [location]);
}
