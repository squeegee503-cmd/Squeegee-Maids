import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "I wanted to surprise my sister in Portland with a deep clean while she was away, and Squeegee Maids was fantastic to work with. Even though I was booking from out of province, their communication was top-notch. They were very thorough, and my sister said her place has never looked better. It's such a relief to find a reliable crew you can trust from a distance!",
    author: "Helen Pagaddut",
    role: "Deep clean",
  },
  {
    quote: "I reached out to Squeegee Maids to take care of our home. Maria did a fantastic job with all of the small details, and even managed to contend with all of our dog fur without a problem! We haven’t had our house this clean in ages, and are looking forward to using them again.",
    author: " Mike Bolster",
    role: "House cleaning",
  },
  {
    quote: "I really appreciate how easy it was to schedule, and the communication from start to finish was excellent. If you are looking for reliable house cleaning near you with competitive pricing and friendly service, Squeegee Maids is the best choice. My home feels fresh, clean, and welcoming again. I will definitely use their residential cleaning services on a regular basis.",
    author: "Jenifer Perez",
    role: "Residential Cleaning",
  },
  {
    quote: "I recently used this housecleaning service, and they did an absolutely fantastic job! The team was on time, professional, and very thorough. Every corner of the house sparkled — from the floors to the countertops, even the little details I usually miss. They were also respectful of my home and worked efficiently without cutting any corners. I’m so impressed with the quality of their work and how fresh and clean everything feels. I’ll definitely be scheduling with them again and highly recommend their service to anyone looking for a reliable and detail-oriented cleaning crew.",
    author: "Brent Fivecoat",
    role: "Standard cleaning",
  },
  {
    quote: "Squeegee Maids cleaned our apartment following my birthday party and they absolutely nailed it. The entire place was immaculate by the time we returned.",
    author: "James Fuson",
    role: "Apartment Cleaning",
  },
  {
    quote: "They did a deep clean of my apartment in 2 1/2 hours for a very reasonable rate. I’m very happy with how the appliances are on the floors. They clean the couch from dirt that my dog got on it very happy with the service and will be using them monthly going forward.",
    author: "Jonny Fisher",
    role: "Upholstery cleaning, Deep clean",
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
            Oregonians Loves a Squeegee-Clean Home
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
