import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2, Clock, Phone, AlertCircle } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { submitQuote } from "@/lib/quote";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  service: z.string().min(1, "Select a service type"),
  bedrooms: z.string().min(1, "Select number of bedrooms"),
  bathrooms: z.string().min(1, "Select number of bathrooms"),
  frequency: z.string().min(1, "Select a frequency"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function QuoteForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      bedrooms: "",
      bathrooms: "",
      frequency: "",
      notes: "",
    },
  });

  const service = watch("service");
  const bedrooms = watch("bedrooms");
  const bathrooms = watch("bathrooms");
  const frequency = watch("frequency");

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitQuote(data);
      reset();
      toast({
        title: "Quote request sent!",
        description: "We'll get back to you with an exact price within 24 hours.",
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-20 md:py-28 bg-secondary/50">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Get Your Free Quote in Under a Minute
            </h2>
          </div>
          <p className="text-muted-foreground text-pretty max-w-md">
            Tell us about your home and we'll send back an exact price. Same-week appointments often
            available.
          </p>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-sm ring-1 ring-border/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Free quote · 60 seconds</p>
                <p className="text-xs text-muted-foreground">Upfront pricing, no obligation</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-sm ring-1 ring-border/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Prefer to talk?</p>
                <a
                  href="tel:+19713024242"
                  className="text-xs text-primary hover:underline"
                >
                  Call or text (971) 302-4242
                </a>
              </div>
            </div>

 <div className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-sm ring-1 ring-border/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Prefer to Email?</p>
                <a
                  href="mailto:support@squeegeemaids.com"
                  className="text-xs text-primary hover:underline"
                >
                  Support@squeegeemaids.com
                </a>
              </div>
            </div>
            
          </div>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              {submitError && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {submitError}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Jane Doe" {...register("name")} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jane@email.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(971) 000-0000" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Service Type</Label>
                <Select
                  value={service}
                  onValueChange={(v) => setValue("service", v, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Cleaning</SelectItem>
                    <SelectItem value="airbnb">Airbnb Turnover</SelectItem>
                    <SelectItem value="commercial">Commercial / Office</SelectItem>
                    <SelectItem value="deep">Deep Clean</SelectItem>
                    <SelectItem value="move">Move-In / Move-Out</SelectItem>
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Bedrooms</Label>
                  <Select
                    value={bedrooms}
                    onValueChange={(v) => setValue("bedrooms", v, { shouldValidate: true })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="0–5+" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Studio", "1", "2", "3", "4", "5+"].map((n) => (
                        <SelectItem key={n} value={n}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bedrooms && <p className="text-xs text-destructive">{errors.bedrooms.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label>Bathrooms</Label>
                  <Select
                    value={bathrooms}
                    onValueChange={(v) => setValue("bathrooms", v, { shouldValidate: true })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="1–4+" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "1.5", "2", "2.5", "3", "4+"].map((n) => (
                        <SelectItem key={n} value={n}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bathrooms && <p className="text-xs text-destructive">{errors.bathrooms.message}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Frequency</Label>
                <Select
                  value={frequency}
                  onValueChange={(v) => setValue("frequency", v, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.frequency && <p className="text-xs text-destructive">{errors.frequency.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">House Size (SQFT)</Label>
                <Input id="notes" placeholder="House Size (SQFT)" {...register("notes")} />
              </div>

              <Button
                type="submit"
                size="lg"
                className="rounded-full w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get My Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
