import { ShieldCheck } from "lucide-react";

export function Guarantee() {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-6 py-14 md:px-16 md:py-20 text-center shadow-xl">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance max-w-2xl">
              Backed by our 100% Satisfaction Guarantee
            </h2>
            <p className="text-white/85 max-w-2xl text-pretty">
              Real people. Trained, insured cleaners. Eco-friendly products. If any part of your
              clean doesn't meet our standards, tell us within 24 hours and we'll return to re-clean
              it — free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
