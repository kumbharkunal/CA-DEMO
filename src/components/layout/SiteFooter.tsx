import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowUp, Linkedin, Twitter } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { useBooking } from "@/components/forms/booking-context";
import {
  ctaLabel,
  industriesNav,
  primaryNav,
  servicesNav,
  siteConfig,
} from "@/lib/site";

const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

/**
 * The premium footer — "The Firm's Card" (locked Footer composition).
 * Four columns: brand + letter / services / industries + firm / contact,
 * then a brass-thread legal band. The back-to-top control lives in the
 * band rather than floating — quiet, discoverable, one honest action.
 */
export function SiteFooter() {
  const [showTop, setShowTop] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({
      top: 0,
      // Respect reduced-motion: jump instead of gliding.
      behavior:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
    });
  };

  return (
    <footer className="border-t border-border-default bg-surface">
      <Container className="grid gap-x-12 gap-y-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        {/* Brand + the letter */}
        <div>
          <Link
            to="/"
            className="font-display text-lg font-medium text-text-primary outline-none transition-colors duration-150 ease-standard hover:text-brand-brass focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-[32ch] text-body-m leading-relaxed text-text-secondary">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-body-s text-text-muted">
            ICAI {siteConfig.icaiRegistration} · Est. {siteConfig.established}
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            <SocialLink href={siteConfig.social.linkedin} label="Sharma & Kapoor on LinkedIn">
              <Linkedin className="size-4" aria-hidden="true" />
            </SocialLink>
            <SocialLink href={siteConfig.social.x} label="Sharma & Kapoor on X">
              <Twitter className="size-4" aria-hidden="true" />
            </SocialLink>
          </div>
        </div>

        <FooterNav title="Services" items={servicesNav.map(({ label, href }) => ({ label, href }))} />
        <FooterNav title="Industries" items={industriesNav.map(({ label, href }) => ({ label, href }))} />
        <FooterNav
          title="Firm"
          items={[
            ...primaryNav.map(({ label, href }) => ({ label, href })),
            { label: "Resources", href: "/resources" },
            { label: "Contact", href: "/contact" },
          ]}
        />

        {/* Contact + the letter */}
        <div>
          <p className="text-eyebrow text-text-muted">Reach a partner</p>
          <address className="mt-5 space-y-3 text-body-m not-italic text-text-secondary">
            {siteConfig.address.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {siteConfig.email}
              </a>
            </p>
          </address>
          <button
            type="button"
            onClick={openBooking}
            className="mt-5 inline-flex items-center gap-1.5 text-body-m font-medium text-brand-brass-text outline-none transition-colors duration-150 ease-standard hover:text-brand-brass-hover focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {ctaLabel}
          </button>
          <div className="mt-8 border-t border-border-default pt-6">
            <p className="text-eyebrow text-text-muted">The monthly letter</p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Container>

      {/* Legal band */}
      <div className="border-t border-border-default">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="text-caption text-text-muted">
            © {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.hours}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-caption text-text-muted outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toTop}
              className={
                (showTop ? "opacity-100" : "pointer-events-none opacity-0") +
                " inline-flex items-center gap-1.5 text-caption text-text-muted outline-none transition-opacity duration-150 ease-standard hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
              }
              aria-label="Back to top"
              tabIndex={showTop ? 0 : -1}
            >
              Back to top
              <ArrowUp className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterNav({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={`Footer — ${title}`}>
      <p className="text-eyebrow text-text-muted">{title}</p>
      <ul className="mt-5 space-y-3 text-body-m">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="text-text-secondary outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-md border border-border-default text-text-secondary outline-none transition-[border-color,color,background-color] duration-150 ease-standard hover:border-border-strong hover:bg-background hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      {children}
    </a>
  );
}
