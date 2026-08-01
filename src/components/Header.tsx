import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-18 items-center justify-between py-4">
        <a href="#top" className="flex items-center">
          <img
            src="/squeegee_maids_logo_new.svg"
            alt="Squeegee Maids"
            className="h-10 w-auto md:h-12"
          />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+19713024242" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            (971) 302-4242
          </a>
          <Button asChild size="sm" className="rounded-full">
            <a href="#quote">Get Free Quote</a>
          </Button>
        </div>

        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-md text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <a
                href="tel:+19713024242"
                className="px-3 text-sm font-semibold text-foreground"
              >
                Call or text (971) 302-4242
              </a>
              <Button asChild className="rounded-full" onClick={() => setOpen(false)}>
                <a href="#quote">Get Free Quote</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
