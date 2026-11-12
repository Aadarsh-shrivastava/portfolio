"use client";

import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import IconButton from "@/components/primitives/IconButton";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/theme";
import type { MediaRef, PortfolioData } from "@/lib/portfolio";

interface ContactInterfaceProps {
  profile: PortfolioData["profile"];
  visual?: MediaRef;
  className?: string;
  /** When false, only the floating chat button shows until opened. */
  defaultOpen?: boolean;
}

/** Floating thread window — toggles with a chat button until the live composer ships. */
export default function ContactThreadWindow({
  profile,
  visual,
  className,
  defaultOpen = false,
}: ContactInterfaceProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (!visual) return null;

  const mailto = `mailto:${profile.email}`;
  const firstName = profile.name.split(" ")[0];

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        aria-controls="contact-thread-panel"
        className={cn(
          ui.card,
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
          "shadow-[0_16px_48px_-8px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.08]",
          "bg-surface-elevated text-text-primary transition-standard",
          "hover:-translate-y-0.5 hover:ring-white/[0.14] hover:text-accent",
          className,
        )}
      >
        <MessageCircle aria-hidden className="h-6 w-6" strokeWidth={1.5} />
        <span className="sr-only">Open chat with {firstName}</span>
      </button>
    );
  }

  return (
    <div
      id="contact-thread-panel"
      role="dialog"
      aria-label={`Message ${firstName}`}
      className={cn(
        "relative w-full max-w-[min(100%,33rem)] shrink-0",
        className,
      )}
    >
      <IconButton
        label="Close chat"
        variant="ghost"
        onClick={() => setOpen(false)}
        className="absolute right-1 top-1 z-10 rounded-full bg-background/80 backdrop-blur-sm"
      >
        <X aria-hidden className="h-4 w-4" strokeWidth={1.5} />
      </IconButton>

      <a
        href={mailto}
        className="group block transition-standard hover:-translate-y-0.5"
      >
        <div
          className={cn(
            ui.card,
            "overflow-hidden rounded-xl p-1 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.75)]",
            "ring-1 ring-white/[0.06] transition-standard group-hover:ring-white/[0.12]",
          )}
        >
          <Image
            src={visual.src}
            alt={visual.alt}
            width={1287}
            height={1222}
            className="h-auto w-full rounded-[calc(var(--radius-lg)-2px)]"
            sizes="(max-width: 768px) 100vw, 528px"
          />
        </div>
        <p className="type-small mt-3 text-center text-text-muted transition-standard group-hover:text-text-secondary">
          Message {firstName} — opens your email client for now
        </p>
      </a>
    </div>
  );
}
