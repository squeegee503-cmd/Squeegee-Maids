import { Home, Building2, Leaf, ArrowRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Keep your home fresh with regular or one-time cleanings.",
    features: ["Weekly, bi-weekly, monthly", "One-time refresh", "Deep clean options"],
  },
  {
    icon: Building2,
    title: "Airbnb Turnovers",
    description: "Guest-ready every stay. Fast turnarounds, spotless results.",
    features: ["Same-day turnover", "Linen & restock", "5-star guest reviews"],
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    description: "Detailed deep clean so you start (or leave) with a spotless home.",
    features: ["Non-toxic formulas", "Safe for kids & pets", "Fregrance Free Chemicals"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Services & Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Pick Your Level of Clean
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.title}
                className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <CardContent className="relative p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-5">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{s.description}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            Also offering: commercial &amp; office cleaning, eco-friendly deep cleans, one-time
            refresh, and occasional cleaning.
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <a href="#quote">
              See all services
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
