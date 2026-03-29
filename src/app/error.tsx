"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-soil text-text-primary px-6">
      <p className="text-[11px] tracking-[0.25em] text-text-faint font-mono mb-6">
        something wilted
      </p>
      <h1 className="text-lg font-light tracking-[0.03em] mb-2">
        Unexpected Error
      </h1>
      <p className="text-[13px] text-text-secondary font-light mb-8">
        The page hit an issue. Try refreshing.
      </p>
      <button
        onClick={reset}
        className="text-[11px] tracking-[0.12em] font-mono text-text-faint hover:text-moss-light transition-colors duration-300"
      >
        try again
      </button>
    </div>
  );
}
