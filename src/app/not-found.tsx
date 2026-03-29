import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-soil text-text-primary px-6">
      <p className="text-[11px] tracking-[0.25em] text-text-faint font-mono mb-6">
        lost in the garden
      </p>
      <h1 className="text-lg font-light tracking-[0.03em] mb-2">
        404
      </h1>
      <p className="text-[13px] text-text-secondary font-light mb-8">
        This page doesn't exist.
      </p>
      <Link
        href="/"
        className="text-[11px] tracking-[0.12em] font-mono text-text-faint hover:text-moss-light transition-colors duration-300"
      >
        back to garden
      </Link>
    </div>
  );
}
