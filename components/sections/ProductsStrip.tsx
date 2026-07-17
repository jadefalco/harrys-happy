import { Container } from "@/components/ui/Container";

const brands = [
  "Coca-Cola",
  "Pepsi",
  "Monster",
  "Red Bull",
  "Mars",
  "Cadbury",
  "Nestlé",
  "Hershey",
  "Shires Cookies",
];

export function ProductsStrip() {
  const looped = [...brands, ...brands];

  return (
    <section className="border-y border-hairline bg-cream py-14">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Stocked with brands your team already trusts
          </p>
          <p className="max-w-lg text-sm text-slate">
            Alongside national favourites, we feature Shires Cookies — baked locally — plus a
            growing lineup of protein drinks, protein bars, and healthier snack options.
          </p>
        </div>
      </Container>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
          {looped.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="font-display text-2xl font-black text-slate"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
