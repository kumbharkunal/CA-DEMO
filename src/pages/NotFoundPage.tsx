import { Link } from "react-router";
import { Container } from "@/components/layout/Container";
import { Seo } from "@/components/seo/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo noindex title="Page not found" description="The address may have changed, or the link may be incomplete." />
      <Container className="section flex min-h-[60vh] flex-col justify-center pt-40">
        <p className="text-eyebrow text-text-muted">404</p>
        <h1 className="mt-4 text-h1">This page does not exist.</h1>
        <p className="mt-4 max-w-[52ch] text-body-l text-text-secondary">
          The address may have changed, or the link may be incomplete. Our team
          answers within one business day if you were looking for something specific.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex w-fit items-center text-[0.9375rem] font-medium text-text-primary underline-offset-4 hover:underline"
        >
          Return home →
        </Link>
      </Container>
    </>
  );
}
