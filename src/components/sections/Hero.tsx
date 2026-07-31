import { Star, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "Background-checked & insured",
  "Eco-friendly products",
  "Flexible scheduling",
  "No contracts",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />

      <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Star className="h-4 w-4 fill-primary" />
            <Star className="h-4 w-4 fill-primary" />
            <Star className="h-4 w-4 fill-primary" />
            <Star className="h-4 w-4 fill-primary" />
            <Star className="h-4 w-4 fill-primary" />
            <span className="ml-1 text-foreground/80">Trusted by Portland homeowners</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Fast, Reliable Home Cleaning in{" "}
            <span className="text-primary">Portland.</span>
          </h1>

          <p className="text-lg text-muted-foreground text-pretty max-w-xl">
            Home, office, or Airbnb — Squeegee Maids brings a background-checked, insured cleaning
            team to your door. Eco-friendly products, flexible scheduling, no contracts.
          </p>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-2">
            <Button asChild size="lg" className="rounded-full text-base shadow-lg shadow-primary/20">
              <a href="#quote">
                Get Your Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base">
              <a href="tel:+19713024242">
                <Phone className="h-4 w-4" />
                Call or text (971) 302-4242
              </a>
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-in-up [animation-delay:200ms]">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/30 to-accent/40 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/60">
            <img
              src="/assets/hero-car.jpg"
              alt="Squeegee Maids cleaning team at work"
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white font-semibold text-lg">A spotless home, every time</p>
              <p className="text-white/80 text-sm">Eco-friendly · Insured · Local since 2020</p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-background p-4 shadow-xl ring-1 ring-border/60 animate-float">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Star className="h-6 w-6 fill-primary text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">4.9</p>
                <p className="text-xs text-muted-foreground">Avg. rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
