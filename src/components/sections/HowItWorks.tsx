import { CalendarCheck, SlidersHorizontal, Sparkles } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book Your Cleaning",
    description: "Schedule online in minutes, or call and text us for the best time.",
  },
  {
    icon: SlidersHorizontal,
    title: "Personalized Package",
    description: "Choose a plan built for your home — recurring maintenance or a full deep clean.",
  },
  {
    icon: Sparkles,
    title: "Enjoy Your Fresh Space",
    description: "Come home to a sparkling clean space, ready to be enjoyed.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Effortless Cleaning in 3 Steps
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Icon className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background text-sm font-bold text-primary ring-2 ring-primary/20">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
