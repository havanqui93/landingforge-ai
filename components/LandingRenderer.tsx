import { ThemeProvider } from "@/components/ThemeProvider";
import { LandingErrorBoundary } from "@/components/LandingErrorBoundary";
import { LandingNav } from "@/components/sections/LandingNav";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import type { LandingConfig, Section, FooterSection } from "@/lib/landing.types";

/**
 * Maps each section variant to its component. The `switch` is exhaustive:
 * the `never` branch makes TypeScript fail the build if a new union member
 * is added without a matching case.
 */
function renderSection(section: Section, index: number) {
  switch (section.type) {
    case "hero":
      return <Hero key={index} data={section} />;
    case "features":
      return <Features key={index} data={section} />;
    case "stats":
      return <Stats key={index} data={section} />;
    case "testimonials":
      return <Testimonials key={index} data={section} />;
    case "pricing":
      return <Pricing key={index} data={section} />;
    case "faq":
      return <FAQ key={index} data={section} />;
    case "cta":
      return <CTA key={index} data={section} />;
    case "footer":
      return <Footer key={index} data={section} />;
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}

export function LandingRenderer({ config }: { config: LandingConfig }) {
  const footerSection = config.sections.find(
    (s): s is FooterSection => s.type === "footer",
  );
  const brand =
    footerSection?.brand ??
    (config.meta.title.split(" — ")[0]?.trim() || config.meta.title);

  return (
    <LandingErrorBoundary>
      <ThemeProvider theme={config.theme}>
        <LandingNav brand={brand} />
        <main>{config.sections.map(renderSection)}</main>
      </ThemeProvider>
    </LandingErrorBoundary>
  );
}
