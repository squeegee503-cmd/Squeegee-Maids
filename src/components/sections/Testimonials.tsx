import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "My apartment has never looked better. Team was on time, friendly, and every corner was spotless when they left.",
    author: "Sarah M.",
    role: "Apartment clean",
  },
  {
    quote: "Booked a move-out clean and got my full deposit back. Landlord even asked who I used! Highly recommend.",
    author: "James T.",
    role: "Move-out clean",
  },
  {
    quote: "We run an Airbnb and Squeegee Maids has been a game changer. Guests always mention how clean the place is.",
    author: "Priya & Devon",
    role: "Airbnb turnover",
  },
  {
    quote: "Eco-friendly products that actually work. My kitchen sparkles and the house smells fresh, not like chemicals.",
    author: "Megan R.",
    role: "Recurring clean",
  },
  {
    quote: "Reliable, thorough, and super easy to schedule. They've been cleaning our office weekly for over a year.",
    author: "Carlos N.",
    role: "Office cleaning",
  },
  {
    quote: "First deep clean took my breath away. I forgot my baseboards were white!",
    author: "Lisa K.",
    role: "Deep clean",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Social Proof
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Portland Loves a Squeegee-Clean Home
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="group hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/15 group-hover:text-primary/25 transition-colors" />
                </div>
                <p className="text-sm leading-relaxed text-foreground/90 mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
  <a
    href="https://maps.app.goo.gl/SP6wpSjXZ36RJD8X8"
    className="inline-flex items-center rounded-full bg-sky-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-lg"
  >
    View all Reviews
  </a>
</div>

      
    </section>
  );
}
