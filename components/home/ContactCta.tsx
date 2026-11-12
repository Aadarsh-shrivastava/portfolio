import Button from "@/components/primitives/Button";
import ContactLinks from "@/components/contact/ContactLinks";
import Media from "@/components/Media";
import PageSection from "@/components/PageSection";
import type { MediaRef, PortfolioData } from "@/lib/portfolio";

interface ContactCtaProps {
  profile: PortfolioData["profile"];
  visual?: MediaRef;
}

export default function ContactCta({ profile, visual }: ContactCtaProps) {
  return (
    <PageSection
      fullHeight
      spacing="loose"
      id="contact"
      ariaLabel="Contact"
      className="relative isolate overflow-visible border-t border-border-subtle"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 overflow-hidden"
      >
        <Media
          media={visual}
          ratio="wide"
          fade="frame"
          frame={false}
          className="h-full opacity-50"
        />
      </div>

      <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="glow-behind glow-behind-subtle flex max-w-xl flex-col items-start gap-8">
          <p className="type-eyebrow text-text-muted">
            Let&apos;s work together
          </p>

          <h2 className="type-display max-w-[12ch] text-balance text-text-primary">
            Have a project in mind?
          </h2>

          <p className="type-body-lg max-w-[44ch] text-text-secondary">
            I&apos;m open to interesting problems, products, and collaborations.
            Open the thread to reach me directly.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href={`mailto:${profile.email}`} external variant="primary">
              Send a message
            </Button>
            <Button href="/contact" variant="secondary">
              View contact
            </Button>
          </div>
        </div>
        <ContactLinks profile={profile} className="w-full max-w-md pt-2" />
      </div>
    </PageSection>
  );
}
