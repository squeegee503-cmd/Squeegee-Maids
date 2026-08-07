import { ShieldCheck, Leaf, CalendarClock, MapPin, BadgeDollarSign, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Insured & Trusted",
    description: "Every cleaner is background-checked, insured, and trained to protect your home.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Non-toxic products that are safe for kids, pets, and the environment.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Scheduling",
    description: "Weekly, bi-weekly, monthly, or one-time — we work around your calendar.",
  },
  {
    icon: MapPin,
    title: "Local Since 2020",
    description: "Locally owned and Portland-proud. We know your neighborhood.",
  },
  {
    icon: BadgeDollarSign,
    title: "No Surprises",
    description: "Transparent pricing with no contracts and no hidden fees.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    description: "We're committed to delivering a high-quality cleaning experience with reliable service and attention to detail.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Why Portland
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Why Oregonians Books Squeegee Maids
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-1.5">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
