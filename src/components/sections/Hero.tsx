import { useState } from "react";
import { Star, ArrowRight, CheckCircle2, Loader2, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const highlights = [
  "Background-checked & insured",
  "Eco-friendly products",
  "Flexible scheduling",
  "No contracts",
];

const SUPPORT_EMAIL = "support@squeegeemaids.com";

export function Hero() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    bedrooms: "",
    bathrooms: "",
    frequency: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const setField = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const subject = `Free Quote Request from ${form.name || "Website Visitor"}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service Type: ${form.service}`,
      `Bedrooms: ${form.bedrooms}`,
      `Bathrooms: ${form.bathrooms}`,
      `Frequency: ${form.frequency}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
    setSending(false);
  };

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
              <a href="#hero-quote-form">
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
          <div className="relative rounded-3xl bg-background/95 p-6 md:p-8 shadow-2xl ring-1 ring-border/60 backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold leading-tight">Get Your Free Quote</h2>
                <p className="text-xs text-muted-foreground">Takes 60 seconds · No obligation</p>
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold">Your email is ready to send!</p>
                  <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                    Your email app just opened with your quote details addressed to us at
                    {" "}<span className="font-medium text-primary">{SUPPORT_EMAIL}</span>.
                    Just hit send and we'll reply with your exact price.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setSubmitted(false)}
                >
                  Start over
                </Button>
              </div>
            ) : (
              <form id="hero-quote-form" onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="hero-name">Full Name</Label>
                  <Input
                    id="hero-name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="hero-email">Email</Label>
                    <Input
                      id="hero-email"
                      type="email"
                      placeholder="jane@email.com"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hero-phone">Phone</Label>
                    <Input
                      id="hero-phone"
                      placeholder="(971) 000-0000"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Service Type</Label>
                  <Select value={form.service} onValueChange={(v) => setField("service", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential Cleaning">Residential Cleaning</SelectItem>
                      <SelectItem value="Airbnb Turnover">Airbnb Turnover</SelectItem>
                      <SelectItem value="Commercial / Office">Commercial / Office</SelectItem>
                      <SelectItem value="Deep Clean">Deep Clean</SelectItem>
                      <SelectItem value="Move-In / Move-Out">Move-In / Move-Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Bedrooms</Label>
                    <Select value={form.bedrooms} onValueChange={(v) => setField("bedrooms", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="0–5+" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Studio", "1", "2", "3", "4", "5+"].map((n) => (
                          <SelectItem key={n} value={n}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Bathrooms</Label>
                    <Select value={form.bathrooms} onValueChange={(v) => setField("bathrooms", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="1–4+" />
                      </SelectTrigger>
                      <SelectContent>
                        {["1", "1.5", "2", "2.5", "3", "4+"].map((n) => (
                          <SelectItem key={n} value={n}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Frequency</Label>
                  <Select value={form.frequency} onValueChange={(v) => setField("frequency", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How often?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="One-time">One-time</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="hero-notes">Anything else? (optional)</Label>
                  <Input
                    id="hero-notes"
                    placeholder="Special requests, pets, parking, etc."
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                  />
                </div>

                <Button type="submit" size="lg" className="rounded-full w-full" disabled={sending}>
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Opening your email...
                    </>
                  ) : (
                    <>
                      Get My Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  We'll reply to your email with an exact price within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
