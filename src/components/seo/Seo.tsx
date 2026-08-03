import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

const OG_IMAGE = `${siteConfig.siteUrl}/og-image.jpg`;

export type SeoProps = {
  /** Page title (<title> and og:title). Rendered as "… — Sharma & Kapoor". */
  title: string;
  /** Meta description and og:description. */
  description: string;
  /** Canonical path, e.g. "/services". Defaults to the configured root. */
  path?: string;
  /** Include "noindex, nofollow" so the route stays out of results. */
  noindex?: boolean;
};

function upsert(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-route document metadata. The SPA serves one index.html for every
 * route, so title, description, canonical, OG and robots live here rather
 * than as static markup. Runs on the client a crawler may execute; the
 * root URL's baseline is also in index.html for non-JS fetchers.
 */
export function Seo({ title, description, path = "/", noindex = false }: SeoProps) {
  const fullTitle = noindex ? title : `${title} — ${siteConfig.name}`;
  const url = `${siteConfig.siteUrl}${path === "/" ? "/" : path.replace(/\/$/, "")}`;

  useEffect(() => {
    document.title = fullTitle;
    upsert("name", "description", description);
    upsert("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsert("property", "og:title", fullTitle);
    upsert("property", "og:description", description);
    upsert("property", "og:url", url);
    upsert("property", "og:image", OG_IMAGE);
    upsert("name", "twitter:title", fullTitle);
    upsert("name", "twitter:description", description);
    upsert("name", "twitter:image", OG_IMAGE);
    upsertCanonical(url);
  }, [fullTitle, description, url, noindex]);

  return null;
}
