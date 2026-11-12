import { Boxes, Cpu, Gauge, Layers } from "lucide-react";

import PageSection from "@/components/PageSection";
import TextLink from "@/components/primitives/TextLink";
import type { PortfolioData } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/theme";

type Capability = NonNullable<
  NonNullable<PortfolioData["home"]>["capabilities"]
>[number];

interface CapabilitiesProps {
  capabilities?: Capability[];
}

/** Icons are positional: the data stays content-only. */
const icons = [Layers, Cpu, Gauge, Boxes];

export default function Capabilities({ capabilities }: CapabilitiesProps) {
  if (!capabilities?.length) return null;

  return (
    <PageSection
      spacing="default"
      ariaLabel="What I do"
      className="border-t border-border-subtle"
    >
      {/* The section is visual-only; the heading keeps the document outline intact. */}
      <h2 className="sr-only">What I do</h2>

      <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((capability, index) => {
          const Icon = icons[index % icons.length];

          return (
            <div
              key={capability.title}
              className={cn(
                ui.card,
                "group flex min-h-[25rem] flex-col overflow-hidden",
              )}
            >
              <div className="flex flex-col gap-3 px-6 pt-6">
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-text-secondary"
                  strokeWidth={1.5}
                />

                <h3 className="type-h3 text-text-primary">
                  {capability.title}
                </h3>

                <p className="type-body max-w-[32ch] text-text-secondary">
                  {capability.description}
                </p>

                {capability.href && (
                  <TextLink
                    href={capability.href}
                    withArrow
                    className="mt-auto"
                  >
                    See work
                  </TextLink>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}
