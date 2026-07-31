import { CheckCircle2 } from "lucide-react";

const points = [
  "Inside appliances",
  "Under furniture",
  "Every baseboard",
  "Eco-friendly, non-toxic products",
  "Safe for kids, pets, and the planet",
];

export function DeepClean() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/30 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <img
              src="/assets/before.jpg"
              alt="Before cleaning"
              className="aspect-[3/4] w-full rounded-2xl object-cover shadow-lg"
              loading="lazy"
            />
            <img
              src="/assets/after.jpg"
              alt="After cleaning"
              className="aspect-[3/4] w-full rounded-2xl object-cover shadow-lg mt-8"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold shadow-lg ring-1 ring-border/60 backdrop-blur">
            Before → After
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col gap-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Deep Clean Difference
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Cleanings That Stay Clean for 10 Days or More.
          </h2>
          <p className="text-muted-foreground text-pretty">
            Our detailed deep cleans go beyond the surface — inside appliances, under furniture, and
            every baseboard. Eco-friendly, non-toxic products that are safe for kids, pets, and the
            planet.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 pt-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
