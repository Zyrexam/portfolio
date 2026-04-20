import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          The page you&apos;re looking for is not here.
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
          The route may have changed during the redesign. Head back to the main
          portfolio and continue from there.
        </p>
        <Link
          href="/"
          className="inline-flex border border-white/10 px-5 py-3 text-sm text-foreground transition-colors hover:border-white/20 hover:bg-white/3"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
