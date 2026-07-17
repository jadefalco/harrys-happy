import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { siteConfig } from "@/content/site-config";

const stats = [
  { value: `${siteConfig.foundedYear}`, label: "Serving Ontario Since" },
  { value: <CountUp to={130} suffix="+" />, label: "Vending Machines" },
  { value: "24-Hr", label: "Service Response" },
  { value: "100%", label: "Customized Equipment" },
  { value: "$0", label: "Installation Costs" },
  { value: "Tap / Debit", label: "Cashless Payments" },
];

export function TrustBar() {
  return (
    <section className="border-b border-hairline bg-cream py-12">
      <Container>
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-black text-navy-950 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-slate">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
