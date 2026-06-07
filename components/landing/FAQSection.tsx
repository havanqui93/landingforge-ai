type FAQSectionProps = {
  faqs: { question: string; answer: string }[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs.length) return null;
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        Frequently asked questions
      </h2>
      <dl className="mt-8 space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-slate-400 transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <dd className="mt-3 leading-relaxed text-slate-600">{faq.answer}</dd>
          </details>
        ))}
      </dl>
    </section>
  );
}
