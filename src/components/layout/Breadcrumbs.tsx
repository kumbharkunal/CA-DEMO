import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumbs — the quiet wayfinding thread. Ink-muted, hairline thin,
 * hidden on mobile where the back button and navbar own wayfinding; shown
 * from sm up. The current page is `aria-current="page"` and unlinked.
 *
 * Set `jsonLd={false}` when the page renders more than one breadcrumb
 * (only one BreadcrumbList may exist per document); the first instance
 * keeps the schema.
 */
export function Breadcrumbs({ items, jsonLd = true }: { items: Crumb[]; jsonLd?: boolean }) {
  const schema =
    jsonLd
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${siteConfig.siteUrl}${item.href}` } : {}),
          })),
        }
      : null;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8 hidden sm:block">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-s text-text-muted">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-2">
                {item.href && !last ? (
                  <Link
                    to={item.href}
                    className="outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={last ? "text-text-secondary" : undefined}>
                    {item.label}
                  </span>
                )}
                {!last && <ChevronRight className="size-3.5 text-border-strong" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
