"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-fg">
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-fg-dim">
          Something broke
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          An unexpected error occurred.
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-fg-muted">
          It&apos;s not you — it&apos;s the server. Try again, and if it keeps
          happening, come back in a bit.{error.digest ? ` (Ref: ${error.digest})` : ""}
        </p>
        <button
          onClick={reset}
          className="inline-flex border border-hairline px-5 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
