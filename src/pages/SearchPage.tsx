import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowUpRight, SearchIcon } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Seo } from "@/components/seo/Seo";
import { featuredInsights } from "@/components/sections/insights/insights";
import { practices } from "@/lib/practices";
import { industriesNav } from "@/lib/site";

type Result = {
  title: string;
  excerpt: string;
  href: string;
  category: "Service" | "Industry" | "Insight" | "Page";
};

const index: Result[] = [
  ...practices.map((p) => ({
    title: p.name,
    excerpt: p.lede,
    href: `/services/${p.slug}`,
    category: "Service" as const,
  })),
  ...industriesNav.map((i) => ({
    title: i.label,
    excerpt: i.note ?? "",
    href: i.href,
    category: "Industry" as const,
  })),
  ...featuredInsights.map((p) => ({
    title: p.title,
    excerpt: p.excerpt,
    href: `/insights/${p.slug}`,
    category: "Insight" as const,
  })),
  { title: "Our services", excerpt: "Every practice, one page.", href: "/services", category: "Page" as const },
  { title: "Industries we serve", excerpt: "Six sectors we embed in.", href: "/industries", category: "Page" as const },
  { title: "About the firm", excerpt: "Twenty-seven years of standing behind numbers.", href: "/about", category: "Page" as const },
  { title: "Contact & consultation", excerpt: "Book thirty minutes with a partner.", href: "/contact", category: "Page" as const },
  { title: "Insights", excerpt: "Briefings from the partners.", href: "/insights", category: "Page" as const },
];

/**
 * Search — a light client-side lookup over the site's named surfaces
 * (services, industries, insights, top-level pages). Reads ?q= from the
 * URL so the header search can link here directly.
 */
export default function SearchPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <Seo noindex title="Search" description="Search services, industries, briefings, and pages." path="/search" />
      <PageHero
        eyebrow="Search"
        heading="Find what you're looking for."
        lede="Search services, industries, briefings, and pages."
      />
      <Section aria-label="Search results" className="mt-16">
        <Container className="max-w-3xl">
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “GST”, “audit”, “ESOP”…"
              autoComplete="off"
              className="h-13 w-full rounded-md border border-border-default bg-surface pl-11 pr-4 text-body-l text-text-primary placeholder:text-text-muted outline-none transition-[border-color,box-shadow] duration-150 ease-standard focus:border-brand-brass focus:ring-2 focus:ring-focus-ring/30"
            />
          </div>

          {query.trim() === "" ? (
            <p className="mt-14 text-body-m text-text-muted">
              Type to search across {index.length} pages and practices.
            </p>
          ) : results.length === 0 ? (
            <p role="status" className="mt-14 text-body-m text-text-muted">
              Nothing matched “{query}”. Try a broader term, or <Link to="/contact" className="text-brand-brass-text underline-offset-4 hover:underline">ask a partner directly</Link>.
            </p>
          ) : (
            <>
              <p role="status" aria-live="polite" className="mt-10 text-body-s text-text-muted">
                {results.length} result{results.length === 1 ? "" : "s"}
              </p>
              <ul className="mt-4 divide-y divide-border-default border-y border-border-default p-0">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link
                      to={r.href}
                      className="group flex items-start justify-between gap-6 py-6 outline-none transition-colors duration-150 ease-standard focus-visible:bg-surface"
                    >
                      <span className="min-w-0">
                        <span className="block text-caption font-medium uppercase tracking-[0.12em] text-brand-brass-text">{r.category}</span>
                        <span className="mt-1.5 block font-sans text-h5 text-text-primary transition-colors duration-150 group-hover:text-brand-brass-text">{r.title}</span>
                        <span className="mt-1 block max-w-[58ch] text-body-s leading-relaxed text-text-secondary">{r.excerpt}</span>
                      </span>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-text-muted transition-[transform,color] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-brass-text" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
