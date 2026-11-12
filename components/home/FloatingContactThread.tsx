import ContactThreadWindow from "@/components/home/ContactInterface";
import type { MediaRef, PortfolioData } from "@/lib/portfolio";

interface FloatingContactThreadProps {
  profile: PortfolioData["profile"];
  visual?: MediaRef;
}

/** Fixed bottom-right contact thread — stays on screen while the home page scrolls. */
export default function FloatingContactThread({
  profile,
  visual,
}: FloatingContactThreadProps) {
  if (!visual) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-end px-4 pb-4 pt-0 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8"
      data-contact-float
    >
      <ContactThreadWindow
        profile={profile}
        visual={visual}
        className="pointer-events-auto"
      />
    </div>
  );
}
