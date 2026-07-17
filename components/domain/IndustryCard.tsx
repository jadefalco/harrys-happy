import type { Industry } from "@/content/industries";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <div className="rounded-3xl border border-hairline bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(11,42,99,0.15)]">
      <h3 className="font-display text-lg font-bold text-navy-950">{industry.name}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate">{industry.description}</p>
    </div>
  );
}
