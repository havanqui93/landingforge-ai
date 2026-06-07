type HeroSectionProps = {
  headline: string;
  subheadline: string;
  keyword?: string;
  category?: string | null;
};

export function HeroSection({
  headline,
  subheadline,
  keyword,
  category,
}: HeroSectionProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-indigo-600">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
          <span>Trending{category ? ` · ${category}` : ""}</span>
        </div>
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          {subheadline}
        </p>
        {keyword ? (
          <p className="mt-6 text-sm uppercase tracking-wide text-slate-400">
            {keyword}
          </p>
        ) : null}
      </div>
    </header>
  );
}
