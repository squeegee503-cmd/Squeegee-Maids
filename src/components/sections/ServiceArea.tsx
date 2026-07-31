import { MapPin } from "lucide-react";

const neighborhoods = [
  "Downtown", "Pearl District", "Sellwood", "Alberta Arts", "Hawthorne",
  "Mississippi", "Lloyd District", "St. Johns", "Montavilla", "Foster-Powell",
  "Woodstock", "Beaumont", "Irvington", "Richmond", "Buckman",
];

export function ServiceArea() {
  return (
    <section id="service-area" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Service Area
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            House Cleaning in Portland Neighborhoods
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            From downtown condos to Sellwood bungalows, we serve homes and businesses across
            Portland and nearby cities.
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {neighborhoods.map((n) => (
            <span
              key={n}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {n}
            </span>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Serving all of Portland, OR &amp; surrounding cities
          </p>
        </div>
      </div>
    </section>
  );
}
