import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <a href="#top" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </span>
              <span>
                Squeegee <span className="text-primary">Maids</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              Fast, reliable home cleaning in Portland. Background-checked, insured, and eco-friendly.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold mb-1">Get in Touch</p>
            <a
              href="tel:+19713024242"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" />
              (971) 302-4242
            </a>
            <a
              href="mailto:hello@squeegeemaids.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              hello@squeegeemaids.com
            </a>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Serving all of Portland, OR &amp; surrounding cities
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold mb-1">Services</p>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Residential Cleaning</a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Airbnb Turnovers</a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Commercial &amp; Office</a>
            <a href="#quote" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Get a Free Quote</a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Squeegee Maids. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
