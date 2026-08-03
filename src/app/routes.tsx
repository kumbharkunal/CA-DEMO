import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";
import { BookingProvider } from "@/components/forms/BookingProvider";
import { HomePage } from "@/pages/HomePage";

/* ── Route-level code splitting ──────────────────────────────────────────
 * HomePage stays eagerly imported (it's the LCP route). Every other page
 * loads on demand behind a shared Suspense boundary, so first load carries
 * only home + the shell.
 */

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const IndustriesPage = lazy(() => import("@/pages/IndustriesPage"));
const IndustryDetailPage = lazy(() => import("@/pages/IndustryDetailPage"));
const ProcessPage = lazy(() => import("@/pages/ProcessPage"));
const InsightsPage = lazy(() => import("@/pages/InsightsPage"));
const InsightDetailPage = lazy(() => import("@/pages/InsightDetailPage"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const DisclaimerPage = lazy(() => import("@/pages/DisclaimerPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BookingProvider>
        <RootLayout />
      </BookingProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <L><AboutPage /></L> },
      { path: "services", element: <L><ServicesPage /></L> },
      { path: "services/:slug", element: <L><ServiceDetailPage /></L> },
      { path: "industries", element: <L><IndustriesPage /></L> },
      { path: "industries/:slug", element: <L><IndustryDetailPage /></L> },
      { path: "process", element: <L><ProcessPage /></L> },
      { path: "insights", element: <L><InsightsPage /></L> },
      { path: "insights/:slug", element: <L><InsightDetailPage /></L> },
      { path: "resources", element: <L><ResourcesPage /></L> },
      { path: "contact", element: <L><ContactPage /></L> },
      { path: "search", element: <L><SearchPage /></L> },
      { path: "legal/privacy", element: <L><PrivacyPage /></L> },
      { path: "legal/terms", element: <L><TermsPage /></L> },
      { path: "legal/disclaimer", element: <L><DisclaimerPage /></L> },
      { path: "*", element: <L><NotFoundPage /></L> },
    ],
  },
]);

/** Shared component alias so Lazy doesn't re-mount per route. */
function L({ children }: { children: ReactNode }) {
  return <Lazy>{children}</Lazy>;
}

function PageLoading(): ReactNode {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="container-site section min-h-[60vh]"
    >
      <span className="sr-only">Loading page…</span>
      <div className="h-3 w-28 animate-pulse rounded-sm bg-hover-bg" />
      <div className="mt-4 h-9 w-2/3 max-w-lg animate-pulse rounded-sm bg-hover-bg" />
      <div className="mt-5 h-4 w-full max-w-2xl animate-pulse rounded-sm bg-hover-bg" />
      <div className="mt-2 h-4 w-5/6 max-w-xl animate-pulse rounded-sm bg-hover-bg" />
    </div>
  );
}

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
