"use client";

export default function RedirectPage() {
  // This code only runs in the browser
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("url");

    if (raw) {
      let target = raw;
      try {
        target = decodeURIComponent(raw);
      } catch {
        // ignore decode errors, use raw
      }

      window.location.replace(target);
    }
  }

  return null;
}
