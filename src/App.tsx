import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Gallery } from "@/components/sections/Gallery";
import { DeepClean } from "@/components/sections/DeepClean";
import { WhyUs } from "@/components/sections/WhyUs";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Guarantee } from "@/components/sections/Guarantee";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { FAQ } from "@/components/sections/FAQ";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Testimonials />
        <Services />
        <HowItWorks />
        <Gallery />
        <DeepClean />
        <WhyUs />
        <ServiceArea />
        <Guarantee />
        <QuoteForm />
        <FAQ />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
