import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { sectionItemVariants } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { revealViewport } from "@/lib/motion";
import { featuredInsights, insightsEyebrow, insightsHeading, insightsSubheadline } from "@/components/sections/insights/insights";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

const categories = ["All", ...Array.from(new Set(featuredInsights.map((p) => p.category)))] as const;

/**
 * Insights index — the journal. Filter chips nail the category row to one
 * line; the list itself keeps the homepage's hairline editorial rhythm.
 */
export default function InsightsPage() {
  const reducedMotion = useReducedMotion();
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const itemProps = reducedMotion ? {} : { variants: sectionItemVariants };

  const posts = useMemo(
    () => (category === "All" ? featuredInsights : featuredInsights.filter((p) => p.category === category)),
    [category],
  );

  const listProps = reducedMotion
    ? {}
    : { variants: gridVariants, initial: "hidden" as const, whileInView: "visible" as const, viewport: revealViewport };

  return (
    <>
      <Seo title="Insights" description={insightsSubheadline} path="/insights" />
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />}
        eyebrow={insightsEyebrow}
        heading={insightsHeading}
        lede={insightsSubheadline}
      />

      <Section aria-label="All insights" className="mt-16">
        <Container>
          <div role="tablist" aria-label="Filter insights by category" className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-body-s font-medium outline-none transition-[border-color,background-color,color] duration-150 ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring",
                  category === cat
                    ? "border-brand-brass bg-brand-brass-subtle text-brand-brass-text"
                    : "border-border-default bg-transparent text-text-secondary hover:border-border-strong hover:text-text-primary",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.ul key={category} {...listProps} className="mt-12 list-none divide-y divide-border-default border-y border-border-default p-0">
            {posts.map((post) => (
              <motion.li key={post.slug} {...itemProps}>
                <Link
                  to={`/insights/${post.slug}`}
                  className="group grid grid-cols-1 gap-3 py-8 outline-none transition-colors duration-150 ease-standard focus-visible:bg-surface md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
                >
                  <span className="flex items-baseline gap-3 text-body-s text-text-muted md:block md:space-y-1">
                    <span className="text-caption font-medium uppercase tracking-[0.12em] text-brand-brass-text">{post.category}</span>
                    <time dateTime={post.date} className="block">{dateFmt.format(new Date(post.date))}</time>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sans text-h5 text-text-primary transition-colors duration-150 ease-standard group-hover:text-brand-brass-text">{post.title}</span>
                    <span className="mt-2 block max-w-[62ch] text-body-m leading-relaxed text-text-secondary">{post.excerpt}</span>
                  </span>
                  <span className="flex items-center gap-2 text-body-s text-text-muted">
                    {post.readingMinutes} min
                    <ArrowUpRight aria-hidden="true" className="size-4 transition-[transform,color] duration-150 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass-text" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          {posts.length === 0 && (
            <p role="status" className="py-16 text-center text-body-m text-text-muted">
              No briefings in this category yet.
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
