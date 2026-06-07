type CTASectionProps = {
  title: string;
  description: string;
};

export function CTASection({ title, description }: CTASectionProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-12 text-center text-white shadow-lg">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-indigo-100">{description}</p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
        >
          Explore more trends
        </a>
      </div>
    </section>
  );
}
