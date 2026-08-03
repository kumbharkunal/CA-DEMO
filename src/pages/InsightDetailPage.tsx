import { Navigate, useParams, Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Section, Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Seo } from "@/components/seo/Seo";
import { buttonVariants } from "@/components/ui/button";
import { duration, easeOut } from "@/lib/motion";
import { findInsight } from "@/components/sections/insights/insights";
import { ctaLabel } from "@/lib/site";
import { useBooking } from "@/components/forms/booking-context";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

/**
 * Briefing article template. Route-guards by slug; unknown slugs fall
 * through to 404. The body renders from the insights registry — long-form
 * editorial reading, single column, generous leading. Ends on the firm CTA.
 */
export default function InsightDetailPage() {
  const { slug } = useParams();
  const reducedMotion = useReducedMotion();
  const { openBooking } = useBooking();
  const post = slug ? findInsight(slug) : undefined;

  if (!post) return <Navigate to="/404" replace />;

  const item = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0 as const, y: 14 as const },
          animate: { opacity: 1 as const, y: 0 as const },
          transition: { duration: duration.entrance, ease: easeOut, delay },
        };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Sharma & Kapoor, Chartered Accountants" },
    publisher: { "@type": "Organization", name: "Sharma & Kapoor, Chartered Accountants" },
  };

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/insights/${post.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHero
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: post.category },
            ]}
          />
        }
        eyebrow={`${post.category} · ${post.readingMinutes} min read`}
        heading={post.title}
        lede={post.excerpt}
      />

      <Section aria-label="Article" className="mt-16">
        <Container className="max-w-[68ch]">
          <motion.p {...item(0)} className="text-body-s text-text-muted">
            Published{" "}
            <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
          </motion.p>
          <motion.div {...item(0.08)} className="mt-8 space-y-6">
            {post.body?.map((para, i) => (
              <p key={i} className="text-body-l leading-relaxed text-text-secondary">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Editorial close */}
          <motion.div {...item(0.16)} className="mt-16 border-t border-border-default pt-10">
            <p className="text-eyebrow text-brand-brass-text">A question this raises</p>
            <p className="mt-3 font-display text-h4 text-text-primary">
              If this briefing touches your own numbers, let's talk it through.
            </p>
            <p className="mt-2 max-w-[54ch] text-body-m leading-relaxed text-text-secondary">
              Thirty minutes, on the specific point — general advice is what this page is for.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={openBooking}
                className={buttonVariants({ variant: "brass" })}
              >
                {ctaLabel}
              </button>
            </div>
          </motion.div>

          <motion.div {...item(0.22)} className="mt-12">
            <Link
              to="/insights"
              className="group inline-flex items-center gap-2 text-body-s font-medium text-text-secondary outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <ArrowLeft className="size-4 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true" />
              All insights
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
