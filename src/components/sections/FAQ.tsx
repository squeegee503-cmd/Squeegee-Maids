import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
   q: "What areas do you serve?",
a: "We proudly serve Portland, OR, and the surrounding communities, including Beaverton, Hillsboro, Tigard, Lake Oswego, Vancouver, Gresham, Happy Valley, Tualatin, Milwaukie, Oregon City, Bethany, Aloha, Cedar Mill, Cornelius, Camas, Troutdale, Fairview, West Linn, Clackamas, North Plains, Banks, Scappoose, Damascus, Gladstone, Oak Grove, Jennings Lodge, Hazeldale, Bull Mountain, Rock Creek, Bonny Slope, Raleigh Hills, Garden Home, and Sauvie Island. If you're located anywhere in the Portland metro area, there's a good chance we serve your neighborhood. Contact us today to confirm availability in your area.",
  },
  {
    q: "Are your cleaners insured and background-checked?",
    a: "Yes. Every cleaner is background-checked, fully insured, and trained to protect your home to the highest standard.",
  },
  {
    q: "What cleaning products do you use?",
    a: "We use standardized house cleaning products. We also offer eco-friendly, non-toxic products that are safe for kids, pets, and the environment. Your home will smell fresh — not like harsh chemicals.",
  },
  {
    q: "How often can I schedule a cleaning?",
    a: "We offer weekly, bi-weekly, monthly, or one-time cleanings. You can also schedule a deep clean or move-out clean whenever you need it.",
  },
  {
    q: "Do I need to sign a contract?",
    a: "No contracts and no hidden fees. Transparent pricing with flexible scheduling — you're in control.",
  },
 
  {
    q: "How fast can I get a quote?",
    a: "Get your free quote in under 60 seconds. Tell us about your home and we'll send back an exact price — same-week appointments are often available.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Answers Before You Ask
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Residential, commercial, and Airbnb cleaning — each tailored to your unique needs, from
            maintenance cleans to detailed deep cleans.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
