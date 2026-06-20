import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-fg">
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-fg-dim">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          The page you&apos;re looking for is not here.
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-fg-muted">
          The route may have changed during the redesign. Head back to the main
          portfolio and continue from there.
        </p>
        <Link
          href="/"
          className="inline-flex border border-hairline px-5 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
