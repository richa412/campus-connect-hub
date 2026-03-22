import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Zap, Users, Calendar, ShoppingBag, MessageCircle, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const features = [
  { icon: Zap, title: "Campus Pulse", desc: "Real-time trending topics, sentiment analysis, and campus insights powered by collective student activity." },
  { icon: Users, title: "Community Feed", desc: "Share updates, spark discussions, and connect with peers through a rich social feed with tags and threads." },
  { icon: Calendar, title: "Events Hub", desc: "Discover campus events, RSVP instantly, and never miss what matters with smart reminders." },
  { icon: TrendingUp, title: "Opportunities", desc: "Find internships, projects, and collaborations filtered by your skills and interests." },
  { icon: ShoppingBag, title: "Marketplace", desc: "Buy and sell textbooks, gadgets, and more within your trusted campus community." },
  { icon: MessageCircle, title: "Messaging", desc: "Direct chats and topic-based rooms for seamless real-time conversations." },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("animate-reveal-up"); observer.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    el.querySelectorAll("[data-reveal]").forEach((c) => {
      (c as HTMLElement).style.opacity = "0";
      observer.observe(c);
    });
    return () => observer.disconnect();
  }, []);
  return ref;
}

const LandingPage = () => {
  const featuresRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="CampusPulse" className="h-9 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pulse" className="hover:text-foreground transition-colors">Campus Pulse</a>
            <a href="#community" className="hover:text-foreground transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
            <Button variant="hero" asChild><Link to="/signup">Get Started</Link></Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle opacity-60" />
        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground mb-6 animate-reveal-up">
            <Zap className="h-3.5 w-3.5" />
            Your campus, one platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 animate-reveal-up" style={{ animationDelay: "100ms" }}>
            Stay in sync with<br />
            <span className="text-gradient">your campus</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-reveal-up" style={{ animationDelay: "200ms" }}>
            CampusPulse unifies events, discussions, opportunities, and marketplace into one student-only ecosystem — with real-time pulse analytics on what your campus is thinking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal-up" style={{ animationDelay: "300ms" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">Join your campus <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="#features">See how it works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28" ref={featuresRef}>
        <div className="container max-w-6xl">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything your campus needs</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">One platform to connect, discover, trade, and stay informed across your entire university.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={f.title} data-reveal style={{ animationDelay: `${i * 80}ms` }}
                className="group relative bg-card rounded-xl p-6 border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-11 h-11 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse CTA */}
      <section id="pulse" className="py-20 md:py-28" ref={ctaRef}>
        <div className="container max-w-4xl" data-reveal>
          <div className="gradient-hero rounded-2xl p-10 md:p-16 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Feel the pulse of your campus</h2>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
              Real-time sentiment analysis, trending topics, and insight into what students are talking about — updated live.
            </p>
            <Button size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg" asChild>
              <Link to="/signup">Get started free <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={logo} alt="CampusPulse" className="h-7 w-auto" />
          </div>
          <p>© {new Date().getFullYear()} CampusPulse. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
